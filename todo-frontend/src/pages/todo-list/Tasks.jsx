import DefaultPage from "../../components/defaultPage/DefaultPage";
import styles from './tasks.styles.module.scss';
import Card from "../../components/card/Card";
import { useUtils } from "../../context/Utils";

const Tasks = () => {

  const { taskList } = useUtils()

  return (
    <DefaultPage noAdd={true}>
      <section>
        <ul className={styles.taskList}>
          {taskList.map((task) => <Card key={task.id} task={task}/> )}
        </ul>
      </section>
    </DefaultPage>
  )
}

export default Tasks