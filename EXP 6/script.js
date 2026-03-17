// ============================================
// EVENT MANAGEMENT WEBSITE - MAIN SCRIPT
// ============================================

// Sample Events Data
const eventsData = [
    {
        id: 1,
        title: 'Global Tech Summit 2026',
        category: 'conference',
        date: 'March 25, 2026',
        time: '9:00 AM - 6:00 PM',
        location: 'San Francisco, CA',
        image: 'https://images.unsplash.com/photo-1540575467063-178f50002991?w=400&h=300&fit=crop',
        description: 'Join industry leaders discussing the future of technology, AI, and innovation.',
        fullDescription: 'Join industry leaders and innovators from around the world at the Global Tech Summit 2026. This flagship event brings together tech visionaries, entrepreneurs, and developers to discuss cutting-edge technologies, artificial intelligence, blockchain, and the future of digital transformation. With keynote presentations, panel discussions, hands-on workshops, and networking opportunities, this is the perfect event for anyone passionate about technology. Early bird tickets are now available with 30% discount!',
        price: '$299',
        capacity: 5000,
        registered: 3200
    },
    {
        id: 2,
        title: 'Music & Arts Festival',
        category: 'concert',
        date: 'April 5, 2026',
        time: '12:00 PM - 11:00 PM',
        location: 'Los Angeles, CA',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        description: 'Experience four days of incredible music, art installations, and performances.',
        fullDescription: 'The Music & Arts Festival is the ultimate celebration of creativity and self-expression. Featuring world-renowned artists, emerging musicians, and stunning art installations, this 4-day extravaganza promises unforgettable moments. From electronic beats to live orchestras, from contemporary art to interactive installations, there\'s something for everyone. Don\'t miss this year\'s most exciting festival with special appearances by Grammy-winning artists!',
        price: '$189',
        capacity: 75000,
        registered: 42300
    },
    {
        id: 3,
        title: 'Entrepreneurship Workshop',
        category: 'workshop',
        date: 'April 12, 2026',
        time: '10:00 AM - 4:00 PM',
        location: 'New York, NY',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        description: 'Learn from successful entrepreneurs how to launch and scale your startup.',
        fullDescription: 'Learn the secrets of successful entrepreneurship from industry veterans. This intensive workshop covers business model development, fundraising strategies, marketing essentials, and scaling your startup. You\'ll get personalized feedback, network with fellow entrepreneurs, and gain access to our investor network. Perfect for first-time founders and experienced entrepreneurs alike!',
        price: '$79',
        capacity: 200,
        registered: 156
    },
    {
        id: 4,
        title: 'Web Development Bootcamp',
        category: 'workshop',
        date: 'March 30, 2026',
        time: '9:00 AM - 5:00 PM',
        location: 'Seattle, WA',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        description: 'Intensive 5-day bootcamp to master modern web development frameworks.',
        fullDescription: 'Join our comprehensive web development bootcamp and master the latest technologies including React, Node.js, and Full-Stack development. Our expert instructors will guide you through real-world projects, best practices, and industry standards. You\'ll build a portfolio of projects and get career counseling from industry professionals.',
        price: '$499',
        capacity: 40,
        registered: 38
    },
    {
        id: 5,
        title: 'AI & Machine Learning Conference',
        category: 'conference',
        date: 'April 20, 2026',
        time: '8:30 AM - 5:30 PM',
        location: 'Boston, MA',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        description: 'Explore the latest advancements in artificial intelligence and machine learning.',
        fullDescription: 'The AI & Machine Learning Conference brings together researchers, engineers, and business leaders to discuss the latest breakthroughs in AI technology. Learn about neural networks, deep learning, NLP, computer vision, and practical AI applications. Network with world-leading experts and discover emerging opportunities in the AI industry.',
        price: '$349',
        capacity: 3000,
        registered: 1800
    },
    {
        id: 6,
        title: 'Jazz Night Experience',
        category: 'concert',
        date: 'April 2, 2026',
        time: '7:00 PM - 10:00 PM',
        location: 'Chicago, IL',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
        description: 'An elegant evening of live jazz music with premium dining included.',
        fullDescription: 'Experience an unforgettable evening of live jazz music performed by Grammy-winning artists. Enjoy gourmet cuisine, premium beverages, and intimate performances in our elegant historic venue. Perfect for a romantic night out or a special celebration with friends.',
        price: '$150',
        capacity: 300,
        registered: 245
    },
    {
        id: 7,
        title: 'Digital Marketing Summit',
        category: 'conference',
        date: 'April 15, 2026',
        time: '9:00 AM - 6:00 PM',
        location: 'Austin, TX',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        description: 'Master the latest digital marketing strategies and social media trends.',
        fullDescription: 'Stay ahead of the curve with insights from top digital marketing experts. Learn about SEO, content marketing, social media strategies, influencer marketing, and data analytics. This summit features hands-on workshops, case studies, and networking with marketing professionals from Fortune 500 companies.',
        price: '$199',
        capacity: 2000,
        registered: 1450
    },
    {
        id: 8,
        title: 'Photography Masterclass',
        category: 'workshop',
        date: 'April 18, 2026',
        time: '10:00 AM - 3:00 PM',
        location: 'Portland, OR',
        image: 'https://images.unsplash.com/photo-1516035069371-29ad0abb25fa?w=400&h=300&fit=crop',
        description: 'Learn professional photography techniques from award-winning photographers.',
        fullDescription: 'Join renowned photographers for an intensive masterclass on composition, lighting, post-processing, and storytelling. You\'ll practice with professional equipment, receive personalized feedback, and build your photography portfolio under expert guidance. Perfect for aspiring and experienced photographers alike.',
        price: '$89',
        capacity: 50,
        registered: 47
    }
];

