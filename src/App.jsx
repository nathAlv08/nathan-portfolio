import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, User, Briefcase, GraduationCap, Award, Smartphone, Globe, Github, 
  Mail, Phone, MapPin, Music, Play, X, Download, Terminal, Cpu, Eye, 
  Pause, SkipForward, Shield, MessageSquare, Bot, 
  Minimize2, AlertTriangle, Lock, Unlock, Brain, Layers, ExternalLink,
  Video, FileJson, Database, Instagram, Linkedin, Menu, Star, Zap
} from 'lucide-react';

// ==========================================
// 1. DATA SOURCES
// ==========================================

const profileData = {
  name: "Nathan Alvino Fam",
  role: "AI, Machine Learning & Cybersec Enthusiast",
  tagline: "Building logic during the day, exploring AI frontiers at night.",
  location: "Kota Tangerang, Indonesia",
  email: "nathanalvinofam@gmail.com",
  phone: "087886555808",
  summary: "Information Technology student with a strong focus on Artificial Intelligence and Cybersecurity. Currently conducting advanced research on Cross-Platform Behavioral Biometric Authentication using Federated Learning. Active Google Student Ambassador with practical experience in mobile development (Flutter/Android) and system integration. Seeking opportunities to apply skills in AI/ML and software engineering.",
  social: {
    github: "https://github.com/nathAlv08",
    linkedin: "https://www.linkedin.com/in/nathan-alvino-fam-7495b4312",
    instagram: "https://www.instagram.com/nathanalvino03/"
  },
  stats: {
    gpa: "3.95",
    semester: "6th",
    projects: "16+"
  }
};

const educationData = [
  {
    school: "Universitas Utpadaka Swastika",
    degree: "Bachelor Degree - Information Technology",
    year: "09/2023 - Present",
    desc: "Current GPA 3.95 (6th Semester). Night Class schedule. Active in AI & Cybersec research."
  },
  {
    school: "SMA Strada St. Thomas Aquino",
    degree: "High School - Science & Math",
    year: "07/2018 - 07/2021",
    desc: "Graduated with 86 accumulative score."
  }
];

const experienceData = [
  {
    company: "Google Indonesia",
    role: "Google Student Ambassador",
    year: "09/2025 - 02/2026",
    points: [
      "Achieved 'Rising Star' status (Top 200 of 800+ ambassadors).",
      "Spearheaded educational campaigns on Gemini AI, increasing AI literacy among students.",
      "Organized on-campus tech events to build a strong developer community."
    ]
  },
  {
    company: "PT Perdana Megajaya",
    role: "Administration Staff",
    year: "05/2023 - Present",
    points: [
      "Orchestrated end-to-end inventory and logistics management with 100% stock accuracy.",
      "Collaborated cross-functionally with Marketing to align production output with delivery.",
      "Conducted quality control and data reconciliation to minimize waste."
    ]
  },
  {
    company: "BINUS University English Club",
    role: "Liaison Officer (National & Asian English Competition)",
    year: "10/2021 - 03/2022",
    points: [
      "Acted as primary contact (PIC) for participants.",
      "Hosted and facilitated debate competition rounds professionally.",
      "Managed schedules and participant flow effectively."
    ]
  }
];

