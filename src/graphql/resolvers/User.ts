import { Resolvers } from '../../generated/graphql'
import { MyContext } from '../../types'

export const userResolver: Resolvers<MyContext> = {
	Query: {
		async users(_, args, { db }) {
			return await db.user.findMany({
				include: {
					posts: true,
				},
			})
		},

		async user(_, args, { db }) {
			const user = await db.user.findFirst({
				where: {
					id: '621b94e80d6b70c6240768f1',
				},
				include: {
					posts: true,
				},
			})
			return user
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
			if (nameExists) throw new Error('Name already in use.')

			return await db.user.create({
				data: {
					id: 'test',
					email,
					name,
					password,
				},
			})
		},
	},
}
