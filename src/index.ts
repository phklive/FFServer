import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'
import { userResolver } from './graphql/resolvers/User'
import { MyContext } from './utils/types'
import { postResolver } from './graphql/resolvers/Post'
import jwt from 'express-jwt'
import typeDefs from './graphql/typeDefs'
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

async function startApolloServer() {
	const app = express()
	const prisma = new PrismaClient()
	const httpServer = http.createServer(app)

	const checkJwt = jwt({
		secret: process.env.JWT_SECRET!,
		algorithms: ['HS256'],
		credentialsRequired: false,
	})

	const server = new ApolloServer({
		resolvers: [userResolver, postResolver],
		typeDefs,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		context: ({ req }): MyContext => {
			return {
				db: prisma,
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
