import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES, INSTRUCTORS } from '../constants';
import { Course } from '../types';

interface CourseDetailProps {
  onEnroll: (course: Course) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ onEnroll }) => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="mb-6 text-gray-400">Course not found within the database.</p>
          <Link to="/" className="text-dolas-red hover:underline">Return to Base</Link>
        </div>
      </div>
    );
  }

  const instructor = INSTRUCTORS[course.instructorId];

  return (
    <div className="pt-20 pb-20 min-h-screen bg-background text-white">
      {/* Header Image */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">{course.title}</h1>
          <div className="flex gap-4 font-mono text-sm md:text-base">
             <span className="px-3 py-1 bg-dolas-red/20 border border-dolas-red text-dolas-red rounded">Dec 15-23</span>
             <span className="px-3 py-1 bg-white/10 border border-white/20 rounded">Online</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-dolas-orange block"></span>
                Mission Brief
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {course.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-maccus-blue block"></span>
                Curriculum Modules
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="bg-surface p-4 border border-white/10 flex items-center gap-4 hover:border-white/30 transition-colors">
                    <span className="font-mono text-gray-500">0{idx + 1}</span>
                    <span className="font-medium text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-gray-500 block"></span>
                System Requirements
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {course.prerequisites.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Enrollment Box */}
            <div className="bg-surface p-6 border border-white/20 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-400">Total Investment</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white font-mono">₦{course.discountPrice.toLocaleString()}</span>
                  <span className="text-lg text-gray-600 line-through font-mono">₦{course.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-xs text-dolas-red font-bold uppercase tracking-wide">
                  Early Bird Offer: First 15 People
                </div>
              </div>
              
              <button 
                onClick={() => onEnroll(course)}
                className="w-full bg-white text-black font-bold py-4 hover:bg-gray-200 transition-colors neo-brutal uppercase tracking-wider"
              >
                Secure Seat
              </button>
            </div>

            {/* Instructor */}
            {instructor && (
              <div className="border border-white/10 p-6">
                <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase">Instructor</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img src={instructor.image} alt={instructor.name} className="w-16 h-16 rounded-full object-cover grayscale" />
                  <div>
                    <h4 className="font-bold">{instructor.name}</h4>
                    <p className={`text-xs ${instructor.color === 'dolas' ? 'text-dolas-red' : 'text-maccus-blue'}`}>{instructor.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 italic">"{instructor.bio}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;