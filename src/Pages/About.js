// import React, { useRef, useLayoutEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { University, Code2, Gamepad2, ChevronRight, Disc2 } from "lucide-react";
// import HoverMatrixBackground from "../Components/HoverMatrixBG";

// const withIcon = (text) => (
//   <div className="flex items-start gap-2 mb-2">
//     <ChevronRight size={18} className="text-blue-400 mt-[4px] shrink-0" />
//     <span className="text-base leading-relaxed">{text}</span>
//   </div>
// );

// const steps = [
//   {
//     title: "Yo! fellas, I'm Tanmay & here's a lil intro about me –",
//     content: [
//       <br key="1" />,
//       withIcon("Birth Date: 24-06-2007"), <br key="2" />,
//       withIcon("From: Mehsana, Gujarat"), <br key="3" />,
//       withIcon("Diploma in Computer Engineering, just completed it!"), <br key="4" />,
//       withIcon("Into web dev, UI/UX stuff, and building cool projects"), <br key="5" />,
//       withIcon("If you come over you might find me gaming, listening to music, chillin, exploring stuff, or maybe just sleeping"), <br key="6" />,
//       withIcon("Still learning, building, figuring things out as I go"), <br key="7" />,
//       withIcon("Outside of the tech zone, I’m just average at everything.")
//     ]
//   },
//   {
//     title: (
//       <span className="inline-flex items-center gap-2">
//         <University size={28} />
//         Education
//       </span>
//     ),
//     content: [
//       <br key="1" />,
//       withIcon("I have completed nursery and primary school with A+ grade, "), <br key="2" />,
//       withIcon("Obv I have completed 10th; from JMC Highschool, Mehsana with umm idk maybe ~90 percentile in GSEB exam."), <br key="3" />,
//       withIcon(
//         <>
//           I have completed Diploma In Computer Engineering from{" "}
//           <a
//             href="http://www.bbit.ac.in/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="font-semibold text-blue-300 underline hover:text-blue-500"
//           >
//             BBIT
//           </a>{" "}
//           Vallabh Vidhyangar with 9.42 CGPA
//         </>
//       ), <br key="4" />,
//       withIcon(
//         <>
//         Currently pursuing BE/BTech. in CSE at{" "}
//           <a
//             href="https://www.nirmauni.ac.in/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="font-semibold text-blue-300 underline hover:text-blue-500"
//           >
//             Nirma University
//           </a>{" "}, Ahmedabad
//         </>
//       )
//     ]
//   },
//   {
//     title: (
//       <span className="inline-flex items-center gap-2">
//         <Code2 size={22} /> Tech Stack & Skills
//       </span>
//     ),
//     content: [
//       <br key="1" />,
//       withIcon("Languages: C, C++, Java, HTML, CSS, TailwindCSS, JavaScript, Python, PHP"), <br key="2" />,
//       withIcon("Databases: MySQL, Oracle, MongoDB, FireBase, SQLite"), <br key="3" />,
//       withIcon("Frameworks: NextJS, React Hooks, Angular, Node JS, Tailwind CSS, Bootstrap, Flask, Scikit-learn","Auth"), <br key="4" />,
//       withIcon("Version Control: Git & GitHub"), <br key="5" />,
//       withIcon("Tools: VS Code, Android Studio, Eclipse IDE, Eclipse EE, XAMPP, Arduino IDE, Unity Engine")
//     ]
//   },
//   {
//     title: (
//       <span className="inline-flex items-center gap-2">
//         <Disc2 size={22} /> Hobbies
//       </span>
//     ),
//     content: [
//       <br key="1" />,
//       withIcon("Gaming -scroll down"), <br key="2" />,
//       withIcon("Chess –to watch and play ,1000elo btw"), <br key="3" />,
//       withIcon("Badminton, Cricket"), <br key="4" />,
//       withIcon("Listening to music -let it happen"), <br key="5" />,
//       withIcon("Youtubing -fav: slayypoint"), <br key="6" />,
//       withIcon("Watching Movies -fav: GotG Vol-3"), <br key="7" />,
//       withIcon("Storing Memes -weird isn't it??")
//     ]
//   },
//   {
//     title: (
//       <span className="inline-flex items-center gap-2">
//         <Gamepad2 size={22} /> Few games that I've played
//       </span>
//     ),
//     content: [
//       <br key="1" />,
//       withIcon("from GTA VC to GTA V -we all grew up"), <br key="2" />,
//       withIcon("Tekken 3, IGI, Angry Birds, Pocket Tanks -the PC nostalgia"), <br key="3" />,
//       withIcon("SF2, Bad Piggies, BOC2, WCC-2, PvZ -the mobile nostalgia"), <br key="4" />,
//       withIcon("Clash Of Clans -taught me time management like nothing else"), <br key="5" />,
//       withIcon("Mini Militia -was awesome to play in private server"), <br key="6" />,
//       withIcon("Clash Royale -the combo of COC and CR was so tuff"), <br key="7" />,
//       withIcon("FreeFire -everyone makes mistakes, however it wasn't that bad back then"), <br key="8" />,
//       withIcon("SFA/SF4 -bursting out the frustation"), <br key="9" />,
//       withIcon("BGMI ~ PUBG"), <br key="10" />,
//       withIcon("Amoung Us -sus"), <br key="11" />,
//       withIcon("Minecraft -that two week phase")
//     ]
//   }
// ];

