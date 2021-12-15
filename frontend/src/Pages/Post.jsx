import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import Card from "../components/Card";
import {ReactComponent as Left} from '../public/shared/icon-arrow-left.svg'
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import { useState, useRef } from "react";
import Reply from "../components/Reply";
function Post() {
  const { id } = useParams()
  const commentRef = useRef()
  const navigate = useNavigate()

  const feedback = useSelector(state =>state.feedbacks.feedback)
    .filter((feedback) => feedback._id === id)[0]

  const user = useSelector(state => state.user)

  const [reply, setReply] = useState({
    mode: 'Comment',
    id: '',
    replyingTo: ''
  })

  const [replyBox, setReplyBox] = useState([])

  const scrolltoComment = () => commentRef.current.scrollIntoView()

  return (
    <div className='bg-template-gray-extraLight min-h-screen xl:flex xl:justify-center p-5 md:p-10'>
      <div className="xl:max-w-2xl">
      <div className='flex items-center justify-between mb-8'>
        <button 
          onClick={() => navigate(-1)}
          className='flex gap-2 items-center text-template-gray-medium font-bold'>
            <Left />
            <p>Go Back</p>
        </button>
        {feedback ? 
          <button className='py-2 px-5 rounded-xl hover:bg-[#7C91F9] bg-template-gray-dark text-white'>
          <Link to={`/edit/${id}`}>
            Edit Feedback
          </Link>
          </button> : null
        }        
      </div>
      {feedback ? 
        <div>
         <div className='p-4 bg-white rounded-2xl mb-5'>
           <Card feedback={feedback}/> 
          </div>
          <div className='bg-white p-5 md:py-7 md:px-10 rounded-2xl'>
            <h1 className='font-bold text-lg'>{feedback.comments.length} Comments </h1>
            {feedback.comments.map((comment, index) => 
              <div className={`${index !== feedback.comments.length-1 ? 'border-b-2' : ''} py-3`}>
                {/* user identities and reply button*/}
                <div className='flex justify-between items-center py-3'>
                  
                  <div className='flex gap-3 items-center'>
                  <img className='h-10 w-10 rounded-full' src={`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/${comment.user.image}`}/>
                    <div className='flex flex-col'>
                      <h1 className='font-bold'>{comment.user.name}</h1>
                      <h2 className='text-template-gray-medium'>@{comment.user.username}</h2>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setReply({
                        mode: 'Reply',
                        id: comment._id,
                        replyingTo: comment.user.username
                      })
                      scrolltoComment()
                    }}
                    className='xl:hidden text-template-gray-dark font-bold'>
                    Reply
                  </button>

                  {/*different button to to show reply box in Desktop */}
                  <button 
                    onClick={() => {
                     replyBox.includes(comment._id) 
                     ? setReplyBox(replyBox.filter(id => id !== comment._id))
                     : setReplyBox(replyBox.concat(comment._id))
                    }}
                    className='hidden xl:block hover:border-b-2 border-template-blue-dark text-template-gray-dark font-bold'>
                    Reply
                  </button>
                </div>
                <p className={`mb-5 md:mb-0 md:pb-5 md:ml-4 md:pl-8 ${comment.replies.length ? 'md:border-l-2': ''}`}>{comment.content}</p>
                 {/* reply box */}
                  <div className={`${replyBox.includes(comment._id) ? 'block': 'hidden'} ml-12`}>
                  <Reply replyBox={replyBox} setReplyBox={setReplyBox} user={user}  postId={id} id={comment._id} replyingTo={comment.user.username} />
                  </div>
                {/* replies, if any */}
                <div className='pl-5 md:ml-4 md:pl-8 border-l-2 md:border-0'>
                {comment.replies.length ? 
                  comment.replies.map((reply, index) => 
                    <div className={index !== comment.replies.length - 1 ? 'mb-5' : ''}>
                      <div className='flex justify-between gap-3 items-center mb-3'>
                        <div className="flex gap-3">
                          <img className='h-10 w-10 rounded-full' src={`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/${reply.user.image}`}/>
                          <div className='flex flex-col'>
                            <h1 className='font-bold'>{reply.user.name}</h1>
                            <h2 className='text-template-gray-medium'>@{reply.user.username}</h2>
                          </div>
                        </div>
                        <button 
                           onClick={() => {
                            setReply({
                              mode: 'Reply',
                              id: comment._id,
                              replyingTo: reply.user.username
                            })
                            scrolltoComment()
                          }}
                          className='xl:hidden text-template-gray-dark font-bold'>
                          Reply
                        </button>

                         {/*different button to to show reply box in Desktop */}
                        <button 
                          onClick={() => {
                          replyBox.includes(reply._id) 
                          ? setReplyBox(replyBox.filter(id => id !== reply._id))
                          : setReplyBox(replyBox.concat(reply._id))
                          }}
                          className='hidden xl:block hover:border-b-2 border-template-blue-dark text-template-gray-dark font-bold'>
                          Reply
                        </button>
                      </div>
                
                      <p className="md:ml-12 md:pl-1 xl:mb-5"><span className="text-template-purple font-bold">@{reply.replyingTo}</span> {reply.content}</p>
                      <div className={`${replyBox.includes(reply._id) ? 'block': 'hidden'} md:ml-12 md:pl-1`}>
                      <Reply replyBox={replyBox} setReplyBox={setReplyBox} user={user}  postId={id} replyId={reply._id} id={comment._id} replyingTo={reply.user.username} />
                      </div>
                    </div>
                  )                 
                : null}
                </div>
              </div>
            )}
          </div>
          <div ref={commentRef} className="py-8">
            <Comment 
              postId={id} user={user} 
              reply={reply} setReply={setReply}
            />
          </div>
        </div> : null }
      
      </div>

      
    </div>
  );
}

export default Post;

