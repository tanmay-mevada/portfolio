import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  University,
  Code2,
  Gamepad2,
  ChevronRight,
  Disc2,
  ArrowRightLeft,
} from "lucide-react";
import HoverMatrixBackground from "../Components/HoverMatrixBG";

/* ═══════════════════════════════════════════════════════════
   SESSION PERSISTENCE
   ═══════════════════════════════════════════════════════════ */

const STORAGE_KEY = "about-is-recruiter";

function readSaved() {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    if (v === "yes") return true;
    if (v === "no") return false;
  } catch {}
  return null;
}

function writeSaved(val) {
  try {
    sessionStorage.setItem(STORAGE_KEY, val ? "yes" : "no");
  } catch {}
}

/* ═══════════════════════════════════════════════════════════
   RECRUITER GATE — dialog overlay
   ═══════════════════════════════════════════════════════════ */

function RecruiterGate({ onAnswer }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md p-8 border shadow-xl rounded-3xl border-blue-400/30 shadow-blue-500/20 bg-[#021526]/90 backdrop-blur-xl"
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="mb-2 text-xl font-bold text-center text-blue sm:text-2xl">
          Are you a recruiter?
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-center text-gray-400">
          Just asking so I can show you the right version of this page.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => onAnswer(true)}
            className="flex-1 px-5 py-3 text-sm font-semibold text-white transition rounded-2xl bg-blue hover:bg-blue/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Yes, I'm a recruiter
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="flex-1 px-5 py-3 text-sm font-semibold transition border text-blue-200 rounded-2xl border-blue-400/30 hover:bg-blue-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Nope, just looking around
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROFESSIONAL / RECRUITER VIEW
   ═══════════════════════════════════════════════════════════ */

const ExtLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 transition-colors hover:text-blue-300 hover:decoration-blue/60"
  >
    {children}
  </a>
);

