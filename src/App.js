import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Layout from "./Components/Layout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
  useEffect(() => {
  const hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
    sessionStorage.setItem("hasVisited", "true");
    window.location.reload();
  }
}, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
