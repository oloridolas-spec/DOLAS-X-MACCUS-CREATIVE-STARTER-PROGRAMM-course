import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FORMSPREE_SIGNIN_ENDPOINT } from '../constants';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false); // New state for Forgot Password view
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetStatus, setResetStatus] = useState<'idle' | 'success'>('idle'); // Status for reset flow
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: '3d-animation'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isLogin) {
      // Simulator Login
      setTimeout(() => {
         setIsSubmitting(false);
         // Redirect to Payment Portal anyway for demo purposes, passing data
         navigate('/payment', { state: { name: 'Returning Student', email: formData.email, courseInterest: '3d-animation' } });
      }, 1500);
      return;
    }

    try {
      const response = await fetch(FORMSPREE_SIGNIN_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        // Redirect to Payment Portal with user data
        navigate('/payment', { state: formData });
      } else {
        alert("There was an issue submitting the form. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call for password reset
    setTimeout(() => {
      setIsSubmitting(false);
      setResetStatus('success');
    }, 2000);
  };

  const toggleMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setIsResetMode(false); // Reset the reset view when switching tabs
    setResetStatus('idle');
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-dolas-red rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-maccus-blue rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-[0.1]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Header Toggle */}
        <div className="flex mb-8 border-b border-white/10">
          <button
            onClick={() => toggleMode(false)}
            className={`flex-1 pb-4 text-center font-mono uppercase tracking-widest text-sm transition-colors relative ${!isLogin ? 'text-white font-bold' : 'text-gray-600 hover:text-gray-400'}`}
          >
            New Cadet
            {!isLogin && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-dolas-red shadow-[0_0_10px_#ff3333]" />}
          </button>
          <button
            onClick={() => toggleMode(true)}
            className={`flex-1 pb-4 text-center font-mono uppercase tracking-widest text-sm transition-colors relative ${isLogin ? 'text-white font-bold' : 'text-gray-600 hover:text-gray-400'}`}
          >
            Portal Login
            {isLogin && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-maccus-blue shadow-[0_0_10px_#00aaff]" />}
          </button>
        </div>

        {/* Form Container */}
        <div className="glass-modern p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group min-h-[450px] flex flex-col justify-center">
            {/* Hover Glow Effect */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isLogin ? 'from-maccus-blue to-purple-600' : 'from-dolas-red to-orange-500'}`} />

          {/* Conditional Rendering for Reset vs Normal Form */}
          {isResetMode ? (
            <div className="animate-fade-in">
               <div className="text-center mb-8">
                <h2 className="text-3xl font-black uppercase mb-2 tracking-tighter text-maccus-blue">
                  Recover Access
                </h2>
                <p className="text-gray-400 text-sm font-mono">
                  System locked? Enter your email to receive a reset link.
                </p>
              </div>

              {resetStatus === 'success' ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-bold">Link Sent Successfully</p>
                    <p className="text-xs text-gray-500 font-mono">Check your inbox for the reset protocol.</p>
                  </div>
                  <button 
                    onClick={() => { setIsResetMode(false); setResetStatus('idle'); }}
                    className="text-sm font-mono text-gray-400 hover:text-white underline"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePasswordReset} className="space-y-5">
                   <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Registered Email</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-black/40 border border-white/10 p-3 text-white outline-none transition-all rounded focus:bg-white/5 focus:border-maccus-blue"
                      placeholder="CADET@EXAMPLE.COM"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black hover:bg-maccus-blue hover:text-white font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.98] mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting...' : 'Send Reset Link'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsResetMode(false)}
                    className="w-full text-xs font-mono text-gray-500 hover:text-white mt-4"
                  >
                    CANCEL OPERATION
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black uppercase mb-2 tracking-tighter">
                  {isLogin ? 'Welcome Back' : 'Join The Ranks'}
                </h2>
                <p className="text-gray-400 text-sm font-mono">
                  {isLogin ? 'Enter your credentials to access the learning hub.' : 'Fill your details to initialize your profile.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      className="w-full bg-black/40 border border-white/10 p-3 text-white focus:border-dolas-red focus:bg-white/5 outline-none transition-all rounded"
                      placeholder="JOHN DOE"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    className={`w-full bg-black/40 border border-white/10 p-3 text-white outline-none transition-all rounded focus:bg-white/5 ${isLogin ? 'focus:border-maccus-blue' : 'focus:border-dolas-red'}`}
                    placeholder="CADET@EXAMPLE.COM"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {!isLogin && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        className="w-full bg-black/40 border border-white/10 p-3 text-white focus:border-dolas-red focus:bg-white/5 outline-none transition-all rounded"
                        placeholder="+234..."
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Area of Interest</label>
                      <select 
                          name="course"
                          className="w-full bg-black/40 border border-white/10 p-3 text-white focus:border-dolas-red focus:bg-white/5 outline-none transition-all rounded appearance-none"
                          value={formData.courseInterest}
                          onChange={e => setFormData({ ...formData, courseInterest: e.target.value })}
                      >
                          <option value="3d-animation">3D Animation (Blender)</option>
                          <option value="video-editing">Video Editing (Premiere)</option>
                          <option value="motion-design">Motion Design (After Effects)</option>
                      </select>
                    </div>
                  </>
                )}

                {isLogin && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Access Code / Password</label>
                    </div>
                    <input
                      type="password"
                      required
                      className="w-full bg-black/40 border border-white/10 p-3 text-white focus:border-maccus-blue focus:bg-white/5 outline-none transition-all rounded"
                      placeholder="••••••••"
                    />
                    <div className="flex justify-end pt-1">
                       <button 
                        type="button" 
                        onClick={() => setIsResetMode(true)}
                        className="text-[10px] font-mono text-gray-500 hover:text-maccus-blue transition-colors"
                       >
                         Forgot Password?
                       </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-wait ${
                    isLogin 
                      ? 'bg-white text-black hover:bg-maccus-blue hover:text-white' 
                      : 'bg-white text-black hover:bg-dolas-red hover:text-white'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : (isLogin ? 'Enter Portal' : 'Submit & Pay')}
                </button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-mono text-gray-600 hover:text-white transition-colors">
              ← RETURN TO HQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;