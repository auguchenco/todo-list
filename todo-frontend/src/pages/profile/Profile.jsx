import { useState } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import { useUtils } from "../../context/Utils";
import styles from "./profile.styles.module.scss";

const Profile = () => {
  const { dispatch, state } = useUtils();
  const [completedTasks, setCompletedTasks] = useState(
    state.todoList.filter((task) => task.completed === true).length
  );
  const totalTasks = state.todoList.length;
  const progress = (completedTasks / totalTasks) * 100;
  return (
    <DefaultPage>
      <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>User Profile</h1>
        <div className={styles.profileDetails}>
          <p className={styles.username}>
            Username: <span className={styles.highlight}>JohnDoe</span>
          </p>
          <p className={styles.taskProgress}>
            Completed Tasks: {completedTasks} / {totalTasks}
          </p>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
};

export default Profile;
