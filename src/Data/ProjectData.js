import proj1 from "../Assets/proj1.png";
import proj2x1 from "../Assets/proj2(1).png";
import proj2x2 from "../Assets/proj2(2).png";
// import proj3 from "../Assets/proj3.png"
import proj4 from "../Assets/proj4.png"
import proj5x1 from "../Assets/proj5(1).png"
import proj5x2 from "../Assets/proj5(2).png"
import proj5x3 from "../Assets/proj5(3).png"
import proj6x1 from "../Assets/proj6(1).png"
import proj6x2 from "../Assets/proj6(2).png"
import proj6x3 from "../Assets/proj6(3).png"
import proj7x1 from "../Assets/proj7(1).png"
import proj7x2 from "../Assets/proj7(2).png"
import proj7x3 from "../Assets/proj7(3).png"
import proj7x4 from "../Assets/proj7(4).png"
import proj8x1 from "../Assets/proj8(1).png"
import proj8x2 from "../Assets/proj8(2).png"
import proj8x3 from "../Assets/proj8(3).png"
import proj8x4 from "../Assets/proj8(4).png"
import proj8x5 from "../Assets/proj8(5).png"
import proj8x6 from "../Assets/proj8(6).png"
import proj8x7 from "../Assets/proj8(7).png"
import proj9x1 from "../Assets/proj9(1).png"
import proj9x2 from "../Assets/proj9(2).png"
import proj9x3 from "../Assets/proj9(3).png"
import proj9x4 from "../Assets/proj9(4).png"
// import proj10x1 from "../Assets/proj10(1).png"
import proj10x2 from "../Assets/proj10(2).png"
import proj10x3 from "../Assets/proj10(3).png"
import proj11x1 from "../Assets/proj11(1).png"
// import proj11x2 from "../Assets/proj11(2).png"
import proj11x3 from "../Assets/proj11(3).png"
import proj12x1 from "../Assets/proj12(1).png"
import proj12x2 from "../Assets/proj12(2).png"
import proj12x3 from "../Assets/proj12(3).png"
import proj13x1 from "../Assets/proj13(1).png"
import proj13x2 from "../Assets/proj13(2).png"
import proj13x3 from "../Assets/proj13(3).png"
import proj14x1 from "../Assets/proj14(1).png"
import proj14x2 from "../Assets/proj14(2).png"
import proj14x3 from "../Assets/proj14(3).png";
import proj14x4 from "../Assets/proj14(4).png";
import proj14x5 from "../Assets/proj14(5).png";
import proj14x6 from "../Assets/proj14(6).png";
import proj14x7 from "../Assets/proj14(7).png";

