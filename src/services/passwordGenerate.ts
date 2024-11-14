import * as bcrypt from 'bcrypt'

export const generatePass = (password: string) => {
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)
	return hash
}
