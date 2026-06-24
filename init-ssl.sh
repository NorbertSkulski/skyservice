#!/bin/bash

# =========================================================================
# 1. WCZYTANIE ZMIENNYCH ŚRODOWISKOWYCH
# =========================================================================
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
else
    echo "❌ Błąd: Brak pliku .env w bieżącym katalogu!"
    exit 1
fi

# Sprawdzenie, czy kluczowa zmienna DOMAIN_NAME istnieje w .env
if [ -z "$DOMAIN_NAME" ]; then
    echo "❌ Błąd: Zmienna DOMAIN_NAME nie jest zdefiniowana w pliku .env!"
    exit 1
fi

# Adres e-mail używany do rejestracji w Let's Encrypt
# Pobiera z .env zmienną CERTBOT_EMAIL, a jeśli jej nie ma, używa domyślnego adresu
EMAIL=$CERTBOT_EMAIL
path="/etc/letsencrypt/live/$DOMAIN_NAME"

echo "========================================================================="
echo "🔒 Rozpoczynam automatyczną konfigurację SSL dla domeny: $DOMAIN_NAME"
echo "========================================================================="

# =========================================================================
# 2. SPRAWDZENIE CZY CERTYFIKAT JUŻ ISTNIEJE
# =========================================================================
echo "Checking: Sprawdzam, czy wolumen zawiera już istniejący certyfikat..."

if docker compose run --rm --entrypoint "sh -c '[ -d $path ]'" certbot 2>/dev/null; then
    echo "✅ Certyfikat dla $DOMAIN_NAME już istnieje w wolumenie. Pomijam generowanie."
    echo "🚀 Uruchamiam wszystkie usługi..."
    docker compose up -d
    exit 0
fi

echo "ℹ️ Brak certyfikatu. Rozpoczynam procedurę pierwszego uruchomienia..."

# =========================================================================
# 3. GENEROWANIE TYMCZASOWEGO CERTYFIKATU (DUMMY CERT)
# =========================================================================
echo "1️⃣ Tworzę tymczasowy (self-signed) certyfikat, aby Nginx mógł wystartować..."

docker compose run --rm --entrypoint \
  "sh -c 'mkdir -p $path && openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout $path/privkey.pem \
    -out $path/fullchain.pem \
    -subj \"/CN=localhost\"'" certbot

# =========================================================================
# 4. START NGINXA I USUWANIE DUMMY CERT
# =========================================================================
echo "2️⃣ Uruchamiam Nginxa oraz Next.js z tymczasowym certyfikatem..."
docker compose up -d nginx nextapp

echo "3️⃣ Czyszczę tymczasowy certyfikat, przygotowując miejsce dla Let's Encrypt..."
docker compose run --rm --entrypoint \
  "sh -c 'rm -rf $path/*'" certbot

# =========================================================================
# 5. GENEROWANIE PRAWDZIWEGO CERTYFIKATU SSL (LET'S ENCRYPT)
# =========================================================================
echo "4️⃣ Żądam prawdziwego certyfikatu od Let's Encrypt przez Certbota..."

docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot \
  --email "$EMAIL" --agree-tos --no-eff-email \
  -d "$DOMAIN_NAME" -d "www.$DOMAIN_NAME"

# =========================================================================
# 6. PRZEŁADOWANIE I FINALNY START
# =========================================================================
echo "5️⃣ Przeładowuję konfigurację Nginxa z nowymi, bezpiecznymi certyfikatami..."
docker compose exec nginx nginx -s reload

echo "6️⃣ Uruchamiam pełne środowisko w tle (w tym demona Certbota)..."
docker compose up -d

echo "========================================================================="
echo "🎉 Gotowe! Twoja aplikacja działa w pełni automatycznie na HTTPS."
echo "========================================================================="