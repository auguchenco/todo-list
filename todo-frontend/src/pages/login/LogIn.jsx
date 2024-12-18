import DefaultPage from "../../components/defaultPage/DefaultPage";
import { useUtils } from "../../context/Utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from "../../components/form/Form";

const LogIn = () => {
  const { dispatch, state } = useUtils();
  const navigate = useNavigate();
  const [submitLogIn, setSubmitLogIn] = useState(true);

  const handleRequestData = (URL, result) => {
    const req = {
      url: submitLogIn ? URL + "/auth/login" : URL + "/auth/register",
      data: result,
    };
    const func = {
      tFunc: (form, data) => {
        if (submitLogIn) {
          dispatch({
            type: "setToken",
            payload: {
              user: data.user,
              token: data.token,
            },
          });
          form.reset();
          console.log(state);
          console.log(data);
          navigate(`/${data.user.username}`);
          dispatch({ type: "setTodoList" });
        } else {
          form.reset();
        }
      },
      eFunc: (form) => {
        if (submitLogIn) {
          dispatch({ type: "deleteToken" });
          form.reset();
        }
      },
      fFunc: () => {
        navigate(`/`);
      },
    };
    return { req, func };
  };

  const components = {
    inputs: [
      {
        type: "text",
        id: "username",
        placeholder: "john.rambo",
        text: "Username",
      },
      {
        type: "password",
        id: "password",
        placeholder: "",
        text: "Password",
      },
    ],
    buttons: [
      {
        id: "login",
        type: "submit",
        className: "",
        onClick: () => setSubmitLogIn(true),
        text: "GO",
      },
      {
        id: "singin",
        type: "submit",
        className: "button",
        onClick: () => setSubmitLogIn(false),
        text: "Sing Up",
      },
    ],
  };

  return (
    <DefaultPage>
      <Form handleRequestData={handleRequestData} components={components} />
    </DefaultPage>
  );
};

export default LogIn;
