import React from "react";
import "../style/login.css";
import { useContext } from "react";
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

  const handleChange = (event) => {
    setpassword("");
    setusername("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setpassword("");
    setusername("");
  };
  const showPass = () => {
    console.log(username, password);
  };

  return (
    <div className="logInBox">
      <Toolbar>
        <Grid container justify="center" wrap="wrap">
          <Grid item>
            <Typography variant="h6"></Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
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
                  Sign in
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
                        onClick={showPass}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
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
