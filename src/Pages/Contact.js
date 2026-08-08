import React, { useState } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, Send, CheckCircle, XCircle, Code2, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import HoverMatrixBackground from "../Components/HoverMatrixBG";
import Navbar from "../Components/Navbar";

const LeetCodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.7a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const inputClass =
  "w-full px-4 py-3 text-white transition-all duration-200 border rounded-xl placeholder-white/30 bg-white/5 border-white/10 focus:border-blue/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue/30 disabled:opacity-40";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      sub: "tanmay-mevada",
      link: "https://github.com/tanmay-mevada",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      sub: "in/tanmay-mevada",
      link: "https://www.linkedin.com/in/tanmay-mevada/",
    },
    {
      icon: LeetCodeIcon,
      label: "LeetCode",
      sub: "tanmay-mevada",
      link: "https://leetcode.com/tanmay-mevada",
    },
    {
      icon: Instagram,
      label: "Instagram",
      sub: "@tanmay.mevada",
      link: "https://instagram.com/tanmay.mevada",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <HoverMatrixBackground />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pt-28 pb-20">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-blue/70 text-sm font-mono tracking-widest uppercase mb-2">
            {"// get_in_touch()"}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Let's <span className="text-blue">Connect</span>
          </h1>
          <p className="mt-3 text-white/40 text-sm max-w-md">
            Have a project in mind or just want to say hi? Drop a message and I'll get back to you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 lg:flex-row lg:items-start"
        >
          {/* ── Left: Form ── */}
          <motion.div variants={itemVariants} className="w-full lg:w-3/5">
            <form
              onSubmit={handleSubmit}
              className="p-7 sm:p-9 border bg-[#021526]/50 backdrop-blur-2xl border-white/10 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1.5 h-6 bg-blue rounded-full" />
                <h2 className="text-lg font-semibold text-white/90">Send a Message</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} required disabled={isLoading} className={inputClass} />
                  <input type="email" name="email" placeholder="Your Email *" value={formData.email} onChange={handleChange} required disabled={isLoading} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input type="tel" name="phone" placeholder="Phone (Optional)" value={formData.phone} onChange={handleChange} disabled={isLoading} className={inputClass} />
                  <input type="text" name="subject" placeholder="Subject *" value={formData.subject} onChange={handleChange} required disabled={isLoading} className={inputClass} />
                </div>

                <textarea
                  name="message"
                  rows="7"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={`${inputClass} resize-none`}
                />

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 p-3.5 text-green-400 border rounded-xl border-green-400/20 bg-green-400/5 text-sm"
                  >
                    <CheckCircle size={18} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 p-3.5 text-red-400 border rounded-xl border-red-400/20 bg-red-400/5 text-sm"
                  >
                    <XCircle size={18} />
                    Failed to send. Please fill all required fields and try again.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex items-center justify-center w-full gap-2 px-6 py-3.5 font-semibold text-white rounded-xl bg-blue hover:bg-blue/80 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* ── Right: Sidebar ── */}
          <motion.div variants={itemVariants} className="w-full lg:w-2/5 space-y-5">

            {/* Quick info */}
            <div className="p-6 border bg-[#021526]/50 backdrop-blur-2xl border-white/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-blue rounded-full" />
                <h2 className="text-lg font-semibold text-white/90">Contact Info</h2>
              </div>
              <div className="space-y-4">
                <a
                  href="mailto:tanmaymevada24@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue/20 transition-colors">
                    <Mail size={16} className="text-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Email</p>
                    <p className="text-sm text-white/80 group-hover:text-blue transition-colors">tanmaymevada24@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Phone</p>
                    <p className="text-sm text-white/40">Available on request</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Location</p>
                    <p className="text-sm text-white/80">Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Response time</p>
                    <p className="text-sm text-white/80">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="p-6 border bg-[#021526]/50 backdrop-blur-2xl border-white/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-blue rounded-full" />
                <h2 className="text-lg font-semibold text-white/90">Find Me On</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col gap-2 p-3.5 border rounded-xl bg-white/5 border-white/10 hover:border-blue/40 hover:bg-blue/5 transition-all duration-200 group"
                  >
                    <span className="text-blue group-hover:scale-110 transition-transform origin-left inline-block">
                      <social.icon size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white/90">{social.label}</p>
                      <p className="text-xs text-white/30 truncate">{social.sub}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-green-400/5 border-green-400/20">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <p className="text-sm text-green-400/80">
                Open to internships & freelance opportunities
              </p>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}