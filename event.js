// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Back to top button functionality
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Update active navigation link based on scroll position
function updateNavActiveState() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateNavActiveState);

// Package selection in contact form
document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(button => {
  if (button.classList.contains('btn-orange')) {
    button.addEventListener('click', function() {
      const modalId = this.closest('.modal').id;
      const packageSelect = document.getElementById('package');
      if (packageSelect) {
        if (modalId === 'packageModal1') {
          packageSelect.value = 'basic';
        } else if (modalId === 'packageModal2') {
          packageSelect.value = 'premium';
        } else if (modalId === 'packageModal3') {
          packageSelect.value = 'luxury';
        }
      }
    });
  }
});

// Handle form submission
if (document.getElementById('contact-form')) {
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const eventDate = document.getElementById('event-date').value;
    const packageType = document.getElementById('package').value;
    const message = document.getElementById('message').value;
    // Save to local storage
    const bookingData = {
      name,
      email,
      phone,
      eventDate,
      packageType,
      message,
      bookingDate: new Date().toISOString()
    };
    // Check if there are existing bookings
    let userBookings = JSON.parse(localStorage.getItem('orangeEventsBookings')) || [];
    userBookings.push(bookingData);
    localStorage.setItem('orangeEventsBookings', JSON.stringify(userBookings));
    // Display success message and reset form
    alert('Thank you for your booking request! We will contact you shortly to discuss your event details.');
    this.reset();
  });
}

// Check if user has previous selections in local storage and populate form
function populateFormFromStorage() {
  const userBookings = JSON.parse(localStorage.getItem('orangeEventsBookings'));
  if (userBookings && userBookings.length > 0) {
    const lastBooking = userBookings[userBookings.length - 1];
    // Populate only name and email for convenience
    document.getElementById('name') && (document.getElementById('name').value = lastBooking.name);
    document.getElementById('email') && (document.getElementById('email').value = lastBooking.email);
    document.getElementById('phone') && (document.getElementById('phone').value = lastBooking.phone);
  }
}
document.addEventListener('DOMContentLoaded', populateFormFromStorage);

// Initialize image slider with autoplay
const imageSlider = new bootstrap.Carousel(document.getElementById('imageSlider'), {
  interval: 5000,
  wrap: true,
  keyboard: true
});
// Pause carousel on hover
document.getElementById('imageSlider').addEventListener('mouseover', function() {
  imageSlider.pause();
});
document.getElementById('imageSlider').addEventListener('mouseout', function() {
  imageSlider.cycle();
});
