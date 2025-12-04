import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BANK_DETAILS, WHATSAPP_NUMBER, COURSES } from '../constants';

const PaymentPortal: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  
  // Get user info passed from Sign In page, or default to generic
  const userInfo = location.state || { name: 'Student', email: '', courseInterest: '3d-animation' };
  
  // Find selected course or default to first
  const selectedCourse = COURSES.find(c => c.id === userInfo.courseInterest) || COURSES[0];

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    const message = `PAYMENT CONFIRMATION\n\nStudent: ${userInfo.name}\nEmail: ${userInfo.email}\nCourse: ${selectedCourse.title}\n\nI have made the transfer of ₦${selectedCourse.discountPrice.toLocaleString()}. Please verify.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-[0.1]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] animate-pulse-slow" />
      
      <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
        
        <div className="text-center mb-10">
           <div className="inline-block p-3 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
             <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </div>
           <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">Registration Received</h1>
           <p className="text-gray-400 font-mono">Welcome aboard, {userInfo.name}. Complete your enrollment below.</p>
        </div>

        <div className="glass-modern border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
           <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 mb-6 gap-4">
                 <div>
                    <span className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Selected Course</span>
                    <h3 className="text-xl font-bold text-white">{selectedCourse.title}</h3>
                 </div>
                 <div className="text-right">
                    <span className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Total Due</span>
                    <span className="text-3xl font-black text-dolas-cyan tracking-tight">₦{selectedCourse.discountPrice.toLocaleString()}</span>
                 </div>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-white/5 relative group hover:border-white/20 transition-colors">
                  <div className="absolute top-4 right-4 text-[10px] font-mono uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded">Verified Details</div>
                  
                  <div className="grid gap-6">
                      <div>
                          <label className="text-[10px] uppercase text-gray-500 tracking-widest block mb-1">Bank Name</label>
                          <div className="text-lg font-bold text-white">{BANK_DETAILS.bankName}</div>
                      </div>
                      <div>
                          <label className="text-[10px] uppercase text-gray-500 tracking-widest block mb-1">Account Number</label>
                          <div className="flex items-center gap-4">
                              <div className="text-3xl md:text-4xl font-mono font-black text-white tracking-widest">{BANK_DETAILS.accountNumber}</div>
                              <button 
                                onClick={handleCopyAccount}
                                className="p-2 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                              >
                                {copied ? (
                                    <span className="text-green-500 text-xs font-bold uppercase">Copied</span>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                )}
                              </button>
                          </div>
                      </div>
                      <div>
                          <label className="text-[10px] uppercase text-gray-500 tracking-widest block mb-1">Account Name</label>
                          <div className="text-lg font-bold text-white">{BANK_DETAILS.accountName}</div>
                      </div>
                  </div>
              </div>

              <div className="mt-8">
                  <button
                    onClick={handlePaymentConfirm}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-4 px-6 rounded-lg font-bold uppercase tracking-widest shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-3 group"
                  >
                      <span>I Have Made Payment</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4 font-mono">
                      Clicking this will open WhatsApp to confirm your transaction with our admin.
                  </p>
              </div>
           </div>
        </div>
        
        <div className="text-center mt-8">
             <Link to="/" className="text-sm font-mono text-gray-500 hover:text-white transition-colors">Return Home</Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentPortal;