import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { INSTRUCTORS } from '../constants';

const AboutProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profile = id && INSTRUCTORS[id] ? INSTRUCTORS[id] : null;

  if (!profile) return <div>Profile Not Found</div>;

  const isDolas = profile.color === 'dolas';
  const accentColor = isDolas ? 'text-dolas-red' : 'text-maccus-blue';
  const bgColor = isDolas ? 'bg-dolas-red' : 'bg-maccus-blue';

  return (
    <div className="pt-20 min-h-screen bg-background relative overflow-hidden">
      {/* Background Blob */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${bgColor} rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob`} />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link to="/" className="text-gray-500 hover:text-white mb-8 inline-block font-mono text-sm">← BACK TO HQ</Link>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">{profile.name}</h1>
            <p className={`text-xl font-mono ${accentColor} mb-8`}>{profile.role}</p>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed border-l-2 border-white/10 pl-6">
              <p>
                {profile.bio}
              </p>
              <p>
                Driving the creative direction of the program, expecting nothing less than excellence from every student.
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className={`absolute inset-0 ${bgColor} opacity-20 translate-x-4 translate-y-4`} />
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-full grayscale contrast-125 brightness-90 relative z-10 border border-white/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProfile;