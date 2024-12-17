import styles from "./editTask.styles.module.scss";
import { useUtils } from "../../context/Utils";

import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
const URL = process.env.URL || "http://localhost:3000";

const EditTask = ({ id }) => {
  const { state, dispatch } = useUtils();

  const editTask = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newTask = {};
    formData.forEach((value, key) => {
      newTask[key] = value;
    });

    try {
      const { data } = await axios.post(
        `${URL}/todos`,
        JSON.stringify(newTask),
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({ type: "setTodoList" });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: "toggleAddTask", payload: undefined });
    form.reset();
  };

  return (
    <section className={styles.formContainer}>
      <form onSubmit={editTask}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Task:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Do something..."
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Start doing ... and continue with ..."
          />
        </div>

        <div className={styles.buttonsContainer}>
          <button type="submit">Save</button>
          <button
            onClick={dispatch({ type: "toggleAddTask", payload: undefined })}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditTask;
