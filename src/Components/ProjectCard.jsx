import React from "react";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

function ProjectCard({ 
  title_disp,
  slug,
  desc_concise, 
  tech_stack, 
  images, 
  git_link, 
  live_link, 
  demo_link, 
  date 
}) {
  
  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
    : 'Ongoing';

  const displayImages = images && images.length > 0 ? images : ["/placeholder-image.jpg"];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col h-full overflow-hidden text-left transition-all duration-300 border shadow-lg group bg-dark2 rounded-2xl"
      style={{
        borderColor: "rgba(30,144,255,0.12)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(30,144,255,0.4)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,144,255,0.12), 0 4px 20px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(30,144,255,0.12)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.35)";
      }}
    >
      {/* Title + Date */}
      <div className="flex items-center justify-between gap-4 p-5 pb-4 sm:p-6 sm:pb-4">
        <Link to={`/projects/${slug}`} className="flex-1 min-w-0">
          <h3
            className="text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl lg:text-2xl line-clamp-1"
            style={{ color: "#94a3b8" }}
            onMouseEnter={e => e.currentTarget.style.color = "#1E90FF"}
            onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
          >
            {title_disp}
          </h3>
        </Link>
        <span
          className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase shrink-0 px-2 py-0.5 rounded-md"
          style={{ color: "#475569", background: "rgba(30,144,255,0.06)", border: "1px solid rgba(30,144,255,0.12)" }}
        >
          {formattedDate}
        </span>
      </div>

      {/* Image Wrapper */}
      <div
        className="w-full overflow-hidden h-[200px] sm:h-[240px] lg:h-[280px] relative"
        style={{ borderTop: "1px solid rgba(30,144,255,0.1)", borderBottom: "1px solid rgba(30,144,255,0.1)", background: "#060d18" }}
      >
        <div
          className="absolute inset-x-0 top-0 z-10 h-px transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg, transparent, rgba(30,144,255,0.6), transparent)" }}
        />
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          className="w-full h-full"
        >
          {displayImages.map((img, i) => (
            <SwiperSlide key={i} className="w-full h-full">
              <img
                src={img}
                alt={`${title_disp} screenshot ${i + 1}`}
                className="object-contain w-full h-full p-2 transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <p
          className="mb-5 text-sm leading-relaxed sm:text-base sm:mb-6 line-clamp-3 sm:line-clamp-2"
          style={{ color: "#64748b" }}
        >
          {desc_concise}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6 sm:gap-2.5">
          {tech_stack?.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              whileHover={{ y: -2, scale: 1.06 }}
              className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-md cursor-default transition-all duration-200"
              style={{
                background: "rgba(30,144,255,0.07)",
                border: "1px solid rgba(30,144,255,0.18)",
                color: "#475569",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(30,144,255,0.16)";
                e.currentTarget.style.borderColor = "rgba(30,144,255,0.45)";
                e.currentTarget.style.color = "#93c5fd";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(30,144,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(30,144,255,0.18)";
                e.currentTarget.style.color = "#475569";
              }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        {/* Links Footer */}
        <div
          className="flex flex-wrap items-center gap-4 pt-4 mt-auto sm:gap-5"
          style={{ borderTop: "1px solid rgba(30,144,255,0.08)" }}
        >
          {git_link && (
            <motion.a
              href={git_link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors duration-200"
              style={{ color: "#475569" }}
              onMouseEnter={e => e.currentTarget.style.color = "#1E90FF"}
              onMouseLeave={e => e.currentTarget.style.color = "#475569"}
            >
              <Github size={16} className="sm:w-5 sm:h-5" /> Code
            </motion.a>
          )}
          {live_link && (
            <motion.a
              href={live_link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors duration-200"
              style={{ color: "#475569" }}
              onMouseEnter={e => e.currentTarget.style.color = "#1E90FF"}
              onMouseLeave={e => e.currentTarget.style.color = "#475569"}
            >
              <ExternalLink size={16} className="sm:w-5 sm:h-5" /> Live
            </motion.a>
          )}
          {demo_link && (
            <motion.a
              href={demo_link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors duration-200"
              style={{ color: "#475569" }}
              onMouseEnter={e => e.currentTarget.style.color = "#1E90FF"}
              onMouseLeave={e => e.currentTarget.style.color = "#475569"}
            >
              <Youtube size={16} className="sm:w-5 sm:h-5" /> Watch
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;