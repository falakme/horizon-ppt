import React, { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, useInView, useAnimation } from 'framer-motion';

// --- Shared Components ---

const SlideContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const baseWidth = 1280;
        const baseHeight = 720;
        const scale = Math.min(windowWidth / baseWidth, windowHeight / baseHeight);
        containerRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="h-screen w-full flex items-center justify-center snap-start relative bg-[#0a0a0a] overflow-hidden">
      <div 
        ref={containerRef}
        className={`slide-container w-[1280px] h-[720px] bg-[#17171d] relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex-shrink-0 origin-center ${className}`}
      >
        {children}
      </div>
    </section>
  );
};

const Footer: React.FC<{ slideNumber: number; totalSlides?: number }> = ({ slideNumber, totalSlides = 13 }) => (
  <>
    <div className="absolute bottom-8 left-8 text-gray-300 text-sm font-medium">
      {String(slideNumber).padStart(2, '0')} / {totalSlides}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-16 py-4 flex items-center justify-center gap-3 text-gray-300 text-xs z-20">
      <span><img src="https://falakme.github.io/brand-assets/logos/products/horizon.svg" alt="Horizon" className="h-2.5 invert opacity-90" /></span>
      <span className="w-1 h-1 rounded-full bg-slate-600"></span>
      <span><img src="https://falakme.github.io/brand-assets/logos/core/wordmark.svg" alt="Falak.me" className="h-2.5 invert opacity-90" /></span>
    </div>
  </>
);

const CountUp: React.FC<{ end: number; duration?: number; prefix?: string; suffix?: string; separator?: string }> = ({ end, duration = 2, prefix = "", suffix = "", separator = "," }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  const formatted = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return <span ref={nodeRef}>{prefix}{formatted}{suffix}</span>;
};

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.15 } }
};

// --- Slides ---

const Slide1_Title = () => (
  <SlideContainer className="text-white flex items-center justify-center selection:bg-[#5bc0de] selection:text-semibold">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center text-center"
    >
      <motion.h1 variants={fadeInUp} className="text-[8rem] font-semibold tracking-tighter mb-4">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5bc0de] to-[#a633d6]">
          Horizon
        </span>
      </motion.h1>
      <motion.p variants={fadeInUp} className="text-2xl text-gray-100 font-light mb-3 max-w-4xl mx-auto">
        The <span className="font-semibold text-white">Financial Infrastructure</span><br />
        for the Next Generation of GCC Founders
      </motion.p>
      <motion.p variants={fadeInUp} className="text-lg text-[#5bc0de] font-semibold mb-10">
        Compliant. Transparent. Built for Students.
      </motion.p>
      <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 text-white text-sm">
        <span><img src="https://falakme.github.io/brand-assets/logos/core/wordmark.svg" alt="Falak.me" className="h-3 invert" /></span>
        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
        <span>Dubai, UAE</span>
        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
        <span>January 2026</span>
      </motion.div>
    </motion.div>
    <div className="absolute bottom-8 left-8 text-gray-300 text-sm font-medium">01 / 13</div>
  </SlideContainer>
);

const Slide2_Problem = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center"
    >
      <motion.div variants={fadeInUp} className="text-center mb-8">
        <h2 className="text-5xl font-semibold mb-4">
          500M Dirhams Flow Through GCC Students.<br />
          <span className="text-[#ec3750] decoration-wavy underline decoration-red-500/30">None of it is Compliant.</span>
        </h2>
        <p className="text-xl text-gray-200">Student clubs, events, and charities operate in a financial black hole.</p>
      </motion.div>
      <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { iconClass: 'fa-lock', color: '#ec3750', title: 'Legal Blackout', text: 'Minors under 18 cannot open business bank accounts. Robotics clubs, charities, and student events are locked out of the financial system.' },
          { iconClass: 'fa-triangle-exclamation', color: '#ff8c37', title: 'Cash Chaos', text: 'Forced to use teachers\' personal accounts, shoebox cash, or WhatsApp transfers. Non-compliant, uninsured, and impossible to audit.' },
          { iconClass: 'fa-eye-slash', color: '#f1c40f', title: 'Zero Trust', text: 'Parents, schools, and sponsors refuse to fund initiatives they can\'t track. Students lose credibility before they even start.' }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            variants={fadeInUp}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition duration-300 group hover:-translate-y-2"
          >
            <div className={`w-16 h-16 bg-[${item.color}]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`} style={{ backgroundColor: `${item.color}33` }}>
              <i className={`fa-jelly fa-regular ${item.iconClass} w-[35px] h-[35px] text-2xl`} style={{ color: item.color }}></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-200 text-base">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    <Footer slideNumber={2} />
  </SlideContainer>
);

