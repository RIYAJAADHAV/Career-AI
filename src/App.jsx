import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Check, CheckCircle2,
  ChevronDown, CircleHelp, CloudUpload, FileCheck2, FileText, GitBranch,
  Heart, Lightbulb, Menu, MessageSquareText, ScanText,
  ShieldCheck, Sparkles, Target, WandSparkles, X, Zap,
} from 'lucide-react'
import './App.css'

// defines the six core reumse-analysis features displayed on the landing page 
const features = [
  { icon: Target, title: 'ATS score', text: 'See how well your resume performs against the systems recruiters actually use.', tone: 'lilac' },
  { icon: ScanText, title: 'Keyword analysis', text: 'Find the important keywords you’re missing for the roles you want.', tone: 'blue' },
  { icon: BarChart3, title: 'Skills analysis', text: 'See where your strengths shine—and where there’s room to grow.', tone: 'mint' },
  { icon: MessageSquareText, title: 'Content analysis', text: 'Turn vague descriptions into clear, compelling achievements.', tone: 'peach' },
  { icon: FileCheck2, title: 'Formatting check', text: 'Make sure your resume looks polished and parses perfectly.', tone: 'yellow' },
  { icon: WandSparkles, title: 'AI suggestions', text: 'Get practical, personalized suggestions you can use right away.', tone: 'pink' },
]

//Stores FAQ questions and answers used by the expandable FAQ section.
const questions = [
  ['What is ResumeAI?', 'ResumeAI is a career companion that helps you understand how your resume reads to recruiters and applicant tracking systems, then gives you clear ways to improve it.'],
  ['Is my resume data private?', 'This is a frontend-only demo. The analyzer screens display sample data; your resume is not uploaded to a server or sent to an AI service.'],
  ['What file formats can I use?', 'The demo upload area accepts PDF and Word document selections to illustrate the experience. It does not process or analyze the selected files.'],
  ['Can I tailor my resume to a specific job?', 'Absolutely. The job match preview shows how a resume can be compared with a job description, including matched skills, gaps, and practical next steps.'],
  ['Do I need a credit card to get started?', 'No. You can explore the sample experience and browse the features without entering payment information.'],
]

// Reusable ResumeAI logo component used in both the navbar and footer.
function Logo({ light = false }) {
  return <a className={`brand${light ? ' brand-light' : ''}`} href="#home" aria-label="ResumeAI home">
    <span className="brand-mark"><FileText size={18} strokeWidth={2.4} /><Sparkles className="brand-spark" size={10} /></span>
    <span>resume<span className="brand-ai">ai</span></span>
  </a>
}

// Reusable button component keeps CTA styling and navigation consistent across sections.
function Button({ children, href = '#upload', secondary = false, className = '' }) {
  return <a className={`button${secondary ? ' button-secondary' : ''} ${className}`} href={href}>
    {children}<ArrowRight size={16} />
  </a>
}

function SectionHeading({ eyebrow, title, description, centered = true }) {
  return <div className={`section-heading${centered ? ' section-heading-center' : ''}`}>
    {eyebrow && <span className="eyebrow"><Sparkles size={13} />{eyebrow}</span>}
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>
}

// Displays the circular resume score used in the sample analysis dashboard.
function ScoreRing({ size = 'large' }) {
  return <div className={`score-ring score-ring-${size}`}><div className="score-ring-inner">
    <span className="score-number">87</span><span className="score-total">out of 100</span>
  </div></div>
}

function DashboardPreview() {
  const rows = [['ATS compatibility', 94, 'green'], ['Keyword match', 82, 'purple'], ['Skills score', 88, 'blue'], ['Formatting', 91, 'orange']]
  return <div className="dashboard-wrap" aria-label="Sample resume analysis dashboard">
    <div className="float-chip float-chip-top"><span className="chip-check"><Check size={13} /></span>ATS-friendly format</div>
    <div className="dashboard">
      <div className="dash-top"><div className="dash-brand"><span className="dash-logo"><Sparkles size={15} /></span><span>Resume analysis</span></div><span className="sample-tag"><span /> SAMPLE REPORT</span></div>
      <div className="dash-file"><span className="file-icon"><FileText size={18} /></span><span className="file-info"><strong>alex_morgan_resume.pdf</strong><small>Last analyzed just now</small></span><span className="file-status"><CheckCircle2 size={15} /> Analyzed</span></div>
      <div className="dash-main">
        <div className="score-block"><ScoreRing /><span className="score-caption">RESUME SCORE</span><span className="score-good"><ArrowUpRight size={13} /> Top 15% of resumes</span></div>
        <div className="metrics"><div className="metrics-title">Your score breakdown <span>ⓘ</span></div>
          {rows.map(([label, value, color]) => <div className="metric-row" key={label}><div className="metric-label"><span>{label}</span><b>{value}%</b></div><div className="metric-track"><span className={`metric-fill fill-${color}`} style={{ '--bar-width': `${value}%` }} /></div></div>)}
        </div>
      </div>
      <div className="suggestion"><span className="suggestion-icon"><Lightbulb size={16} /></span><div><strong>Your experience is impressive!</strong><p>Add 2–3 measurable results to stand out even more.</p></div><ArrowRight size={15} className="suggestion-arrow" /></div>
    </div>
    <div className="float-chip float-chip-bottom"><span className="float-spark"><Sparkles size={14} /></span> One small change. Big difference.</div>
  </div>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['Home', '#home'], ['Features', '#features'], ['How It Works', '#how-it-works'], ['Job Match', '#job-match'], ['Pricing', '#pricing']]
