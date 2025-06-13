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
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-10 bg-gradient-to-br from-dark1 via-black-900 to-dark2 text-white relative overflow-hidden"
    >
      {/* Matrix BG */}
      <MatrixBackground
        fadeOut={fadeMatrix}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Navbar */}
      <Navbar delay={true} />

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center z-10 max-w-screen-sm w-full space-y-6">
        {/* Profile Image */}
        {showProfileImage && (
          <motion.img
            src={myPic}
            alt="Tanmay Mevada"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-32 h-32 xs:w-40 xs:h-40 sm:w-60 sm:h-60 rounded-full mb-4 border-2 border-blue object-cover animate-glow"
          />
        )}

        {/* Animated Heading */}
        <AnimatePresence mode="wait">
          {showHelloWorld ? (
            <motion.h1
              key="hello"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-2xl xs:text-3xl sm:text-6xl mb-3 font-mono"
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
              className="text-3xl xs:text-4xl sm:text-6xl font-bold mb-3"
            >
              I'm <span className="text-blue">Tanmay</span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Typewriter Caption */}
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
