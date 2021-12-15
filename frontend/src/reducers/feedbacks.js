import server from '../utils/feedbackUtils'
import { success } from './message'


export default function feedbackReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH':
      return {...state, feedback: action.payload}
    case 'CATEGORY COUNT':
      return {...state, category: action.payload}
    case 'POST FEEDBACK':
      return{...state, feedback: state.feedback.concat(action.payload)} 
    case 'UPDATE FEEDBACK':
      const newStateFeedback = state.feedback.map((post) => {
        if(post._id === action.payload._id) {
          return action.payload
        }
        return post
      })
      return {...state, feedback: newStateFeedback}
    case 'VOTE FEEDBACK':
      console.log(action.payload)

      const votedStateFeedback = state.feedback.map(post => {
        if(post._id === action.payload) {
          post.upvotes += 1
        } 
        return post
      })
      return {...state, feedback: votedStateFeedback}
    case 'DELETE FEEDBACK':
      const updatedFeedback = state.feedback.filter(post => 
        post._id !== action.payload
      )
      return {...state, feedback: updatedFeedback}
    case 'POST COMMENT':
      const newState = state.feedback.map((post) => {
        if(post._id === action.payload.id) {
          post.comments.push(action.payload.comment)
        }
        return post
       })
      return {...state, feedback: newState}
    case 'POST REPLY' :
      const newStateReply = state.feedback.map((post) => {
        if(post._id === action.payload.id) {
          post.comments.map((comment) => {
            if(comment._id === action.payload.commentId) {
              comment.replies.push(action.payload.reply)
            }
            return comment
          })
        }
        return post
      })
      return {...state, feedback: newStateReply}
    default:
      return state
  }
}


const initialState = {
  feedback: [],
  category: {
    'Planned':['bg-template-orange', 0],
    'In-Progress': ['bg-template-purple',0],
    'Live': ['bg-template-blue-light', 0]
  },
}

const fetchData = (data) => {
  return {
    type: 'FETCH',
    payload: data
  }
}

const voteFeedbackAction = (id) => {
  console.log(id)
  return {
    type: 'VOTE FEEDBACK',
    payload: id
  }
}

const postFeedbackAction = (data) => {
  return {
    type: 'POST FEEDBACK',
    payload: data
  }
}

const updateFeedbackAction = (data) => {
  return {
    type: 'UPDATE FEEDBACK',
    payload: data
  }
}

const deleteFeedbackAction = (id) => {
  return {
    type: 'DELETE FEEDBACK',
    payload:id
  }
}

const postCommentAction = (postId, comment, user) => {
  return {
    type: 'POST COMMENT',
    payload: {
      id: postId,
      comment: {
        ...comment,
        user
      }
    }
  }
}

const postReplyAction = (postId, commentId, reply, user) => {
  console.log(postId, commentId, reply, user)
  return {
    type: 'POST REPLY',
    payload: {
      id: postId,
      commentId,
      reply: {
        ...reply, 
        user
      }
    }
  }
} 


export const categoryCount = (data) => {
  let categoryData = {
    'Planned':['bg-template-orange', 0],
    'In-Progress': ['bg-template-purple',0],
    'Live': ['bg-template-blue-light', 0]
  }

  if(data) {
    data.forEach((feedback) => {
      for(let category in categoryData) {
        if(category.toLowerCase() === feedback.status) {
          categoryData[category][1] += 1
          console.log(categoryData[category])
          break;
        }
      }
    })
  }

  return {
    type: 'CATEGORY COUNT',
    payload: categoryData
  }
}


export function fetchFeedback() {
  return async dispatch => {
    const data = await server.fetch()
    dispatch(fetchData(data))
  }
}

export function postFeedback(newFeedback) {
  return async dispatch => {
    await server.getToken()
    const res = await server.postFeedback(newFeedback)
    if(res.ok) {
      dispatch(success('Feedback is posted'))
      setTimeout(() => {
        dispatch(success(''))
      }, 3000)
      dispatch(postFeedbackAction(res.newFeedback))
    }
  }
}

export function voteFeedback(id) {
  return async dispatch => {
    await server.getToken()
    const res = await server.voteFeedback(id)
    if(res.status === 204) {
      dispatch(success('Voted!'))
      setTimeout(() => {
        dispatch(success(''))
      }, 3000)
      dispatch(voteFeedbackAction(id))
    }
  }
}

export function updateFeedback(newFeedback) {
  return async dispatch => {
    await server.getToken()
    const res = await server.updateFeedback(newFeedback)
    if(res.ok) {
      dispatch(success('Feedback is updated'))
      setTimeout(() => {
        dispatch(success(''))
      }, 3000)
      console.log(res)
      dispatch(updateFeedbackAction(newFeedback))
    }
  }
}

export function deleteFeedback(id) {
  return async dispatch => {
    await server.getToken()
    const res = await server.deleteFeedback(id)
    console.log(res)
    if(res.status === 200) {
      dispatch(success('Feedback is deleted'))
      setTimeout(() => {
        dispatch(success(''))
      }, 3000)
      dispatch(deleteFeedbackAction(id))
    }
  }
}

export function postComment(postId, comment, user) {
  return async dispatch => {
    await server.getToken()
    try {
      const res = await server.postComment(postId, comment)
      if(res.ok){
        dispatch(postCommentAction(postId, res.comment, user))
      }
    } catch(e) {
      console.log(e)
    }
  }
}

export function postReply(postId, commentId, reply, user) {
  return async dispatch => {
    await server.getToken()
    try {
      const res = await server.postReply(postId, commentId, reply)
      if(res.ok){
        dispatch(postReplyAction(postId, commentId, res.reply, user))
      }
    } catch(e) {
      console.log(e)
    }
  }
}
