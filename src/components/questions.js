import "../style/main.css";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { grey } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import InputBase from "@material-ui/core/InputBase";
import { useState } from "react";

const Questions = () => {
  const [baseSize, setbaseSize] = useState("commentBase");
  const say = () => {
    console.log(baseSize);
    return setbaseSize("commentBaseBigger");
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
              <p className="userName">Michael Naunton</p>
              <p className="userTitle">Former Managing Director on Wall St</p>
            </div>
          </div>
          <div className="question">
            Why is the military so obsessed with tidiness? In combat, what
            difference does it make if the soldiers clothes are not perfectly
            ironed?
          </div>
          <div className="answer">
            I knew a guy on Wall St, he was hired for $700,000/year. One day, he
            stole an apple from the cafeteria: just put it in his pocket and
            walked out without paying. He was fired the next day. The 50 cent
            apple didn’t matter at all. What mattered was that he broke the
            rules and destroyed the trust we had in him. If a soldier can’t keep
            his uniform clean on base, there is a risk he won’t keep that quad
            .50 clean either.
          </div>
          <div className="replies">
            <div className="arrows">
              <div className="arrowBox">
                <ArrowUpwardIcon />
              </div>
              <div className="arrowBox">
                <ArrowDownwardIcon />
              </div>
            </div>
          </div>
        </Box>
        <Box
          sx={{
            width: 600,
            height: 300,

            backgroundColor: grey,
          }}
          className="box"
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
        </Box>
      </Container>
    </div>
  );
};
export default Questions;
