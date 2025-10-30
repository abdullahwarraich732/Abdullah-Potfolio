 // Initialize Lucide icons
    lucide.createIcons();

    // Initialize AOS
    AOS.init({
        // Global settings:
        disable: false, // Disables AOS on mobile
        startEvent: 'DOMContentLoaded', 
        initClassName: 'aos-init', 
        animatedClassName: 'aos-animate', 
        useClassNames: false, 
        disableMutationObserver: false, 
        debounceDelay: 50, 
        throttleDelay: 99, 
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should only happen once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });


    // --- Data Model for Projects ---
    const projects = [
        {
            title: "Global Supply Chain Optimizer",
            category: "Enterprise SaaS",
            techStack: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL"],
            preview: "Modernization of a legacy logistics system. Reduced operational latency by 45%.",
            description: "Developed a full-stack, real-time logistics dashboard, migrating from a decades-old SOAP service to a modern GraphQL API architecture. Implemented a custom mapping interface using WebGL for visualizing complex supply routes and predicting choke points. Key achievement: Architected the database schema for multi-tenancy and high availability.",
            icon: 'truck',
            link: 'https://github.com/mawarraich/supply-chain-optimizer' // Link updated
        },
        {
            title: "AI-Powered Recipe Generator",
            category: "Consumer Mobile App",
            techStack: ["Python", "Flask", "TensorFlow Lite", "React Native", "Firestore"],
            preview: "Mobile app using ML to generate recipes based on fridge contents via image recognition.",
            description: "Built a computer vision pipeline using TensorFlow Lite for on-device image recognition of ingredients. The backend Flask API interacts with a proprietary generative AI model to craft unique recipes. Focused heavily on minimizing cold-start latency and optimizing the Firestore data structure for rapid ingredient lookups across millions of users.",
            icon: 'chef-hat',
            link: 'https://github.com/mawarraich/ai-recipe-generator' // Link updated
        },
        {
            title: "Decentralized Voting Platform",
            category: "Blockchain / Web3",
            techStack: ["Solidity", "Hardhat", "Vue.js", "Web3.js"],
            preview: "A fully transparent and immutable platform for corporate governance elections.",
            description: "Engineered and deployed audited Solidity smart contracts on the Polygon network. Designed the frontend interface using Vue.js for seamless interaction with MetaMask, ensuring user anonymity and transaction security. The project emphasized gas efficiency and comprehensive unit testing using Hardhat to guarantee tamper-proof results.",
            icon: 'lock',
            link: 'https://github.com/mawarraich/decentralized-vote' // Link updated
        },
        {
            title: "High-Frequency Data Streaming Engine",
            category: "Fintech Backend",
            techStack: ["Go", "Kafka", "Redis", "WebSockets"],
            preview: "Low-latency streaming platform handling 100k messages/sec for real-time stock data.",
            description: "Authored a high-concurrency Go service utilizing Kafka for message queuing and Redis for rapid, in-memory caching of market data. Implemented a custom WebSockets layer to deliver real-time ticks to thousands of concurrent trader dashboards. Critical focus on horizontal scaling and maintaining sub-5ms data latency.",
            icon: 'activity',
            link: 'https://github.com/mawarraich/hf-data-stream' // Link updated
        },
        {
            title: "Custom CRM for SMBs",
            category: "Business Tool",
            techStack: ["Laravel", "Blade", "Tailwind CSS", "MySQL"],
            preview: "A tailored Customer Relationship Management system focusing on workflow automation.",
            description: "A comprehensive project managing customer interactions, sales pipelines, and reporting. The backend was developed using PHP Laravel for rapid development, utilizing Blade templates for efficient rendering and Tailwind for a modern UI. Features include automated email sequencing and customizable reporting dashboards.",
            icon: 'users',
            link: 'https://github.com/mawarraich/smb-crm' // Link updated
        }
    ];

    let currentProjectIndex = 0;
    const carouselEl = document.getElementById('projects-carousel');
    const modalEl = document.getElementById('project-modal');
    const modalContentEl = document.getElementById('modal-content');
    const notificationContainer = document.getElementById('notification-container');
    
    // --- New Burger Menu Elements ---
    const burgerCheckbox = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');


    // --- Core Carousel Logic ---

    /**
     * Renders the initial project cards and sets up the carousel structure.
     */
    function initializeCarousel() {
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card bg-slate-800 rounded-xl p-6 shadow-2xl flex flex-col justify-between hover:border-teal-400';
            card.dataset.index = index;
            card.innerHTML = `
                <div class="flex items-center space-x-4 mb-4">
                    <i data-lucide="${project.icon}" class="w-8 h-8 text-teal-400"></i>
                    <span class="text-sm font-medium text-teal-400/80">${project.category}</span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-3">${project.title}</h3>
                <p class="text-slate-400 flex-grow">${project.preview}</p>
                <div class="mt-4">
                    <p class="text-sm text-slate-500">Tech Stack:</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        ${project.techStack.map(tech => `<span class="text-xs font-mono bg-slate-700 text-slate-200 px-2 py-0.5 rounded">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
            card.onclick = () => openModal(index);
            carouselEl.appendChild(card);
        });
        updateCarousel(0);
    }

    /**
     * Updates the position and visual state of all cards based on the current index.
     * @param {number} newIndex - The index of the project to center.
     */
    function updateCarousel(newIndex) {
        currentProjectIndex = (newIndex + projects.length) % projects.length; // Ensure index loops
        const cards = Array.from(carouselEl.children);

        cards.forEach((card, index) => {
            card.className = card.className.split(' ').filter(c => !c.startsWith('card-')).join(' '); // Clean state classes

            const relativeIndex = index - currentProjectIndex;

            if (relativeIndex === 0) {
                card.classList.add('card-center');
            } else if (relativeIndex === -1 || (relativeIndex === projects.length - 1 && currentProjectIndex === 0)) {
                card.classList.add('card-left-1');
            } else if (relativeIndex === 1 || (relativeIndex === -(projects.length - 1) && currentProjectIndex === projects.length - 1)) {
                card.classList.add('card-right-1');
            } else {
                card.classList.add('card-hidden');
            }
        });

        // Re-create icons for new elements or when classes change (a necessary step for Lucide)
        lucide.createIcons();
    }

    document.getElementById('prev-button').addEventListener('click', () => updateCarousel(currentProjectIndex - 1));
    document.getElementById('next-button').addEventListener('click', () => updateCarousel(currentProjectIndex + 1));


    // --- Modal, Notification, and Menu Logic ---

    /**
     * Toggles the mobile menu visibility based on the burger checkbox state.
     */
    function toggleMobileMenu() {
        if (burgerCheckbox.checked) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    }

    /**
     * Closes the mobile menu and unchecks the burger icon.
     */
    const closeMobileMenu = () => {
        if(burgerCheckbox) {
            burgerCheckbox.checked = false; // Important: Uncheck the box to revert CSS animation
            toggleMobileMenu();
        }
    };


    /**
     * Opens the detailed modal for a selected project.
     * @param {number} index - Index of the project to display.
     */
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
                <a href="${project.link}" target="_blank" class="btn-primary text-white font-semibold py-2 px-6 rounded-lg flex items-center shadow-lg">
                    <i data-lucide="github" class="w-5 h-5 mr-2"></i> View Code
                </a>
                <!-- You would replace this with a live demo link if available --><a href="#contact" onclick="closeModal()" class="bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-600 transition flex items-center">
                    Discuss Project
                </a>
            </div>
        `;
        lucide.createIcons();
        modalEl.classList.remove('hidden');
        modalEl.classList.add('flex');
    }

    /**
     * Closes the modal.
     * @param {Event} event - Optional event object for click outside detection.
     */
    function closeModal(event) {
        if (!event || event.target === modalEl) {
            modalEl.classList.add('hidden');
            modalEl.classList.remove('flex');
        }
    }

    /**
     * Displays a custom notification (replaces alert()).
     * @param {string} message - The message to display.
     * @param {string} type - 'success' or 'error'.
     */
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        notification.className = `${bgColor} text-white p-4 rounded-lg shadow-xl max-w-sm transform transition-transform duration-300 translate-x-full`;
        notification.innerHTML = `
            <div class="font-semibold">${type.toUpperCase()}</div>
            <p class="text-sm">${message}</p>
        `;
        notificationContainer.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }


    // --- Form and Menu Handling ---

    // NOTE: The previous form handler has been removed as the contact form is now replaced 
    // by a direct mailto link, which uses native browser functionality.

    // Mobile menu toggling uses the 'change' event on the hidden checkbox
    if (burgerCheckbox) {
        burgerCheckbox.addEventListener('change', toggleMobileMenu);
    }

    // The button inside the overlay calls this function, which unchecks the box
    document.getElementById('close-menu-button').addEventListener('click', closeMobileMenu);

    // Smooth scroll for the floating badge
    document.getElementById('floating-available-badge').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Initial setup on load
    window.onload = initializeCarousel;