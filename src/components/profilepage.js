import "../style/main.css";
import DataContext from "../context/dataContext";
import { useState, useContext } from "react";

const ProfilePage = () => {
  const { occupation, setoccupation } = useContext(DataContext);
  return <div>{occupation}</div>;
};
export default ProfilePage;
