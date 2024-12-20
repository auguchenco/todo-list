import { useState } from "react";
import { useUtils } from "../../context/Utils";
import Form from "../form/Form";
import { useEffect } from "react";

const EditTask = () => {
  const { state, dispatch } = useUtils();

  const [task, setTask] = useState(
    state.todoList.find((task) => task.id === state.toggle.editTask.taskId)
  );
  useEffect(() => {
    setTask(
      state.todoList.find((task) => task.id === state.toggle.editTask.taskId)
    );
  }, [state.toggle.editTask.taskId]);

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
      fFunc: () =>
        dispatch({
          type: "toggleEditTask",
          payload: { value: false, taskId: undefined },
        }),
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
        onClick: () =>
          dispatch({
            type: "toggleEditTask",
            payload: { value: false, taskId: undefined },
          }),
        text: "Cancel",
      },
    ],
  };

  return (
    <Form
      handleRequestData={handleRequestData}
      components={components}
      formType="Edit Task"
    />
  );
};

export default EditTask;
