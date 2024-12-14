import styles from './toDoList.styles.module.scss'
import Task from '../task/Task';
import { useUtils } from '../../context/Utils';

const ToDoList = () => {

  const { taskList } = useUtils();

  return (
    <section className={styles.taskListContainer}>
      <ul className={styles.taskList}>

        {taskList.map((task) => <Task key={task.id} task={task}/> )}

      </ul>
    </section>
  )
}

export default ToDoList