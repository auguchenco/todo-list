import { Route, Routes } from 'react-router-dom'
import TodoList from '../pages/todo-list/TodoList'
import Task from '../pages/task/Task'
import Profile from '../pages/profile/Profile'

const PrivateRoutes = () => {

  return (
  	<Routes>
			<Route path='/:user' >
				<Route index element={<Profile/>} />
				<Route path='/todo-list' >
					<Route index element={<TodoList/>} />
					<Route path='/:taskId' element={<Task />} />
				</Route>
			</Route>
    	<Route path="/*" element={<Profile />} />
  	</Routes>
  )
};

export default PrivateRoutes;