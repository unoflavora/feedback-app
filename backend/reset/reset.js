const User = require('../models/user')
const Feedback = require('../models/feedback')

const data = require('./data.json')

//This function is intended to reset the db with the provided JSONs.

async function resetUser() {
  res.send('Post List')
  const users = {}
  for (let post of data.productRequests) {
    if(post.comments) {
      for (let comment of post.comments) {
        users[comment.user.name] = comment.user
        if(post.comments.replies) {
          for(let reply of post.comments.replies) {
            console.log(users[reply.user.name])
            users[reply.user.name] = reply.user
          }
        }
      }
    }
  }
  //for user in users
  //user.save()
}

async function resetPost() {
  const users = await User.find({})
  console.log('deleting...')
  await Feedback.deleteMany({})
  let feedbacks = []
  for (const feedback of data.productRequests) {
    const feedbackPost = {...feedback, comments: []}
    feedbackPost.comments = feedback.comments ?  feedback.comments.map((comment) => {
      let newReplies = []
      if(comment.replies) {       
        for (let reply of comment.replies) {
          let replyingUser = users.filter((user) => user.name === reply.user.name)[0]._id
          let replies = {
            ...reply,
            replyingTo: comment.user.username,
            user: replyingUser
          }
          newReplies.push(replies)
        }
      }

      const newComment = {
        ...comment,
        user: users.filter((user) => user.name === comment.user.name)[0]._id,
        replies: newReplies
      }
      return newComment
    }) : []
    const newFeedback = new Feedback(feedbackPost)
    await newFeedback.save()
    feedbacks.push(feedbackPost)
  }

  return
}


module.exports = { resetPost, resetUser }