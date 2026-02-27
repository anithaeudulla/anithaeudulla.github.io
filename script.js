// ============================================
// ANITHA EUDULLA — PORTFOLIO v4.0
// GSAP + ScrollTrigger + Topographic Canvas
// Premium Animated Portfolio
// ============================================

// ==========================================
// TOPOGRAPHIC / PARTICLE CANVAS BACKGROUND
// ==========================================
class TopoCanvas {
    constructor() {
        this.canvas = document.getElementById('topo-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: -999, y: -999 };
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.min(Math.floor((this.width * this.height) / 18000), 80);
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.08
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => { this.resize(); this.createParticles(); });
        window.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw topographic contour lines
        this.drawTopoLines();

        // Update and draw particles
        for (const p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.height) p.vy *= -1;

            // Mouse repulsion
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                p.x += (dx / dist) * force * 1.5;
                p.y += (dy / dist) * force * 1.5;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
            this.ctx.fill();
        }

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    const opacity = (1 - dist / 140) * 0.08;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    drawTopoLines() {
        const time = Date.now() * 0.0003;
        const spacing = 80;
        this.ctx.lineWidth = 0.4;

        for (let y = -spacing; y < this.height + spacing; y += spacing) {
            this.ctx.beginPath();
            for (let x = 0; x <= this.width; x += 8) {
                const wave1 = Math.sin(x * 0.005 + time + y * 0.01) * 15;
                const wave2 = Math.cos(x * 0.003 + time * 1.3 + y * 0.008) * 10;
                const py = y + wave1 + wave2;
                if (x === 0) this.ctx.moveTo(x, py);
                else this.ctx.lineTo(x, py);
            }
            this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.03)';
            this.ctx.stroke();
        }
    }
}

// ==========================================
// CUSTOM CURSOR
// ==========================================
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.dot = document.getElementById('custom-cursor-dot');
        if (!this.cursor || !this.dot || window.innerWidth < 768) return;

        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.15;

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.dot.style.left = e.clientX + 'px';
            this.dot.style.top = e.clientY + 'px';
        });

        // Add hover effect to interactive elements
        const hoverEls = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .about-card, .filter-btn');
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hovering'));
        });

        this.animate();
    }

    animate() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
        this.cursor.style.left = this.pos.x + 'px';
        this.cursor.style.top = this.pos.y + 'px';
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// DATA
// ==========================================
const skills = [
    { category: "Programming & Data", icon: "code-2", tags: ["Python", "SQL", "Pandas", "NumPy", "Statistics", "EDA", "Excel"] },
    { category: "Machine Learning", icon: "brain", tags: ["XGBoost", "Random Forest", "Logistic Regression", "SVM", "Gradient Boosting", "SMOTE"] },
    { category: "Deep Learning & NLP", icon: "message-square", tags: ["LSTM", "spaCy", "NLTK", "FAISS", "Hugging Face", "Google Gemini", "RAG"] },
    { category: "Business Intelligence", icon: "bar-chart-2", tags: ["Power BI", "Tableau", "DAX", "Data Modeling", "KPI Design"] },
    { category: "Time Series & Forecasting", icon: "trending-up", tags: ["ARIMA", "SARIMA", "Holt-Winters", "LSTM Forecasting", "Seasonal Decomposition"] },
    { category: "Tools & Deployment", icon: "settings", tags: ["Streamlit", "Flask", "React", "MySQL", "MongoDB", "Git", "Jupyter", "Docker"] }
];

const experience = [
    {
        role: "AI Developer Intern", company: "AiSPRY", period: "March 2025 – August 2025",
        description: [
            "Developed production-grade NLP and Deep Learning models for enterprise AI solutions, achieving 25% performance improvement through hyperparameter optimization.",
            "Architected end-to-end ML pipelines integrating data ingestion, model training, and deployment for real-time inference across cross-functional deliverables.",
            "Collaborated with product and engineering teams to integrate AI capabilities into production environments, reducing manual processing by 40%."
        ]
    },
    {
        role: "Data Science Intern", company: "AiSPRY", period: "February 2025 – March 2025",
        description: [
            "Executed comprehensive EDA and data cleaning on datasets exceeding 50K+ records, identifying 12+ actionable business insights per engagement.",
            "Built predictive models for time-series forecasting and classification tasks with measurable accuracy benchmarks across multiple model architectures.",
            "Designed automated Power BI reporting dashboards, reducing manual reporting cycles from 3 days to real-time refresh."
        ]
    }
];

