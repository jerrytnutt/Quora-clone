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
        const currentArray = db.collection("questions");
        const aa = await currentArray.get();
        aa.forEach((doc) => {
          let t = [doc.data()];
          tempArray.push(t);
        });
        return setquestionsArray(tempArray);
        //console.log(currentArray);

        //const currentArray = await db
        //.collection("questions")
        //.doc("xp0EmNC5DRDDj1O6wv3r");
        //const doc = await currentArray.get();

        //console.log(doc.data());
        //console.log(questionsArray);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [setquestionsArray]);
  return (
    <div className="main">
      {questionsArray.map((item, index) => (
        <Questions key={index} item={item} />
      ))}
    </div>
  );
};
export default Main;
