import { MyContext } from '../../utils/types'
import bcrypt from 'bcrypt'
import { createToken } from '../../utils/auth'
import { User } from '../../../db/schema'
import { Resolvers } from '../../generated/graphql'

export const userResolver: Resolvers<MyContext> = {
	Query: {
		async me(_, args, { user }) {
			if (!user.id) throw new Error('You are not authenticated.')
			return await User.findById(user.id)
		},
	},
	Mutation: {
		async createUser(_, { email, name, password }) {
			const emailExists = await User.findOne({ email })
			if (emailExists) throw new Error('Email already in use.')
			const nameExists = await User.findOne({ name })
			if (nameExists) throw new Error('Username already in use.')
			const hashedPassword = bcrypt.hashSync(password, 12)
			const newUser = new User({
				points: 0,
				email,
				name,
				password: hashedPassword,
			})
			const user = await newUser.save()
			const token = createToken(user.id)
			return {
				user,
				token,
			}
		},
		async signInUser(_, { email, password }, { db }) {
			const user = await User.findOne({ email })
			if (!user) throw new Error('Invalid credentials.')
			const rightPassword = bcrypt.compareSync(password, user.password)
			if (!rightPassword) throw new Error('Invalid credentials.')
			const token = createToken(user.id)
			return {
				user,
				token,
			}
		},
	},
}
