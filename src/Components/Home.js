import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import myPic from "../Assets/myPic.png";
import { Typewriter } from "react-simple-typewriter";
import MatrixBackground from "./MatrixBackground";

function Home() {
    const [fadeMatrix, setFadeMatrix] = useState(false);
    const [showHelloWorld, setShowHelloWorld] = useState(true);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const [showProfileImage, setShowProfileImage] = useState(false); // 👈 NEW

    useEffect(() => {
        const matrixDuration = 5000;

        const fadeTimeout = setTimeout(() => {
            setFadeMatrix(true);
        }, matrixDuration);

        const helloTimeout = setTimeout(() => {
            setShowHelloWorld(false);

            const typewriterTimeout = setTimeout(() => {
                setShowTypewriter(true);
                setShowProfileImage(true); // 👈 Show image AFTER delay
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
            className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-dark1 via-black-900 to-dark2 text-white relative overflow-hidden"
        >
            <MatrixBackground fadeOut={fadeMatrix} className="z-1 absolute inset-0 pointer-events-none" />

            {/* Profile Image */}
            {showProfileImage && ( // 👈 Only render when ready
                <motion.img
                    src={myPic}
                    alt="Tanmay Mevada"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="w-48 h-48 sm:w-60 sm:h-60  z-11 rounded-full mb-6 border-2 border-blue object-cover animate-glow"
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
                        className="text-3xl sm:text-6xl mb-4 z-10 font-mono"
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
                        className="text-4xl sm:text-6xl font-bold mb-4 z-10"
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
                    className="text-lg sm:text-xl text-gray-300 max-w-2xl h-10 z-10"
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
        </section>
    );
}

export default Home;