import { useState } from "react";
import { useDispatch } from "react-redux";
import { postReply } from "../reducers/feedbacks";

function Reply({replyBox, setReplyBox, postId, replyId, id, replyingTo, user}) {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(postReply(postId, id, {
      content: text.replace(/^(@\S+)\s/, ''), //remove @user in text
      replyingTo: replyingTo
    }, user))

    //hide box
    setReplyBox(replyBox.filter(idInBox => idInBox !== id && idInBox !== replyId))
    setText('')
  }

  return (
    <div className="w-full flex justify-between gap-5 pb-5">
      <textarea 
        maxlength={250}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 rounded-lg py-2 outline-none border-2 h-20 focus:border-template-blue-dark bg-template-gray-extraLight"/>
      <button
       onClick={handleSubmit}
       className='px-5 rounded-lg py-2 text-white text-center min-w-max h-min hover:bg-[#C75AF6] bg-template-purple'>
        Post Reply
      </button>
    </div>
  );
}

export default Reply;