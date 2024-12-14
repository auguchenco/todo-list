import DefaultPage from "../../components/defaultPage/DefaultPage"
import styles from './aboutUs.styles.module.scss'

const AboutUs = () => {
  return (
    <DefaultPage noSearch={true} noAdd={true} noSort={true}>
      <div className={styles.container}>

        <h2>About the project</h2>

        <h4>This project is about a To-Do List on which you can:</h4>
        <ul>
          <li>Create, edit and delete tasks</li>
          <li>Mark tasks as completed or not</li>
          <li>Sort tasks by creation date or completion status</li>
          <li>Search for tasks by title or description</li>
        </ul>

        <h4>Was developed using:</h4>
        <ul>
          <li>Node.js (as the default engine)</li>
          <li>Vite (for start to create te project and set the first things)</li>
          <li>React (the framework for developer purposes)</li>
          <li>Json Server (for run a JSON file as pseudo-database)</li>
          <li>React Router Dom (for manage the routing)</li>
          <li>Axios (for api management)</li>
          <li>Sass (for styles)</li>
          <li>UUID (for create a unique identifier for every task)</li>
          <li>Git & Git Hub (as a version management)</li>
        </ul>

      </div>
    </DefaultPage>
  )
}

export default AboutUs