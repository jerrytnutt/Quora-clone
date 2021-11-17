import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

const Comments = ({ item }) => {
  console.log(item);
  const questionContent = item;
  return (
    <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid>
          <Grid item>
            <Avatar alt="Remy Sharp" />
          </Grid>
          <Grid>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              {questionContent.name}
            </h4>
            <p style={{ textAlign: "left" }}>{questionContent.comment} </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
};
export default Comments;
