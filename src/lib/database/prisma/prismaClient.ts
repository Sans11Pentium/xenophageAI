import { PrismaClient } from "@prisma/client";

declare global {
  var prisma_: PrismaClient | undefined; // Declare prisma_ globally
}

const prisma = globalThis.prisma_ || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma_ = prisma;
}

export default prisma;
