import DefaultPage from "../../components/defaultPage/DefaultPage";
import styles from "./profile.styles.module.scss";
import { useEffect, useState } from "react";
import { useUtils } from "../../context/Utils";
import axios from "axios";

const UserCard = () => {
  const { state } = useUtils();

  const [user, setUser] = useState({
    totalTasks: 0,
    completedTasks: 0,
    progress: 0,
    username: "",
  });

  useEffect(() => {
    const getTodoList = async () => {
      try {
        let url = `${state.serverUrl}/todos`;

        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        const totalTasks = data.data.length;
        const completedTasks = data.data.filter(
          (task) => task.completed === true
        ).length;
        const progress = (completedTasks / totalTasks) * 100;
        setUser({
          totalTasks,
          completedTasks,
          progress,
          username: state.user.username,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getTodoList();
    console.log("getTodoList");
  }, [state.todoList]);

  return (
    <DefaultPage>
      <div className={styles.userCardContainer}>
        <div className={styles.userCard}>
          <h3>Progress</h3>
          <div className={styles.infoContainer}>
            <p>Username: </p>
            <span>{user.username}</span>
          </div>
          <div className={styles.infoContainer}>
            <p>Completed Tasks:</p>
            <span>
              {user.completedTasks} / {user.totalTasks}
            </span>
          </div>

          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBarCompleted}
              style={{ width: `${user.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
};

export default UserCard;
