import React, { useEffect, useState } from "react";
import { Home, Code2, Info, Mail, Share2, FileText } from "lucide-react";
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
  const isInitialLoad =
    performance.getEntriesByType("navigation")[0]?.type === "reload";

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
    `w-11 h-11 flex items-center justify-center group relative rounded-full transition-all duration-300 ${
      isActive(path)
        ? "bg-[#1E90FF] text-black shadow-[0_0_22px_rgba(30,144,255,0.85)] scale-105"
        : "text-[#1E90FF] drop-shadow-[0_0_8px_rgba(30,144,255,0.7)] hover:text-[#60a5fa] hover:drop-shadow-[0_0_14px_rgba(30,144,255,1)] hover:scale-110"
    }`;

  const resumeIconWrapper =
    "w-11 h-11 flex items-center justify-center group relative rounded-full bg-[#1E90FF]/15 border border-[#1E90FF]/40 text-[#1E90FF] drop-shadow-[0_0_8px_rgba(30,144,255,0.6)] shadow-[0_0_12px_rgba(30,144,255,0.25)] hover:bg-[#1E90FF] hover:text-black hover:drop-shadow-none hover:shadow-[0_0_22px_rgba(30,144,255,0.85)] hover:scale-105 transition-all duration-300";

  const mobileIconWrapper = (path) =>
    `flex flex-col items-center p-2.5 rounded-full transition-all duration-300 group ${
      isActive(path)
        ? "bg-[#1E90FF] text-black shadow-[0_0_18px_rgba(30,144,255,0.85)]"
        : "text-[#1E90FF] drop-shadow-[0_0_6px_rgba(30,144,255,0.7)] hover:text-[#60a5fa]"
    }`;

  const label =
    "absolute left-16 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap z-50 shadow-lg backdrop-blur-md bg-[#021526]/90 border border-[#1E90FF]/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none";

  const RESUME_URL = "/resume.pdf";

  return (
    <>
      {/* ── Desktop Capsule Sidebar Nav Rail — Vertically Centered ── */}
      <AnimatePresence>
        {showSidebar && (
          <motion.nav
            aria-label="Main Navigation"
            initial={isHome ? { x: -100, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 bottom-0 left-6 z-50 hidden sm:flex flex-col justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-y-7 py-6 px-2.5 w-[64px] bg-[#021526]/50 backdrop-blur-md text-white shadow-[0_0_25px_rgba(0,0,0,0.5),0_0_12px_rgba(30,144,255,0.12)] rounded-[30px] border border-[#1E90FF]/35 transition-all duration-500 hover:border-[#1E90FF]/60 hover:shadow-[0_0_20px_rgba(30,144,255,0.2)] pointer-events-auto">
              {/* Home */}
              <MagneticWrapper>
                <a href="/home" className={iconWrapper("/home")} aria-label="Home">
                  <Home size={22} strokeWidth={2.2} />
                  <span className={label}>Home</span>
                </a>
              </MagneticWrapper>

              {/* Projects */}
              <MagneticWrapper>
                <Link to="/projects" className={iconWrapper("/projects")} aria-label="Projects">
                  <Code2 size={22} strokeWidth={2.2} />
                  <span className={label}>Projects</span>
                </Link>
              </MagneticWrapper>

              {/* About Me */}
              <MagneticWrapper>
                <a href="/about" className={iconWrapper("/about")} aria-label="About Me">
                  <Info size={22} strokeWidth={2.2} />
                  <span className={label}>About Me</span>
                </a>
              </MagneticWrapper>

              {/* Contact */}
              <MagneticWrapper>
                <Link to="/contact" className={iconWrapper("/contact")} aria-label="Contact">
                  <Mail size={22} strokeWidth={2.2} />
                  <span className={label}>Contact</span>
                </Link>
              </MagneticWrapper>

              {/* Socials */}
              <MagneticWrapper>
                <Link to="/socials" className={iconWrapper("/socials")} aria-label="Socials">
                  <Share2 size={22} strokeWidth={2.2} />
                  <span className={label}>Socials</span>
                </Link>
              </MagneticWrapper>

              {/* Resume CTA Button */}
              <MagneticWrapper>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className={resumeIconWrapper}
                  aria-label="Resume"
                >
                  <FileText size={20} strokeWidth={2.2} />
                  <span className={label}>Resume</span>
                </a>
              </MagneticWrapper>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Mobile Capsule Bottom Bar ── */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.div
            aria-label="Mobile Navigation"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-4 mx-auto sm:hidden z-50 bg-[#021526]/60 backdrop-blur-md text-white w-[95%] max-w-md rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5),0_0_12px_rgba(30,144,255,0.15)] border border-[#1E90FF]/35 px-4 py-2 flex justify-around items-center"
          >
            <MagneticWrapper>
              <a href="/home" className={mobileIconWrapper("/home")} aria-label="Home">
                <Home size={22} strokeWidth={2.2} />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/projects" className={mobileIconWrapper("/projects")} aria-label="Projects">
                <Code2 size={22} strokeWidth={2.2} />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/about" className={mobileIconWrapper("/about")} aria-label="About Me">
                <Info size={22} strokeWidth={2.2} />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/contact" className={mobileIconWrapper("/contact")} aria-label="Contact">
                <Mail size={22} strokeWidth={2.2} />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/socials" className={mobileIconWrapper("/socials")} aria-label="Socials">
                <Share2 size={22} strokeWidth={2.2} />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex flex-col items-center p-2 rounded-full text-black bg-[#1E90FF] shadow-[0_0_15px_rgba(30,144,255,0.85)]"
                aria-label="Resume"
              >
                <FileText size={20} strokeWidth={2.2} />
              </a>
            </MagneticWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;