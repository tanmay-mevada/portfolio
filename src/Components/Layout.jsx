import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MatrixBackground from "./MatrixBG";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-dark1 via-black-900 to-dark2 relative overflow-hidden">
      {isHome && <MatrixBackground fadeOut={true} />}
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
