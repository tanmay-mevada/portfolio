import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import myPic from "../Assets/myPic.png";
import { Typewriter } from "react-simple-typewriter";
import MatrixBackground from "../Components/MatrixBG";
import Navbar from "../Components/Navbar";

function Home() {
  const [fadeMatrix, setFadeMatrix] = useState(false);
  const [showHelloWorld, setShowHelloWorld] = useState(true);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);

  useEffect(() => {
    const isInitialLoad =
      performance.getEntriesByType("navigation")[0].type === "reload";

    if (!isInitialLoad) {
      setFadeMatrix(true);
      setShowHelloWorld(false);
      setShowTypewriter(true);
      setShowProfileImage(true);
      return;
    }

    const matrixDuration = 5000;

    const fadeTimeout = setTimeout(() => {
      setFadeMatrix(true);
    }, matrixDuration);

    const helloTimeout = setTimeout(() => {
      setShowHelloWorld(false);

      const typewriterTimeout = setTimeout(() => {
        setShowTypewriter(true);
        setShowProfileImage(true);
      }, 600);

      return () => clearTimeout(typewriterTimeout);
    }, matrixDuration + 1000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(helloTimeout);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-10 overflow-hidden text-center text-white sm:px-6 bg-gradient-to-br from-dark1 via-black-900 to-dark2"
    >
      {/* Matrix BG */}
      <MatrixBackground
        fadeOut={fadeMatrix}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Navbar */}
      <Navbar delay={true} />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-screen-sm space-y-6">
        {showProfileImage && (
          <motion.img
            src={myPic}
            alt="Tanmay Mevada"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="object-cover w-32 h-32 mb-4 border-2 rounded-full xs:w-40 xs:h-40 sm:w-60 sm:h-60 border-blue animate-glow"
          />
        )}

        <AnimatePresence mode="wait">
          {showHelloWorld ? (
            <motion.h1
              key="hello"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, y: -50 }}
              transition={{ duration: 0.8 }}
              className="mb-3 font-mono text-2xl xs:text-3xl sm:text-6xl"
            >
              <span className="text-gr">
                <Typewriter
                  words={["'hello world!!'"]}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  delaySpeed={2000}
                />
              </span>
            </motion.h1>
          ) : (
            <motion.h1
              key="tanmay"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-3 text-3xl font-bold xs:text-4xl sm:text-6xl"
            >
              I'm <span className="text-blue">Tanmay</span>
            </motion.h1>
          )}
        </AnimatePresence>

        {showTypewriter && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm xs:text-base sm:text-xl text-gray-300 max-w-[90%] sm:max-w-2xl min-h-[2.5rem]"
          >
            <Typewriter
              words={[
                "A Computer Science & Engineering student with some minimal and basic skills.",
              ]}
              cursor
              cursorStyle="▌"
              typeSpeed={75}
              delaySpeed={5000}
            />
          </motion.p>
        )}
      </div>
    </section>
  );
}

export default Home;
