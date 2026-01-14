import React from "react";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

function ProjectCard({ title, description, tech, images, github, live, date, demo}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden transition-all border bg-dark2 border-blue/20 rounded-xl hover:glow"
    >
      {/* Title + Date */}
      <div className="flex items-center justify-between p-4 pb-2">
        <h3 className="text-2xl font-semibold text-blue">{title}</h3>
        <span className="text-sm text-gray-400">{date}</span>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`project-${i}`}
              className="w-full h-[420px] object-contain border-t border-b border-blue/10"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Description + Tech */}
      <div className="p-4">
        <p className="mb-3 text-sm text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs text-white border rounded bg-blue/10 border-blue/30"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue hover:underline"
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue hover:underline"
            >
              <ExternalLink size={16} /> Live
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue hover:underline"
            >
              <Youtube size={16} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
