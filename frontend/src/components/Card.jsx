import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowUp } from '../public/shared/icon-arrow-up.svg'
import { ReactComponent as Comments } from '../public/shared/icon-comments.svg'
import { voteFeedback } from '../reducers/feedbacks';

function Card({feedback}) {
  const dispatch = useDispatch()
  return (
    <div className='bg-white rounded-xl xl:px-5 flex flex-col md:flex-row md:justify-between md:text-lg gap-4'>
       <div className='flex gap-10 md:py-3 w-full h-full '>
       <button 
          onClick={() => { dispatch(voteFeedback(feedback._id)) }}
          className={`hidden md:flex  flex-col text-xs font-bold items-center gap-1 py-3
          ${'bg-template-gray-light hover:bg-[#CFD7FF]'}
          h-min px-3 rounded-xl `}>
          <ArrowUp stroke={"#4661E6"}/>
          {feedback.upvotes}
        </button>
        <div className='w-full h-full text-template-navy hover:text-template-blue-dark'>
        <Link to={`/post/${feedback._id}`}>
          <div className='flex flex-col gap-2'>
            <h1 className=' font-bold'>{feedback.title}</h1>
            <h2 className='text-template-gray-medium font-normal md:text-base'>{feedback.description}</h2>
            <div className='rounded-xl text-template-blue-dark px-4 py-2 w-min md:text-sm bg-template-gray-light'>
              {feedback.category === 'ui' ? 'UI' : feedback.category === 'ux' ? 'UX' : feedback.category.charAt(0).toUpperCase() + feedback.category.substring(1,)}
            </div>
          </div>          
          </Link>

          </div>
       </div>
      

    
      <div className='flex justify-between items-center'>
        <button 
          onClick={() => dispatch(voteFeedback(feedback._id))}
          className='flex md:hidden items-center gap-1 p-2 px-4 rounded-xl bg-template-gray-light'>
          <ArrowUp stroke="#4661E6"/>
          {feedback.upvotes}
        </button>
          <Link to={`/post/${feedback._id}`}>
          <div className='flex gap-2 items-center'>
            <Comments/>
            {feedback.comments.length}
          </div>
          </Link>
      </div>
    </div>
  );
}

export default Card;