import { useEffect, useState } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import { useParams } from "react-router-dom";
import styles from "./task.styles.module.scss";
import axios from "axios";
import { useUtils } from "../../context/Utils";

const Task = () => {
  const { state } = useUtils();

  const { taskId } = useParams();

  const [task, setTask] = useState({});
  useEffect(() => {
    const getTask = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/todos/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        setTask(data.data);
        console.log("Task", data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTask();
  }, []);

  const [className, setClassName] = useState(styles.task);
  useEffect(() => {
    setClassName(task.isCompleted ? styles.taskCompleted : styles.task);
  }, []);

  return (
    <DefaultPage noSearch={true} noAdd={true} noSort={true}>
      <section className={className}>
        <div className={styles.taskHeader}>
          <h3>{task.name}</h3>
        </div>

        <div className={styles.taskBody}>
          <span>Description:</span>
          <p>{task.description}</p>
          <span>Createrd By: {state.user.username}</span>
        </div>
      </section>
    </DefaultPage>
  );
};

export default Task;
