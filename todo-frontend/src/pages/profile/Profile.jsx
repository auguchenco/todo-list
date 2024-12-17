import DefaultPage from "../../components/defaultPage/DefaultPage";
import { useUtils } from "../../context/Utils";

const Profile = () => {
  const { dispatch, state } = useUtils();
  return <DefaultPage></DefaultPage>;
};

export default Profile;
