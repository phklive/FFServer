import jwt from 'jsonwebtoken'

export const createToken = (userId: string) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
		expiresIn: '30 days',
	})
}

export const authError = () => {
	throw new Error('You are not authenticated.')
}