export const projects = [
  {
    //proj1
    title: "First Code",
    date: "September, 2022",
    description: "A simple Hello World program in OG TurboC++ MSDOS Editor.",
    tech: ["C"],
    images: [proj1],
    github: "",
    live: "",
  },
  {
    //proj2
    title: "Marksheet Generator",
    date: "May, 2023",
    description: "A simple Marksheet Generator that reads data and generates a text based marksheet.",
    tech: ["C++"],
    images: [proj2x1, proj2x2],
    github: "https://github.com/tanmay-mevada/Marksheet-Generator-CPP",
    live: "",
  },
  // {
  //   //proj3
  //   title: "Word Reader",
  //   date: "October, 2023",
  //   description: "Just a 'shame on me', lazy ahh project.",
  //   tech: ["Python"],
  //   images: [proj3],
  //   github: "",
  //   live: "",
  // },
  {
    //proj4
    title: "BMI Calculator",
    date: "November, 2023",
    description: "A project that manages user health data to calculate & categorize BMI with various features.",
    tech: ["C","LinkedList","Dynamic Malloc"],
    images: [proj4],
    github: "https://github.com/tanmay-mevada/Marksheet-BMI-Calculator",
    live: "",
  },
  {
    //proj5
    title: "Responsive Hostel Website",
    date: "December, 2023",
    description: "A responsive website having contact form, carousel, slidebar & many more",
    tech: ["Bootstrap","HTML","JavaScript"],
    images: [proj5x1, proj5x2,proj5x3],
    github: "https://github.com/tanmay-mevada/Responsive-Static-Hostel-Website",
    live: "",
  },
  {
    //proj6
    title: "Cycle Store Website",
    date: "December, 2023",
    description: "A simple responsive website having authentication, cards, slidebar etc.",
    tech: ["Bootstrap","HTML","JavaScript","CSS"],
    images: [proj6x1, proj6x2,proj6x3],
    github: "https://github.com/tanmay-mevada/Responsive-Static-Cycle-Website",
    live: "",
  },
  {
    //proj7
    title: "Electricity Management System - Basic",
    date: "May, 2024",
    description: "About Simple EMS that manages the data and generate electricity bills using Java and DB through CMD",
    tech: ["Java","MySQL","iTextPDF"],
    images: [proj7x1, proj7x2,proj7x3,proj7x4],
    github: "https://github.com/tanmay-mevada/Electricity-Management-System-Basic",
    live: "",
  },
  {
    //proj8
    title: "Hostel Management System Reworked",
    date: "January, 2024",
    description: "A refurbished hostel management website with CRUD operation and authentication. [Based on Astro-Code HMS]",
    tech: ["PHP","MySQL"],
    images: [proj8x1,proj8x2,proj8x3,proj8x4,proj8x5,proj8x6,proj8x7],
    github: "https://github.com/tanmay-mevada/Hostel-Management-Website",
    live: "",
  },
  {
    //proj9
    title: "Electricity Management System - Enhanced",
    date: "May, 2024",
    description: "An upgraded version of EMS-Basic with better UI and Webapp integration.",
    tech: ["Java","Maven","Servlets","JSP","XML","MySQL","iTextPDF"],
    images: [proj9x1,proj9x2,proj9x3,proj9x4],
    github: "https://github.com/tanmay-mevada/Electricity-Management-System-Enhanced",
    live: "",
  },
  {
    //proj10
    title: "Trip Cost Estimator",
    date: "June, 2024",
    description: "A machine learning project that gives estimation of trip cost breaking down into food, stay and travel expenses and generates pi-chart for given places from Ahmedabad",
    tech: ["Python","Pandas","NumPY","Sckit-Learn","MatplotLib","Flask","CSV Data"],
    images: [proj10x2,proj10x3],
    github: "https://github.com/tanmay-mevada/Basic-Trip-Cost-Estimator",
    live: "",
  },
  {
    //proj11
    title: "Login Application 1",
    date: "September, 2024",
    description: "An android login/signup application that uses local database.",
    tech: ["Android Studio","Java","XML","SQLite"],
    images: [proj11x1,proj11x3],
    github: "https://github.com/tanmay-mevada/Login-Application-1",
    live: "",
  },
  {
    //proj12
    title: "Login Application 2",
    date: "September, 2024",
    description: "An android login/signup application that uses firbase database.",
    tech: ["Android Studio","Java","XML","FireBase"],
    images: [proj12x1,proj12x2,proj12x3],
    github: "https://github.com/tanmay-mevada/Login-Application-2",
    live: "",
  },
  {
    //proj13
    title: "Portfolio Website",
    date: "June, 2025",
    description: "The one you're surfing right now.",
    tech: ["React JS","TailwindCSS","Framer Motion","Swiper JS"],
    images: [proj13x1,proj13x2,proj13x3],
    github: "https://github.com/tanmay-mevada/portfolio",
    live: "https://tanmaymevada.vercel.app",
  },
  {
    //proj14
    title: "DStrA - A Learning Platform",
    date: "July, 2025",
    description: "A learning platform that helps diploma students learning DSA with interactive content.",
    tech: ["NextJS","TypeScript","MongoDB","GoogleAuth","Judge0 API","Nodemailer","TailwindCSS","React Hooks"],
    images: [proj14x1,proj14x2,proj14x3,proj14x4,proj14x5,proj14x6,proj14x7],
    github: "https://github.com/tanmay-mevada/DStrA",
    live: "https://d-str-a.vercel.app/",
  },
];
