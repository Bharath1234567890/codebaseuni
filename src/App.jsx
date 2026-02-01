import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
    Terminal, Cpu, Network, Server, 
    ArrowRight, ChevronRight, X, 
    Zap, Globe, ShieldCheck, MapPin, 
    Menu, MousePointer2, CheckCircle2, 
    BarChart3, Layers, Code
} from 'lucide-react';

// --- Styles & Fonts ----
const customStyles = `
    /* --- CSS Variables --- */
    :root {
        --bg-dark: #0B0D10;
        --accent-red: #ff3333;
        --text-primary: #FFFFFF;
        --text-secondary: #9CA3AF;
        --grid-line: rgba(255,255,255,0.03);
    }

    /* --- Reset & Base --- */
    * {
        box-sizing: border-box;
    }

    body {
        background-color: var(--bg-dark);
        color: var(--text-primary);
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Space Grotesk', system-ui, sans-serif;
        letter-spacing: -0.02em;
        margin: 0;
    }

    button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: inherit;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    /* --- Utilities --- */
    .mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    .text-accent { color: var(--accent-red); }
    .text-secondary { color: var(--text-secondary); }
    .text-center { text-align: center; }
    .uppercase { text-transform: uppercase; }
    .tracking-wide { letter-spacing: 0.1em; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .gap-2 { gap: 0.5rem; }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-dark); }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent-red); }

    /* --- Components --- */
    
    /* Container */
    .container {
        max-width: 80rem; /* 7xl equivalent */
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    /* Navbar */
    .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 40;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: transparent;
        mix-blend-mode: difference;
    }

    .nav-logo {
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.05em;
        color: white;
    }

    .nav-links {
        display: none;
        gap: 2rem;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: #d1d5db;
    }

    .nav-links a:hover { color: var(--accent-red); }
    
    .nav-mobile-btn {
        display: block;
        color: white;
    }

    @media (min-width: 768px) {
        .nav-links { display: flex; }
        .nav-mobile-btn { display: none; }
    }

    /* Hero Section */
    .hero-section {
        position: relative;
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: var(--bg-dark);
    }

    .hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        opacity: 0.6;
    }

    .hero-content {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .hero-est {
        font-size: 0.875rem;
        letter-spacing: 0.3em;
        margin-bottom: 1rem;
        color: var(--accent-red);
    }

    .hero-title {
        font-size: 4.5rem;
        font-weight: 900;
        letter-spacing: -0.05em;
        line-height: 1;
        margin-bottom: 1.5rem;
        mix-blend-mode: overlay;
        opacity: 0.9;
    }

    @media (min-width: 768px) {
        .hero-title { font-size: 8rem; }
    }

    .hero-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .btn-primary {
        padding: 0.75rem 2rem;
        background-color: white;
        color: black;
        font-weight: 700;
        border-radius: 9999px;
        transition: background-color 0.2s;
    }
    .btn-primary:hover { background-color: #e5e7eb; }

    .btn-outline {
        padding: 0.75rem 2rem;
        background-color: rgba(255, 51, 51, 0.1);
        color: var(--accent-red);
        border: 1px solid rgba(255, 51, 51, 0.5);
        font-weight: 700;
        border-radius: 9999px;
        transition: all 0.2s;
    }
    .btn-outline:hover {
        background-color: var(--accent-red);
        color: white;
    }

    .hero-footer {
        margin-top: 3rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--accent-red);
        font-size: 0.75rem;
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    /* Programs Section */
    .programs-section {
        padding: 8rem 0;
        background-color: var(--bg-dark);
        position: relative;
        z-index: 20;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 5rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 2rem;
    }

    .section-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    @media (min-width: 768px) { .section-title { font-size: 4.5rem; } }

    .programs-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    @media (min-width: 768px) { .programs-grid { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 1024px) { .programs-grid { grid-template-columns: repeat(4, 1fr); } }

    /* Glass Card */
    .glass-card {
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 450px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    .glass-card:hover {
        border-color: rgba(255, 51, 51, 0.5);
        background: rgba(255, 51, 51, 0.02);
    }

    .card-glow {
        position: absolute;
        top: 0;
        right: 0;
        width: 16rem;
        height: 16rem;
        background-color: var(--accent-red);
        opacity: 0;
        filter: blur(80px);
        border-radius: 9999px;
        transform: translate(50%, -50%);
        transition: opacity 0.3s;
        pointer-events: none;
    }
    .glass-card:hover .card-glow { opacity: 0.05; }

    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    
    .card-label {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        border: 1px solid rgba(255,255,255,0.1);
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
    }

    .card-title { font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
    .card-desc { font-size: 0.875rem; color: #9ca3af; line-height: 1.6; margin-bottom: 1rem; }
    .card-duration { font-size: 0.75rem; color: var(--accent-red); letter-spacing: 0.05em; }

    .card-btn {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: white;
        transition: color 0.2s;
    }
    .glass-card:hover .card-btn { color: var(--accent-red); }

    /* Modal */
    .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(11, 13, 16, 0.85);
        backdrop-filter: blur(12px);
    }

    .modal-container {
        background-color: #0f1115;
        border: 1px solid rgba(255,255,255,0.1);
        width: 100%;
        max-width: 64rem; /* 5xl */
        max-height: 90vh;
        overflow: hidden;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 50px -12px rgba(255, 51, 51, 0.1);
    }

    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--bg-dark);
    }

    .modal-close-btn {
        padding: 0.5rem;
        border-radius: 9999px;
        color: white;
        transition: background 0.2s;
    }
    .modal-close-btn:hover { background-color: rgba(255,255,255,0.05); }

    .modal-body {
        flex: 1;
        overflow-y: auto;
        padding: 2rem;
        display: grid;
        gap: 3rem;
    }
    @media (min-width: 768px) { .modal-body { grid-template-columns: 1fr 1fr; } }

    .timeline {
        position: relative;
        padding-left: 2rem;
        border-left: 1px dashed rgba(255,255,255,0.1);
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .timeline-item { position: relative; }

    .timeline-dot {
        position: absolute;
        left: -39px; /* Adjust based on padding/border */
        top: 0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 9999px;
        background-color: var(--bg-dark);
        border: 2px solid var(--accent-red);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .timeline-dot-inner {
        width: 0.375rem;
        height: 0.375rem;
        background-color: var(--accent-red);
        border-radius: 9999px;
    }

    .stats-card {
        background-color: rgba(255,255,255,0.05);
        border-radius: 0.75rem;
        padding: 1.5rem;
        border: 1px solid rgba(255,255,255,0.05);
        height: fit-content;
        position: sticky;
        top: 0;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .stat-box {
        padding: 1rem;
        background-color: rgba(0,0,0,0.4);
        border-radius: 0.5rem;
        text-align: center;
        border: 1px solid rgba(255,255,255,0.05);
    }

    .stat-value { color: var(--accent-red); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
    .stat-label { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }

    .apply-btn {
        width: 100%;
        padding: 1rem;
        background-color: var(--accent-red);
        color: white;
        font-weight: 700;
        border-radius: 0.25rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.875rem;
        transition: background-color 0.2s;
        margin-top: 2rem;
    }
    .apply-btn:hover { background-color: #dc2626; }

    /* Reality Check */
    .reality-section {
        padding: 10rem 0;
        background-color: black;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bg-text {
        position: absolute;
        font-size: 15vw;
        font-weight: 900;
        color: #1a1a1a;
        white-space: nowrap;
        user-select: none;
        pointer-events: none;
    }

    /* Footer */
    .footer {
        background-color: var(--bg-dark);
        padding-top: 5rem;
        padding-bottom: 2.5rem;
        border-top: 1px solid rgba(255,255,255,0.05);
    }

    .footer-grid {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        gap: 2.5rem;
    }
    @media (min-width: 768px) { .footer-grid { flex-direction: row; } }
    
    .social-links { display: flex; gap: 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; }
    .social-links a:hover { color: white; }

    .footer-bottom {
        margin-top: 5rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255,255,255,0.05);
        display: flex;
        justify-content: space-between;
        font-size: 0.625rem;
        color: #4b5563;
        text-transform: uppercase;
    }
`;

