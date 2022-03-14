import { gql } from 'apollo-server-express'

const typeDefs = gql`
	type Query {
		users: [User!]!
		user: User
		posts: [Post!]!
		post: Post
		userPosts: [Post!]
	}

	type Mutation {
		createUser(email: String!, name: String!, password: String!): String!
		loginUser(email: String!, password: String!): String!
		createPost(title: String!, body: String!): Post!
	}

	type User {
		id: String!
		email: String!
		name: String!
		password: String!
		posts: [Post]
	}

	type Post {
		id: String!
		title: String!
		body: String!
		authorId: String!
	}
`

export default typeDefs
