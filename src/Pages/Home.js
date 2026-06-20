import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import myPic from "../Assets/myPic.png";
import CryptoText from "../Components/CryptoText"; 
import HoverMatrixBackground from "../Components/HoverMatrixBG"; 
import MatrixRainintro from "../Components/MatrixBG"; 
import Navbar from "../Components/Navbar";

function Home() {
  const [fadeMatrixRainintro, setfadeMatrixRainintro] = useState(false);
  const [showHelloWorld, setShowHelloWorld] = useState(true);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);

  useEffect(() => {
    const isInitialLoad =
      performance.getEntriesByType("navigation")[0].type === "reload";

    if (!isInitialLoad) {
      setfadeMatrixRainintro(true);
      setShowHelloWorld(false);
      setShowTypewriter(true);
      setShowProfileImage(true);
      return;
    }

    const matrixDuration = 5000;

    const fadeTimeout = setTimeout(() => {
      setfadeMatrixRainintro(true);
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
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-10 overflow-hidden text-center text-white sm:px-6"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,144,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <HoverMatrixBackground />
        <MatrixRainintro fadeOut={fadeMatrixRainintro} />
      </div>

      <Navbar delay={true} />

      <div className="z-10 flex flex-col items-center justify-center w-full max-w-screen-sm space-y-6">
        {showProfileImage && (
          <div className="relative mb-4">
            {/* Outer glow */}
            <div
              className="absolute inset-0 z-0 scale-110 rounded-full pointer-events-none blur-2xl"
              style={{ background: "rgba(30,144,255,0.2)" }}
            />

            {/* Circular frame — this is what blurs whatever sits behind/around it */}
            <div
              className="absolute inset-0 z-[3] rounded-full pointer-events-none border-blue animate-glow"
              style={{
                border: "2px solid",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                background: "rgba(70,160,255,0.08)",
              }}
            />

            {/* Sharp photo on top, no blur */}
            <motion.img
              src={myPic}
              alt="Tanmay Mevada"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-[5] object-cover w-32 h-32 rounded-full xs:w-40 xs:h-40 sm:w-60 sm:h-60"
            />
          </div>
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
              <span className="text-blue">
                {/* 2. Replaced Typewriter with CryptoText for the intro sequence */}
                <CryptoText text="'hello world!!'" />
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
            {/* 3. Replaced Typewriter with CryptoText for the subtitle */}
            <CryptoText text="A CS major with some minimal and basic skills." />
          </motion.p>
        )}
      </div>
    </section>
  );
}

export default Home;