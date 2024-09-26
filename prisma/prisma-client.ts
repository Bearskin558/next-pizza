// import { PrismaClient } from "@prisma/client"
// const prismaClientSingleton = () => {
// 	return new PrismaClient()
// }
// declare const globalThis: {
// 	prismaGlobal: ReturnType<typeof prismaClientSingleton>
// } & typeof global
// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

/*-------------------------------------------*/
import { Pool, neonConfig } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import ws from "ws"

// neonConfig.webSocketConstructor = ws
const neon = new Pool({
	connectionString: process.env.POSTGRES_PRISMA_URL,
	connectionTimeoutMillis: 1000,
	idleTimeoutMillis: 1000,
	ssl: {
		rejectUnauthorized: false,
	},
})
const adapter = new PrismaNeon(neon)
export const prisma = new PrismaClient({ adapter })
