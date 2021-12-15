import { useEffect } from 'react';
import { useState, useRef, createRef } from 'react'
import { Waypoint } from 'react-waypoint';
import Button from "../components/Button";
import Card from '../components/Card';
import Goback from "../components/Goback";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowUp } from '../public/shared/icon-arrow-up.svg'
import { ReactComponent as Comments } from '../public/shared/icon-comments.svg'
import { voteFeedback } from '../reducers/feedbacks';

export default function Roadmap({categories, feedbacks}) {
  const dispatch = useDispatch()
  const [roadmap, setRoadmap] = useState('Planned')
  const color = {
    'Planned' : 'template-orange',
    'In-Progress': 'template-purple',
    'Live': 'template-blue-light'
  }
  let categoryRef = useRef()
  let selectedStyle = `text-template-navy font-bold h-full border-b-4 py-5 w-full`

  return(
    <div className='bg-template-gray-light md:py-10 lg:px-10 xl:flex xl:justify-center'>
      <div className='max-w-7xl'>
        <div className='flex justify-between items-center md:mx-5 md:rounded-2xl md:py-8 md:text-xl p-5 px-8 bg-template-navy'>
          <div className="flex flex-col text-white text-sm md:text-base">
            <Goback url={'/'}/>
            <h1 className='font-bold text-white text-lg md:text-xl'>Roadmap</h1>
          </div>
            <Button url='/newfeedback' content='+ Add Feedback'/>
        </div>

        <div className='bg-template-gray-light min-h-screen '>
          <div className=''>
          <div className="md:hidden text-template-gray-medium border-b-2 flex justify-between text-center text-sm mb-5">
            <button onClick={() => {categoryRef.current.scrollTo({left:50, behavior: 'smooth'})}} className={roadmap === 'Planned' ? `${selectedStyle} border-template-orange` : 'w-full'}>
              Planned ({categories['Planned'][1]})
            </button>
            <button onClick={() => {categoryRef.current.scrollTo({left:300, behavior: 'smooth'})}} className={roadmap === 'In-Progress' ? `${selectedStyle} border-template-purple` : 'w-full'}>
              In-Progress ({categories['In-Progress'][1]})
            </button>
            <button onClick={() => {categoryRef.current.scrollTo({left:700, behavior: 'smooth'})}} className={roadmap ==='Live' ? `${selectedStyle} border-template-blue-light` : 'w-full'}>
              Live ({categories['Live'][1]})
            </button>
          </div>

            <div ref={categoryRef} className='flex gap-10 md:py-10 md:gap-3 md:grid md:grid-cols-3 snap-x overflow-x-scroll px-5'>
            {Object.keys(color).map((category, index) => {
              return(
                <Waypoint 
                  horizontal={true}
                  onEnter={() => setRoadmap(category)}>
                <div className='flex flex-col snap-center min-w-full md:min-w-0'>
                  <div className='mb-5'>
                    <h1 className='text-xl font-bold text-template-navy'>{category} ({categories[category][1]})</h1>
                    <p className='text-template-gray-medium'>Features currently being developed</p>
                  </div>
                  { feedbacks.filter(feedback => feedback.status === category.toLowerCase())
                  .map(feedback => 
                    <div className='bg-white rounded-xl mb-10'>
                      <div className={`h-2 bg-${color[category]} rounded-t-xl`}/>
                      <div className='py-5 px-5'>
                        <div className='flex items-center gap-3 mb-3'>
                          <div className={`h-2 w-2 rounded-full bg-${color[category]}`}></div>
                          {category}
                        </div>
                        <div className='bg-white rounded-xl flex flex-col gap-4'>
                          <div className='flex '>
                          
                            <Link to={`/post/${feedback._id}`}>
                            <div className='flex flex-col gap-2 md:gap-3'>
                            <h1 className='text-template-navy font-bold'>{feedback.title}</h1>
                            <h2 className='text-template-gray-medium font-normal md:text-base'>{feedback.description}</h2>
                            <div className='rounded-xl text-template-blue-dark px-4 py-2 w-min md:text-sm bg-template-gray-light'>
                              {feedback.category === 'ui' ? 'UI' : feedback.category === 'ux' ? 'UX' : feedback.category.charAt(0).toUpperCase() + feedback.category.substring(1,)}
                            </div>
                            </div>
                          </Link>
                          </div>                     

                          <div className='flex justify-between items-center'>
                            <button 
                              disabled={true}
                              onClick={() => dispatch(voteFeedback(feedback._id))}
                              className='flex items-center gap-1 p-2 px-4 rounded-xl bg-template-gray-light'>
                              <ArrowUp stroke={"#4661E6"}/>
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
                      </div>
                    </div> 
                  )
                  }
                </div>
                </Waypoint>
              )
            })
            }
            </div>      
          </div>
        </div>
      </div>

    </div>
  )
}