function RecruiterView() {
  const techStack = [
    {
      category: "Languages",
      items: ["C", "C++", "Java", "JavaScript", "Python", "PHP"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Angular", "Tailwind CSS", "Bootstrap", "HTML/CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Flask"],
    },
    {
      category: "Databases",
      items: ["MySQL", "Oracle", "MongoDB", "Firebase", "SQLite"],
    },
    {
      category: "ML",
      items: ["Scikit-learn"],
    },
    {
      category: "Tools",
      items: ["Git", "VS Code", "Android Studio", "Eclipse IDE", "XAMPP", "Arduino IDE", "Unity"],
    },
  ];

  return (
    <section className="relative min-h-screen px-4 py-20 overflow-hidden text-white sm:px-8 md:px-16 lg:px-40">
      <HoverMatrixBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="p-8 sm:p-10 rounded-3xl border border-blue/30 bg-[#021526]/40 backdrop-blur-md shadow shadow-blue/20">
            <h1 className="text-2xl font-bold sm:text-3xl mb-1">
              Hi, I'm <span className="text-blue">Tanmay</span>
            </h1>
            <p className="text-xs text-gray-500 mb-4">From Mehsana, Gujarat</p>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              Computer Science undergrad at Nirma University with a completed
              Diploma in Computer Engineering (9.42 CGPA). I build full-stack web
              applications and care deeply about clean, functional UI. Currently
              focused on React, Node.js, and expanding into new stacks through
              hands-on project work.
            </p>
          </div>
        </motion.div>

        {/* ── education ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14"
        >
          <h2 className="flex items-center gap-2 mb-5 text-lg font-bold text-blue sm:text-xl">
            <University size={20} className="text-blue" />
            Education
          </h2>
          <div className="space-y-3">
            {[
              {
                degree: "B.E. / B.Tech in CSE",
                where: <><ExtLink href="https://www.nirmauni.ac.in/">Nirma University</ExtLink>, Ahmedabad</>,
                right: "Ongoing",
              },
              {
                degree: "Diploma in Computer Engineering",
                where: <><ExtLink href="http://www.bbit.ac.in/">BBIT</ExtLink>, Vallabh Vidyanagar</>,
                right: "9.42 CGPA",
              },
              {
                degree: "Secondary School (SSC)",
                where: "JMC High School, Mehsana",
                right: "~90 %ile GSEB",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-3xl border border-blue/30 bg-[#021526]/40 backdrop-blur-md shadow shadow-blue/20 hover:border-blue/50 transition-colors duration-300"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white sm:text-base">{edu.degree}</p>
                  <p className="mt-0.5 text-sm text-gray-400">{edu.where}</p>
                </div>
                <span className="shrink-0 mt-0.5 text-xs font-medium text-gray-500">{edu.right}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── tech stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-14"
        >
          <h2 className="flex items-center gap-2 mb-5 text-lg font-bold text-blue sm:text-xl">
            <Code2 size={20} className="text-blue" />
            Tech Stack and Skills
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: gi * 0.06 }}
                className="p-4 sm:p-5 rounded-3xl border border-blue/30 bg-[#021526]/40 backdrop-blur-md shadow shadow-blue/20 hover:border-blue/50 transition-colors duration-300"
              >
                <p className="mb-3 text-[11px] font-bold tracking-widest uppercase text-blue/60">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-medium rounded-md border border-blue/20 bg-blue/5 text-gray-300 hover:border-blue/40 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── beyond code ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="flex items-center gap-2 mb-5 text-lg font-bold text-blue sm:text-xl">
            <Disc2 size={20} className="text-blue" />
            Beyond code
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Chess", note: "Play and follow regularly, around 1000 Elo" },
              { label: "Sports", note: "Badminton and cricket" },
              { label: "Music", note: "Usually on while I work" },
              { label: "Films", note: "Guardians of the Galaxy Vol. 3 is a favourite" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="p-4 rounded-3xl border border-blue/30 bg-[#021526]/40 backdrop-blur-md shadow shadow-blue/20 hover:border-blue/50 transition-colors duration-300"
              >
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CASUAL / UNFILTERED VIEW — original zigzag timeline
   ═══════════════════════════════════════════════════════════ */

const withIcon = (text) => (
  <div className="flex items-start gap-2 mb-2">
    <ChevronRight size={18} className="text-blue-400 mt-[4px] shrink-0" />
    <span className="text-base leading-relaxed">{text}</span>
  </div>
);

const casualSteps = [
  {
    title: "Yo! fellas, I'm Tanmay & here's a lil intro about me –",
    content: [
      <br key="1" />,
      withIcon("Birth Date: 24-06-2007"), <br key="2" />,
      withIcon("From: Mehsana, Gujarat"), <br key="3" />,
      withIcon("Diploma in Computer Engineering, just completed it!"), <br key="4" />,
      withIcon("Into web dev, UI/UX stuff, and building cool projects"), <br key="5" />,
      withIcon("If you come over you might find me gaming, listening to music, chillin, exploring stuff, or maybe just sleeping"), <br key="6" />,
      withIcon("Still learning, building, figuring things out as I go"), <br key="7" />,
      withIcon("Outside of the tech zone, I'm just average at everything.")
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
      <br key="1" />,
      withIcon("I have completed nursery and primary school with A+ grade, "), <br key="2" />,
      withIcon("Obv I have completed 10th; from JMC Highschool, Mehsana with umm idk maybe ~90 percentile in GSEB exam."), <br key="3" />,
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
      ), <br key="4" />,
      withIcon(
        <>
        Currently pursuing BE/BTech. in CSE at{" "}
          <a
            href="https://www.nirmauni.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-300 underline hover:text-blue-500"
          >
            Nirma University
          </a>{" "}, Ahmedabad
        </>
      )
    ]
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Code2 size={22} /> Tech Stack & Skills
      </span>
    ),
    content: [
      <br key="1" />,
      withIcon("Languages: C, C++, Java, HTML, CSS, TailwindCSS, JavaScript, Python, PHP"), <br key="2" />,
      withIcon("Databases: MySQL, Oracle, MongoDB, FireBase, SQLite"), <br key="3" />,
      withIcon("Frameworks: NextJS, React Hooks, Angular, Node JS, Tailwind CSS, Bootstrap, Flask, Scikit-learn"), <br key="4" />,
      withIcon("Version Control: Git & GitHub"), <br key="5" />,
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
      <br key="1" />,
      withIcon("Gaming -scroll down"), <br key="2" />,
      withIcon("Chess –to watch and play ,1000elo btw"), <br key="3" />,
      withIcon("Badminton, Cricket"), <br key="4" />,
      withIcon("Listening to music -let it happen"), <br key="5" />,
      withIcon("Youtubing -fav: slayypoint"), <br key="6" />,
      withIcon("Watching Movies -fav: GotG Vol-3"), <br key="7" />,
      withIcon("Storing Memes -weird isn't it??")
    ]
  },
  {
    title: (
      <span className="inline-flex items-center gap-2">
        <Gamepad2 size={22} /> Few games that I've played
      </span>
    ),
    content: [
      <br key="1" />,
      withIcon("from GTA VC to GTA V -we all grew up"), <br key="2" />,
      withIcon("Tekken 3, IGI, Angry Birds, Pocket Tanks -the PC nostalgia"), <br key="3" />,
      withIcon("SF2, Bad Piggies, BOC2, WCC-2, PvZ -the mobile nostalgia"), <br key="4" />,
      withIcon("Clash Of Clans -taught me time management like nothing else"), <br key="5" />,
      withIcon("Mini Militia -was awesome to play in private server"), <br key="6" />,
      withIcon("Clash Royale -the combo of COC and CR was so tuff"), <br key="7" />,
      withIcon("FreeFire -everyone makes mistakes, however it wasn't that bad back then"), <br key="8" />,
      withIcon("SFA/SF4 -bursting out the frustation"), <br key="9" />,
      withIcon("BGMI ~ PUBG"), <br key="10" />,
      withIcon("Amoung Us -sus"), <br key="11" />,
      withIcon("Minecraft -that two week phase")
    ]
  }
];

function CasualView() {
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
      className="relative min-h-screen px-4 py-20 overflow-hidden text-white sm:px-8 md:px-16 lg:px-40"
      ref={containerRef}
    >
      <HoverMatrixBackground />

      <svg
        className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none"
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
        {casualSteps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`relative mb-24 w-full flex ${
                i === 0 ? "justify-center" : isLeft ? "justify-start" : "justify-end"
              }`}
              initial={{ opacity: 0, y: i === 0 ? -30 : 0, x: i === 0 ? 0 : isLeft ? -50 : 50 }}
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
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN ABOUT PAGE
   ═══════════════════════════════════════════════════════════ */

function About() {
  const [isRecruiter, setIsRecruiter] = useState(readSaved);

  const answered = isRecruiter !== null;

  const answer = (val) => {
    setIsRecruiter(val);
    writeSaved(val);
  };

  return (
    <>
      {/* ── recruiter gate dialog ── */}
      <AnimatePresence>
        {!answered && <RecruiterGate onAnswer={answer} />}
      </AnimatePresence>

      {/* ── page content ── */}
      {answered && (
        <>
          {/* ── floating switch button ── */}
          <div className="fixed top-5 right-5 z-40">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              onClick={() => {
                const next = !isRecruiter;
                setIsRecruiter(next);
                writeSaved(next);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full border border-blue/25 bg-[#021526]/80 backdrop-blur-xl text-gray-300 shadow-lg transition hover:bg-blue/10 hover:text-white hover:border-blue/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <ArrowRightLeft size={14} />
              {isRecruiter ? "Switch to unfiltered" : "Switch to professional"}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {isRecruiter ? (
              <motion.div
                key="recruiter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <RecruiterView />
              </motion.div>
            ) : (
              <motion.div
                key="casual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CasualView />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default About;
