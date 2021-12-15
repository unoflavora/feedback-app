const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  replyingTo: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  replies: {
    type: [ replySchema ],
    required: true,
    default: []
  }
})

const feedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  upvotes: { 
    type: Number, 
    required: true,
    default: 0 
  },
  status: { 
    type: String, 
    required: true,
    default: 'suggestion'
  },
  comments: {
    type: [ commentSchema ],
    required: true,
    default: []
  }
})

module.exports = mongoose.model('feedback', feedbackSchema)

