import { Route, Routes } from "react-router-dom";
import TodoList from "../pages/todoList/TodoList";
import Task from "../pages/task/Task";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import { useUtils } from "../context/Utils";

const PrivateRoutes = () => {
  const { state } = useUtils();
  return (
    <Routes>
      <Route path={`/${state.user.username}`}>
        <Route index element={<Profile />} />
        <Route path="todo-list">
          <Route index element={<TodoList />} />
          <Route path=":taskId" element={<Task />} />
        </Route>
      </Route>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default PrivateRoutes;
