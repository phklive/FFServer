import { Resolvers } from '../../generated/graphql'
import { MyContext } from '../../utils/types'

export const postResolver: Resolvers<MyContext> = {
	Query: {
		async posts(_, args, { db }) {
			return await db.post.findMany()
		},

		async userPosts(_, args, { db }) {
			return await db.post.findMany({
				where: {
					authorId: '621b82debe1cf068d72b121c',
				},
			})
		},
	},

	Mutation: {
		async createPost(_, { title, body }, { db }) {
			return await db.post.create({
				data: {
					title,
					body,
					authorId: '621b82debe1cf068d72b121c',
				},
			})
		},
	},
}
