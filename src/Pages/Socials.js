
import React from "react";
import { Github, Linkedin, Instagram, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import HoverMatrixBackground from "../Components/HoverMatrixBG";
import Navbar from "../Components/Navbar";

const LeetCodeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.7a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
);

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const DiscordIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.037.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
);

const socialLinks = [
    {
        icon: Github,
        label: "GitHub",
        sub: "tanmay-mevada",
        link: "https://github.com/tanmay-mevada",
        desc: "Check out my projects and open source contributions.",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        sub: "in/tanmay-mevada",
        link: "https://www.linkedin.com/in/tanmay-mevada/",
        desc: "Connect with me professionally.",
    },
    {
        icon: LeetCodeIcon,
        label: "LeetCode",
        sub: "tanmay-mevada",
        link: "https://leetcode.com/tanmay-mevada",
        desc: "See my problem solving journey.",
    },
    {
        icon: XIcon,
        label: "X (Twitter)",
        sub: "@tanmay_mevada",
        link: "#",
        desc: "Thoughts, updates and dev stuff.",
    },
    {
        icon: DiscordIcon,
        label: "Discord",
        sub: "tanmay.mevada",
        link: "#",
        desc: "Find me in dev communities.",
    },
    {
        icon: Instagram,
        label: "Instagram",
        sub: "@tanmay.mevada",
        link: "https://instagram.com/tanmay.mevada",
        desc: "A little peek into my life outside code.",
    },
];

export default function Socials() {
    return (
        <div className="relative min-h-screen overflow-hidden text-white">
            <HoverMatrixBackground />
            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pt-28 pb-20">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold">
                        Find Me <span className="text-blue">On</span>
                    </h1>
                </motion.div>

                {/* Info strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-4 mb-10"
                >
                    {[
                        { icon: MapPin, text: "Gujarat, India" },
                        { icon: Clock, text: "Usually replies within 24h" },
                    ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-sm text-white/40">
                            <Icon size={14} className="text-blue/60" />
                            {text}
                        </div>
                    ))}
                </motion.div>

                {/* Social cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {socialLinks.map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.link}
                            target={social.link === "#" ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.07, duration: 0.4 }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            className={`flex flex-col gap-3 p-5 border rounded-2xl border-white/10 transition-all duration-200 group
                ${social.link === "#"
                                    ? "bg-white/[0.03] opacity-50 cursor-not-allowed"
                                    : "bg-white/5 hover:border-blue/40 hover:bg-blue/5 cursor-pointer"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors
                  ${social.link === "#"
                                        ? "bg-white/5 border-white/10 text-white/30"
                                        : "bg-blue/10 border-blue/20 text-blue group-hover:bg-blue/20"
                                    }`}>
                                    <social.icon />
                                </div>
                                {social.link === "#" ? (
                                    <span className="text-xs text-white/20 font-mono">soon</span>
                                ) : (
                                    <svg className="w-4 h-4 text-white/20 group-hover:text-blue/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <p className={`font-semibold ${social.link === "#" ? "text-white/40" : "text-white/90"}`}>
                                    {social.label}
                                </p>
                                <p className={`text-xs mb-1 ${social.link === "#" ? "text-white/20" : "text-blue/60"}`}>
                                    {social.sub}
                                </p>
                                <p className="text-xs text-white/30">{social.desc}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Availability badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 px-4 py-3 mt-8 border rounded-xl bg-green-400/5 border-green-400/20 w-fit"
                >
                    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                    </span>
                    <p className="text-sm text-green-400/80">Open to internships & freelance opportunities</p>
                </motion.div>

            </div>
        </div>
    );
}