import { remember } from "@epic-web/remember";
import { PrismaClient } from "@prisma/client";

const prisma = remember("prisma", () => new PrismaClient());

process.on("beforeExit", () => {
	prisma.$disconnect();
});

export { prisma };