const Slide3_Personal = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center text-center"
    >
      <motion.div variants={fadeInUp} className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-5xl font-semibold mb-6 tracking-tight">This Problem Is Personal.</h2>
        <p className="text-xl text-gray-100 font-light">
          We developed products and hosted competitions at our school and saw firsthand how broken student finance is in the GCC.
        </p>
        <div className="mt-6">
          <span className="inline-block py-2 px-6 rounded-full bg-gradient-to-r from-[#5bc0de]/10 to-[#a633d6]/10 border border-white/10">
            <span className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#5bc0de] to-[#a633d6]">
              Horizon is the solution we wish we had.
            </span>
          </span>
        </div>
      </motion.div>
      <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        <motion.div variants={fadeInUp} className="relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-10 rounded-3xl text-left hover:border-[#ec3750]/40 transition duration-500 group">
          <div className="flex items-start gap-5">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-white">The Pain We Lived</h3>
              <p className="text-gray-200 text-sm">
                Waited weeks for teacher reimbursements. Used personal accounts for club purchases. Lost receipts in WhatsApp chats. <span className="text-[#ec3750]">It was chaos.</span>
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-10 rounded-3xl text-left hover:border-[#5bc0de]/40 transition duration-500 group">
          <div className="flex items-start gap-5">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Why We Can Build This</h3>
              <p className="text-gray-200 text-sm">
                We aren't guessing—we're executing. Having already shipped <strong className="text-white">GardenX</strong>, we know exactly how to build for this demographic at scale.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={3} />
  </SlideContainer>
);

const Slide4_RealWorld = () => (
  <SlideContainer className="text-white flex items-center justify-center relative">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ec3750]/5 rounded-full blur-[120px] pointer-events-none"></div>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex gap-12 items-center justify-center"
    >
      <motion.div variants={fadeInUp} className="w-1/2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec3750]/10 border border-[#ec3750]/20 text-[#ec3750] text-xs font-semibold tracking-widest uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ec3750] animate-pulse"></span>
          Real World Case Study
        </div>
        <h2 className="text-5xl font-semibold mb-6 leading-tight">The <span className="text-[#ec3750]">AED 35,000</span><br />Black Box.</h2>
        <p className="text-xl text-gray-100 font-light mb-8 leading-relaxed">
          A real example from our school's Senior Varsity Jacket collection.
          <br /><br />
          Thousands of Dirhams in loose cash were handed over to a single student.
          No ledger. No oversight. Just trust and a backpack.
        </p>
        <div className="flex items-start gap-4 p-4 rounded-xl bg-[#ec3750]/5 border border-[#ec3750]/10">
          <i className="fa-jelly fa-regular fa-triangle-exclamation text-[#ec3750] w-[35px] h-[35px] text-2xl mt-1 shrink-0"></i>
          <div>
            <h4 className="text-white font-semibold mb-1">The Risk</h4>
            <p className="text-sm text-gray-200">If that backpack was lost, or the cash mishandled, there was zero insurance and zero recourse. The money would simply vanish.</p>
          </div>
        </div>
      </motion.div>
      <motion.div variants={fadeInUp} className="w-1/2">
        <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
            <div className="text-center">
              <div className="text-4xl font-semibold text-white mb-1">
                <CountUp end={320} />
              </div>
              <div className="text-xs text-gray-300 uppercase tracking-widest">Students</div>
            </div>
            <div className="text-2xl text-gray-400">×</div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-white mb-1">
                <CountUp end={110} />
              </div>
              <div className="text-xs text-gray-300 uppercase tracking-widest">AED / Jacket</div>
            </div>
          </div>
          <div className="text-center mb-8">
            <div className="text-sm text-gray-200 mb-2">Total Cash Collected by 1 Student</div>
            <div className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ec3750] to-[#ff8c37]">
               AED <CountUp end={35200} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a]/50 p-4 rounded-xl text-center border border-white/5">
              <div className="text-xs text-gray-300 uppercase mb-1">Visibility</div>
              <div className="text-[#ec3750] font-semibold flex items-center justify-center gap-2">
                <i className="fa-jelly fa-regular fa-eye-slash w-[30px] h-[30px] text-xl"></i> None
              </div>
            </div>
            <div className="bg-[#0a0a0a]/50 p-4 rounded-xl text-center border border-white/5">
              <div className="text-xs text-gray-300 uppercase mb-1">Audit Trail</div>
              <div className="text-[#ec3750] font-semibold flex items-center justify-center gap-2">
                <i className="fa-jelly fa-regular fa-xmark w-[30px] h-[30px] text-xl"></i> Zero
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={4} />
  </SlideContainer>
);

