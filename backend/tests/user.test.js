const supertest = require('supertest')
const path = require('path')
const app = require('../app')
const User = require('../models/user')
const Feedback = require('../models/feedback')
const request = supertest(app)
const helper = require('./helper/helper')
beforeAll(async () => {
  await User.deleteMany({})
  await Feedback.deleteMany({})
})

describe('User test', () => {
  test('Sucessfully registering user', async () => {
    const res = await request.post('/user/register')
    .field('data', JSON.stringify(helper.userData)
    )
    .attach('user-photo', path.join(__dirname, './helper/profile.jpg'))
    .set('Content-Type', 'multipart/form-data')
    
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })

  test('Sucessfully logged in', async () => {
    const res = await request.post('/user/login')
    .send({
      username: 'test',
      password: 'test'
    })
    .expect(200)

    expect(res.body.token).toBeDefined()
  })

  test('Wrong credentials is forbidden', async () => {
    const res = await request.post('/user/login')
    .send({
      username: 'awowo',
      password: 'awawoaoa'
    })
    .expect(401)

  })

  test('If username is already existed, registation will fail', async () => {
    const res = await request.post('/user/register')
    .field('data', JSON.stringify({
        name: 'test',
        username: 'test',
        image: 'test',
        password: 'test',
        privilege: 'User'
      })
    )
    .attach('user-photo', path.join(__dirname, './helper/profile.jpg'))
    .set('Content-Type', 'multipart/form-data')
    
    expect(res.status).toBe(401)
    expect(res.body.error).toEqual(expect.stringContaining('already exists'))
  })

 
})