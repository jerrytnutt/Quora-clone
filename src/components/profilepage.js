import "../style/profile.css";
import DataContext from "../context/dataContext";
import { useContext } from "react";

const ProfilePage = () => {
  const { messageResponce } = useContext(DataContext);
  return (
    <div className="top">
      <div className="message">{messageResponce}</div>
    </div>
  );
};
export default ProfilePage;
