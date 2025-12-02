import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Simple Icons based on category
  const renderIcon = () => {
    if (course.icon === '3D') return (
      <svg className="w-8 h-8 text-dolas-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
    if (course.icon === 'Video') return (
      <svg className="w-8 h-8 text-maccus-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
    if (course.icon === 'Motion') return (
      <svg className="w-8 h-8 text-dolas-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
    // Default fallback
    return (
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage for glare
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Calculate rotation (max 12 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 }); // Reset to flat
  };

  return (
    <div 
      className="perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="group relative bg-surface border border-white/5 h-full transition-transform duration-100 ease-out preserve-3d shadow-2xl"
        style={{
          transform: isHovered 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        }}
      >
        {/* Dynamic Glare Effect */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`
          }}
        />

        {/* Hover Gradient Overlay (Static) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
        
        {/* Image - Pushed back slightly in Z space */}
        <div className="h-48 overflow-hidden preserve-3d">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
            style={{ transform: 'translateZ(-20px)' }}
          />
        </div>

        <div className="relative z-20 p-6 preserve-3d" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex justify-between items-start mb-4">
             <div className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-lg backdrop-blur-sm">
               {renderIcon()}
             </div>
             <div className="text-right">
               <div className="flex flex-col items-end">
                 <span className="text-[10px] text-dolas-red font-bold uppercase tracking-wide bg-dolas-red/10 px-2 py-0.5 rounded mb-1 border border-dolas-red/30 animate-pulse">
                   First 15 Only
                 </span>
                 <p className="text-xs text-gray-500 line-through font-mono">₦{course.price.toLocaleString()}</p>
                 <p className="text-xl font-bold text-white font-mono drop-shadow-lg">₦{course.discountPrice.toLocaleString()}</p>
               </div>
             </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 leading-tight drop-shadow-md">{course.title}</h3>
          <p className="text-gray-400 text-sm mb-6 line-clamp-2">{course.description}</p>

          <div className="flex gap-3 preserve-3d" style={{ transform: 'translateZ(20px)' }}>
            <button 
              onClick={() => onEnroll(course)}
              className="flex-1 bg-white text-black font-bold py-3 text-sm uppercase tracking-wider hover:bg-dolas-red hover:text-white transition-colors neo-brutal shadow-lg"
            >
              Enroll
            </button>
            <Link 
              to={`/courses/${course.id}`}
              className="px-4 py-3 border border-white/20 text-white hover:bg-white/10 transition-colors text-sm font-medium backdrop-blur-sm"
            >
              Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;