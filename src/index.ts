import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'
import { userResolver } from './graphql/resolvers/User'
import typeDefs from './graphql/typeDefs'
import http from 'http'
import express from 'express'
import { MyContext } from './types'
import { postResolver } from './graphql/resolvers/Post'

async function startApolloServer() {
	const app = express()
	const prisma = new PrismaClient()
	const httpServer = http.createServer(app)

	const server = new ApolloServer({
		resolvers: [userResolver, postResolver],
		typeDefs,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		context: ({ req }): MyContext => {
			return {
				db: prisma,
				req: req,
			}
		},
	})

	await server.start()

	server.applyMiddleware({ app })

	await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