// --- Particle Torus (Optimized for Stability) ---
const ParticleTorus = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        const particleCount = 600;
        const particles = [];
        let rotationX = 0;
        let rotationY = 0;

        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }
        };
        
        window.addEventListener('resize', resize);
        resize();

        const R = 300; 
        const r = 100;  

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 2;
            
            particles.push({
                theta,
                phi,
                baseX: (R + r * Math.cos(theta)) * Math.cos(phi),
                baseY: (R + r * Math.cos(theta)) * Math.sin(phi),
                baseZ: r * Math.sin(theta),
                size: Math.random() * 2,
                color: Math.random() > 0.9 ? '#ff3333' : '#FFFFFF'
            });
        }

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            rotationY += 0.005;
            rotationX += 0.002;

            particles.forEach(p => {
                let x = p.baseX;
                let y = p.baseY;
                let z = p.baseZ;

                let tempX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
                let tempZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
                x = tempX;
                z = tempZ;

                let tempY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
                tempZ = y * Math.sin(rotationX) + z * Math.cos(rotationX);
                y = tempY;
                z = tempZ;

                const scale = 500 / (500 + z);
                const projX = x * scale + centerX;
                const projY = y * scale + centerY;

                ctx.beginPath();
                ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, Math.min(1, scale * (z > 0 ? 0.8 : 0.3)));
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

// --- Modal Component with Realtime Infographics ---
const CurriculumModal = ({ program, onClose }) => {
    if (!program) return null;

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
            >
                {/* Modal Header */}
                <div className="modal-header">
                    <div>
                        <div className="mono text-accent" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{program.label} TRACK</div>
                        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginTop: '0.25rem' }}>{program.title}</h2>
                        <span className="mono text-secondary" style={{ fontSize: '0.875rem' }}>{program.duration}</span>
                    </div>
                    <button onClick={onClose} className="modal-close-btn">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Content - Two Columns */}
                <div className="modal-body">
                    
                    {/* Left: Syllabus Timeline */}
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Layers size={20} className="text-accent" /> 
                            Module Roadmap
                        </h3>
                        
                        <div className="timeline">
                            {program.detailedModules.map((module, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="timeline-item"
                                >
                                    {/* Animated Dot */}
                                    <div className="timeline-dot">
                                        <div className="timeline-dot-inner animate-pulse"></div>
                                    </div>
                                    
                                    <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>{module.name}</h4>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {module.topics.map((topic, tIdx) => (
                                            <li key={tIdx} className="text-secondary" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                                <div style={{ marginTop: '0.375rem', width: '4px', height: '4px', backgroundColor: '#4b5563', borderRadius: '50%', flexShrink: 0 }}></div>
                                                <span style={{ lineHeight: 1.6 }}>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Realtime Infographic / Stats */}
                    <div className="stats-card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <BarChart3 size={20} className="text-accent" /> 
                            Skill Distribution
                        </h3>

                        {/* Animated SVG Chart */}
                        <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%' }}>
                                {/* Simulated Graph Lines */}
                                <motion.path 
                                    d="M 10 90 Q 50 90 60 70 T 110 50 T 190 20" 
                                    fill="none" 
                                    stroke="#ff3333" 
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                                <motion.path 
                                    d="M 10 90 L 190 90" 
                                    fill="none" 
                                    stroke="rgba(255,255,255,0.1)" 
                                    strokeWidth="1" 
                                />
                                {/* Data Points */}
                                <motion.circle cx="60" cy="70" r="3" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
                                <motion.circle cx="110" cy="50" r="3" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0 }} />
                                <motion.circle cx="190" cy="20" r="3" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
                            </svg>
                            <div className="mono text-secondary" style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', fontSize: '0.625rem' }}>TIME VS COMPLEXITY</div>
                        </div>

                        {/* Outcomes Grid */}
                        <div className="stats-grid">
                            <div className="stat-box">
                                <div className="stat-value">10+</div>
                                <div className="stat-label">Assignments</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">2</div>
                                <div className="stat-label">Major Projects</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">100%</div>
                                <div className="stat-label">Code Review</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">Job</div>
                                <div className="stat-label">Ready Portfolio</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <button className="apply-btn">
                                Apply for Batch
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Main Components ---

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo mono">
                CODE<span className="text-accent">BASE</span>
            </div>
            
            <div className="nav-links mono">
                <a href="#home">HOME</a>
                <a href="#programs">PROGRAMS</a>
                <a href="#philosophy">PHILOSOPHY</a>
                <a href="#contact">CONTACT</a>
            </div>

            <div className="nav-mobile-btn">
                <Menu />
            </div>
        </nav>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    
    // Parallax logic: Text moves faster than background
    const yText = useTransform(scrollY, [0, 500], [0, 100]);
    const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section id="home" className="hero-section">
            
            {/* 1. Particle Torus in the background, centered */}
            <div className="hero-bg">
                <ParticleTorus />
            </div>

            {/* 2. Central Typography */}
            <motion.div 
                style={{ y: yText, opacity: opacityText }}
                className="hero-content"
            >
                <div className="hero-est mono">EST. 2024 • KADAPA</div>
                
                <h1 className="hero-title">
                    CODE<br/>BASE
                </h1>
                
                <div className="hero-buttons">
                    <button className="btn-primary">
                        Explore Programs
                    </button>
                    <button className="btn-outline">
                        Our Vision
                    </button>
                </div>

                <div className="hero-footer mono">
                    <Zap size={14} className="animate-pulse" />
                    <span>ENGINEERING EXCELLENCE</span>
                </div>
            </motion.div>
        </section>
    );
};

const Programs = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);

    // Curriculum Data
    const programsData = [
        {
            title: "Coding School",
            label: "Foundation",
            duration: "4 Months (16 Weeks)",
            icon: <Terminal className="text-accent" />,
            description: "Master the fundamentals. From how memory works to building complex logic.",
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
            duration: "4-5 Months",
            icon: <Globe className="text-accent" />,
            description: "Build scalable web applications. Full stack mastery from frontend to cloud.",
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
            label: "Future Tech",
            duration: "4-5 Months",
            icon: <Cpu className="text-accent" />,
            description: "Integrate intelligence into software. Python, LLMs, and RAG pipelines.",
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
            title: "DevOps & Cloud",
            label: "Infrastructure",
            duration: "4 Months",
            icon: <Server className="text-accent" />,
            description: "Automate and scale. The backbone of modern internet services.",
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
                    <div>
                        <h2 className="section-title">TRACKS</h2>
                        <p className="text-secondary" style={{ maxWidth: '28rem', lineHeight: 1.6 }}>Rigorous, outcome-driven curriculums designed for the modern industry.</p>
                    </div>
                    <div className="text-right" style={{ display: 'none' }}> {/* Hidden on mobile default, shown via CSS if needed, kept logic simple */}
                        <div className="text-accent mono" style={{ fontSize: '1.25rem' }}>04</div>
                        <div className="text-secondary" style={{ fontSize: '0.875rem' }}>ACTIVE PROGRAMS</div>
                    </div>
                </div>

                <div className="programs-grid">
                    {programsData.map((prog, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="glass-card group"
                            onClick={() => setSelectedProgram(prog)}
                        >
                            <div className="card-glow"></div>
                            
                            <div className="card-content">
                                <div className="card-header">
                                    <span className="card-label mono">{prog.label}</span>
                                    {prog.icon}
                                </div>
                                <h3 className="card-title">{prog.title}</h3>
                                <p className="card-desc">{prog.description}</p>
                                <span className="card-duration mono">{prog.duration}</span>
                            </div>

                            <button className="card-btn">
                                View Curriculum <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Injection */}
            <AnimatePresence>
                {selectedProgram && (
                    <CurriculumModal 
                        program={selectedProgram} 
                        onClose={() => setSelectedProgram(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

const RealityCheck = () => {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], [-200, 200]);

    return (
        <section className="reality-section">
            {/* Background Moving Text */}
            <motion.div 
                style={{ x }}
                className="bg-text"
            >
                NO SHORTCUTS
            </motion.div>

            <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                    "We don't promise jobs.<br/>
                    <span className="text-accent">We build people who get hired."</span>
                </h2>
                <p className="mono text-secondary" style={{ fontSize: '1.125rem' }}>
                    // The Code Base Philosophy
                </p>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div style={{ alignSelf: 'flex-start' }}>
                        <div style={{ fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.05em', marginBottom: '1.5rem' }}>
                            CODE<span className="text-accent">BASE</span>
                        </div>
                        <div className="mono text-secondary" style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <p>Thank you to our engineers for the support.</p>
                            <p>Explore and collect skills to be part of the journey.</p>
                            <a href="#" className="text-accent" style={{ textDecoration: 'underline', marginTop: '0.5rem' }}>✉ Contact Us</a>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                        <a href="#">LinkedIn</a>
                    </div>
                </div>

                <div className="footer-bottom mono">
                    <span>© 2024 Code Base Institute</span>
                    <span>Terms of Use</span>
                </div>
            </div>
        </footer>
    );
};

export default function App() {
    useEffect(() => {
        document.title = "CODE BASE | Creative Engineering";
    }, []);

    return (
        <div className="app-container">
            <style>{customStyles}</style>
            <Navbar />
            <Hero />
            <Programs />
            <RealityCheck />
            <Footer />
        </div>
    );
}