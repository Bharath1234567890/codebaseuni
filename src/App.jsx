// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import { 
//     Terminal, Cpu, Network, Server, 
//     ArrowRight, ChevronRight, X, 
//     Zap, Globe, ShieldCheck, MapPin, 
//     Menu, MousePointer2, CheckCircle2, 
//     BarChart3, Layers, Code
// } from 'lucide-react';

// // --- Styles & Fonts ----
// const customStyles = `
//     /* --- CSS Variables --- */
//     :root {
//         --bg-dark: #0B0D10;
//         --accent-red: #ff3333;
//         --text-primary: #FFFFFF;
//         --text-secondary: #9CA3AF;
//         --grid-line: rgba(255,255,255,0.03);
//     }

//     /* --- Reset & Base --- */
//     * {
//         box-sizing: border-box;
//     }

//     body {
//         background-color: var(--bg-dark);
//         color: var(--text-primary);
//         font-family: 'Inter', system-ui, -apple-system, sans-serif;
//         overflow-x: hidden;
//         margin: 0;
//         padding: 0;
//     }

//     h1, h2, h3, h4, h5, h6 {
//         font-family: 'Space Grotesk', system-ui, sans-serif;
//         letter-spacing: -0.02em;
//         margin: 0;
//     }

//     button {
//         cursor: pointer;
//         border: none;
//         background: none;
//         font-family: inherit;
//     }

//     a {
//         text-decoration: none;
//         color: inherit;
//     }

//     /* --- Utilities --- */
//     .mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
//     .text-accent { color: var(--accent-red); }
//     .text-secondary { color: var(--text-secondary); }
//     .text-center { text-align: center; }
//     .uppercase { text-transform: uppercase; }
//     .tracking-wide { letter-spacing: 0.1em; }
//     .flex { display: flex; }
//     .items-center { align-items: center; }
//     .justify-between { justify-content: space-between; }
//     .gap-2 { gap: 0.5rem; }
    
//     /* Custom Scrollbar */
//     ::-webkit-scrollbar { width: 6px; }
//     ::-webkit-scrollbar-track { background: var(--bg-dark); }
//     ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
//     ::-webkit-scrollbar-thumb:hover { background: var(--accent-red); }

//     /* --- Components --- */
    
//     /* Container */
//     .container {
//         max-width: 80rem; /* 7xl equivalent */
//         margin: 0 auto;
//         padding: 0 1.5rem;
//     }

//     /* Navbar */
//     .navbar {
//         position: fixed;
//         top: 0;
//         width: 100%;
//         z-index: 40;
//         padding: 1.5rem;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         background: transparent;
//         mix-blend-mode: difference;
//     }

//     .nav-logo {
//         font-size: 1.5rem;
//         font-weight: 700;
//         letter-spacing: -0.05em;
//         color: white;
//     }

//     .nav-links {
//         display: none;
//         gap: 2rem;
//         font-size: 0.75rem;
//         font-weight: 700;
//         letter-spacing: 0.1em;
//         color: #d1d5db;
//     }

//     .nav-links a:hover { color: var(--accent-red); }
    
//     .nav-mobile-btn {
//         display: block;
//         color: white;
//     }

//     @media (min-width: 768px) {
//         .nav-links { display: flex; }
//         .nav-mobile-btn { display: none; }
//     }

//     /* Hero Section */
//     .hero-section {
//         position: relative;
//         height: 100vh;
//         width: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         overflow: hidden;
//         background-color: var(--bg-dark);
//     }

//     .hero-bg {
//         position: absolute;
//         inset: 0;
//         z-index: 0;
//         opacity: 0.6;
//     }

//     .hero-content {
//         position: relative;
//         z-index: 10;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         text-align: center;
//     }

//     .hero-est {
//         font-size: 0.875rem;
//         letter-spacing: 0.3em;
//         margin-bottom: 1rem;
//         color: var(--accent-red);
//     }

//     .hero-title {
//         font-size: 4.5rem;
//         font-weight: 900;
//         letter-spacing: -0.05em;
//         line-height: 1;
//         margin-bottom: 1.5rem;
//         mix-blend-mode: overlay;
//         opacity: 0.9;
//     }

//     @media (min-width: 768px) {
//         .hero-title { font-size: 8rem; }
//     }

//     .hero-buttons {
//         display: flex;
//         gap: 1rem;
//         margin-top: 2rem;
//     }

//     .btn-primary {
//         padding: 0.75rem 2rem;
//         background-color: white;
//         color: black;
//         font-weight: 700;
//         border-radius: 9999px;
//         transition: background-color 0.2s;
//     }
//     .btn-primary:hover { background-color: #e5e7eb; }

//     .btn-outline {
//         padding: 0.75rem 2rem;
//         background-color: rgba(255, 51, 51, 0.1);
//         color: var(--accent-red);
//         border: 1px solid rgba(255, 51, 51, 0.5);
//         font-weight: 700;
//         border-radius: 9999px;
//         transition: all 0.2s;
//     }
//     .btn-outline:hover {
//         background-color: var(--accent-red);
//         color: white;
//     }

//     .hero-footer {
//         margin-top: 3rem;
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//         color: var(--accent-red);
//         font-size: 0.75rem;
//     }

//     .animate-pulse {
//         animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//     }
    
//     @keyframes pulse {
//         0%, 100% { opacity: 1; }
//         50% { opacity: 0.5; }
//     }

//     /* Programs Section */
//     .programs-section {
//         padding: 8rem 0;
//         background-color: var(--bg-dark);
//         position: relative;
//         z-index: 20;
//     }

//     .section-header {
//         display: flex;
//         justify-content: space-between;
//         align-items: flex-end;
//         margin-bottom: 5rem;
//         border-bottom: 1px solid rgba(255,255,255,0.1);
//         padding-bottom: 2rem;
//     }

//     .section-title {
//         font-size: 3rem;
//         font-weight: 700;
//         margin-bottom: 1rem;
//     }
//     @media (min-width: 768px) { .section-title { font-size: 4.5rem; } }

//     .programs-grid {
//         display: grid;
//         grid-template-columns: 1fr;
//         gap: 1.5rem;
//     }

//     @media (min-width: 768px) { .programs-grid { grid-template-columns: 1fr 1fr; } }
//     @media (min-width: 1024px) { .programs-grid { grid-template-columns: repeat(4, 1fr); } }

//     /* Glass Card */
//     .glass-card {
//         background: rgba(255, 255, 255, 0.02);
//         backdrop-filter: blur(10px);
//         border: 1px solid rgba(255, 255, 255, 0.05);
//         transition: all 0.3s ease;
//         padding: 2rem;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         height: 450px;
//         position: relative;
//         overflow: hidden;
//         cursor: pointer;
//     }

//     .glass-card:hover {
//         border-color: rgba(255, 51, 51, 0.5);
//         background: rgba(255, 51, 51, 0.02);
//     }

//     .card-glow {
//         position: absolute;
//         top: 0;
//         right: 0;
//         width: 16rem;
//         height: 16rem;
//         background-color: var(--accent-red);
//         opacity: 0;
//         filter: blur(80px);
//         border-radius: 9999px;
//         transform: translate(50%, -50%);
//         transition: opacity 0.3s;
//         pointer-events: none;
//     }
//     .glass-card:hover .card-glow { opacity: 0.05; }

//     .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    
//     .card-label {
//         font-size: 0.75rem;
//         color: #6b7280;
//         text-transform: uppercase;
//         letter-spacing: 0.1em;
//         border: 1px solid rgba(255,255,255,0.1);
//         padding: 0.25rem 0.5rem;
//         border-radius: 0.25rem;
//     }

//     .card-title { font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
//     .card-desc { font-size: 0.875rem; color: #9ca3af; line-height: 1.6; margin-bottom: 1rem; }
//     .card-duration { font-size: 0.75rem; color: var(--accent-red); letter-spacing: 0.05em; }

//     .card-btn {
//         margin-top: auto;
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//         font-size: 0.875rem;
//         font-weight: 700;
//         text-transform: uppercase;
//         letter-spacing: 0.05em;
//         color: white;
//         transition: color 0.2s;
//     }
//     .glass-card:hover .card-btn { color: var(--accent-red); }

//     /* Modal */
//     .modal-backdrop {
//         position: fixed;
//         inset: 0;
//         z-index: 100;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         padding: 1rem;
//         background: rgba(11, 13, 16, 0.85);
//         backdrop-filter: blur(12px);
//     }

