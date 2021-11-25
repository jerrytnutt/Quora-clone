import "./App.css";

import Header from "./components/header";
import Main from "./components/main";
import ProfilePage from "./components/profilepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataContext.js";

function App() {
  //Context API
  //https://www.youtube.com/watch?v=ngVvDegsAW8
  //https://www.youtube.com/watch?v=ZBZ6BqoUDsU

  //100 everything small and efficient
  //CSS file for each component instead of one big CSS file.

  //https://www.youtube.com/watch?v=vyJU9efvUtQ

  // basename={process.env.PUBLIC_URL}
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <DataProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/profile-page" element={<ProfilePage />}></Route>
          </Routes>
        </DataProvider>
      </div>
    </Router>
  );
}

export default App;
