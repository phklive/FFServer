import { MyContext } from '../../utils/types'
import { Product } from '../../../db/schema'
import { Resolvers } from '../../generated/graphql'

export const productResolver: Resolvers<MyContext> = {
	Query: {
		async products(_, { search }) {
			if (search) {
				return await Product.find({
					$or: [
						{ title: new RegExp(`${search}`, 'i') },
						{ tags: new RegExp(`${search}`, 'i') },
					],
				})
			}
			return await Product.find({})
		},
		async product(_, { productId }) {
			return await Product.findById(productId)
		},
	},
	Mutation: {
		async createProduct(_, { title, price, description, image, tags }) {
			const newProduct = new Product({
				title,
				price,
				description,
				image,
				tags,
			})
			return await newProduct.save()
		},
	},
}
