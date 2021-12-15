const userData = {
  name: 'test',
  username: 'test',
  image: 'test',
  password: 'test',
  privilege: 'User'
}

const adminData = {
  name: 'admin',
  username: 'admin',
  image: 'test',
  password: 'admin',
  privilege: 'Admin'
}

const post = {
  content: 'This content is so good',
}

const reply = {
  replyingTo: 'Suzanna',
  content: 'Yeah i agree with you!'
}

const feedback = {
  title: 'This feature is so good',
  category: 'feature',
  upvotes: 200,
  status: 'suggestion',
  description: 'This feature will make users feel nice',
}

module.exports = { userData, post, feedback, reply, adminData }