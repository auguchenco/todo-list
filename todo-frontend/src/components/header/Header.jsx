import { useUtils } from '../../context/Utils';
import styles from './header.styles.module.scss';

const Header = ({noSearch, noAdd, noSort}) => {
  const { toggleAddTask, toggleSortTaskList } = useUtils();

  return (
    <header className={styles.header}>

      <div className={styles.title}>
        <h1>To-Do List</h1>
        <nav className={styles.menu}>
          <a href="/">Home</a>
          <a href="/tasks">Tasks</a>
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>

      <div className={styles.searchBar} style={noSearch && {visibility: 'hidden'}}>
        <input type="text" />
        <button>Search</button>
      </div>

      <div className={styles.actions}>
        <button style={noAdd && {visibility: 'hidden'}} onClick={toggleAddTask}>Add</button>
        <button style={noSort && {visibility: 'hidden'}} onClick={toggleSortTaskList}>Sort</button>
      </div>
        
    </header>
  )
}

export default Header