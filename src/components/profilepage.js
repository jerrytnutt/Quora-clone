import "../style/profile.css";
import DataContext from "../context/dataContext";
import { db } from "../services/firebase";
import { useContext, useEffect, useState } from "react";

const ProfilePage = () => {
  const { userAskedQuestions, setuserAskedQuestions } = useContext(DataContext);
  const { currentUser } = useContext(DataContext);

  const [listOfQuestions, setlistOfQuestions] = useState([]);

  useEffect(() => {
    setTimeout(function () {
      const retrieveListOfQuestions = async () => {
        console.log("retrieveListOfQuestions");
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
      retrieveListOfQuestions();
      return setlistOfQuestions(userAskedQuestions);
    }, 1000);
  }, [userAskedQuestions, setuserAskedQuestions, currentUser.uid]);

  return (
    <div className="top">
      <div className="message">Unanswerd Questions by: {currentUser.email}</div>
      {listOfQuestions.map((item, index) => (
        <div key={index} item={item} className="message">
          {item}
        </div>
      ))}
    </div>
  );
};
export default ProfilePage;
