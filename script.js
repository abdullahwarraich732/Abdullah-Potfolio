// Initialize Lucide icons on first load
lucide.createIcons();

// Initialize AOS
AOS.init({
    // ... (AOS settings remain unchanged) ...
    disable: false, // 'mobile' to disable on mobile, false to enable
    startEvent: 'DOMContentLoaded', 
    initClassName: 'aos-init', 
    animatedClassName: 'aos-animate', 
    useClassNames: false, 
    disableMutationObserver: false, 
    debounceDelay: 50, 
    throttleDelay: 99, 
    offset: 120, 
    delay: 0, 
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should only happen once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});


// --- Data Model for Projects ---
// !!! THIS SECTION HAS BEEN REPLACED WITH YOUR NEW PROJECT LIST !!!
const projects = [
    {
        id: 'proj-xcon',
        title: "XCon Technologies",
        category: "Software Company",
        tags: ["React", "JavaScript", "Node.js"],
        isFeatured: true, // Set to true to appear in "Featured" by default
        techStack: ["React", "JavaScript", "Node.js"],
        preview: "Modern website for a software technology company.",
        description: "Built a fully responsive and dynamic website for XCon Technologies, highlighting their services and projects using a modern React-based frontend.",
        icon: 'server', // Lucide icon name
        link: 'https://github.com/mawarraich', // Placeholder for code link
        liveLink: 'https://www.xcontechnologies.com/',
        year: 2024
    },
    {
        id: 'proj-dunya',
        title: "Dunya Consultants",
        category: "Digital Agency",
        tags: ["React", "JavaScript"],
        isFeatured: true, // Set to true to appear in "Featured" by default
        techStack: ["React", "JavaScript"],
        preview: "Professional website for a digital consulting agency.",
        description: "Developed the online presence for Dunya Consultants, focusing on a clean UI/UX to attract and inform potential clients.",
        icon: 'briefcase', // Lucide icon name
        link: 'https://github.com/mawarraich', // Placeholder for code link
        liveLink: 'https://www.dunyaconsultants.com/',
        year: 2024
    },
    {
        id: 'proj-ewd',
        title: "EWD Tech",
        category: "E-commerce Development",
        tags: ["React", "JavaScript"],
        isFeatured: true, // Set to true to appear in "Featured" by default
        techStack: ["React", "JavaScript"],
        preview: "Landing page for an e-commerce web development agency.",
        description: "Created a high-converting landing page for EWD Tech, showcasing their expertise in e-commerce solutions.",
        icon: 'shopping-cart', // Lucide icon name
        link: 'https://github.com/mawarraich', // Placeholder for code link
        liveLink: 'https://www.ewd-tech.com/',
        year: 2023
    },
    {
        id: 'proj-quraan',
        title: "Learn Quraan",
        category: "E-learning Platform",
        tags: ["PHP", "Bootstrap", "MySQL"],
        isFeatured: true, // Set to true to appear in "Featured" by default
        techStack: ["PHP", "Bootstrap", "MySQL"],
        preview: "An online platform for religious education.",
        description: "Custom-built PHP platform by TechSoft Solutions, providing a comprehensive portal for students to learn Quraan online.",
        icon: 'book-open', // Lucide icon name
        link: 'https://github.com/mawarraich', // Placeholder for code link
        liveLink: 'https://www.learnquraan.com/',
        year: 2023
    },
    {
        id: 'proj-shopify',
        title: "(Your Shopify Project)",
        category: "E-commerce",
        tags: ["Shopify", "Liquid"],
        isFeatured: false, // Set to false as it's a placeholder
        techStack: ["Shopify", "Liquid", "E-commerce"],
        preview: "A successful e-commerce store for [Product Type].",
        description: "Customized and launched a full-featured Shopify store, leading to...",
        icon: 'shopping-bag', // Lucide icon name
        link: '#', // Placeholder for code link
        liveLink: 'https://www.your-shopify-store-link.com/',
        year: 2022
    },
    {
        id: 'proj-wordpress',
        title: "(Your WordPress Project)",
        category: "Content / E-commerce",
        tags: ["WordPress", "PHP", "Elementor"],
        isFeatured: false, // Set to false as it's a placeholder
        techStack: ["WordPress", "PHP", "Elementor", "CMS"],
        preview: "A content-rich blog/store for [Industry].",
        description: "Designed and developed a custom WordPress theme...",
        icon: 'layout-grid', // Lucide icon name
        link: '#', // Placeholder for code link
        liveLink: 'https://www.your-wordpress-site-link.com/',
        year: 2022
    }
];

