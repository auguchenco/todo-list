import styles from './addTask.styles.module.scss';
import { useUtils } from '../../context/Utils'

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AddTask = () => {

  const { toggleAddTask } = useUtils();

  const addTask = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newTask = {};
    formData.forEach((value, key) => {newTask[key] = value})
    newTask["id"] = uuidv4();
    newTask["isCompleted"] = false;

    try {
      const { res } = await axios.post(`http://localhost:3000/todos`, JSON.stringify(newTask));
      console.log(res)
    } catch (error) {
      console.error(error);
    };

    form.reset();

    toggleAddTask();
    location.reload();
  };
  
  return (
    <section className={styles.formContainer}>
      <form onSubmit={addTask}>
        
        <div className={styles.inputContainer}>
          <label htmlFor="name">Task:</label>
          <input type="text" name='name' id='name' placeholder='Do something...'/>
        </div>
        
        <div className={styles.inputContainer}>
          <label htmlFor="description">Description:</label>
          <input type="text" name='description' id='description' placeholder='Start doing ... and continue with ...'/>
        </div>
        
        <div className={styles.inputContainer}>
          <label htmlFor="creator">Name:</label>
          <input type="text" name='creator' id='creator' placeholder='John Rambo'/>
        </div>

        <div className={styles.buttonsContainer}>
          <button type="submit">Add</button>
          <button onClick={toggleAddTask}>Cancel</button>
        </div>
      
      </form>
    </section>
  )
}

export default AddTask