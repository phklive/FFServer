import { gql } from 'apollo-server-express'

const typeDefs = gql`
	type Query {
		me: User
		user(userId: String!): User!
		users: [User!]!
		userLikes(userId: String!): [Game!]
		userGames(userId: String!): [Game!]
		game(id: String!): Game!
		games: [Game!]!
		product(productId: String!): Product!
		products: [Product!]!
	}

	type Mutation {
		createUser(email: String!, name: String!, password: String!): String!
		signInUser(email: String!, password: String!): String!
		createGame(
			product: InputProduct!
			slots: Int!
			players: [InputUser!]
		): Product!
		joinGame(gameId: String!, gameType: String!): Game!
		like(gameId: String!): Game!
		play(gameId: String!): Game!
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
	}

	input InputProduct {
		id: String!
		title: String!
		description: String!
		image: String!
		price: Int!
	}
`

export default typeDefs
