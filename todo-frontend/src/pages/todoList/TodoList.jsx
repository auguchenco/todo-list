import styles from "./todoList.styles.module.scss";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import Task from "../../components/task/Task";
import AddTask from "../../components/addTask/AddTask";
import { useUtils } from "../../context/Utils";
import { useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000";

const TodoList = () => {
  const { state, dispatch } = useUtils();

  useEffect(() => {
    const getTodoList = async () => {
      const completed = state.showConfig?.completed;
      const orderBy = state.showConfig?.orderBy;
      const order = state.showConfig?.order;

      try {
        let url = `${URL}/todos`;

        const queryParams = [];
        if (completed) queryParams.push(`completed=${completed}`);
        if (orderBy) queryParams.push(`orderBy=${orderBy}`);
        if (order) queryParams.push(`order=${order}`);

        if (queryParams.length > 0) {
          url += `/?${queryParams.join("&")}`;
        }

        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        console.log(data.data);
        dispatch({ type: "setTodoList", payload: data.data || [] });
      } catch (error) {
        console.error("Error trying to get the todo list\n", error);
        dispatch({ type: "setTodoList", payload: [] });
      }
    };
    getTodoList();
  }, []);

  return (
    <DefaultPage>
      <section className={styles.taskListContainer}>
        <ul className={styles.taskList}>
          {state.todoList.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
        {state.toggle.addTask && <AddTask />}
      </section>
    </DefaultPage>
  );
};

export default TodoList;
