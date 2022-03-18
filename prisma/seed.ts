import { PrismaClient } from '@prisma/client'

const seed = async () => {
	const prisma = new PrismaClient()

	await prisma.game.deleteMany({})
	await prisma.product.deleteMany({})
	await prisma.user.deleteMany({})

	const users = [
		{
			points: 0,
			email: 'phk@gmail.com',
			name: 'phk',
			password: 'phk',
		},
		{
			points: 0,
			email: 'tom@gmail.com',
			name: 'tom',
			password: 'tom',
		},
	]

	const userList = await prisma.user.createMany({
		data: users,
	})

	const products = [
		{
			title: 'Playstation 5',
			price: 500,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=707&q=80',
		},
		{
			title: 'Dji air 2s',
			price: 800,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1585868830608-f0bde8523cbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
		},
		{
			title: 'BMW Series 1',
			price: 10000,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
		},
		{
			title: 'MacBook pro M1',
			price: 1500,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		},
		{
			title: 'Sony A7 IV',
			price: 4000,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1603457893497-4de5ef1d8ab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		},
		{
			title: 'Yeezy 350 V2',
			price: 350,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80',
		},
	]

	const productList = await prisma.product.createMany({
		data: products,
	})

	console.log('Users:', userList)
	console.log('Products:', productList)
}

seed()
