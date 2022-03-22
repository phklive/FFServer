import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		points: { type: Number, required: true },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
)

const ProductSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		tags: { type: [String], required: true },
		price: { type: Number, required: true },
		image: { type: String, required: true },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
)

export const User = mongoose.model('User', UserSchema)
export const Product = mongoose.model('Product', ProductSchema)
export const db = { User, Product }