// Controls the mobile navigation menu so it opens and closes from the menu button. 
 return <header className="navbar"><div className="nav-inner"><Logo />
    <nav className={`nav-links${open ? ' nav-links-open' : ''}`} aria-label="Main navigation">{links.map(([text, href]) =>
      <a key={text} href={href} onClick={() => setOpen(false)}>{text}</a>)}
    </nav>
    <a className="nav-cta" href="#upload">Analyze My Resume <ArrowRight size={15} /></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
  </div></header>
}

function Hero() {
  return <section className="hero section-wrap" id="home">
    <div className="hero-copy"><span className="eyebrow hero-eyebrow"><span className="live-dot" />YOUR NEXT OPPORTUNITY STARTS HERE</span>
      <h1>Make Your Resume <span>Recruiter-Ready</span> with AI.</h1>
      <p className="hero-description">The experience is yours. Make sure your resume does it justice. Get the insights and confidence to land the role you deserve.</p>
      <div className="hero-actions"><Button>Analyze My Resume</Button><Button href="#how-it-works" secondary>See how it works</Button></div>
      <div className="hero-proof"><div className="avatar-stack"><span>A</span><span>J</span><span>M</span><span>S</span></div><div className="proof-copy"><div className="stars">★★★★★ <span>4.9/5</span></div><span>Trusted by 12,000+ job seekers</span></div></div>
    </div>
    <DashboardPreview />
    <a className="hero-scroll" href="#stats"><span className="scroll-icon"><ArrowDown size={14} /></span> SCROLL TO EXPLORE</a>
  </section>
}

function Stats() {
  return <section className="stats-section" id="stats"><div className="stats-grid section-wrap">
    {[['12k+', 'careers moved forward'], ['94%', 'feel more confident'], ['3×', 'more interview callbacks'], ['4.9/5', 'from our community']].map(([big, small]) =>
      <div className="stat" key={small}><strong>{big}</strong><span>{small}</span></div>)}
  </div></section>
}

function Problem() {
  const issues = [
    ['Getting filtered out before anyone reads it', 'More than 75% of resumes never make it past the ATS.'],
    ['Your real impact gets lost in the wording', 'Great work deserves better than a list of job duties.'],
    ['Not sure what a hiring manager is looking for', 'Every application feels like sending your resume into the void.'],
  ]
  const icons = [ScanText, MessageSquareText, Target]
  return <section className="problem-section section-wrap" id="problem"><SectionHeading eyebrow="SOUND FAMILIAR?" title={<>A great career shouldn’t be<br className="desktop-break" /> hidden by a not-so-great resume.</>} description="You’ve got the experience. Let’s make sure it gets noticed." />
    <div className="problem-grid">{issues.map(([title, text], index) => { const Icon = icons[index]; return <article className="problem-card" key={title}><span className="problem-icon"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></article> })}</div>
  </section>
}

