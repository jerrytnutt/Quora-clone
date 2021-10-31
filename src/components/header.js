import "../style/header.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import InputBase from "@material-ui/core/InputBase";
import Openmenu from "./menubutton"
import SearchIcon from "@material-ui/icons/Search";
import Login from "./loginBox";
import {useState} from "react"
const Header = () => {
  const [hy, sethy] = useState(false)
 
  
  return (
    <div className="header">
  {hy ? <Login/> : ''}
      <AppBar position="static">
        <Toolbar className="appBar">
          <Typography variant="title" style={{ color: "AA2200" }}>
            Quora
          </Typography>
          <IconButton className="toggle" aria-label="Menu">
            <HomeIcon fontSize="large" />
          </IconButton>
          <IconButton className="toggle" aria-label="Menu">
            <NotificationIcon fontSize="large" />
          </IconButton>
          <SearchIcon />
          <InputBase fontSize="large" />
          <div>
            
            <Openmenu/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