//     .modal-container {
//         background-color: #0f1115;
//         border: 1px solid rgba(255,255,255,0.1);
//         width: 100%;
//         max-width: 64rem; /* 5xl */
//         max-height: 90vh;
//         overflow: hidden;
//         border-radius: 1rem;
//         display: flex;
//         flex-direction: column;
//         box-shadow: 0 25px 50px -12px rgba(255, 51, 51, 0.1);
//     }

//     .modal-header {
//         padding: 1.5rem;
//         border-bottom: 1px solid rgba(255,255,255,0.05);
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         background-color: var(--bg-dark);
//     }

//     .modal-close-btn {
//         padding: 0.5rem;
//         border-radius: 9999px;
//         color: white;
//         transition: background 0.2s;
//     }
//     .modal-close-btn:hover { background-color: rgba(255,255,255,0.05); }

//     .modal-body {
//         flex: 1;
//         overflow-y: auto;
//         padding: 2rem;
//         display: grid;
//         gap: 3rem;
//     }
//     @media (min-width: 768px) { .modal-body { grid-template-columns: 1fr 1fr; } }

//     .timeline {
//         position: relative;
//         padding-left: 2rem;
//         border-left: 1px dashed rgba(255,255,255,0.1);
//         display: flex;
//         flex-direction: column;
//         gap: 2rem;
//     }

//     .timeline-item { position: relative; }

//     .timeline-dot {
//         position: absolute;
//         left: -39px; /* Adjust based on padding/border */
//         top: 0.25rem;
//         width: 1.25rem;
//         height: 1.25rem;
//         border-radius: 9999px;
//         background-color: var(--bg-dark);
//         border: 2px solid var(--accent-red);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }

//     .timeline-dot-inner {
//         width: 0.375rem;
//         height: 0.375rem;
//         background-color: var(--accent-red);
//         border-radius: 9999px;
//     }

//     .stats-card {
//         background-color: rgba(255,255,255,0.05);
//         border-radius: 0.75rem;
//         padding: 1.5rem;
//         border: 1px solid rgba(255,255,255,0.05);
//         height: fit-content;
//         position: sticky;
//         top: 0;
//     }

//     .stats-grid {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 1rem;
//     }

//     .stat-box {
//         padding: 1rem;
//         background-color: rgba(0,0,0,0.4);
//         border-radius: 0.5rem;
//         text-align: center;
//         border: 1px solid rgba(255,255,255,0.05);
//     }

//     .stat-value { color: var(--accent-red); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
//     .stat-label { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }

//     .apply-btn {
//         width: 100%;
//         padding: 1rem;
//         background-color: var(--accent-red);
//         color: white;
//         font-weight: 700;
//         border-radius: 0.25rem;
//         text-transform: uppercase;
//         letter-spacing: 0.1em;
//         font-size: 0.875rem;
//         transition: background-color 0.2s;
//         margin-top: 2rem;
//     }
//     .apply-btn:hover { background-color: #dc2626; }

//     /* Reality Check */
//     .reality-section {
//         padding: 10rem 0;
//         background-color: black;
//         position: relative;
//         overflow: hidden;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }

//     .bg-text {
//         position: absolute;
//         font-size: 15vw;
//         font-weight: 900;
//         color: #1a1a1a;
//         white-space: nowrap;
//         user-select: none;
//         pointer-events: none;
//     }

//     /* Footer */
//     .footer {
//         background-color: var(--bg-dark);
//         padding-top: 5rem;
//         padding-bottom: 2.5rem;
//         border-top: 1px solid rgba(255,255,255,0.05);
//     }

//     .footer-grid {
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         align-items: flex-end;
//         gap: 2.5rem;
//     }
//     @media (min-width: 768px) { .footer-grid { flex-direction: row; } }
    
//     .social-links { display: flex; gap: 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; }
//     .social-links a:hover { color: white; }

//     .footer-bottom {
//         margin-top: 5rem;
//         padding-top: 2rem;
//         border-top: 1px solid rgba(255,255,255,0.05);
//         display: flex;
//         justify-content: space-between;
//         font-size: 0.625rem;
//         color: #4b5563;
//         text-transform: uppercase;
//     }
// `;

// // --- Particle Torus (Optimized for Stability) ---
// const ParticleTorus = () => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         let animationFrameId;
//         const particleCount = 600;
//         const particles = [];
//         let rotationX = 0;
//         let rotationY = 0;

//         const resize = () => {
//             if (canvas.parentElement) {
//                 canvas.width = canvas.parentElement.offsetWidth;
//                 canvas.height = canvas.parentElement.offsetHeight;
//             }
//         };
        
//         window.addEventListener('resize', resize);
//         resize();

//         const R = 300; 
//         const r = 100;  

//         for (let i = 0; i < particleCount; i++) {
//             const theta = Math.random() * Math.PI * 2;
//             const phi = Math.random() * Math.PI * 2;
            
//             particles.push({
//                 theta,
//                 phi,
//                 baseX: (R + r * Math.cos(theta)) * Math.cos(phi),
//                 baseY: (R + r * Math.cos(theta)) * Math.sin(phi),
//                 baseZ: r * Math.sin(theta),
//                 size: Math.random() * 2,
//                 color: Math.random() > 0.9 ? '#ff3333' : '#FFFFFF'
//             });
//         }

//         const animate = () => {
//             if (!canvas || !ctx) return;
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
            
//             const centerX = canvas.width / 2;
//             const centerY = canvas.height / 2;
            
//             rotationY += 0.005;
//             rotationX += 0.002;

//             particles.forEach(p => {
//                 let x = p.baseX;
//                 let y = p.baseY;
//                 let z = p.baseZ;

//                 let tempX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
//                 let tempZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
//                 x = tempX;
//                 z = tempZ;

//                 let tempY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
//                 tempZ = y * Math.sin(rotationX) + z * Math.cos(rotationX);
//                 y = tempY;
//                 z = tempZ;

//                 const scale = 500 / (500 + z);
//                 const projX = x * scale + centerX;
//                 const projY = y * scale + centerY;

//                 ctx.beginPath();
//                 ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
//                 ctx.fillStyle = p.color;
//                 ctx.globalAlpha = Math.max(0, Math.min(1, scale * (z > 0 ? 0.8 : 0.3)));
//                 ctx.fill();
//             });

//             animationFrameId = requestAnimationFrame(animate);
//         };

//         animate();

//         return () => {
//             window.removeEventListener('resize', resize);
//             if (animationFrameId) cancelAnimationFrame(animationFrameId);
//         };
//     }, []);

//     return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
// };

// // --- Modal Component with Realtime Infographics ---
// const CurriculumModal = ({ program, onClose }) => {
//     if (!program) return null;

//     return (
//         <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="modal-backdrop"
//             onClick={onClose}
//         >
//             <motion.div 
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 className="modal-container"
//                 onClick={e => e.stopPropagation()}
//             >
//                 {/* Modal Header */}
//                 <div className="modal-header">
//                     <div>
//                         <div className="mono text-accent" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{program.label} TRACK</div>
//                         <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginTop: '0.25rem' }}>{program.title}</h2>
//                         <span className="mono text-secondary" style={{ fontSize: '0.875rem' }}>{program.duration}</span>
//                     </div>
//                     <button onClick={onClose} className="modal-close-btn">
//                         <X size={24} />
//                     </button>
//                 </div>

//                 {/* Modal Content - Two Columns */}
//                 <div className="modal-body">
                    
//                     {/* Left: Syllabus Timeline */}
//                     <div>
//                         <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                             <Layers size={20} className="text-accent" /> 
//                             Module Roadmap
//                         </h3>
                        
//                         <div className="timeline">
//                             {program.detailedModules.map((module, idx) => (
//                                 <motion.div 
//                                     key={idx}
//                                     initial={{ opacity: 0, x: -20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: idx * 0.1 }}
//                                     className="timeline-item"
//                                 >
//                                     {/* Animated Dot */}
//                                     <div className="timeline-dot">
//                                         <div className="timeline-dot-inner animate-pulse"></div>
//                                     </div>
                                    
//                                     <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>{module.name}</h4>
//                                     <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                                         {module.topics.map((topic, tIdx) => (
//                                             <li key={tIdx} className="text-secondary" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
//                                                 <div style={{ marginTop: '0.375rem', width: '4px', height: '4px', backgroundColor: '#4b5563', borderRadius: '50%', flexShrink: 0 }}></div>
//                                                 <span style={{ lineHeight: 1.6 }}>{topic}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Right: Realtime Infographic / Stats */}
//                     <div className="stats-card">
//                         <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                             <BarChart3 size={20} className="text-accent" /> 
//                             Skill Distribution
//                         </h3>

