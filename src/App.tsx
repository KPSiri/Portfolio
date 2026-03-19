import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  MessageSquare, 
  X, 
  Send, 
  Code2, 
  BrainCircuit, 
  Languages, 
  Trophy, 
  GraduationCap, 
  Briefcase,
  ChevronRight,
  Sparkles,
  Terminal
} from 'lucide-react';
import { chatWithPoorna } from './services/chatService';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  icon: React.ReactNode;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  type: 'Full-time' | 'Internship';
}

interface Publication {
  title: string;
  date: string;
  link: string;
}

interface Certification {
  title: string;
  org: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
}

// --- Components ---

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode; icon: any }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-display font-bold text-slate-800">{children}</h2>
  </div>
);

const Chatbot = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hello! I'm here to tell you about Poorna Siri, her work in AI research, her experience, and what she's currently building. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await chatWithPoorna(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops! Something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass px-4 py-2 rounded-2xl flex items-center gap-3 border-purple-500/30 shadow-purple-500/10 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full vibrant-gradient flex items-center justify-center text-white text-xl font-bold border-2 border-white/20">
                👩🏻‍💻
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#050505] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-tighter">Online</span>
              <span className="text-sm font-medium text-white">Ask me anything</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass w-80 sm:w-96 h-[500px] rounded-2xl overflow-hidden flex flex-col shadow-2xl border-white/10"
          >
            <div className="vibrant-gradient p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/50 text-xl">
                  👩🏻‍💻
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm leading-tight">Ask questions about me</span>
                  <span className="text-[10px] text-white/70 font-medium">AI Assistant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none shadow-sm border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-purple-500 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="vibrant-gradient p-4 rounded-full text-white shadow-lg flex items-center gap-2"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const projects: Project[] = [
    {
      title: "Amazon MSc Dissertation",
      description: "Researching robust resume classifiers against LLM manipulations. Developing a manipulation-invariant encoder for latent representations of resumes. This is my primary research focus at Edinburgh.",
      tags: ["NLP", "PyTorch", "LLMs", "Research"],
      icon: <BrainCircuit className="text-pink-500" />
    },
    {
      title: "Interactive AI Chatbot",
      description: "A custom RAG-powered chatbot trained on my professional background, projects, and research. Built to provide an interactive way for people to learn about my work and journey in AI.",
      tags: ["RAG", "Gemini API", "Vector DB"],
      icon: <MessageSquare className="text-indigo-500" />
    },
    {
      title: "Multi-Agent Python Game Developer Tool",
      description: "Designed and built a multi-agent code generation system from scratch using LangGraph and Gemini API that autonomously plans, writes, debugs, and iterates Python game code through a coordinated pipeline of specialised agents - covering requirements analysis, code generation, execution, error diagnosis, and refinement.",
      tags: ["LangGraph", "Gemini API", "Python"],
      icon: <Terminal className="text-purple-500" />
    },
    {
      title: "Math Reasoning for SLMs",
      description: "Fine-tuned Qwen-2.5-0.5B on GSM8K dataset, achieving 43% accuracy in mathematical reasoning tasks.",
      tags: ["Fine-tuning", "Qwen", "GSM8K"],
      icon: <Sparkles className="text-pink-400" />
    },
    {
      title: "Sign Language Translation",
      description: "Attention architecture study for word-level ASL translation, improving accuracy from 64% to 70%.",
      tags: ["Computer Vision", "Attention", "ASL"],
      icon: <Code2 className="text-purple-400" />
    }
  ];

  const experiences: Experience[] = [
    {
      company: "HCLTech",
      role: "Senior Software Engineer",
      period: "Jul 2024 - Jul 2025",
      type: "Full-time",
      description: [
        "Developed customer-centric Generative AI and Agentic AI solutions, integrating LLM capabilities to enhance product productivity.",
        "Engineered a Test Case Generation Tool using OpenAI frameworks, achieving 90.2% accuracy in automated test case creation.",
        "Built a Functional Safety VHDL Analysis Tool leveraging AWS Bedrock with LLaMA3-70B and LangChain AWS, leading to 95.9% accuracy in identifying VHDL failure modes and generating the report.",
        "Implemented 3 AI Proofs of Concept (POCs) for client printer product integration: LLM-based Book Summarizer (Llamafile), LLM RAG Document Query (Llamafile-based RAG), and Mono2Colour (C++ model using LibTorch and OpenCV).",
        "Designed a novel Auto-Contrast Algorithm utilising proprietary Tone Reproduction Curve (TRC) generation for dynamic image contrast optimisation, resulting in enhanced visual fidelity."
      ]
    },
    {
      company: "HCLTech",
      role: "Academic Trainee",
      period: "Feb 2024 - Jul 2024",
      type: "Internship",
      description: [
        "Implemented a GAN model for document restoration, suppressing background noise and removing stains.",
        "Focused on generative models for image processing."
      ]
    },
    {
      company: "Velozity Global IT Solutions",
      role: "ML Developer Intern",
      period: "Feb 2023 - Apr 2023",
      type: "Internship",
      description: [
        "Developed and delivered over 30 diverse projects in Deep Learning and Machine Learning.",
        "Mentored 25+ students in model development."
      ]
    },
    {
      company: "Grootan Technologies",
      role: "Machine Learning R&D Intern",
      period: "Jul 2022 - Sep 2022",
      type: "Internship",
      description: [
        "Real-time video analysis to detect playing cards, assess tilt, and extract data using YOLO object detection."
      ]
    }
  ];

  const publications: Publication[] = [
    {
      title: "Various Algorithms and Techniques for Traffic Density Estimation",
      date: "March 2023",
      link: "https://ieeexplore.ieee.org/document/10040397"
    },
    {
      title: "A Glimpse Into the World of Augmented Reality",
      date: "July 2022",
      link: "http://ijcrt.org/viewfull.php?&p_id=IJCRT2207359"
    },
    {
      title: "A Systematic Review on Data Science Tools and Technologies",
      date: "April 2022",
      link: "https://doi.org/10.46501/IJMTST0804060"
    }
  ];

  const certifications: Certification[] = [
    {
      title: "NPTEL Data Science Domain",
      org: "NPTEL",
      date: "Dec 2023",
      description: "Consists of 6 individual certifications:\n1. Programming Data Structures and Algorithms using Python\n2. Data Science for Engineers\n3. Introduction to Machine Learning\n4. Deep Learning\n5. AI: Knowledge Representation and Reasoning\n6. Natural Language Processing.",
      icon: <Code2 className="text-blue-500" />
    },
    {
      title: "Google WE (Women Engineers)",
      org: "Talent Sprint",
      date: "2021 - 2023",
      description: "Selected for a 2-year program, ranking among the top 150 candidates out of over 27,000 applicants.",
      icon: <Trophy className="text-yellow-500" />
    },
    {
      title: "Intel Unnati Industrial Training",
      org: "Intel",
      date: "May - Jul 2023",
      description: "Developed a Phone Price Prediction Model by extracting data from Flipkart using UiPath.",
      icon: <Terminal className="text-blue-400" />
    }
  ];

  const hackathons = [
    {
      title: "AI-Engine Edinburgh",
      award: "Top 5",
      organizer: "JetBrains, Tomoro & Dawn",
      date: "Mar 2026",
      description: "Developed Road2Fringe, an intelligent system helping Edinburgh Fringe artists navigate the full administrative and promotional process."
    },
    {
      title: "Teachathon 2025",
      award: "2nd Prize",
      organizer: "University of Edinburgh",
      date: "Oct 2025",
      description: "Created StudentVerse, a gamified AI productivity app integrating with Outlook and LMS platforms."
    },
    {
      title: "Agentic AI Hackathon",
      award: "Top 150 / 9,100+ Teams",
      organizer: "Google Cloud",
      date: "Jul 2025",
      description: "Shortlisted for 'Empowering Teachers in a Multi-Grade Classroom.' Built the full solution using Google AI Suite."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-50 text-slate-800">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-100 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-50 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass mx-auto mt-4 max-w-5xl rounded-2xl px-6 py-4 flex justify-between items-center">
        <div className="font-display font-bold text-xl text-gradient">Poorna Siri Karanam</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          <a href="#about" className="hover:text-purple-600 transition-colors">About</a>
          <a href="#experience" className="hover:text-purple-600 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-purple-600 transition-colors">Projects</a>
          <a href="#hackathons" className="hover:text-purple-600 transition-colors">Hackathons</a>
          <a href="#publications" className="hover:text-purple-600 transition-colors">Research</a>
        </div>
        <div className="flex gap-4">
          <a href="https://linkedin.com/in/karanam-poorna-siri" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-600 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/sirikaranam" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-600 transition-colors">
            <Github size={20} />
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 space-y-32">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold tracking-wide border border-purple-200"
            >
              AI Engineer & MSc Student
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight text-slate-900"
            >
              Architecting the <span className="text-gradient">Future of AI</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 max-w-xl leading-relaxed"
            >
              I'm <span className="text-slate-900 font-semibold">Poorna Siri Karanam</span>, an AI enthusiast currently pursuing my Masters at the University of Edinburgh. Most people use AI to build things. I want to build the AI that builds things. I go deep not to follow the field, but to bend it. Every token, every attention head, every layer, every training run. Until I understand it well enough to make it do anything.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <a href="#projects" className="px-8 py-3 rounded-xl vibrant-gradient text-white font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
                View Projects
              </a>
              <a href="mailto:sirikaranam16@gmail.com" className="px-8 py-3 rounded-xl glass text-slate-700 font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2">
                Contact Me <Mail size={18} />
              </a>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex-1"
          >
            <div className="glass rounded-[2.5rem] p-8 border-purple-100 relative overflow-hidden group shadow-2xl">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200/50 blur-[100px] group-hover:bg-purple-300/50 transition-colors" />
              <div className="flex flex-col items-center gap-8 relative z-10">
                <div className="w-32 h-32 md:w-40 md:h-40 relative">
                  <div className="absolute inset-0 vibrant-gradient rounded-full animate-pulse opacity-10" />
                  <div className="absolute inset-2 glass rounded-full flex items-center justify-center border-2 border-white overflow-hidden bg-purple-50 text-4xl">
                    👩🏻‍💻
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-widest border border-purple-200">
                    <Sparkles size={12} /> Interactive AI Assistant
                  </div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                    Curious about my <span className="text-gradient">AI Journey?</span>
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Ask me about my work at HCLTech, my dissertation at Edinburgh, or my hackathon wins!
                  </p>
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="w-full px-6 py-3 rounded-xl vibrant-gradient text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} /> Ask questions about me
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About / Education Section */}
        <section id="about" className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <SectionHeading icon={GraduationCap}>Education</SectionHeading>
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-purple-200">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-50" />
                <h3 className="font-bold text-xl text-slate-900">MSc Artificial Intelligence</h3>
                <p className="text-purple-600 font-medium">University of Edinburgh, UK</p>
                <p className="text-slate-500 text-sm mt-1">Sep 2025 - Present</p>
                <p className="text-slate-600 mt-2">Specializing in advanced AI architectures and RAG systems.</p>
              </div>
              <div className="relative pl-8 border-l-2 border-purple-200">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-slate-50" />
                <h3 className="font-bold text-xl text-slate-900">B.Tech Artificial Intelligence and Data Science</h3>
                <p className="text-purple-600 font-medium">Sri Sairam Engineering College, India</p>
                <p className="text-slate-500 text-sm mt-1">2020 - 2024</p>
                <div className="mt-2">
                  <p className="text-slate-600">Department Gold Medalist with <span className="font-bold">9.39/10.00</span></p>
                  <p className="text-purple-500 text-xs font-medium">Equivalent to UK First Class Honours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <SectionHeading icon={Languages}>Languages & Culture</SectionHeading>
            <div className="glass p-6 rounded-2xl space-y-4">
              <p className="text-slate-600 leading-relaxed">
                I am deeply invested in Japanese language and culture. I've won multiple speech competitions, 
                including a first prize that sponsored a <span className="text-purple-600 font-semibold">2-week trip to Japan</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Japanese (JLPT N2)', 'English (IELTS 8.5)', 'Tamil', 'Telugu'].map(lang => (
                  <span key={lang} className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-100">
                    {lang}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-sm text-slate-500 italic">
                <Trophy size={16} className="text-yellow-500" />
                "Talk Your Walk to Japan" - 1st Prize Winner
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-8">
          <SectionHeading icon={Briefcase}>Professional Journey</SectionHeading>
          
          <div className="space-y-12">
            {/* Full-time Roles */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Full-time Experience <div className="h-px flex-1 bg-slate-100" />
              </h3>
              <div className="grid gap-6">
                {experiences.filter(e => e.type === 'Full-time').map((exp, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="glass p-7 rounded-2xl space-y-4 border-purple-100 ring-2 ring-purple-50/50 hover:border-purple-300 transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-xl text-slate-900">{exp.role}</h3>
                        <p className="text-purple-600 font-semibold text-base">{exp.company}</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest border border-purple-200">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex gap-3 text-slate-600 leading-relaxed">
                          <ChevronRight size={18} className="text-purple-500 shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Internships */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Internships <div className="h-px flex-1 bg-slate-100" />
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {experiences.filter(e => e.type === 'Internship').map((exp, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="glass p-6 rounded-2xl space-y-4 border-slate-100 hover:border-purple-200 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                        <p className="text-purple-600 font-medium text-sm">{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex gap-2 text-slate-600 text-sm leading-relaxed">
                          <ChevronRight size={14} className="text-purple-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8">
          <SectionHeading icon={Code2}>Featured Projects</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Project */}
            {projects.slice(0, 1).map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group glass p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden border-purple-300 ring-2 ring-purple-100/50 bg-gradient-to-br from-purple-50 to-pink-50"
              >
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[8px] font-bold uppercase tracking-widest shadow-lg shadow-purple-900/20">
                  Featured
                </div>
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-white text-purple-600 shadow-sm">
                    <BrainCircuit size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900">{project.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white text-slate-500 text-[10px] font-semibold border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-purple-600 font-bold text-xs group-hover:gap-3 transition-all">
                    Explore Research <ExternalLink size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
 
            {/* Other Projects */}
            {projects.slice(1).map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl space-y-4 border-slate-100 hover:border-purple-200 transition-colors"
              >
                <div className="p-2 w-fit rounded-xl bg-slate-50 text-purple-500">
                  {project.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900">{project.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[10px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Hackathons Section */}
        <section id="hackathons" className="space-y-8">
          <SectionHeading icon={Trophy}>Hackathons & Competitions</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {hackathons.map((hk, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl space-y-4 border-slate-100"
              >
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-[10px] font-bold uppercase tracking-wider border border-pink-100">
                    {hk.award}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hk.date}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{hk.title}</h3>
                  <p className="text-purple-600 text-xs font-medium">{hk.organizer}</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{hk.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="space-y-8">
          <SectionHeading icon={BrainCircuit}>Research & Publications</SectionHeading>
          <div className="grid gap-4">
            {publications.map((pub, i) => (
              <motion.a
                key={i}
                href={pub.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 10 }}
                className="glass p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-purple-300 transition-all group"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">{pub.title}</h3>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{pub.date}</p>
                </div>
                <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-purple-100 group-hover:text-purple-600 transition-all">
                  <ExternalLink size={20} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="space-y-8">
          <SectionHeading icon={Trophy}>Certifications</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl space-y-4 border-slate-100 hover:border-purple-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                    {cert.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.date}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{cert.title}</h3>
                  <p className="text-purple-600 text-xs font-medium">{cert.org}</p>
                </div>
                {cert.description && (
                  <p className="text-slate-600 text-sm leading-relaxed">{cert.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blog Teaser */}
        <section id="blog" className="glass rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden border-slate-200">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-purple-200 rounded-full" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-pink-200 rounded-full" />
          </div>
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-widest border border-pink-100">
              Blog Series
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient">AI Trends & Implementations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              I'm preparing a series of deep-dives into current AI trends with hands-on implementations. 
              Stay tuned for insights on Agentic AI, RAG optimization, and more.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="font-display font-bold text-2xl text-gradient">Poorna Siri Karanam</div>
            <p className="text-slate-400 text-sm">© 2026 Poorna Siri Karanam. Built with AI & Passion.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/karanam-poorna-siri" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-600 transition-colors"><Linkedin size={24} /></a>
            <a href="https://github.com/sirikaranam" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-600 transition-colors"><Github size={24} /></a>
            <a href="mailto:sirikaranam16@gmail.com" className="text-slate-400 hover:text-purple-600 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
      </footer>

      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