// --- Get Elements ---
const featuredGridEl = document.getElementById('featured-project-grid');
const noFeaturedMessageEl = document.getElementById('no-featured-message');
const featuredSectionContainer = document.getElementById('featured-section-container');

const projectGridEl = document.getElementById('project-grid');
const filterButtonsEl = document.getElementById('filter-buttons');
const searchInputEl = document.getElementById('search-input');
const noProjectsMessageEl = document.getElementById('no-projects-message');

const modalEl = document.getElementById('project-modal');
const modalContentEl = document.getElementById('modal-content');
const notificationContainer = document.getElementById('notification-container');
const burgerCheckbox = document.getElementById('burger-checkbox'); 
const mobileMenu = document.getElementById('mobile-menu');

// --- State Management ---
let currentFilter = 'All Projects';
let currentSearchTerm = '';
let searchTimeout;
let starredProjectIds = new Set(); // Stores the IDs of starred projects

// --- Star/Feature Functions ---

/**
 * Loads starred projects from localStorage into the Set
 */
function getStarredProjects() {
    const storedStars = localStorage.getItem('starredProjects');
    if (storedStars) {
        // If localStorage has data, use that
        starredProjectIds = new Set(JSON.parse(storedStars));
    } else {
        // Otherwise, initialize from the default 'isFeatured' flag
        const defaultFeatured = projects.filter(p => p.isFeatured).map(p => p.id);
        starredProjectIds = new Set(defaultFeatured);
        saveStarredProjects(); // Save this default state
    }
}

/**
 * Saves the current starredProjectIds Set to localStorage
 */
function saveStarredProjects() {
    localStorage.setItem('starredProjects', JSON.stringify(Array.from(starredProjectIds)));
}

/**
 * Toggles the starred status of a project
 * @param {string} projectId - The ID of the project to star/unstar
 * @param {Event} event - The click event
 */
window.toggleStar = function(projectId, event) {
    event.stopPropagation(); // Prevent the modal from opening
    
    if (starredProjectIds.has(projectId)) {
        starredProjectIds.delete(projectId);
    } else {
        starredProjectIds.add(projectId);
    }
    
    saveStarredProjects(); // Save the new state
    renderAllSections(); // Re-render both project grids
}

// --- Core Project Filtering and Rendering ---

/**
 * Populates the filter buttons based on project tags.
 */
function populateFilters() {
    if (!filterButtonsEl) return;
    
    const allTags = new Set();
    projects.forEach(p => p.tags.forEach(tag => allTags.add(tag)));
    
    const sortedTags = ['All Projects', ...Array.from(allTags).sort()];
    
    filterButtonsEl.innerHTML = ''; // Clear existing
    
    sortedTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-btn px-4 py-2 rounded-lg font-medium transition duration-300';
        const count = tag === 'All Projects' ? projects.length : projects.filter(p => p.tags.includes(tag)).length;
        button.textContent = `${tag} (${count})`;
        button.dataset.filter = tag;
        
        button.className = (tag === currentFilter)
            ? 'filter-btn px-4 py-2 rounded-lg font-medium transition duration-300 bg-teal-500 text-white shadow-lg'
            : 'filter-btn px-4 py-2 rounded-lg font-medium transition duration-300 bg-slate-800 text-slate-300 hover:bg-slate-700';
        
        button.onclick = () => {
            currentFilter = tag;
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.className = 'filter-btn px-4 py-2 rounded-lg font-medium transition duration-300 bg-slate-800 text-slate-300 hover:bg-slate-700';
            });
            button.className = 'filter-btn px-4 py-2 rounded-lg font-medium transition duration-300 bg-teal-500 text-white shadow-lg';
            
            renderAllSections();
        };
        filterButtonsEl.appendChild(button);
    });
}

/**
 * Creates the HTML for a single project card.
 * @param {object} project - The project object
 * @returns {string} - The HTML string for the card
 */
