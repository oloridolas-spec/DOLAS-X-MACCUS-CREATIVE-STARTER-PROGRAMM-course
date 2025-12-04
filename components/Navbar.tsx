import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        <div className={`flex items-center justify-between h-14 px-6 rounded-full border transition-all duration-300 ${
          scrolled 
            ? 'glass-modern border-white/10 shadow-lg bg-black/40' 
            : 'bg-transparent border-transparent'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-1">
            <Link to="/" className="text-xl font-black tracking-tighter text-white font-mono group">
              DOLAS<span className="text-maccus-blue group-hover:text-dolas-red transition-colors">x</span>MACCUS
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              <Link to="/" className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${location.pathname === '/' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>Home</Link>
              <Link to="/about/dolas" className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${location.pathname.includes('dolas') ? 'text-dolas-red bg-dolas-red/10' : 'text-gray-400 hover:text-dolas-red hover:bg-white/5'}`}>Dolas</Link>
              <Link to="/about/maccus" className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${location.pathname.includes('maccus') ? 'text-maccus-blue bg-maccus-blue/10' : 'text-gray-400 hover:text-maccus-blue hover:bg-white/5'}`}>Maccus</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
             <Link 
              to="/signin"
              className="px-4 py-2 text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors"
             >
                PORTAL
             </Link>
            <a 
              href="#courses" 
              onClick={handleScrollToCourses}
              className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-full text-xs font-bold font-mono tracking-wider transition-transform hover:scale-105 active:scale-95"
            >
              ENROLL NOW
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 md:hidden glass-modern rounded-2xl border border-white/10 overflow-hidden animate-fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide">Home</Link>
            <Link to="/about/dolas" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-dolas-red hover:bg-white/5 block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide">Dolas</Link>
            <Link to="/about/maccus" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-maccus-blue hover:bg-white/5 block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide">Maccus</Link>
            <Link to="/signin" onClick={() => setIsOpen(false)} className="text-white bg-white/10 hover:bg-white/20 block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide font-mono text-center mt-2">Access Portal</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;