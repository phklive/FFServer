import { gql } from 'apollo-server-express'

const typeDefs = gql`
	type Query {
		me: User
		user(userId: String!): User!
		users(userId: String): [User!]!
		userLikes(userId: String!): [Game!]
		userGames(userId: String!): [Game!]
		game(id: String!): Game!
		games: [Game!]!
		product(productId: String!): Product
		products(search: String): [Product!]!
	}

	type Mutation {
		createUser(email: String!, name: String!, password: String!): String!
		signInUser(email: String!, password: String!): String!
		createGame(
			product: InputProduct!
			slots: Int!
			players: [InputUser!]
		): Product!
		likeProduct(productId: String!): Product!
		playGame(gameId: String!): Game!
	}

	type User {
		id: String!
		name: String!
		email: String!
		password: String!
		points: Int!
		likes: [Game!]
		games: [Game!]
	}

	input InputUser {
		id: String!
		name: String!
		email: String!
		password: String!
		points: Int!
		likes: [InputGame!]
		games: [InputGame!]
	}

	type Game {
		id: String!
		product: Product!
		slots: Int!
		players: [User!]
	}

	input InputGame {
		id: String!
		product: InputProduct!
		slots: Int!
		players: [InputUser!]
	}

	type Product {
		id: String!
		title: String!
		description: String!
		image: String!
		price: Int!
		tags: [String!]!
	}

	input InputProduct {
		id: String!
		title: String!
		description: String!
		image: String!
		price: Int!
		tags: [String!]!
	}
`

export default typeDefs
