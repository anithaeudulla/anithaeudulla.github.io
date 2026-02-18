// ============================================
// ANITHA EUDULLA — PORTFOLIO JS
// Premium Interactive Logic
// ============================================

// ---------- Data ----------
const skills = [
    {
        category: "Languages & Core",
        icon: "code-2",
        tags: ["SQL", "Python (Pandas, NumPy)", "Excel", "Statistics", "EDA"]
    },
    {
        category: "AI & Machine Learning",
        icon: "brain",
        tags: ["Machine Learning", "Deep Learning", "NLP"]
    },
    {
        category: "NLP Frameworks",
        icon: "message-square",
        tags: ["spaCy", "NLTK", "Hugging Face"]
    },
    {
        category: "Visualization & BI",
        icon: "bar-chart-2",
        tags: ["Power BI", "Tableau", "DAX", "Data Modeling"]
    },
    {
        category: "Databases",
        icon: "database",
        tags: ["MySQL", "MongoDB"]
    },
    {
        category: "Tools & DevOps",
        icon: "settings",
        tags: ["Streamlit", "Jupyter Notebook", "Git", "Flask"]
    }
];

const experience = [
    {
        role: "AI Developer Intern",
        company: "AiSPRY",
        period: "March 2025 – August 2025",
        description: [
            "Developing advanced intelligent systems using NLP and Deep Learning models.",
            "Optimized model performance by 25% through hyperparameter tuning and data augmentation.",
            "Collaborated with cross-functional teams to integrate AI models into production environments."
        ]
    },
    {
        role: "Data Science Intern",
        company: "AiSPRY",
        period: "February 2025 – March 2025",
        description: [
            "Executed data cleaning and exploratory data analysis (EDA) on large datasets.",
            "Built predictive models for time-series forecasting and classification tasks.",
            "Created automated reporting dashboards using Power BI."
        ]
    }
];

const projects = [
    {
        title: "Sales Performance Dashboard",
        problem: "Management lacked a real-time, interactive view of sales trends and customer behavior across regions.",
        solution: "Built a comprehensive Power BI dashboard featuring MoM growth tracking, DAX-driven KPIs, and segment contribution analysis.",
        tools: ["Power BI", "SQL", "DAX", "Excel"],
        results: "Enabled 7.2% MoM growth monitoring and optimized inventory planning through regional insights.",
        image: "https://images.unsplash.com/photo-1543286386-713bcd549651?auto=format&fit=crop&q=80&w=800",
        liveLink: "https://www.novypro.com/project/sales-performance-dashboard",
        github: "https://github.com/AnithaEudulla/sales-dashboard"
    },
    {
        title: "NCERT Educational Chatbot",
        problem: "Students struggle to find specific answers within vast NCERT textbooks efficiently.",
        solution: "Built a RAG-based chatbot that indexes NCERT textbooks and provides cited answers.",
        tools: ["Python", "Hugging Face", "Pinecone", "Streamlit"],
        results: "Reduced research time for students by 60% with 95% accuracy in answer retrieval.",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
        liveLink: "#",
        github: "#"
    },
    {
        title: "Iron Ore Forecasting Dashboard",
        problem: "Volatility in iron ore prices makes long-term procurement planning difficult.",
        solution: "Developed a Bi-LSTM model to forecast prices based on global market indicators.",
        tools: ["TensorFlow", "Pandas", "Power BI", "Python"],
        results: "Achieved an RMSE of 2.5 on 30-day price predictions.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        liveLink: "https://www.novypro.com/project/iron-ore-forecasting",
        github: "https://github.com/AnithaEudulla/iron-ore-forecasting"
    },
    {
        title: "AI Storytelling App",
        problem: "Users face 'writer's block' when creating interactive stories.",
        solution: "Integrated GPT-4 with a branching narrative engine.",
        tools: ["OpenAI API", "Flask", "React", "CSS"],
        results: "Engaged over 500 beta users with 75% completion rate.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
        liveLink: "#",
        github: "#"
    },
    {
        title: "MILTRANS Project",
        problem: "Inaccuracy in technical military translation.",
        solution: "Fine-tuned Whisper and MarianMT models on domain datasets.",
        tools: ["PyTorch", "NLP", "API", "Docker"],
        results: "Improved translation accuracy by 40%.",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        liveLink: "#",
        github: "#"
    },
    {
        title: "HR Attrition & Retention Dashboard",
        problem: "Unidentified patterns in employee turnover.",
        solution: "Implemented retention prediction model in Power BI.",
        tools: ["Power BI", "SQL", "Python", "Excel"],
        results: "15% reduction in turnover in test departments.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        liveLink: "https://www.novypro.com/project/hr-attrition-dashboard",
        github: "https://github.com/AnithaEudulla/hr-analytics"
    },
    {
        title: "Car Sales Dashboard",
        problem: "Fragmented sales data across regions.",
        solution: "Centralized sales data from MySQL into a Tableau dashboard.",
        tools: ["Tableau", "Python", "MySQL"],
        results: "Reporting time reduced from 3 days to 15 minutes.",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
        liveLink: "#",
        github: "#"
    }
];

