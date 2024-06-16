import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var db: undefined | ReturnType<typeof PrismaClientSingleton>;
}

const db = globalThis.db ?? PrismaClientSingleton();

export default db;

if (process.env.NODE_ENV != "production") globalThis.db = db;
