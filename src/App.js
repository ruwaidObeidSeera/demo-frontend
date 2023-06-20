import logo from "./logo.svg";
import "./App.css";

import Listing from "./components/listing";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          width="200px"
          height="200px"
          src={logo}
          className="App-logo"
          alt="logo"
        />
        Welcome to Lumi
      </header>
      <Listing />
    </div>
  );
}

export default App;
