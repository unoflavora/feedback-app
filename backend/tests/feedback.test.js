const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const Feedback = require('../models/feedback')
const helper = require('./helper/helper')
const request = supertest(app)
const path = require('path')
const decode = require('jwt-decode')

let token
let tokenAdmin
let user

beforeAll(async () => {
  await User.deleteMany({})
  await Feedback.deleteMany({})

  const res = await request.post('/user/register')
    .field('data', JSON.stringify(helper.userData))
    .attach('user-photo', path.join(__dirname, './helper/profile.jpg'))
    .set('Content-Type', 'multipart/form-data')

  expect(res.statusCode).toBe(200)

  const resAdmin = await request.post('/user/register')
    .field('data', JSON.stringify(helper.adminData))
    .attach('user-photo', path.join(__dirname, './helper/profile.jpg'))
    .set('Content-Type', 'multipart/form-data')
  
  tokenAdmin = resAdmin.body.token
  token = res.body.token
  user = decode(token)
})

describe('CREATE', () => {
  test('only Logged In user can post', async() => {
    await request.post('/feedback')
    .send(helper.feedback)
    .expect(401)
  })

  test('able to write a feedback', async () => {
    await request.post('/feedback')
      .send(helper.feedback)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
    
    const feedbacks = await Feedback.findOne({title: helper.feedback.title})
    expect(feedbacks).toEqual(expect.objectContaining(helper.feedback)
    )
  })

  test('able to write a comment', async () => {
    const feedback = await Feedback.findOne({title: helper.feedback.title})
    await request.post(`/feedback/comment/${feedback.id}`)
      .send({...helper.post})
      .set('Authorization', `bearer ${token}`)
      .expect(200)
    
    const newFeedback = await Feedback.findOne({title: helper.feedback.title})
    expect(newFeedback.comments[0]).toEqual(expect.objectContaining(helper.post)
    )
  })

  test('able to write a reply', async () => {
    const feedback = await Feedback.findOne({title: helper.feedback.title})
    const comment = feedback.comments[0]
    await request.post(`/feedback/reply/${feedback.id}/${comment.id}`)
      .send({...helper.reply})
      .set('Authorization', `bearer ${token}`)
      .expect(200)
    
    const newFeedback = await Feedback.findOne({title: helper.feedback.title})
    expect(newFeedback.comments[0].replies[0]).toEqual(expect.objectContaining(helper.reply)
    )
  })
})

describe('READ', () => {
  test('gets the feedback', async () => {
    const res = await request.get('/feedback')
    expect(res.status).toBe(200)
    expect(res.body[0]).toEqual(expect.objectContaining(helper.feedback))
  })  
})

describe('UPDATE', () => {
  test('only Logged In user can vote', async() => {
    const feedback = await Feedback.findOne({})
    await request.put(`/feedback/upvote/${feedback.id}`)
    .send(helper.feedback)
    .expect(401)
  })

  test('able to upvote a feedback', async () => {
    const feedback = await Feedback.findOne({})
    await request.put(`/feedback/upvote/${feedback.id}`)
      .set('Authorization', `bearer ${token}`)
    const updatedFeedback = await Feedback.findOne({})
    expect(updatedFeedback.upvotes).toEqual(helper.feedback.upvotes + 1)
  })

  test('only admin can change status', async () => {
    const feedback = await Feedback.findOne({})
    await request.put(`/feedback/status/${feedback.id}`)
      .set('Authorization', `bearer ${tokenAdmin}`)
      .send({
        status: 'planned'
      })
    const updatedFeedback = await Feedback.findOne({})
    expect(updatedFeedback.status).toBe('planned')

  await request.put(`/feedback/status/${feedback.id}`)
    .set('Authorization', `bearer ${token}`)
    .send({
      status: 'planned'
    })
    .expect(401)
  })
})

describe('DELETE', () => {
  let feedbackId, commentId, replyId, feedback

  beforeAll(async () => {
    const feedback = await Feedback.findOne({})
    feedbackId = feedback.id
    commentId = feedback.comments[0].id
    replyId = feedback.comments[0].replies[0].id
  })


  test('only admin is able to delete feedback posts', async () => {
    await request.delete(`/feedback/post/${feedbackId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(401)
  })

  test('able to delete reply', async () => {
     await request.delete(`/feedback/reply/${feedbackId}/${commentId}/${replyId}`)
      .set('Authorization', `bearer ${tokenAdmin}`)
      .expect(200)
  })

  test('cannot delete a reply if reply ID is not provided', async () => {
    await request.delete(`/feedback/reply/${feedbackId}/${commentId}`)
     .set('Authorization', `bearer ${tokenAdmin}`)
     .expect(400)
 })

  test('able to delete comment', async () => {
    await request.delete(`/feedback/comment/${feedbackId}/${commentId}`)
     .set('Authorization', `bearer ${tokenAdmin}`)
     .expect(200)
  })

  test('cannot delete a comment if comment ID is not provided', async () => {
    await request.delete(`/feedback/comment/${feedbackId}`)
     .set('Authorization', `bearer ${tokenAdmin}`)
     .expect(400)
  })

 test('able to delete feedback post', async () => {
  await request.delete(`/feedback/post/${feedbackId}`)
   .set('Authorization', `bearer ${tokenAdmin}`)
   .expect(200)

   feedback = await Feedback.findOne({})
   expect(feedback).toBeNull()
})


})


