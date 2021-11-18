import "../style/header.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import InputBase from "@material-ui/core/InputBase";
import Openmenu from "./menubutton";
import SearchIcon from "@material-ui/icons/Search";
import Login from "./loginBox";
import QuestionBox from "./questionbox";
import { useContext, useEffect } from "react";
import auth from "../services/firebase";
import { Link } from "react-router-dom";
//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import DataContext from "../context/dataContext";

const Header = () => {
  const { loggedIn } = useContext(DataContext);
  const { enterQuestion, setenterQuestion } = useContext(DataContext);
  const { currentUser, setcurrentUser } = useContext(DataContext);
  const askQuestion = () => {
    if (currentUser && !loggedIn) {
      return setenterQuestion(true);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setcurrentUser(user);
      } else {
        console.log("No current User");
      }
    });
  });

  return (
    <div className="header">
      {loggedIn ? <Login /> : ""}
      {enterQuestion ? <QuestionBox /> : ""}

      <AppBar position="static">
        <Toolbar className="appBar">
          <p variant="title">Quora</p>

          <Link to="/">
            <IconButton className="toggle" aria-label="Menu">
              <HomeIcon fontSize="large" />
            </IconButton>
          </Link>
          <IconButton className="toggle" aria-label="Menu">
            <NotificationIcon fontSize="large" />
          </IconButton>
          <SearchIcon className="searchIcon" />
          <InputBase
            placeholder="Search Quora"
            className="inputBase"
            fontSize="large"
          />

          <div>
            <Openmenu />
            <button onClick={askQuestion}></button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
