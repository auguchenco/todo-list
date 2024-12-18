import { useEffect, useState } from "react";
import styles from "./task.styles.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUtils } from "../../context/Utils";


const Task = ({ task }) => {
  const { state, dispatch } = useUtils();
  const URL = state.serverUrl;
  const navigate = useNavigate();


  const [className, setClassName] = useState(styles.task);

  useEffect(() => {
    setClassName(task.completed ? styles.taskCompleted : styles.task);
  }, []);

  const handleToggle = async () => {
    task.completed = !task.completed;
    setClassName(task.completed ? styles.taskCompleted : styles.task);
    try {
      const { data } = await axios.put(
        `${URL}/todos/${task.id}`,
        {
          title: task.title,
          description: task.description,
          isCompleted: task.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`${URL}/todos/${task.id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      console.log("Task deleted");
    } catch (error) {
      console.error(error);
    }
    dispatch({
      type: "setTodoList",
      payload: state.todoList.filter((t) => t.id !== task.id),
    });
  };

  const editTask = () => {
    dispatch({
      type: "toggleEditTask",
      payload: task.id,
    });
  };

  const detailTask = () =>
    navigate(`/${state.user.username}/todo-list/${task.id}`);

  return (
    <li className={className}>
      <div className={styles.taskHeader}>
        <input
          type="checkbox"
          defaultChecked={task.completed}
          onClick={handleToggle}
        />
        <h3 onClick={detailTask}>{task.title}</h3>
        <button onClick={deleteTask}>Delete</button>
      </div>

      <div className={styles.taskBody}>
        <p>{task.description}</p>
        <span>{task["updated_at"]}</span>
        <button onClick={editTask}>Edit</button>
      </div>
    </li>
  );
};

export default Task;
