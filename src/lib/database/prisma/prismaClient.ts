import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // Declare prisma on the global object
}

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

export default prisma;
