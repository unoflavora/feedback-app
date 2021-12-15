import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({visibility, filter, setFilter, categories}) => {
    const buttons =  ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']
    return (
      <div style={{visibility: visibility}} className='absolute left-0 bottom-0 top-0 right-0 bg-black bg-opacity-50 flex justify-end'>
        <div className='bg-template-gray-extraLight p-5 w-3/4 flex flex-col gap-5'>
          
          <div className='bg-white rounded-xl p-5 py-8 flex gap-3 flex-wrap'>
            {buttons.map(button => 
              <button
                key={button} 
                onClick={() => setFilter(button.toLowerCase())}
                className={
                  ` text-sm font-bold px-4 py-1 rounded-xl
                    ${filter === button.toLowerCase()
                    ? 'text-white bg-template-gray-dark'
                    : 'text-template-blue-dark bg-template-gray-light'}
                    `}>
                {button}
              </button>
            )}
          </div>

          <div className='bg-white rounded-xl p-5 py-8'>
            <div className='flex justify-between mb-3'>
              <h1 className='font-bold'>Roadmap</h1>
              <Link to='/roadmap'>
              <a className='text-template-blue-dark underline'>View</a>

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
        
      </div>
    )
}



export default Sidebar;