function createProjectCard(project) {
    const isStarred = starredProjectIds.has(project.id);
    
    // Use default 'isFeatured' for the yellow badge, but 'isStarred' for the star icon state
    const isDefaultFeatured = project.isFeatured; 
    
    const starIconHTML = `
        <button onclick="toggleStar('${project.id}', event)" class="p-1 rounded-full transition-colors duration-200 ${isStarred ? 'text-yellow-400' : 'text-slate-500 hover:text-yellow-400'}">
            <i data-lucide="star" class="w-5 h-5" ${isStarred ? 'fill="currentColor"' : 'fill="none"'}></i>
        </button>
    `;

    return `
        <div class="bg-slate-800 rounded-xl p-6 shadow-2xl flex flex-col justify-between transition duration-300 border border-transparent hover:border-teal-400 hover:scale-[1.03] cursor-pointer"
                 data-index="${projects.indexOf(project)}"
                 data-aos="fade-up"
                 data-aos-delay="${(projects.indexOf(project) % 3) * 100}">
            
            <div>
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-2xl font-bold text-white group-hover:text-teal-400 pr-4">${project.title}</h3>
                    <div class="flex-shrink-0 flex items-center gap-2">
                        ${isDefaultFeatured ? '<span class="text-xs font-medium bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full">Featured</span>' : ''}
                        ${starIconHTML}
                    </div>
                </div>
                
                <p class="text-slate-400 mb-4 text-sm leading-relaxed" style="min-height: 80px;">${project.preview}</p>
                
                <div class="flex flex-wrap gap-2 mt-1 mb-4">
                    ${project.techStack.slice(0, 4).map(tech => `<span class="text-xs font-mono bg-slate-700 text-slate-200 px-2 py-0.5 rounded">${tech}</span>`).join('')}
                    ${project.techStack.length > 4 ? `<span class="text-xs font-mono bg-slate-600 text-slate-300 px-2 py-0.5 rounded">+${project.techStack.length - 4}</span>` : ''}
                </div>
            </div>
            
            <div class="flex justify-between items-center mt-4 border-t border-slate-700 pt-4">
                <div class="flex items-center gap-4">
                    ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" onclick="event.stopPropagation()" class="flex items-center text-sm text-slate-300 hover:text-teal-400 transition"><i data-lucide="external-link" class="w-4 h-4 mr-1.5"></i>Live</a>` : ''}
                    ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" onclick="event.stopPropagation()" class="flex items-center text-sm text-slate-300 hover:text-teal-400 transition"><i data-lucide="github" class="w-4 h-4 mr-1.5"></i>Code</a>` : ''}
                </div>
                <span class="text-sm text-slate-500">${project.year}</span>
            </div>
        </div>
    `;
}

/**
 * Renders only the "Featured Projects" grid
 */
function renderFeaturedProjects() {
    if (!featuredGridEl || !noFeaturedMessageEl) return;
    
    const featuredProjects = projects.filter(p => starredProjectIds.has(p.id));
    
    if (featuredProjects.length === 0) {
        noFeaturedMessageEl.classList.remove('hidden');
        featuredGridEl.classList.add('hidden');
        // Hide the whole section container if there are no featured items
        featuredSectionContainer.classList.add('hidden');
    } else {
        noFeaturedMessageEl.classList.add('hidden');
        featuredGridEl.classList.remove('hidden');
        featuredSectionContainer.classList.remove('hidden');
        
        featuredGridEl.innerHTML = ''; // Clear existing
        featuredProjects.forEach(project => {
            const cardHTML = createProjectCard(project);
            const cardElement = document.createElement('div');
            cardElement.innerHTML = cardHTML;
            // Add click listener to the card itself (not the button)
            cardElement.firstElementChild.addEventListener('click', () => openModal(projects.indexOf(project)));
            featuredGridEl.appendChild(cardElement.firstElementChild);
        });
    }
}

/**
 * Renders the main "All Projects" grid based on filters and search
 */
function renderAllProjectsGrid() {
    if (!projectGridEl || !noProjectsMessageEl) return;
    
    let filteredProjects = projects;

    // 1. Filter by category
    if (currentFilter !== 'All Projects') {
        filteredProjects = filteredProjects.filter(p => p.tags.includes(currentFilter));
    }
    
    // 2. Filter by search term
    if (currentSearchTerm.trim().length > 0) {
        const lowerCaseSearch = currentSearchTerm.trim().toLowerCase();
        filteredProjects = filteredProjects.filter(p => 
            p.title.toLowerCase().includes(lowerCaseSearch) ||
            p.preview.toLowerCase().includes(lowerCaseSearch) ||
            p.techStack.some(tech => tech.toLowerCase().includes(lowerCaseSearch)) ||
            p.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
        );
    }
    
    // --- Render "All Projects" Grid ---
    projectGridEl.innerHTML = ''; // Clear existing content
    
    if (filteredProjects.length === 0) {
        noProjectsMessageEl.classList.remove('hidden');
        projectGridEl.classList.add('hidden');
    } else {
        noProjectsMessageEl.classList.add('hidden');
        projectGridEl.classList.remove('hidden');
        
        filteredProjects.forEach(project => {
            const cardHTML = createProjectCard(project);
            const cardElement = document.createElement('div');
            cardElement.innerHTML = cardHTML;
            // Add click listener to the card itself (not the button)
            cardElement.firstElementChild.addEventListener('click', () => openModal(projects.indexOf(project)));
            projectGridEl.appendChild(cardElement.firstElementChild);
        });
    }
}
 
/**
 * Main function to re-render both project sections
 */
function renderAllSections() {
    renderFeaturedProjects();
    renderAllProjectsGrid();
    // Re-create all icons after rendering
    lucide.createIcons();
}
 

// --- Modal, Notification, and Menu Logic (Unchanged) ---

function toggleMobileMenu() {
    if (burgerCheckbox.checked) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }
}

const closeMobileMenu = () => {
    if(burgerCheckbox) {
        burgerCheckbox.checked = false; 
        toggleMobileMenu();
    }
};

function openModal(index) {
    const project = projects[index]; 

    modalContentEl.innerHTML = `
        <div class="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-700">
            <i data-lucide="${project.icon}" class="w-10 h-10 text-teal-400"></i>
            <div>
                <h2 class="text-3xl font-extrabold text-white">${project.title}</h2>
                <p class="text-sm font-medium text-teal-400/80">${project.category}</p>
            </div>
        </div>

        <h3 class="text-xl font-semibold text-slate-300 mb-3">Project Overview</h3>
        <p class="text-slate-400 mb-8">${project.description}</p>

        <h3 class="text-xl font-semibold text-slate-300 mb-3">Technology & Stack Deep Dive</h3>
        <div class="flex flex-wrap gap-3 mb-8">
            ${project.techStack.map(tech => `
                <span class="text-sm font-mono bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full shadow-md">${tech}</span>
            `).join('')}
        </div>

        <div class="flex justify-start space-x-4 mt-8">
            ${project.link && project.link !== '#' ? `
            <a href="${project.link}" target="_blank" class="btn-primary text-white font-semibold py-2 px-6 rounded-lg flex items-center shadow-lg">
                <i data-lucide="github" class="w-5 h-5 mr-2"></i> View Code
            </a>
            ` : ''}

            ${project.liveLink && project.liveLink !== '#' && !project.liveLink.includes('your-') ? `
            <a href="${project.liveLink}" target="_blank" class="bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-600 transition flex items-center">
                <i data-lucide="external-link" class="w-5 h-5 mr-2"></i> View Live
            </a>
            ` : `
            <a href="#contact" onclick="closeModal(); closeMobileMenu();" class="bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-600 transition flex items-center">
                Discuss Project
            </a>
            `}
        </div>
    `;
    lucide.createIcons();
    modalEl.classList.remove('hidden');
    modalEl.classList.add('flex');
    document.body.classList.add('overflow-hidden');
}

function closeModal(event) {
    if (!event || event.target === modalEl) {
        modalEl.classList.add('hidden');
        modalEl.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }
}

function showNotification(message, type = 'success') {
    // ... (Notification logic remains unchanged) ...
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600 border-green-400' : 'bg-red-600 border-red-400';
    notification.className = `p-4 rounded-lg shadow-xl text-white max-w-xs transition-all duration-300 transform translate-x-full opacity-0 border ${bgColor} pointer-events-auto`;
    
    notification.innerHTML = `
        <div class="font-semibold">${type.toUpperCase()}</div>
        <p class="text-sm">${message}</p>
    `;
    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
        notification.classList.add('translate-x-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('translate-x-0', 'opacity-100');
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}


// --- Event Listeners ---

// Mobile menu toggling
if (burgerCheckbox) {
    burgerCheckbox.addEventListener('change', toggleMobileMenu);
}
document.getElementById('close-menu-button').addEventListener('click', closeMobileMenu);

// Search input
if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        currentSearchTerm = e.target.value;
        searchTimeout = setTimeout(() => {
             renderAllSections(); // Re-render everything on search
        }, 300); 
    });
}

// Smooth scroll for floating badge
document.getElementById('floating-available-badge').addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
    });
});

// --- Initial Setup On Load ---
window.onload = () => {
    getStarredProjects(); // Load stars from localStorage
    populateFilters();
    renderAllSections(); // Render both sections
    // We must re-run createIcons *after* all sections are rendered
    lucide.createIcons();
};