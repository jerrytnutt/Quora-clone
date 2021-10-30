import "../style/header.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

const Header = () => {
  return (
    <div className="header">
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
            <IconButton aria-haspopup="true" color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