//                         {/* Animated SVG Chart */}
//                         <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                             <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%' }}>
//                                 {/* Simulated Graph Lines */}
//                                 <motion.path 
//                                     d="M 10 90 Q 50 90 60 70 T 110 50 T 190 20" 
//                                     fill="none" 
//                                     stroke="#ff3333" 
//                                     strokeWidth="3"
//                                     initial={{ pathLength: 0 }}
//                                     animate={{ pathLength: 1 }}
//                                     transition={{ duration: 2, ease: "easeInOut" }}
//                                 />
//                                 <motion.path 
//                                     d="M 10 90 L 190 90" 
//                                     fill="none" 
//                                     stroke="rgba(255,255,255,0.1)" 
//                                     strokeWidth="1" 
//                                 />
//                                 {/* Data Points */}
//                                 <motion.circle cx="60" cy="70" r="3" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
//                                 <motion.circle cx="110" cy="50" r="3" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0 }} />
//                                 <motion.circle cx="190" cy="20" r="3" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
//                             </svg>
//                             <div className="mono text-secondary" style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', fontSize: '0.625rem' }}>TIME VS COMPLEXITY</div>
//                         </div>

//                         {/* Outcomes Grid */}
//                         <div className="stats-grid">
//                             <div className="stat-box">
//                                 <div className="stat-value">10+</div>
//                                 <div className="stat-label">Assignments</div>
//                             </div>
//                             <div className="stat-box">
//                                 <div className="stat-value">2</div>
//                                 <div className="stat-label">Major Projects</div>
//                             </div>
//                             <div className="stat-box">
//                                 <div className="stat-value">100%</div>
//                                 <div className="stat-label">Code Review</div>
//                             </div>
//                             <div className="stat-box">
//                                 <div className="stat-value">Job</div>
//                                 <div className="stat-label">Ready Portfolio</div>
//                             </div>
//                         </div>

//                         <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
//                             <button className="apply-btn">
//                                 Apply for Batch
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // --- Main Components ---

// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <div className="nav-logo mono">
//                 CODE<span className="text-accent">BASE</span>
//             </div>
            
//             <div className="nav-links mono">
//                 <a href="#home">HOME</a>
//                 <a href="#programs">PROGRAMS</a>
//                 <a href="#philosophy">PHILOSOPHY</a>
//                 <a href="#contact">CONTACT</a>
//             </div>

//             <div className="nav-mobile-btn">
//                 <Menu />
//             </div>
//         </nav>
//     );
// };

// const Hero = () => {
//     const { scrollY } = useScroll();
    
//     // Parallax logic: Text moves faster than background
//     const yText = useTransform(scrollY, [0, 500], [0, 100]);
//     const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

//     return (
//         <section id="home" className="hero-section">
            
//             {/* 1. Particle Torus in the background, centered */}
//             <div className="hero-bg">
//                 <ParticleTorus />
//             </div>

//             {/* 2. Central Typography */}
//             <motion.div 
//                 style={{ y: yText, opacity: opacityText }}
//                 className="hero-content"
//             >
//                 <div className="hero-est mono">EST. 2024 • KADAPA</div>
                
//                 <h1 className="hero-title">
//                     CODE<br/>BASE
//                 </h1>
                
//                 <div className="hero-buttons">
//                     <button className="btn-primary">
//                         Explore Programs
//                     </button>
//                     <button className="btn-outline">
//                         Our Vision
//                     </button>
//                 </div>

//                 <div className="hero-footer mono">
//                     <Zap size={14} className="animate-pulse" />
//                     <span>ENGINEERING EXCELLENCE</span>
//                 </div>
//             </motion.div>
//         </section>
//     );
// };

// const Programs = () => {
//     const [selectedProgram, setSelectedProgram] = useState(null);

//     // Curriculum Data
//     const programsData = [
//         {
//             title: "Coding School",
//             label: "Foundation",
//             duration: "4 Months (16 Weeks)",
//             icon: <Terminal className="text-accent" />,
//             description: "Master the fundamentals. From how memory works to building complex logic.",
//             detailedModules: [
//                 { 
//                     name: "Phase 1: The Machine (Weeks 1-4)", 
//                     topics: [
//                         "Computer Internals: Compiler vs Interpreter",
//                         "Language Basics: C / C++ / Python",
//                         "Control Flow, Loops & Pattern Logic",
//                         "Modular Programming & Functions"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 2: Core Programming (Weeks 5-8)", 
//                     topics: [
//                         "Arrays, Strings & Memory Layout",
//                         "Pointers (Stack vs Heap) & References",
//                         "Structures, Classes & Encapsulation",
//                         "Advanced OOP (Inheritance, Polymorphism)"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 3: CS Core (Weeks 9-12)", 
//                     topics: [
//                         "Data Structures: Linked Lists, Stacks, Queues",
//                         "Operating Systems: Processes & Scheduling",
//                         "Computer Networks: HTTP, TCP/IP, APIs",
//                         "Linux Command Line & Git/GitHub"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 4: Engineering (Weeks 13-16)", 
//                     topics: [
//                         "Project Architecture & Planning",
//                         "Major Project Implementation",
//                         "Code Reviews & Debugging",
//                         "Career Prep: Resume & Portfolios"
//                     ] 
//                 }
//             ]
//         },
//         {
//             title: "MERN Stack",
//             label: "Job Ready",
//             duration: "4-5 Months",
//             icon: <Globe className="text-accent" />,
//             description: "Build scalable web applications. Full stack mastery from frontend to cloud.",
//             detailedModules: [
//                 { 
//                     name: "Phase 1: Frontend Foundations", 
//                     topics: [
//                         "HTML5 Semantic Structure & Forms",
//                         "CSS3, Flexbox, Grid & Responsive Design",
//                         "JavaScript Core (ES6+), DOM, Async/Await"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 2: React Ecosystem", 
//                     topics: [
//                         "JSX, Components & Virtual DOM",
//                         "Hooks (useState, useEffect, Custom Hooks)",
//                         "State Management & API Integration"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 3: Backend Engineering", 
//                     topics: [
//                         "Node.js Runtime & Event Loop",
//                         "Express Framework & REST API Design",
//                         "Authentication (JWT) & Middleware"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 4: Data & Deploy", 
//                     topics: [
//                         "MongoDB Schema Design & CRUD",
//                         "Cloud Deployment (AWS/Vercel)",
//                         "2 Major Real-World Projects"
//                     ] 
//                 }
//             ]
//         },
//         {
//             title: "AI Engineering",
//             label: "Future Tech",
//             duration: "4-5 Months",
//             icon: <Cpu className="text-accent" />,
//             description: "Integrate intelligence into software. Python, LLMs, and RAG pipelines.",
//             detailedModules: [
//                 { 
//                     name: "Phase 1: Python Mastery", 
//                     topics: [
//                         "Advanced Python Syntax & OOP",
//                         "Modules, File Handling & Error Management",
//                         "Functional Programming in Python"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 2: Data & APIs", 
//                     topics: [
//                         "NumPy & Pandas for Data Analysis",
//                         "Data Cleaning & Preprocessing",
//                         "Building & Consuming Data APIs"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 3: AI Foundations", 
//                     topics: [
//                         "ML Concepts (Supervised/Unsupervised)",
//                         "Model Training Basics (No heavy math)",
//                         "Evaluation Metrics"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 4: Modern AI & Projects", 
//                     topics: [
//                         "LLM Basics & Prompt Engineering",
//                         "RAG (Retrieval Augmented Generation)",
//                         "Building AI Agents & Chatbots",
//                         "Capstone AI Project"
//                     ] 
//                 }
//             ]
//         },
//         {
//             title: "DevOps & Cloud",
//             label: "Infrastructure",
//             duration: "4 Months",
//             icon: <Server className="text-accent" />,
//             description: "Automate and scale. The backbone of modern internet services.",
//             detailedModules: [
//                 { 
//                     name: "Phase 1: Linux & Networking", 
//                     topics: [
//                         "Shell Scripting & Terminal Mastery",
//                         "Networking Fundamentals (DNS, Ports, IPs)",
//                         "Linux File Systems & Permissions"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 2: DevOps Core", 
//                     topics: [
//                         "Advanced Git Workflows",
//                         "CI/CD Concepts & Build Pipelines",
//                         "Automated Testing Integration"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 3: Containers & Cloud", 
//                     topics: [
//                         "Docker Containerization & Orchestration",
//                         "Cloud Services Overview (AWS)",
//                         "Server Management & Security"
//                     ] 
//                 },
//                 { 
//                     name: "Phase 4: Real Infrastructure", 
//                     topics: [
//                         "Monitoring, Logging & Alerts",
//                         "Infrastructure as Code (Intro)",
//                         "Production Deployment Project"
//                     ] 
//                 }
//             ]
//         }
//     ];

