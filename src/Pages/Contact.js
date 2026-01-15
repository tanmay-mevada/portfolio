import React, { useState } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, Send, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null); // 'success', 'error', or null

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
    { icon: Github, label: "GitHub", link: "https://github.com/tanmay-mevada", color: "hover:text-blue" },
    { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/tanmay-mevada/", color: "hover:text-blue" },
    { icon: Instagram, label: "Instagram", link: "https://instagram.com/tanmay.mevada", color: "hover:text-blue" },
  ];

  return (
    <div className="min-h-screen px-4 py-20 text-white bg-dark sm:px-8 md:px-12 lg:px-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="p-8 border shadow-xl bg-dark2/20 border-blue/20 rounded-2xl">
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
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition border rounded-lg bg-dark2 border-blue/20 focus:border-blue/50 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition border rounded-lg bg-dark2 border-blue/20 focus:border-blue/50 focus:outline-none disabled:opacity-50"
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
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition border rounded-lg bg-dark2 border-blue/20 focus:border-blue/50 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition border rounded-lg bg-dark2 border-blue/20 focus:border-blue/50 focus:outline-none disabled:opacity-50"
                  />
                </div>

                <textarea
                  name="message"
                  rows="7"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-white placeholder-gray-400 transition border rounded-lg resize-none bg-dark2 border-blue/20 focus:border-blue/50 focus:outline-none disabled:opacity-50"
                ></textarea>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 text-green-400 border rounded-lg border-green-400/30 bg-green-400/10"
                  >
                    <CheckCircle size={20} />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 text-red-400 border rounded-lg border-red-400/30 bg-red-400/10"
                  >
                    <XCircle size={20} />
                    <span>Failed to send message. Please try again.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition rounded-lg bg-blue hover:bg-blue/80 disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Contact Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full space-y-6 lg:w-1/3"
          >
            {/* Contact Details */}
            <div className="p-6 border shadow-lg bg-dark2 border-blue/20 rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold text-blue">Contact Info</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 text-blue" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:tanmaymevada24@gmail.com" className="transition-colors hover:text-blue">
                      tanmaymevada24@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 text-blue" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-gray-300">Available on request</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 border shadow-lg bg-dark2 border-blue/20 rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold text-blue">Connect</h2>
              <div className="space-y-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 p-3 transition border rounded-lg border-blue/20 hover:border-blue/40 ${social.color} group`}
                  >
                    <social.icon size={20} className="transition-transform text-blue group-hover:scale-110" />
                    <span className="font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}