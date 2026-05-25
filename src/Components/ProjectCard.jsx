import React from "react";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

function ProjectCard({ 
  title_disp, 
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full overflow-hidden text-left transition-all duration-300 border shadow-lg group bg-dark2 border-blue/10 rounded-2xl hover:shadow-xl hover:shadow-blue/10 hover:border-blue/30"
    >
      {/* Title + Date */}
      <div className="flex items-center justify-between gap-4 p-5 pb-4 sm:p-6 sm:pb-4">
        <h3 className="text-lg font-bold tracking-tight text-white transition-colors sm:text-xl lg:text-2xl line-clamp-1 group-hover:text-blue">
          {title_disp}
        </h3>
        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-500 uppercase shrink-0">
          {formattedDate}
        </span>
      </div>

      {/* Image Wrapper - Highly controlled responsive heights to keep it a perfect rectangle */}
      <div className="w-full overflow-hidden border-y border-blue/10 bg-[#0B1221] h-[200px] sm:h-[240px] lg:h-[280px]">
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
        <p className="mb-5 text-sm leading-relaxed text-gray-400 sm:text-base sm:mb-6 line-clamp-3 sm:line-clamp-2">
          {desc_concise}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6 sm:gap-2.5">
          {tech_stack?.map((item, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[10px] sm:text-xs font-medium text-gray-300 transition-colors border rounded-md bg-blue/5 border-blue/20 group-hover:border-blue/40 group-hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links Footer */}
        <div className="flex flex-wrap items-center gap-4 pt-4 mt-auto border-t sm:gap-5 border-blue/5">
          {git_link && (
            <a
              href={git_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors sm:text-sm hover:text-blue"
            >
              <Github size={16} className="sm:w-5 sm:h-5" /> Code
            </a>
          )}
          {live_link && (
            <a
              href={live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors sm:text-sm hover:text-blue"
            >
              <ExternalLink size={16} className="sm:w-5 sm:h-5" /> Live
            </a>
          )}
          {demo_link && (
            <a
              href={demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors sm:text-sm hover:text-blue"
            >
              <Youtube size={16} className="sm:w-5 sm:h-5" /> Watch
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;