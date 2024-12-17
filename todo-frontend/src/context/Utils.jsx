import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const SESSION_STORAGE_KEY = "todo_list_storage";
const URL = "http://localhost:3000";

const UtilsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "setToken": {
      const { user, token } = action.payload;
      sessionStorage.setItem(SESSION_STORAGE_KEY, `Bearer ${token}`);
      return {
        user: user,
        token: token,
        todoList: [],
        showConfig: {
          completed: undefined,
          orderBy: undefined,
          order: undefined,
        },
        toggle: {
          addTask: false,
          editTask: false,
        },
      };
    }

    case "deleteToken": {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      state = {
        user: { id: undefined, username: undefined },
        token: undefined,
        todoList: undefined,
        showConfig: {
          completed: undefined,
          orderBy: undefined,
          order: undefined,
        },
        toggle: {
          addTask: false,
          editTask: false,
        },
      };
      return state;
    }

    case "setTodoList": {
      const getTodoList = async () => {
        const completed = state.showConfig?.completed
          ? state.showConfig.completed
          : undefined;
        const orderBy = state.showConfig?.orderBy
          ? state.showConfig.orderBy
          : undefined;
        const order = state.showConfig?.order
          ? state.showConfig.order
          : undefined;
        try {
          let url = `${URL}/todos`;

          if (completed || orderBy || order) {
            url += "/?";
            if (completed) {
              if (url[-1] !== "?") {
                url += "&";
              }
              url += `&completed=${completed}`;
            }
            if (orderBy) {
              if (url[-1] !== "?") {
                url += "&";
              }
              url += `orderBy=${orderBy}`;
            }
            if (order) {
              if (url[-1] !== "?") {
                url += "&";
              }
              url += `&order=${order}`;
            }
          }

          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          return data.data;
        } catch (error) {
          console.error("Error trying to get the todo list\n", error);
          return undefined;
        }
      };
      const todoList = getTodoList();
      return { ...state, todoList };
    }

    case "setShowConfig": {
      const { completed, orderBy, order } = action.payload;
      return { ...state, showConfig: { completed, orderBy, order } };
    }

    case "toggleAddTask": {
      return {
        ...state,
        toggle: {
          addTask: !state.toggle.addTask,
          editTask: false,
        },
      };
    }

    case "toggleEditTask": {
      return {
        ...state,
        toggle: {
          addTask: false,
          editTask: !state.toggle.addTask,
        },
      };
    }

    default:
      return state;
  }
};

export const UtilsProvider = ({ children }) => {
  useEffect(() => {
    const setUser = async () => {
      const token = sessionStorage.getItem(SESSION_STORAGE_KEY)?.split(" ")[1];
      if (token) {
        try {
          const { data } = await axios.get(`${URL}/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({
            type: "setToken",
            payload: { user: data.data, token: token },
          });
        } catch (error) {
          console.error("Error trying to authenticate\n", error);
          dispatch({ type: "deleteToken" });
        }
      }
    };
    setUser();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    user: {
      id: undefined,
      username: undefined,
    },
    token: undefined,
    todoList: undefined,
    showConfig: {
      completed: undefined,
      orderBy: undefined,
      order: undefined,
    },
    toggle: {
      addTask: false,
      editTask: false,
    },
  });

  return (
    <UtilsContext.Provider value={{ state, dispatch }}>
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtils = () => useContext(UtilsContext);
