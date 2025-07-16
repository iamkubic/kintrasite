// js/script.js

// =========================
// Navbar fade in/out with disabled buttons when hidden
// =========================
const navbar = document.getElementById('navbar');
const navbarLinks = navbar.querySelectorAll('a');
let scrollTimeout;

function toggleNavbar(state) {
  navbar.style.opacity = state ? '1' : '0';
  navbarLinks.forEach(link => link.style.pointerEvents = state ? 'auto' : 'none');
}

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  if (window.scrollY > window.innerHeight * 0.1) {
    toggleNavbar(true);
  } else {
    toggleNavbar(false);
  }
  scrollTimeout = setTimeout(() => {
    if (window.scrollY < window.innerHeight * 0.1) {
      toggleNavbar(false);
    }
  }, 800);
});

// =========================
// Smooth scroll for anchor links
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =========================
// Sine wave animation
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('sineWave');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, waveOffset = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawSine() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    for (let x = 0; x <= width; x++) {
      let ampFactor = 0.01;
      if (x > width * 0.3) {
        ampFactor = ((x - width * 0.3) / (width * 0.7));
      }
      const amplitude = 2 + 8 * ampFactor;
      const frequency = 0.02 + 0.005 * ampFactor;

      let y = height * 0.4 + Math.sin((x - waveOffset) * frequency) * amplitude;
      if (x > width * 0.7) {
        y += (Math.random() - 0.5) * ampFactor * 0.2;
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,0.05)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();

    waveOffset += 0.8;

    requestAnimationFrame(drawSine);
  }

  drawSine();
});

// =========================
// Arrow hide on scroll, show at top
// =========================
const scrollArrow = document.getElementById('scrollArrow');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    scrollArrow.style.opacity = '0';
    scrollArrow.style.pointerEvents = 'none';
  } else {
    scrollArrow.style.opacity = '1';
    scrollArrow.style.pointerEvents = 'auto';
  }
});
