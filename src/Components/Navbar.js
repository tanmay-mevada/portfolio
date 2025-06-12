import React, { useEffect, useState } from "react";
import { Home, Code, Info, Mail, Github, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [show, setShow] = useState(!isHome);

  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => setShow(true), 6000); // Delay for matrix effect
      return () => clearTimeout(timer);
    } else {
      setShow(true); // Instantly show on other pages
    }
  }, [isHome]);

  const iconWrapper =
    "w-12 h-12 flex items-center justify-center group relative rounded-full text-blue transition-all duration-300 transform will-change-transform hover:scale-110 hover:shadow-sm hover:shadow-blue hover:bg-blue hover:text-black";

  const label =
    "absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 text-sm rounded-md whitespace-nowrap z-50 shadow backdrop-blur-md backdrop-saturate-150 bg-blue/10 border border-blue/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300";

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={isHome ? { x: -100, opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-20 left-6 h-[670px] w-[68px] bg-dark text-white flex flex-col items-center py-8 shadow-lg z-50 rounded-xl border-2 border-blue transition-all duration-500 hover:shadow-blue/80 hover:scale-[1.009] hover:brightness-110"
        >
          {/* Main Nav Icons */}
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
            <a href="#contact" className={iconWrapper}>
              <Mail size={28} />
              <span className={label}>Contact</span>
            </a>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Social Links */}
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
  );
}

export default Navbar;
