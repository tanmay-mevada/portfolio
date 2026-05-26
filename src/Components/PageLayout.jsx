// PageLayout.jsx — drop this on every page
import React from "react";

function PageLayout({ children, className = "" }) {
  return (
    <div className={`w-full min-h-screen bg-dark text-white pb-24 px-4 sm:pl-24 sm:pr-6 sm:pb-8 md:pl-28 md:pr-10 lg:pl-32 lg:pr-16 ${className}`}>
      {children}
    </div>
  );
}

export default PageLayout;