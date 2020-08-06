import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
	  <Route path="/signup">
        <SignUp />
      </Route>
    </Router>
  );
}

export default App;
