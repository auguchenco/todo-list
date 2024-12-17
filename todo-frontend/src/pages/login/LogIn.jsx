import DefaultPage from "../../components/defaultPage/DefaultPage";
import { useUtils } from "../../context/Utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./login.styles.module.scss";
import axios from "axios";

const URL = "http://localhost:3000/auth";
const LogIn = () => {
  const { dispatch, state } = useUtils();
  const navigate = useNavigate();
  const [submitLogIn, setSubmitLogIn] = useState(true);

  const auth = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const user = {};
    formData.forEach((value, key) => {
      user[key] = value;
    });
    try {
      const url = submitLogIn ? URL + "/login" : URL + "/register";
      const { data } = await axios.post(url, user);
      if (submitLogIn) {
        dispatch({
          type: "setToken",
          payload: {
            user: data.data.user,
            token: data.data.token,
          },
        });
        form.reset();
        navigate(`/${data.data.user.username}`);
        // dispatch({ type: "setTodoList" });
      } else {
        form.reset();
        navigate(`/`);
      };

    } catch (error) {
      console.error(error);
      if (submitLogIn) {
        dispatch({ type: "deleteToken" });
        form.reset();
        navigate(`/`);
      }
    }
    form.reset();
    // navigate(`/`);
  };
  return (
    <DefaultPage>
      <section className={styles.formContainer}>
        <form onSubmit={auth}>
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="jhon.rambo"
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>

          <div className={styles.buttonsContainer}>
            <button onClick={() => setSubmitLogIn(true)} type="submit">
              GO!
            </button>
            <button
              onClick={() => setSubmitLogIn(false)}
              type="submit"
              className="button"
            >
              Sing Up
            </button>
          </div>
        </form>
      </section>
    </DefaultPage>
  );
};

export default LogIn;