// function About() {
//   const containerRef = useRef(null);
//   const cardRefs = useRef([]);
//   const [pathD, setPathD] = useState("");

//   useLayoutEffect(() => {
//     const coords = cardRefs.current.map((ref) => {
//       if (!ref) return null;
//       const { top, height, left, width } = ref.getBoundingClientRect();
//       const centerY = top + height / 2 + window.scrollY;
//       const centerX = left + width / 2;
//       return { x: centerX, y: centerY };
//     });

//     const amplitude = 180;
//     const path = coords
//       .filter(Boolean)
//       .map((point, i) => {
//         if (i === 0) return `M${point.x} ${point.y}`;
//         const prev = coords[i - 1];
//         const isLeft = i % 2 === 0;
//         const cpX = isLeft ? point.x - amplitude : point.x + amplitude;
//         return `C${cpX} ${prev.y}, ${cpX} ${point.y}, ${point.x} ${point.y}`;
//       })
//       .join(" ");

//     setPathD(path);
//   }, []);

//   return (
//     <section
//       // REMOVED 'bg-dark' so the matrix background is visible
//       className="relative min-h-screen px-4 py-20 overflow-hidden text-white sm:px-8 md:px-16 lg:px-40"
//       ref={containerRef}
//     >
//       {/* ADDED: Hover Matrix Background Component */}
//       <HoverMatrixBackground />

//       <svg
//         className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none"
//         viewBox={`0 0 ${window.innerWidth} ${document.body.scrollHeight}`}
//         preserveAspectRatio="none"
//       >
//         <motion.path
//           id="connectedPath"
//           d={pathD}
//           stroke="#3b82f6"
//           strokeWidth="2"
//           fill="none"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: 1 }}
//           transition={{
//             duration: 18,
//             ease: "easeInOut"
//           }}
//         />
//         <circle r="6" fill="#3b82f6">
//           <animateMotion begin="14s" dur="10s" repeatCount="indefinite">
//             <mpath href="#connectedPath" />
//           </animateMotion>
//         </circle>
//       </svg>

//       <div className="relative z-10">
//         {steps.map((step, i) => {
//           const isLeft = i % 2 === 0;
//           return (
//             <motion.div
//               key={i}
//               ref={(el) => (cardRefs.current[i] = el)}
//               className={`relative mb-24 w-full flex ${i === 0 ? "justify-center" : isLeft ? "justify-start" : "justify-end"
//                 }`}
//               initial={{ opacity: 0, y: i === 0 ? -30 : 0, x: i === 0 ? 0 : isLeft ? -50 : 50 }}
//               whileInView={{ opacity: 1, x: 0, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="w-full p-6 border shadow bg-[#021526]/40 backdrop-blur-md sm:p-8 md:p-10 sm:w-11/12 md:w-4/5 lg:w-1/2 rounded-3xl border-blue/30 shadow-blue/20">
//                 <h2 className="flex items-center justify-center mb-4 text-2xl font-bold text-center text-blue">
//                   {step.title}
//                 </h2>
//                 <div className="text-base text-gray-300">
//                   {step.content.map((line, idx) => (
//                     <div key={idx}>{line}</div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default About;
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  University,
  Code2,
  Gamepad2,
  ChevronRight,
  Disc2,
  Repeat,
} from "lucide-react";
import HoverMatrixBackground from "../Components/HoverMatrixBG";

