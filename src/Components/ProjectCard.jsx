import React from "react";
import { Github, ExternalLink } from "lucide-react";

function ProjectCard({
  title_disp,
  slug,
  date,
  category,
  desc_concise,
  tech_stack,
  images,
  git_link,
  live_link,
}) {
  // Grab the first image from the array, or use a placeholder if empty
  const thumbnail = images && images.length > 0 ? images[0] : "/placeholder-image.jpg";

  // Format date to match the old "September 2022" style
  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
    : 'Ongoing';

  return (
    <div className="flex flex-col overflow-hidden text-left transition-all duration-300 border shadow-lg bg-dark2 border-blue/20 rounded-2xl hover:-translate-y-2 hover:shadow-blue/10">
      
      {/* 1. Header Area (Restored from old design) */}
      <div className="flex items-center justify-between px-6 py-4 sm:px-8">
        <h3 className="text-xl font-bold text-blue sm:text-2xl">
          {title_disp}
        </h3>
        <span className="text-sm font-medium text-gray-400">
          {formattedDate}
        </span>
      </div>

      {/* 2. Image Area */}
      <div className="relative h-48 overflow-hidden border-y border-blue/10 sm:h-56 bg-dark">
        <img
          src={thumbnail}
          alt={title_disp || "Project Thumbnail"}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        {/* Keeping the category badge for extra context */}
        {category && (
          <div className="absolute px-3 py-1 text-xs font-semibold rounded-full top-4 right-4 bg-dark/80 text-blue backdrop-blur-sm">
            {category}
          </div>
        )}
      </div>

      {/* 3. Content Area */}
      <div className="flex flex-col flex-1 p-6 sm:p-8">
        
        {/* Centered Description */}
        <p className="flex-1 mb-6 text-sm leading-relaxed text-center text-gray-400 sm:text-base">
          {desc_concise}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tech_stack?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium transition-colors border rounded-md text-blue bg-blue/5 border-blue/20 hover:bg-blue/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        {(git_link || live_link) && (
          <div className="flex items-center justify-center gap-6 pt-4 mt-auto border-t border-blue/10">
            {git_link && (
              <a
                href={git_link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                <Github size={18} />
                Code
              </a>
            )}
            {live_link && (
              <a
                href={live_link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors text-blue hover:text-blue/80"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;