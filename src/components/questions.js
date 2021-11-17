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
import DataContext from "../context/dataContext";

const Questions = ({ item }) => {
  const [baseSize, setbaseSize] = useState("commentBase");
  const [commentSize, setcommentSize] = useState("endBox");
  const [userComment, setuserComment] = useState("");
  const [Uvotes, setUvotes] = useState(item[1].upvotes);
  const [downvotes, setdownvotes] = useState(item[1].downvotes);

  const { currentUser } = useContext(DataContext);

  const questionInformation = item[1];

  const changeBox = () => {
    console.log(6);
    return setcommentSize("box");
  };
  const say = () => {
    console.log(baseSize);
    return setbaseSize("commentBaseBigger");
  };

  const addAComment = () => {
    const newCommentObject = { name: "john", comment: "comment" };
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
          <div className="name">
            <div className="userImage"></div>
            <div className="userInfo">
              <p className="userName">{questionInformation.name}</p>
              <p className="userTitle">{questionInformation.description}</p>
            </div>
          </div>
          <div className="question">{questionInformation.question}</div>
          <div className="answer">{questionInformation.answer}</div>
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
            <CommentIcon onClick={changeBox} />
          </div>
        </Box>
        <Box
          sx={{
            backgroundColor: grey,
          }}
          className={commentSize}
        >
          <div className="addComment">
            <div className="userImage"></div>
            <InputBase
              placeholder="Add a Comment..."
              className={baseSize}
              fontSize="large"
              onChange={(event) => setuserComment(event.target.value)}
              onClick={say}
            />

            <button onClick={addAComment} className="commentButton">
              Add Comment
            </button>
          </div>

          {questionInformation.comments.map((item, index) => (
            <Comments key={index} item={item} />
          ))}
        </Box>
      </Container>
    </div>
  );
};
export default Questions;
