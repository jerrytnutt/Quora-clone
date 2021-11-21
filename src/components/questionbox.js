import "../style/login.css";
import React from "react";
import { useContext } from "react";
import { db } from "../services/firebase";

import DataContext from "../context/dataContext";
//<form onSubmit={handleSubmit}>
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Toolbar,
} from "@material-ui/core";

const QuestionBox = () => {
  const { askedQuestion, setaskedQuestion } = useContext(DataContext);
  const { occupation } = useContext(DataContext);

  const { currentUser } = useContext(DataContext);

  console.log(askedQuestion);

  const submitQuestion = async () => {
    const name = currentUser.email.substr(0, currentUser.email.indexOf("@"));
    let con = currentUser.uid;
    const currentQuestion = db.collection("questions").doc(con);
    const doc = await currentQuestion.get();
    console.log(6);
    return db.collection("questions").doc(con).set({
      name: name,
      description: "",
      question: askedQuestion,

      comments: [],
      voteList: [],
      downvotes: 0,
      upvotes: 0,
    });
  };
  //<form onSubmit={handleSubmit}>

  //let con = currentUser.uid;
  //let con = currentUser;
  //const currentArray = db.collection("questions").doc(con);
  //const doc = await currentArray.get();

  //if (!doc.exists) {
  // const savedPhotoArray = [];
  // savedPhotoArray.push({ 0: item.urls.small, 1: item.urls.regular });

  // return db.collection("users").doc(con).set({
  //   name: "name",
  //  photoArray: savedPhotoArray,
  //});
  //} else {
  // let newArray = doc.data().photoArray;
  // newArray.push({ 0: item.urls.small, 1: item.urls.regular });
  // return db.collection("users").doc(con).update({
  //  name: "name",
  //  photoArray: newArray,
  // });
  /// }
  // };

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
                  Enter Question
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="askedQuestion"
                      variant="outlined"
                      onChange={(event) => setaskedQuestion(event.target.value)}
                      required
                      autoFocus
                    />
                  </Grid>
                  <Grid item></Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="button-block"
                      onClick={submitQuestion}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default QuestionBox;
