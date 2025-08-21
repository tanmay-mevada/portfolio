import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import { University, Code2, Gamepad2, ChevronRight, Disc2 } from "lucide-react";

const withIcon = (text) => (
  <div className="flex items-start gap-2 mb-2">
    <ChevronRight size={18} className="text-blue-400 mt-[4px] shrink-0" />
    <span className="text-base leading-relaxed">{text}</span>
  </div>
);

const steps = [
  {
    title: "Yo! fellas, I'm Tanmay & here's a lil intro about me –",
    content: [
      <br />,
      withIcon("Birth Date: 24-06-2007"), <br />,
      withIcon("From: Mehsana, Gujarat"), <br />,
      withIcon("Diploma in Computer Engineering, just completed it!"), <br />,
      withIcon("Into web dev, UI/UX stuff, and building cool projects"), <br />,
      withIcon("If you come over you might find me gaming, listening to music, chillin, exploring stuff, or maybe just sleeping"), <br />,
      withIcon("Still learning, building, figuring things out as I go"), <br />,
      withIcon("Outside of the tech zone, I’m just average at everything.")
    ]
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <University size={28} />
        Education
      </span>
    ),
    content: [
      <br />,
      withIcon("I have completed nursery and primary school with A+ grade, "), <br />,
      withIcon("Obv I have completed 10th; from JMC Highschool, Mehsana with xx percentile in gujarat board exam"), <br />,
      withIcon(
        <>
          I have completed Diploma In Computer Engineering from{" "}
          <a
            href="http://www.bbit.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-300 underline hover:text-blue-500"
          >
            BBIT
          </a>{" "}
          Vallabh Vidhyangar with 9.42 CGPA
        </>
      ), <br />,
      withIcon("Currently pursuing BE/BTech. in CSE at Nirma University, Ahmedabad"),
    ]
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Code2 size={22} /> Tech Stack & Skills
      </span>
    ),
    content: [
      <br />,
      withIcon("Languages: C, C++, Java, HTML, CSS, TailwindCSS, JavaScript, Python, PHP"), <br />,
      withIcon("Databases: MySQL, Oracle, MongoDB, FireBase, SQLite"), <br />,
      withIcon("Frameworks: NextJS, React Hooks, Angular, Node JS, Tailwind CSS, Bootstrap, Flask, Scikit-learn","Auth"), <br />,
      withIcon("Version Control: Git & GitHub"), <br />,
      withIcon("Tools: VS Code, Android Studio, Eclipse IDE, Eclipse EE, XAMPP, Arduino IDE, Unity Engine")

    ]
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Disc2 size={22} /> Hobbies
      </span>
    ),
    content: [
      <br />,
      withIcon("Gaming -scroll down"), <br />,
      withIcon("Chess –to watch and play ,1000elo btw"), <br />,
      withIcon("Badminton, Cricket"), <br />,
      withIcon("Listening to music -let it happen"), <br />,
      withIcon("Youtubing -fav: slayypoint"), <br />,
      withIcon("Watching Movies -fav: GotG Vol-3"), <br />,
      withIcon("Storing Memes -weird isn't it?")
    ]
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Gamepad2 size={22} /> Few games that I've played
      </span>
    ),
    content: [
      <br />,
      withIcon("from GTA VC to GTA V -we all grew up"), <br />,
      withIcon("Tekken 3, IGI, Angry Birds, Pocket Tanks -the PC nostalgia"), <br />,
      withIcon("SF2, Bad Piggies, BOC2, WCC-2, PvZ -the mobile nostalgia"), <br />,
      withIcon("Clash Of Clans -taught me time management like nothing else"), <br />,
      withIcon("Mini Militia -was awesome to play in private server"), <br />,
      withIcon("Clash Royale -the combo of COC and CR was so tuff"), <br />,
      withIcon("FreeFire -everyone makes mistakes, however it wasn't that bad back then"), <br />,
      withIcon("SFA/SF4 -bursting out the frustation"), <br />,
      withIcon("BGMI ~ PUBG"), <br />,
      withIcon("Amoung Us -sus"), <br />,
      withIcon("Minecraft -that two week phase")
    ]
  }
];

function About() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [pathD, setPathD] = useState("");

  useLayoutEffect(() => {
    const coords = cardRefs.current.map((ref) => {
      if (!ref) return null;
      const { top, height, left, width } = ref.getBoundingClientRect();
      const centerY = top + height / 2 + window.scrollY;
      const centerX = left + width / 2;
      return { x: centerX, y: centerY };
    });

    const amplitude = 180;
    const path = coords
      .filter(Boolean)
      .map((point, i) => {
        if (i === 0) return `M${point.x} ${point.y}`;
        const prev = coords[i - 1];
        const isLeft = i % 2 === 0;
        const cpX = isLeft ? point.x - amplitude : point.x + amplitude;
        return `C${cpX} ${prev.y}, ${cpX} ${point.y}, ${point.x} ${point.y}`;
      })
      .join(" ");

    setPathD(path);
  }, []);

  return (
    <section
      className="relative min-h-screen px-4 py-20 overflow-hidden text-white bg-dark sm:px-8 md:px-16 lg:px-40"
      ref={containerRef}
    >
      <Navbar />

      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${window.innerWidth} ${document.body.scrollHeight}`}
        preserveAspectRatio="none"
      >
        <motion.path
          id="connectedPath"
          d={pathD}
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 18,
            ease: "easeInOut"
          }}
        />
        <circle r="6" fill="#3b82f6">
          <animateMotion begin="14s" dur="10s" repeatCount="indefinite">
            <mpath href="#connectedPath" />
          </animateMotion>
        </circle>
      </svg>

      <div className="relative z-10">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`relative mb-24 w-full flex ${i === 0 ? "justify-center" : isLeft ? "justify-start" : "justify-end"
                }`}
              initial={{ opacity: 0, y: i === 0 ? -30 : 0, x: i === 0 ? 0 : isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full p-6 border shadow bg-dark2/20 backdrop-blur-md sm:p-8 md:p-10 sm:w-11/12 md:w-4/5 lg:w-1/2 rounded-3xl border-blue/30 shadow-blue/20">
                <h2 className="flex items-center justify-center mb-4 text-2xl font-bold text-center text-blue">
                  {step.title}
                </h2>
                <div className="text-base text-gray-300">
                  {step.content.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default About;
