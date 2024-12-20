import { useEffect, useState } from "react";
import styles from "./task.styles.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUtils } from "../../context/Utils";

const Task = ({ task }) => {
  const { state, dispatch } = useUtils();
  const URL = state.serverUrl;
  const navigate = useNavigate();

  const createdAt = new Date(task["updated_at"]);

  const [className, setClassName] = useState(styles.task);
  const [toggled, setToggled] = useState(false);

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
      const taskIndex = state.todoList.indexOf(task);
      const updatedTask = state.todoList.splice(taskIndex, 1);
      const todoList = task.completed
        ? [...state.todoList, ...updatedTask]
        : [...updatedTask, ...state.todoList];

      dispatch({
        type: "setTodoList",
        payload: todoList,
      });
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
    if (state.toggle.editTask.value) {
      dispatch({
        type: "toggleEditTask",
        payload: { value: false, taskId: undefined },
      });
    }
    setTimeout(() => {
      dispatch({
        type: "toggleEditTask",
        payload: { value: true, taskId: task.id },
      });
    }, 1);
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
        <button onClick={deleteTask} className="button">
          Delete
        </button>
      </div>

      <div className={styles.taskBody}>
        <div className={styles.left}>
          <h4>CREATED</h4>
          <div>
            <p>Date:</p>
            <span>{createdAt.toLocaleDateString()}</span>
          </div>
          <div>
            <p>Time:</p>
            <span>{createdAt.toLocaleTimeString().slice(0, 5)}</span>
          </div>
        </div>

        <p className={styles.center}>{task.description}</p>

        <div className={styles.right}>
          <button onClick={editTask} className="secondaryButton">
            Edit
          </button>
          <button onClick={detailTask}>Details</button>
        </div>
      </div>
    </li>
  );
};

export default Task;
