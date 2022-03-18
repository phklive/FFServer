import { MyContext } from '../../utils/types'
import { Resolvers } from '../../generated/graphql'
import bcrypt from 'bcrypt'
import { createToken } from '../../utils/auth'

export const userResolver: Resolvers<MyContext> = {
	Query: {
		async me(_, args, { db, user }) {
			if (!user.id) throw new Error('You are not authenticated.')
			const connectedUser = await db.user.findFirst({
				where: {
					id: user.id,
				},
			})
			return connectedUser
		},
		async users(_, args, { db }) {
			return await db.user.findMany({})
		},
	},
	Mutation: {
		async createUser(_, { email, name, password }, { db }) {
			const emailExists = await db.user.findFirst({
				where: {
					email,
				},
			})
			if (emailExists) throw new Error('Email already in use.')
			const nameExists = await db.user.findFirst({
				where: {
					name,
				},
			})
			if (nameExists) throw new Error('Username already in use.')
			const hashedPassword = bcrypt.hashSync(password, 12)
			const user = await db.user.create({
				data: {
					points: 0,
					email,
					name,
					password: hashedPassword,
				},
			})
			return createToken(user.id)
		},
		async signInUser(_, { email, password }, { db }) {
			const user = await db.user.findFirst({
				where: {
					email,
				},
			})
			if (!user) throw new Error('Invalid credentials.')
			const rightPassword = bcrypt.compareSync(password, user.password)
			if (!rightPassword) throw new Error('Invalid credentials.')
			return createToken(user.id)
		},
	},
}
