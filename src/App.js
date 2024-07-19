import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import FormAddNewNail from "./routes/FormAddNewNail";
import HeaderApp from "./HeaderAppp.jsx";
import Unhas from "./Unhas";

function App() {
  return (
    <div className="App">
      <HeaderApp />
      <Unhas />
    </div>
  );
}

export default App;
