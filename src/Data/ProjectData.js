import proj1 from "../Assets/proj1.png";
import proj2x1 from "../Assets/proj2(1).png";
import proj2x2 from "../Assets/proj2(2).png";
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
import proj10x2 from "../Assets/proj10(2).png"
import proj10x3 from "../Assets/proj10(3).png"
import proj11x1 from "../Assets/proj11(1).png"
import proj11x3 from "../Assets/proj11(3).png"
import proj12x1 from "../Assets/proj12(1).png"
import proj12x2 from "../Assets/proj12(2).png"
import proj12x3 from "../Assets/proj12(3).png"
import proj13x1 from "../Assets/proj13(1).png"
import proj13x2 from "../Assets/proj13(2).png"
import proj13x3 from "../Assets/proj13(3).png"
import proj14x1 from "../Assets/proj14(1).png"
import proj14x2 from "../Assets/proj14(2).png"
import proj14x3 from "../Assets/proj14(3).png"
import proj14x4 from "../Assets/proj14(4).png"
import proj14x5 from "../Assets/proj14(5).png"
import proj14x6 from "../Assets/proj14(6).png"
import proj14x7 from "../Assets/proj14(7).png"
import proj15x1 from "../Assets/proj15(1).png"
import proj15x2 from "../Assets/proj15(2).png"
import proj15x3 from "../Assets/proj15(3).png"
import proj16x1 from "../Assets/proj16(1).png"
import proj16x2 from "../Assets/proj16(2).png"
import proj16x3 from "../Assets/proj16(3).png"
import proj16x4 from "../Assets/proj16(4).png"

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
    status: "completed",
    projectType: "solo",
    features: ["Console output", "Basic syntax"],
    category: "Learning",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["Data input", "Text-based output", "Grade calculation"],
    category: "CLI Tool",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
  },
  {
    //proj4
    title: "BMI Calculator",
    date: "November, 2023",
    description: "A project that manages user health data to calculate & categorize BMI with various features.",
    tech: ["C","LinkedList","Dynamic Malloc"],
    images: [proj4],
    github: "https://github.com/tanmay-mevada/Marksheet-BMI-Calculator",
    live: "",
    status: "completed",
    projectType: "solo",
    features: ["BMI calculation", "User data management", "Health categorization", "Linked list implementation"],
    category: "CLI Tool",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["Responsive design", "Contact form", "Image carousel", "Sidebar navigation"],
    category: "Web Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["User authentication", "Product cards", "Responsive layout", "Sidebar menu"],
    category: "Web Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["Database management", "Bill generation", "PDF export", "Customer data handling", "Command-line interface"],
    category: "Desktop Application",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["CRUD operations", "User authentication", "Room management", "Student records", "Admin dashboard"],
    category: "Web Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v2.0",
    isStarred: false,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["Web interface", "Enhanced UI", "Bill generation", "Database integration", "PDF export", "User management"],
    category: "Web Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v2.0",
    isStarred: true,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["ML prediction", "Cost breakdown", "Data visualization", "Flask web interface", "CSV data processing"],
    category: "Machine Learning",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: true,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["User authentication", "Local database", "Sign up/Login", "SQLite integration"],
    category: "Mobile Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
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
    status: "completed",
    projectType: "solo",
    features: ["Firebase authentication", "Cloud database", "Real-time sync", "Sign up/Login"],
    category: "Mobile Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
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
    status: "maintained",
    projectType: "solo",
    features: ["Responsive design", "Smooth animations", "Project showcase", "Contact form", "Dark theme"],
    category: "Web Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: true,
    isFeatured: true,
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
    status: "maintained",
    projectType: "solo",
    features: ["Interactive DSA problems", "Real-time code execution", "Google OAuth", "Progress tracking", "Email notifications", "Admin dashboard"],
    category: "Web Development",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.2.0",
    isStarred: true,
    isFeatured: true,
  },
  {
    //proj15
    title: "OTP Generator and Verification (Logisim)",
    date: "September, 2025",
    description: "A hardware-only OTP generator and verifier in Logisim using LFSR-based pseudo-random logic.",
    tech: ["Digital Electronics","Logisim","Flip Flops","Logic Gates"],
    images: [proj15x1,proj15x2,proj15x3],
    github: "https://github.com/tanmay-mevada/OTP-DE",
    live: "",
    status: "completed",
    projectType: "solo",
    features: ["LFSR implementation", "OTP generation", "Verification logic", "Hardware simulation"],
    category: "Hardware Design",
    documentation: "",
    demo: "",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: false,
    isFeatured: false,
  },
  {
    //proj16
    title: "TautologyAI - Legal Document Analysis",
    date: "November, 2025",
    description: "An AI-powered platform that simplifies legal documents with instant summaries, risk detection, and plain-language explanations.",
    tech: ["NextJS","FastAPI","GCP","Vertex AI","Supabase","OCR","TailwindCSS"],
    images: [proj16x1,proj16x2,proj16x3,proj16x4],
    github: "https://github.com/tanmay-mevada/TautologyAI",
    live: "https://legal-ai-f8b0b.web.app/",
    status: "maintained",
    projectType: "team",
    features: ["AI document analysis", "Risk detection", "Plain-language summaries", "OCR integration", "PDF processing", "User authentication"],
    category: "AI/ML Application",
    documentation: "",
    demo: "https://www.youtube.com/watch?v=8r8_jnx0UBs",
    blog: "",
    ppt: "",
    version: "v1.0",
    isStarred: true,
    isFeatured: true,
  },
];