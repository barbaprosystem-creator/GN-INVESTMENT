import './styles/base.css';
import './styles/variables.css';
import './styles/motion.css';
import './styles/components.css';

import { renderHeader } from './components/Header.js';
import { renderFooter, initFooter } from './components/Footer.js';
import { renderFloatingDock, initFloatingDock } from './components/FloatingDock.js';
import { initFaqAccordion } from './components/FaqAccordion.js';

import { renderHomePage } from './pages/Home.js';
import { initBeforeAfterSlider } from './components/BeforeAfterSlider.js';
import { initShowcaseCarousel } from './components/ShowcaseCarousel.js';
import { initEncryptedText } from './components/EncryptedText.js';
import { renderAboutPage } from './pages/About.js';
import { renderSituationsPage, initSituationsFilter } from './pages/Situations.js';
import { renderHowItWorksPage } from './pages/HowItWorks.js';
import { initLiveChatSimulator } from './components/LiveChatSimulator.js';
import { renderContactOfferPage, initFullOfferForm } from './pages/ContactOffer.js';
import { renderLegalPage } from './pages/Legal.js';

// Application State
const appState = {
  currentRoute: 'home',
  leads: [],
  selectedAddress: ''
};

// Modal for Hero Quick Offer Feedback (Charcoal Dark Theme)
function renderQuickOfferModal() {
  return `
    <div class="modal-overlay" id="quickOfferModal">
      <div class="modal-card bg-[#181c26]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full relative">
        <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close Modal">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div class="text-center flex flex-col items-center gap-3">
          <div class="w-14 h-14 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center border border-green-500/30">
            <span class="material-symbols-outlined text-[32px]">check_circle</span>
          </div>

          <span class="bg-primary/20 text-[#efbba5] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border border-primary/30 font-mono">
            EVALUATION REQUEST SENT
          </span>
          <h3 class="font-headline-md text-xl sm:text-2xl font-bold text-on-surface" id="modalOwnerTitle">Thank You!</h3>
          <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            We received your property inquiry for <strong id="modalAddressText" class="text-white"></strong>. Our Louisville valuation team will reach out with your direct offer shortly.
          </p>

          <div class="bg-[#12151b]/80 border border-white/10 rounded-2xl p-4 text-left text-xs text-on-surface-variant w-full mt-1 font-mono">
            <div class="font-bold text-on-surface mb-1 text-xs">WHAT HAPPENS NEXT:</div>
            <ol class="list-decimal list-inside space-y-1 text-[11px] text-gray-300">
              <li>Preliminary neighborhood valuation.</li>
              <li>10-minute friendly property walkthrough.</li>
              <li>Receive your written As-Is cash offer.</li>
            </ol>
          </div>

          <div class="flex flex-col gap-2 w-full mt-2">
            <a href="tel:5028007355" class="shimmer-btn bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg border border-white/10">
              <span class="material-symbols-outlined text-[16px]">call</span>
              <span>Call Now: (502) 800-SELL</span>
            </a>
            <button type="button" class="bg-transparent text-on-surface-variant hover:text-white text-[11px] py-1.5 uppercase tracking-wider" id="modalDismissBtn">
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Setup Scroll Reveal Animations with IntersectionObserver
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// Subtle Hero Background Zoom on Scroll
function initHeroParallax() {
  const bgImg = document.getElementById('heroBgImage');
  if (!bgImg) return;

  function onScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY < window.innerHeight) {
      bgImg.style.transform = `scale(${1.05 + scrollY * 0.0002}) translate3d(0, ${scrollY * 0.15}px, 0)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

// Router & View Switcher
function navigateToRoute(route) {
  appState.currentRoute = route;
  const contentEl = document.getElementById('mainContent');
  if (!contentEl) return;

  if (route === 'about') {
    contentEl.innerHTML = renderAboutPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (route === 'situations') {
    contentEl.innerHTML = renderSituationsPage();
    initSituationsFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (route === 'how-it-works') {
    contentEl.innerHTML = renderHowItWorksPage();
    initLiveChatSimulator();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (route === 'get-offer') {
    contentEl.innerHTML = renderContactOfferPage();
    initFullOfferForm();
    if (appState.selectedAddress) {
      const addrEl = document.getElementById('offerAddress');
      if (addrEl) addrEl.value = appState.selectedAddress;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (route === 'privacy') {
    contentEl.innerHTML = renderLegalPage('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (route === 'terms') {
    contentEl.innerHTML = renderLegalPage('terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Home
    contentEl.innerHTML = renderHomePage();
    initHeroQuickForm();
    initHeroParallax();
    initBeforeAfterSlider();
    initShowcaseCarousel();
    initEncryptedText();
    initFaqAccordion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update Floating Dock Active State
  if (window.updateActiveDockDot) {
    window.updateActiveDockDot(route);
  }

  // Re-run scroll observer on new route content
  setTimeout(initScrollObserver, 60);
}

// Hero Multi-Field Pill Form Listener
function initHeroQuickForm() {
  const form = document.getElementById('heroMultiPillForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('pillName')?.value.trim() || '';
    const address = document.getElementById('pillAddress')?.value.trim() || '';
    const phone = document.getElementById('pillPhone')?.value.trim() || '';
    const email = document.getElementById('pillEmail')?.value.trim() || '';

    if (!name || !address || !phone) {
      alert('Please fill out Name, Address, and Phone Number.');
      return;
    }

    const lead = { name, address, phone, email, submittedAt: new Date().toISOString() };
    try {
      const leads = JSON.parse(localStorage.getItem('gn_leads') || '[]');
      leads.push(lead);
      localStorage.setItem('gn_leads', JSON.stringify(leads));
    } catch (err) {
      console.warn(err);
    }

    const modal = document.getElementById('quickOfferModal');
    if (modal) {
      document.getElementById('modalOwnerTitle').innerText = `Thank You, ${name}!`;
      document.getElementById('modalAddressText').innerText = address;
      modal.classList.add('open');
    }
  });
}

// App Entry Point
function initApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.innerHTML = `
    ${renderHeader()}
    <main id="mainContent" class="pt-16 sm:pt-20"></main>
    ${renderFooter()}
    ${renderFloatingDock()}
    ${renderQuickOfferModal()}
  `;

  // Initialize Floating Dock & Cinematic Footer
  initFloatingDock();
  initFooter();

  // Global Navigation Click Delegate
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-nav]');
    if (target) {
      e.preventDefault();
      const route = target.getAttribute('data-nav');
      window.location.hash = route;
      navigateToRoute(route);
    }
  });

  // Hash Change Listener
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateToRoute(hash);
  });

  // Modal Close Handlers
  const modal = document.getElementById('quickOfferModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');

  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  if (dismissBtn) dismissBtn.addEventListener('click', () => modal.classList.remove('open'));
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // Initial Route
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateToRoute(initialHash);
}

document.addEventListener('DOMContentLoaded', initApp);
