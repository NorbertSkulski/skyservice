import { Prisma } from "@/generated/prisma/client";

export const prismaErrorHandler = async (callback:()=>Promise<unknown>) => {
    try {
      return await callback();
    } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            const message = (e as any)?.meta?.driverAdapterError?.cause?.originalMessage;
            console.error(message);
            return {
                success: false,
                error: message || "Coś poszło nie tak po stronie serwera"
            };
        }
        return {
            success: false,
            error: e.message || "Coś poszło nie tak po stronie serwera"
        };
    }
}