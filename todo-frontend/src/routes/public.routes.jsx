import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import LogIn from '../pages/login/LogIn'
import SingUp from '../pages/singup/SingUp'

const PublicRoutes = () => {

  return (
  	<Routes>
    	<Route index path="/" element={<Home />} />
    	<Route index path="/log-in" element={<LogIn />} />
    	<Route index path="/sing-up" element={<SingUp />} />
    	<Route path="/*" element={<Home />} />
  	</Routes>
  )
};

export default PublicRoutes;