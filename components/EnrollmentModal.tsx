import React, { useState, useEffect } from 'react';
import { Course, EnrollmentStep, BankDetails } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  bankDetails: BankDetails;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose, course, bankDetails }) => {
  const [step, setStep] = useState<EnrollmentStep>(EnrollmentStep.IDLE);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(EnrollmentStep.OPENING);
      setCopied(false);
      setIsSubmitting(false);
      // Simulate "Opening..." loading state
      const timer = setTimeout(() => {
        setStep(EnrollmentStep.FORM);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setStep(EnrollmentStep.IDLE);
    }
  }, [isOpen]);

  if (!isOpen || !course) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call or processing time
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(EnrollmentStep.PAYMENT);
    }, 1000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    // Generate WhatsApp message
    const message = `Hello, I've just paid for the *${course.title}* course.\n\nName: ${formData.name}\nEmail: ${formData.email}\nReference: WEB-${Date.now().toString().slice(-4)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Redirect
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-surface border border-white/20 w-full max-w-md p-6 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dolas-red to-maccus-blue" />
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white z-10">✕</button>

        {step === EnrollmentStep.OPENING && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-dolas-red border-r-maccus-blue border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-mono font-bold text-white tracking-widest">INITIALIZING...</h3>
          </div>
        )}

        {step === EnrollmentStep.FORM && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-1 text-white">Secure Your Seat</h2>
            <p className="text-gray-400 text-sm mb-6 font-mono">Step 1/2: Cadet Details</p>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">FULL NAME</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black/30 border border-gray-700 p-3 text-white focus:border-dolas-red outline-none transition-colors rounded-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  className="w-full bg-black/30 border border-gray-700 p-3 text-white focus:border-dolas-red outline-none transition-colors rounded-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">PHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-black/30 border border-gray-700 p-3 text-white focus:border-dolas-red outline-none transition-colors rounded-none"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-3 mt-4 hover:bg-gray-200 transition-colors uppercase font-mono disabled:opacity-50 disabled:cursor-wait"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        )}

        {step === EnrollmentStep.PAYMENT && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-1 text-white">Make Payment</h2>
            <p className="text-gray-400 text-sm mb-6 font-mono">Step 2/2: Transfer Funds</p>

            <div className="bg-white/5 p-5 border border-white/10 mb-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 opacity-50 text-[10px] uppercase font-mono">Verified Account</div>
              
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <span className="text-gray-400 text-sm font-mono uppercase">Amount Due</span>
                <span className="text-dolas-cyan font-bold text-2xl">₦{course.discountPrice.toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Bank Name</span>
                    <span className="text-white font-bold">{bankDetails.bankName}</span>
                </div>
                
                <div className="flex flex-col relative">
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Account Number</span>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-mono font-black tracking-widest text-white">{bankDetails.accountNumber}</span>
                        <button 
                            onClick={handleCopyAccount}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
                            title="Copy Account Number"
                        >
                            {copied ? (
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Account Name</span>
                    <span className="text-white font-bold tracking-wide">{bankDetails.accountName}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-gray-500 mb-4 font-mono">
              <span className="text-dolas-red">*</span> Make transfer then click below to confirm via WhatsApp.
            </p>

            <button
              onClick={handlePaymentConfirm}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 transition-all uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.4)] hover:shadow-[0_0_25px_rgba(22,163,74,0.6)]"
            >
              <span>I Have Made Payment</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentModal;