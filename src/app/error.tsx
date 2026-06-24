'use client'; 

import { useEffect } from 'react';

const BlogError = ({ error, reset }: { error: Error, reset: () => void }) => {
  useEffect(() => {
    // Tutaj możesz zalogować błąd do zewnętrznego systemu, np. Sentry
    console.error("Wystąpił błąd podstrony:", error);
  }, [error]);

  return (
    <div className="p-6 text-center border border-red-200 rounded-lg bg-red-50">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Coś poszło nie tak!</h2>
           
      <button
        onClick={() => reset()} // Spróbuje ponownie wyrenderować stronę
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}

export default BlogError;