const certificatesData = [
  // --- Data Lama ---
  { title: "Machine Learning Specialization", issuer: "Coursera", date: "08/2025", type: "Professional", id: "COURSERA-ML-SPEC", image: "/cert-ml-spec.png", credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/986G5Y1Z5RDN" },
  { title: "Junior Mobile Programmer", issuer: "BNSP", date: "10/2024", type: "Professional", id: "BNSP-62019", image: "/cert-bnsp.png", credentialUrl: "https://drive.google.com/file/d/1kYhhUNzx_wkwIyMDl8KgXdMUtjvl-Z_l/view?usp=sharing" },
  { title: "Fundamental Deep Learning", issuer: "Dicoding", date: "01/2026", type: "Course", id: "4EXG304MDZRL", image: "/cert-deep-learning.png", credentialUrl: "https://www.dicoding.com/certificates/4EXG304MDZRL" },
  { title: "IBM Granite - Code Generation", issuer: "IBM", date: "09/2025", type: "Course", id: "IBM-GRANITE-CODE", image: "/cert-ibm-granite.png", credentialUrl: "https://www.credly.com/badges/9a7ba734-cf84-4731-ae6e-71417874720c" },
  { title: "IBM Granite - Data Classification", issuer: "IBM", date: "09/2025", type: "Course", id: "IBM-GRANITE-DATA", image: "/cert-ibm-data.png", credentialUrl: "https://www.credly.com/badges/ac902822-c605-45ac-81d2-78dd34838d95" },
  { title: "Akselerasi Karier dgn Gemini", issuer: "Dicoding", date: "10/2025", type: "Course", id: "72ZDKVDOLPYW", image: "/cert-gemini.png", credentialUrl: "https://www.dicoding.com/certificates/72ZDKVDOLPYW" },
  { title: "Fundamental Pemrosesan Data", issuer: "Dicoding", date: "10/2025", type: "Course", id: "JMZVVE8VRZN9", image: "/cert-data-process.png", credentialUrl: "https://www.dicoding.com/certificates/JMZVVE8VRZN9" },
  { title: "Data Science dgn Microsoft Fabric", issuer: "Dicoding", date: "10/2025", type: "Course", id: "1RXYQEMOQZVM", image: "/cert-ms-fabric.png", credentialUrl: "https://www.dicoding.com/certificates/1RXYQEMOQZVM" },
  { title: "Gen AI dgn Microsoft Azure", issuer: "Dicoding", date: "10/2025", type: "Course", id: "DICODING-AZURE-AI", image: "/cert-azure-ai.png", credentialUrl: "https://www.dicoding.com/certificates/KEXL279G0ZG2" },
  { title: "Cybersecurity Fundamentals", issuer: "IBM", date: "10/2024", type: "Course", id: "IBM-CYBER-FUND", image: "/cert-ibm-cyber.png", credentialUrl: "https://www.credly.com/badges/365279e5-47ae-4111-8a6d-309d903d4b3b" },
  { title: "Getting Started with Cybersecurity", issuer: "IBM", date: "10/2024", type: "Course", id: "IBM-CYBER-START", image: "/cert-ibm-start.png", credentialUrl: "https://www.credly.com/badges/e8fab99e-01fb-4e1a-93d9-f3bbeff0d841" },
  { title: "VSGA Mobile Programmer", issuer: "Kominfo RI", date: "08/2024", type: "Bootcamp", id: "VSGA-2024", image: "/cert-vsga.png", credentialUrl: "https://drive.google.com/file/d/17uF3mLjCXSr5kYLgFEc6XLXjKL1gACLT/view?usp=sharing" },
  { title: "Scientific Computing (Python)", issuer: "FreeCodeCamp", date: "11/2023", type: "Course", id: "FCC-PY", image: "/cert-python.png", credentialUrl: "https://freecodecamp.org/certification/nathanalvino/scientific-computing-with-python-v7" },
  { title: "ML untuk Pemula", issuer: "Dicoding", date: "11/2024", type: "Course", id: "QLZ9VLW37X5D", image: "/cert-ml-pemula.png", credentialUrl: "https://www.dicoding.com/certificates/QLZ963YRMZ5D" },
  { title: "Belajar Dasar AI", issuer: "Dicoding", date: "11/2024", type: "Course", id: "4EXG71K3EPRL", image: "/cert-dasar-ai.png", credentialUrl: "https://www.dicoding.com/certificates/4EXG71K3EPRL" },
  { title: "Visualisasi Data", issuer: "Dicoding", date: "11/2024", type: "Course", id: "07Z64J0JRPQR", image: "/cert-vis-data.png", credentialUrl: "https://www.dicoding.com/certificates/07Z64J0JRPQR" },
  { title: "Memulai Python", issuer: "Dicoding", date: "11/2024", type: "Course", id: "EYX4JQYLJZDL", image: "/cert-start-python.png", credentialUrl: "https://www.dicoding.com/certificates/GRX5J3W0YX0M" },
  { title: "Financial Literacy", issuer: "Dicoding", date: "08/2025", type: "Course", id: "2VX351QQJPYQ", image: "/cert-fin-lit.png", credentialUrl: "https://www.dicoding.com/certificates/2VX351QQJPYQ" },

  // --- Data Baru ---
  { title: "Networking Devices and Initial Configuration", issuer: "Cisco", date: "2026", type: "Course", id: "560c0ff0", image: "/cert-networking-devices.png", credentialUrl: "https://www.credly.com/badges/560c0ff0-a1e9-49a1-8e91-f81706d0f71c/public_url" },
  { title: "Networking Basics", issuer: "Cisco", date: "2026", type: "Course", id: "4bcaadbc", image: "/cert-networking-basics.png", credentialUrl: "https://www.credly.com/badges/4bcaadbc-01be-4ffe-9a48-a6bbfccca60e/public_url" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco", date: "2026", type: "Course", id: "2e4b0419", image: "/cert-intro-cyber.png", credentialUrl: "https://www.credly.com/badges/2e4b0419-a304-46d3-8b62-f3747efd55d8" },
  { title: "Machine Learning Terapan", issuer: "Dicoding", date: "2026", type: "Course", id: "72ZDJ0L1VZYW", image: "/cert-ml-terapan.png", credentialUrl: "https://www.dicoding.com/certificates/72ZDJ0L1VZYW" },
  { title: "Membangun Sistem Machine Learning", issuer: "Dicoding", date: "2026", type: "Course", id: "2VX304MW3XYQ", image: "/cert-sistem-ml.png", credentialUrl: "https://dicoding.com/certificates/2VX304MW3XYQ" },
  { title: "Belajar Fundamental Generative AI", issuer: "Dicoding", date: "2026", type: "Course", id: "MEPJO9VEWZ3V", image: "/cert-gen-ai.png", credentialUrl: "https://www.dicoding.com/certificates/MEPJO9VEWZ3V" },
  { title: "Membangun Proyek Deep Learning Tingkat Mahir", issuer: "Dicoding", date: "2026", type: "Course", id: "GRX5WQ6LYZ0M", image: "/cert-dl-mahir.png", credentialUrl: "https://dicoding.com/certificates/GRX5WQ6LYZ0M" },
  { title: "Google Gemini Certified Educator", issuer: "Google", date: "2026", type: "Professional", id: "GEMINI-EDUCATOR", image: "/cert-gemini-educator.png", credentialUrl: "https://drive.google.com/file/d/1DYRC0ZY0-EbzrQIJt2WWB446nOfDJ8cj/view?usp=sharing" },
  { title: "Google Student Ambassador Graduation Certificate", issuer: "Google", date: "2026", type: "Professional", id: "GSA-GRADUATION", image: "/cert-gsa.png", credentialUrl: "https://drive.google.com/file/d/179UbXxhmRH4uH780C3ANj7cZWljR3EH2/view?usp=sharing" },
  { title: "IDCamp 2025 Level Menengah", issuer: "Indosat Ooredoo Hutchison", date: "2025", type: "Course", id: "IDCAMP-2025-MENENGAH", image: "/cert-idcamp-2025.png", credentialUrl: "https://drive.google.com/file/d/1qjB6ZoAFXaL-X_cPO_S4OZdL2yD7u6CQ/view?usp=sharing" }
];
const skillsData = [
  { name: "Flutter / Dart", level: 85, icon: "💙" },
  { name: "Python (AI/ML)", level: 90, icon: "🐍" },
  { name: "Machine Learning", level: 80, icon: "🤖" },
  { name: "Android Studio", level: 85, icon: "📱" },
  { name: "Cybersecurity", level: 75, icon: "🛡️" },
  { name: "Data Science", level: 80, icon: "📊" },
];

// --- PORTFOLIO DATA (FULL 16 PROJECTS WITH REAL PLACEHOLDER IMAGES) ---
const portfolioData = [
  {
    id: 1,
    title: "Jamuku Web MVC",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?w=600&q=80", 
    desc: "Aplikasi Mockup UMKM Jamuku yang digunakan konsumen untuk melakukan pemesanan, pembayaran, sekaligus melihat komposisi bahan jamu yang disediakan.",
    tech: ["PHP Native", "MVC Pattern", "MySQL", "Bootstrap 5"],
    github: "https://github.com/nathAlv08/jamukuWebMVC",
    type: "web"
  },
  {
    id: 2,
    title: "UTPAS Social",
    category: "Web App (Group)",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", 
    desc: "Aplikasi bagi warga kampus UTPAS baik dosen, mahasiswa untuk saling terhubung satu sama lain seperti media sosial dengan fitur pendukung akademik seperti daftar dan reminder tugas sampai pencarian grup.",
    tech: ["PHP", "Social Network", "Academic"],
    github: "https://github.com/KelompokMVCAdamPlorenNathanYesa/utpas-social",
    youtube: "https://youtu.be/LiQuZSUwXYI?si=tWscPBA74oYvaHTN",
    type: "web"
  },
  {
    id: 3,
    title: "Manajemen Keuangan",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    desc: "Aplikasi Manajemen Keuangan sederhana yang dapat digunakan untuk memetakan dan mendata pemasukan dan pengeluaran pribadi secara sederhana dan mudah.",
    tech: ["Android Studio", "Java", "SQLite"],
    github: "https://github.com/nathAlv08/app_uts_keuangan",
    type: "mobile"
  },
  {
    id: 4,
    title: "Automated Data ETL",
    category: "Data Engineering",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    desc: "Sistem ETL (Extract, Transform, Load) otomatis berbasis Python. Mengambil data mentah dari web (scraping), membersihkannya, dan menyimpannya ke penyimpanan lokal, Cloud (G-Drive), serta SQL Database.",
    tech: ["Python", "ETL", "SQL", "Web Scraping"],
    github: "https://github.com/nathAlv08/web_scraping_project1",
    type: "code"
  },
  {
    id: 5,
    title: "CICIDS2017 Intrusion Detection",
    category: "AI / Cybersec",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    desc: "End-to-end machine learning pipeline untuk mendeteksi intrusi jaringan menggunakan dataset CICIDS2017. Mencakup eksplorasi data, pelatihan model (Random Forest & XGBoost), SHAP explainability, dan integrasi IBM Granite GenAI.",
    tech: ["Python", "XGBoost", "SHAP", "IBM Granite", "Jupyter"],
    github: "https://github.com/nathAlv08/cyberids-capstone",
    type: "notebook"
  },
  {
    id: 6,
    title: "App Mobile ListView",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    desc: "Aplikasi mobile yang menerapkan list view secara sederhana untuk penyelesaian tugas Pelatihan VSGA Kominfo 2024.",
    tech: ["Android", "Java", "ListView"],
    github: "https://github.com/nathAlv08/AppMobileListViewSimple",
    type: "mobile"
  },
  {
    id: 7,
    title: "App Mobile Validasi Login",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1481487484168-9b930d5b7d9d?w=600&q=80",
    desc: "Aplikasi Mobile yang menerapakan fitur validasi login sebagai penyelesaian tugas Pelatihan VSGA Kominfo 2024.",
    tech: ["Android", "Java", "Auth Logic"],
    github: "https://github.com/nathAlv08/AplikasiValidasiLogin",
    type: "mobile"
  },
  {
    id: 8,
    title: "Simple Calculator",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1587145820266-a2651c463853?w=600&q=80",
    desc: "Kalkulator Basic Sederhana sebagai tugas penerapan fitur operasional dalam Pelatihan VSGA Kominfo 2024.",
    tech: ["Android", "Java", "Logic"],
    github: "https://github.com/nathAlv08/Simple-Mobile-Java-Calculator-Android-Studio",
    type: "mobile"
  },
  {
    id: 9,
    title: "App CRUD Data Siswa",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    desc: "Aplikasi penerapan CRUD (Create, Read, Update, Delete) pada aplikasi mobile sederhana dalam Pelatihan VSGA Kominfo 2024.",
    tech: ["Android", "CRUD", "SQLite"],
    github: "https://github.com/nathAlv08/Aplikasi-Sederhana-Crud-Data-Siswa",
    type: "mobile"
  },
  {
    id: 10,
    title: "Data Pemilih KPU (MockUp)",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1540910419868-4749459ca6c8?w=600&q=80",
    desc: "Aplikasi pengumpulan data pemilih dengan fitur ambil foto dan buka map (GPS) untuk alamat. Data ditampilkan dalam list view.",
    tech: ["Android", "Camera API", "Maps API"],
    github: "https://github.com/nathAlv08/AplDataPemilihKPU",
    type: "mobile"
  },
  {
    id: 11,
    title: "Mobile Monitoring Tugas",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    desc: "Aplikasi monitoring tugas lengkap dengan lampiran dokumen/foto, sub-tugas, calendar view, dan prioritas tugas.",
    tech: ["Android", "Task Management", "Calendar"],
    github: "https://github.com/nathAlv08/monitoring_app_public",
    youtube: "https://youtu.be/yStAABX-Gy8?si=h0WgSTb-ibFmxKv-",
    apkUrl: "https://drive.google.com/file/d/1CYRmGWNcL8KsOrRb-TL9wm8jHLFpMBEj/view?usp=sharing",
    type: "mobile"
  },
  {
    id: 12,
    title: "Geo Tag App",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&q=80",
    desc: "Aplikasi absensi berbasis foto dan lokasi GPS yang disimpan ke database. Bisa diview oleh user dan admin.",
    tech: ["Android", "Geolocation", "Database"],
    github: "https://github.com/nathAlv08/geopermission-Pub",
    video: "https://drive.google.com/file/d/1EmATsmCh9moOUzrlixLS6r3SgvYc4UIx/view?usp=sharing",
    apkUrl: "https://drive.google.com/file/d/1FptHZ-Nqqv54VRwSTk62EWUznVX4QviO/view?usp=sharing",
    type: "mobile"
  },
  {
    id: 13,
    title: "Student Task Hub",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de8db2b?w=600&q=80",
    desc: "Aplikasi Task Monitoring dengan UI dan fitur yang lebih basic terbatas pada CRUD data tugas meliputi document attached dan prioritas.",
    tech: ["Android", "CRUD"],
    github: "https://github.com/nathAlv08/logregapp",
    type: "mobile"
  },
  {
    id: 14,
    title: "Shopee Review Sentiment",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    desc: "Model Machine Learning untuk mengklasifikasikan sentimen review Shopee (positif, netral, negatif).",
    tech: ["Python", "NLP", "Sentiment Analysis"],
    github: "https://github.com/nathAlv08/SentimentAnalysisShopeeReviewDicoding",
    type: "notebook"
  },
  {
    id: 15,
    title: "Lung X-Ray Analysis V1",
    category: "Deep Learning",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80",
    desc: "Model klasifikasi X-Ray Paru-paru (Normal, Covid, Pneumonia) menggunakan standard feature extraction dari Pre-trained Model.",
    tech: ["Python", "TensorFlow/Keras", "Transfer Learning"],
    github: "https://github.com/nathAlv08/LungXRayAnalysisDeeplearningVer.1",
    type: "notebook"
  },
  {
    id: 16,
    title: "Lung X-Ray Analysis V2",
    category: "Deep Learning",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    desc: "Versi upgrade dengan Custom Convolutional Layer untuk spatial feature refinement. Menggunakan SGD with Momentum untuk generalisasi lebih baik.",
    tech: ["Python", "Custom CNN", "SGD Momentum"],
    github: "https://github.com/nathAlv08/LungXRayAnalysisDeeplearningVer.2",
    type: "notebook"
  },
  {
    id: 17,
    title: "Vault Hub (ManGaHuaHwa-Anime Hub)",
    category: "Cross-Platform App",
    image: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=600&q=80",
    desc: "Aplikasi personal media vault yang mengonsolidasi data bacaan/tontonan, melakukan query ke MyAnimeList REST API, dan menyinkronkan progres secara real-time antar perangkat.",
    tech: ["Flutter", "REST API", "Cloud Sync"],
    github: "https://github.com/nathAlv08/manGaHuaHwa-Anime-hub",
    type: "mobile"
  },
  {
    id: 18,
    title: "Manga & Anime Recommendation System API",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1555949963-aa9fe0c9ce7b?w=600&q=80",
    desc: "Mesin rekomendasi mandiri yang menggunakan FAISS vector indexing untuk memetakan preferensi konten pengguna ke dalam ruang vektor dan memberikan rekomendasi personal via REST API.",
    tech: ["Python", "FAISS", "Machine Learning", "REST API", "Hugging Face"],
    github: "https://github.com/nathAlv08/manga-recommendation-api", // Sesuaikan jika ada link repo spesifik
    type: "notebook"
  },
  {
    id: 19,
    title: "Redteam OS (Corporate SOC Simulator)",
    category: "Cybersecurity / AI",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    desc: "Simulasi pelatihan keamanan siber imersif yang menggunakan Google Gemini API sebagai 'game master' untuk menciptakan konsekuensi ancaman real-time berdasarkan taktik pertahanan pengguna.",
    tech: ["React", "Google Gemini API", "Cybersecurity", "Interactive Simulation"],
    liveUrl: "https://redteam-os.run.app",
    type: "web"
  }
];

const aiKnowledge = {
  intro: [
    "Hello! I am NAF-PROTOCOL v2.0.",
    "I know everything about Nathan's new achievements.",
    "Ask me about his Google Ambassador role or AI Research."
  ],
  options: [
    { id: 'summarize', text: "Who is Nathan?" },
    { id: 'ambassador', text: "Google Ambassador?" },
    { id: 'research', text: "AI Research Topic?" },
    { id: 'contact', text: "Contact Info" }
  ],
  answers: {
    summarize: "Nathan is a rising IT talent (GPA 3.94) specializing in AI & Cybersec. He researches Federated Learning and holds multiple certifications from IBM, Google, and BNSP.",
    ambassador: "As a Google Student Ambassador (Rising Star), Nathan leads the campus tech community, teaching Gemini AI and bridging the gap between Google ecosystem and students.",
    research: "He is conducting advanced research on 'Cross-Platform Behavioral Biometric Authentication using Federated Learning'. Sounds complex? It means making apps safer using AI that learns how you tap your screen, without stealing your data!",
    contact: "Email: nathanalvinofam@gmail.com | Phone: 087886555808. He is open for AI/ML and Software Engineering roles."
  }
};

// ==========================================
// 2. HOOKS
// ==========================================

const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayText(prev => prev + text.charAt(i)); i++; } else { clearInterval(timer); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayText;
};

const DecryptText = ({ text, reveal }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
  useEffect(() => {
    if (reveal) {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(""));
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 2;
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayText(Array(text.length).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
    }
  }, [reveal, text]);
  return <span className="font-mono">{displayText}</span>;
};

// ==========================================
// 3. COMPONENTS
// ==========================================

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-10 relative">
    <div className="absolute -left-4 -top-4 w-12 h-12 bg-cyan-500/10 rounded-full blur-xl"></div>
    <div className="flex items-center gap-3 mb-2 relative z-10">
      <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 border border-slate-700 shadow-lg shadow-cyan-500/10"><Icon size={24} /></div>
      <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight font-mono break-words"><span className="text-cyan-500 mr-2">./</span>{title}</h2>
    </div>
    {subtitle && <p className="mt-2 text-slate-400 ml-12">{subtitle}</p>}
  </div>
);

