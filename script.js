// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Typing effect — hero name
// ============================================================
const typeTarget = document.getElementById('typeTarget');
const FULL_NAME = 'Manojkumar V';
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeName(){
  if (prefersReduced){
    typeTarget.textContent = FULL_NAME;
    return;
  }
  let i = 0;
  const speed = 90;
  (function step(){
    if (i <= FULL_NAME.length){
      typeTarget.textContent = FULL_NAME.slice(0, i);
      i++;
      setTimeout(step, speed);
    }
  })();
}
window.addEventListener('DOMContentLoaded', () => setTimeout(typeName, 350));

// ============================================================
// Scroll reveal
// ============================================================
const revealTargets = document.querySelectorAll(
  '.about-copy, .about-stat-card, .skill-card, .timeline-entry, .project-card, .terminal-window, .mail-cta, .section-title'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach((el, idx) => {
  el.style.transitionDelay = `${(idx % 4) * 70}ms`;
  io.observe(el);
});

// ============================================================
// Animated counters (stats)
// ============================================================
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      animateCounter(entry.target);
      counterIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

function animateCounter(el){
  const target = parseInt(el.dataset.count, 10);
  if (prefersReduced){ el.textContent = target; return; }
  const duration = 1200;
  const start = performance.now();
  function frame(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ============================================================
// Active tab highlighting on scroll
// ============================================================
const sections = document.querySelectorAll('main .section');
const tabs = document.querySelectorAll('.tab');

const navIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const tab = document.querySelector(`.tab[href="#${id}"]`);
    if (!tab) return;
    if (entry.isIntersecting){
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(s => navIO.observe(s));

// ============================================================
// Mobile menu toggle
// ============================================================
const menuBtn = document.getElementById('menuBtn');
const tabsNav = document.querySelector('.tabs');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  tabsNav.classList.toggle('open');
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    tabsNav.classList.remove('open');
  });
});

// ============================================================
// Project card cursor-follow glow
// ============================================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});
