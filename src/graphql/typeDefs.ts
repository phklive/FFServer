import { gql } from 'apollo-server-express'

const typeDefs = gql`
	type Query {
		me: User
		product(productId: String!): Product
		products(search: String): [Product!]!
	}

	type Mutation {
		createUser(email: String!, name: String!, password: String!): UserResponse!
		signInUser(email: String!, password: String!): UserResponse!
		createProduct(
			title: String!
			description: String!
			image: String!
			price: Int!
			tags: [String!]!
		): Product!
	}

	type User {
		id: String!
		name: String!
		email: String!
		password: String!
		points: Int!
	}

	type Product {
		id: String!
		title: String!
		description: String!
		image: String!
		price: Int!
		tags: [String!]!
	}

	type UserResponse {
		user: User!
		token: String!
	}
`

export default typeDefs
