import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

type user = {}

export type MyContext = {
	user: any
	db: PrismaClient
}
