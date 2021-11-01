import "./App.css";

import Header from "./components/header";
import Main from "./components/main";

import {DataProvider} from "./context/dataContext.js"



function App() {
  //Context API
  //https://www.youtube.com/watch?v=ngVvDegsAW8
  //https://www.youtube.com/watch?v=ZBZ6BqoUDsU

  //100 everything small and efficient
  //CSS file for each component instead of one big CSS file.

  //https://www.youtube.com/watch?v=vyJU9efvUtQ
  return (
    <div className="App">
    <DataProvider>
      <Header />
      <Main />
      </DataProvider>
      
    </div>
  );
}

export default App;
