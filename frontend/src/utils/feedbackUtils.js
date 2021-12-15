import axios from 'axios'

const url = 'http://localhost:3000'
let token

const fetch = async () => {
  const response = await axios.get(url + '/feedback')
  return response.data
}

const getToken = async () => {
  //simulate login
  const response = await axios.post(url + '/user/login', {
    "username": "velvetround",
    "password": "kueVelvet"
  })
  token = response.data.token
  return token
}

const postFeedback = async (newFeedback) => {
  const response = await axios.post(url + `/feedback`, {
    ...newFeedback
  }, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  return response.data
}

const updateFeedback = async (newFeedback) => {
  const response = await axios.put(url + `/feedback/update/${newFeedback._id}`, {
    ...newFeedback
  }, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  return response.data
}


const voteFeedback = async (id) => {
  const auth = {
    headers: {
      Authorization : `bearer ${token}`
    }
  }
  const response = await axios.put(url + `/feedback/upvote/${id}`, {}, auth)
  return response
}

const deleteFeedback = async (id) => {
  const auth = {
    headers: {
      Authorization : `bearer ${token}`
    }
  }
  const response = await axios.delete(url + `/feedback/post/${id}`, {}, auth)
  return response
}

const postComment = async (postId, comment) => {
  const response = await axios.post(url + `/feedback/comment/${postId}`, {
    content: comment
  }, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  return response.data
}

const postReply = async (postId, commentId, reply) => {
  console.log('replying')
  const response = await axios.post(url + `/feedback/reply/${postId}/${commentId}`, {
    ...reply
  }, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  return response.data
}

export default {fetch, postComment, getToken, postReply, postFeedback, updateFeedback, deleteFeedback, voteFeedback}