import { useEffect, useState } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage"
import { useParams } from 'react-router-dom';
import styles from './taskDetails.styles.module.scss';
import axios from "axios";

const TaskDetails = () => {

  const { taskId } = useParams();

  const [task, setTask] = useState([]);
  useEffect(() => {
    const getTask = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/todos/${taskId}`);
        setTask(data);
      } catch (error) {
        console.error(error);
        setTask({});
      };
    };
    getTask();
  }, []);
  
  const [className, setClassName] = useState(styles.task);
  useEffect(()=>{
    setClassName( task.isCompleted ? styles.taskCompleted : styles.task );
  });



  return (
    <DefaultPage noSearch={true} noAdd={true} noSort={true}>
      <section className={className}>

        <div className={styles.taskHeader}>
          <h3>{task.name}</h3>
        </div>
        
        <div className={styles.taskBody}>
          <span>Description:</span>
          <p>{task.description}</p>
          <span>Createrd By: {task.creator}</span>
        </div>
      
      </section>
    </DefaultPage>
  )
}

export default TaskDetails