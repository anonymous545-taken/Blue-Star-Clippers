// Theme toggle logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    themeToggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1403839951153659965/_GoUH8hz3XrdUATML-JBZvyNSGPF2RghJDHcHNUuFZyZAkxzFXmvAjjDRcSVHbFhWYsH';

// Form submission logic (only on contact page)
const bookingForm = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = bookingForm.name.value.trim();
    const surname = bookingForm.surname.value.trim();
    const phone = bookingForm.phone.value.trim();
    const haircut = bookingForm.haircut.value;

    if (!name || !surname || !phone || !haircut) {
      formMessage.textContent = 'Please fill in all fields.';
      formMessage.style.color = 'red';
      return;
    }

    // Prepare Discord webhook payload
    const payload = {
      username: 'Blue-Star Clippers Booking',
      embeds: [
        {
          title: 'New Haircut Booking',
          color: 16766720, // Gold color in decimal
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Surname', value: surname, inline: true },
            { name: 'Cell Phone', value: phone, inline: false },
            { name: 'Haircut Option', value: haircut, inline: false }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "It's all in the cut."
          }
        }
      ]
    };

    try {
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        formMessage.textContent = 'Booking sent successfully! We will contact you soon.';
        formMessage.style.color = 'green';
        bookingForm.reset();
      } else {
        throw new Error('Failed to send booking.');
      }
    } catch (error) {
      formMessage.textContent = 'Error sending booking. Please try again later.';
      formMessage.style.color = 'red';
    }
  });
}

// Mobile menu toggle
const menuToggleBtn = document.getElementById('menu-toggle');
const navbarLinks = document.getElementById('navbar-links');

if (menuToggleBtn && navbarLinks) {
  menuToggleBtn.addEventListener('click', () => {
    const isOpen = navbarLinks.classList.toggle('open');
    menuToggleBtn.setAttribute('aria-expanded', isOpen);
  });
}
