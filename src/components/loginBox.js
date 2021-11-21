import "../style/login.css";
import React from "react";
import { useContext } from "react";
import auth from "../services/firebase";

import DataContext from "../context/dataContext";

import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Toolbar,
} from "@material-ui/core";

const Login = () => {
  const { password, setpassword } = useContext(DataContext);
  const { username, setusername } = useContext(DataContext);
  const { occupation, setoccupation } = useContext(DataContext);
  const { setfirstLetter } = useContext(DataContext);
  const { setloggedIn } = useContext(DataContext);
  const { setcurrentUser } = useContext(DataContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setpassword("");
    setusername("");
    setoccupation("");
  };

  const createNewAccount = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setfirstLetter(email.substring(0, 1));
      })
      .catch((error) => {
        console.log(error);

        auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            setfirstLetter(email.substring(0, 1));
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
          setloggedIn(false);
          setcurrentUser(user);
          setoccupation(occupation);
        });
        return unSub;
      });
    const unSub = auth.onAuthStateChanged((user) => {
      setloggedIn(false);
      setcurrentUser(user);
      setoccupation(occupation);
    });
    return unSub;
  };

  const signInExistingAccount = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setfirstLetter(email.substring(0, 1));
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

  const createDemoAccount = () => {
    let demoEmail;
    let demoPassword;

    let randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (var i = 0; i < 10; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    demoEmail = `${result}@website.com`;
    demoPassword = "password12345";

    auth
      .createUserWithEmailAndPassword(demoEmail, demoPassword)
      .then(() => {
        setfirstLetter(demoEmail.substring(0, 1));
      })
      .catch((error) => {});
    const unSub = auth.onAuthStateChanged((user) => {
      setloggedIn(false);
      setcurrentUser(user);
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
                      <TextField
                        type="text"
                        placeholder="Occupation/Education"
                        fullWidth
                        name="username"
                        variant="outlined"
                        onChange={(event) => setoccupation(event.target.value)}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        onClick={() => {
                          createNewAccount(username, password);
                        }}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <div className="bar"></div>
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
                          onClick={() => {
                            signInExistingAccount(username, password);
                          }}
                        >
                          Sign In
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>

                <Button
                  variant="contained"
                  color="orange"
                  type="submit"
                  className="button-block"
                  onClick={createDemoAccount}
                >
                  Use Demo Account
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
