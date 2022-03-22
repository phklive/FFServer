import { Product, User } from './schema'

import bcrypt from 'bcrypt'
import connectToDB from './database'

const seed = async () => {
	connectToDB()

	await Product.deleteMany({})
	await User.deleteMany({})

	const users = [
		{
			points: 0,
			email: 'phk@gmail.com',
			name: 'phk',
			password: bcrypt.hashSync('phk', 12),
		},
		{
			points: 0,
			email: 'tom@gmail.com',
			name: 'tom',
			password: bcrypt.hashSync('tom', 12),
		},
	]

	const products = [
		{
			title: 'Playstation 5',
			price: 500,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=707&q=80',
			tags: ['tech', 'sony', 'games', 'console'],
		},
		{
			title: 'Dji air 2s',
			price: 800,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1585868830608-f0bde8523cbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			tags: ['tech', 'outdoor', 'dji', 'video', 'photo', 'drone'],
		},
		{
			title: 'BMW Series 1',
			price: 10000,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
			tags: ['car', 'bmw', 'outdoor'],
		},

		{
			title: 'MacBook pro M1',
			price: 1500,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
			tags: ['tech', 'apple', 'computer'],
		},

		{
			title: 'Iphone 13 pro Max',
			price: 1200,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.pexels.com/photos/11525164/pexels-photo-11525164.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
			tags: ['tech', 'apple', 'smartphone'],
		},

		{
			title: 'Sony A7 IV',
			price: 4000,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1603457893497-4de5ef1d8ab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
			tags: ['camera', 'video', 'photo'],
		},
		{
			title: 'Yeezy 350 V2',
			price: 350,
			description: 'Dummy description because i totally forgot lol.',
			image:
				'https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80',
			tags: ['shoes', 'style', 'trend', 'yeezy'],
		},
	]

	const newUsers = await User.insertMany(users)
	const newProducts = await Product.insertMany(products)

	console.log(newUsers, newProducts)
}

seed()
