import { PrismaClient } from ".prisma/client";

// setting prisma as global 
declare global {
    var prisma: PrismaClient | undefined;
}

// exporting prisma as global
export const prisma = global.prisma || new PrismaClient();

// 
if(process.env.NODE_ENV !== 'production') 
    global.prisma = prisma;