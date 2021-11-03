import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
