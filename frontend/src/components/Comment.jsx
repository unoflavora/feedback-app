import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postComment, postReply } from '../reducers/feedbacks'

function Comment({postId, user, reply, setReply}) {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if(reply.mode.toLowerCase() === 'reply') {
      setText(`@${reply.replyingTo}` + ' ')
    }
  }, [reply.replyingTo])

  useEffect(() => {
    if(!text.substring(0,5).includes('@')) {
      setReply({
        mode: 'Comment'
      })
    }
    
  }, [text])

  const handleSubmit = () => {
    if(reply.mode.toLowerCase() === 'comment') {
      dispatch(postComment(postId, text, user))
    }
    if(reply.mode.toLowerCase() === 'reply') {
      dispatch(postReply(postId, reply.id, {
        content: text.replace(/^(@\S+)\s/, ''), //remove @user in text
        replyingTo: reply.replyingTo
      }, user))
    }

    setText('')
  }

  return (
    <div className="bg-white rounded-xl p-5 md:px-10">
      <h1 className="text-xl font-bold mb-3 md:mb-7">Add {reply.mode}</h1>
      <textarea
        maxlength={250}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your comment here" 
        className="w-full h-20 bg-template-gray-light rounded-xl p-3 mb-3"/>
      <div className="flex items-center justify-between">
        <p className="text-template-gray-medium text-sm font-bold">{250-text.length} Characters left</p>
        <button 
          onClick={handleSubmit}
          className="px-5 py-2 text-white hover:bg-[#C75AF6] bg-template-purple rounded-xl">
          Post {reply.mode}
        </button>
      </div>
    </div>
  );
}

export default Comment;