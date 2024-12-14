import { useEffect, useState } from 'react';
import styles from './task.styles.module.scss'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Task = ({task}) => {

  const [className, setClassName] = useState(styles.task);

  const navigate = useNavigate();

  useEffect(()=>{
    setClassName( task.isCompleted ? styles.taskCompleted : styles.task );
  }, []);
  
  const handleToggle = async () => {
    task.isCompleted = !task.isCompleted;
    setClassName( task.isCompleted ? styles.taskCompleted : styles.task );
    try {
      const { res } = await axios.put(`http://localhost:3000/todos/${task.id}`, JSON.stringify(task));
      console.log(res)
    } catch (error) {
      console.error(error);
    };
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:3000/todos/${task.id}`);
      console.log("Task deleted");
    } catch (error) {
      console.error(error);
    };
    location.reload();
  };

  const editTask = () => {
    navigate(`edit-place/${task.id}`);
  };
  
  return (
      <li className={className}>

        <div className={styles.taskHeader}>
          <input type="checkbox" defaultChecked={task.isCompleted} onClick={handleToggle}/>
          <h3>{task.name}</h3>
          <button onClick={deleteTask}>Delete</button>
        </div>
        
        <div className={styles.taskBody}>
          <p>{task.description}</p>
          <span>{task.creator}</span>
          <button onClick={editTask}>Edit</button>
        </div>
      
      </li>
  )
}
 
export default Task