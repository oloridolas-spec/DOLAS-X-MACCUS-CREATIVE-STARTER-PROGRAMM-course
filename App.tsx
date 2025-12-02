import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import CourseDetail from './components/CourseDetail';
import AboutProfile from './components/AboutProfile';
import EnrollmentModal from './components/EnrollmentModal';
import AIChat from './components/AIChat';
import { COURSES, MARQUEE_ITEMS, BANK_DETAILS } from './constants';
import { Course } from './types';

const Home: React.FC<{ onEnroll: (c: Course) => void }> = ({ onEnroll }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate mouse position relative to center of screen (normalized -1 to 1)
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    setMousePos({ x, y });
  };

  return (
    <div onMouseMove={handleMouseMove} className="overflow-x-hidden perspective-1000">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 preserve-3d">
        <div className="absolute inset-0 z-0">
          {/* Parallax Background Blobs - Move opposite to mouse */}
          <div 
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-dolas-red rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob transition-transform duration-100 ease-out"
            style={{ transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, 0)` }}
          />
          <div 
            className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-maccus-blue rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob animation-delay-2000 transition-transform duration-100 ease-out"
            style={{ transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)` }}
          />
        </div>

        <div 
          className="relative z-10 text-center max-w-4xl mx-auto transition-transform duration-75 ease-out preserve-3d"
          style={{ 
            transform: `
              translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0) 
              rotateX(${mousePos.y * -5}deg) 
              rotateY(${mousePos.x * 5}deg)
            `
          }}
        >
          <div 
            className="inline-block px-4 py-1 mb-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm transition-transform duration-100"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="text-dolas-orange font-mono text-xs tracking-widest uppercase">Bootcamp starts Dec 15</span>
          </div>
          
          <h1 
            className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl"
            style={{ transform: 'translateZ(60px)' }}
          >
            CREATIVE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">STARTER</span><br />
            PROGRAM
          </h1>
          
          <p 
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
            style={{ transform: 'translateZ(40px)' }}
          >
            Master High-Income Skills in <span className="text-white font-bold">Graphic Design</span> & <span className="text-white font-bold">Video Editing</span>. 
            A collaboration between Dolas and Maccus Media.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ transform: 'translateZ(50px)' }}
          >
            <a href="#courses" className="px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wider hover:bg-gray-200 transition-colors neo-brutal shadow-lg hover:shadow-xl">
              View Courses
            </a>
            <a href="#about" className="px-8 py-4 border border-white/30 text-white font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm">
              Meet The Team
            </a>
          </div>
        </div>
      </header>

      {/* Infinite Marquee - Slight tilt for effect */}
      <div 
        className="bg-white/5 border-y border-white/10 py-4 overflow-hidden relative"
        style={{ transform: 'rotate(-1deg) scale(1.02)' }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-2xl font-black text-gray-700 uppercase font-mono tracking-widest">
              {item} <span className="text-dolas-red mx-4">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <section id="courses" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-4">
            <span className="w-12 h-1 bg-dolas-red"></span>
            SELECT YOUR PATH
            <span className="w-12 h-1 bg-maccus-blue"></span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {COURSES.map(course => (
              <CourseCard key={course.id} course={course} onEnroll={onEnroll} />
            ))}
          </div>
        </div>
      </section>

      {/* Founders Teaser */}
      <section id="about" className="py-24 border-t border-white/10 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16">POWERHOUSE PARTNERSHIP</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            <Link to="/about/dolas" className="group relative w-full md:w-1/3 aspect-square border border-white/10 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-dolas-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img src="https://picsum.photos/400/400?grayscale" alt="Dolas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-3xl font-black uppercase drop-shadow-lg">Dolas</h3>
                <p className="font-mono text-sm text-gray-300">Design Lead</p>
              </div>
            </Link>
            <Link to="/about/maccus" className="group relative w-full md:w-1/3 aspect-square border border-white/10 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-maccus-blue/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img src="https://picsum.photos/401/401?grayscale" alt="Maccus" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-3xl font-black uppercase drop-shadow-lg">Maccus</h3>
                <p className="font-mono text-sm text-gray-300">Tech Lead</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 font-mono text-sm">
        <p>© 2024 Dolas x Maccus Media. All systems nominal.</p>
        <p className="mt-2">Lagos, Nigeria.</p>
      </footer>
    </>
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
      <div className="bg-background min-h-screen text-white font-sans selection:bg-dolas-red selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home onEnroll={handleEnroll} />} />
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