import { Resolvers } from '../../generated/graphql'
import { MyContext } from '../../utils/types'

export const productResolver: Resolvers<MyContext> = {
	Query: {
		async products(_, args, { db }) {
			return await db.product.findMany({})
		},
	},
	Mutation: {},
}
