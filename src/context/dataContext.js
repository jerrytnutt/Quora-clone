import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [askedQuestion, setaskedQuestion] = useState("");
  const [currentUser, setcurrentUser] = useState(false);
  const [questionsArray, setquestionsArray] = useState([]);
  const [firstLetter, setfirstLetter] = useState("");
  const [occupation, setoccupation] = useState("");
  const [messageResponce, setmessageResponce] = useState("");

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  return (
    <DataContext.Provider
      value={{
        loggedIn,
        setloggedIn,
        username,
        setusername,
        password,
        setpassword,
        currentUser,
        setcurrentUser,
        questionsArray,
        setquestionsArray,
        firstLetter,
        setfirstLetter,
        askedQuestion,
        setaskedQuestion,
        occupation,
        setoccupation,
        messageResponce,
        setmessageResponce,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
