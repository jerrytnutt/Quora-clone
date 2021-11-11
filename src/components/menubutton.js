import * as React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import auth from "../services/firebase";
import { useContext } from "react";

import DataContext from "../context/dataContext";

export default function Openmenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const { loggedIn, setloggedIn } = useContext(DataContext);
  const { currentUser, setcurrentUser } = useContext(DataContext);

  const handleToggle = () => {
    console.log(`currentUser ${currentUser}`);

    setOpen((prevOpen) => !prevOpen);
  };

  const handleProfile = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  };
  const handleClose = (event) => {
    //make sign in a state
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    if (!loggedIn) {
      setloggedIn(true);
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
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
  return (
    <div>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircle fontSize="large" />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {currentUser ? (
                      <Link to="/profile-page">
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                      </Link>
                    ) : (
                      <MenuItem onClick={handleClose}>Create Profile</MenuItem>
                    )}
                    {currentUser ? (
                      <MenuItem onClick={signOut}>Sign Out</MenuItem>
                    ) : (
                      <MenuItem onClick={handleClose}>Sign In</MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
