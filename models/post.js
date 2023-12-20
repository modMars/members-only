const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
	title: { type: String, required: true },
	message: { type: String, required: true },
	created_by: { type: Schema.Types.ObjectId, ref: 'User' },
	creation_date: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Post', postSchema)
