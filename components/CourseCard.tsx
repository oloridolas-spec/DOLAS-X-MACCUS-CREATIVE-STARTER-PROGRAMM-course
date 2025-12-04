import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  // Helper to determine theme colors based on course icon/category
  const getThemeColor = () => {
    switch (course.icon) {
      case '3D': return { hex: '#FF3333', glow: 'rgba(255, 51, 51, 0.4)' };     // Dolas Red
      case 'Video': return { hex: '#00AAFF', glow: 'rgba(0, 170, 255, 0.4)' };  // Maccus Blue
      case 'Motion': return { hex: '#FFA500', glow: 'rgba(255, 165, 0, 0.4)' }; // Orange
      default: return { hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.3)' };
    }
  };

  const theme = getThemeColor();

  const renderIcon = () => {
    if (course.icon === '3D') return (
      <svg className="w-6 h-6" style={{ color: theme.hex }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
    if (course.icon === 'Video') return (
      <svg className="w-6 h-6" style={{ color: theme.hex }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
    if (course.icon === 'Motion') return (
      <svg className="w-6 h-6" style={{ color: theme.hex }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
    return null;
  };

  return (
    <div className="group h-[450px] w-full perspective-1000">
      <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:[transform:rotateY(180deg)]">
        
        {/* === FRONT FACE === */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          {/* Image Container */}
          <div className="h-3/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            {/* Date Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10 shadow-lg">
                Dec 15-23
              </span>
            </div>
          </div>

          {/* Front Content */}
          <div className="p-6 h-2/5 flex flex-col justify-between relative z-20">
             <div>
                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter leading-none">
                  {course.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>
             </div>

             <div className="flex justify-between items-end border-t border-white/5 pt-4">
                 <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-wide mb-0.5">Early Bird</span>
                    <span className="text-xl font-bold text-white font-mono">₦{course.discountPrice.toLocaleString()}</span>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      Flip Info
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                 </div>
             </div>
          </div>
        </div>

        {/* === BACK FACE === */}
        <div 
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-black border border-white/10 rounded-2xl overflow-hidden p-6 flex flex-col justify-between"
            style={{ boxShadow: `inset 0 0 60px -10px ${theme.glow}` }}
        >
            <div>
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Highlights</h4>
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]">
                         {renderIcon()}
                    </div>
                </div>

                <ul className="space-y-4">
                    {course.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                            <span 
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]" 
                              style={{ backgroundColor: theme.hex, color: theme.hex }} 
                            />
                            <span className="leading-snug">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-3 pt-6">
                <button 
                  onClick={() => onEnroll(course)}
                  className="w-full py-3.5 bg-white text-black font-bold uppercase tracking-wide rounded hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98]"
                >
                  Enroll Now
                </button>
                <Link 
                  to={`/courses/${course.id}`}
                  className="block w-full text-center py-3 border border-white/20 text-white font-bold uppercase tracking-wide rounded hover:bg-white/5 transition-colors text-xs hover:border-white/40"
                >
                  View Syllabus
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;