import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router'
import { categoryCount, fetchFeedback } from './reducers/feedbacks'
import { getInitialUser } from './reducers/user'
import Home from './Pages/Home'
import Post from './Pages/Post'
import New from './Pages/New'
import Edit from './Pages/Edit'
import Roadmap from './Pages/Roadmap'

function App() {
  const feedback = useSelector((state) => state.feedbacks.feedback)
  const categories = useSelector((state) => state.feedbacks.category)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFeedback())
    dispatch(getInitialUser())
  }, [])

  useEffect(() => {
    dispatch(categoryCount(feedback))
  }, [feedback])


  return (
    <div className="App font-jost">
      <Routes>
        <Route path='/'>
          <Route index element={ <Home feedback={feedback} categories={categories}/>}/>
          <Route path='post/:id' element={ <Post /> } />  
          <Route path='edit/:id' element={ <Edit/>}/>
          <Route path='newfeedback' element={ <New/>}/> 
          <Route path='roadmap' element={<Roadmap categories={categories} feedbacks={feedback}/>} />  
        </Route>
      </Routes>
    </div>
  )
}

export default App