//     return (
//         <section id="programs" className="programs-section">
//             <div className="container">
//                 <div className="section-header">
//                     <div>
//                         <h2 className="section-title">TRACKS</h2>
//                         <p className="text-secondary" style={{ maxWidth: '28rem', lineHeight: 1.6 }}>Rigorous, outcome-driven curriculums designed for the modern industry.</p>
//                     </div>
//                     <div className="text-right" style={{ display: 'none' }}> {/* Hidden on mobile default, shown via CSS if needed, kept logic simple */}
//                         <div className="text-accent mono" style={{ fontSize: '1.25rem' }}>04</div>
//                         <div className="text-secondary" style={{ fontSize: '0.875rem' }}>ACTIVE PROGRAMS</div>
//                     </div>
//                 </div>

//                 <div className="programs-grid">
//                     {programsData.map((prog, idx) => (
//                         <motion.div 
//                             key={idx}
//                             whileHover={{ y: -10 }}
//                             className="glass-card group"
//                             onClick={() => setSelectedProgram(prog)}
//                         >
//                             <div className="card-glow"></div>
                            
//                             <div className="card-content">
//                                 <div className="card-header">
//                                     <span className="card-label mono">{prog.label}</span>
//                                     {prog.icon}
//                                 </div>
//                                 <h3 className="card-title">{prog.title}</h3>
//                                 <p className="card-desc">{prog.description}</p>
//                                 <span className="card-duration mono">{prog.duration}</span>
//                             </div>

//                             <button className="card-btn">
//                                 View Curriculum <ArrowRight size={16} />
//                             </button>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* Modal Injection */}
//             <AnimatePresence>
//                 {selectedProgram && (
//                     <CurriculumModal 
//                         program={selectedProgram} 
//                         onClose={() => setSelectedProgram(null)} 
//                     />
//                 )}
//             </AnimatePresence>
//         </section>
//     );
// };

// const RealityCheck = () => {
//     const { scrollYProgress } = useScroll();
//     const x = useTransform(scrollYProgress, [0, 1], [-200, 200]);

//     return (
//         <section className="reality-section">
//             {/* Background Moving Text */}
//             <motion.div 
//                 style={{ x }}
//                 className="bg-text"
//             >
//                 NO SHORTCUTS
//             </motion.div>

//             <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
//                 <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
//                     "We don't promise jobs.<br/>
//                     <span className="text-accent">We build people who get hired."</span>
//                 </h2>
//                 <p className="mono text-secondary" style={{ fontSize: '1.125rem' }}>
//                     // The Code Base Philosophy
//                 </p>
//             </div>
//         </section>
//     );
// };

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <div className="container">
//                 <div className="footer-grid">
//                     <div style={{ alignSelf: 'flex-start' }}>
//                         <div style={{ fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.05em', marginBottom: '1.5rem' }}>
//                             CODE<span className="text-accent">BASE</span>
//                         </div>
//                         <div className="mono text-secondary" style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                             <p>Thank you to our engineers for the support.</p>
//                             <p>Explore and collect skills to be part of the journey.</p>
//                             <a href="#" className="text-accent" style={{ textDecoration: 'underline', marginTop: '0.5rem' }}>✉ Contact Us</a>
//                         </div>
//                     </div>

//                     <div className="social-links">
//                         <a href="#">Instagram</a>
//                         <a href="#">Twitter</a>
//                         <a href="#">LinkedIn</a>
//                     </div>
//                 </div>

//                 <div className="footer-bottom mono">
//                     <span>© 2024 Code Base Institute</span>
//                     <span>Terms of Use</span>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default function App() {
//     useEffect(() => {
//         document.title = "CODE BASE | Creative Engineering";
//     }, []);

//     return (
//         <div className="app-container">
//             <style>{customStyles}</style>
//             <Navbar />
//             <Hero />
//             <Programs />
//             <RealityCheck />
//             <Footer />
//         </div>
//     );
// }





import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { 
    Terminal, Cpu, Network, Server, 
    ChevronRight, X, Zap, Globe, 
    BarChart3, Layers, CheckCircle2, 
    Menu, GraduationCap, Briefcase,
    ClipboardList, FolderKanban, Mic,
    Target, RefreshCcw, Code, GitBranch,
    Package, Database, Layout, Share2,
    Activity, Search, Award, Palette,
    Brain, Sparkles, Wifi, Box, Gauge,
    Rocket , Cloud
} from 'lucide-react';