/* ---------- helpers (same look as the original page) ---------- */

const withIcon = (text) => (
  <div className="flex items-start gap-2 mb-2">
    <ChevronRight size={18} className="text-blue-400 mt-[4px] shrink-0" />
    <span className="text-base leading-relaxed">{text}</span>
  </div>
);

const Link = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-blue-300 underline hover:text-blue-500"
  >
    {children}
  </a>
);

// puts a <br /> between items, exactly like the original spacing
const list = (...items) =>
  items.flatMap((item, i) => [<br key={`br-${i}`} />, item]);

/* ---------- RECRUITER: refined & professional ---------- */

const recruiterSteps = [
  {
    title: "Hi, I'm Tanmay – a quick introduction",
    content: list(
      withIcon("From Mehsana, Gujarat"),
      withIcon("Computer Engineering student at Nirma University, Ahmedabad"),
      withIcon("Recently completed a Diploma in Computer Engineering with a 9.42 CGPA"),
      withIcon("Focused on web development, UI/UX and building practical projects"),
      withIcon("Actively learning full-stack development and applying it through hands-on work")
    ),
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <University size={28} />
        Education
      </span>
    ),
    content: list(
      withIcon(
        <>
          B.E./B.Tech. in Computer Science & Engineering,{" "}
          <Link href="https://www.nirmauni.ac.in/">Nirma University</Link>,
          Ahmedabad (ongoing)
        </>
      ),
      withIcon(
        <>
          Diploma in Computer Engineering,{" "}
          <Link href="http://www.bbit.ac.in/">BBIT</Link>, Vallabh
          Vidyanagar, 9.42 CGPA
        </>
      ),
      withIcon("Secondary School (SSC), JMC High School, Mehsana, GSEB, ~90 percentile")
    ),
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Code2 size={22} /> Tech Stack & Skills
      </span>
    ),
    content: list(
      withIcon("Languages: C, C++, Java, JavaScript, Python, PHP"),
      withIcon("Frontend: HTML, CSS, Tailwind CSS, React, Next.js, Angular, Bootstrap"),
      withIcon("Backend: Node.js, Flask"),
      withIcon("Databases: MySQL, Oracle, MongoDB, Firebase, SQLite"),
      withIcon("Machine Learning: Scikit-learn"),
      withIcon("Version Control: Git & GitHub"),
      withIcon("Tools: VS Code, Android Studio, Eclipse IDE, XAMPP, Arduino IDE, Unity Engine")
    ),
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Disc2 size={22} /> Beyond code
      </span>
    ),
    content: list(
      withIcon("Chess: I play and follow it regularly (around 1000 Elo)"),
      withIcon("Badminton and cricket"),
      withIcon("Music, usually on while I work"),
      withIcon("Films, with Guardians of the Galaxy Vol. 3 as a favourite")
    ),
  },
];

/* ---------- EVERYONE ELSE: the funky original ---------- */