// ---------- Typewriter ----------
const typewriterTexts = [
    "Data Scientist",
    "AI/ML Engineer",
    "Business Analyst",
    "NLP Specialist",
    "Power BI Developer",
];

let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterEl;

function typeWriter() {
    if (!typewriterEl) return;
    const currentText = typewriterTexts[typewriterIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
        speed = 400;
    }

    setTimeout(typeWriter, speed);
}

// ---------- Populate Functions ----------
function populateSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    skills.forEach((skill, idx) => {
        const card = document.createElement('div');
        card.className = 'skill-card reveal-element';
        card.style.transitionDelay = `${idx * 0.08}s`;
        card.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon"><i data-lucide="${skill.icon}"></i></div>
                <h3 class="skill-title">${skill.category}</h3>
            </div>
            <div class="skill-tags">
                ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

function populateExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    experience.forEach((exp, idx) => {
        const item = document.createElement('div');
        item.className = 'timeline-item reveal-element';
        item.style.transitionDelay = `${idx * 0.15}s`;
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <span class="time-period">${exp.period}</span>
            <h3 class="job-title">${exp.role}</h3>
            <p class="company-name">${exp.company}</p>
            <ul class="job-desc">
                ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
            </ul>
        `;
        timeline.appendChild(item);
    });
}

function populateProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    projects.forEach((proj, idx) => {
        const card = document.createElement('div');
        card.className = 'project-card reveal-element';
        card.style.transitionDelay = `${idx * 0.1}s`;

        const hasLinks = proj.liveLink !== '#' || proj.github !== '#';

        card.innerHTML = `
            <div class="project-img-container">
                <img src="${proj.image}" alt="${proj.title}" class="project-img" loading="lazy">
            </div>
            <div class="project-body">
                <h3 class="project-title">${proj.title}</h3>
                <div class="project-details">
                    <p><strong>Problem:</strong> ${proj.problem}</p>
                    <p><strong>Solution:</strong> ${proj.solution}</p>
                    <p><strong>Results:</strong> ${proj.results}</p>
                </div>
                ${hasLinks ? `
                <div class="project-links">
                    ${proj.liveLink !== '#' ? `<a href="${proj.liveLink}" target="_blank" class="project-link-btn primary"><i data-lucide="external-link"></i> Live Dashboard</a>` : ''}
                    ${proj.github !== '#' ? `<a href="${proj.github}" target="_blank" class="project-link-btn secondary"><i data-lucide="github"></i> Source Code</a>` : ''}
                </div>
                ` : ''}
                <div class="project-tech">
                    ${proj.tools.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    // Populate sections
    populateSkills();
    populateExperience();
    populateProjects();

    // Refresh Lucide icons
    if (window.lucide) lucide.createIcons();

    // Typewriter
    typewriterEl = document.getElementById('typewriter');
    typeWriter();

    // ---- Navigation ----
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll effect on nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal-element, .section .section-header, .glass-card, .edu-card, .cert-card, .about-card, .about-text');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
        if (!el.classList.contains('reveal-element')) {
            el.classList.add('reveal-element');
        }
        revealObserver.observe(el);
    });

    // ---- Scroll to Top ----
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Contact Form ----
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #34d399, #06b6d4)';
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                if (window.lucide) lucide.createIcons();
                form.reset();
            }, 3000);
        });
    }
});
