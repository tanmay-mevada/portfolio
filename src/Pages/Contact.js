import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import HoverMatrixBackground from "../Components/HoverMatrixBG";
import Navbar from "../Components/Navbar";

const inputClass =
  "w-full px-4 py-3 text-white transition-all duration-200 border rounded-xl placeholder-white/30 bg-white/5 border-white/10 focus:border-blue/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue/30 disabled:opacity-40";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      if (!res.ok) throw new Error();
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

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
            Contact <span className="text-blue">Me</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* Contact info strip */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="mailto:tanmaymevada24@gmail.com"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-blue transition-colors"
            >
              <Mail size={14} className="text-blue/60" />
              tanmaymevada24@gmail.com
            </a>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Phone size={14} className="text-blue/60" />
              Available on request
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-7 sm:p-9 border bg-[#021526]/50 backdrop-blur-2xl border-white/10 rounded-2xl shadow-2xl"
          >
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
                name="message" rows="7" placeholder="Your Message *"
                value={formData.message} onChange={handleChange}
                required disabled={isLoading}
                className={`${inputClass} resize-none`}
              />

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 p-3.5 text-green-400 border rounded-xl border-green-400/20 bg-green-400/5 text-sm">
                  <CheckCircle size={18} /> Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 p-3.5 text-red-400 border rounded-xl border-red-400/20 bg-red-400/5 text-sm">
                  <XCircle size={18} /> Failed to send. Please fill all required fields and try again.
                </motion.div>
              )}

              <button
                type="submit" disabled={isLoading}
                className="group flex items-center justify-center w-full gap-2 px-6 py-3.5 font-semibold text-white rounded-xl bg-blue hover:bg-blue/80 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <><div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" /> Sending...</>
                ) : (
                  <><Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Send Message</>
                )}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </div>
  );
}