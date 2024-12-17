import { useEffect, useState } from "react";
import { useUtils } from "../../context/Utils";
import styles from "./header.styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { state, dispatch } = useUtils();
  const location = useLocation();
  const navigate = useNavigate();
  const [logInBttn, setLogInBttn] = useState({
    text: "Log In",
    style: undefined,
  });

  useEffect(() => {
    if (location.pathname === "/log-in") {
      setLogInBttn({ text: "X", style: styles.button });
    } else {
      setLogInBttn({ text: "Log In", style: undefined });
    }
  }, [location.pathname]);

  const handleClickLogInBttn = () => {
    if (location.pathname === "/") {
      navigate(`/log-in`);
    } else {
      navigate(`/`);
    }
  };

  const handleLogOutBtn = () => {
    dispatch({ type: "deleteToken" });
    navigate(`/`);
  };
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>To-Do List</h1>
        <nav>
          {state.token && <a href="/">Home</a>}
          {state.token && <a href={`/${state.user.username}`}>Profile</a>}
          {state.token && (
            <a href={`/${state.user.username}/todo-list`}>To Do List</a>
          )}
        </nav>
      </div>

      <div className={styles.headerLeft}>
        {!state.token && (
          <div className={styles.auth}>
            <button onClick={handleClickLogInBttn} className={logInBttn.style}>
              {logInBttn.text}
            </button>
          </div>
        )}

        {state.token && (
          <div className={styles.control}>
            {location.pathname === `/${state.user.username}/todo-list` && (
              <div>
                <button onClick={() => dispatch({ type: "toggleAddTask" })}>
                  Add Task
                </button>
              </div>
            )}
            <div className={styles.session}>
              <span>Welcome, {`${state.user.username}`}!</span>
              <button className={styles.button} onClick={handleLogOutBtn}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
