import { PrismaClient } from "@prisma/client";

let prisma = (global as any).prisma;
if(!prisma){
    prisma = (global as any).prisma = new PrismaClient();
}

export default prisma;