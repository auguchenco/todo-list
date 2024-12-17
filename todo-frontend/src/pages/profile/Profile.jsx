import DefaultPage from "../../components/defaultPage/DefaultPage";
import { useUtils } from "../../context/Utils";

const Profile = () => {
  const { dispatch, state } = useUtils();
  return (
    <DefaultPage>
      <h2>{`${state.user.username}`}</h2>
    </DefaultPage>
  );
};

export default Profile;
