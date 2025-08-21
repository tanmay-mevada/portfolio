import React, { useEffect, useState } from "react";
import { Home, Code, Info, Mail, Github, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const [showSidebar, setShowSidebar] = useState(!isHome);
  const [showMobileNav, setShowMobileNav] = useState(true);
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
      setShowMobileNav(currentScrollY < lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconWrapper =
    "w-12 h-12 flex items-center justify-center group relative rounded-full text-blue transition-all duration-300 transform will-change-transform hover:scale-110 hover:shadow-sm hover:shadow-blue hover:bg-blue hover:text-black";

  const label =
    "absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 text-sm rounded-md whitespace-nowrap z-50 shadow backdrop-blur-md backdrop-saturate-150 bg-blue/10 border border-blue/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300";

  return (
    <>
      <AnimatePresence>
        {showSidebar && (
          <motion.nav
            initial={isHome ? { x: -100, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-20 left-6 h-[600px] w-[68px] bg-dark text-white flex-col items-center py-8 shadow-lg z-50 rounded-xl border-2 border-blue transition-all duration-500 hover:shadow-blue/80 hover:scale-[1.009] hover:brightness-110 hidden sm:flex"
          >
            <div className="flex flex-col items-center gap-y-6">
              <a href="/home" className={iconWrapper}>
                <Home size={28} />
                <span className={label}>Home</span>
              </a>
              <Link to="/projects" className={iconWrapper}>
                <Code size={28} />
                <span className={label}>Projects</span>
              </Link>
              <a href="/about" className={iconWrapper}>
                <Info size={28} />
                <span className={label}>About Me</span>
              </a>
              <a href="/contact" className={iconWrapper}>
                <Mail size={28} />
                <span className={label}>Contact</span>
              </a>
            </div>

            <div className="flex-grow" />

            <div className="flex flex-col items-center gap-y-5">
              <a
                href="https://github.com/tanmay-mevada"
                target="_blank"
                rel="noopener noreferrer"
                className={iconWrapper}
              >
                <Github size={26} />
                <span className={label}>GitHub</span>
              </a>
              <a
                href="https://instagram.com/tanmay.mevada"
                target="_blank"
                rel="noopener noreferrer"
                className={iconWrapper}
              >
                <Instagram size={26} />
                <span className={label}>Instagram</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMobileNav && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-4 mx-auto sm:hidden z-50 bg-dark text-white w-[95%] max-w-md rounded-full shadow-lg border-2 border-blue px-4 py-2 flex justify-around items-center"
          >
            <a
              href="/home"
              className="flex flex-col items-center p-2 transition-all duration-300 rounded-full group text-blue hover:text-black hover:bg-blue"
            >
              <Home size={24} />
            </a>
            <Link
              to="/projects"
              className="flex flex-col items-center p-2 transition-all duration-300 rounded-full group text-blue hover:text-black hover:bg-blue"
            >
              <Code size={24} />
            </Link>
            <a
              href="/about"
              className="flex flex-col items-center p-2 transition-all duration-300 rounded-full group text-blue hover:text-black hover:bg-blue"
            >
              <Info size={24} />
            </a>
            <a
              href="/contact"
              className="flex flex-col items-center p-2 transition-all duration-300 rounded-full group text-blue hover:text-black hover:bg-blue"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
