export type Project = { number: string; title: string; category: string; description: string; stack: string[]; accent: string; published?: boolean };
export type Article = { date: string; category: string; title: string; excerpt: string; published?: boolean };
export type JourneyEntry = { period: string; title: string; copy: string; feature?: boolean };
export type Certificate = { id: string; title: string; issuer: string; issueDate?: string; credentialId?: string; credentialUrl?: string; image: string; imageAlt: string; description?: string; order: number; published?: boolean };

export const profile = { fullName: "Tamimul Ansary Shameer", displayName: "Shameer", roles: ["Automobile Enthusiast", "AI Engineer", "Automation Builder", "Content Creator"], hero: "I turn curious ideas into intelligent systems, autonomous workflows, and products that earn their place in the real world.", intro: "I build, break, study, and rebuild ideas around AI engineering, automation, and software—while following the bigger question of what intelligent systems can become.", aboutTitle: "Curiosity starts it. Building makes it real.", about: ["I am drawn to unclear ideas: the kind that arrive as a question, a rough sketch, or a problem nobody has properly named yet. My work moves between artificial intelligence, automation, AI systems, SaaS, full-stack development, and product experimentation.", "Usually, the process begins with research and a stubborn hunch. I learn what is needed, build an MVP, break it, debug it, and keep refining until the experiment becomes useful. The point is not to collect technologies; it is to understand enough to make something work.", "Right now, I am especially interested in AI agents, autonomous systems, Generative AI, RAG, machine learning, deep learning, and the future of intelligent software."], email: "shameertmdevop@gmail.com", location: "Kanyakumari, India", image: "/profile.jpg" };
export const current = [["Building", "AI-powered SaaS products and automation systems."], ["Exploring", "AI agents, the road toward AGI and ASI, autonomous systems—and, occasionally, the universe itself."], ["Working on", "Zcloud Digitech, an AI-focused startup initiative and a home for experimental products."], ["Based in", "Kanyakumari, India."]];
export const projects: Project[] = [
 {number:"01",title:"Nurse Flow",category:"AI + IoT healthcare",description:"A connected healthcare workflow for nurse attendance, room allocation, shift management, telemetry, and real-time alerting.",stack:["ESP12E","Express.js","TypeScript","Supabase","PostgreSQL","IoT"],accent:"grid"},
 {number:"02",title:"Z Tracing",category:"Fitness platform",description:"A calmer way to track workouts, progress, and exercise performance—with muscle visualization built into the experience.",stack:["Next.js","React","Supabase","Tailwind CSS"],accent:"rings"},
 {number:"03",title:"Smart Email Writer",category:"Generative AI",description:"An AI writing system with emotional awareness, semantic memory, and a searchable history of the conversations that matter.",stack:["Python","Streamlit","Gemini","ChromaDB","SQLite"],accent:"type"},
 {number:"04",title:"Voice AI Agent",category:"Agentic voice",description:"A conversational voice assistant for bookings, availability checks, and automated business workflows.",stack:["LiveKit","STT","LLM","TTS","AI Agents"],accent:"wave"},
 {number:"05",title:"Z_inaippu",category:"QR SaaS",description:"A QR-powered space for sharing and managing digital information without the usual friction.",stack:["Next.js","Supabase","QR Systems"],accent:"code"},
 {number:"06",title:"ZCUT AI",category:"Computer vision",description:"A focused, AI-powered background-removal tool designed to make a repetitive task feel instant.",stack:["Python","Streamlit","Computer Vision"],accent:"cut"}
];
export const articles: Article[] = [
 {date:"Coming soon",category:"Systems",title:"Automation vs. AI Automation — What Actually Changes?",excerpt:"How traditional automation is evolving into intelligent, context-aware workflows."},
 {date:"Coming soon",category:"AI",title:"From Automation to Autonomous Systems",excerpt:"Exploring the shift from rule-based automation to AI systems with agency."},
 {date:"Coming soon",category:"Building",title:"Building AI Products with No Funding",excerpt:"Lessons from experimenting with products, tools, and MVPs as an independent builder."},
 {date:"Coming soon",category:"Notes",title:"What I Learned Building AI Agents",excerpt:"Practical observations from LLMs, RAG, tools, and agent workflows."}
];
export const journey: JourneyEntry[] = [
 {period:"2018—2022",title:"Mechanical curiosity",copy:"Before software, my curiosity was mechanical. I spent these years around motorcycles—restoring bikes, trying power upgrades, testing unusual setups, and learning what changes when you take something apart and put it back together with more intent."},
 {period:"2023",title:"A complete reset",copy:"Health issues asked me to step away from automobiles. On March 21, I joined an institution to learn programming and began with Java. It did not click, and I stopped. In November, I started again with HTML, then CSS and JavaScript. The first attempt failed; the second changed everything."},
 {period:"2024",title:"Trying everything, chasing something",copy:"AI tools became a way to learn faster and experiment more freely. I explored coding tools, React Native basics, Flutter, and software development without a neat map. I was building, curious, and still looking for the work that would hold my attention."},
 {period:"2025",title:"Business, marketing, another pivot",copy:"With a college friend, I started Monkfit, an online clothing business. It taught me about products, marketing, and making decisions for real users. Digital marketing later sharpened that lens. The experience was valuable—and made it clear that my deepest curiosity lived elsewhere."},
 {period:"January 2026",title:"One last dance",copy:"I made a serious promise to myself: one final, focused attempt. I began with Python and, for the first time, the work felt different. It led me into AI, Generative AI, automation, RAG, and the patient craft of building systems.",feature:true},
 {period:"2026",title:"Going deeper into AI",copy:"I joined a Generative AI course at IIT Madras and learned with the guidance of five mentors. The experience helped turn tool-assisted experimentation into a more structured understanding of Generative AI, automation, RAG, AI agents, machine learning, and deep learning."},
 {period:"Present",title:"Zcloud Digitech",copy:"I am building Zcloud Digitech, working on freelance projects, and continuing to experiment with emerging technology. AI, automation, mathematics, physics, and intelligent systems are all part of the current exploration. I am still learning. Still building. Still experimenting. This is only the beginning."}
];
export const toolkit = [["AI & Machine Learning","Python · OpenAI · Gemini · Groq · LangChain · LangGraph · Hugging Face · PyTorch · TensorFlow · Scikit-learn · RAG · Vector Databases · ChromaDB · Embeddings · AI Agents"],["Software Engineering","Next.js · React · TypeScript · JavaScript · Node.js · Express.js · FastAPI · React Native · Flutter"],["Data & Infrastructure","PostgreSQL · Supabase · SQLite · GitHub · Vercel"],["Automation & Voice","n8n · LiveKit · STT · TTS · AI Voice Agents"]];
export const socialLinks = [{label:"GitHub",url:"https://github.com/Shameer28tm"},{label:"LinkedIn",url:"https://www.linkedin.com/in/shamee28r"},{label:"Instagram",url:"https://www.instagram.com/_shamee28r?igsh=MXN5N200cWVldDFl"}];
// Add verified certificates here. This same shape is ready for a future CMS or Supabase adapter.
export const certificates: Certificate[] = [
  {
    id: "generative-ai",
    title: "GenAI Architect Course Program",
    issuer: "SocialEagle.AI",
    issueDate: "March 2026",
    image: "/generative-ai.jpg",
    imageAlt: "SocialEagle.AI GenAI Architect Certificate",
    description: "Completed an intensive course on generative AI architecture, focusing on large language models (LLMs), RAG pipelines, and deploying production-ready AI agent systems.",
    order: 1,
    published: true
  },
  {
    id: "ai-for-tamil-nadu",
    title: "AI for Tamil Nadu Certificate of Participation",
    issuer: "ZenXai & ZenVoice",
    issueDate: "2026",
    image: "/ai-for-tamil-nadu.jpg",
    imageAlt: "AI for Tamil Nadu Participation Certificate",
    description: "Participated in the AI for Tamil Nadu initiative by ZenXai and ZenVoice, building skills in AI application frameworks and practical workflows to scale business operations.",
    order: 2,
    published: true
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Course",
    issuer: "ALO Educational Hub",
    issueDate: "December 2025",
    credentialId: "HUB1649",
    image: "/digital-marketing.jpg",
    imageAlt: "ALO Educational Hub Digital Marketing Certificate",
    description: "Completed a comprehensive 3-month course in digital marketing, covering search engine optimization (SEO), social media marketing, strategic campaigns, and analytics.",
    order: 3,
    published: true
  },
  {
    id: "niche-be",
    title: "B.E. Automobile Engineering",
    issuer: "Noorul Islam Centre for Higher Education, Accredited by NAAC (Cycle - 2)",
    issueDate: "7th Semester (Currently Studying)",
    credentialId: "CGPA: 7.6",
    image: "/niche-logo.png",
    imageAlt: "Noorul Islam Centre for Higher Education Logo",
    description: "Pursuing a B.E. in Automobile Engineering, combining classical vehicle dynamics and mechanical design with modern software control systems. Focused on the intersection of vehicle intelligence, automation, and next-generation mobility systems to build hardware-software integrations for real-world products.",
    order: 4,
    published: true
  }
];