const Slide5_Solution = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex gap-12 items-center justify-center"
    >
      <motion.div variants={fadeInUp} className="w-1/2">
        <h4 className="text-[#5bc0de] font-semibold uppercase tracking-widest mb-4">The Solution</h4>
        <h2 className="text-5xl font-semibold mb-6">Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5bc0de] to-[#a633d6]">Horizon</span></h2>
        <p className="text-2xl text-gray-100 mb-8 font-light">NeoBanking for GenAlpha</p>
        <ul className="space-y-6">
          <li className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#5bc0de]/20 flex items-center justify-center text-[#5bc0de]"><i className="fa-jelly fa-regular fa-shield w-[17.5px] h-[17.5px] text-l"></i></div>
            <span className="text-lg">Bank Accounts for Student Groups</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#5bc0de]/20 flex items-center justify-center text-[#5bc0de]"><i className="fa-jelly fa-regular fa-credit-card w-[17.5px] h-[17.5px] text-l"></i></div>
            <span className="text-lg">Virtual debit cards issued in 10 seconds</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#5bc0de]/20 flex items-center justify-center text-[#5bc0de]"><i className="fa-jelly fa-regular fa-eye w-[17.5px]  h-[17.5px] text-l"></i></div>
            <span className="text-lg">Every dirham tracked publicly</span>
          </li>
        </ul>
      </motion.div>
      <motion.div 
        variants={fadeInUp} 
        className="w-1/2 relative flex justify-center"
      >
        <div className="relative w-[450px] bg-gradient-to-r from-[#12162a] via-[#1b1033] to-[#2a0d3b] border border-white/10 rounded-2xl rounded-[2rem] p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500 hover:shadow-[0_0_30px_rgba(91,192,222,0.2)]">
          
          <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Current Balance</span>
          <span className="text-3xl font-semibold text-white mt-1">AED <CountUp end={12450} />.00</span>
          <span className="text-[#33d6a6] text-xs mt-1 font-medium bg-[#33d6a6]/10 px-2 py-0.5 rounded-full w-fit">+ AED 2,400 (Bake Sale)</span>
        </div>
          </div>

          <div className="bg-gradient-to-br from-[#a633d6] to-[#7c25a0] rounded-xl p-5 shadow-lg mb-6 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <span className="font-mono text-[10px] opacity-80 bg-white/20 px-2 py-0.5 rounded border border-white/10">Virtual Debit</span>
          <i className="fas fa-regular fa-wifi w-[35px] h-[35px] text-xl opacity-80"></i>
        </div>
        
        <div className="font-mono text-xl tracking-widest mb-6 relative z-10 text-shadow-sm">
          •••• •••• •••• 4092
        </div>
        
        <div className="flex justify-between items-end relative z-10">
          <div>
            <div className="text-[9px] opacity-60 uppercase tracking-wider mb-0.5">Card Holder</div>
            <div className="font-semibold text-sm">Robotics Club</div>
          </div>
          <div className="flex gap-2"><i className="fa-sharp fa-regular fa-circles-overlap fa-rotate-by text-3xl opacity-80" style={{ '--fa-rotate-angle': '-30deg' } as React.CSSProperties}></i>
            
          </div>
        </div>
          </div>

          <div className="space-y-3">
         <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#ec3750]/20 flex items-center justify-center text-[#ec3750]">
            <i className="fa-jelly fa-regular fa-triangle-exclamation w-[20px] h-[20px] text-l"></i>
          </div>
          <div className="text-left">
             <div className="text-xs text-white font-medium">Spend Limit</div>
             <div className="text-[10px] text-gray-400">Monthly Cap</div>
          </div>
            </div>
            <div className="text-xs font-semibold text-white">AED 3,000</div>
         </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={5} />
  </SlideContainer>
);

