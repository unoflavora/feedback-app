import {ReactComponent as Plus} from '../public/shared/icon-plus.svg'
import {ReactComponent as Back} from '../public/shared/icon-arrow-left.svg'
import down from '../public/shared/icon-arrow-down.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postFeedback } from '../reducers/feedbacks';
import { useDispatch, useSelector } from 'react-redux';
import { error } from '../reducers/message';

function NewFeedback() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('UI')
  const [description, setDescription] = useState('')
  const message = useSelector(state => state.message)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!title || !description) {
      dispatch(error('No empty field is allowed'))
      setTimeout(() => {
        dispatch(error(''))
      }, 3000)
      return
    }
    dispatch(postFeedback({title, category, description}))
    setTimeout(() => {
      navigate(-1)
    }, 1000)
    setCategory('') 
    setDescription('') 
    setCategory('UI')
  }



  return (
    <div className="xl:flex xl:justify-center bg-template-gray-extraLight min-h-screen md:px-20 md:py-10 ">
      <div className='xl:max-w-2xl'>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 p-5 md:text-lg text-template-gray-medium font-bold">
          <Back/>
          <p>Go Back</p>
        </button>

        <div className='p-5 text-template-navy'>
          
          <div className='relative bg-white rounded-2xl md:pb-10 md:px-7 p-5'>
            <div className='absolute -top-5 left-5'>
              <Plus/>
            </div>
            <h1 className='text-xl font-bold my-5'>Create New Feedback</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

              <label className='mb-3' htmlFor='title'>
                <h2 className='font-bold'>Feedback title</h2>
                <h3 className='text-template-gray-medium mb-3'>
                    Add a short descriptive headline
                </h3>
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id='title' type='text' 
                  className={`w-full p-3 bg-template-gray-light rounded-xl`}/>
              </label>

              <label className='mb-3' htmlFor='category'>
                <h2 className='font-bold'>Category</h2>
                <h3 className='text-template-gray-medium mb-3'>
                    Choose a category for your feedback
                </h3>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  id='category' 
                  style={{backgroundImage: `url(${down})`}}
                  className={`bg-no-repeat
                  bg-[position:right_.7em_top_50%,_0_0] bg-[length:.65em_auto,_100%;]
                  w-full p-3 appearance-none
                bg-template-gray-light rounded-xl justify-end`}>
                  ${['UI', 'UX', 'Enhancement', 'Bug', 'Feature'].map(item => 
                      <option key={item} value={item}>{item}</option>
                    )}
                </select>
              </label>

              <label className='mb-3' htmlFor='description'>
                <h2 className='font-bold'>Feedback Detail</h2>
                <h3 className='text-template-gray-medium mb-3'>
                  Include any specific comments on what should be improved, added, etc.
                </h3>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id='description' 
                  className={`w-full p-3 h-28 bg-template-gray-light rounded-xl`}/>
              </label>
              {message.error && <p className='text-red-500 text-center w-full'>{message.error}</p>}
              {message.success && <p className='text-green-500 text-center w-full'>{message.success}</p>}
              <div className='md:flex justify-end gap-5'>
              <button type='submit' className='w-full mb-5 md:mb-0 md:w-fit md:px-5 md:order-last text-center py-3 rounded-xl bg-template-purple text-white'>
                Add Feedback
              </button>
              <button 
                onClick={() => navigate(-1)}
                type='button' className='w-full md:w-fit md:px-5 text-center py-3 rounded-xl bg-template-navy text-white'>
                Cancel
              </button>
              </div>
            
            </form>
          </div>
        </div>
      </div>
      

    </div>
  );
}

export default NewFeedback;