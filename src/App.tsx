import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ── VARIANTS ─────────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1]
const up = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }
const left = { hidden: { opacity: 0, x: -36 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } }
const right = { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } }
const scale = { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const staggerFast = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }

// ── STAR FIELD ────────────────────────────────────────────────────────────────
function StarField() {
  const stars = useRef<{ x: number; y: number; s: number; dur: number; del: number; minOp: number; maxOp: number }[]>([])
  if (!stars.current.length) {
    for (let i = 0; i < 220; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2.5 + 0.4,
        dur: Math.random() * 4 + 2,
        del: Math.random() * 5,
        minOp: Math.random() * 0.2 + 0.05,
        maxOp: Math.random() * 0.6 + 0.4,
      })
    }
  }
  return (
    <div id="starfield">
      {stars.current.map((s, i) => (
        <motion.div
          key={i}
          className="star"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.s, height: s.s,
          }}
          animate={{ opacity: [s.minOp, s.maxOp, s.minOp], scale: [1, 1.5, 1] }}
          transition={{ duration: s.dur, delay: s.del, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Shooting stars */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={`shoot-${i}`}
          style={{
            position: 'absolute',
            height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent)',
            top: `${15 + i * 25}%`,
            left: '-100px',
          }}
          animate={{
            x: ['-100px', '110vw'],
            y: [0, 150 + i * 80],
            opacity: [0, 1, 1, 0],
            width: ['0px', '120px', '120px', '0px'],
          }}
          transition={{
            duration: 3 + i,
            delay: 4 + i * 6,
            repeat: Infinity,
            repeatDelay: 8 + i * 4,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// ── CURSOR COMET ──────────────────────────────────────────────────────────────
function CursorComet() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [trail, setTrail] = useState({ x: -200, y: -200 })
  useEffect(() => {
    const h = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setTrail({ x: e.clientX, y: e.clientY }), 80)
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return (
    <>
      <div className="comet-trail" style={{ left: trail.x, top: trail.y, width: 30, height: 30, opacity: 0.3 }} />
      <div className="comet-trail" style={{ left: trail.x, top: trail.y, width: 60, height: 60, opacity: 0.12 }} />
      <div className="comet" style={{ left: pos.x, top: pos.y }} />
    </>
  )
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const SKILLS = {
  Languages: ['Java (8+/JEE)', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'PHP', 'C/C++'],
  Frontend: ['React.js', 'Redux Toolkit', 'Context API', 'Next.js', 'Angular 2+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Material UI'],
  Backend: ['Node.js/Express', 'Spring Boot', 'Spring MVC', 'Python Flask', 'RESTful APIs', 'JDBC', 'J2EE', 'Maven', 'WordPress'],
  Databases: ['PostgreSQL', 'MySQL', 'MongoDB (Mongoose)', 'SQL Server', 'Oracle', 'Redis', 'Elasticsearch'],
  'AI & ML': ['LLM Integration', 'Groq API', 'TensorFlow', 'Scikit-learn', 'Prompt Engineering', 'Data Pipelines', 'ETL'],
  'DevOps & Tools': ['Docker', 'Docker Compose', 'CI/CD', 'Git / GitHub', 'Agile / Scrum'],
  'APIs & Integration': ['Stripe', 'Google OAuth', 'Finnhub', 'RabbitMQ', 'Multer', 'Nodemailer', 'Cloudinary', 'Figma'],
}

const PROJECTS = [
  { title: 'StockWise — Stock Trading Platform', tech: ['MERN', 'Redux', 'Redis', 'Stripe', 'Docker'], date: 'Jan 2026', desc: 'Full-stack stock trading and portfolio management platform.', bullets: ['React TypeScript (Redux Toolkit, 25+ components), Node.js/Express with JWT, Google OAuth, role-based access for Users, Brokers, Admins.', 'LLM-powered AI chatbot (Groq API) for financial insights; real-time P&L, Recharts, watchlists, Stripe payments.', 'Admin workflow: Multer uploads, Nodemailer alerts, Redis OTP reset, optimized MongoDB schemas.'], image: '/images/stockwise.svg', link: 'https://github.com/nidhiGanpati/StockWise', linkLabel: 'GitHub' },
  { title: 'StockWise AI — Inventory SaaS', tech: ['React', 'Vite', 'Tailwind', 'Node.js', 'MongoDB'], date: 'Feb – Apr 2026', desc: 'Full-stack inventory management SaaS for small businesses.', bullets: ['Product CRUD, sales recording, dashboard reporting, and CSV export.', 'JWT auth, RBAC, invitation links, shop-level data isolation for multi-tenant usage.', 'AI demand forecasting, real-time stock alerts, conversational analytics assistant.'], image: '/images/inventory.svg', link: 'https://github.com/Chethangowda-git/webD_final_project', linkLabel: 'GitHub' },
  { title: 'Insurance Data Orchestration', tech: ['Node.js', 'Docker', 'Elasticsearch', 'RabbitMQ', 'Redis'], date: 'Jan 2026', desc: 'Microservices insurance platform with async event-driven processing.', bullets: ['Docker Compose orchestrating Elasticsearch, Redis, RabbitMQ, and Kibana.', 'REST APIs for policy management and claims; health monitoring, service discovery.', 'Containerized deployment with message queuing for async event-driven architecture.'], image: '/images/insurance.svg', link: 'https://github.com/nidhiGanpati/Insurance-Data-Orchestration-Platform', linkLabel: 'GitHub' },
  { title: 'NEU Wellness Connect', tech: ['Java', 'Swing', 'MySQL', 'JavaMail'], date: 'Nov – Dec 2025', desc: 'Enterprise health management platform with role-based access.', bullets: ['4-member Agile team; 4 Enterprises, 10 Organizations, 12 RBAC modules in Java Swing.', 'Owned Insurance & Mental Health modules: verification, billing, counseling, scheduling, referrals.', 'Normalized MySQL schema, financial reconciliation, JavaMail notifications, 11+ Git commits.'], image: '/images/wellness.svg', link: 'https://github.com/Chethangowda-git/neu-wellness-connect', linkLabel: 'GitHub' },
  { title: 'FitTrack Pro', tech: ['React', 'Node.js', 'PostgreSQL', 'OAuth', 'Stripe'], date: 'Dec 2025', desc: 'Full-stack fitness tracking application.', bullets: ['React (Hooks), Node.js/Express APIs, 25+ Bootstrap components, Google/Facebook OAuth 2.0.', 'Stripe payments, JWT + bcrypt auth, CI/CD pipeline, automated testing.', 'PostgreSQL with optimized schemas for session management and user data.'], image: '/images/fittrack.svg', link: 'https://github.com/nidhiGanpati/expense-tracker-pro', linkLabel: 'GitHub' },
  { title: 'PriceWise — Grocery App', tech: ['Figma', 'Moqups', 'UI/UX'], date: 'Mar 2026', desc: 'Mobile-first grocery savings and price comparison prototype.', bullets: ['10+ screens: dashboard, price comparison, budget tracker, AI assistant, cart, orders.', 'Interactive flows, reusable components, high-fidelity mobile-first prototype.', 'Focused on intuitive navigation and budget-aware decision-making.'], image: '/images/pricewise.svg', link: 'https://www.figma.com/proto/oMpF4MgsPdmXQ4XKG8M9oK/uiux-final-project?node-id=0-1&t=e25NTWVwFr7NbwWz-1', linkLabel: 'View Prototype' },
  { title: 'Stress Level Detection', tech: ['Python', 'TensorFlow', 'Flask', 'Matplotlib'], date: 'Nov 2024 – Feb 2025', desc: 'ML web app for stress level prediction.', bullets: ['Random Forest, SVM, Neural Networks — 94% classification accuracy.', 'Flask app with real-time prediction, Matplotlib/Seaborn dashboards.', 'Evaluated with precision, recall, F1-score, and ROC-AUC curves.'], image: '/images/stress.svg', link: 'https://github.com/nidhiGanpati/StressLevelDetection_FinalProject', linkLabel: 'GitHub' },
  { title: 'Breast Cancer Detection', tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'], date: 'May – Sep 2024', desc: 'AI-powered cancer detection system.', bullets: ['SVM, Decision Trees, KNN achieving 96–98% accuracy.', 'Pandas preprocessing, StandardScaler, cross-validation, confusion matrices, ROC curves.', 'Comprehensive model evaluation with feature scaling and ensemble methods.'], image: '/images/cancer.svg', link: 'https://github.com/nidhiGanpati/Breast_Cancer_Detection', linkLabel: 'GitHub' },
]

const GUIDE_MSGS: Record<string, string> = {
  hero: "🌌 Welcome to Nidhi's universe!",
  about: "⭐ A star in full-stack & AI development.",
  skills: "🚀 Technologies across the galaxy.",
  experience: "🪐 Professional orbit so far.",
  projects: "✨ Constellations of code she's built.",
  education: "🎓 Where the journey began.",
  certifications: "🏆 Badges from across the cosmos.",
  contact: "🌠 Let's launch something together!",
}

// ── CELESTIAL AVATAR ─────────────────────────────────────────────────────────
function CelestialAvatar() {
  const orbits = [
    { r: 140, size: 12, color: '#22d3ee', dur: 8, delay: 0 },
    { r: 180, size: 8, color: '#8b5cf6', dur: 14, delay: 2 },
    { r: 220, size: 10, color: '#ec4899', dur: 20, delay: 5 },
  ]
  return (
    <div className="avatar-system">
      {orbits.map((o, i) => (
        <div key={i} style={{ position: 'absolute', width: o.r * 2, height: o.r * 2, borderRadius: '50%', border: '1px solid rgba(139,92,246,.12)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <motion.div
            animate={{ rotate: 360 }}
            style={{ position: 'absolute', width: o.size, height: o.size, borderRadius: '50%', background: o.color, boxShadow: `0 0 ${o.size * 2}px ${o.color}`, top: -o.size / 2, left: `calc(50% - ${o.size / 2}px)` }}
            transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ))}
      <motion.div
        className="avatar-planet"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        NM
      </motion.div>
    </div>
  )
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [['#about', 'About'], ['#skills', 'Skills'], ['#experience', 'Experience'], ['#projects', 'Work'], ['#contact', 'Contact']]
  return (
    <motion.nav className={`nav${solid ? ' solid' : ''}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease }}>
      <a href="#hero" className="nav-brand">
        <div className="nav-brand-dot" />
        NIDHI.DEV
      </a>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map(([href, label]) => (
          <li key={href}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
        ))}
        <li><a href="https://github.com/nidhiGanpati" target="_blank" rel="noreferrer" className="nav-gh">GitHub</a></li>
        <li><a href="https://drive.google.com/file/d/1XdAQQ7dLjcVseNpSv4yzFQmvnLYPJNGP/view?usp=sharing" target="_blank" rel="noreferrer" className="nav-resume">Resume ↗</a></li>
      </ul>
      <button className="nav-ham" onClick={() => setOpen(v => !v)} aria-label="menu">{open ? '✕' : '☰'}</button>
    </motion.nav>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.28], [1, 0])
  return (
    <section className="hero" id="hero">
      <div className="nebula-layer" />
      {/* Planet */}
      <motion.div className="hero-planet" animate={{ rotate: [0, 360] }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }} />
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6, ease }}>
          Available for opportunities
        </motion.div>
        <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease }}>
          Hi, I'm<br /><span className="name">Nidhi Mahesh</span>
        </motion.h1>
        <motion.div className="hero-role" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
          Full-Stack Software Developer
        </motion.div>
        <motion.p className="hero-p" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7, ease }}>
          I build scalable full-stack applications, AI-powered tools, and data-driven platforms using React, Node.js, Java, Python, and cloud-ready architectures.
        </motion.p>
        <motion.div className="hero-btns" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7, ease }}>
          <a href="#projects" className="btn btn-primary">Explore Projects</a>
          <a href="#contact" className="btn btn-outline">Contact Me</a>
          <a href="https://github.com/nidhiGanpati" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
          <a href="https://drive.google.com/file/d/1eF3z3YzaIc8dGa4NeKxPhRZJtXMn1o15/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-gold">View Resume ↗</a>
        </motion.div>
      </motion.div>
      <div className="scroll-ind"><span style={{ fontFamily: 'var(--fm)', fontSize: '.58rem', letterSpacing: '.15em', color: 'var(--t4)' }}>scroll</span><div className="scroll-line" /></div>
    </section>
  )
}

// ── SECTION WRAPPER ───────────────────────────────────────────────────────────
function Sec({ children, id, alt = false }: { children: React.ReactNode; id?: string; alt?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section className={`sec${alt ? '' : ''}`} id={id} ref={ref} style={{ background: alt ? 'rgba(5,5,24,.6)' : 'transparent' }} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
      <div className="sec-inner">{children}</div>
    </motion.section>
  )
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <Sec id="about" alt>
      <motion.div variants={up}><div className="sec-eyebrow">01 / About</div><h2 className="sec-h2">Who <span className="glow">I Am</span></h2></motion.div>
      <motion.div className="about-grid" variants={stagger}>
        <motion.div variants={left}>
          <p className="about-p">Full-stack software developer with hands-on experience building and shipping scalable web applications using the MERN stack, Java Spring Boot, and Python.</p>
          <p className="about-p">Experienced integrating LLM-powered features — AI chatbots, demand forecasting, and conversational analytics — into real user-facing products. Strong foundation in machine learning, database optimization, and DevOps practices.</p>
          <p className="about-p">Currently pursuing MS in Information Systems at Northeastern University, Boston. Passionate about tools that improve how people learn, work, and make decisions.</p>
          <motion.div className="about-stats" variants={stagger}>
            {[['8+', 'Projects Built'], ['96%', 'ML Accuracy'], ['3.37', 'GPA at NEU'], ['25+', 'Technologies']].map(([n, l]) => (
              <motion.div key={l} className="stat" variants={scale} whileHover={{ scale: 1.05 }}>
                <span className="stat-n">{n}</span><span className="stat-l">{l}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div variants={right}><CelestialAvatar /></motion.div>
      </motion.div>
    </Sec>
  )
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Sec id="skills">
      <motion.div variants={up}><div className="sec-eyebrow">02 / Skills</div><h2 className="sec-h2">Technical <span className="glow">Arsenal</span></h2></motion.div>
      <motion.div variants={stagger}>
        {Object.entries(SKILLS).map(([cat, tags], ci) => (
          <motion.div key={cat} className="skills-cat" variants={up} transition={{ delay: ci * 0.05 }}>
            <div className="cat-label">{cat}</div>
            <motion.div className="tags" variants={staggerFast}>
              {tags.map((t, ti) => (
                <motion.span key={t} className="tag" variants={scale} whileHover={{ scale: 1.06, y: -3 }} transition={{ delay: ti * 0.02 }}>{t}</motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Sec>
  )
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
function Experience() {
  return (
    <Sec id="experience" alt>
      <motion.div variants={up}><div className="sec-eyebrow">03 / Experience</div><h2 className="sec-h2">Work <span className="glow">Experience</span></h2></motion.div>
      <motion.div className="exp-card" variants={up} transition={{ delay: 0.15 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 4 }}>
          <div><div className="exp-role">Software Development Intern</div><div className="exp-co">RMTS Global</div></div>
          <div className="exp-badges"><span className="badge">Oct 2024 – Nov 2024</span><span className="badge">Bengaluru, India</span></div>
        </div>
        <ul className="exp-list">
          {['Designed responsive WordPress themes (HTML5/CSS3/JS); built custom PHP plugins with admin panels, shortcodes, custom post types, and REST API endpoints.',
            'Optimized MySQL database achieving 60% performance improvement via query optimization, strategic indexing, normalization, CDN, and caching.',
            'Built Daily Expense Tracking System with CRUD, Chart.js dashboards, PDF reports; automated Vehicle Management System via PHP/Android apps for tracking, invoicing, and operations.',
          ].map((b, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}>{b}</motion.li>
          ))}
        </ul>
      </motion.div>
    </Sec>
  )
}

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [err, setErr] = useState(false)
  return (
    <motion.div ref={ref} className="proj-card" variants={scale} initial="hidden" animate={inView ? 'show' : 'hidden'} transition={{ delay: (i % 3) * 0.09 }} whileHover={{ y: -8, scale: 1.01 }}>
      <div className="proj-img">
        {!err ? <img src={p.image} alt={p.title} onError={() => setErr(true)} loading="lazy" /> : (
          <div className="proj-img-fb">
            <span style={{ fontSize: '2.5rem' }}>🚀</span>
            <span style={{ color: 'var(--violet)', fontSize: '.82rem', fontFamily: 'var(--fm)' }}>{p.title.split('—')[0].trim()}</span>
          </div>
        )}
      </div>
      <div className="proj-body">
        <div className="proj-chips">{p.tech.map(t => <span key={t} className="proj-chip">{t}</span>)}</div>
        <div className="proj-title">{p.title}</div>
        <div className="proj-desc">{p.desc}</div>
        <ul className="proj-pts">{p.bullets.map((b, bi) => <li key={bi}>{b}</li>)}</ul>
        <div className="proj-foot">
          <span className="proj-date">{p.date}</span>
          <motion.a href={p.link} target="_blank" rel="noreferrer" className={`proj-link${p.linkLabel === 'View Prototype' ? ' figma' : ''}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>{p.linkLabel}</motion.a>
        </div>
      </div>
    </motion.div>
  )
}

function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section className="sec" id="projects" ref={ref}>
      <div className="sec-inner">
        <motion.div variants={up} initial="hidden" animate={inView ? 'show' : 'hidden'}><div className="sec-eyebrow">04 / Work</div><h2 className="sec-h2">My <span className="glow">Constellations</span></h2></motion.div>
        <div className="proj-grid">{PROJECTS.map((p, i) => <ProjCard key={p.title} p={p} i={i} />)}</div>
      </div>
    </section>
  )
}

// ── EDUCATION ─────────────────────────────────────────────────────────────────
function Education() {
  return (
    <Sec id="education" alt>
      <motion.div variants={up}><div className="sec-eyebrow">05 / Education</div><h2 className="sec-h2">Academic <span className="glow">Orbit</span></h2></motion.div>
      <motion.div className="edu-grid" variants={stagger}>
        {[{ icon: '🎓', deg: 'MS in Information Systems', sch: 'Northeastern University, Boston', meta: 'Sept 2025 – Expected Dec 2027', gpa: 'GPA: 3.37 / 4.0', v: left },
          { icon: '🏛️', deg: 'BE in Information Science & Engineering', sch: 'Visvesvaraya Technological University, Bengaluru', meta: 'Aug 2022 – Jul 2025', gpa: 'CGPA: 8.05 / 10', v: right },
        ].map(u => (
          <motion.div key={u.sch} className="edu-card" variants={u.v} whileHover={{ y: -5 }}>
            <div className="edu-icon">{u.icon}</div>
            <div className="edu-deg">{u.deg}</div>
            <div className="edu-sch">{u.sch}</div>
            <div className="edu-meta">{u.meta}</div>
            <span className="gpa-pill">{u.gpa}</span>
          </motion.div>
        ))}
      </motion.div>
    </Sec>
  )
}

// ── CERTS ─────────────────────────────────────────────────────────────────────
function Certs() {
  const certs = [{ icon: '🐍', name: 'Python for Data Science & AI Development', org: 'IBM' }, { icon: '🗄️', name: 'SQL for Data Science', org: 'Coursera' }, { icon: '🤖', name: 'Introduction to AI', org: 'Coursera' }, { icon: '⚛️', name: 'ReactJS Workshop', org: 'Global Academy of Technology' }]
  const courses = ['AED Java', 'DMDD', 'UI/UX Design', 'Web Design', 'PSA', 'Prompt Engineering']
  return (
    <Sec id="certifications">
      <motion.div variants={up}><div className="sec-eyebrow">06 / Certifications</div><h2 className="sec-h2">Badges & <span className="glow">Coursework</span></h2></motion.div>
      <motion.div className="cert-grid" variants={stagger}>
        {certs.map((c, i) => (
          <motion.div key={c.name} className="cert-card" variants={scale} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }}>
            <div className="cert-ico">{c.icon}</div>
            <div><div className="cert-n">{c.name}</div><div className="cert-o">{c.org}</div></div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={up} transition={{ delay: 0.3 }}>
        <div className="cat-label" style={{ marginBottom: 16 }}>Relevant Coursework</div>
        <motion.div className="course-chips" variants={staggerFast}>
          {courses.map((c, i) => <motion.span key={c} className="course-chip" variants={scale} transition={{ delay: 0.35 + i * 0.05 }} whileHover={{ scale: 1.05 }}>{c}</motion.span>)}
        </motion.div>
      </motion.div>
    </Sec>
  )
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <Sec id="contact" alt>
      <motion.div variants={up}><div className="sec-eyebrow">07 / Contact</div><h2 className="sec-h2">Let's <span className="glow">Launch</span></h2></motion.div>
      <motion.div className="contact-grid" variants={stagger}>
        <motion.div className="contact-links" variants={left}>
          {[{ ico: '✉️', label: 'mahesh.ni@northeastern.edu', href: 'mailto:mahesh.ni@northeastern.edu' }, { ico: '📞', label: '(857) 351-4016', href: 'tel:8573514016' }, { ico: '💼', label: 'linkedin.com/in/nidhimahesh13', href: 'https://linkedin.com/in/nidhimahesh13' }, { ico: '💻', label: 'github.com/nidhiGanpati', href: 'https://github.com/nidhiGanpati' }].map((item, i) => (
            <motion.a key={item.href} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="c-link"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease }} whileHover={{ x: 7 }}>
              <div className="c-ico">{item.ico}</div><span>{item.label}</span>
            </motion.a>
          ))}
        </motion.div>
        <motion.div className="c-box" variants={right}>
          <h3>Ready to launch?</h3>
          <p>Open to full-time roles, internships, and interesting projects. I respond within 24 hours.</p>
          <motion.a href="mailto:mahesh.ni@northeastern.edu" className="btn btn-primary" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>Email Me</motion.a>
        </motion.div>
      </motion.div>
    </Sec>
  )
}

// ── GUIDE ─────────────────────────────────────────────────────────────────────
function Guide() {
  const sections = Object.keys(GUIDE_MSGS)
  const [current, setCurrent] = useState('hero')
  const [visible, setVisible] = useState(true)
  const prevRef = useRef('hero')
  useEffect(() => {
    const h = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.38
      let found = 'hero'
      for (const id of sections) { const el = document.getElementById(id); if (el && el.offsetTop <= scrollY) found = id }
      if (found !== prevRef.current) { prevRef.current = found; setCurrent(found); setVisible(true) }
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <div className="guide">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div key={current} className="guide-bubble" initial={{ opacity: 0, scale: 0.6, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 10 }} transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}>
            {GUIDE_MSGS[current]}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="guide-av" onClick={() => setVisible(v => !v)} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>👩‍🚀</motion.div>
    </div>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <div className="nebula-layer" />
      <StarField />
      <CursorComet />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certs />
        <Contact />
      </main>
      <footer style={{ position: 'relative', zIndex: 1 }}>
        <p>Designed & built by <a href="https://github.com/nidhiGanpati" target="_blank" rel="noreferrer">Nidhi Mahesh</a> · {new Date().getFullYear()} · Made with ✨ across the cosmos</p>
      </footer>
      <Guide />
    </>
  )
}
