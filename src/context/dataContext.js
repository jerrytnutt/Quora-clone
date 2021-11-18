import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [enterQuestion, setenterQuestion] = useState("");
  const [currentUser, setcurrentUser] = useState(false);
  const [questionsArray, setquestionsArray] = useState([]);
  const [firstLetter, setfirstLetter] = useState("");

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
        enterQuestion,
        setenterQuestion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
