import { useUtils } from "../../context/Utils";
import Form from "../form/Form";

const AddTask = () => {
  const { state, dispatch } = useUtils();

  const handleRequestData = (URL, result) => {
    const req = {
      type: "POST",
      url: URL + "/todos",
      data: result,
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
      fFunc: () => dispatch({ type: "toggleAddTask" }),
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
      },
      {
        type: "text",
        id: "description",
        placeholder: "Start doing... 🦶🏽",
        text: "Description",
      },
    ],
    buttons: [
      {
        id: "addTask",
        type: "submit",
        className: "",
        onClick: () => {},
        text: "Add",
      },
      {
        id: "cancelAddTask",
        type: "reset",
        className: "button",
        onClick: () => dispatch({ type: "toggleAddTask" }),
        text: "Cancel",
      },
    ],
  };

  return (
    <Form
      handleRequestData={handleRequestData}
      components={components}
      formType="Add Task"
    />
  );
};

export default AddTask;
