import "../style/questions.css";
import { db } from "../services/firebase";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { grey } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CommentIcon from "@material-ui/icons/Comment";
import InputBase from "@material-ui/core/InputBase";
import { useState } from "react";

const Questions = ({ item }) => {
  const [baseSize, setbaseSize] = useState("commentBase");
  const [commentSize, setcommentSize] = useState("endBox");

  const questionInformation = item[1];
  const changeBox = () => {
    console.log(6);
    return setcommentSize("box");
  };
  const say = () => {
    console.log(baseSize);
    return setbaseSize("commentBaseBigger");
  };

  const addUpvotes = async () => {
    const currentArray = await db.collection("questions").doc(item[0]);
    //updates here
    currentArray.update({ upvotes: 5 });
    //const doc = await currentArray.get();
    //doc
    //console.log(doc.data());
    //console.log(questionsArray);
    //console.log(item[0]);
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
            width: 600,
            height: 300,

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
                <ArrowUpwardIcon onClick={addUpvotes} />
                {questionInformation.upvotes}
              </div>
              <div className="arrowBox">
                <ArrowDownwardIcon />
                {questionInformation.downvotes}
              </div>
            </div>
            <CommentIcon onClick={changeBox} />
          </div>
        </Box>
        <Box
          sx={{
            width: 600,

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
              onClick={say}
            />

            <button className="commentButton">Add Comment</button>
          </div>

          {questionInformation.comments.map((item, index) => (
            <div className="remake" key={index}>
              {item[0]}
              {item[1]}
            </div>
          ))}
        </Box>
      </Container>
    </div>
  );
};
export default Questions;
