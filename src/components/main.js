import "../style/main.css";

import { useEffect, useContext } from "react";
import { db } from "../services/firebase";
import DataContext from "../context/dataContext";
import Questions from "./questions";

const Main = () => {
  const { questionsArray, setquestionsArray } = useContext(DataContext);

  useEffect(() => {
    async function fetchData() {
      try {
        let tempArray = [];
        let currentArray = db.collection("questions");
        currentArray = await currentArray.get();
        currentArray.forEach((doc) => {
          let infoArray = [doc.id, doc.data()];
          tempArray.push(infoArray);
        });
        return setquestionsArray(tempArray);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [questionsArray, setquestionsArray]);
  return (
    <div className="main">
      {questionsArray.map((item, index) => (
        <Questions key={index} item={item} />
      ))}
    </div>
  );
};
export default Main;
