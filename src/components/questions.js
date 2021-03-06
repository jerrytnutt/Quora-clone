import "../style/questions.css";
import Comments from "./comments";
import { db } from "../services/firebase";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { grey } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CommentIcon from "@material-ui/icons/Comment";
import InputBase from "@material-ui/core/InputBase";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import DataContext from "../context/dataContext";

const Questions = ({ item }) => {
  const [baseSize, setbaseSize] = useState("commentBase");
  const [commentSize, setcommentSize] = useState("endBox");
  const [userComment, setuserComment] = useState("");
  const [Uvotes, setUvotes] = useState(item[1].upvotes);
  const [downvotes, setdownvotes] = useState(item[1].downvotes);
  const [questionArray] = useState(item[1].comments);
  const [createdAnswer, setcreatedAnswer] = useState("");
  const { occupation } = useContext(DataContext);
  const { setmessageResponce } = useContext(DataContext);

  const { currentUser } = useContext(DataContext);

  const questionInformation = item[1];

  const changeBox = () => {
    console.log(occupation);
    if (commentSize === "endBox") {
      return setcommentSize("box");
    }
    return setcommentSize("endBox");
  };

  const changeCommentSection = () => {
    return setbaseSize("commentBaseBigger");
  };

  const addAComment = () => {
    setmessageResponce("Comment Added");
    const newCommentObject = { name: currentUser.email, comment: userComment };
    const newArray = item[1].comments;
    newArray.push(newCommentObject);
    const currentQuestion = db.collection("questions").doc(item[0]);
    currentQuestion.update({ comments: newArray });
  };

  const addUpvotes = async (voteType) => {
    if (!currentUser) {
      return alert("Please create an account to vote");
    }
    const userId = currentUser.uid;
    const currentQuestion = await db.collection("questions").doc(item[0]);
    const doc = await currentQuestion.get();

    let voteList = doc.data().voteList;
    for (var i = 0; i < voteList.length; i++) {
      if (voteList[i] === userId) {
        return null;
      }
    }
    let newList = voteList;
    newList.push(userId);
    currentQuestion.update({ voteList: newList });
    if (voteType === "up") {
      let upVotes = doc.data().upvotes;
      let newVotes = (upVotes += 1);
      currentQuestion.update({ upvotes: newVotes });
      return setUvotes(newVotes);
    }
    let downvotes = doc.data().downvotes;
    let newVotes = (downvotes += 1);
    currentQuestion.update({ downvotes: newVotes });
    setdownvotes(newVotes);
  };
  const answerQuestion = async () => {
    setmessageResponce("Question Answerd");

    if (createdAnswer === "") {
      console.log("no");
      return null;
    }

    const currEmail = db.collection("occupations").doc(currentUser.email);
    const document = await currEmail.get();
    let docData;
    console.log(document);
    if (!document.exists) {
      docData = document.job;
      console.log("No such document!");
    } else {
      docData = document.data().job;

      console.log("Document data:", document.data());
    }

    const name = currentUser.email.substr(0, currentUser.email.indexOf("@"));

    console.log(name, docData, createdAnswer);
    return db.collection("questions").doc(item[0]).update({
      name: name,
      description: docData,
      answer: createdAnswer,
    });
  };

  return (
    <div className="main">
      <Container
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        className="container"
      >
        <Box
          sx={{
            backgroundColor: grey,
          }}
          className="box"
        >
          {!questionInformation.name ? (
            ""
          ) : (
            <div className="name">
              <div className="userImage">
                <p>{questionInformation.name.substring(0, 1).toUpperCase()}</p>
              </div>

              <div className="userInfo">
                <p className="userName">{questionInformation.name}</p>
                <p className="userTitle">{questionInformation.description}</p>
              </div>
            </div>
          )}

          <div className="question">{questionInformation.question}</div>
          <div className="bar"></div>
          <div className="answer">
            {questionInformation.answer ? (
              questionInformation.answer
            ) : (
              <div>
                <TextField
                  name={createdAnswer}
                  onChange={(event) => setcreatedAnswer(event.target.value)}
                  id="standard-multiline-static"
                  multiline
                  rows={4}
                  defaultValue="Answer..."
                  variant="standard"
                />
                <Link
                  to="/profile-page"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <button className="addAnswer" onClick={answerQuestion}>
                    Answer Question
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="replies">
            <div className="arrows">
              <div className="arrowBox">
                <ArrowUpwardIcon
                  onClick={() => {
                    addUpvotes("up");
                  }}
                />
                {Uvotes}
              </div>
              <div className="arrowBox">
                <ArrowDownwardIcon onClick={addUpvotes} />
                {downvotes}
              </div>
            </div>
            <CommentIcon className="commentIcon" onClick={changeBox} />
          </div>
        </Box>
        <Box
          sx={{
            backgroundColor: grey,
          }}
          className={commentSize}
        >
          <div className="addComment">
            <InputBase
              placeholder="Add a Comment..."
              className={baseSize}
              fontSize="large"
              onChange={(event) => setuserComment(event.target.value)}
              onClick={changeCommentSection}
            />
            <Link
              to="/profile-page"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <button onClick={addAComment} className="commentButton">
                Add Comment
              </button>
            </Link>
          </div>
          {questionArray ? (
            questionArray.map((item, index) => (
              <Comments key={index} item={item} />
            ))
          ) : (
            <p>Users is empty</p>
          )}
        </Box>
      </Container>
    </div>
  );
};
export default Questions;
