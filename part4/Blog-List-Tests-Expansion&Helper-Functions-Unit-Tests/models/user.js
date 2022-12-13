const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  username: { type: String, required: true },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = model('User', userSchema)
