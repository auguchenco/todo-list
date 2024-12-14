import { useEffect, useRef, useState } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage"
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import styles from './editTask.styles.module.scss';

const Edit = () => {

  const { taskId } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState({});  
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
  
  const nameRef = useRef(task.name);
  const descriptionRef = useRef(task.description);
  const creatorRef = useRef(task.creator);
  
  const editTask = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newTask = {};
    formData.forEach((value, key) => {newTask[key] = value})
    newTask["id"] = task.id;
    newTask["isCompleted"] = task.isCompleted;

    
    try {
      const { res } = await axios.put(`http://localhost:3000/todos/${task.id}`, JSON.stringify(newTask));
      console.log(res);
    } catch (error) {
      console.error(error);
    };
    
    form.reset();
    navigate('/')
    location.reload();
  };
  
  const goBack = () => {
    navigate('/');
  };
  
  return (
    <DefaultPage noSearch={true} noAdd={true} noSort={true}>
      <section className={styles.formContainer}>
      <form onSubmit={editTask}>
        
        <div className={styles.inputContainer}>
          <label htmlFor="name">Task:</label>
          <input type="text" name='name' id='name' placeholder='Do something...' defaultValue={task.name} href={nameRef}/>
        </div>
        
        <div className={styles.inputContainer}>
          <label htmlFor="description">Description:</label>
          <input type="text" name='description' id='description' placeholder='Start doing ... and continue with ...' defaultValue={task.description} href={descriptionRef}/>
        </div>
        
        <div className={styles.inputContainer}>
          <label htmlFor="creator">Name:</label>
          <input type="text" name='creator' id='creator' placeholder='John Rambo' defaultValue={task.creator} href={creatorRef}/>
        </div>

        <div className={styles.buttonsContainer}>
          <button type="submit">Save</button>
          <button onClick={goBack}>Cancel</button>
        </div>
      
      </form>
    </section>
    </DefaultPage>
  )
}

export default Edit