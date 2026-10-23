import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  MessageSquare
} from 'lucide-react';

const SYMPTOMS_LIST = [
  'Leaking when you laugh, cough, sneeze, exercise',
  'Urgent need to urinate (Can’t hold it)',
  'Frequent trips to the bathroom',
  'Waking up at night to urinate',
  'Leakage after childbirth',
  'Dribbling or incomplete bladder emptying',
  'Bladder leakage after surgery',
  'Pelvic pressure or fullness',
  'Pain in pelvic floor or lower abdomen',
  'Use of pads/liners'
];

const EFFECTS_LIST = [
  'Moody / Irritable',
  'Decision Making',
  'Poor Attitude',
  'Less Patience',
  'Hinders Exercise',
  'Interrupts Sleep',
  'Restricts Activities',
  'Fatigue'
];

const OTHER_CONDITIONS_LIST = [
  'NEUROPATHY',
  'JOINT PAIN',
  'OBESITY',
  'ERECTILE DYSFUNCTION'
];

export const ResearchSurveyModal = ({ isOpen: controlledIsOpen, onClose: controlledOnClose, showFloatingTrigger = true }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledOnClose !== undefined ? controlledOnClose : setInternalIsOpen;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    email: '',
    address: '',
    cityStateZip: '',
    symptoms: [],
    effects: [],
    otherConditions: [],
    handleProblem: 'YES',
    additionalNotes: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const recipientEmail = 'info@pelvic-vitality.com';

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleArrayItem = (category, item) => {
    setFormData(prev => {
      const current = prev[category];
      const exists = current.includes(item);
      return {
        ...prev,
        [category]: exists ? current.filter(i => i !== item) : [...current, item]
      };
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.age.trim()) errors.age = 'Age is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.cityStateZip.trim()) errors.cityStateZip = 'City/State/Zip is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildEmailContent = () => {
    const subject = `Submission from website - Pelvic Floor Research Survey (${formData.name || 'Patient'})`;
    const body = 
`PELVIC FLOOR RESEARCH SURVEY - SUBMISSION FROM WEBSITE
============================================================

PATIENT / APPLICANT INFORMATION
(Required due to liability insurance reasons)
------------------------------------------------------------
NAME:           ${formData.name}
PHONE:          ${formData.phone}
AGE:            ${formData.age}
EMAIL:          ${formData.email || 'Not provided'}
ADDRESS:        ${formData.address}
CITY/STATE/ZIP: ${formData.cityStateZip}


#1 WHICH OF THESE SYMPTOMS HAVE YOU EXPERIENCED IN THE PAST 6 MONTHS?
------------------------------------------------------------
${formData.symptoms.length > 0 ? formData.symptoms.map(s => `  [✓] ${s}`).join('\n') : '  (None selected)'}


#2 HOW DO THESE SYMPTOMS EFFECT YOU?
------------------------------------------------------------
${formData.effects.length > 0 ? formData.effects.map(e => `  [✓] ${e}`).join('\n') : '  (None selected)'}


#3 WE TREAT OTHER CONDITIONS IN OUR OFFICE - DO YOU SUFFER FROM THE FOLLOWING?
------------------------------------------------------------
${formData.otherConditions.length > 0 ? formData.otherConditions.map(c => `  [✓] ${c}`).join('\n') : '  (None selected)'}


#4 WOULD YOU LIKE TO HANDLE THIS PROBLEM?
------------------------------------------------------------
>> ${formData.handleProblem} <<


ADDITIONAL NOTES / QUESTIONS FOR CLINIC:
------------------------------------------------------------
${formData.additionalNotes || 'N/A'}

============================================================
Delivered to: ${recipientEmail}
2025 Copyright © Next Medical Technologies • Pelvic Vitality`;

    return { subject, body };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields indicated with (*).');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const { subject, body } = buildEmailContent();

    // 1. Gmail Web Compose URL (redirects straight to Gmail with To, Subject, Body filled in!)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 2. Standard Mailto URL (for Apple Mail, Outlook, default email clients)
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 3. Background form submission as safety net so the clinic never loses a lead
    try {
      fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          _replyto: formData.email || undefined,
          "Patient Name": formData.name,
          "Phone": formData.phone,
          "Age": formData.age,
          "Email": formData.email || 'N/A',
          "Address": formData.address,
          "City State Zip": formData.cityStateZip,
          "Symptoms": formData.symptoms.join('; ') || 'None',
          "Effects": formData.effects.join('; ') || 'None',
          "Other Conditions": formData.otherConditions.join('; ') || 'None',
          "Wants to Handle Problem": formData.handleProblem,
          "Additional Notes": formData.additionalNotes || 'N/A'
        })
      }).catch(() => {});
    } catch (err) {}

    // 4. Open Gmail in a new tab / redirect
    const newWindow = window.open(gmailUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // If popup blocked or on mobile, fallback to window.location
      window.location.href = mailtoUrl;
    }

    setStatus('success');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      age: '',
      email: '',
      address: '',
      cityStateZip: '',
      symptoms: [],
      effects: [],
      otherConditions: [],
      handleProblem: 'YES',
      additionalNotes: ''
    });
    setStatus('idle');
    setValidationErrors({});
  };

  return (
    <>
      {/* Floating Trigger Button where the old chatbot was (bottom-right fixed) */}
      {showFloatingTrigger && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
          
          {/* Dismissable speech bubble prompt */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-3 bg-white text-dark rounded-xl p-3.5 shadow-2xl border-2 border-primary/20 max-w-[260px] relative text-left"
              >
                <button
                  type="button"
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-2 right-2 text-dark/40 hover:text-dark text-xs p-1"
                  aria-label="Dismiss message"
                >
                  <X size={14} />
                </button>
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-primary">
                    Research Survey
                  </span>
                </div>
                <p className="text-xs font-body text-dark font-medium leading-snug">
                  Have pelvic symptoms? Click to complete our 2-minute Research Survey.
                </p>
                {/* Speech bubble arrow pointing down */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-primary/20 transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="flex items-center gap-3 bg-primary hover:bg-[#156161] text-white px-5 py-3.5 rounded-full shadow-2xl border-2 border-white transition-all duration-300 cursor-pointer group"
            aria-label="Open Pelvic Floor Research Survey"
          >
            <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:rotate-6 transition-transform">
              <ClipboardList size={20} className="text-primary" />
            </div>
            <div className="text-left pr-1">
              <span className="text-[10px] uppercase tracking-wider font-heading font-bold text-lime block leading-none">
                Confidential Intake
              </span>
              <span className="text-sm font-heading font-bold text-white block mt-0.5 leading-tight">
                Research Survey
              </span>
            </div>
          </motion.button>
        </div>
      )}

      {/* POPUP MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-white border-2 border-dark rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col z-10"
            >
              {/* Header reproducing the flyer aesthetic */}
              <div className="bg-dark text-white px-5 py-4 md:px-8 md:py-5 flex items-center justify-between border-b-4 border-primary shrink-0">
                <div>
                  <h3 className="text-xl md:text-3xl font-heading font-black tracking-tight text-white leading-none">
                    PELVIC FLOOR RESEARCH SURVEY
                  </h3>
                  <p className="text-[11px] font-body text-lime mt-1 font-semibold">
                    *(Required due to liability insurance reasons)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3"
                  aria-label="Close survey popup"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="overflow-y-auto p-5 md:p-8 flex-1">
                {status === 'success' ? (
                  /* Success View */
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={42} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl md:text-3xl font-heading font-bold text-dark">
                        Gmail Opened Successfully!
                      </h4>
                      <p className="text-sm md:text-base font-body text-dark/80 max-w-lg mx-auto">
                        Your survey answers have been automatically loaded into Gmail with the subject and full body formatted for <strong>{recipientEmail}</strong>.
                      </p>
                    </div>

                    <div className="bg-smoke rounded-xl p-5 text-left border border-gray-200 text-xs md:text-sm space-y-2 max-w-xl mx-auto font-body">
                      <div className="font-heading font-bold text-dark border-b pb-1.5 flex justify-between">
                        <span>Patient: {formData.name}</span>
                        <span className="text-primary">Age: {formData.age}</span>
                      </div>
                      <div><strong>Phone:</strong> {formData.phone}</div>
                      <div><strong>Address:</strong> {formData.address}, {formData.cityStateZip}</div>
                      <div><strong>Symptoms Selected:</strong> {formData.symptoms.length > 0 ? formData.symptoms.join('; ') : 'None'}</div>
                      <div><strong>How It Affects You:</strong> {formData.effects.length > 0 ? formData.effects.join('; ') : 'None'}</div>
                      <div><strong>Other Conditions:</strong> {formData.otherConditions.length > 0 ? formData.otherConditions.join('; ') : 'None'}</div>
                      <div><strong>Wants to Handle Problem:</strong> <span className="font-bold text-primary">{formData.handleProblem}</span></div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const { subject, body } = buildEmailContent();
                          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                          window.open(gmailUrl, '_blank');
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-opacity-90 text-white px-5 py-3 rounded-button font-heading font-bold text-sm transition-all cursor-pointer"
                      >
                        <ExternalLink size={16} /> Re-open in Gmail
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const { subject, body } = buildEmailContent();
                          window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-dark hover:bg-black text-white px-5 py-3 rounded-button font-heading font-bold text-sm transition-all cursor-pointer"
                      >
                        <Mail size={16} /> Open via Desktop Mail
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-dark px-4 py-3 rounded-button font-heading font-semibold text-sm transition-all cursor-pointer"
                      >
                        <RotateCcw size={16} /> Reset
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center gap-2 border border-gray-400 text-dark px-4 py-3 rounded-button font-heading font-semibold text-sm transition-all cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  /* The Exact Form from the flyer */
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Top Identity Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      {/* NAME */}
                      <div className="md:col-span-12">
                        <label className="text-xs font-heading font-bold text-dark flex justify-between mb-1">
                          <span>NAME: *</span>
                          {validationErrors.name && <span className="text-red-500 font-normal lowercase">{validationErrors.name}</span>}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Full Name"
                          className={`w-full px-3.5 py-2.5 rounded border-2 ${validationErrors.name ? 'border-red-500 bg-red-50/20' : 'border-dark'} focus:border-primary focus:outline-none font-body text-sm`}
                          required
                        />
                      </div>

                      {/* PHONE */}
                      <div className="md:col-span-8">
                        <label className="text-xs font-heading font-bold text-dark flex justify-between mb-1">
                          <span>PHONE: *</span>
                          {validationErrors.phone && <span className="text-red-500 font-normal lowercase">{validationErrors.phone}</span>}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(210) 000-0000"
                          className={`w-full px-3.5 py-2.5 rounded border-2 ${validationErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-dark'} focus:border-primary focus:outline-none font-body text-sm`}
                          required
                        />
                      </div>

                      {/* AGE */}
                      <div className="md:col-span-4">
                        <label className="text-xs font-heading font-bold text-dark flex justify-between mb-1">
                          <span>AGE: *</span>
                          {validationErrors.age && <span className="text-red-500 font-normal lowercase">{validationErrors.age}</span>}
                        </label>
                        <input
                          type="number"
                          name="age"
                          min="18"
                          max="115"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Age"
                          className={`w-full px-3.5 py-2.5 rounded border-2 ${validationErrors.age ? 'border-red-500 bg-red-50/20' : 'border-dark'} focus:border-primary focus:outline-none font-body text-sm`}
                          required
                        />
                      </div>

                      {/* EMAIL */}
                      <div className="md:col-span-12">
                        <label className="text-xs font-heading font-bold text-dark flex justify-between mb-1">
                          <span>EMAIL: (For follow-up)</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                          className="w-full px-3.5 py-2.5 rounded border-2 border-dark focus:border-primary focus:outline-none font-body text-sm"
                        />
                      </div>

                      {/* ADDRESS */}
                      <div className="md:col-span-12">
                        <label className="text-xs font-heading font-bold text-dark flex justify-between mb-1">
                          <span>ADDRESS: *</span>
                          {validationErrors.address && <span className="text-red-500 font-normal lowercase">{validationErrors.address}</span>}
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Street Address, Apt / Suite"
                          className={`w-full px-3.5 py-2.5 rounded border-2 ${validationErrors.address ? 'border-red-500 bg-red-50/20' : 'border-dark'} focus:border-primary focus:outline-none font-body text-sm`}
                          required
                        />
                      </div>

                      {/* CITY/STATE/ZIP */}
                      <div className="md:col-span-12">
                        <label className="text-xs font-heading font-bold text-dark flex justify-between mb-1">
                          <span>CITY/STATE/ZIP: *</span>
                          {validationErrors.cityStateZip && <span className="text-red-500 font-normal lowercase">{validationErrors.cityStateZip}</span>}
                        </label>
                        <input
                          type="text"
                          name="cityStateZip"
                          value={formData.cityStateZip}
                          onChange={handleInputChange}
                          placeholder="San Antonio, TX 78256"
                          className={`w-full px-3.5 py-2.5 rounded border-2 ${validationErrors.cityStateZip ? 'border-red-500 bg-red-50/20' : 'border-dark'} focus:border-primary focus:outline-none font-body text-sm`}
                          required
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-body italic text-dark/70 font-semibold">
                        *(Required due to liability insurance reasons)
                      </span>
                    </div>

                    {/* #1 SECTION */}
                    <div className="space-y-3 pt-2">
                      <div className="bg-dark text-white px-3.5 py-2 rounded flex items-center gap-2.5">
                        <span className="font-heading font-bold text-lime text-base">#1</span>
                        <h4 className="font-heading font-bold text-xs md:text-sm uppercase tracking-wide">
                          WHICH OF THESE SYMPTOMS HAVE YOU EXPERIENCED IN THE PAST 6 MONTHS?
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SYMPTOMS_LIST.map((symptom) => {
                          const checked = formData.symptoms.includes(symptom);
                          return (
                            <div
                              key={symptom}
                              onClick={() => toggleArrayItem('symptoms', symptom)}
                              className={`cursor-pointer border-2 rounded-lg p-2.5 transition-all flex items-start gap-2.5 select-none ${
                                checked 
                                  ? 'border-primary bg-primary/10 text-primary font-semibold shadow-xs' 
                                  : 'border-gray-300 hover:border-dark bg-white text-dark/85'
                              }`}
                            >
                              <span className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                                checked ? 'border-primary bg-primary' : 'border-gray-400'
                              }`}>
                                {checked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </span>
                              <span className="text-xs md:text-sm font-body leading-snug">
                                {symptom}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* #2 SECTION */}
                    <div className="space-y-3 pt-2">
                      <div className="bg-dark text-white px-3.5 py-2 rounded flex items-center gap-2.5">
                        <span className="font-heading font-bold text-lime text-base">#2</span>
                        <h4 className="font-heading font-bold text-xs md:text-sm uppercase tracking-wide">
                          HOW DO THESE SYMPTOMS EFFECT YOU?
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {EFFECTS_LIST.map((effect) => {
                          const checked = formData.effects.includes(effect);
                          return (
                            <div
                              key={effect}
                              onClick={() => toggleArrayItem('effects', effect)}
                              className={`cursor-pointer border-2 rounded-lg p-2.5 transition-all flex items-center gap-2 select-none text-center justify-center ${
                                checked 
                                  ? 'border-primary bg-primary text-white font-bold shadow-xs' 
                                  : 'border-gray-300 hover:border-dark bg-white text-dark/85 font-medium'
                              }`}
                            >
                              <span className="text-xs font-body leading-tight">
                                {effect}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* #3 SECTION */}
                    <div className="space-y-3 pt-2">
                      <div className="bg-dark text-white px-3.5 py-2 rounded flex items-center gap-2.5">
                        <span className="font-heading font-bold text-lime text-base">#3</span>
                        <h4 className="font-heading font-bold text-xs md:text-sm uppercase tracking-wide">
                          WE TREAT OTHER CONDITIONS IN OUR OFFICE - DO YOU SUFFER FROM THE FOLLOWING?
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {OTHER_CONDITIONS_LIST.map((cond) => {
                          const checked = formData.otherConditions.includes(cond);
                          return (
                            <div
                              key={cond}
                              onClick={() => toggleArrayItem('otherConditions', cond)}
                              className={`cursor-pointer border-2 rounded-lg p-2.5 transition-all text-center select-none ${
                                checked 
                                  ? 'border-primary bg-primary text-white font-bold shadow-xs' 
                                  : 'border-gray-300 hover:border-dark bg-white text-dark/85 font-medium'
                              }`}
                            >
                              <span className="text-xs font-heading tracking-wide uppercase">
                                {cond}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* #4 SECTION */}
                    <div className="space-y-3 pt-2">
                      <div className="bg-dark text-white px-3.5 py-2 rounded flex items-center gap-2.5">
                        <span className="font-heading font-bold text-lime text-base">#4</span>
                        <h4 className="font-heading font-bold text-xs md:text-sm uppercase tracking-wide">
                          WOULD YOU LIKE TO HANDLE THIS PROBLEM?
                        </h4>
                      </div>

                      <div className="flex gap-4">
                        {['YES', 'NO'].map((option) => {
                          const selected = formData.handleProblem === option;
                          return (
                            <label
                              key={option}
                              onClick={() => setFormData(prev => ({ ...prev, handleProblem: option }))}
                              className={`flex-1 py-3 border-2 rounded-lg text-center font-heading font-bold text-base md:text-lg cursor-pointer transition-all select-none ${
                                selected 
                                  ? 'bg-primary border-primary text-white shadow-sm' 
                                  : 'border-gray-300 hover:border-dark text-dark/80 bg-white'
                              }`}
                            >
                              <input
                                type="radio"
                                name="handleProblem"
                                value={option}
                                checked={selected}
                                onChange={() => {}}
                                className="sr-only"
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                      <div className="bg-red-50 border-2 border-red-500 rounded p-3 flex items-center gap-2.5 text-red-700 text-xs font-body">
                        <AlertCircle size={16} className="shrink-0 text-red-500" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Submit Section */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200">
                      <span className="text-[11px] text-dark/60 font-body">
                        Submitting redirects to <strong>Gmail</strong> with pre-filled body to: <strong>{recipientEmail}</strong>
                      </span>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-[#156161] text-white px-8 py-3.5 rounded-button font-heading font-bold text-base transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <Send size={18} />
                        <span>Submit & Open in Gmail</span>
                      </button>
                    </div>

                    <div className="text-center pt-2 border-t border-gray-100">
                      <span className="text-[10px] text-dark/40 font-body">
                        2025 Copyright © Next Medical Technologies
                      </span>
                    </div>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResearchSurveyModal;
