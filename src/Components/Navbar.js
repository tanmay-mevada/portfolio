import React, { useEffect, useState } from "react";
import { Home, Code, Info, Mail, Github, Linkedin, Instagram } from "lucide-react";
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

const NAV_ITEMS = [
  { path: "/home", altPath: "/", label: "Home", Icon: Home },
  { path: "/projects", label: "Projects", Icon: Code },
  { path: "/about", label: "About", Icon: Info },
  { path: "/contact", label: "Contact", Icon: Mail },
];

const SOCIAL_ITEMS = [
  { path: "https://github.com/tanmay-mevada", label: "GitHub", Icon: Github },
  { path: "https://www.linkedin.com/in/tanmay-mevada/", label: "LinkedIn", Icon: Linkedin },
  { path: "https://instagram.com/tanmay.mevada", label: "Instagram", Icon: Instagram },
];

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);

  const isInitialLoad =
    performance.getEntriesByType("navigation")[0]?.type === "reload";

  useEffect(() => {
    let timer;
    if (isHome && isInitialLoad) {
      setShowNavbar(false);
      timer = setTimeout(() => setShowNavbar(true), 6000);
    } else {
      setShowNavbar(true);
    }
    
    const handleSkip = () => {
      setShowNavbar(true);
      if (timer) clearTimeout(timer);
    };
    window.addEventListener("skipIntroAnimation", handleSkip);
    
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("skipIntroAnimation", handleSkip);
    };
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

  const bgClasses = "bg-[#021526]/20 backdrop-blur-[2px] border border-blue/30 shadow-lg transition-shadow duration-500 hover:shadow-blue/50 text-white";

  const getIconClasses = (active, isDock) => {
    const base = "flex items-center justify-center group relative rounded-full transition-colors duration-300 hover:shadow-sm hover:shadow-blue";
    const size = isDock ? "w-10 h-10 sm:w-12 sm:h-12" : "w-12 h-12";
    const activeState = active
      ? "bg-blue text-black shadow-sm shadow-blue"
      : "text-blue hover:bg-blue hover:text-black";
    return `${base} ${size} ${activeState}`;
  };

  const mobileIconWrapper = (path) =>
    `flex flex-col items-center p-2 transition-colors duration-300 rounded-full group ${
      isActive(path)
        ? "bg-blue text-black"
        : "text-blue hover:text-black hover:bg-blue"
    }`;

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
              className={`fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 hidden sm:flex items-center justify-center gap-4 px-6 py-4 rounded-3xl ${bgClasses}`}
            >
            {NAV_ITEMS.map(({ path, altPath, label, Icon }) => {
              const active = isActive(path, altPath);
              return (
                <MagneticWrapper key={path}>
                  <Link
                    to={path}
                    aria-label={label}
                    className={getIconClasses(active, true)}
                  >
                    <Icon size={22} className="sm:w-6 sm:h-6" />
                    <Tooltip label={label} isDock={true} />
                  </Link>
                </MagneticWrapper>
              );
            })}
            
            <div className="w-[1px] h-8 bg-blue/30 mx-1"></div>

            {SOCIAL_ITEMS.map(({ path, label, Icon }) => {
              const isExternal = path.startsWith("http");
              const active = !isExternal && isActive(path);
              const Comp = isExternal ? "a" : Link;
              const props = isExternal ? { href: path, target: "_blank", rel: "noopener noreferrer" } : { to: path };
              
              return (
                <MagneticWrapper key={path}>
                  <Comp
                    {...props}
                    aria-label={label}
                    className={getIconClasses(active, true)}
                  >
                    <Icon size={22} className="sm:w-6 sm:h-6" />
                    <Tooltip label={label} isDock={true} />
                  </Comp>
                </MagneticWrapper>
              );
            })}
          </motion.nav>
        ) : (
          <motion.nav
            key="side-rail"
            initial={{ x: -100, opacity: 0, y: "-50%" }}
            animate={{ x: 0, opacity: 1, y: "-50%" }}
            exit={{ x: -100, opacity: 0, y: "-50%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed left-[18px] top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-8 py-8 px-4 rounded-[32px] ${bgClasses}`}
          >
            {NAV_ITEMS.map(({ path, altPath, label, Icon }) => {
              const active = isActive(path, altPath);
              return (
                <MagneticWrapper key={path}>
                  <Link
                    to={path}
                    aria-label={label}
                    className={getIconClasses(active, false)}
                  >
                    <Icon size={24} />
                    <Tooltip label={label} isDock={false} />
                  </Link>
                </MagneticWrapper>
              );
            })}
          </motion.nav>
          )
        )}
      </AnimatePresence>
      
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
                <Home size={24} />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/projects" className={mobileIconWrapper("/projects")}>
                <Code size={24} />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/about" className={mobileIconWrapper("/about")}>
                <Info size={24} />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/contact" className={mobileIconWrapper("/contact")}>
                <Mail size={24} />
              </a>
            </MagneticWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;