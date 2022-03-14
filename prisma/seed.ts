import { PrismaClient } from '@prisma/client'

const seed = async () => {
	const prisma = new PrismaClient()

	await prisma.post.deleteMany({})
	await prisma.user.deleteMany({})

	const user = await prisma.user.create({
		data: {
			email: 'tom@gmail.com',
			name: 'tom',
			password: 'tom',
		},
	})

	const posts = [
		{
			title: 'Test post',
			body: 'Test body for the test post',
			authorId: user.id,
		},
		{
			title: 'Post 2',
			body: 'Test body for the test post 2',
			authorId: user.id,
		},
	]

	const post = await prisma.post.createMany({
		data: posts,
	})

	console.log('User:', user)
	console.log('Post:', post)
}

seed()