const funkySteps = [
  {
    title: "Yo! fellas, I'm Tanmay & here's a lil intro about me –",
    content: list(
      withIcon("From: Mehsana, Gujarat"),
      withIcon("Diploma in Computer Engineering, just completed it!"),
      withIcon("Into web dev, UI/UX stuff, and building cool projects"),
      withIcon(
        "If you come over you might find me gaming, listening to music, chillin, exploring stuff, or maybe just sleeping"
      ),
      withIcon("Still learning, building, figuring things out as I go"),
      withIcon("Outside of the tech zone, I'm just average at everything.")
    ),
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <University size={28} />
        Education
      </span>
    ),
    content: list(
      withIcon("I have completed nursery and primary school with A+ grade, flex"),
      withIcon(
        "Obv I have completed 10th; from JMC Highschool, Mehsana with umm idk maybe ~90 percentile in GSEB exam."
      ),
      withIcon(
        <>
          I have completed Diploma In Computer Engineering from{" "}
          <Link href="http://www.bbit.ac.in/">BBIT</Link> Vallabh Vidyanagar
          with 9.42 CGPA
        </>
      ),
      withIcon(
        <>
          Currently pursuing BE/BTech. in CSE at{" "}
          <Link href="https://www.nirmauni.ac.in/">Nirma University</Link>,
          Ahmedabad
        </>
      )
    ),
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Code2 size={22} /> Tech Stack & Skills
      </span>
    ),
    content: list(
      withIcon("Languages: C, C++, Java, HTML, CSS, TailwindCSS, JavaScript, Python, PHP"),
      withIcon("Databases: MySQL, Oracle, MongoDB, FireBase, SQLite"),
      withIcon(
        "Frameworks: NextJS, React Hooks, Angular, Node JS, Bootstrap, Flask, Scikit-learn"
      ),
      withIcon("Version Control: Git & GitHub"),
      withIcon(
        "Tools: VS Code, Android Studio, Eclipse IDE, Eclipse EE, XAMPP, Arduino IDE, Unity Engine"
      )
    ),
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Disc2 size={22} /> Hobbies
      </span>
    ),
    content: list(
      withIcon("Gaming -scroll down"),
      withIcon("Chess –to watch and play, 1000elo btw"),
      withIcon("Badminton, Cricket"),
      withIcon("Listening to music -let it happen"),
      withIcon("Youtubing -fav: slayypoint"),
      withIcon("Watching Movies -fav: GotG Vol-3"),
      withIcon("Storing Memes -weird isn't it??")
    ),
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Gamepad2 size={22} /> Few games that I've played
      </span>
    ),
    content: list(
      withIcon("from GTA VC to GTA V -we all grew up"),
      withIcon("Tekken 3, IGI, Angry Birds, Pocket Tanks -the PC nostalgia"),
      withIcon("SF2, Bad Piggies, BOC2, WCC-2, PvZ -the mobile nostalgia"),
      withIcon("Clash Of Clans -taught me time management like nothing else"),
      withIcon("Mini Militia -was awesome to play in private server"),
      withIcon("Clash Royale -the combo of COC and CR was so tuff"),
      withIcon("FreeFire -everyone makes mistakes, however it wasn't that bad back then"),
      withIcon("SFA/SF4 -bursting out the frustration"),
      withIcon("BGMI ~ PUBG"),
      withIcon("Among Us -sus"),
      withIcon("Minecraft -that two week phase")
    ),
  },
];

/* ---------- the one-question gate ---------- */

const STORAGE_KEY = "about-is-recruiter";

