import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate // Added Navigate for the catch-all route
} from "react-router-dom";

import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Layout from "./Components/Layout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

// We will create this admin component in the next step!
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
    <Router>
      <Routes>
        {/* PUBLIC ROUTES: Wrapped in your standard Layout (Navbar, Footer, etc.) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN ROUTE: Outside the layout so it has a completely separate, clean UI */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* CATCH-ALL: If someone types a broken URL, send them safely home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;