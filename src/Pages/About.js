import React, { useRef } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import Navbar from "../Components/Navbar";
import { University,Code2,Gamepad2 } from "lucide-react";

const steps = [
  {
    title: "Yo! fellas, I'm Tanmay & here's a lil intro about me –",
    content: [
      "Birth Date: 24-06-2007",
      "From: Mehsana, Gujarat",
      "Diploma in Computer Engineering, just completed it!",
      "Into web dev, UI/UX stuff, and building cool projects",
      "If you come over you might find me gaming, listening to music, chillin, exploring stuff, or maybe just sleeping",
      "Still learning, building, figuring things out as I go",
      "Outside of the tech zone, I’m just average at everything."
    ]
  },
  {
    title: (<span className="inline-flex items-center gap-2">
      <University size={28} />
      Education
      </span>),
    content:[
      "-> I have completed nursery and primary school with A+ grade, ",
      "Obv I have completed 10th; from JMC Highschool, Mehsana with xx percentile in gujarat board exam",
      <><br></br></>,
      "-> I have completed Diploma In Computer Engineering from ",
      <>
      <a
        href="http://www.bbit.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 font-semibold underline hover:text-blue-500"
      >BBIT</a> Vallabh Vidhyangar with 9.57 CGPA<br></br></>,
       "-> Currently pursuing BE/BTech. in CSE at  ",
    ]
  },
{
  title: (
    <span className="inline-flex items-center gap-2">
      <Code2 size={22} /> Tech Stack & Skills
    </span>
  ),
  content: [
    "-> Languages: C, C++, Java, HTML, CSS, JavaScript, Python, PHP",<br/>,
    "-> Databases: MySQL, Oracle, MongoDB, FireBase, SQLite",<br />,
    "-> Frameworks: React, Angular, Node JS, Tailwind CSS, Bootstrap, Flask, Scikit-learn", <br />,
    "-> Version Control: Git & GitHub", <br />,
    "-> Tools: VS Code, Android Studio, Eclipse IDE, Eclipse EE, XAMPP, Arduino IDE, Unity Engine", <br />
  ]
},
{
  title: (
    <span className="inline-flex items-center gap-2">
      <Gamepad2 size={22} /> Hobbiess
    </span>
  ),
  content: [
    "-> Gaming -scroll down", <br />,
    "-> Chess –to watch and play ,1000elo btw", <br />,
    "-> Badminton, Cricket", <br />,
    "-> Listening to music -Spotify", <br />,
    "-> Youtubing -fav: slayypoint", <br />,
    "-> Wathcing Movies -fav genre: Marvel, fav-movie: GotG Vol-3", <br/>,
    "-> Storing Memes -weird isn't it?",<br/>
  ]
},
  {
  title: (
    <span className="inline-flex items-center gap-2">
      <Gamepad2 size={22} /> Games I've played
    </span>
  ),
  content: [
    "-> from GTA VC to GTA V -we all grew up", <br />,
    "-> Tekken 3, IGI, Angry Birds, Pocket Tanks -the PC nostalgia", <br />, 
    "-> SF2, Bad Piggies, BOC2, WCC-2, PvZ -the mobile nostalgia",<br />,
    "-> Clash Of Clans -taught me time management like nothing else", <br />,
    "-> Mini Militia -was awesome to play in private server", <br />,
    "-> Clash Royale -the combo of COC and CR was so tuff", <br />,
    "-> FreeFire -everyone makes mistakes, however it wasn't that bad back then", <br />,
    "-> SFA/SF4 -bursting out the frustation", <br />,
    "-> BGMI ~ PUBG", <br />,
    "-> Amoung Us -sus", <br />,
    "-> Minecraft -that two week phase", <br />
  ]
}
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

function About() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const dotY = useMotionValue(0);
  const springDotY = useSpring(dotY, { damping: 20, stiffness: 100 });
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <section
      className="min-h-screen bg-dark text-white relative px-4 sm:px-16 lg:px-40 py-20 overflow-hidden"
      ref={containerRef}
    >
      <Navbar />


      <div className="relative z-10">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;

          // Special styled intro card
          if (i === 0) {
            return (
              <motion.div
                key={i}
                className="relative mb-32 w-full flex justify-center"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                ref={(el) => (cardRefs.current[i] = el)}
              >
                <div className="backdrop-blur-xl p-10 w-full sm:w-2/3 md:w-1/2 rounded-3xl border border-blue-500/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-blue-600/40 transition-all duration-300 text-center">
                  <div className="text-[#e0e0e0] text-base sm:text-lg leading-relaxed space-y-4 text-left sm:text-center">
                    {step.title && (
                      <motion.h2
                        className="text-2xl font-bold text-blue mb-6 rounded-xl"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {step.title}
                      </motion.h2>
                    )}

                    {step.content.map((line, idx) => (
                      <motion.p
                        key={idx}
                        custom={idx}
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          }

          // Standard alternating timeline cards
          return (
            <motion.div
              key={i}
              className={`relative mb-32 w-full flex ${isLeft ? "justify-start" : "justify-end"}`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="bg-dark2 p-6 w-full sm:w-1/2 rounded-xl border border-blue/20 shadow-md hover:shadow-blue/40">
                <h2 className="text-2xl font-semibold text-blue mb-2">{step.title}</h2>
                <p className="text-gray-300 text-lg">{step.content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default About;
