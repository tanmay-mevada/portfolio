import React, { useState } from "react";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    
    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    
    const data = { name, email, phone, subject, message };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        alert("Message sent successfully!");
        // Clear form
        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="email"]').value = '';
        document.querySelector('input[name="phone"]').value = '';
        document.querySelector('input[name="subject"]').value = '';
        document.querySelector('textarea[name="message"]').value = '';
      } else {
        alert(`${result.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert("Error: Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-20 text-white bg-slate-900 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-stretch gap-8 lg:flex-row">
          {/* Contact Form */}
          <div className="w-full p-6 space-y-10 border shadow-xl lg:w-2/3 backdrop-blur-sm border-blue-500/10 rounded-3xl sm:p-10 md:p-12">
            <h2 className="text-3xl font-bold text-center text-blue-400 sm:text-4xl">Send me a message</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  disabled={isLoading}
                  className="w-full p-3 text-white transition border rounded-lg bg-white/5 placeholder-white/40 border-white/10 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  disabled={isLoading}
                  className="w-full p-3 text-white transition border rounded-lg bg-white/5 placeholder-white/40 border-white/10 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  disabled={isLoading}
                  className="w-full col-span-1 p-3 text-white transition border rounded-lg sm:col-span-2 bg-white/5 placeholder-white/40 border-white/10 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  disabled={isLoading}
                  className="w-full col-span-1 p-3 text-white transition border rounded-lg sm:col-span-2 bg-white/5 placeholder-white/40 border-white/10 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <textarea
                name="message"
                rows="5"
                placeholder="Yap here..."
                required
                disabled={isLoading}
                className="w-full p-3 text-white transition border rounded-lg resize-none bg-white/5 placeholder-white/40 border-white/10 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              ></textarea>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition duration-200 bg-blue-600 shadow-lg rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Social Links Sidebar */}
          <div className="flex flex-col justify-between w-full p-6 border shadow-lg lg:w-1/3 backdrop-blur-md border-blue-500/10 rounded-3xl sm:p-8 md:p-10 text-white/80">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-center text-blue-400 sm:text-4xl">Connect With Me</h2>
              <div className="space-y-5 text-sm sm:text-base">
                <p><span className="font-medium text-white">Email:</span> tanmaymevada24@gmail.com</p>
                <p><span className="font-medium text-white">Phone:</span> you ain't getting ts</p>
                {[
                  ["GitHub", "https://github.com/tanmay-mevada"],
                  ["Reddit", "https://reddit.com/u/"],
                  ["Twitter", "https://x.com/"],
                  ["Instagram", "https://instagram.com/tanmay.mevada"],
                  ["Chess", "https://chess.com/member/tanmaymevada"]
                ].map(([label, link], idx) => (
                  <p key={idx} className="transition hover:text-blue-400">
                    <span className="font-medium text-white">{label}:</span>{" "}
                    <a href={link} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                      Click Here
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}