const projects = [
    {
        title: "Telecom Customer Intelligence & Churn Analytics Platform", category: "ml",
        problem: "A telecom provider with 7,000+ subscribers was losing ~26% of customers annually — $4.2M in projected revenue erosion with no predictive visibility into at-risk accounts.",
        solution: "Engineered an ML-powered churn prediction platform: built pipelines for 20+ customer signals, trained 7 classifiers, and deployed a real-time Streamlit dashboard for proactive retention targeting.",
        kpis: [{ value: "82%", label: "Accuracy" }, { value: "7", label: "Models" }, { value: "$4.2M", label: "Rev. Saved" }, { value: "18%", label: "Churn ↓" }],
        tools: ["Python", "XGBoost", "Scikit-Learn", "SQL", "Streamlit", "Pandas"],
        image: "assets/images/telecom-dashboard.png", liveLink: "#", github: "https://github.com/anithaeudulla/telecom-churn_app"
    },
    {
        title: "Loan Default Risk Prediction & Credit Scoring Engine", category: "ml",
        problem: "A lending institution processing 10,000+ applications annually had a 15% default rate — $8.5M in write-offs. Manual underwriting was slow and subjective.",
        solution: "Built a production-grade ML credit risk system: engineered 25+ risk features, applied SMOTE, trained 4 models, deployed Streamlit app with SHAP explainability for loan officers.",
        kpis: [{ value: "84%", label: "ROC-AUC" }, { value: "84%", label: "Recall" }, { value: "$2.1M", label: "Savings" }, { value: "35%", label: "FN ↓" }],
        tools: ["Python", "XGBoost", "SHAP", "Scikit-Learn", "SMOTE", "Streamlit"],
        image: "assets/images/loan-dashboard.png", liveLink: "#", github: "https://github.com/AnithaEudulla/Loan-Default-Prediction"
    },
    {
        title: "Iron Ore Price Forecasting & Procurement Optimization Engine", category: "ml",
        problem: "Extreme iron ore price volatility ($80–$220/MT) was causing $3M+ in procurement cost overruns. No predictive capability existed for forward-looking price planning.",
        solution: "Developed a multi-model forecasting engine using 8 algorithms (ARIMA, SARIMA, SARIMAX, Holt-Winters, RF, SVR, XGBoost, LSTM) with seasonal decomposition and automated model selection.",
        kpis: [{ value: "8", label: "Models" }, { value: "Low", label: "RMSE" }, { value: "$3M+", label: "Savings" }, { value: "30-day", label: "Forecast" }],
        tools: ["Python", "LSTM", "SARIMA", "XGBoost", "TensorFlow", "SQL", "Streamlit"],
        image: "assets/images/ironore-dashboard.png", liveLink: "#", github: "https://github.com/AnithaEudulla/iron-ore-forecasting"
    },
    {
        title: "Sales Performance Analytics Dashboard", category: "bi",
        problem: "A $2.3M retail operation across 4 regions lacked unified visibility into sales trends, customer segments, and product performance.",
        solution: "Designed an executive-grade Power BI dashboard with 15+ DAX measures, running totals, YTD analysis, and drill-through filters across Region, Category, and Segment dimensions.",
        kpis: [{ value: "$2.3M", label: "Revenue" }, { value: "+7.2%", label: "MoM Growth" }, { value: "$503", label: "Avg Order" }, { value: "3,792", label: "Customers" }],
        tools: ["Power BI", "SQL", "DAX", "Excel", "Data Modeling"],
        image: "assets/images/sales-performance-dashboard.png", liveLink: "https://www.novypro.com/project/sales-performance-dashboard", github: "https://github.com/AnithaEudulla/sales-dashboard"
    },
    {
        title: "E-Commerce Business Intelligence Platform", category: "bi",
        problem: "An online retail platform with ₹642M+ revenue across 6,000+ customers had no centralized BI layer for brand performance and revenue attribution.",
        solution: "Built an end-to-end Power BI analytics platform tracking revenue by category, brand, state, customer, and payment method with interactive year-over-year comparisons.",
        kpis: [{ value: "₹642M", label: "Revenue" }, { value: "10K+", label: "Orders" }, { value: "6,016", label: "Customers" }, { value: "₹64K", label: "Avg Order" }],
        tools: ["Power BI", "SQL", "DAX", "Excel", "Python"],
        image: "assets/images/ecommerce-bi-dashboard.png", liveLink: "#", github: "#"
    },
    {
        title: "EduBot — AI-Powered NCERT Chatbot for Students", category: "ai",
        problem: "Class 10 students spend 45+ minutes searching NCERT chapters for answers. Low access to intelligent Q&A tools creates a knowledge gap for millions of learners.",
        solution: "Built a RAG-based chatbot: processed NCERT PDFs, generated 300-dim spaCy embeddings, indexed in FAISS for sub-second retrieval, and integrated Google Gemini 1.5 Flash for contextual answers.",
        kpis: [{ value: "16", label: "Chapters" }, { value: "95%", label: "Accuracy" }, { value: "<1s", label: "Response" }, { value: "60%", label: "Time ↓" }],
        tools: ["Python", "spaCy", "FAISS", "Google Gemini", "NLTK", "PyMuPDF"],
        image: "assets/images/edubot-dashboard.png", liveLink: "#", github: "https://github.com/AnithaEudulla/Edubot-AI-Chatbot"
    },
    {
        title: "AI Storytelling App — Multilingual Story Generator for Kids", category: "ai",
        problem: "Children's creative content is generic and monolingual. Educators need personalized, multilingual storytelling tools that engage young learners in their native language.",
        solution: "Built a full-stack platform: React frontend, Flask backend with Mistral-7B for generation, gTTS for audio narration in 3 languages, and MySQL for story persistence and feedback analytics.",
        kpis: [{ value: "3", label: "Languages" }, { value: "500+", label: "Beta Users" }, { value: "75%", label: "Completion" }, { value: "4.6★", label: "Rating" }],
        tools: ["React", "Flask", "Mistral-7B", "gTTS", "MySQL", "OpenRouter API"],
        image: "assets/images/storytelling-dashboard.png", liveLink: "#", github: "https://github.com/AnithaEudulla/ai-storytelling-app"
    },
    {
        title: "HR Attrition & Workforce Retention Dashboard", category: "bi",
        problem: "Unidentified patterns in employee turnover costing $500K+ annually in recruitment, onboarding, and productivity losses.",
        solution: "Implemented a retention analytics dashboard in Power BI with predictive attrition scoring, department-level benchmarks, and root-cause analysis across demographics and tenure.",
        kpis: [{ value: "15%", label: "Turnover ↓" }, { value: "$500K", label: "Savings" }, { value: "12", label: "KPIs" }, { value: "Real-time", label: "Refresh" }],
        tools: ["Power BI", "SQL", "Python", "Excel", "DAX"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        liveLink: "https://www.novypro.com/project/hr-attrition-dashboard", github: "https://github.com/AnithaEudulla/hr-analytics"
    },
    {
        title: "MILTRANS — Military-Grade Translation Engine", category: "ai",
        problem: "Technical military documents require domain-specific translation accuracy that commercial translators fail to achieve, causing defense miscommunication.",
        solution: "Fine-tuned Whisper (speech-to-text) and MarianMT (translation) models on curated military datasets, building a specialized pipeline for accurate technical document translation.",
        kpis: [{ value: "40%", label: "Accuracy ↑" }, { value: "2", label: "Models" }, { value: "Domain", label: "Specific" }, { value: "API", label: "Deployed" }],
        tools: ["PyTorch", "Whisper", "MarianMT", "NLP", "Docker", "API"],
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        liveLink: "#", github: "#"
    },
    {
        title: "Car Sales Analytics Dashboard", category: "bi",
        problem: "Fragmented data across 5+ regional dealerships made it impossible to track performance, trends, or optimize inventory in real-time.",
        solution: "Centralized multi-source sales data into a Tableau dashboard with automated ETL, enabling real-time performance tracking and inventory optimization.",
        kpis: [{ value: "95%", label: "Time ↓" }, { value: "5+", label: "Regions" }, { value: "15min", label: "vs 3 Days" }, { value: "Auto", label: "Refresh" }],
        tools: ["Tableau", "Python", "MySQL", "ETL"],
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
        liveLink: "#", github: "#"
    }
];

// ==========================================
// TYPEWRITER
// ==========================================
const typewriterTexts = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Business Intelligence Analyst",
    "AI/NLP Developer",
    "Predictive Analytics Specialist",
];

