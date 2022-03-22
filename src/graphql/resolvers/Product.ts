import { Resolvers } from '../../generated/graphql'
import { MyContext } from '../../utils/types'

export const productResolver: Resolvers<MyContext> = {
	Query: {
		async products(_, { search }, { db }) {
			if (search) {
				return await db.product.findMany({
					where: {
						title: {
							contains: search,
							mode: 'insensitive',
						},
					},
				})
			}

			return await db.product.findMany({})
		},

		async product(_, { productId }, { db }) {
			return await db.product.findFirst({
				where: {
					id: productId,
				},
			})
		},
	},
	Mutation: {
		async likeProduct(_, { productId }, { db, user }) {
			return await db.product.update({
				where: {
					id: productId,
				},
				data: {
					title: 'hello',
				},
			})
		},
	},
}
