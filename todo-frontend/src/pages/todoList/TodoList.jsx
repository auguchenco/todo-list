import styles from "./todoList.styles.module.scss";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import Task from "../../components/task/Task";
import AddTask from "../../components/addTask/AddTask";
import { useUtils } from "../../context/Utils";

const TodoList = () => {
  const { state } = useUtils();

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
