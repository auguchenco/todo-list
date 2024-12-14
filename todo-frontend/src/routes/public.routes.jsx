import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Tasks from '../pages/tasks/Tasks'
import TaskDetails from '../pages/taskDetails/TaskDetails'
import Edit from '../pages/edit/Edit'
import AboutUs from '../pages/aboutUs/AboutUs'
import NoPage from '../pages/noPage/NoPage'

const PublicRoutes = () => {

  return (
  	<Routes>
    	<Route index path="/" element={<Home />} />
			<Route path='tasks'>
				<Route index element={<Tasks/>} />
				<Route path=':taskId' element={<TaskDetails />} />
			</Route>
			<Route path='/edit-place/:taskId' element={<Edit />} />
    	<Route path="/about-us" element={<AboutUs />} />
    	<Route path="/contact" element={<NoPage />} />
    	<Route path="/*" element={<NoPage />} />
  	</Routes>
  )
}

export default PublicRoutes