const Slide6_HowItWorks = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex gap-16 items-center justify-center"
    >
      <div className="w-3/4">
        <motion.h4 variants={fadeInUp} className="text-[#a633d6] font-semibold uppercase tracking-widest mb-3 text-sm">How It Works</motion.h4>
          <motion.h2 variants={fadeInUp} className="text-5xl font-semibold mb-5">Banking Infrastructure for Student Teams.</motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-200 mb-10">
            We use existing school and parent legal frameworks to unlock banking for student teams—no new trade licenses. Simple, compliant, fast.
          </motion.p>
        <div className="space-y-8">
          {[
              { iconClass: 'fa-building', title: "Verification via Trust Anchors", text: "We verify teams through school admins or a guardian/parent. This trust anchor satisfies KYC and unlocks banking instantly." },
              { iconClass: 'fa-credit-card', title: "Instant Virtual Debit Cards", text: "Leaders issue burnable cards in seconds. Spend limits keep budgets tight for supplies, travel, and events." },
              { iconClass: 'fa-book-open', title: "Public Transparency Ledger", text: "Enable read-only transparency mode so schools, parents, and sponsors can track every dirham." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="flex gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#a633d6] shrink-0 group-hover:scale-110 transition group-hover:bg-[#a633d6]/10">
                <i className={`fa-jelly fa-regular ${item.iconClass} w-[17.5px] h-[17.5px] text-l`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div variants={fadeInUp} className="w-1/4 relative">
        <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.6rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden transform hover:-translate-y-2 transition duration-500">
          <div className="flex-1 bg-gradient-to-b from-slate-950 via-[#0b0f1b] to-[#0a0a0f] p-3 pt-4 relative">
            

            <div className="absolute top-5 left-3 right-3 flex items-center justify-between text-[9px] text-gray-400">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33d6a6] shadow-[0_0_10px_rgba(51,214,166,0.6)]" />
                <span>Horizon</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10">9:41</span>
                <span className="w-4 h-2 rounded-sm bg-white/20" />
              </div>
            </div>

          

            <div className="mt-10 space-y-3">
              <div className="bg-gradient-to-r from-[#12162a] via-[#1b1033] to-[#2a0d3b] border border-white/10 rounded-xl p-3 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#5bc0de]/20 blur-2xl" />
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[9px] opacity-70 uppercase tracking-widest">Balance</div>
                  <div className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">Robotics</div>
                </div>
                <div className="text-lg font-semibold">AED 12,450.00</div>
                <div className="mt-2 text-[10px] text-[#33d6a6]">+ AED 2,400 this week</div>
              </div>

              <div className="bg-gradient-to-r from-[#a633d6] to-[#7c25a0] rounded-xl p-3 text-white shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] opacity-70">Horizon Virtual</div>
                  <i className="fas fa-regular fa-wifi w-[17.5px] h-[17.5px] text-l opacity-70"></i>
                </div>
                <div className="text-[15px] font-mono tracking-widest mb-3">•••• •••• •••• 4281</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] opacity-60 uppercase">Holder</div>
                    <div className="text-[12px] font-semibold">Robotics Club</div>
                  </div>
                  <div className="text-[10px] bg-white/15 px-2 py-1 rounded-full">Virtual</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-[9px] text-gray-300 uppercase">Spend Limit</div>
                  <div className="text-[12px] font-semibold text-white mt-1">AED 3,000</div>
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#5bc0de]" />
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-[9px] text-gray-300 uppercase">Active Cards</div>
                  <div className="text-[12px] font-semibold text-white mt-1">3 Cards</div>
                  <div className="mt-2 flex -space-x-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#5bc0de] border border-[#0b0f1b]" />
                    <span className="w-4.5 h-4.5 rounded-full bg-[#a633d6] border border-[#0b0f1b]" />
                    <span className="w-4.5 h-4.5 rounded-full bg-[#33d6a6] border border-[#0b0f1b]" />
                  </div>
                </div>
              </div>

              <div className="text-gray-200 text-[9px] uppercase font-semibold tracking-wider">Recent</div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex justify-between items-center">
                <div className="text-[12px]">Amazon.ae</div>
                <div className="text-[12px] text-white">- AED 120.00</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex justify-between items-center">
                <div className="text-[12px]">Zoom Market</div>
                <div className="text-[12px] text-white">- AED 45.50</div>
              </div>
            </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#5bc0de] rounded-full flex items-center justify-center shadow-lg shadow-[#5bc0de]/50 cursor-pointer hover:scale-110 transition">
              <i className="fas fa-regular fa-camera w-[17.5px] h-[17.5px] text-l text-semibold"></i>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={6} />
  </SlideContainer>
);

const Slide7_Dashboard = () => (
  <SlideContainer className="text-white flex items-center justify-center relative">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center text-center"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <h4 className="text-[#5bc0de] font-semibold uppercase tracking-widest mb-3 text-sm">For Schools & Parents</h4>
        <h2 className="text-5xl font-semibold mb-4">
          Unified Oversight.<br /><span className="text-gray-500">Every Transaction. Every Club. Real-Time.</span>
        </h2>
        <p className="text-xl text-gray-200">Full visibility with automatic fraud detection and compliance reporting.</p>
      </motion.div>
      <motion.div variants={fadeInUp} className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-2xl text-left max-w-5xl mx-auto transform hover:scale-[1.01] transition duration-500 w-full">
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ec3750]"></div>
            <div className="w-3 h-3 rounded-full bg-[#f1c40f]"></div>
            <div className="w-3 h-3 rounded-full bg-[#33d6a6]"></div>
            <span className="ml-4 font-mono text-sm text-gray-200">horizon.falak.me/admin/dashboard</span>
          </div>
          <div className="bg-[#5bc0de]/20 text-[#5bc0de] px-3 py-1 rounded text-xs font-semibold uppercase">Public Transparency Ledger</div>
        </div>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-1 space-y-2">
            <div className="bg-white/10 p-2 rounded text-sm font-semibold">Overview</div>
            <div className="text-gray-300 p-2 text-sm">Robotics Club</div>
            <div className="text-gray-300 p-2 text-sm">MUN Society</div>
            <div className="text-gray-300 p-2 text-sm">Charity Drive</div>
          </div>
          <div className="col-span-5">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="text-gray-200 text-sm">Total School Outflow (May)</div>
                <div className="text-3xl font-semibold">AED <CountUp end={45200} />.00</div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-2 bg-[#5bc0de] rounded-sm animate-pulse" style={{animationDelay: '0ms'}}></div>
                <div className="h-12 w-2 bg-[#5bc0de] rounded-sm animate-pulse" style={{animationDelay: '100ms'}}></div>
                <div className="h-6 w-2 bg-[#5bc0de] rounded-sm animate-pulse" style={{animationDelay: '200ms'}}></div>
                <div className="h-10 w-2 bg-[#5bc0de] rounded-sm animate-pulse" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-4 text-xs text-gray-300 uppercase font-semibold mb-3">
                <div>Club</div>
                <div>Merchant</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              <div className="grid grid-cols-4 text-sm py-3 border-t border-white/5 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#a633d6] rounded-full"></div>
                  Robotics
                </div>
                <div>Amazon AWS</div>
                <div>AED 150.00</div>
                <div className="text-[#33d6a6]">Approved</div>
              </div>
              <div className="grid grid-cols-4 text-sm py-3 border-t border-white/5 items-center bg-[#ec3750]/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#ff8c37] rounded-full"></div>
                  Grad Night
                </div>
                <div>Unknown Vendor</div>
                <div>AED 2,000.00</div>
                  <div className="flex items-center gap-2 text-[#ec3750]"> Flagged</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={7} />
  </SlideContainer>
);

const Slide8_Market = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center"
    >
      <motion.div variants={fadeInUp} className="text-center mb-8">
        <h2 className="text-5xl font-semibold mb-4">The UAE Student Economy is Massive<br />And Completely Unbanked.</h2>
        <p className="text-xl text-gray-200">1.2M+ students across 700+ private schools. Billions flow through clubs, events, and charities.</p>
      </motion.div>
      <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center group hover:bg-white/10 transition">
          <div className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2"><CountUp end={700} />+</div>
          <div className="h-1 w-16 bg-[#5bc0de] mx-auto mb-4 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-white mb-2">UAE Private Schools</h3>
          <p className="text-gray-200 text-sm">Initial market (expandable to 4,000+ across GCC)</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center group hover:bg-white/10 transition relative overflow-hidden">
          <div className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-700 mb-2"><CountUp end={1} />.2M+</div>
          <div className="h-1 w-16 bg-[#33d6a6] mx-auto mb-4 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-white mb-2">UAE Students</h3>
          <p className="text-gray-200 text-sm">Private school enrollment across all emirates</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center group hover:bg-white/10 transition">
          <div className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">2025</div>
          <div className="h-1 w-16 bg-[#a633d6] mx-auto mb-4 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-white mb-2">Vision Alignment</h3>
          <p className="text-gray-200 text-sm">UAE mandates Financial Literacy curriculum nationwide</p>
        </motion.div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={8} />
  </SlideContainer>
);

const Slide9_Revenue = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center"
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <h2 className="text-5xl font-semibold mb-3 tracking-tight">Three Revenue Streams.</h2>
        <p className="text-2xl text-gray-200 font-light">Sustainable monetization with <span className="text-white font-medium">zero upfront cost</span> to students.</p>
      </motion.div>
      <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-6 w-full max-w-6xl">
        <motion.div variants={fadeInUp} className="relative bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center hover:bg-white/10 transition duration-300 group">
          <div className="w-16 h-16 bg-[#338eda]/10 border border-[#338eda]/20 rounded-2xl flex items-center justify-center text-[#338eda] mb-6 shadow-[0_0_15px_rgba(51,142,218,0.2)] group-hover:shadow-[0_0_25px_rgba(51,142,218,0.4)] transition duration-300">
            <i className="fa-jelly fa-regular fa-credit-card w-[35px] h-[35px] text-3xl"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Top Up Fees</h3>
          <span className="inline-block px-3 py-1 rounded-full bg-[#338eda]/10 text-[#338eda] text-xs font-semibold tracking-wide uppercase mb-4">Volume Based</span>
          <div className="text-3xl font-semibold text-white mb-2">1%</div>
            <p className="text-gray-200 text-sm">
              Small fee on every top-up. Students and clubs can add funds instantly with a transparent 1% fee.
            </p>
        </motion.div>
        <motion.div variants={fadeInUp} className="relative bg-gradient-to-b from-white/10 to-white/5 border border-[#5bc0de]/30 p-8 rounded-3xl flex flex-col items-center text-center shadow-2xl shadow-cyan-900/20 transform scale-105 z-10">
          <div className="absolute -top-3 bg-gradient-to-r from-[#5bc0de] to-[#338eda] text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Primary Revenue</div>
          <div className="w-16 h-16 bg-[#5bc0de]/10 border border-[#5bc0de]/20 rounded-2xl flex items-center justify-center text-[#5bc0de] mb-6 shadow-[0_0_15px_rgba(91,192,222,0.3)]">
            <i className="fa-jelly fa-regular fa-landmark w-[35px] h-[35px] text-3xl"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2">SaaS Licensing</h3>
          <span className="inline-block px-3 py-1 rounded-full bg-[#5bc0de]/10 text-[#5bc0de] text-xs font-semibold tracking-wide uppercase mb-4">Recurring ARR</span>
          <div className="text-3xl font-semibold text-white mb-2">AED 15k<span className="text-lg text-gray-200 font-normal">/yr</span></div>
          <p className="text-gray-100 text-sm">Schools pay for the admin dashboard, audit tools, and compliance reporting.</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="relative bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center hover:bg-white/10 transition duration-300 group">
          <div className="w-16 h-16 bg-[#a633d6]/10 border border-[#a633d6]/20 rounded-2xl flex items-center justify-center text-[#a633d6] mb-6 shadow-[0_0_15px_rgba(166,51,214,0.2)] group-hover:shadow-[0_0_25px_rgba(166,51,214,0.4)] transition duration-300">
            <i className="fa-jelly fa-regular fa-ticket w-[35px] h-[35px] text-3xl"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Event Ticketing</h3>
          <span className="inline-block px-3 py-1 rounded-full bg-[#a633d6]/10 text-[#a633d6] text-xs font-semibold tracking-wide uppercase mb-4">Platform Fee</span>
          <div className="text-3xl font-semibold text-white mb-2">3 - 5%</div>
          <p className="text-gray-200 text-sm">Small fee on tickets sold for proms, bake sales, and concerts. Integrated directly into the app.</p>
        </motion.div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={9} />
  </SlideContainer>
);

