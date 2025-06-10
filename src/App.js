import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Layout from "./Components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          {/* Add more routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
