const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	membership_status: { type: Boolean, required: true, default: false },
})

userSchema.virtual('full-name').get(function () {
	return `${this.first_name} ${this.last_name}`
})

module.exports = mongoose.model('User', userSchema)
