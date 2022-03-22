import { PrismaClient } from '@prisma/client'

export type MyContext = {
	user: any
	db: PrismaClient
}