function Features() {
  return <section className="features-section section-wrap" id="features"><SectionHeading eyebrow="A SECOND SET OF (VERY SMART) EYES" title={<>Everything your resume needs<br className="desktop-break" /> to make a stronger first impression.</>} description="A thoughtful review, helpful insights, and less guessing. All in one place." />
    <div className="features-grid">{features.map(({ icon: Icon, title, text, tone }, index) =>
      <article className="feature-card" key={title}><span className={`feature-icon tone-${tone}`}><Icon size={20} /></span><span className="feature-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href="#how-it-works" className="card-link">Explore feature <ArrowRight size={14} /></a></article>)}</div>
  </section>
}

function HowItWorks() {
  const steps = [
    { number: '01', icon: CloudUpload, title: 'Upload your resume', text: 'Drop in your existing resume. PDF or Word—we’ll take it from here.', id: 'upload' },
    { number: '02', icon: Sparkles, title: 'Get your AI analysis', text: 'See your score, ATS compatibility, and personalized insights in seconds.' },
    { number: '03', icon: WandSparkles, title: 'Make it your best', text: 'Use practical suggestions to sharpen your story and apply with confidence.' },
  ]

  // Provides a demo upload control that accepts common resume document formats.
  return <section className="how-section" id="how-it-works"><div className="section-wrap"><SectionHeading eyebrow="THREE SIMPLE STEPS" title="A better resume is closer than you think." description="No guesswork. No complicated process. Just a clearer path forward." />
    <div className="steps-grid">{steps.map(({ number, icon: Icon, title, text, id }) => <article className="step-card" key={number} id={id}><span className="step-number">STEP {number}</span><span className="step-icon"><Icon size={22} /></span><h3>{title}</h3><p>{text}</p>{id && <label className="upload-button" htmlFor="resume-upload">Choose a resume <ArrowRight size={14} /><input id="resume-upload" type="file" accept=".pdf,.doc,.docx" /></label>}</article>)}</div>
    <p className="privacy-note"><ShieldCheck size={15} /> Your resume stays yours. The demo shows sample results only.</p>
  </div></section>
}


function JobMatch() {
  const matched = ['Product strategy', 'User research', 'SQL', 'Cross-functional leadership', 'A/B testing']
  const missing = ['Amplitude', 'Growth experiments']
  // Separates matching skills from missing skills to make job-fit information easier to scan.
  return <section className="match-section section-wrap" id="job-match"><div className="match-copy"><span className="eyebrow"><Target size={13} /> THE RIGHT FIT, MADE CLEAR</span><h2>Your resume, meet your <span>next role.</span></h2><p>Paste in a job description and see how your experience lines up. Know what to highlight before you hit apply.</p><ul className="match-benefits"><li><CheckCircle2 size={17} /> Spot your strongest overlaps</li><li><CheckCircle2 size={17} /> Find the skills to emphasize</li><li><CheckCircle2 size={17} /> Get actionable next steps</li></ul><Button href="#pricing">Find your job match</Button></div>
    <div className="match-card"><div className="match-card-head"><div><span className="match-kicker">SAMPLE JOB MATCH</span><h3>Senior Product Designer</h3><p>Acme Studio <span>·</span> San Francisco, CA</p></div><span className="match-badge"><Sparkles size={13} /> Great fit</span></div>
      <div className="match-score-row"><div className="match-score"><strong>91</strong><span>%</span></div><div className="match-score-info"><strong>You’re a strong match</strong><span>Your experience aligns with 10 of 12 key qualifications.</span></div></div>
      <div className="match-progress"><span /></div>
      <div className="skill-groups"><div><strong className="skill-label skill-label-match"><Check size={14} /> MATCHED SKILLS <span>05</span></strong><div className="skill-chips">{matched.map(skill => <span className="skill-chip" key={skill}>{skill}</span>)}</div></div>
        <div><strong className="skill-label skill-label-missing"><ArrowUpRight size={14} /> SKILLS TO HIGHLIGHT <span>02</span></strong><div className="skill-chips">{missing.map(skill => <span className="skill-chip skill-chip-missing" key={skill}>{skill}</span>)}</div></div></div>
      <div className="match-tip"><Lightbulb size={15} /><p><strong>Try this:</strong> Mention analytics tools in your last role to strengthen your fit.</p></div>
    </div></section>
}

function BeforeAfter() {
  return <section className="before-section section-wrap"><SectionHeading eyebrow="SAME EXPERIENCE. STRONGER STORY." title="Small edits. A whole new impression." description="See how a little clarity can go a long way." />
    <div className="compare-grid"><article className="compare-card compare-before"><div className="compare-header"><span className="compare-tag"><X size={13} /> BEFORE</span><span>Vague &amp; easy to miss</span></div><div className="resume-snippet"><span className="snippet-label">EXPERIENCE</span><h3>Marketing Manager</h3><span className="snippet-company">Brightwave Co. · 2021—Present</span><p>• Responsible for social media and marketing campaigns</p><p>• Worked with different teams on projects</p><p>• Helped improve website performance</p></div><div className="compare-foot compare-foot-before"><X size={14} /><span>Hard to see the impact behind the work.</span></div></article>
      <article className="compare-card compare-after"><div className="compare-header"><span className="compare-tag"><Check size={13} /> AFTER</span><span>Specific &amp; memorable</span></div><div className="resume-snippet"><span className="snippet-label">EXPERIENCE</span><h3>Marketing Manager</h3><span className="snippet-company">Brightwave Co. · 2021—Present</span><p>• Grew organic engagement <mark>64% in 8 months</mark> through a new content strategy</p><p>• Led a <mark>6-person team</mark> to launch campaigns across <mark>4 channels</mark></p><p>• Improved landing-page conversions by <mark>28%</mark> through A/B testing</p></div><div className="compare-foot compare-foot-after"><Check size={14} /><span>Now your impact speaks for itself.</span></div></article></div>
  </section>
}

function ScoreBreakdown() {
  const scores = [['ATS compatibility', '94%', 94, 'violet'], ['Keyword relevance', '82%', 82, 'blue'], ['Skills match', '88%', 88, 'green'], ['Experience & impact', '79%', 79, 'orange'], ['Formatting & clarity', '91%', 91, 'pink']]
  // Uses reusable score data to generate consistent progress bars for each resume category.
  return <section className="breakdown-section"><div className="section-wrap breakdown-layout"><div className="breakdown-copy"><span className="eyebrow"><BarChart3 size={14} /> CLARITY, NOT JUST A NUMBER</span><h2>Know what’s working.<br /><span>Know what to do next.</span></h2><p>Your score isn’t a mystery metric. See exactly what’s strong and where a few thoughtful changes could make a difference.</p><a href="#features" className="text-link">Explore your score breakdown <ArrowRight size={15} /></a></div>
    <div className="breakdown-card"><div className="breakdown-card-head"><div><span>RESUME SCORECARD</span><h3>Your strengths at a glance</h3></div><span className="breakdown-icon"><BarChart3 size={18} /></span></div>
      <div className="breakdown-overall"><div><span>OVERALL SCORE</span><strong>87<span>/100</span></strong></div><span className="overall-good"><ArrowUpRight size={13} /> Looking good</span></div>
      {scores.map(([label, value, width, tone]) => <div className="breakdown-row" key={label}><div><span>{label}</span><strong>{value}</strong></div><div className="breakdown-track"><span className={`breakdown-fill breakdown-${tone}`} style={{ '--bar-width': `${width}%` }} /></div></div>)}
      <div className="breakdown-insight"><Sparkles size={15} /><span><strong>Your biggest opportunity:</strong> Add more measurable achievements.</span></div>
    </div>
  </div></section>
}

function Testimonials() {
  const quotes = [
    ['“I’d sent the same resume out 30 times and heard nothing. Two days after improving it, I got my first interview request. I cried a little.”', 'Jamie R.', 'Product designer, now at Figma', 'J', 'lavender'],
    ['“It helped me see my own experience differently. The suggestions were specific and felt like advice from someone who actually gets hiring.”', 'Marcus T.', 'Marketing lead, now at Notion', 'M', 'peach'],
    ['“The job match feature was the game changer. I finally stopped applying blindly and started tailoring my resume with intention.”', 'Sofia L.', 'Data analyst, now at Stripe', 'S', 'mint'],
  ]
  return <section className="testimonials-section section-wrap"><SectionHeading eyebrow="GOOD THINGS HAPPEN" title="A little resume confidence goes a long way." description="Real people, making their next move." />
    <div className="testimonial-grid">{quotes.map(([quote, name, role, initial, color]) => <article className="testimonial-card" key={name}><div className="testimonial-stars">★★★★★</div><blockquote>{quote}</blockquote><div className="testimonial-person"><span className={`testimonial-avatar avatar-${color}`}>{initial}</span><span><strong>{name}</strong><small>{role}</small></span><span className="quote-mark">“</span></div></article>)}</div>
  </section>
}

function Pricing() {
  return <section className="pricing-section" id="pricing"><div className="section-wrap"><SectionHeading eyebrow="SIMPLE BY DESIGN" title="A better resume shouldn’t cost a fortune." description="Get started for free. Upgrade when you’re ready." />
    <div className="pricing-grid"><article className="price-card"><span className="price-plan">THE FIRST LOOK</span><h3>Free</h3><p className="price-description">A good place to start.</p><div className="price-amount">$0<span> / forever</span></div><a className="price-button price-button-light" href="#upload">Try it for free <ArrowRight size={15} /></a><div className="price-divider" /><span className="price-includes">HERE’S WHAT YOU GET</span>{['One resume analysis', 'Your overall resume score', 'Essential ATS check', 'Top 3 improvement tips'].map(item => <div className="price-feature" key={item}><Check size={15} />{item}</div>)}</article>
      <article className="price-card price-card-featured"><span className="popular-tag"><Sparkles size={12} /> MOST LOVED</span><span className="price-plan">THE FULL PICTURE</span><h3>Pro</h3><p className="price-description">Your job search, leveled up.</p><div className="price-amount">$12<span> / month</span></div><a className="price-button price-button-dark" href="#upload">Get started with Pro <ArrowRight size={15} /></a><div className="price-divider" /><span className="price-includes">EVERYTHING IN FREE, PLUS</span>{['Unlimited resume analyses', 'Job description matching', 'Personalized AI suggestions', 'Before & after resume rewrites', 'Priority access to new features'].map(item => <div className="price-feature" key={item}><Check size={15} />{item}</div>)}</article></div>
    <p className="pricing-note"><ShieldCheck size={14} /> No hidden fees. No commitment. Cancel whenever.</p>
  </div></section>
}

function FAQ() {
  const [active, setActive] = useState(0)
  // Tracks which FAQ answer is open so users can expand or collapse questions interactively.
  return <section className="faq-section section-wrap" id="faq"><div className="faq-intro"><span className="eyebrow"><CircleHelp size={14} /> GOOD QUESTIONS</span><h2>A few things<br />you might be<br /><span>wondering.</span></h2><p>Still curious? We’re happy to help make things clearer.</p><a href="mailto:hello@resumeai.example" className="text-link">Talk to a real person <ArrowRight size={15} /></a></div>
    <div className="faq-list">{questions.map(([question, answer], index) => <article className={`faq-item${active === index ? ' faq-item-active' : ''}`} key={question}><button className="faq-question" aria-expanded={active === index} onClick={() => setActive(active === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{active === index && <p className="faq-answer">{answer}</p>}</article>)}</div>
  </section>
}

function FinalCTA() {
  return <section className="final-cta-section section-wrap"><div className="final-cta"><div className="cta-orb cta-orb-one" /><div className="cta-orb cta-orb-two" /><div className="cta-content"><span className="cta-eyebrow"><Heart size={13} /> YOUR NEXT CHAPTER STARTS HERE</span><h2>Your Resume Deserves a<br className="desktop-break" /> Better First Impression.</h2><p>Give your experience the introduction it deserves.</p><Button className="button-white">Let’s make it happen</Button><span className="cta-footnote"><ShieldCheck size={13} /> Free to start. No credit card required.</span></div><div className="cta-sparkle cta-sparkle-one"><Sparkles size={18} /></div><div className="cta-sparkle cta-sparkle-two"><Sparkles size={13} /></div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="section-wrap"><div className="footer-main"><div className="footer-brand"><Logo light /><p>Good people deserve great opportunities.<br />Let’s make the introduction count.</p><div className="footer-socials"><a aria-label="LinkedIn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /></a><a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer"><GitBranch size={16} /></a></div></div>
      <div className="footer-links"><div><strong>EXPLORE</strong><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#job-match">Job match</a><a href="#pricing">Pricing</a></div><div><strong>THE DETAILS</strong><a href="#faq">FAQs</a><a href="mailto:hello@resumeai.example?subject=Privacy">Privacy</a><a href="mailto:hello@resumeai.example?subject=Terms">Terms of service</a></div><div className="footer-note"><span>MADE FOR YOUR NEXT CHAPTER</span><p>A little more clarity.<br />A lot more confidence.</p><span className="footer-note-icon"><Zap size={16} /> Made with care, for your career.</span></div></div></div>
    <div className="footer-bottom"><span>© 2026 ResumeAI. Made for the next big thing.</span><span>Thoughtful tools for the people doing the work.</span></div></div></footer>
}

function App() {
  // Observes page sections and reveals them when they enter the user's viewport.
  useEffect(() => {
    const elements = document.querySelectorAll('.section-heading, .problem-card, .feature-card, .step-card, .compare-card, .testimonial-card, .faq-item, .match-card, .breakdown-card, .price-card')
   // IntersectionObserver provides efficient scroll-triggered animations without manual scroll listeners.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <><Navbar /><main><Hero /><Stats /><Problem /><Features /><HowItWorks /><JobMatch /><BeforeAfter /><ScoreBreakdown /><Testimonials /><Pricing /><FAQ /><FinalCTA /></main><Footer /></>
}

export default App
