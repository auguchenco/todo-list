import { useUtils } from "../../context/Utils";
import Form from "../form/Form";

const EditTask = () => {
  const { state, dispatch } = useUtils();

  const task = state.todoList.find(
    (task) => task.id === state.toggle.editTask.taskId
  );

  const handleRequestData = (URL, result) => {
    const req = {
      type: "PUT",
      url: URL + `/todos/${task.id}`,
      data: { ...result, isCompleted: task.completed },
      config: {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    };
    const func = {
      tFunc: (form, data) => {
        console.log(data);
      },
      eFunc: (form) => {},
      fFunc: () => dispatch({ type: "toggleEditTask", payload: undefined }),
    };
    return { req, func };
  };

  const components = {
    inputs: [
      {
        type: "text",
        id: "title",
        placeholder: "To do... ✍🏽",
        text: "📜 Task",
        defaultValue: task.title,
      },
      {
        type: "text",
        id: "description",
        placeholder: "Start doing... 🦶🏽",
        text: "Description",
        defaultValue: task.description,
      },
    ],
    buttons: [
      {
        id: "editTask",
        type: "submit",
        className: "",
        onClick: () => {},
        text: "Save",
      },
      {
        id: "cancelEditTask",
        type: "reset",
        className: "button",
        onClick: () => dispatch({ type: "toggleEditTask", payload: undefined }),
        text: "Cancel",
      },
    ],
  };

  return (
    <Form
      handleRequestData={handleRequestData}
      components={components}
      formType="editTask"
    />
  );
};

export default EditTask;
