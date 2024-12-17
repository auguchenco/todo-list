import { useUtils } from "../../context/Utils";

import axios from "axios";

const URL = "http://localhost:3000";

const AddTask = () => {
  const { state, dispatch } = useUtils();

  const addTask = async (event) => {
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
    dispatch({ type: "toggleAddTask" });
    form.reset();
  };

  return (
    <section className={styles.formContainer}>
      <form onSubmit={addTask}>
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
          <button type="submit">Add</button>
          <button
            onClick={() => {
              dispatch({ type: "toggleAddTask" });
            }}
            className="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTask;
