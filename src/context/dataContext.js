import { createContext, useState } from "react";
import auth from "../services/firebase";
import { db } from "../services/firebase";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [loggedIn, setloggedIn] = useState(false);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