// --- Styles (Standard CSS) ---
const customStyles = `
    /* --- CSS Variables --- */
    :root {
        --bg-dark: #050505;
        --card-bg: #0f0f0f;
        --accent-red: #E50914; /* Cinematic Red */
        --text-primary: #FFFFFF;
        --text-secondary: #A3A3A3;
        --border-color: rgba(255, 255, 255, 0.1);
        --font-heading: 'Space Grotesk', sans-serif;
        --font-body: 'Inter', sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
    }

    /* --- Reset --- */
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    
    body {
        background-color: var(--bg-dark);
        color: var(--text-primary);
        font-family: var(--font-body);
        overflow-x: hidden;
    }

    h1, h2, h3, h4 { font-family: var(--font-heading); letter-spacing: -0.02em; }
    button { cursor: pointer; border: none; background: none; font-family: inherit; color: inherit; }
    a { text-decoration: none; color: inherit; }

    /* --- Utilities --- */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .text-center { text-align: center; }
    .uppercase { text-transform: uppercase; }
    .flex-center { display: flex; align-items: center; justify-content: center; }
    .mono { font-family: var(--font-mono); }
    .text-accent { color: var(--accent-red); }
    .text-secondary { color: var(--text-secondary); }
    
    /* Animations */
    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    .animate-pulse { animation: pulse 3s infinite; }

    /* --- Navbar --- */
    .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        padding: 1.5rem 0;
        background: linear-gradient(to bottom, rgba(5,5,5,0.95), transparent);
        backdrop-filter: blur(8px);
    }
    .nav-content { display: flex; justify-content: space-between; align-items: center; }
    .nav-logo { font-size: 1.5rem; font-weight: 900; letter-spacing: -1px; }
    .nav-links { display: none; gap: 2rem; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; }
    .nav-links a:hover { color: var(--accent-red); text-shadow: 0 0 10px var(--accent-red); transition: 0.3s; }
    .nav-toggle { display: block; }
    
    @media (min-width: 768px) {
        .nav-links { display: flex; }
        .nav-toggle { display: none; }
    }

    /* --- Hero Section --- */
    .hero-section {
        position: relative;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .hero-canvas { position: absolute; inset: 0; z-index: 0; }
    .hero-overlay {
        position: absolute; inset: 0; z-index: 1;
        background: radial-gradient(circle at center, transparent 0%, var(--bg-dark) 90%);
    }
    .hero-content { position: relative; z-index: 10; text-align: center; max-width: 800px; padding: 0 20px; }
    
    .hero-subtitle {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        letter-spacing: 0.4em;
        color: var(--accent-red);
        margin-bottom: 1.5rem;
        font-weight: 700;
        text-shadow: 0 0 20px rgba(229, 9, 20, 0.6);
    }
    
    .hero-title {
        font-size: 3.5rem; /* Mobile optimized */
        font-weight: 900;
        line-height: 0.95;
        margin-bottom: 2rem;
        background: linear-gradient(180deg, #fff, #666);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    @media (min-width: 768px) { .hero-title { font-size: 8rem; } }

    .hero-btn-group { display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center; width: 100%; }
    @media (min-width: 768px) { .hero-btn-group { flex-direction: row; width: auto; } }

    .btn {
        padding: 1rem 2.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-radius: 4px;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        width: 100%;
    }
    @media (min-width: 768px) { .btn { width: auto; } }

    .btn-primary {
        background: var(--accent-red);
        color: white;
        box-shadow: 0 0 20px rgba(229, 9, 20, 0.4);
    }
    .btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 40px rgba(229, 9, 20, 0.6); }
    
    .btn-outline {
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
    }
    .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

    /* --- XP Widget --- */
    .xp-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        border: 1px solid var(--border-color);
        padding: 12px;
        border-radius: 6px;
        z-index: 90;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        backdrop-filter: blur(10px);
    }
    .xp-bar { width: 120px; height: 4px; background: rgba(255,255,255,0.1); margin: 6px 0; border-radius: 2px; }
    .xp-fill { height: 100%; background: var(--accent-red); width: 0%; transition: width 0.3s; box-shadow: 0 0 8px var(--accent-red); }

    /* --- Programs Section --- */
    .programs-section { padding: 6rem 0; position: relative; z-index: 10; }
    
    .section-header { text-align: center; margin-bottom: 4rem; }
    .section-title { font-size: 2.5rem; font-weight: 900; text-transform: uppercase; margin-bottom: 1rem; }
    .section-divider { width: 60px; height: 4px; background: var(--accent-red); margin: 0 auto 1.5rem auto; border-radius: 2px; }
    
    /* Credibility Block */
    .credibility-block {
        margin: 2rem auto 0;
        padding: 1.5rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 90%;
    }
    .credibility-icons { display: flex; align-items: center; gap: 1rem; color: var(--accent-red); }
    .credibility-dot { width: 4px; height: 4px; background: #666; border-radius: 50%; }
    .credibility-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; }
    .highlight { color: #fff; font-weight: 700; }

    .programs-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    @media (min-width: 768px) { .programs-grid { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 1024px) { .programs-grid { grid-template-columns: repeat(4, 1fr); } }

    .program-card {
        background: linear-gradient(180deg, #111, #0a0a0a);
        border: 1px solid var(--border-color);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        height: 480px; /* Desktop Height */
        justify-content: space-between;
        transition: transform 0.3s, border-color 0.3s;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .program-card:hover { transform: translateY(-10px); border-color: var(--accent-red); }
    
    /* Mobile Card Optimization */
    @media (max-width: 768px) {
        .program-card {
            height: auto;
            min-height: 420px;
            padding: 1.5rem;
        }
    }

    .card-icon {
        width: 80px; height: 80px;
        background: rgba(255,255,255,0.03);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 1.5rem;
        border: 1px solid transparent;
        transition: 0.3s;
    }
    .program-card:hover .card-icon { background: rgba(229, 9, 20, 0.1); border-color: var(--accent-red); color: var(--accent-red); }
    
    .card-label { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 0.5rem; }
    .card-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
    .card-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }
    .card-footer { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; margin-top: 1.5rem; }

    /* --- Modal --- */
    .modal-backdrop {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(0,0,0,0.9);
        backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        padding: 10px; /* Reduced padding for mobile */
    }
    .modal-container {
        width: 100%; max-width: 1000px;
        background: #0a0a0a;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        overflow: hidden;
        max-height: 90vh;
        display: flex; flex-direction: column;
        box-shadow: 0 0 60px rgba(229, 9, 20, 0.15);
    }
    /* Mobile Modal Fullscreen-ish */
    @media (max-width: 768px) {
        .modal-container {
            height: 95vh;
            border-radius: 8px;
        }
        .modal-header h2 { font-size: 1.5rem; }
    }

    .modal-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--border-color);
        display: flex; justify-content: space-between; align-items: center;
        background: #0e0e0e;
    }
    .modal-body {
        padding: 2rem;
        overflow-y: auto;
        display: grid;
        gap: 3rem;
    }
    @media (min-width: 768px) { .modal-body { grid-template-columns: 1.2fr 0.8fr; } }
    @media (max-width: 768px) { 
        .modal-body { 
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        } 
    }

    /* Timeline Styles (Dashed & Glowing Nodes) */
    .timeline-container { position: relative; padding-left: 20px; }
    
    .timeline-line {
        position: absolute; left: 7px; top: 8px; bottom: 0;
        width: 0;
        border-left: 2px dashed rgba(255, 255, 255, 0.1);
    }
    
    .timeline-item { position: relative; padding-left: 30px; margin-bottom: 2.5rem; }
    
    /* The Glowing Node */
    .timeline-node {
        position: absolute; left: -1px; top: 0px;
        width: 16px; height: 16px;
        background: var(--bg-dark); /* Covers the dashed line behind it */
        border: 2px solid var(--accent-red);
        border-radius: 50%;
        box-shadow: 0 0 12px rgba(229, 9, 20, 0.6); /* Red Glow */
        z-index: 2;
        display: flex; align-items: center; justify-content: center;
    }
    
    /* Inner Dot */
    .timeline-node::after {
        content: '';
        width: 6px; height: 6px;
        background: var(--accent-red);
        border-radius: 50%;
    }

    .module-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: white; }
    .module-list { list-style: none; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }
    .module-list li { margin-bottom: 4px; display: flex; align-items: flex-start; gap: 8px; }
    .module-list li::before { content: "›"; color: var(--accent-red); font-weight: bold; line-height: 1.6; }

    /* Modal Right Column */
    .modal-stats { background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; }
    
    /* The Graph Container */
    .graph-container {
        width: 100%;
        height: 150px;
        margin-bottom: 2rem;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        border-left: 1px solid rgba(255,255,255,0.1);
        padding: 10px;
    }
    .graph-svg { width: 100%; height: 100%; overflow: visible; }
    
    /* Graph Animations */
    .graph-path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: drawGraph 2s ease-out forwards;
    }
    @keyframes drawGraph { to { stroke-dashoffset: 0; } }

    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
    .stat-box { background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 6px; text-align: center; border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .stat-value { font-size: 1.5rem; font-weight: 900; color: var(--accent-red); margin: 0.5rem 0 0.25rem 0; }
    .stat-label { font-size: 0.65rem; text-transform: uppercase; color: #666; letter-spacing: 1px; }
    .stat-icon { color: var(--accent-red); opacity: 0.8; }

    /* --- Reality Check --- */
    .reality-section {
        padding: 8rem 0;
        background: #000;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    .parallax-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) translateZ(0);
        font-size: 12vw;
        font-weight: 900;
        color: rgba(243, 237, 231, 0.04);
        letter-spacing: -0.03em;
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        z-index: 0;
        transition: transform 0.15s linear;
        will-change: transform;
    }
    .reality-content { position: relative; z-index: 10; max-width: 900px; padding: 0 1rem; }
    .quote-main { font-size: 3rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; color: #fff; }
    @media (max-width: 768px) { .parallax-text { font-size: 20vw; } }
    @media (max-width: 768px) { .quote-main { font-size: 2rem; } }

    /* --- Footer --- */
    .footer { padding: 4rem 0; border-top: 1px solid var(--border-color); background: #020202; }
    .footer-content { display: flex; flex-direction: column; align-items: center; gap: 2rem; text-align: center; }
    @media (min-width: 768px) { .footer-content { flex-direction: row; justify-content: space-between; text-align: left; } }
    
    .social-row { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
    .social-link { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #666; transition: 0.3s; }
    .social-link:hover { color: var(--accent-red); }

    /* --- Mobile Menu --- */
    .mobile-menu {
        position: fixed; inset: 0; background: var(--bg-dark); z-index: 150;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
    }
    .mobile-link { font-size: 2rem; font-weight: 700; font-family: var(--font-heading); color: white; }
`;

