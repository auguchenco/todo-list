import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

const UtilsContext = createContext();

export const UtilsProvider = ({ children }) => {
  
  // Get the ToDo List
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    const getTaskList = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/todos');
        setTaskList(data);
      } catch (error) {
        setErrorMessage("Something went wrong, we can't load the task list 😥");
        console.error(error);
        setTaskList([]);
      };
    };
    getTaskList();
  }, []);

  const [addTask, setAddTask] = useState(false);
  const toggleAddTask = () =>  setAddTask(!addTask);

  const [sortTaskList, setSortTaskList] = useState(false);
  const toggleSortTaskList = () =>  setSortTaskList(!sortTaskList);
  
  const [sortConfig, setSortConfig] = useState({
    soerBy: '',
    show: '',
    order: '',
  });

  return (
    <UtilsContext.Provider value={{taskList, setTaskList, addTask, toggleAddTask, sortTaskList, toggleSortTaskList, sortConfig, setSortConfig }}>
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtils = () => useContext(UtilsContext);