function RoleGate({ onAnswer }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
    >
      <motion.div
        className="w-full max-w-lg p-8 border shadow-xl sm:p-10 rounded-3xl border-blue-400/30 shadow-blue-500/20 bg-[#021526]/90"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
      >
        <h2
          id="gate-title"
          className="mb-4 text-2xl font-bold text-center text-blue-300"
        >
          Quick question before you scroll
        </h2>

        <p className="mb-4 text-base leading-relaxed text-center text-gray-200">
          Are you a recruiter?
        </p>

        <div className="p-4 mb-6 text-sm leading-relaxed text-gray-300 border rounded-2xl border-blue-400/20 bg-blue-500/5">
          <p className="mb-2 font-semibold text-gray-100">
            Why am I asking?
          </p>
          <p>
            This page comes in two flavours. If you're hiring, you get the
            clean, to-the-point version: education, skills and the things that
            matter for the job. If you're anyone else, you get the unfiltered
            one with the games, the memes and the questionable jokes. One
            click and I'll show you the version that actually fits.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => onAnswer(true)}
            className="flex-1 px-5 py-3 font-semibold text-white transition bg-blue-600 rounded-2xl hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Yes, I'm a recruiter
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="flex-1 px-5 py-3 font-semibold text-blue-100 transition border rounded-2xl border-blue-400/40 hover:bg-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Nope, just looking around
          </button>
        </div>

        <p className="mt-4 text-xs text-center text-gray-500">
          You can switch versions any time from the top of the page.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ---------- page ---------- */

function About() {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const [isRecruiter, setIsRecruiter] = useState(null); // null = not answered yet
  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  // remember the answer for this browser tab
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved === "yes") setIsRecruiter(true);
      if (saved === "no") setIsRecruiter(false);
    } catch (e) {
      /* storage unavailable, just ask again */
    }
  }, []);

  const answer = (value) => {
    setIsRecruiter(value);
    try {
      sessionStorage.setItem(STORAGE_KEY, value ? "yes" : "no");
    } catch (e) {
      /* ignore */
    }
  };

  const reset = () => {
    setIsRecruiter(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
  };

  const answered = isRecruiter !== null;
  const steps = isRecruiter ? recruiterSteps : funkySteps;

  // Path is measured relative to the wrapper (offset* ignores the slide-in
  // transforms) and rebuilt on resize, so it stays aligned.
  useLayoutEffect(() => {
    if (!answered) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const build = () => {
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      setSize({ w, h });

      const pts = cardRefs.current
        .slice(0, steps.length)
        .filter(Boolean)
        .map((el) => ({
          x: el.offsetLeft + el.offsetWidth / 2,
          y: el.offsetTop + el.offsetHeight / 2,
        }));

      const amplitude = Math.min(180, w / 4);
      const d = pts
        .map((p, i) => {
          if (i === 0) return `M${p.x} ${p.y}`;
          const prev = pts[i - 1];
          const cpX = i % 2 === 0 ? p.x - amplitude : p.x + amplitude;
          return `C${cpX} ${prev.y}, ${cpX} ${p.y}, ${p.x} ${p.y}`;
        })
        .join(" ");
      setPathD(d);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [answered, isRecruiter, steps.length]);

  return (
    <section className="relative min-h-screen px-4 py-20 overflow-hidden text-white sm:px-8 md:px-16 lg:px-40">
      <HoverMatrixBackground />

      <AnimatePresence>{!answered && <RoleGate onAnswer={answer} />}</AnimatePresence>

      {answered && (
        <>
          <div className="relative z-20 flex justify-end mb-6">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm transition border rounded-full border-blue-400/30 bg-[#021526]/60 backdrop-blur-md hover:bg-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Repeat size={14} />
              {isRecruiter ? "Professional version" : "Unfiltered version"} · Switch
            </button>
          </div>

          <div ref={wrapRef} key={String(isRecruiter)} className="relative">
            {size.w > 0 && (
              <svg
                className="absolute top-0 left-0 z-0 pointer-events-none"
                width={size.w}
                height={size.h}
                viewBox={`0 0 ${size.w} ${size.h}`}
              >
                <motion.path
                  id="connectedPath"
                  d={pathD}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 18, ease: "easeInOut" }}
                />
                <circle r="6" fill="#3b82f6">
                  <animateMotion begin="14s" dur="10s" repeatCount="indefinite">
                    <mpath href="#connectedPath" />
                  </animateMotion>
                </circle>
              </svg>
            )}

            <div className="relative z-10">
              {steps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    className={`relative mb-24 w-full flex ${
                      i === 0 ? "justify-center" : isLeft ? "justify-start" : "justify-end"
                    }`}
                    initial={{
                      opacity: 0,
                      y: i === 0 ? -30 : 0,
                      x: i === 0 ? 0 : isLeft ? -50 : 50,
                    }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full p-6 border shadow bg-[#021526]/40 backdrop-blur-md sm:p-8 md:p-10 sm:w-11/12 md:w-4/5 lg:w-1/2 rounded-3xl border-blue/30 shadow-blue/20">
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
          </div>
        </>
      )}
    </section>
  );
}

export default About;