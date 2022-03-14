import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

export type MyContext = {
	req: Request
	db: PrismaClient
}
