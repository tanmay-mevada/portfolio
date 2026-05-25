//import React, { useState } from "react";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
//import { AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

// function ProjectModal({ project, onClose }) {
//   if (!project) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//         onClick={(e) => e.stopPropagation()}
//         className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark2 border border-blue/20 rounded-xl shadow-2xl"
//       >
//         <button
//           onClick={onClose}
//           className="absolute z-10 p-2 text-gray-400 rounded-full top-4 right-4 hover:text-white bg-dark"
//         >
//           <X size={20} />
//         </button>

//         <div className="p-6 sm:p-8">
//           <div className="flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between">
//             <h2 className="mb-2 text-3xl font-bold text-blue sm:mb-0">{project.title}</h2>
//             <span className="text-sm text-gray-400">{project.date}</span>
//           </div>

//           <Swiper
//             modules={[Autoplay]}
//             spaceBetween={0}
//             slidesPerView={1}
//             autoplay={{ delay: 3000, disableOnInteraction: true }}
//             className="mb-6 rounded-lg"
//           >
//             {project.images.map((img, i) => (
//               <SwiperSlide key={i}>
//                 <img
//                   src={img}
//                   alt={`${project.title}-${i}`}
//                   className="w-full h-[300px] sm:h-[400px] object-contain bg-dark rounded-lg"
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <div className="space-y-4">
//             <div>
//               <h3 className="mb-2 text-lg font-semibold text-blue">Description</h3>
//               <p className="text-gray-300">{project.description}</p>
//             </div>

//             <div>
//               <h3 className="mb-2 text-lg font-semibold text-blue">Technologies</h3>
//               <div className="flex flex-wrap gap-2">
//                 {project.tech.map((item, i) => (
//                   <span
//                     key={i}
//                     className="px-3 py-1 text-sm text-white border rounded bg-blue/10 border-blue/30"
//                   >
//                     {item}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {project.features && project.features.length > 0 && (
//               <div>
//                 <h3 className="mb-2 text-lg font-semibold text-blue">Features</h3>
//                 <ul className="space-y-1 text-gray-300 list-disc list-inside">
//                   {project.features.map((feature, i) => (
//                     <li key={i}>{feature}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div className="flex flex-wrap gap-4 pt-4 border-t border-blue/20">
//               <div>
//                 <span className="text-sm text-gray-400">Category: </span>
//                 <span className="text-white">{project.category}</span>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-400">Status: </span>
//                 <span className="text-white capitalize">{project.status}</span>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-400">Type: </span>
//                 <span className="text-white capitalize">{project.projectType}</span>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-400">Version: </span>
//                 <span className="text-white">{project.version}</span>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4 pt-4">
//               {project.github && (
//                 <a
//                   href={project.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 text-white transition-colors border rounded-lg bg-blue/20 border-blue/40 hover:bg-blue/30"
//                 >
//                   <Github size={18} /> View on GitHub
//                 </a>
//               )}
//               {project.live && (
//                 <a
//                   href={project.live}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 text-white transition-colors border rounded-lg bg-blue/20 border-blue/40 hover:bg-blue/30"
//                 >
//                   <ExternalLink size={18} /> Live Demo
//                 </a>
//               )}
//               {project.demo && (
//                 <a
//                   href={project.demo}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 text-white transition-colors border rounded-lg bg-blue/20 border-blue/40 hover:bg-blue/30"
//                 >
//                   <Youtube size={18} /> Watch Demo
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

function ProjectCard({ title, description, tech, images, github, live, date, demo, ...rest }) {
  //const [showModal, setShowModal] = useState(false);
  //const project = { title, description, tech, images, github, live, date, demo, ...rest };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        //onClick={() => setShowModal(true)}
        className="overflow-hidden transition-all border cursor-pointer bg-dark2 border-blue/20 rounded-xl hover:glow"
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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-sm text-blue hover:underline"
              >
                <Youtube size={16} /> Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
{/* 
      <AnimatePresence>
        {showModal && (
          <ProjectModal
            project={project}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence> */}
    </>
  );
}

export default ProjectCard;