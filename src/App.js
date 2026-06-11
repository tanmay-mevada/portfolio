import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation // 1. Import useLocation to track the current page
} from "react-router-dom";

import ProjectDetail from "./Pages/ProjectDetail";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Layout from "./Components/Layout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminLogin from "./Pages/AdminLogin"; 
import HoverMatrixBackground from "./Components/HoverMatrixBG";

// 2. Create a small helper component to handle the background logic
function GlobalBackground() {
  const location = useLocation();
  
  // If the user is on the Home page, render nothing (let Home handle its own falling rain)
  if (location.pathname === "/" || location.pathname === "/home") {
    return null;
  }

  // Otherwise, render the interactive hover grid
  return <HoverMatrixBackground />;
}

function App() {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="min-h-screen font-sans text-white">
      <Router>
        <GlobalBackground />
        
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
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