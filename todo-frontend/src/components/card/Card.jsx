import { useEffect, useState } from 'react';
import styles from './card.styles.module.scss'
import { useNavigate } from "react-router-dom";

const Card = ({task}) => {

  const [className, setClassName] = useState(styles.task);

  const navigate = useNavigate();

  useEffect(()=>{
    setClassName( task.isCompleted ? styles.taskCompleted : styles.task );
  }, []);

  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
    location.reload();
  };

  return (
    <li className={className} onClick={handleClick}>

      <div className={styles.taskHeader}>
        <h3>{task.name}</h3>
      </div>
      
      <div className={styles.taskBody}>
        <span>{task.creator}</span>
      </div>
    
    </li>
  )
}

export default Card