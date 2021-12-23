import "../style/login.css";
import React from "react";
import { useContext } from "react";
import { db } from "../services/firebase";
import { Link } from "react-router-dom";

import DataContext from "../context/dataContext";

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
  const { setmessageResponce } = useContext(DataContext);
  const { currentUser } = useContext(DataContext);
  const { setuserAskedQuestions } = useContext(DataContext);

  const submitQuestion = async () => {
    let con = currentUser.uid;
    const currentQuestion = db.collection("questions").doc(con);
    let doc = await currentQuestion.get();

    if (doc) {
      let randInt = Math.floor(Math.random() * 100);

      con = con + randInt;
    }

    setaskedQuestion(false);
    setmessageResponce("Question Submitted");
    getProfilePage();
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

  const getProfilePage = async () => {
    let con = currentUser.uid;
    let userId = con.slice(0, 15);
    console.log(userId);

    let snapshot = await db.collection("questions").get();
    snapshot = snapshot.docs;
    let newArr = [];
    snapshot.map((doc) => {
      const answer = doc.data().answer;
      if (userId === doc.id.slice(0, 15) && answer === undefined) {
        newArr.push(doc.data().question);
      }
      return setuserAskedQuestions(newArr);
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
