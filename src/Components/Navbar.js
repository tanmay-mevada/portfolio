import React, { useEffect, useState } from "react";
import { Home, Code, Info, Mail, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Simple, glitch-free magnetic wrapper
function MagneticWrapper({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-50 flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Shared nav configuration
const NAV_ITEMS = [
  { path: "/home", altPath: "/", label: "Home", Icon: Home },
  { path: "/projects", label: "Projects", Icon: Code },
  { path: "/about", label: "About", Icon: Info },
  { path: "/contact", label: "Contact", Icon: Mail },
];

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);

  const isInitialLoad =
    performance.getEntriesByType("navigation")[0]?.type === "reload";

  useEffect(() => {
    if (isHome && isInitialLoad) {
      setShowNavbar(false);
      const timer = setTimeout(() => setShowNavbar(true), 6000);
      return () => clearTimeout(timer);
    } else {
      setShowNavbar(true);
    }
  }, [isHome, isInitialLoad]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowMobileNav(currentScrollY < lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path, altPath) => {
    if (altPath && location.pathname === altPath) return true;
    return location.pathname === path;
  };

  // Shared Tooltip Label
  const Tooltip = ({ label, isDock }) => (
    <span
      className={`absolute px-2 py-1 text-xs sm:text-sm rounded-md whitespace-nowrap z-50 shadow backdrop-blur-md backdrop-saturate-150 bg-blue/10 border border-blue/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
        isDock
          ? "bottom-full mb-3 left-1/2 -translate-x-1/2" // Tooltip above dock
          : "left-14 top-1/2 -translate-y-1/2"           // Tooltip to the right for siderail
      }`}
    >
      {label}
    </span>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {showNavbar && (
          isHome ? (
            <motion.nav
              key="bottom-dock"
              initial={{ y: 100, opacity: 0, x: "-50%" }}
              animate={{ y: 0, opacity: 1, x: "-50%" }}
              exit={{ y: 100, opacity: 0, x: "-50%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-[14px] px-4 py-3 rounded-[18px] bg-[rgba(15,30,48,0.92)] backdrop-blur-md border border-blue/30 shadow-lg shadow-blue/10"
            >
            {NAV_ITEMS.map(({ path, altPath, label, Icon }) => {
              const active = isActive(path, altPath);
              return (
                <MagneticWrapper key={path}>
                  <Link
                    to={path}
                    aria-label={label}
                    className={`group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-colors duration-300 ${
                      active
                        ? "bg-blue/20 text-blue"
                        : "text-white/70 hover:text-blue hover:bg-blue/10"
                    }`}
                  >
                    <Icon size={22} className="sm:w-6 sm:h-6" />
                    <Tooltip label={label} isDock={true} />
                  </Link>
                </MagneticWrapper>
              );
            })}
            
            {/* Vertical Divider */}
            <div className="w-[1px] h-8 bg-blue/30 mx-1"></div>
            
            {/* Resume Pill Button */}
            <MagneticWrapper>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-blue hover:bg-blue/90 text-dark font-medium rounded-full transition-colors"
              >
                <FileText size={18} />
                <span className="hidden sm:inline">Resume</span>
              </a>
            </MagneticWrapper>
          </motion.nav>
        ) : (
          <motion.nav
            key="side-rail"
            initial={{ x: -100, opacity: 0, y: "-50%" }}
            animate={{ x: 0, opacity: 1, y: "-50%" }}
            exit={{ x: -100, opacity: 0, y: "-50%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed left-[18px] top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-4 py-5 px-3 rounded-[24px] bg-[rgba(15,30,48,0.92)] backdrop-blur-md border border-blue/30 shadow-lg shadow-blue/10"
          >
            {NAV_ITEMS.map(({ path, altPath, label, Icon }) => {
              const active = isActive(path, altPath);
              return (
                <MagneticWrapper key={path}>
                  <Link
                    to={path}
                    aria-label={label}
                    className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ${
                      active
                        ? "bg-blue text-dark"
                        : "text-white/70 hover:text-blue hover:bg-blue/10"
                    }`}
                  >
                    <Icon size={24} />
                    <Tooltip label={label} isDock={false} />
                  </Link>
                </MagneticWrapper>
              );
            })}
            
            {/* Resume Button in Rail */}
            <MagneticWrapper>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
                className="group relative flex items-center justify-center w-10 h-10 mt-2 bg-blue hover:bg-blue/90 text-dark rounded-xl transition-colors"
              >
                <FileText size={20} />
                <Tooltip label="Resume" isDock={false} />
              </a>
            </MagneticWrapper>
          </motion.nav>
          )
        )}
      </AnimatePresence>
      
      {/* Mobile Nav for non-home pages (since side rail is hidden on mobile) */}
      <AnimatePresence>
        {!isHome && showMobileNav && (
          <motion.div
            key="mobile-rail"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-4 mx-auto sm:hidden z-50 bg-[rgba(15,30,48,0.92)] backdrop-blur-md text-white w-[95%] max-w-md rounded-full shadow-lg border border-blue/30 px-4 py-2 flex justify-around items-center"
          >
            {NAV_ITEMS.map(({ path, altPath, label, Icon }) => {
              const active = isActive(path, altPath);
              return (
                <MagneticWrapper key={path}>
                  <Link
                    to={path}
                    aria-label={label}
                    className={`flex flex-col items-center p-2 transition-colors duration-300 rounded-full ${
                      active
                        ? "text-blue bg-blue/10"
                        : "text-white/70 hover:text-blue hover:bg-blue/10"
                    }`}
                  >
                    <Icon size={22} />
                  </Link>
                </MagneticWrapper>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;