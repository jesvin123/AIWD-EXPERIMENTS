// ============================================
// REGISTRATION PAGE SCRIPT
// ============================================

// Event data (same as main script)
const eventsData = [
    {
        id: 1,
        title: 'Global Tech Summit 2026',
        registered: 3200,
        capacity: 5000
    },
    {
        id: 2,
        title: 'Music & Arts Festival',
        registered: 42300,
        capacity: 75000
    },
    {
        id: 3,
        title: 'Entrepreneurship Workshop',
        registered: 156,
        capacity: 200
    },
    {
        id: 4,
        title: 'Web Development Bootcamp',
        registered: 38,
        capacity: 40
    },
    {
        id: 5,
        title: 'AI & Machine Learning Conference',
        registered: 1800,
        capacity: 3000
    },
    {
        id: 6,
        title: 'Jazz Night Experience',
        registered: 245,
        capacity: 300
    },
    {
        id: 7,
        title: 'Digital Marketing Summit',
        registered: 1450,
        capacity: 2000
    },
    {
        id: 8,
        title: 'Photography Masterclass',
        registered: 47,
        capacity: 50
    }
];

// ============================================
// DOCUMENT READY
// ============================================
$(document).ready(function() {
    initializeRegistrationPage();
});

// ============================================
// INITIALIZATION FUNCTION
// ============================================
function initializeRegistrationPage() {
    // Initialize dark mode from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        $('body').addClass('dark-mode');
        updateDarkModeIcon();
    }

    // Get event name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('event');
    const eventId = urlParams.get('eventId');

    // Auto-fill event name
    if (eventName) {
        $('#event-name').val(decodeURIComponent(eventName));
    }

    // Update registered count
    if (eventId) {
        const event = eventsData.find(e => e.id === parseInt(eventId));
        if (event) {
            $('#registered-count').text(event.registered.toLocaleString());
        }
    }

    // Set up event listeners
    setupRegistrationListeners();

    // Add focus effects
    addInputFocusEffects();
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================
function setupRegistrationListeners() {
    // Dark mode toggle
    $('#dark-mode-toggle').on('click', toggleDarkMode);

    // Form submission
    $('#registration-form').on('submit', handleFormSubmit);

    // Back to home link
    $('.nav-logo, .nav-link').on('click', function(e) {
        if ($(this).attr('href') === 'index.html') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    });

    // Real-time validation
    $('#full-name').on('blur', validateName);
    $('#email').on('blur', validateEmail);
    $('#phone').on('blur', validatePhone);
    $('#terms').on('change', validateTerms);

    // Clear error messages on input
    $('.form-input').on('focus', function() {
        $(this).next('.form-error').hide();
        $(this).removeClass('error');
    });

    // Focus effect on select
    $('select').on('change', function() {
        if ($(this).val()) {
            $(this).css('color', 'var(--text-dark)');
        }
    });
}

// ============================================
// FORM VALIDATION FUNCTIONS
// ============================================
function validateName() {
    const name = $('#full-name').val().trim();
    const nameError = $('#name-error');

    if (!name) {
        nameError.text('Name is required').show();
        $('#full-name').addClass('error');
        return false;
    } else if (name.length < 2) {
        nameError.text('Name must be at least 2 characters').show();
        $('#full-name').addClass('error');
        return false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        nameError.text('Name can only contain letters, spaces, hyphens, and apostrophes').show();
        $('#full-name').addClass('error');
        return false;
    } else {
        nameError.hide();
        $('#full-name').removeClass('error');
        return true;
    }
}

function validateEmail() {
    const email = $('#email').val().trim();
    const emailError = $('#email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        emailError.text('Email is required').show();
        $('#email').addClass('error');
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.text('Please enter a valid email address').show();
        $('#email').addClass('error');
        return false;
    } else {
        emailError.hide();
        $('#email').removeClass('error');
        return true;
    }
}

function validatePhone() {
    const phone = $('#phone').val().trim();
    const phoneError = $('#phone-error');
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;

    if (!phone) {
        phoneError.text('Phone number is required').show();
        $('#phone').addClass('error');
        return false;
    } else if (!phoneRegex.test(phone)) {
        phoneError.text('Please enter a valid phone number').show();
        $('#phone').addClass('error');
        return false;
    } else if (phone.replace(/\D/g, '').length < 10) {
        phoneError.text('Phone number must have at least 10 digits').show();
        $('#phone').addClass('error');
        return false;
    } else {
        phoneError.hide();
        $('#phone').removeClass('error');
        return true;
    }
}

function validateTerms() {
    const termsError = $('#terms-error');
    if (!$('#terms').is(':checked')) {
        termsError.text('You must agree to the terms and conditions').show();
        return false;
    } else {
        termsError.hide();
        return true;
    }
}

function addInputFocusEffects() {
    $('.form-input').on('input', function() {
        if ($(this).val()) {
            $(this).css('border-color', 'var(--primary-color)');
        }
    });
}

// ============================================
// HANDLE FORM SUBMISSION
// ============================================
function handleFormSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isTermsValid = validateTerms();

    // Validate event name
    if (!$('#event-name').val()) {
        alert('Please select an event first');
        return;
    }

    // If all validations pass
    if (isNameValid && isEmailValid && isPhoneValid && isTermsValid) {
        // Get form data
        const formData = {
            eventName: $('#event-name').val(),
            fullName: $('#full-name').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            company: $('#company').val().trim(),
            experience: $('#experience').val(),
            dietary: $('input[name="dietary"]:checked').map(function() {
                return $(this).val();
            }).get().join(', '),
            newsletter: $('#newsletter').is(':checked')
        };

        // Save to localStorage for demonstration
        localStorage.setItem('lastRegistration', JSON.stringify(formData));

        // Show success message
        showSuccessMessage(formData);

        // Log registration (for demonstration)
        console.log('%cRegistration Successful!', 'color: #10b981; font-size: 16px; font-weight: bold;');
        console.log('Registration Details:', formData);

        // Hide form and show success message
        $('#registration-form').fadeOut(300, function() {
            $('#success-message').fadeIn(300);
            $('html, body').animate({ scrollTop: 0 }, 500);
        });

        // Optional: Send data to server (uncomment to use)
        // sendRegistrationToServer(formData);
    } else {
        // Show alert if validation fails
        alert('Please fix the errors in the form before submitting');
    }
}

// ============================================
// SHOW SUCCESS MESSAGE
// ============================================
function showSuccessMessage(formData) {
    const eventName = formData.eventName;
    const email = formData.email;

    $('#success-event-name').text(`You have successfully registered for "${eventName}".`);
    $('#confirmation-email').text(email);
}

// ============================================
// SEND REGISTRATION TO SERVER (OPTIONAL)
// ============================================
function sendRegistrationToServer(formData) {
    // This is a placeholder function for sending data to a backend server
    // In a real application, you would send this data via AJAX/Fetch
    
    /*
    fetch('https://your-server.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form. Please try again.');
    });
    */
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
// PREVENT FORM SUBMISSION ON ENTER IN CERTAIN FIELDS
// ============================================
$(document).on('keypress', '#full-name, #email, #phone', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        $(this).blur();
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%cEventFlow - Registration Page', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cAll form data is validated before submission', 'color: #10b981; font-size: 12px;');
