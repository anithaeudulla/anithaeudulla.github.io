// Data for Personalization
const skills = [
    {
        category: "Languages & Core",
        icon: "code",
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
        category: "Visualization",
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
        tags: ["Streamlit", "Jupyter Notebook", "Git"]
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
        title: "NCERT Educational Chatbot",
        problem: "Students struggle to find specific answers within vast NCERT textbooks efficiently.",
        solution: "Built a RAG-based chatbot that indexes NCERT textbooks and provides cited answers.",
        tools: ["Python", "Hugging Face", "Pinecone", "Streamlit"],
        results: "Reduced research time for students by 60% with 95% accuracy in answer retrieval.",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
        link: "#",
        github: "#"
    },
    {
        title: "Iron Ore Forecasting Dashboard",
        problem: "Volatility in iron ore prices makes long-term procurement planning difficult.",
        solution: "Developed a Bi-LSTM model to forecast prices based on global market indicators.",
        tools: ["TensorFlow", "Pandas", "Power BI", "Python"],
        results: "Achieved an RMSE of 2.5 on 30-day price predictions.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        link: "#",
        github: "#"
    },
    {
        title: "AI Storytelling App",
        problem: "Users face 'writer's block' when creating interactive stories.",
        solution: "Integrated GPT-4 with a branching narrative engine.",
        tools: ["OpenAI API", "Flask", "React", "CSS"],
        results: "Engaged over 500 beta users with 75% completion rate.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
        link: "#",
        github: "#"
    },
    {
        title: "MILTRANS Project",
        problem: "Inaccuracy in technical military translation.",
        solution: "Fine-tuned Whisper and MarianMT models on domain datasets.",
        tools: ["PyTorch", "NLP", "API", "Docker"],
        results: "Improved translation accuracy by 40%.",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        link: "#",
        github: "#"
    },
    {
        title: "HR Analytics Dashboard",
        problem: "Unidentified patterns in employee turnover.",
        solution: "Implemented retention prediction model in Power BI.",
        tools: ["Power BI", "SQL", "Python", "Excel"],
        results: "15% reduction in turnover in test departments.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        link: "#",
        github: "#"
    },
    {
        title: "Car Sales Dashboard",
        problem: "Fragmented sales data across regions.",
        solution: "Centralized sales data from MySQL into a Tableau dashboard.",
        tools: ["Tableau", "Python", "MySQL"],
        results: "Reporting time reduced from 3 days to 15 minutes.",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
        link: "#",
        github: "#"
    }
];

// Populate Skills
function populateSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
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

// Populate Experience
function populateExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="time-period">${exp.period}</span>
                <h3 class="job-title">${exp.role}</h3>
                <p class="company-name">${exp.company}</p>
                <ul class="job-desc">
                    ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                </ul>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// Populate Projects
function populateProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-img-container">
                <img src="${proj.image}" alt="${proj.title}" class="project-img">
            </div>
            <div class="project-body">
                <h3 class="project-title" style="margin-bottom: 0.5rem;">${proj.title}</h3>
                <div class="project-details" style="font-size: 0.95rem; line-height: 1.6;">
                    <p style="margin-bottom: 0.75rem;"><strong>Problem:</strong> ${proj.problem}</p>
                    <p style="margin-bottom: 0.75rem;"><strong>Solution:</strong> ${proj.solution}</p>
                    <p><strong>Results:</strong> ${proj.results}</p>
                </div>
                <div class="project-tech" style="margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${proj.tools.map(t => `<span class="skill-tag" style="background: rgba(56, 189, 248, 0.05); font-size: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 100px; border: 1px solid var(--border-color);">${t}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    populateSkills();
    populateExperience();
    populateProjects();

    // Refresh icons after population
    if (window.lucide) {
        lucide.createIcons();
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // CSS class helper for reveal
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
