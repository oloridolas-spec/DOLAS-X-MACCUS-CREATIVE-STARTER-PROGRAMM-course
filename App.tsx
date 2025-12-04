import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import CourseDetail from './components/CourseDetail';
import AboutProfile from './components/AboutProfile';
import EnrollmentModal from './components/EnrollmentModal';
import SignIn from './components/SignIn';
import PaymentPortal from './components/PaymentPortal';
import AIChat from './components/AIChat';
import { COURSES, MARQUEE_ITEMS, BANK_DETAILS, INSTRUCTORS } from './constants';
import { Course } from './types';

const Home: React.FC<{ onEnroll: (c: Course) => void }> = ({ onEnroll }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    setMousePos({ x, y });
  };

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div onMouseMove={handleMouseMove} className="overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-[0.15] z-0 pointer-events-none" />
        
        {/* Radial Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />

        {/* Ambient Glows */}
        <div 
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-dolas-red rounded-full mix-blend-screen filter blur-[120px] opacity-[0.08] animate-pulse-slow"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-maccus-blue rounded-full mix-blend-screen filter blur-[120px] opacity-[0.08] animate-pulse-slow"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
             <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-300">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               Registrations Open for Dec 15
             </span>
          </div>
          
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 text-white mix-blend-lighten animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            CREATIVE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">STARTER</span>
          </h1>
          
          <p 
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            A premium bootcamp by <span className="text-white font-semibold">Dolas</span> & <span className="text-white font-semibold">Maccus</span>.
            Master industry-standard tools and workflows in 3D, Video, and Motion.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a 
              href="#courses" 
              onClick={(e) => scrollToId(e, 'courses')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Explore Courses
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToId(e, 'about')}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Meet Founders
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </header>

      {/* Marquee Section */}
      <div className="border-y border-white/5 bg-black/50 backdrop-blur-sm py-6 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-marquee w-fit">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-3xl md:text-5xl font-black text-transparent stroke-text opacity-30 font-sans tracking-tight" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <section id="courses" className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Select Your Discipline</h2>
              <p className="text-gray-400 max-w-md">Comprehensive modules designed to take you from zero to industry-ready in 8 days.</p>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-dolas-red"></span>
              <span className="w-3 h-3 rounded-full bg-maccus-blue"></span>
              <span className="w-3 h-3 rounded-full bg-white"></span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map(course => (
              <CourseCard key={course.id} course={course} onEnroll={onEnroll} />
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="about" className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface/50" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-sm font-mono text-dolas-red tracking-widest uppercase mb-4">The Architects</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter">POWERHOUSE DUO</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <Link to="/about/dolas" className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
              <img src={INSTRUCTORS.dolas.image} alt="Dolas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-dolas-red font-mono text-xs uppercase tracking-wider mb-2 block">Visual Director</span>
                <h3 className="text-4xl font-black uppercase italic">Dolas</h3>
              </div>
            </Link>

            <Link to="/about/maccus" className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
              <img src={INSTRUCTORS.maccus.image} alt="Maccus" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-maccus-blue font-mono text-xs uppercase tracking-wider mb-2 block">Technical Lead</span>
                <h3 className="text-4xl font-black uppercase italic">Maccus</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h4 className="text-2xl font-black tracking-tighter mb-6 text-gray-700">DOLASxMACCUS</h4>
          <p className="text-gray-500 font-mono text-xs mb-8">
            © 2024 Creative Starter Program.<br />
            Lagos, Nigeria.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-white selection:text-black">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home onEnroll={handleEnroll} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/payment" element={<PaymentPortal />} />
          <Route path="/courses/:id" element={<CourseDetail onEnroll={handleEnroll} />} />
          <Route path="/about/:id" element={<AboutProfile />} />
        </Routes>

        <EnrollmentModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          course={selectedCourse}
          bankDetails={BANK_DETAILS}
        />

        <AIChat />
      </div>
    </Router>
  );
};

export default App;