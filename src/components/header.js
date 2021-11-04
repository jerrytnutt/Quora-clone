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
import { useContext, useEffect } from "react";
import auth from "../services/firebase";
import { db } from "../services/firebase";

import DataContext from "../context/dataContext";

const Header = () => {
  const { loggedIn } = useContext(DataContext);
  const { currentUser, setcurrentUser } = useContext(DataContext);
  const signOut = () => {
    auth.signOut().then(
      function () {
        console.log("Signed Out");
        return setcurrentUser(false);
        //return setfirstLetter("");
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        //setfirstLetter(user.email.substring(0, 1));

        setcurrentUser(user);
      } else {
        console.log("No current User");
      }
    });
  });

  return (
    <div className="header">
      {loggedIn ? <Login /> : ""}
      <AppBar position="static">
        <Toolbar className="appBar">
          <p variant="title">Quora</p>
          <button onClick={signOut}>h</button>
          <IconButton className="toggle" aria-label="Menu">
            <HomeIcon fontSize="large" />
          </IconButton>
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
