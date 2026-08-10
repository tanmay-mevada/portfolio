import React, { useEffect, useState } from "react";
import { Home, Code, Info, Mail, FileText, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function MagneticWrapper({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

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

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const [showSidebar, setShowSidebar] = useState(!isHome);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [showResume, setShowResume] = useState(true);
  const isInitialLoad =
    performance.getEntriesByType("navigation")[0].type === "reload";

  useEffect(() => {
    if (isHome && isInitialLoad) {
      setShowSidebar(false);
      const timer = setTimeout(() => setShowSidebar(true), 6000);
      return () => clearTimeout(timer);
    } else {
      setShowSidebar(true);
    }
  }, [isHome, isInitialLoad]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 10;
      setShowMobileNav(!scrollingDown);
      setShowResume(!scrollingDown);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/home") return location.pathname === "/" || location.pathname === "/home";
    return location.pathname === path;
  };

  const iconWrapper = (path) =>
    `w-12 h-12 flex items-center justify-center group relative rounded-full transition-colors duration-300 hover:shadow-sm hover:shadow-blue ${
      isActive(path)
        ? "bg-blue text-black shadow-sm shadow-blue"
        : "text-blue hover:bg-blue hover:text-black"
    }`;

  const mobileIconWrapper = (path) =>
    `flex flex-col items-center p-2 transition-colors duration-300 rounded-full group ${
      isActive(path)
        ? "bg-blue text-black"
        : "text-blue hover:text-black hover:bg-blue"
    }`;

  const label =
    "absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 text-sm rounded-md whitespace-nowrap z-50 shadow backdrop-blur-md backdrop-saturate-150 bg-blue/10 border border-blue/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none";

  const RESUME_URL = "/resume.pdf";

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <AnimatePresence>
        {showSidebar && (
          <motion.nav
            initial={isHome ? { x: -100, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-1/2 -translate-y-1/2 left-6 w-[68px] bg-[#021526]/20 backdrop-blur-[2px] text-white flex-col items-center py-6 shadow-lg z-50 rounded-2xl border border-blue/30 transition-all duration-500 hover:shadow-blue/50 hidden sm:flex"
          >
            {/* Primary nav */}
            <div className="flex flex-col items-center gap-y-6">
              <MagneticWrapper>
                <a href="/home" className={iconWrapper("/home")}>
                  <Home size={24} />
                  <span className={label}>Home</span>
                </a>
              </MagneticWrapper>

              <MagneticWrapper>
                <Link to="/projects" className={iconWrapper("/projects")}>
                  <Code size={24} />
                  <span className={label}>Projects</span>
                </Link>
              </MagneticWrapper>

              <MagneticWrapper>
                <a href="/about" className={iconWrapper("/about")}>
                  <Info size={24} />
                  <span className={label}>About Me</span>
                </a>
              </MagneticWrapper>

              <MagneticWrapper>
                <Link to="/socials" className={iconWrapper("/socials")}>
                  <Share2 size={24} />
                  <span className={label}>Socials</span>
                </Link>
              </MagneticWrapper>

              <MagneticWrapper>
                <Link to="/contact" className={iconWrapper("/contact")}>
                  <Mail size={24} />
                  <span className={label}>Contact</span>
                </Link>
              </MagneticWrapper>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Floating Resume button — bottom right ── */}
      <AnimatePresence>
        {showSidebar && showResume && (
          <motion.a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            download
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-6 z-50 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue/10 border border-blue/30 text-blue backdrop-blur-md hover:bg-blue hover:text-black hover:border-transparent hover:shadow-md hover:shadow-blue/40 transition-colors duration-300"
          >
            <FileText size={18} />
            <span className="text-sm font-semibold">Resume</span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* ── Mobile bottom bar ── */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-4 mx-auto sm:hidden z-50 bg-[#021526]/20 backdrop-blur-md text-white w-[95%] max-w-md rounded-full shadow-lg border border-blue/30 px-4 py-2 flex justify-around items-center"
          >
            <MagneticWrapper>
              <a href="/home" className={mobileIconWrapper("/home")}>
                <Home size={26} />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/projects" className={mobileIconWrapper("/projects")}>
                <Code size={26} />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/about" className={mobileIconWrapper("/about")}>
                <Info size={26} />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/socials" className={mobileIconWrapper("/socials")}>
                <Share2 size={24} />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/contact" className={mobileIconWrapper("/contact")}>
                <Mail size={26} />
              </Link>
            </MagneticWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;