import React from "react";
import "../style/login.css";
import {useState} from "react"

import {
Button,
TextField,
Grid,
Paper,
AppBar,
Typography,
Toolbar,
Link,
} from "@material-ui/core";


const Login = () => {
 
  const [username, setusername] = useState("")
const [password, setpassword] = useState("")

const handleChange = (event) => {
    setpassword("")
    setusername("")
}
const handleSubmit = (event) => {
    event.preventDefault();
    setpassword("")
    setusername("")
}

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
onChange={(event) =>
setusername(event.target.value,
)
}
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
onChange={(event) =>
setpassword(event.target.value,
)
}
required
/>
</Grid>
<Grid item>
                  <Button
              variant="contained"
               color="primary"
type="submit"
className="button-block"
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