const TerminalOverlay = ({ onClose, openSection }) => {
  const [history, setHistory] = useState([
    "NAF-OS [Version 3.1.2]",
    "System Ready.",
    "Type 'help' for commands.",
    ""
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmdRaw = input.trim();
      const cmd = cmdRaw.toLowerCase();
      const newHist = [...history, `root@naf-dev:~$ ${cmdRaw}`];
      let res = "";

      if (cmd === 'help') res = "Commands: about, skills, projects, clear, exit";
      else if (cmd === 'about') { res = "Redirecting to profile..."; openSection('about'); }
      else if (cmd === 'skills') { res = "Flutter, Python, AI, Android."; openSection('about'); }
      else if (cmd === 'projects') { res = "Loading 16 repositories..."; openSection('portfolio'); }
      else if (cmd === 'clear') { setHistory([]); setInput(''); return; }
      else if (cmd === 'exit') { onClose(); return; }
      else if (cmd.startsWith('view ')) {
        res = "Please use GUI (click cards) to view projects.";
      }
      else res = `Command '${cmd}' not found.`;

      if (res) newHist.push(res, "");
      setHistory(newHist);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden font-mono text-sm">
        <div className="bg-slate-800 p-2 flex justify-between items-center border-b border-slate-700">
           <div className="flex items-center gap-2 text-white"><Terminal size={14}/><span>NAF_TERMINAL.exe</span></div>
           <button onClick={onClose} className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600"/>
        </div>
        <div className="h-64 p-4 overflow-y-auto text-green-400" onClick={() => inputRef.current?.focus()}>
           {history.map((l, i) => <div key={i}>{l}</div>)}
           <div className="flex gap-2"><span>root@naf-dev:~$</span><input ref={inputRef} type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent outline-none flex-1 text-white" autoFocus/></div>
        </div>
      </div>
    </div>
  );
};

const GlitchText = ({ text, className }) => (
  <div className={`relative group inline-block ${className}`}>
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition duration-75 select-none">{text}</span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-purple-400 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition duration-75 select-none">{text}</span>
  </div>
);

const AiChatWidget = ({ onOpen }) => (
  <button onClick={onOpen} className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center transition transform hover:scale-110">
    <MessageSquare size={24} className="text-white"/>
  </button>
);

const AiChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([{ type: 'bot', text: aiKnowledge.intro[0] }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  
  useEffect(() => { if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

  const handleOptionClick = (optionId) => {
    const optionText = aiKnowledge.options.find(opt => opt.id === optionId).text;
    addMessage('user', optionText);
    respond(optionId);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addMessage('user', inputValue);
    const lowerInput = inputValue.toLowerCase();
    let responseId = null;

    if (lowerInput.includes('who') || lowerInput.includes('nathan') || lowerInput.includes('profile')) responseId = 'summarize';
    else if (lowerInput.includes('google') || lowerInput.includes('ambassador')) responseId = 'ambassador';
    else if (lowerInput.includes('research') || lowerInput.includes('ai') || lowerInput.includes('biometric')) responseId = 'research';
    else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone')) responseId = 'contact';
    
    if (responseId) {
      respond(responseId);
    } else {
       setIsTyping(true);
       setTimeout(() => {
         setMessages(prev => [...prev, { type: 'bot', text: "I'm specialized in Nathan's professional profile. Try asking about his 'research', 'google ambassador' role, or 'contact' info." }]);
         setIsTyping(false);
       }, 1000);
    }
    setInputValue("");
  };

  const addMessage = (type, text) => {
     setMessages(prev => [...prev, { type, text }]);
  };

  const respond = (id) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: aiKnowledge.answers[id] }]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl w-80 md:w-96 h-96 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-gradient-to-r from-cyan-900/50 to-slate-900 p-3 border-b border-cyan-500/30 flex justify-between items-center">
        <div className="flex items-center gap-2"><Bot size={18} className="text-cyan-400" /><span className="text-sm font-bold text-white">NAF-PROTOCOL v2.0</span></div>
        <button onClick={onClose} className="text-slate-400 hover:text-white"><Minimize2 size={16} /></button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.type === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-800 text-cyan-100 border border-slate-700 rounded-bl-none'}`}>{msg.text}</div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start"><div className="bg-slate-800 p-3 rounded-lg rounded-bl-none border border-slate-700 flex gap-1"><span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></span><span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></span></div></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-slate-950 border-t border-slate-800">
         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 mb-2">
            {aiKnowledge.options.map((opt) => (
              <button key={opt.id} onClick={() => handleOptionClick(opt.id)} disabled={isTyping} className="whitespace-nowrap px-3 py-2 bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs rounded hover:bg-cyan-500/20 hover:text-cyan-300 transition disabled:opacity-50">{opt.text}</button>
            ))}
         </div>
         <form onSubmit={handleInputSubmit} className="flex gap-2">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask something..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition" disabled={isTyping}/>
            <button type="submit" disabled={isTyping || !inputValue.trim()} className="p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"><div className="rotate-0"><ExternalLink size={16} className="rotate-0" /></div></button>
         </form>
      </div>
    </div>
  );
};

const MusicPlayerWidget = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); } else { audio.play().then(() => setPlaying(true)).catch(err => console.error(err)); }
  };
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:flex bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-2xl shadow-2xl items-center gap-4 animate-in slide-in-from-bottom-10 duration-700 hover:border-purple-500/50 transition">
      <audio ref={audioRef} loop><source src="/background-music.mp3" type="audio/mpeg" /></audio>
      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center ${playing ? 'animate-spin-slow' : ''}`}><Music size={18} className="text-white" /></div>
      <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-mono">LOFI_RADIO_V1</span><span className="text-xs font-bold text-white w-24 truncate">Night Coding Session</span></div>
      <button onClick={togglePlay} className="p-1 hover:bg-slate-700 rounded-full transition text-cyan-400">{playing ? <Pause size={16} /> : <Play size={16} />}</button>
      {playing && <div className="flex items-end gap-[2px] h-4">{[1,2,3].map(i => (<div key={i} className="w-1 bg-purple-400 animate-music-bar" style={{animationDelay: `${i * 0.1}s`}}></div>))}</div>}
    </div>
  );
};

const CertificateModal = ({ item, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    <div className="relative bg-[#0a0a0c] border border-slate-700 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <h3 className="font-bold text-white flex items-center gap-2"><Award className="text-purple-400"/> {item.title}</h3>
        <button onClick={onClose}><X size={20} className="text-slate-400 hover:text-white"/></button>
      </div>
      <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-auto bg-black/50">
        <img src={item.image} onError={(e)=>{e.target.onerror=null;e.target.src="https://via.placeholder.com/800x600?text=Certificate+Image"}} alt={item.title} className="max-h-[60vh] object-contain shadow-2xl border border-slate-800 rounded"/>
        {item.credentialUrl && (
          <a href={item.credentialUrl} target="_blank" className="mt-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-full hover:bg-cyan-500/10 transition">
            <ExternalLink size={16}/> Verify Credential
          </a>
        )}
      </div>
    </div>
  </div>
);

// --- PROJECT DETAIL MODAL (REAL LINKS ONLY) ---
const ProjectDetailModal = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0c] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition"><X size={20}/></button>
        
        {/* Image Side */}
        <div className="md:w-1/2 h-64 md:h-auto bg-slate-900 relative group">
          {/* FOTO PROJECT: Gunakan Unsplash jika file lokal tidak ada */}
          <img 
            src={project.image} 
            onError={(e)=>{e.target.onerror=null;e.target.src=`https://via.placeholder.com/800x600/1e293b/06b6d4?text=${project.title.replace(/ /g,'+')}`}} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent md:bg-gradient-to-r"></div>
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
          <div className="mb-6">
            <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono rounded-full">{project.category}</span>
            <h2 className="text-3xl font-bold text-white mt-4 mb-2 leading-tight">{project.title}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-slate-300 leading-relaxed text-sm">{project.desc}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{t}</span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
              {/* LOGIC TOMBOL LINK (REAL LINKS, NO FAKE SIM) */}
              
              {project.apkUrl && (
                <a href={project.apkUrl} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition">
                  <Download size={18} /> Download APK / Access Drive
                </a>
              )}
              
              {project.youtube && (
                <a href={project.youtube} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition">
                  <Video size={18} /> Watch Demo on YouTube
                </a>
              )}
              {project.video && (
                 <a href={project.video} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition">
                   <Video size={18} /> Watch Demo Video
                 </a>
              )}

              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition">
                  <Globe size={18} /> Visit Website / Notebook
                </a>
              )}

              <a href={project.github} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-lg font-bold transition">
                <Github size={18} /> View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP
