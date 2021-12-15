const Feedback = require("../models/feedback")
const express = require('express')
const logger = require('../utils/logger')
var router = express.Router();

router.get('/', async function(req, res) {
  const feedbacks = await Feedback.find({}).populate('comments.user').populate('comments.replies.user')
  res.status(200).json(feedbacks)
})

router.post('/:type?/:postId?/:commentId?', async function(req, res) {
  const { type, postId, commentId } = req.params
  const data = req.body
  if(!req.user) {
    res.status(401).json({error:'Youre not authorized to make this request'})
  } else {
    const user = req.user
    //post feedback
    if (!type) {
      logger.info(data)
      const newPost = new Feedback(data)
      const newFeedback = await newPost.save()
      res.status(200).json({
        ok: true,
        newFeedback
      })    
    }

    //post comment
    if(type === 'comment') {
      const feedback = await Feedback.findById(postId)
      feedback.comments.push({
          user: user.id,
          content: data.content,
      })
      const comment = feedback.comments[feedback.comments.length - 1]
      await feedback.save()

      res.status(200).json({
        ok:true,
        comment
      })

    //post reply to a comment
    } else if(type === 'reply') {
      const feedback = await Feedback.findById(postId)
      logger.info(feedback.comments.id(commentId))
      feedback.comments.id(commentId).replies.push(
        {
          user: user.id,
          content: data.content,
          replyingTo: data.replyingTo    
        }
      )

      const replies = feedback.comments.id(commentId).replies
      const reply = replies[replies.length - 1]
      logger.info(reply)
      await feedback.save()
      res.status(200).json({
        ok: true,
        reply
      })
    }
  }
})

router.put('/:type/:postId', async function(req, res, next) {
  const data = req.body
  const { type, postId } = req.params

  if(!req.user) {
    const error = new Error('not authorized')
    error.status = 401
    next(error)
    return
  }

  
  //update post
  if(type === 'update') {
    const newFeedback = await Feedback.findByIdAndUpdate(postId, {
      ...data
    }, {new: true})

    res.status(201).json({ok:true, newFeedback})
  }

  //upvote a feedback
  if(type === 'upvote') {
    const feedback = await Feedback.findById(postId)
    await Feedback.findByIdAndUpdate(postId, {
      upvotes: feedback.upvotes + 1
    })
    res.status(204).send('Data is updated')

  //change a status
  } else if(type === 'status') {
    if(req.user.privilege !== 'Admin') {
      res.status(401).json({error:'Youre not authorized to make this request'})
    } else {
      await Feedback.findByIdAndUpdate(postId, {
        status: data.status
      })
      res.status(204).send('Data is updated')
    }
  }
})

router.delete('/:type/:postId/:commentId?/:replyId?', async function(req, res, next) {
  const { type, postId, commentId, replyId } = req.params

  if (type === 'post') { 
    try {
      await Feedback.findByIdAndDelete(postId)
      res.status(200).send('Successful Delete!')  
    } catch(e) {
      next(e)
    }
  } else if(type === 'comment') {
    if(!commentId) {
      res.status(400).json({error: 'comment is not found'})
      return
    }
    const feedback = await Feedback.findById(postId)
    feedback.comments = feedback.comments.filter((comment) => 
      comment.id !== commentId
    )
    feedback.save()
    res.status(200).send('Successful Delete Comment!')

  
  } else if(type === 'reply') {
    if(!replyId) {
      res.status(400).json({error: 'reply is not found'})
      return
    }
    const feedback = await Feedback.findById(postId)
    const newReplies = feedback.comments.id(commentId).replies.filter((reply) => {
      return reply.id !== replyId
    })
    
    feedback.comments.id(commentId).replies = newReplies

    feedback.save()
    res.status(200).send('Successful Delete Reply!')
  }
})

module.exports = router