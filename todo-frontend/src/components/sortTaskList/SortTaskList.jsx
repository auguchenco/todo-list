import { useUtils } from '../../context/Utils';
import styles from './sortTaskList.styles.module.scss';

const SortTaskList = () => {
  const { taskList, setTaskList, toggleSortTaskList } = useUtils();

  const sortTaskList = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    formData.forEach((value, key) => console.log(key, value))

    form.reset();
    toggleSortTaskList();
  };

  return (
    <section className={styles.formContainer}>
    <form onSubmit={() => {sortTaskList}}>
      
      <div className={styles.inputContainer}>
        <label htmlFor="name">Sort By:</label>
        <select name="sortBy" id="sortBy">
          <option value="name">Name</option>
          <option value="creator">Creator</option>
        </select>
      </div>
      
      <div className={styles.inputContainer}>
        <label htmlFor="description">Show:</label>
        <select name="show" id="show">
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="all">All</option>
        </select>
      </div>
      
      <fieldset className={styles.inputContainer}>
        <legend>Order:</legend>
        <label htmlFor="up">Up</label>
        <input type="radio" name='up' id='up'/>
        <label htmlFor="down">Down</label>
        <input type="radio" name='down' id='down'/>
      </fieldset>

      <div className={styles.buttonsContainer}>
        <button type="submit">Sort</button>
        <button onClick={toggleSortTaskList}>Cancel</button>
      </div>
    
    </form>
  </section>
  )
}

export default SortTaskList