import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import LogIn from "../pages/login/LogIn";
import { useUtils } from "../context/Utils";

const PublicRoutes = () => {
  const { state } = useUtils();
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      {!state.token && <Route index path="/log-in" element={<LogIn />} />}
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default PublicRoutes;
