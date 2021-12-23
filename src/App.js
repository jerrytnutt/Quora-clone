import "./App.css";

import Header from "./components/header";
import Main from "./components/main";
import ProfilePage from "./components/profilepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataContext.js";

function App() {
  // basename={process.env.PUBLIC_URL}
  return (
    <Router basename="/">
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