// ==========================================

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [revealContact, setRevealContact] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const [showHackToast, setShowHackToast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [certFilter, setCertFilter] = useState('All');
  
  const typedTagline = useTypewriter(profileData.tagline, 50);

  useEffect(() => {
    const codes = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let buffer = [];
    const handleKeyDown = (e) => {
      buffer.push(e.key.toLowerCase());
      if (buffer.length > codes.length) buffer.shift();
      if (JSON.stringify(buffer) === JSON.stringify(codes)) {
        setHackerMode(prev => !prev);
        setShowHackToast(true);
        setTimeout(() => setShowHackToast(false), 3000);
        buffer = [];
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden transition-colors duration-1000 ${hackerMode ? 'bg-black text-green-400 font-mono' : 'bg-[#0a0a0c] text-slate-300'}`}>
      
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        @keyframes music-bar { 0%, 100% { height: 4px; } 50% { height: 16px; } }
        .animate-music-bar { animation: music-bar 0.5s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        
        /* Tambahan: Scrollbar untuk desktop agar user tahu bisa scroll */
        @media (min-width: 768px) {
          .scrollbar-thin::-webkit-scrollbar { width: 6px; }
          .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
          .scrollbar-thin::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #475569; }
        }
      `}</style>

      {/* --- HACKER MODE TOAST --- */}
      {showHackToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-10 fade-in">
          <div className="bg-green-900/90 text-green-400 border border-green-500 px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.5)] flex items-center gap-3 font-mono font-bold">
            <AlertTriangle className="animate-pulse" />
            <span>SYSTEM OVERRIDE: {hackerMode ? 'ACTIVATED' : 'DEACTIVATED'}</span>
          </div>
        </div>
      )}

      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,${hackerMode ? '#00ff0010' : '#80808012'}_1px,transparent_1px),linear-gradient(to_bottom,${hackerMode ? '#00ff0010' : '#80808012'}_1px,transparent_1px)] bg-[size:24px_24px]`}></div>
        {!hackerMode && (
          <>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>
            <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
          </>
        )}
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 backdrop-blur-md border-b ${hackerMode ? 'bg-black/90 border-green-500' : 'bg-[#0a0a0c]/80 border-slate-800'}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white cursor-pointer" onClick={() => scrollToSection('home')}>
            <Terminal className={hackerMode ? 'text-green-500' : 'text-cyan-400'} /> 
            <span className={`font-mono ${hackerMode ? 'text-green-500' : 'text-white'}`}>N<span className={hackerMode ? 'text-green-300' : 'text-cyan-400'}>AF</span>_DEV</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-sm font-mono">
            {['Home', 'About', 'Experience', 'Portfolio', 'Certificates'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`hover:text-cyan-400 transition ${activeTab === item.toLowerCase() ? (hackerMode ? 'text-green-400' : 'text-cyan-400') : (hackerMode ? 'text-green-800' : 'text-slate-400')}`}>{item}</button>
            ))}
            <button onClick={() => setTerminalOpen(true)} className={`flex items-center gap-1 hover:text-cyan-400 ${hackerMode ? 'text-green-800' : 'text-slate-400'}`}><Terminal size={14}/>_CLI</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                  {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
          </div>

          {/* GitHub Button restored in Navbar (Desktop) */}
          <button onClick={() => window.open(profileData.social.github, '_blank')} className={`p-2 rounded-lg border hover:bg-white/10 transition group hidden md:block ${hackerMode ? 'border-green-500 bg-green-900/20' : 'bg-white/5 border-white/10 hover:border-cyan-500/50'}`}>
            <Github size={20} className={`transition ${hackerMode ? 'text-green-500' : 'text-white group-hover:text-cyan-400'}`}/>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-[#0a0a0c] border-b border-slate-800 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
                {['Home', 'About', 'Experience', 'Portfolio', 'Certificates'].map((item) => (
                    <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left py-2 text-slate-300 hover:text-cyan-400 border-b border-slate-800">{item}</button>
                ))}
                 <button onClick={() => setTerminalOpen(true)} className="flex items-center gap-2 text-left py-2 text-slate-300 hover:text-cyan-400"><Terminal size={14}/> Open CLI</button>
                 
                 {/* Mobile Social Buttons */}
                 <div className="flex gap-4 pt-2">
                    <button onClick={() => window.open(profileData.social.github, '_blank')} className="text-slate-300 hover:text-cyan-400"><Github size={20}/></button>
                    <button onClick={() => window.open(profileData.social.linkedin, '_blank')} className="text-slate-300 hover:text-cyan-400"><Linkedin size={20}/></button>
                    <button onClick={() => window.open(profileData.social.instagram, '_blank')} className="text-slate-300 hover:text-cyan-400"><Instagram size={20}/></button>
                 </div>
            </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className="pt-32 pb-20 px-4 container mx-auto min-h-screen flex items-center relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 w-full">
          {/* Left Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
             <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-6 ${hackerMode ? 'bg-green-900/20 border-green-500 text-green-500' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'}`}>
               <span className={`w-2 h-2 rounded-full animate-pulse ${hackerMode ? 'bg-green-500' : 'bg-cyan-400'}`}></span> SYSTEM ONLINE
             </div>
             <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
               Hi, I'm <GlitchText text={profileData.name} className={`inline-block ${hackerMode ? 'text-green-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500'}`} />
             </h1>
             <p className={`text-xl mb-8 font-mono border-l-4 pl-4 ${hackerMode ? 'text-green-600 border-green-600' : 'text-slate-400 border-purple-500'}`}>{typedTagline}</p>
             
             {/* QUICK STATS ROW */}
             <div className="flex justify-center md:justify-start gap-6 mb-8 text-sm font-mono border-t border-b border-white/5 py-4">
                <div>
                   <span className="block text-2xl font-bold text-white">{profileData.stats.projects}</span>
                   <span className="text-slate-500">PROJECTS</span>
                </div>
                <div>
                   <span className="block text-2xl font-bold text-white">{profileData.stats.gpa}</span>
                   <span className="text-slate-500">GPA (5th)</span>
                </div>
                <div>
                   <span className="block text-2xl font-bold text-white">{profileData.stats.semester}</span>
                   <span className="text-slate-500">SEMESTER</span>
                </div>
             </div>
             
             <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <button onClick={() => scrollToSection('portfolio')} className={`px-8 py-3 rounded-lg font-bold transition flex items-center gap-2 shadow-lg ${hackerMode ? 'bg-green-800 hover:bg-green-700 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20'}`}>
                 <Code size={20}/> View Projects
               </button>
               <a href="/cv-nathan.pdf" download className={`px-8 py-3 border rounded-lg font-bold transition flex items-center gap-2 ${hackerMode ? 'bg-black text-green-500 border-green-500 hover:bg-green-900/20' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}>
                 <Download size={20}/> Download CV
               </a>
               {/* Social Buttons */}
               <button onClick={() => window.open(profileData.social.instagram, '_blank')} className={`p-3 rounded-lg font-bold transition shadow-lg ${hackerMode ? 'bg-green-800 hover:bg-green-700 text-white' : 'bg-pink-600 hover:bg-pink-500 text-white shadow-pink-500/20'}`}>
                 <Instagram size={20}/>
               </button>
               <button onClick={() => window.open(profileData.social.linkedin, '_blank')} className={`p-3 rounded-lg font-bold transition shadow-lg ${hackerMode ? 'bg-green-800 hover:bg-green-700 text-white' : 'bg-blue-700 hover:bg-blue-600 text-white shadow-blue-500/20'}`}>
                 <Linkedin size={20}/>
               </button>
             </div>
          </div>

          {/* Right Content (Photo) - BINGKAI DIPERBAIKI (SIZE FIX) */}
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] flex-shrink-0 group mx-auto md:mx-0">
             {/* Glow Effect */}
             {!hackerMode && <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition duration-700 z-0"></div>}
             
             {/* Spinning Border (FIXED VISIBILITY) */}
             <div className={`absolute inset-0 border-4 rounded-full border-dashed animate-spin-slow z-10 ${hackerMode ? 'border-green-500' : 'border-cyan-400'}`} style={{animationDuration: '10s'}}></div>
             
             {/* Image Container (FIXED SIZE & OVERFLOW) */}
             <div className={`relative w-full h-full rounded-full overflow-hidden border-4 backdrop-blur-sm z-20 ${hackerMode ? 'border-green-500/50' : 'border-slate-800'}`}>
               <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative flex items-center justify-center">
                  {/* FOTO PROFIL DENGAN FALLBACK */}
                  <img 
                     src="/profile.jpg" 
                     onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x800.png?text=NATHAN+ALVINO"; }} 
                     alt="Profile" 
                     className={`w-full h-full object-cover transition duration-500 scale-100 group-hover:scale-110 ${hackerMode ? 'grayscale contrast-125 brightness-75 sepia hue-rotate-50' : 'grayscale group-hover:grayscale-0'}`}
                   />
                   {!hackerMode && <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-6"><span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs rounded-full backdrop-blur-md">Google Student Ambassador</span></div>}
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle icon={User} title="User_Profile" />
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`space-y-6 text-lg ${hackerMode ? 'text-green-400' : 'text-slate-300'}`}>
              <p>{profileData.summary}</p>
              <div className={`p-4 border rounded-xl ${hackerMode ? 'bg-green-900/10 border-green-500' : 'bg-slate-900 border-slate-700'}`}>
                 <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setRevealContact(!revealContact)}>
                   <h4 className={`text-sm font-bold flex items-center gap-2 ${hackerMode ? 'text-green-500' : 'text-slate-400'}`}>{revealContact ? <Unlock size={14}/> : <Lock size={14}/>} CONTACT INFO</h4>
                   <span className={`text-xs font-mono ${hackerMode ? 'text-green-600' : 'text-cyan-500'}`}>{revealContact ? 'DECRYPTED' : 'ENCRYPTED'}</span>
                 </div>
                 <div className="space-y-3 font-mono text-sm">
                   <div className="flex items-center gap-3"><Mail size={16} className={hackerMode ? 'text-green-500' : 'text-cyan-500'}/> {revealContact ? profileData.email : <DecryptText text={profileData.email} reveal={revealContact}/>}</div>
                   <div className="flex items-center gap-3"><Phone size={16} className={hackerMode ? 'text-green-500' : 'text-cyan-500'}/> {revealContact ? profileData.phone : <DecryptText text={profileData.phone} reveal={revealContact}/>}</div>
                   <div className="flex items-center gap-3"><MapPin size={16} className={hackerMode ? 'text-green-500' : 'text-cyan-500'}/> {profileData.location}</div>
                 </div>
              </div>
            </div>
            <div className="space-y-6">
              {/* SKILLS */}
              <div className="space-y-4">
                {skillsData.map((s,i)=>(
                  <div key={i}>
                    <div className={`flex justify-between text-sm mb-1 font-mono ${hackerMode ? 'text-green-600' : 'text-slate-400'}`}><span>{s.icon} {s.name}</span><span>{s.level}%</span></div>
                    <div className={`h-2 rounded-full ${hackerMode ? 'bg-green-900/30' : 'bg-slate-800'}`}><div className={`h-full rounded-full ${hackerMode ? 'bg-green-500' : 'bg-cyan-600'}`} style={{width: `${s.level}%`}}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="py-20 relative z-10">
         <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <SectionTitle icon={Briefcase} title="Career_Log" />
                <div className={`space-y-8 border-l-2 ml-6 md:ml-3 pl-8 relative ${hackerMode ? 'border-green-800' : 'border-slate-800'}`}>
                  {experienceData.map((exp, idx) => (
                    <div key={idx} className="relative group">
                      <div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 transition ${hackerMode ? 'bg-black border-green-500' : 'bg-slate-950 border-purple-500'}`}></div>
                      <div className={`p-5 rounded-xl border transition ${hackerMode ? 'bg-green-900/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/5 text-slate-300'}`}>
                        <h3 className={`text-xl font-bold ${hackerMode ? 'text-green-400' : 'text-white'}`}>{exp.role}</h3>
                        <p className={`font-medium mb-1 ${hackerMode ? 'text-green-600' : 'text-purple-400'}`}>{exp.company}</p>
                        <span className={`inline-block text-xs px-2 py-1 rounded font-mono mb-3 ${hackerMode ? 'bg-green-900 text-green-300' : 'bg-slate-800 text-slate-400'}`}>{exp.year}</span>
                        <ul className="space-y-1">
                          {exp.points.map((point, pIdx) => (<li key={pIdx} className="text-sm opacity-80 flex items-start gap-2"><span className={hackerMode ? 'text-green-500' : 'text-purple-500'}>▹</span> {point}</li>))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle icon={GraduationCap} title="Education_History" />
                <div className={`space-y-8 border-l-2 ml-6 md:ml-3 pl-8 relative ${hackerMode ? 'border-green-800' : 'border-slate-800'}`}>
                  {educationData.map((edu, idx) => (
                    <div key={idx} className="relative group">
                      <div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 transition ${hackerMode ? 'bg-black border-green-500' : 'bg-slate-950 border-purple-500'}`}></div>
                      <div className={`p-5 rounded-xl border transition ${hackerMode ? 'bg-green-900/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/5 text-slate-300'}`}>
                        <h3 className={`text-xl font-bold ${hackerMode ? 'text-green-400' : 'text-white'}`}>{edu.school}</h3>
                        <p className={`font-mono text-sm mb-2 ${hackerMode ? 'text-green-600' : 'text-cyan-400'}`}>{edu.degree}</p>
                        <span className={`inline-block text-xs px-2 py-1 rounded font-mono mb-3 ${hackerMode ? 'bg-green-900 text-green-300' : 'bg-slate-800 text-slate-400'}`}>{edu.year}</span>
                        <p className="text-sm opacity-80">{edu.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Portfolio Section (Grid Layout) */}
      <section id="portfolio" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle icon={Code} title="Project_Repository" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedProject(item)}
                className={`group border rounded-xl overflow-hidden cursor-pointer transition shadow-lg ${hackerMode ? 'bg-black border-green-800 hover:border-green-500' : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-500/10'}`}
              >
                <div className="h-48 overflow-hidden relative">
                   {/* Pake Placeholder keren kalau gambar belum ada */}
                   <img src={item.image} onError={(e)=>{e.target.onerror=null;e.target.src=`https://via.placeholder.com/800x600/1e293b/06b6d4?text=${item.title.replace(/ /g,'+')}`}} alt={item.title} className={`w-full h-full object-cover group-hover:scale-110 transition duration-500 ${hackerMode ? 'grayscale contrast-125' : ''}`}/>
                   <div className="absolute top-3 left-3 z-20">
                     <span className={`px-2 py-1 backdrop-blur text-xs font-mono rounded border ${hackerMode ? 'bg-black/80 text-green-400 border-green-500' : 'bg-black/60 text-cyan-400 border-cyan-500/30'}`}>
                       {item.category}
                     </span>
                   </div>
                   <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-sm ${hackerMode ? 'bg-green-900/80' : 'bg-black/60'}`}>
                     <span className={`px-4 py-2 border rounded-full font-bold flex items-center gap-2 ${hackerMode ? 'border-green-500 text-green-400' : 'border-white/20 text-white'}`}><Eye size={16}/> View Details</span>
                   </div>
                </div>
                <div className="p-5">
                   <h3 className={`text-lg font-bold mb-2 transition ${hackerMode ? 'text-green-400' : 'text-white group-hover:text-cyan-400'}`}>{item.title}</h3>
                   <p className={`text-sm line-clamp-2 ${hackerMode ? 'text-green-600' : 'text-slate-400'}`}>{item.desc}</p>
                   <div className="flex flex-wrap gap-2 mt-4">
                    {item.tech.slice(0,3).map((t, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-1 rounded border ${hackerMode ? 'text-green-300 bg-green-900/30 border-green-700' : 'text-slate-300 bg-slate-800 border-slate-700'}`}>
                        {t}
                      </span>
                    ))}
                    {item.tech.length > 3 && <span className={`text-[10px] font-mono px-1 py-1 ${hackerMode ? 'text-green-500' : 'text-slate-400'}`}>+{item.tech.length - 3}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle icon={Award} title="Achievements" />
          
          {/* FILTER BUTTONS (SCROLLABLE ON MOBILE) */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Professional', 'Course', 'Basic', 'Bootcamp'].map(filter => (
              <button
                key={filter}
                onClick={() => setCertFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition border ${
                  certFilter === filter 
                  ? (hackerMode ? 'bg-green-600 border-green-500 text-black' : 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/30') 
                  : (hackerMode ? 'bg-transparent border-green-800 text-green-600 hover:text-green-400' : 'bg-transparent border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-400')
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificatesData
              .filter(c => certFilter === 'All' || c.type === certFilter)
              .map((cert, idx) => (
              <div key={idx} className={`p-5 border rounded-xl transition group cursor-pointer relative overflow-hidden ${hackerMode ? 'bg-black border-green-800 hover:border-green-500' : 'bg-[#0a0a0c] border-slate-800 hover:border-purple-500/50'}`} onClick={() => setSelectedCert(cert)}>
                {/* BADGE TIPE SERTIFIKAT */}
                <div className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded font-mono ${hackerMode ? 'bg-green-900 text-green-300' : 'bg-purple-900/30 text-purple-300 border border-purple-500/30'}`}>
                  {cert.type}
                </div>

                <div className="flex items-start gap-4 mt-2">
                  <div className={`p-3 rounded-lg ${hackerMode ? 'bg-green-900/20 text-green-500' : 'bg-purple-500/10 text-purple-400'}`}><Award size={24}/></div>
                  <div>
                    <h4 className={`font-bold leading-tight mb-1 transition ${hackerMode ? 'text-green-300' : 'text-white group-hover:text-purple-300'}`}>{cert.title}</h4>
                    <p className={`text-sm mb-2 ${hackerMode ? 'text-green-700' : 'text-slate-400'}`}>{cert.issuer}</p>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${hackerMode ? 'text-green-400 bg-green-900/30' : 'text-slate-500 bg-slate-900'}`}>{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={`border-t py-8 text-center text-sm ${hackerMode ? 'border-green-800 bg-black text-green-700' : 'border-slate-800 bg-[#050507] text-slate-500'}`}>
        <p>Designed & Built by Nathan Alvino Fam</p>
      </footer>

      {/* Modals & Widgets */}
      <AiChatWidget onOpen={() => setChatOpen(true)} />
      <AiChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <MusicPlayerWidget />
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedCert && <CertificateModal item={selectedCert} onClose={() => setSelectedCert(null)} />}
      {terminalOpen && <TerminalOverlay onClose={() => setTerminalOpen(false)} openSection={scrollToSection} />}
    </div>
  );
}