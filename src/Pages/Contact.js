import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#0a0f1c] px-4 sm:px-8 md:px-12 py-20 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Contact Form */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-2/3 backdrop-blur-sm border border-blue/10 rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 space-y-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-400">Send me a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Your Name", "Phone Number (Optional)", "Your Email", "Subject"].map((placeholder, i) => (
                  <input
                    key={i}
                    type={i === 2 ? "email" : i === 1 ? "tel" : "text"}
                    placeholder={placeholder}
                    className={`w-full p-3 bg-white/5 text-white placeholder-white/40 border border-white/10 rounded-lg transition 
                      hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none 
                      ${i >= 2 ? "col-span-1 sm:col-span-2" : ""}`}
                  />
                ))}
              </div>

              <textarea
                rows="5"
                placeholder="Yap here..."
                className="w-full p-3 bg-white/5 text-white placeholder-white/40 border border-white/10 rounded-lg transition 
                hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none resize-none"
              ></textarea>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition duration-200 shadow-lg text-white font-semibold"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0H4" />
                  </svg>
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Social Links Sidebar */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/3 backdrop-blur-md border border-blue/10 rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white/80"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-400 mb-6">Connect With Me</h2>
              <div className="space-y-5 text-sm sm:text-base">
                <p><span className="text-white font-medium">Email:</span> tanmaymevada24@gmail.com</p>
                <p><span className="text-white font-medium">Phone:</span> you ain't getting ts</p>
                {[
                  ["GitHub", "https://github.com/tanmay-mevada"],
                  ["Reddit", "https://reddit.com/u/Veg-Vagina-Eater"],
                  ["Twitter", "https://x.com/Youcanseeme_x"],
                  ["Instagram", "https://instagram.com/tanmay.mevada"],
                  ["Chess", "https://chess.com/member/tanmaymevada"]
                ].map(([label, link], idx) => (
                  <motion.p
                    key={idx}
                    whileHover={{ scale: 1.05, color: "#60a5fa" }}
                    transition={{ duration: 0.2 }}
                    className="transition"
                  >
                    <span className="text-white font-medium">{label}:</span>{" "}
                    <a href={link} className="text-blue/100 hover:underline" target="_blank" rel="noopener noreferrer">
                      Click Here
                    </a>
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
