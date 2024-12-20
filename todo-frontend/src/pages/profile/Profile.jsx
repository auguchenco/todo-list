import DefaultPage from "../../components/defaultPage/DefaultPage";
import { useUtils } from "../../context/Utils";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { dispatch, state } = useUtils();

  useEffect(() => {
    const getTodoList = async () => {
      try {
        let url = `${state.serverUrl}/todos`;

        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        dispatch({ type: "setTodoList", payload: data.data || [] });
      } catch (error) {
        console.error("Error trying to get the todo list\n", error);
        dispatch({ type: "setTodoList", payload: [] });
      }
    };
    getTodoList();
    console.log("getTodoList");
  }, []);

  return <DefaultPage>PERFIL</DefaultPage>;
};

export default Profile;