const Slide10_Team = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center"
    >
      <motion.div variants={fadeInUp} className="text-center mb-10">
        <h2 className="text-5xl font-semibold mb-3 tracking-tight">We've Already Shipped at Scale.</h2>
        <p className="text-2xl text-gray-200 font-light">This isn't our first rodeo. We've built products real people use.</p>
      </motion.div>
      <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
        <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-[#5bc0de]/30 hover:bg-white/10 transition duration-300 group flex items-center gap-6">
          <div className="text-left">
            <h3 className="text-3xl font-semibold mb-1">AbdulRahman Maniar</h3>
            <p className="text-[#5bc0de] text-sm uppercase tracking-widest font-semibold mb-3">Product Lead</p>
            <p className="text-gray-200 text-sm">Designed the frontend architecture for GardenX. Built the infrastructure for 5+ school events.</p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-[#a633d6]/30 hover:bg-white/10 transition duration-300 group flex items-center gap-6">
          <div className="text-left">
            <h3 className="text-3xl font-semibold mb-1">Aman Sanoj</h3>
            <p className="text-[#a633d6] text-sm uppercase tracking-widest font-semibold mb-3">Tech Lead</p>
            <p className="text-gray-200 text-sm">Full-stack engineer. Scaled payment systems for student marketplaces.</p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div variants={fadeInUp} className="w-full max-w-5xl bg-gradient-to-r from-slate-900 to-slate-800 p-1 rounded-3xl border border-white/10 shadow-2xl">
        <div className="bg-[#0a0a0a]/80 rounded-[20px] px-10 py-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-1">Proven Track Record</span>
            <span className="text-xl font-semibold text-white">Co-founded <span className="text-[#33d6a6]">GardenX</span></span>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-1">Marketplace Type</span>
            <span className="text-xl text-gray-100">Farm-to-Family</span>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#33d6a6]/10 rounded-xl text-[#33d6a6]">
                <i className="fa-jelly fa-regular fa-box w-[25px] h-[25px] text-xl"></i>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white"> <span className="text-lg font-normal text-gray-200">AED</span> <CountUp end={300000} />+</div>
              <div className="text-xs text-gray-300 uppercase font-semibold mt-1">Revenue Generated</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={10} />
  </SlideContainer>
);

const Slide11_GardenXGraph = () => {
  const data = [
    { month: 'Nov 24', revenue: 5000, label: 'Launch' },
    { month: 'Dec 24', revenue: 12000, label: 'Winter Break' }, // Dip? Maybe holiday sales
    { month: 'Jan 25', revenue: 18000 },
    { month: 'Feb 25', revenue: 25000 },
    { month: 'Mar 25', revenue: 22000, label: 'Spring Break' }, // Dip
    { month: 'Apr 25', revenue: 28000 },
    { month: 'May 25', revenue: 35000, label: 'Peak Term' },
    { month: 'Jun 25', revenue: 30000 },
    { month: 'Jul 25', revenue: 5000, label: 'Summer' }, // Massive dip
    { month: 'Aug 25', revenue: 8000, label: 'Summer' },
    { month: 'Sep 25', revenue: 32000, label: 'Back to School' },
    { month: 'Oct 25', revenue: 38000 },
    { month: 'Nov 25', revenue: 42000 },
    { month: 'Dec 25', revenue: 45000, label: 'Target' },
  ];

  return (
    <SlideContainer className="text-white flex items-center justify-center">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative z-10 w-full h-full px-16 py-12 flex gap-12 items-center justify-center"
      >
        {/* Left Side: Context */}
        <motion.div variants={fadeInUp} className="w-1/3 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#33d6a6]/10 border border-[#33d6a6]/20 text-[#33d6a6] text-xs font-semibold tracking-widest uppercase mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#33d6a6] animate-pulse"></span>
            Proven Execution
          </div>
          <h2 className="text-5xl font-semibold mb-6">
            <span className="text-[#33d6a6]">GardenX</span> Growth
          </h2>
          <p className="text-xl text-gray-200 mb-8 font-light">
            We know how to navigate the school calendar. From launch to scale, managing logistics around exam seasons and holidays.
          </p>
          
          <div className="space-y-6">
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-[#33d6a6]/20 flex items-center justify-center text-[#33d6a6] shrink-0">
                   <i className="fa-jelly fa-regular fa-arrow-up w-[15px] h-[15px] text-l"></i>
               </div>
               <div>
                 <div className="text-3xl font-semibold text-white">AED ~<CountUp end={300} />k</div>
                 <div className="text-sm text-gray-400">Total Volume Processed</div>
               </div>
             </div>
             <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
               <p className="text-sm text-gray-300">
                 <strong className="text-white">Note:</strong> Revenue naturally fluctuates with school terms. We built operational resilience to handle the Summer lull and the September surge.
               </p>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Graph */}
        <motion.div variants={fadeInUp} className="w-2/3 h-full max-h-[500px] bg-[#0a0a0a]/50 border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute top-6 right-8 flex items-center gap-2">
                <div className="w-3 h-3 bg-[#33d6a6] rounded-full"></div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Monthly Revenue</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#33d6a6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#33d6a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis 
                    dataKey="month" 
                    stroke="#666" 
                    tick={{fill: '#888', fontSize: 12}} 
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                />
                <YAxis 
                    stroke="#666" 
                    tick={{fill: '#888', fontSize: 12}} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `AED ${value / 1000}k`}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#17171d', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#33d6a6' }}
                    formatter={(value: number) => [`AED ${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#33d6a6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    isAnimationActive={true}
                    animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
        </motion.div>
      </motion.div>
      <Footer slideNumber={11} />
    </SlideContainer>
  );
};

const Slide12_Competition = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center"
    >
      <motion.div variants={fadeInUp} className="text-center mb-8">
        <h2 className="text-5xl font-semibold mb-4 tracking-tight">We Own This Category.</h2>
        <p className="text-2xl text-gray-200">Horizon is the only banking platform built for GCC student teams, not individuals.</p>
      </motion.div>
      <motion.div variants={fadeInUp} className="relative bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl">
        <div className="grid grid-cols-5 bg-white/5 border-b border-white/10 p-5 text-center items-end">
          <div className="text-left font-semibold text-gray-300 uppercase">Feature</div>
          <div className="text-gray-200 font-semibold opacity-50">Cash Box</div>
          <div className="text-gray-200 font-semibold opacity-50">Traditional Bank</div>
          <div className="text-gray-200 font-semibold opacity-50">Zywa / Leap <span className="text-xs font-normal">(B2C Apps)</span></div>
          <div className="text-[#5bc0de] font-semibold text-xl tracking-tight relative">
            <span className="relative z-10">Horizon</span>
          </div>
        </div>
        {[
          {
            title: "Corporate Umbrella Coverage",
            sub: "Operate without a Trade License",
            cash: false, bank: false, b2c: false, horizon: true
          },
          {
            title: "Digital & Traceable",
            sub: "Audit-ready for Schools",
            cash: false, bank: true, b2c: true, horizon: true
          },
          {
            title: "Built for TEAMS",
            sub: "Multi-club cards & budgets",
            cash: false, bank: true, b2c: false, horizon: true
          },
          {
            title: "Public Transparency Ledger",
            sub: "Real-time public tracking",
            cash: false, bank: false, b2c: false, horizon: true
          }
        ].map((row, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeInUp}
            className="grid grid-cols-5 p-5 border-b border-white/5 items-center text-center hover:bg-white/5 transition last:border-0"
          >
            <div className="text-left font-semibold text-white">
              {row.title}<br /><span className="text-xs text-gray-300 font-normal">{row.sub}</span>
            </div>
              <div>{row.cash ? <i className="fa-jelly fa-regular fa-check mx-auto text-green-500 w-[35px] h-[35px] text-xl"></i> : <i className="fa-jelly fa-regular fa-xmark mx-auto text-[#ec3750] opacity-50 w-[35px] h-[35px] text-xl"></i>}</div>
            <div>{row.bank ? <i className="fa-jelly fa-regular fa-check mx-auto text-green-500 w-[35px] h-[35px] text-xl"></i> : <i className="fa-jelly fa-regular fa-xmark mx-auto text-[#ec3750] opacity-50 w-[35px] h-[35px] text-xl"></i>}</div>
            <div>{row.b2c ? <i className="fa-jelly fa-regular fa-check mx-auto text-green-500 w-[35px] h-[35px] text-xl"></i> : <i className="fa-jelly fa-regular fa-xmark mx-auto text-[#ec3750] opacity-50 w-[35px] h-[35px] text-xl"></i>}</div>
            <div>
              {row.horizon ? (
                <div className="w-8 h-8 bg-[#5bc0de] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#5bc0de]/50 scale-110">
                  <i className="fa-jelly fa-regular fa-check text-semibold w-[17.5px] h-[17.5px] text-l"></i>
                </div>
              ) : <i className="fa-jelly fa-regular fa-xmark mx-auto text-[#ec3750] opacity-50 w-[35px] h-[35px] text-xl"></i>}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    <Footer slideNumber={12} />
  </SlideContainer>
);

const Slide13_Future = () => (
  <SlideContainer className="text-white flex items-center justify-center">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative z-10 w-full h-full px-16 py-12 flex flex-col items-center justify-center text-center"
    >
      <motion.h2 variants={fadeInUp} className="text-7xl font-semibold mb-6 tracking-tight">The Future is on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5bc0de] to-[#a633d6]">Horizon</span></motion.h2>
      <motion.p variants={fadeInUp} className="text-2xl text-gray-100 font-light mb-16">
        We're building the <strong className="text-white font-semibold">financial infrastructure</strong> for the next generation of GCC founders.<br />
        <span className="text-[#5bc0de] font-medium">Compliant. Transparent. Built by students, for students.</span>
      </motion.p>
      <motion.div variants={staggerContainer} className="flex flex-col items-center gap-8">
        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
          <div className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#5bc0de] to-[#a633d6]">
            Let's Talk
          </div>
          <div className="text-2xl text-white font-medium tracking-wide">
            horizon@falak.me
          </div>
          <div className="text-lg text-gray-200">
            Dubai, UAE • January 2026
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="mt-4 text-gray-300 text-base font-medium border-t border-white/10 pt-6">
          AbdulRahman Maniar | Aman Sanoj<br />
        </motion.div>
      </motion.div>
    </motion.div>
    <Footer slideNumber={13} />
  </SlideContainer>
);

// --- Main App ---

export default function App() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#0a0a0a]">
      <Slide1_Title />
      <Slide2_Problem />
      <Slide3_Personal />
      <Slide4_RealWorld />
      <Slide5_Solution />
      <Slide6_HowItWorks />
      <Slide7_Dashboard />
      <Slide8_Market />
      <Slide9_Revenue />
      <Slide10_Team />
      <Slide11_GardenXGraph />
      <Slide12_Competition />
      <Slide13_Future />
    </main>
  );
}