// ============================================
// DOCUMENT READY
// ============================================
$(document).ready(function() {
    // Initialize the website
    initializeWebsite();
});

// ============================================
// INITIALIZATION FUNCTION
// ============================================
function initializeWebsite() {
    // Hide loading animation after 1 second
    setTimeout(() => {
        $('#loading-animation').addClass('hidden');
    }, 1000);

    // Initialize dark mode from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        $('body').addClass('dark-mode');
        updateDarkModeIcon();
    }

    // Render events
    renderEvents('all');

    // Set up event listeners
    setupEventListeners();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Add reveal class to elements for scroll animation
    $('.section-header, .event-card, .featured-card, .stat-card').addClass('reveal');
}

// ============================================
// RENDER EVENTS
// ============================================
function renderEvents(filter = 'all') {
    const container = $('#events-container');
    container.empty();

    // Filter events
    let filteredEvents = eventsData;
    if (filter !== 'all') {
        filteredEvents = eventsData.filter(event => event.category === filter);
    }

    // Create event cards
    filteredEvents.forEach(event => {
        const eventCard = `
            <div class="event-card" data-event-id="${event.id}" data-category="${event.category}">
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-content">
                    <span class="event-category">${event.category.toUpperCase()}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-meta">
                        <span><i class="fas fa-calendar"></i> ${event.date}</span>
                        <span><i class="fas fa-clock"></i> ${event.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    
                    <div class="event-details">
                        <p class="event-details-text">${event.fullDescription}</p>
                        <div class="event-footer">
                            <span class="event-price">${event.price}</span>
                            <button class="btn btn-primary register-btn" data-event-id="${event.id}">
                                <span>Register</span>
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                    <div class="event-footer" style="justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border-color); margin-top: 1rem;">
                        <div>
                            <small style="opacity: 0.7;">${event.registered} / ${event.capacity} Registered</small>
                        </div>
                        <button class="btn btn-small view-details-btn" data-event-id="${event.id}">
                            <span>Show Details</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.append(eventCard);
    });

    // Reattach event listeners
    attachEventListeners();
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================
function setupEventListeners() {
    // Navigation links
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(target).offset().top - 70 }, 800);
    });

    // Dark mode toggle
    $('#dark-mode-toggle').on('click', toggleDarkMode);

    // Filter buttons
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        const filter = $(this).data('filter');
        renderEvents(filter);
    });

    // Scroll to top button
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $('#scroll-to-top').addClass('show');
        } else {
            $('#scroll-to-top').removeClass('show');
        }
        checkRevealElements();
    });

    $('#scroll-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Modal close
    $('.modal-close').on('click', closeModal);
    $(document).on('click', function(e) {
        if (e.target.id === 'event-modal') {
            closeModal();
        }
    });

    // Newsletter form
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        alert(`Thank you for subscribing with ${email}! Check your inbox for confirmation.`);
        $(this).find('input[type="email"]').val('');
    });
}

// ============================================
// ATTACH EVENT LISTENERS (Called after rendering)
// ============================================
function attachEventListeners() {
    // View details button (slideToggle)
    $('.view-details-btn').on('click', function() {
        const eventId = $(this).data('event-id');
        const eventCard = $(`.event-card[data-event-id="${eventId}"]`);
        
        // Close other open details
        $('.event-card').not(eventCard).find('.event-details').slideUp(300, function() {
            $(this).removeClass('show');
        });
        
        // Toggle current details
        eventCard.find('.event-details').slideToggle(300, function() {
            $(this).toggleClass('show');
        });

        // Highlight selected event
        $('.event-card').removeClass('selected');
        eventCard.addClass('selected');

        // Update view details button icon
        const icon = $(this).find('i');
        icon.toggleClass('fa-chevron-down fa-chevron-up');
    });

    // Featured view details button
    $('.featured-card').find('.view-details-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const eventId = $(this).data('event-id');
        showEventModal(eventId);
    });

    // Register button
    $('.register-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const eventId = $(this).data('event-id');
        const event = eventsData.find(e => e.id === eventId);
        
        // Redirect to registration page with event name as parameter
        window.location.href = `registration.html?event=${encodeURIComponent(event.title)}&eventId=${event.id}`;
    });

    // Event card click to show modal
    $('.event-card').on('click', function(e) {
        // Don't trigger if clicking on buttons
        if (!$(e.target).closest('.view-details-btn, .register-btn, .event-details').length) {
            const eventId = $(this).data('event-id');
            showEventModal(eventId);
        }
    });
}

// ============================================
// SHOW EVENT MODAL
// ============================================
function showEventModal(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const attendancePercentage = Math.round((event.registered / event.capacity) * 100);

    const modalBody = `
        <img src="${event.image}" alt="${event.title}" class="modal-image">
        <h2 class="modal-title">${event.title}</h2>
        
        <div class="modal-info">
            <div class="modal-info-item">
                <i class="fas fa-calendar"></i>
                <span>${event.date}</span>
            </div>
            <div class="modal-info-item">
                <i class="fas fa-clock"></i>
                <span>${event.time}</span>
            </div>
            <div class="modal-info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${event.location}</span>
            </div>
            <div class="modal-info-item">
                <i class="fas fa-tag"></i>
                <span class="event-category">${event.category.toUpperCase()}</span>
            </div>
            <div class="modal-info-item">
                <i class="fas fa-users"></i>
                <span>${event.registered}/${event.capacity} Registered (${attendancePercentage}%)</span>
            </div>
        </div>

        <p class="modal-description">${event.fullDescription}</p>

        <div class="modal-buttons">
            <button class="btn btn-primary register-event-modal" data-event-id="${event.id}">
                <i class="fas fa-ticket-alt"></i>
                Register - ${event.price}
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i>
                Close
            </button>
        </div>
    `;

    $('#modal-body').html(modalBody);
    $('#event-modal').addClass('show');

    // Attach register button listener
    $('.register-event-modal').on('click', function() {
        const id = $(this).data('event-id');
        const evt = eventsData.find(e => e.id === id);
        closeModal();
        window.location.href = `registration.html?event=${encodeURIComponent(evt.title)}&eventId=${evt.id}`;
    });
}

// ============================================
// CLOSE MODAL
// ============================================
function closeModal() {
    $('#event-modal').removeClass('show');
}

// ============================================
// DARK MODE TOGGLE
// ============================================
function toggleDarkMode() {
    $('body').toggleClass('dark-mode');
    updateDarkModeIcon();

    // Save preference to localStorage
    const isDarkMode = $('body').hasClass('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// ============================================
// UPDATE DARK MODE ICON
// ============================================
function updateDarkModeIcon() {
    const icon = $('#dark-mode-toggle').find('i');
    if ($('body').hasClass('dark-mode')) {
        icon.removeClass('fa-moon').addClass('fa-sun');
    } else {
        icon.removeClass('fa-sun').addClass('fa-moon');
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initializeScrollAnimations() {
    checkRevealElements();
}

function checkRevealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
$(document).on('click', 'a[href^="#"]', function(e) {
    const href = $(this).attr('href');
    
    // Don't prevent default if it's just changing the hash
    if ($(href).length) {
        e.preventDefault();
        const offsetTop = $(href).offset().top;
        $('html, body').animate({
            scrollTop: offsetTop - 70
        }, 800);
    }
});

// ============================================
// PREVENT LOADING ANIMATION ON PAGE RELOAD
// ============================================
window.addEventListener('beforeunload', function() {
    $('#loading-animation').addClass('hidden');
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%cEventFlow - Premium Event Management Platform', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cVersion 1.0 | Built with modern web technologies', 'color: #ec4899; font-size: 12px;');