// --- Canvas Component (Space Background) ---
const SpaceCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let animationId;

        const stars = [];
        const comets = [];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            
            stars.length = 0;
            for(let i=0; i<300; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 2,
                    opacity: Math.random(),
                    speed: Math.random() * 0.2
                });
            }
        };
        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'white';
            stars.forEach(star => {
                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                star.y += star.speed;
                if(star.y > height) star.y = 0;
            });

            if(Math.random() > 0.98) {
                comets.push({
                    x: Math.random() * width,
                    y: -50,
                    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
                    speed: Math.random() * 10 + 5,
                    length: Math.random() * 100 + 50
                });
            }

            ctx.lineWidth = 2;
            for(let i=comets.length-1; i>=0; i--) {
                const c = comets[i];
                const endX = c.x - Math.cos(c.angle) * c.length;
                const endY = c.y - Math.sin(c.angle) * c.length;
                
                const grad = ctx.createLinearGradient(c.x, c.y, endX, endY);
                grad.addColorStop(0, 'white');
                grad.addColorStop(1, 'transparent');
                
                ctx.strokeStyle = grad;
                ctx.beginPath();
                ctx.moveTo(c.x, c.y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                
                c.x += Math.cos(c.angle) * c.speed;
                c.y += Math.sin(c.angle) * c.speed;
                
                if(c.y > height + 200) comets.splice(i, 1);
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="hero-canvas" />;
};

// --- Modal Component (With Graph & Milestone Nodes) ---
const CurriculumModal = ({ program, onClose }) => {
    const [hoveredTopic, setHoveredTopic] = useState(null);
    const [applyModal, setApplyModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', mobile: '' });

    if (!program) return null;

    const handleApply = () => {
        if (!formData.name || !formData.mobile) {
            alert('Please enter your name and mobile number');
            return;
        }

        // Format the email
        const subject = `Application for ${program.title}`;
        const body = `Hi Code Base,\n\nI would like to join ${program.title}.\n\nName: ${formData.name}\nMobile: ${formData.mobile}\n\nThank you!`;
        const mailtoLink = `mailto:tk7435554@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;

        // Send SMS to your number using WhatsApp API (or you can use your backend)
        const whatsappMessage = `New Application:\nName: ${formData.name}\nMobile: ${formData.mobile}\nCourse: ${program.title}`;
        const whatsappLink = `https://wa.me/6281900907?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp in new tab
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
        }, 500);

        // Reset form and close
        setFormData({ name: '', mobile: '' });
        setApplyModal(false);
    };

    // Topic infographics with consistent themed icons
    const topicIconMap = {
        "Computer Internals: Compiler vs Interpreter": Cpu,
        "Language Basics: C / C++ / Python": Code,
        "Control Flow, Loops & Pattern Logic": GitBranch,
        "Modular Programming & Functions": Package,
        "Arrays, Strings & Memory Layout": Database,
        "Pointers (Stack vs Heap) & References": Zap,
        "Structures, Classes & Encapsulation": Layout,
        "Advanced OOP (Inheritance, Polymorphism)": Share2,
        "Data Structures: Linked Lists, Stacks, Queues": Layers,
        "Operating Systems: Processes & Scheduling": Activity,
        "Computer Networks: HTTP, TCP/IP, APIs": Globe,
        "Linux Command Line & Git/GitHub": Terminal,
        "Project Architecture & Planning": Briefcase,
        "Major Project Implementation": Rocket,
        "Code Reviews & Debugging": Search,
        "Career Prep: Resume & Portfolios": Award,
        "Frontend Foundations": Palette,
        "React Ecosystem": Zap,
        "Backend Engineering": Server,
        "Data & Deploy": Cloud,
        "Python Mastery": Code,
        "Data & APIs": Database,
        "AI Foundations": Brain,
        "Modern AI & Projects": Sparkles,
        "Linux & Networking": Wifi,
        "DevOps Core": GitBranch,
        "Containers & Cloud": Box,
        "Real Infrastructure": Gauge
    };

    const topicDescMap = {
        "Computer Internals: Compiler vs Interpreter": "How code gets converted to machine instructions",
        "Language Basics: C / C++ / Python": "Syntax, semantics, and core language constructs",
        "Control Flow, Loops & Pattern Logic": "If/else, loops, and algorithmic thinking",
        "Modular Programming & Functions": "Breaking code into reusable, organized pieces",
        "Arrays, Strings & Memory Layout": "How data is stored and accessed in memory",
        "Pointers (Stack vs Heap) & References": "Understanding direct memory manipulation",
        "Structures, Classes & Encapsulation": "Organizing data with OOP principles",
        "Advanced OOP (Inheritance, Polymorphism)": "Building extensible, flexible code",
        "Data Structures: Linked Lists, Stacks, Queues": "Fundamental building blocks of algorithms",
        "Operating Systems: Processes & Scheduling": "How systems manage running programs",
        "Computer Networks: HTTP, TCP/IP, APIs": "How computers communicate over the internet",
        "Linux Command Line & Git/GitHub": "Essential tools for professional developers",
        "Project Architecture & Planning": "Designing systems before coding",
        "Major Project Implementation": "Building real-world applications from scratch",
        "Code Reviews & Debugging": "Finding and fixing bugs systematically",
        "Career Prep: Resume & Portfolios": "Showcasing your skills to employers"
    };

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="modal-backdrop" onClick={onClose}>
            <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="modal-container" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <div className="mono text-accent" style={{fontSize:'0.8rem', letterSpacing:'2px'}}>{program.label} TRACK</div>
                        <h2 style={{fontSize:'2rem', fontWeight:700}}>{program.title}</h2>
                    </div>
                    <button onClick={onClose} style={{padding:'8px', background:'rgba(255,255,255,0.1)', borderRadius:'50%'}}>
                        <X color="white" />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    
                    {/* Left: Simple Module List */}
                    <div>
                        <h3 className="text-accent" style={{fontSize:'1rem', fontWeight:700, marginBottom:'1.5rem', textTransform:'uppercase', letterSpacing:'1px', display:'flex', alignItems:'center', gap:'8px'}}>
                            <Layers size={18} /> Module Roadmap
                        </h3>
                        <div style={{paddingLeft:'0px'}}>
                            {program.detailedModules.map((m, i) => (
                                <motion.div 
                                    key={i} 
                                    style={{marginBottom:'2rem'}}
                                    initial={{x:-20, opacity:0}}
                                    animate={{x:0, opacity:1}}
                                    transition={{delay: i*0.1}}
                                >
                                    <h4 className="module-title" style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.75rem'}}>
                                        <span style={{width:'12px', height:'12px', background:'var(--accent-red)', borderRadius:'50%', flexShrink:0}}></span>
                                        {m.name}
                                    </h4>
                                    <ul className="module-list">
                                        {m.topics.map((t, j) => {
                                            const desc = topicDescMap[t];
                                            return (
                                                <motion.li 
                                                    key={j}
                                                    onHoverStart={() => setHoveredTopic(`${i}-${j}`)}
                                                    onHoverEnd={() => setHoveredTopic(null)}
                                                    style={{
                                                        padding:'0.5rem 0',
                                                        borderRadius:'4px',
                                                        background: hoveredTopic === `${i}-${j}` ? 'rgba(229, 9, 20, 0.1)' : 'transparent',
                                                        transition:'all 0.2s',
                                                        cursor:'pointer',
                                                        paddingLeft:'0.5rem'
                                                    }}
                                                >
                                                    <div>{t}</div>
                                                    {hoveredTopic === `${i}-${j}` && (
                                                        <motion.div
                                                            initial={{opacity:0, height:0}}
                                                            animate={{opacity:1, height:'auto'}}
                                                            style={{fontSize:'0.8rem', color:'var(--accent-red)', fontStyle:'italic', marginTop:'0.25rem', fontWeight:400}}
                                                        >
                                                            {desc}
                                                        </motion.div>
                                                    )}
                                                </motion.li>
                                            );
                                        })}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Stats & Graph */}
                    <div>
                        <div className="modal-stats">
                            <h3 className="text-accent" style={{fontSize:'1rem', fontWeight:700, marginBottom:'1.5rem', textTransform:'uppercase', letterSpacing:'1px', display:'flex', alignItems:'center', gap:'8px'}}>
                                <BarChart3 size={18} /> Skill Progression
                            </h3>
                            
                            {/* SVG Graph */}
                            <div className="graph-container">
                                <svg className="graph-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
                                    <path 
                                        d="M0,100 C50,90 80,60 120,50 C160,40 200,20 300,10" 
                                        fill="none" 
                                        stroke="#E50914" 
                                        strokeWidth="3"
                                        className="graph-path"
                                    />
                                    <circle cx="120" cy="50" r="4" fill="white" className="animate-pulse" />
                                    <circle cx="300" cy="10" r="4" fill="white" className="animate-pulse" />
                                    
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{stopColor:'#E50914', stopOpacity:0.2}} />
                                            <stop offset="100%" style={{stopColor:'#E50914', stopOpacity:0}} />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,100 C50,90 80,60 120,50 C160,40 200,20 300,10 V100 H0Z" fill="url(#grad1)" />
                                </svg>
                            </div>

                            <div className="stat-grid">
                                <div className="stat-box">
                                    <CheckCircle2 size={32} className="stat-icon" />
                                    <div className="stat-value">100%</div>
                                    <div className="stat-label">Code Review</div>
                                </div>
                                <div className="stat-box">
                                    <ClipboardList size={32} className="stat-icon" />
                                    <div className="stat-value">10+</div>
                                    <div className="stat-label">Assignments</div>
                                </div>
                                <div className="stat-box">
                                    <FolderKanban size={32} className="stat-icon" />
                                    <div className="stat-value">2</div>
                                    <div className="stat-label">Major Projects</div>
                                </div>
                                <div className="stat-box">
                                    <Mic size={32} className="stat-icon" />
                                    <div className="stat-value">Live</div>
                                    <div className="stat-label">Mock Interviews</div>
                                </div>
                            </div>
                            
                            <button className="btn btn-primary" style={{width:'100%'}} onClick={() => setApplyModal(true)}>Apply for Batch</button>
                        </div>
                    </div>

                </div>

                {/* Apply Modal */}
                {applyModal && (
                    <motion.div 
                        initial={{opacity:0}} 
                        animate={{opacity:1}} 
                        exit={{opacity:0}}
                        style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:300}}
                        onClick={() => setApplyModal(false)}
                    >
                        <motion.div
                            initial={{scale:0.9}}
                            animate={{scale:1}}
                            onClick={e => e.stopPropagation()}
                            style={{background:'#0a0a0a', border:'1px solid rgba(229, 9, 20, 0.3)', borderRadius:'12px', padding:'2rem', maxWidth:'400px', width:'90%'}}
                        >
                            <h3 style={{fontSize:'1.5rem', fontWeight:700, marginBottom:'1.5rem', color:'white'}}>Join {program.title}</h3>
                            
                            <div style={{marginBottom:'1rem'}}>
                                <label style={{display:'block', fontSize:'0.875rem', fontWeight:600, marginBottom:'0.5rem', color:'#a3a3a3'}}>Name</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="Your name"
                                    style={{width:'100%', padding:'0.75rem', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', color:'white', fontSize:'0.875rem'}}
                                />
                            </div>

                            <div style={{marginBottom:'1.5rem'}}>
                                <label style={{display:'block', fontSize:'0.875rem', fontWeight:600, marginBottom:'0.5rem', color:'#a3a3a3'}}>Mobile Number</label>
                                <input 
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                    placeholder="10-digit mobile"
                                    style={{width:'100%', padding:'0.75rem', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', color:'white', fontSize:'0.875rem'}}
                                />
                            </div>

                            <div style={{display:'flex', gap:'1rem'}}>
                                <button 
                                    onClick={handleApply}
                                    style={{flex:1, padding:'0.75rem', background:'var(--accent-red)', color:'white', border:'none', borderRadius:'6px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', fontSize:'0.875rem'}}
                                >
                                    Apply
                                </button>
                                <button 
                                    onClick={() => setApplyModal(false)}
                                    style={{flex:1, padding:'0.75rem', background:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'6px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', fontSize:'0.875rem'}}
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

// --- Navbar ---
const Navbar = ({ onOpenMenu }) => (
    <nav className="navbar">
        <div className="container nav-content">
            <div className="nav-logo mono">CODE<span className="text-accent">BASE</span></div>
            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#programs">Programs</a>
                <a href="#contact">Contact</a>
            </div>
            <button className="nav-toggle" onClick={onOpenMenu}><Menu color="white"/></button>
        </div>
    </nav>
);

// --- Hero ---
const Hero = ({ onVisionClick }) => (
    <section id="home" className="hero-section">
        <SpaceCanvas />
        <div className="hero-overlay"></div>
        <div className="hero-content">
            <div className="hero-subtitle">EST. 2024 • KADAPA</div>
            <h1 className="hero-title">CODE<br/>BASE</h1>
            <div className="hero-btn-group">
                <button className="btn btn-primary" onClick={() => document.getElementById('programs').scrollIntoView({behavior:'smooth'})}>
                    Explore Programs
                </button>
                <button className="btn btn-outline" onClick={onVisionClick}>Our Vision</button>
            </div>
            <div style={{marginTop:'3rem', display:'flex', alignItems:'center', gap:'0.5rem', color:'var(--accent-red)', fontWeight:'bold', fontSize:'0.8rem', letterSpacing:'2px'}}>
                <Zap size={16} /> ENGINEERING EXCELLENCE
            </div>
        </div>
    </section>
);

// --- Programs ---
const Programs = ({ onSelect }) => {
    const programsData = [
        {
            title: "Coding School",
            label: "Foundation",
            duration: "4 Months",
            icon: <Terminal size={40} />,
            description: "Forget syntax. Learn how memory, pointers, and compilers actually work.",
            detailedModules: [
                { 
                    name: "Phase 1: The Machine (Weeks 1-4)", 
                    topics: [
                        "Computer Internals: Compiler vs Interpreter",
                        "Language Basics: C / C++ / Python",
                        "Control Flow, Loops & Pattern Logic",
                        "Modular Programming & Functions"
                    ] 
                },
                { 
                    name: "Phase 2: Core Programming (Weeks 5-8)", 
                    topics: [
                        "Arrays, Strings & Memory Layout",
                        "Pointers (Stack vs Heap) & References",
                        "Structures, Classes & Encapsulation",
                        "Advanced OOP (Inheritance, Polymorphism)"
                    ] 
                },
                { 
                    name: "Phase 3: CS Core (Weeks 9-12)", 
                    topics: [
                        "Data Structures: Linked Lists, Stacks, Queues",
                        "Operating Systems: Processes & Scheduling",
                        "Computer Networks: HTTP, TCP/IP, APIs",
                        "Linux Command Line & Git/GitHub"
                    ] 
                },
                { 
                    name: "Phase 4: Engineering (Weeks 13-16)", 
                    topics: [
                        "Project Architecture & Planning",
                        "Major Project Implementation",
                        "Code Reviews & Debugging",
                        "Career Prep: Resume & Portfolios"
                    ] 
                }
            ]
        },
        {
            title: "MERN Stack",
            label: "Job Ready",
            duration: "5 Months",
            icon: <Globe size={40} />,
            description: "Don't just build to-do apps. Build scalable, production-grade systems.",
            detailedModules: [
                { 
                    name: "Phase 1: Frontend Foundations", 
                    topics: [
                        "HTML5 Semantic Structure & Forms",
                        "CSS3, Flexbox, Grid & Responsive Design",
                        "JavaScript Core (ES6+), DOM, Async/Await"
                    ] 
                },
                { 
                    name: "Phase 2: React Ecosystem", 
                    topics: [
                        "JSX, Components & Virtual DOM",
                        "Hooks (useState, useEffect, Custom Hooks)",
                        "State Management & API Integration"
                    ] 
                },
                { 
                    name: "Phase 3: Backend Engineering", 
                    topics: [
                        "Node.js Runtime & Event Loop",
                        "Express Framework & REST API Design",
                        "Authentication (JWT) & Middleware"
                    ] 
                },
                { 
                    name: "Phase 4: Data & Deploy", 
                    topics: [
                        "MongoDB Schema Design & CRUD",
                        "Cloud Deployment (AWS/Vercel)",
                        "2 Major Real-World Projects"
                    ] 
                }
            ]
        },
        {
            title: "AI Engineering",
            label: "Future",
            duration: "4 Months",
            icon: <Cpu size={40} />,
            description: "Move beyond ChatGPT wrappers. Build actual AI pipelines and agents.",
            detailedModules: [
                { 
                    name: "Phase 1: Python Mastery", 
                    topics: [
                        "Advanced Python Syntax & OOP",
                        "Modules, File Handling & Error Management",
                        "Functional Programming in Python"
                    ] 
                },
                { 
                    name: "Phase 2: Data & APIs", 
                    topics: [
                        "NumPy & Pandas for Data Analysis",
                        "Data Cleaning & Preprocessing",
                        "Building & Consuming Data APIs"
                    ] 
                },
                { 
                    name: "Phase 3: AI Foundations", 
                    topics: [
                        "ML Concepts (Supervised/Unsupervised)",
                        "Model Training Basics (No heavy math)",
                        "Evaluation Metrics"
                    ] 
                },
                { 
                    name: "Phase 4: Modern AI & Projects", 
                    topics: [
                        "LLM Basics & Prompt Engineering",
                        "RAG (Retrieval Augmented Generation)",
                        "Building AI Agents & Chatbots",
                        "Capstone AI Project"
                    ] 
                }
            ]
        },
        {
            title: "DevOps",
            label: "Infra",
            duration: "4 Months",
            icon: <Server size={40} />,
            description: "The backbone of the internet. Linux, Docker, and Kubernetes mastery.",
            detailedModules: [
                { 
                    name: "Phase 1: Linux & Networking", 
                    topics: [
                        "Shell Scripting & Terminal Mastery",
                        "Networking Fundamentals (DNS, Ports, IPs)",
                        "Linux File Systems & Permissions"
                    ] 
                },
                { 
                    name: "Phase 2: DevOps Core", 
                    topics: [
                        "Advanced Git Workflows",
                        "CI/CD Concepts & Build Pipelines",
                        "Automated Testing Integration"
                    ] 
                },
                { 
                    name: "Phase 3: Containers & Cloud", 
                    topics: [
                        "Docker Containerization & Orchestration",
                        "Cloud Services Overview (AWS)",
                        "Server Management & Security"
                    ] 
                },
                { 
                    name: "Phase 4: Real Infrastructure", 
                    topics: [
                        "Monitoring, Logging & Alerts",
                        "Infrastructure as Code (Intro)",
                        "Production Deployment Project"
                    ] 
                }
            ]
        }
    ];

    return (
        <section id="programs" className="programs-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Training Tracks</h2>
                    <div className="section-divider"></div>
                    
                    <div className="credibility-block">
                        <div className="credibility-icons">
                            <GraduationCap size={18} />
                            <span className="credibility-dot" />
                            <Briefcase size={18} />
                        </div>
                        <p className="credibility-text">
                            Select your path. Outcome-driven curriculums
                            <br/><span className="highlight">built by IIT and NIT engineers</span><br/>
                            to meet real industry demands.
                        </p>
                    </div>
                </div>
                
                <div className="programs-grid">
                    {programsData.map((prog, idx) => (
                        <div key={idx} className="program-card" onClick={() => onSelect(prog)}>
                            <div style={{width:'100%'}}>
                                <div className="card-label">{prog.label} | {prog.duration}</div>
                                <div className="flex-center" style={{marginTop:'1.5rem'}}>
                                    <div className="card-icon">{prog.icon}</div>
                                </div>
                                <h3 className="card-title">{prog.title}</h3>
                                <p className="card-desc">{prog.description}</p>
                            </div>
                            <div className="card-footer text-accent">
                                VIEW ROADMAP <ChevronRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Footer ---
const Footer = () => (
    <footer id="contact" className="footer">
        <div className="container footer-content">
            <div style={{textAlign:'left'}}>
                <div style={{fontSize:'1.5rem', fontWeight:900, marginBottom:'1rem'}}>CODE<span className="text-accent">BASE</span></div>
                <p className="text-secondary" style={{fontSize:'0.9rem'}}>Kadapa's Premier Engineering Lab.</p>
            </div>
            <div className="social-row">
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
            </div>
        </div>
        <div className="text-center text-secondary mono" style={{fontSize:'0.7rem', marginTop:'3rem', opacity:0.6}}>
            © 2024 CODE BASE INSTITUTE • DESIGNED FOR ENGINEERS
        </div>
    </footer>
);

// --- Vision Modal Component ---
const VisionModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="modal-container"
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: '900px', overflow: 'auto' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        padding: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        color: 'white',
                        zIndex: 10,
                    }}
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                    <span className="mono text-accent" style={{fontSize:'0.8rem', letterSpacing:'2px', textTransform:'uppercase'}}>OUR VISION</span>
                    
                    <h2 className="quote-main" style={{marginTop:'1rem', marginBottom:'1.5rem'}}>
                        We build engineers,<br/>
                        <span className="text-accent">not course-completers.</span>
                    </h2>

                    <p style={{maxWidth:'700px', margin:'0 auto 2.5rem', fontSize:'1rem', lineHeight:'1.8', color:'#a3a3a3'}}>
                        At CODE BASE, we focus on <strong>fundamentals, discipline, and real-world execution</strong>.
                        Our curriculums are designed by engineers from <strong>IITs and NITs</strong>,
                        aligned with modern industry demands — without shortcuts.
                    </p>

                    {/* Pillars Grid */}
                    <div style={{
                        display:'grid',
                        gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',
                        gap:'2rem',
                        marginTop:'2rem'
                    }}>
                        <motion.div
                            initial={{opacity:0, y:20}}
                            animate={{opacity:1, y:0}}
                            transition={{delay:0.1}}
                            style={{
                                padding:'2rem',
                                background:'rgba(255,255,255,0.03)',
                                border:'1px solid rgba(255,255,255,0.1)',
                                borderRadius:'8px',
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                gap:'1rem'
                            }}
                        >
                            <Cpu size={32} className="text-accent" />
                            <h4 style={{fontSize:'1.125rem', fontWeight:700, margin:0}}>Foundations First</h4>
                            <p style={{fontSize:'0.9rem', color:'#9ca3af', margin:0}}>Systems, logic, and core engineering before frameworks.</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity:0, y:20}}
                            animate={{opacity:1, y:0}}
                            transition={{delay:0.2}}
                            style={{
                                padding:'2rem',
                                background:'rgba(255,255,255,0.03)',
                                border:'1px solid rgba(255,255,255,0.1)',
                                borderRadius:'8px',
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                gap:'1rem'
                            }}
                        >
                            <Target size={32} className="text-accent" />
                            <h4 style={{fontSize:'1.125rem', fontWeight:700, margin:0}}>Outcome Over Hype</h4>
                            <p style={{fontSize:'0.9rem', color:'#9ca3af', margin:0}}>Projects, reviews, and measurable skill growth.</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity:0, y:20}}
                            animate={{opacity:1, y:0}}
                            transition={{delay:0.3}}
                            style={{
                                padding:'2rem',
                                background:'rgba(255,255,255,0.03)',
                                border:'1px solid rgba(255,255,255,0.1)',
                                borderRadius:'8px',
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                gap:'1rem'
                            }}
                        >
                            <RefreshCcw size={32} className="text-accent" />
                            <h4 style={{fontSize:'1.125rem', fontWeight:700, margin:0}}>Engineers Who Adapt</h4>
                            <p style={{fontSize:'0.9rem', color:'#9ca3af', margin:0}}>Think, debug, and grow with changing technology.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function App() {
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [visionOpen, setVisionOpen] = useState(false);
    const [xp, setXP] = useState(100);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        let throttleTimer;
        const unsub = scrollYProgress.onChange(v => {
            clearTimeout(throttleTimer);
            throttleTimer = setTimeout(() => setXP(100 + Math.floor(v * 500)), 50);
        });
        return () => { unsub(); clearTimeout(throttleTimer); };
    }, [scrollYProgress]);

    return (
        <div>
            <style>{customStyles}</style>
            
            <Navbar onOpenMenu={() => setMobileMenuOpen(true)} />
            
            {mobileMenuOpen && (
                <div style={{position:'fixed', inset:0, background:'#000', zIndex:150, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem'}}>
                    <button onClick={() => setMobileMenuOpen(false)} style={{position:'absolute', top:'20px', right:'20px', color:'white'}}><X size={32}/></button>
                    {['Home', 'Programs', 'Contact'].map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} style={{fontSize:'2rem', fontWeight:900, color:'white'}}>{l}</a>
                    ))}
                </div>
            )}

            <div className="xp-widget">
                <div style={{display:'flex', justifyContent:'space-between', color:'var(--accent-red)', fontWeight:'bold'}}>
                    <span>LEVEL</span><span>{Math.floor(xp/10)}%</span>
                </div>
                <div className="xp-bar"><div className="xp-fill" style={{width:`${Math.min(100, xp/6)}%`}}></div></div>
                <div className="text-secondary">DATA: {xp} PTS</div>
            </div>

            <Hero onVisionClick={() => setVisionOpen(true)} />
            <Programs onSelect={setSelectedProgram} />
            
            <section className="reality-section">
                <div className="parallax-text">NO HYPE</div>
                <div className="container relative z-10">
                    {/* <CheckCircle2 size={40} className="text-accent" style={{display:'block', margin:'0 auto 20px auto'}} /> */}
                    <p className="mono text-secondary">// CODE BASE PHILOSOPHY</p>
                    <br></br>
                    <h2 className="quote-main">"Learn it right.<br/><span className="text-accent">Get hired right."</span></h2>
                </div>
            </section>

            <Footer />

            <AnimatePresence>
                {selectedProgram && <CurriculumModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />}
                {visionOpen && <VisionModal isOpen={visionOpen} onClose={() => setVisionOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}