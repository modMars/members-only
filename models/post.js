const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const postSchema = new Schema({
	title: { type: String, required: true },
	message: { type: String, required: true },
	created_by: { type: Schema.Types.ObjectId, ref: 'User' },
	creation_date: { type: Date, default: Date.now() },
})

postSchema.virtual('formatted_creation_date').get(function () {
	return DateTime.fromJSDate(this.creation_date).toFormat('MM/dd/yyyy HH:mm')
})
module.exports = mongoose.model('Post', postSchema)