let twIdx = 0, charIdx = 0, isDeleting = false, twEl;

function typeWriter() {
    if (!twEl) return;
    const txt = typewriterTexts[twIdx];
    twEl.textContent = isDeleting ? txt.substring(0, charIdx - 1) : txt.substring(0, charIdx + 1);
    isDeleting ? charIdx-- : charIdx++;
    let speed = isDeleting ? 30 : 65;
    if (!isDeleting && charIdx === txt.length) { speed = 2200; isDeleting = true; }
    else if (isDeleting && charIdx === 0) { isDeleting = false; twIdx = (twIdx + 1) % typewriterTexts.length; speed = 500; }
    setTimeout(typeWriter, speed);
}

// ==========================================
// POPULATE DOM
// ==========================================
function populateSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    skills.forEach((skill) => {
        const card = document.createElement('div');
        card.className = 'skill-card gsap-reveal';
        card.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon"><i data-lucide="${skill.icon}"></i></div>
                <h3 class="skill-title">${skill.category}</h3>
            </div>
            <div class="skill-tags">${skill.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
        `;
        grid.appendChild(card);
    });
}

function populateExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    experience.forEach((exp) => {
        const item = document.createElement('div');
        item.className = 'timeline-item gsap-reveal-left';
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <span class="time-period">${exp.period}</span>
            <h3 class="job-title">${exp.role}</h3>
            <p class="company-name">${exp.company}</p>
            <ul class="job-desc">${exp.description.map(d => `<li>${d}</li>`).join('')}</ul>
        `;
        timeline.appendChild(item);
    });
}

function populateProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    projects.forEach((proj) => {
        const card = document.createElement('div');
        card.className = 'project-card gsap-reveal-scale';
        card.setAttribute('data-category', proj.category);
        const categoryLabel = proj.category === 'ml' ? 'Machine Learning' : proj.category === 'bi' ? 'Business Intelligence' : 'AI / NLP';
        const hasLinks = proj.liveLink !== '#' || proj.github !== '#';

        card.innerHTML = `
            <div class="project-img-container">
                <span class="project-category-badge">${categoryLabel}</span>
                <img src="${proj.image}" alt="${proj.title}" class="project-img" loading="lazy">
            </div>
            <div class="project-body">
                <h3 class="project-title">${proj.title}</h3>
                <div class="project-details">
                    <p><strong>Challenge:</strong> ${proj.problem}</p>
                    <p><strong>Solution:</strong> ${proj.solution}</p>
                </div>
                ${proj.kpis ? `<div class="project-kpi-row">${proj.kpis.map(k => `<div class="project-kpi"><span class="project-kpi-value">${k.value}</span><span class="project-kpi-label">${k.label}</span></div>`).join('')}</div>` : ''}
                ${hasLinks ? `<div class="project-links">
                    ${proj.liveLink !== '#' ? `<a href="${proj.liveLink}" target="_blank" class="project-link-btn primary"><i data-lucide="external-link"></i> Live Dashboard</a>` : ''}
                    ${proj.github !== '#' ? `<a href="${proj.github}" target="_blank" class="project-link-btn secondary"><i data-lucide="github"></i> Source Code</a>` : ''}
                </div>` : ''}
                <div class="project-tech">${proj.tools.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================
// PROJECT FILTERS
// ==========================================
function setupFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const show = filter === 'all' || card.getAttribute('data-category') === filter;
                if (show) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    // GSAP stagger reveal on filter
                    gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounters() {
    document.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        gsap.fromTo(el, { innerText: 0 }, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: 'top 90%' },
            onUpdate: function () {
                el.textContent = Math.ceil(parseFloat(el.textContent)) + '+';
            }
        });
    });
}

// ==========================================
// GSAP ANIMATIONS
// ==========================================
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero stagger
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTL
        .to('#hero-badge', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to('#hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 0.4)
        .to('#hero-role', { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .to('#hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .to('#hero-contacts', { opacity: 1, y: 0, duration: 0.7 }, 1.1)
        .to('#hero-actions', { opacity: 1, y: 0, duration: 0.7 }, 1.3)
        .to('#hero-metrics', { opacity: 1, y: 0, duration: 0.8 }, 1.5)
        .to('#scroll-indicator', { opacity: 1, duration: 1 }, 2);

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 85%' }
        });
    });

    // Reveal up
    gsap.utils.toArray('.gsap-reveal').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1, y: 0, duration: 0.7,
            delay: (i % 3) * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // Reveal left
    gsap.utils.toArray('.gsap-reveal-left').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1, x: 0, duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    // Reveal right
    gsap.utils.toArray('.gsap-reveal-right').forEach((el) => {
        gsap.to(el, {
            opacity: 1, x: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    // Scale reveal (project cards)
    gsap.utils.toArray('.gsap-reveal-scale').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1, scale: 1, duration: 0.7,
            delay: (i % 2) * 0.12,
            ease: 'back.out(1.3)',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // About cards stagger
    gsap.utils.toArray('.about-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0, x: 60, duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
        });
    });

    // About stats
    gsap.utils.toArray('.about-stat').forEach((stat, i) => {
        gsap.from(stat, {
            opacity: 0, y: 30, duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: stat, start: 'top 92%' }
        });
    });

    // Glass cards (edu, cert)
    gsap.utils.toArray('.glass-card').forEach(card => {
        gsap.from(card, {
            opacity: 0, y: 40, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
        });
    });

    // CTA section parallax feel
    gsap.from('.cta-content', {
        y: 60, opacity: 0, duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }
    });

    // Contact section
    gsap.from('.contact-info', {
        x: -50, opacity: 0, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' }
    });

    gsap.from('.contact-form-wrap', {
        x: 50, opacity: 0, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' }
    });

    // Parallax-like section tags
    gsap.utils.toArray('.section-tag').forEach(tag => {
        gsap.from(tag, {
            x: -30, opacity: 0, duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: tag, start: 'top 88%' }
        });
    });

    // Counter animation
    animateCounters();

    // Nav background on scroll
    ScrollTrigger.create({
        start: 50,
        onUpdate: (self) => {
            const nav = document.getElementById('nav');
            if (self.scroll() > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
    });

    // Scroll indicator fade out
    ScrollTrigger.create({
        start: 200,
        onUpdate: (self) => {
            const indicator = document.getElementById('scroll-indicator');
            if (indicator) indicator.style.opacity = self.scroll() > 200 ? 0 : 1;
        }
    });

    // Magnetic effect on buttons (subtle)
    document.querySelectorAll('.btn-primary, .btn-nav').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Populate
    populateSkills();
    populateExperience();
    populateProjects();
    setupFilters();

    if (window.lucide) lucide.createIcons();

    // Typewriter
    twEl = document.getElementById('typewriter');
    typeWriter();

    // GSAP
    initGSAP();

    // Topo Canvas
    new TopoCanvas();

    // Custom Cursor
    new CustomCursor();

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.getAttribute('id'); });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll to top
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Contact form
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const origHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #34d399, #06b6d4)';
            if (window.lucide) lucide.createIcons();
            setTimeout(() => { btn.innerHTML = origHTML; btn.style.background = ''; if (window.lucide) lucide.createIcons(); form.reset(); }, 3000);
        });
    }

    // Re-attach cursor hovers after dynamic content
    setTimeout(() => {
        if (window.innerWidth >= 768) {
            const cursor = document.getElementById('custom-cursor');
            document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .about-card, .filter-btn, .contact-method').forEach(el => {
                el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovering'));
                el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovering'));
            });
        }
    }, 500);
});
