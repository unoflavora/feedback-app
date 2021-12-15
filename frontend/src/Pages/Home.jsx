import { useState } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {ReactComponent as Empty} from '../public/illustration-empty.svg'

import { Link } from 'react-router-dom'
import Button from '../components/Button'
import {ReactComponent as IconSuggestion} from '../public/icon-suggestions.svg'


function Home({feedback, categories}) {
  const [method, setMethod] = useState('upvotes')
  const [filter, setFilter] = useState('all')
  const [sideBar, setSideBar] = useState('hidden')

  const sort = {
    'upvotes':  (a, b) => b.upvotes - a.upvotes,
    'comments': (a, b) => b.comments.length - a.comments.length,
    'minUpvotes': (a,b) => a.upvotes - b.upvotes,
    'minComments': (a,b) => a.comments.length - b.comments.length
  }


  const feedbacks = feedback
  .filter((post) => post.status === 'suggestion')
  .filter((post) => {
    if(filter === 'all') return true
    else {
      return post.category === filter
    }
  })

  const buttons =  ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']

  return (
    <div  className='bg-template-gray-extraLight md:py-10 md:px-10 xl:px-24 xl:grid xl:grid-cols-12 xl:gap-10'>
      <div className='md:grid grid-cols-3 xl:flex xl:flex-col gap-5 md:mb-10 xl:col-span-3 xl:text-lg'>
        <Navbar sideBar={sideBar} setSideBar={setSideBar}/>
        <div className='hidden md:flex bg-white rounded-xl p-5 py-8 gap-3 flex-wrap'>
              {buttons.map(button => 
                <button
                  key={button} 
                  onClick={() => setFilter(button.toLowerCase())}
                  className={
                    ` text-sm font-bold px-4 py-1 xl:py-2 rounded-xl
                      ${filter === button.toLowerCase()
                      ? 'text-white bg-template-gray-dark'
                      : 'text-template-blue-dark bg-template-gray-light hover:bg-[#CFD7FF]'}
                      `}>
                  {button}
                </button>
              )}
        </div>

        <div className='hidden md:block bg-white rounded-xl p-5 py-8'>
          <div className='flex justify-between mb-3'>
            <h1 className='font-bold'>Roadmap</h1>
            <Link to='/roadmap'>
            <button className='text-template-blue-dark underline hover:text-[#8397F8]'>View</button>

            </Link>
          </div>

            <div className='flex flex-col gap-2'>
              {Object.keys(categories).map(category => 
                <div key={category} className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <div className={`w-2 h-2 ${categories[category][0]} rounded-full`}></div>
                  <h1>{category}</h1>
                </div>
                <h2 className='text-template-gray-medium font-bold'>{categories[category][1]}</h2>
              </div>
              )}
            </div>                 
          </div>
      </div>
      
      {/* below is the feedbacks */}
      <div className='relative xl:col-span-9'>
      <Sidebar categories={categories} visibility={sideBar} filter={filter} setFilter={setFilter} />
        
        <div className='font-jost font-bold'>
          <div className='relative py-7 md:py-5 px-4 md:rounded-xl bg-template-navy flex items-center text-sm justify-between'>
            <div className='md:flex gap-10'>
              <div className='hidden md:flex items-center gap-4'>
              <IconSuggestion/>
              <h2 className='font-bold text-lg text-white'>{feedbacks.length} Suggestions</h2>
              </div>
              <div className=' flex gap-2 text-white text-xs md:text-base items-center '>
                <label className='relative text-white text-opacity-70' htmlFor='sort'>Sort by :</label>
                <select
                    onChange={(e) => setMethod(e.target.value)}
                    className=' bg-transparent text-white xl:w-52 focus-within:outline-none' name='sort' id='sort'>            
                  <option className='bg-white text-template-gray-medium' value='upvotes'>Most Upvotes</option>
                  <option className='bg-white text-template-gray-medium' value='minUpvotes'>Least Upvotes</option>
                  <option className='bg-white text-template-gray-medium' value='comments'>Most Comments</option>
                  <option className='bg-white text-template-gray-medium' value='minComments'>Least Comments</option>
                </select>
               
              </div>
            </div>

          <Button url={'/newfeedback'} content={'+ Add Feedback'}/>

          </div>

          <div className='bg-template-gray-extraLight min-h-min text-sm py-10 px-4 md:px-0 md:pb-14 '>
            <div className='flex flex-col gap-5'>
              {!feedbacks.length ? 
                <div className='px-5 md:px-28 py-10 md:py-28 rounded-xl 
                bg-white text-center flex flex-col gap-5 justify-center items-center'>
                  <div className='flex flex-col justify-center items-center xl:w-[470px] '>
                  <div className='py-4 '>
                  <Empty/>
                  </div>
                  <h1 className='text-lg md:text-xl font-bold'>There is no feedback yet</h1>
                  <p className='text-sm md:text-base md:text-opacity-60 text-template-gray-medium mb-3'>
                    Got a suggestion? Found a bug that needs to be squashed? We love hearing
                    about new ideas to improve our app.
                  </p>
                  <Link to='/newFeedback'>
                    <div className='p-3 px-5 text-center hover:bg-[#C75AF6] bg-template-purple md:text-base text-white rounded-xl'>
                      + Add Feedback
                    </div>
                  </Link>
                  </div>
                  
                
                </div>
                : feedbacks
                .sort(sort[method])
                .map((post,index) => <div className='p-4 bg-white rounded-xl'><Card key={index} feedback={post}/> </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;