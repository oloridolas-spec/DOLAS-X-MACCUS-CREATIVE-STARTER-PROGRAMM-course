import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white">
              DOLAS<span className="text-maccus-blue">x</span>MACCUS
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/about/dolas" className="text-gray-300 hover:text-dolas-red px-3 py-2 rounded-md text-sm font-medium transition-colors">Dolas</Link>
              <Link to="/about/maccus" className="text-gray-300 hover:text-maccus-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Maccus</Link>
              <a href="#courses" className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-sm text-sm font-bold font-mono transition-transform hover:-translate-y-0.5">
                GET STARTED
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about/dolas" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-dolas-red block px-3 py-2 rounded-md text-base font-medium">About Dolas</Link>
            <Link to="/about/maccus" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-maccus-blue block px-3 py-2 rounded-md text-base font-medium">About Maccus</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;