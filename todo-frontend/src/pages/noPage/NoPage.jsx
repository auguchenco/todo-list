import DefaultPage from "../../components/defaultPage/DefaultPage"
import styles from './noPage.styles.module.scss'

const NoPage = () => {
  return (
    <DefaultPage noSearch={true} noAdd={true} noSort={true}>
      <div className={styles.container}>
        <h2>I'm Sorry! 😔</h2>
        <p>We are working on that!.</p>
      </div>
    </DefaultPage>
  )
}

export default NoPage