import { PrismaClient } from "@prisma/client";

declare global {
  // Extend the global type to include the `prisma_` property
  namespace NodeJS {
    interface Global {
      prisma_: PrismaClient | undefined;
    }
  }

  // Add to globalThis for proper TS recognition
  var prisma_: PrismaClient | undefined;
}

const prisma = globalThis.prisma_ || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma_ = prisma;
}

export default prisma;
