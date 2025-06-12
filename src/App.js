import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Layout from "./Components/Layout";
import About from "./Pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;