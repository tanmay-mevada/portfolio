import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InteractiveNetworkBG from "../Components/InteractiveNetworkBG";

function NotFound() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden text-center">
      {/* The Interactive Network Background */}
      <InteractiveNetworkBG />

      {/* 404 Content */}
      <div className="z-10 flex flex-col items-center justify-center max-w-2xl space-y-6 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="font-mono font-bold text-transparent text-8xl xs:text-9xl bg-clip-text bg-gradient-to-b from-[#E0FFFF] to-[#1E90FF]"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-semibold text-gray-200 xs:text-3xl">
            PAGE NOT FOUND
          </h2>
          <p className="text-base text-gray-400 xs:text-lg">
            The node you are looking for has drifted out of the network.
          </p>
        </motion.div>

        {/* Button wrapper needs pointer-events-auto so it can be clicked */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pointer-events-auto"
        >
          <Link
            to="/"
            className="inline-block px-8 py-3 mt-4 text-sm font-medium tracking-wide transition-all duration-300 border rounded-full border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-[#021526] hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]"
          >
            Return to Origin
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default NotFound;