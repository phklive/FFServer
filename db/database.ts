import mongoose from 'mongoose'

// Connect to database

const connectToDB = () => {
	const db = process.env.DB_URL!
	mongoose.connect(db)

	const dataBase = mongoose.connection
	dataBase.once('open', _ => {
		console.log('📀 Database connected')
	})

	dataBase.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

export default connectToDB
