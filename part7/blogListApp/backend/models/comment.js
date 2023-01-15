const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  comment: String,
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Comment', commentSchema)
