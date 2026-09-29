import React, { useState } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, Send, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import HoverMatrixBackground from "../Components/HoverMatrixBG";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        setStatus('success');
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", link: "https://github.com/tanmay-mevada" },
    { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/tanmay-mevada/" },
    { icon: Instagram, label: "Instagram", link: "https://instagram.com/tanmay.mevada" },
  ];

  const inputClasses = "w-full px-4 py-3 text-sm text-white transition border rounded-xl placeholder-gray-500 bg-[#021526]/60 border-blue/20 focus:border-blue/50 focus:outline-none focus:ring-1 focus:ring-blue/30 disabled:opacity-50 sm:text-base";

  return (
    <div className="relative min-h-screen px-4 py-20 overflow-hidden text-white sm:px-8 md:px-16 lg:px-40">
      
      <HoverMatrixBackground />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl mx-auto"
      >

        {/* Contact Form — centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <form onSubmit={handleSubmit} className="p-6 border shadow sm:p-8 bg-[#021526]/40 backdrop-blur-md border-blue/30 rounded-3xl shadow-blue/20">
            <h2 className="mb-6 text-2xl font-bold text-blue">Send a Message</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={inputClasses}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={inputClasses}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={inputClasses}
                />
              </div>

              <textarea
                name="message"
                rows="6"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`${inputClasses} resize-none`}
              ></textarea>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 text-green-400 border rounded-xl border-green-400/20 bg-green-400/5"
                >
                  <CheckCircle size={18} />
                  <span className="text-sm">Message sent successfully!</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 text-red-400 border rounded-xl border-red-400/20 bg-red-400/5"
                >
                  <XCircle size={18} />
                  <span className="text-sm">Failed to send message. Please try again.</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-semibold text-white transition rounded-xl bg-blue hover:bg-blue/80 disabled:opacity-50 disabled:cursor-not-allowed sm:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Contact Info + Socials — below the form, side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {/* Contact Details */}
          <div className="p-6 border shadow bg-[#021526]/40 backdrop-blur-md border-blue/30 rounded-3xl shadow-blue/20">
            <h2 className="mb-5 text-xl font-bold text-blue">Contact Info</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 mt-0.5 rounded-xl bg-blue/10 border border-blue/20 shrink-0">
                  <Mail className="text-blue" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <a href="mailto:tanmaymevada24@gmail.com" className="text-sm text-gray-300 transition-colors break-all hover:text-blue">
                    tanmaymevada24@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 mt-0.5 rounded-xl bg-blue/10 border border-blue/20 shrink-0">
                  <Phone className="text-blue" size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <p className="text-sm text-gray-400">Available on request</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 border shadow bg-[#021526]/40 backdrop-blur-md border-blue/30 rounded-3xl shadow-blue/20">
            <h2 className="mb-5 text-xl font-bold text-blue">Connect</h2>
            <div className="space-y-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 transition border rounded-xl bg-[#021526]/40 border-blue/20 hover:border-blue/40 hover:text-blue group"
                >
                  <social.icon size={18} className="transition-transform text-blue group-hover:scale-110" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-blue">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}