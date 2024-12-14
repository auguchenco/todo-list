import Footer from "../footer/Footer"
import Header from "../header/Header"
import Main from "../main/Main"
import AddTask from "../../components/addTask/AddTask"
import SortTaskList from "../sortTaskList/SortTaskList"
import { useUtils } from "../../context/Utils"


const DefaultPage = (props) => {

  const { addTask, sortTaskList } = useUtils();

  return (
    <>
      <Header noSearch={props.noSearch} noAdd={props.noAdd} noSort={props.noSort}/>
      <Main>
        {props.children}
        {addTask && <AddTask />}
        {sortTaskList && <SortTaskList />}
      </Main>
      <Footer />
    </>
  )
}

export default DefaultPage