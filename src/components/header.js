import "../style/header.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import InputBase from "@material-ui/core/InputBase";
import Openmenu from "./menubutton";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Login from "./loginBox";
import QuestionBox from "./questionbox";
import { useContext, useEffect } from "react";
import auth from "../services/firebase";
import { Link } from "react-router-dom";

import DataContext from "../context/dataContext";

const Header = () => {
  const { loggedIn } = useContext(DataContext);
  const { askedQuestion, setaskedQuestion } = useContext(DataContext);
  const { currentUser, setcurrentUser } = useContext(DataContext);

  const openQuestionBox = () => {
    if (currentUser && !loggedIn) {
      return setaskedQuestion(true);
    }
    return alert("Please create an account to ask questions.");
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
      {askedQuestion ? <QuestionBox /> : ""}

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
            <div className="buttonHolder">
              <Openmenu />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button-block"
                onClick={openQuestionBox}
              >
                Ask a Question
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
