import "../style/login.css";
import React from "react";
import { useContext } from "react";
import { db } from "../services/firebase";
import { Link } from "react-router-dom";

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
  const { questionsArray, setquestionsArray } = useContext(DataContext);

  const { currentUser } = useContext(DataContext);

  console.log(askedQuestion);

  const submitQuestion = async () => {
    const name = currentUser.email.substr(0, currentUser.email.indexOf("@"));
    let con = currentUser.uid;
    const currentQuestion = db.collection("questions").doc(con);
    let doc = await currentQuestion.get();
    console.log(doc);
    let newNum = 0;
    if (doc) {
      let randInt = Math.floor(Math.random() * 100);

      con = con + randInt;
    }

    setaskedQuestion(false);
    const tempObj = [
      currentUser.uid,
      {
        name: "",
        description: "",
        question: askedQuestion,
        comments: [],
        voteList: [],
        downvotes: 0,
        upvotes: 0,
      },
    ];
    const tempAry = questionsArray;
    tempAry.push(tempObj);
    setquestionsArray(tempAry);
    console.log(questionsArray);
    return db.collection("questions").doc(con).set({
      name: "",
      description: "",
      question: askedQuestion,

      comments: [],
      voteList: [],
      downvotes: 0,
      upvotes: 0,
    });
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
                    <Link
                      to="/profile-page"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <Button
                        type="submit"
                        className="buttonSubmit"
                        onClick={submitQuestion}
                      >
                        Submit
                      </Button>
                    </Link>
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
