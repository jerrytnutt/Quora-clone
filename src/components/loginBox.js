import React from "react";
import "../style/login.css";
import { useContext } from "react";
import auth from "../services/firebase";
import { db } from "../services/firebase";
import DataContext from "../context/dataContext";

import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";

const Login = () => {
  const { password, setpassword } = useContext(DataContext);
  const { username, setusername } = useContext(DataContext);
  const { loggedIn, setloggedIn } = useContext(DataContext);
  const { currentUser, setcurrentUser } = useContext(DataContext);

  //const handleChange = (event) => {
  //setpassword("");
  //setusername("");
  //};
  const handleSubmit = (event) => {
    event.preventDefault();
    setpassword("");
    setusername("");
  };
  const showPass = () => {
    //console.log(auth);
    return console.log(username, password);
    const createNewAccount = (email, password, random = false) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          //setfirstLetter(email.substring(0, 1));
        })
        .catch((error) => {
          // if (random === true) {
          // let randomChars =
          //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          // let result = "";
          //  for (var i = 0; i < 10; i++) {
          //  result += randomChars.charAt(
          //   Math.floor(Math.random() * randomChars.length)
          // );
          // }
          // email = `${result}@website.com`;
          // password = "password12345";
          // }
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              //setfirstLetter(email.substring(0, 1));
            })
            .catch((error) => {
              switch (error.code) {
                case "auth/email-already-in-use":
                  alert(`Email address already in use.`);
                  break;
                case "auth/invalid-email":
                  alert(`Email address  is invalid.`);
                  break;
                case "auth/operation-not-allowed":
                  alert(`Error during sign up.`);
                  break;
                case "auth/weak-password":
                  alert(
                    "Password is not strong enough. Add additional characters including special characters and numbers."
                  );
                  break;
                default:
                  alert(error.message);
                  break;
              }
            });
          const unSub = auth.onAuthStateChanged((user) => {
            setcurrentUser(user);
            setloggedIn(false);
          });
          return unSub;
        });
      const unSub = auth.onAuthStateChanged((user) => {
        setloggedIn(false);
        setcurrentUser(user);
      });
      return unSub;
    };
    return createNewAccount("john@website.com", "12345678");
  };

  const signInExistingAccount = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("in");
      })
      .catch((error) => {
        alert(error.message);
      });
    const unSub = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      setloggedIn(false);
    });
    return unSub;
  };

  return (
    <div className="logInBox">
      <Toolbar>
        <Grid container justifyContent="center" wrap="wrap">
          <Grid item>
            <Typography variant="h6"></Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <Grid container spacing={0} justifyContent="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Create an account
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        onChange={(event) => setusername(event.target.value)}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        onChange={(event) => setpassword(event.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        onClick={showPass}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Grid item>
                  <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="email"
                          placeholder="Email"
                          fullWidth
                          name="username"
                          variant="outlined"
                          value={username}
                          onChange={(event) => setusername(event.target.value)}
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={password}
                          onChange={(event) => setpassword(event.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                          onClick={() => {
                            signInExistingAccount(username, password);
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>

                <Link href="#" variant="body2">
                  Use Demo Account
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
