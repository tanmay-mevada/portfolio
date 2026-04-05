import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Layout from "./Components/Layout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminLogin from "./Pages/AdminLogin"; 

function App() {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      window.location.reload();
    }
  }, []);

  return (
    // THE FIX: This wrapper forces the entire app to be dark, 100% of the time.
    <div className="min-h-screen font-sans text-white bg-dark">
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* ADMIN ROUTE */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* CATCH-ALL */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;