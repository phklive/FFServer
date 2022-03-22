import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import jwt from 'express-jwt'
import typeDefs from './graphql/typeDefs'
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import { productResolver } from './graphql/resolvers/Product'
import { userResolver } from './graphql/resolvers/User'
import connectToDB from '../db/database'
dotenv.config()

async function startApolloServer() {
	const app = express()
	const httpServer = http.createServer(app)

	connectToDB()

	const checkJwt = jwt({
		secret: process.env.JWT_SECRET!,
		algorithms: ['HS256'],
		credentialsRequired: false,
	})

	const server = new ApolloServer({
		resolvers: [userResolver, productResolver],
		typeDefs,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		context: ({ req }) => {
			return {
				user: req.user || null,
			}
		},
	})

	await server.start()

	app.use(checkJwt)

	server.applyMiddleware({ app })

	await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
