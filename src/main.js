import './styles/base.css';
import './styles/variables.css';
import './styles/motion.css';
import './styles/components.css';

import { renderHeader, initHeader } from './components/Header.js';
import { renderFooter, initFooter } from './components/Footer.js';
import { initFaqAccordion } from './components/FaqAccordion.js';
import { initOfferForm } from './components/OfferForm.js';
import { initPortalHero } from './components/PortalHero.js';
import { initGlobalEventTracking } from './utils/analytics.js';

import { renderHomePage } from './pages/Home.js';
import { renderAboutPage } from './pages/About.js';
import { renderSituationsPage } from './pages/Situations.js';
import { renderHowItWorksPage } from './pages/HowItWorks.js';
import { renderContactOfferPage, initContactOfferPage } from './pages/ContactOffer.js';
import { renderLegalPage } from './pages/Legal.js';
import {
  renderSellMyHouseLouisville,
  renderSellHouseAsIsLouisville,
  renderSellInheritedHouseLouisville,
  renderSellRentalPropertyLouisville
} from './pages/LocalSeoPages.js';

// Employee Portal & CRM Imports (Completely Preserved)
import { authService } from './crm/services/authService.js';
import { renderEmployeeLogin, initEmployeeLogin } from './crm/pages/EmployeeLogin.js';
import { renderCrmLayout, initCrmLayout } from './crm/pages/CrmLayout.js';

// Application State
const appState = {
  currentPath: '/',
  selectedAddress: ''
};

// Tracks active PortalHero cleanup callback to prevent detached animation leaks
let currentHeroCleanup = null;

// Route Metadata for SEO
const ROUTE_SEO = {
  '/': {
    title: 'Sell Your House As-Is in Louisville, KY | G&N Investment',
    description: 'Get a direct, no-obligation offer for your Louisville or Kentucky property. Sell as-is with no repairs, no listings, and a closing timeline that works for you.'
  },
  '/get-my-offer': {
    title: 'Get My Offer — Fast Cash House Evaluation | G&N Investment',
    description: 'Request your free 24-hour As-Is cash offer for your Kentucky property. No fees, no agent commissions, and zero obligation.'
  },
  '/how-it-works': {
    title: 'How It Works — Simple 4-Step Home Selling Process | G&N Investment',
    description: 'Learn how selling directly to G&N Investment works. From property submission to verified title closing in as few as 7–14 days.'
  },
  '/situations': {
    title: 'Property Situations We Resolve | G&N Investment Kentucky',
    description: 'We buy houses needing repairs, inherited probate estates, tenant-occupied rentals, and vacant properties across Louisville and Kentucky.'
  },
  '/about': {
    title: 'About G&N Investment | Local Kentucky Real Estate Buyers',
    description: 'Learn about G&N Investment, our local Kentucky roots, direct buying principles, and commitment to clear, certified title closings.'
  },
  '/sell-my-house-louisville-ky': {
    title: 'Sell My House Fast in Louisville, KY | G&N Investment',
    description: 'Need to sell your Louisville home fast? We purchase single-family houses and duplexes in Jefferson County directly with cash.'
  },
  '/sell-house-as-is-louisville': {
    title: 'Sell Your House As-Is in Louisville, KY | No Repairs Required',
    description: 'Sell a distressed or outdated Louisville property without making a single repair. We buy 100% as-is and cover standard closing costs.'
  },
  '/sell-inherited-house-louisville': {
    title: 'Sell an Inherited House in Louisville, KY | Probate Real Estate',
    description: 'Liquidate an inherited property or estate in Louisville easily. Respectful, clean cash sales with no cleanout required.'
  },
  '/sell-rental-property-louisville': {
    title: 'Sell Rental Property in Louisville, KY | Tenant-Occupied Welcome',
    description: 'Ready to exit landlord duties? We buy Louisville rental properties with active leases, problem tenants, or deferred maintenance.'
  },
  '/privacy': {
    title: 'Privacy Policy | G&N Investment LLC',
    description: 'G&N Investment Privacy Policy and SMS communication consent details.'
  },
  '/terms': {
    title: 'Terms of Service | G&N Investment LLC',
    description: 'G&N Investment Terms of Service and private real estate investor disclosure.'
  }
};

// Modal for Lead Submission Feedback
function renderQuickOfferModal() {
  return `
    <div class="modal-overlay" id="quickOfferModal" role="dialog" aria-modal="true" aria-labelledby="modalOwnerTitle">
      <div class="modal-card flex flex-col items-center text-center gap-3">
        <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close Confirmation Modal">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div class="w-14 h-14 rounded-full bg-green-50 text-green-700 flex items-center justify-center border border-green-200">
          <span class="material-symbols-outlined text-[32px]">check_circle</span>
        </div>

        <span class="bg-warm-white text-copper text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-border-warm font-sans">
          Evaluation Request Received
        </span>

        <h3 class="font-serif text-2xl font-bold text-ink" id="modalOwnerTitle">
          Thank You!
        </h3>

        <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
          We have received your property inquiry for <strong id="modalAddressText" class="text-ink font-semibold"></strong>. Our Louisville valuation team is preparing your evaluation and will reach out shortly.
        </p>

        <div class="bg-warm-white border border-border-warm rounded-xl p-4 text-left text-xs text-warm-gray w-full mt-1">
          <div class="font-bold text-ink mb-1.5 uppercase text-[11px] tracking-wider">What Happens Next:</div>
          <ol class="list-decimal list-inside space-y-1 text-xs">
            <li>We review recent neighborhood sales data.</li>
            <li>We schedule a brief 15-minute friendly walkthrough.</li>
            <li>You receive your written As-Is cash offer.</li>
          </ol>
        </div>

        <div class="flex flex-col gap-2.5 w-full mt-3">
          <a 
            href="tel:5023843357" 
            class="btn-copper py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-subtle"
          >
            <span class="material-symbols-outlined text-[16px]">call</span>
            <span>Call Now: (502) 384-3357</span>
          </a>
          <button 
            type="button" 
            class="bg-transparent text-warm-gray hover:text-ink text-xs py-1.5 uppercase tracking-wider font-semibold cursor-pointer" 
            id="modalDismissBtn"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  `;
}

// Scroll Reveal Animations for text and cards
function initScrollObserver() {
  const elements = document.querySelectorAll('.reveal, .reveal-text');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  elements.forEach((el) => {
    // If element is already in viewport on mount, activate immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
      el.classList.add('active');
    } else {
      observer.observe(el);
    }
  });
}

// Rebuild public layout if returning from CRM / Login
function ensurePublicLayout() {
  let contentEl = document.getElementById('mainContent');
  if (!contentEl) {
    const appContainer = document.getElementById('app');
    if (!appContainer) return null;

    appContainer.innerHTML = `
      ${renderHeader()}
      <main id="mainContent" class="pt-20 sm:pt-22 min-h-screen"></main>
      ${renderFooter()}
      ${renderQuickOfferModal()}
    `;

    // Reinitialize global components
    initHeader();
    initFooter();
    initModalHandlers();

    contentEl = document.getElementById('mainContent');
  }
  return contentEl;
}

// Update Page Meta for Local SEO
function updateRouteSEO(path) {
  const seo = ROUTE_SEO[path] || ROUTE_SEO['/'];
  if (seo) {
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }
  }
}

// Router & View Switcher supporting clean paths and legacy hash fallbacks
function navigateToRoute(route, pushState = true) {
  // Normalize route
  let cleanRoute = route;
  if (!cleanRoute.startsWith('/') && !cleanRoute.startsWith('#')) {
    cleanRoute = '/' + cleanRoute;
  }

  // Handle hash fallbacks
  if (cleanRoute.startsWith('#')) {
    const hash = cleanRoute.replace('#', '');
    if (hash === 'get-offer' || hash === 'get-my-offer') cleanRoute = '/get-my-offer';
    else if (hash === 'how-it-works') cleanRoute = '/how-it-works';
    else if (hash === 'situations') cleanRoute = '/situations';
    else if (hash === 'about') cleanRoute = '/about';
    else if (hash === 'privacy') cleanRoute = '/privacy';
    else if (hash === 'terms') cleanRoute = '/terms';
    else if (hash === 'login') cleanRoute = '/login';
    else if (hash === 'portal' || hash.startsWith('portal/')) cleanRoute = '/' + hash;
    else cleanRoute = '/';
  }

  // Fallback for old /get-offer route
  if (cleanRoute === '/get-offer') {
    cleanRoute = '/get-my-offer';
  }

  // Cleanly teardown any active Hero animation & ScrollTrigger before swapping views
  if (currentHeroCleanup) {
    try {
      currentHeroCleanup();
    } catch (err) {
      console.warn('Hero cleanup warning:', err);
    }
    currentHeroCleanup = null;
  }
  if (typeof ScrollTrigger !== 'undefined') {
    try {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    } catch (err) {}
  }

  appState.currentPath = cleanRoute;

  if (pushState && window.location.pathname !== cleanRoute) {
    window.history.pushState(null, '', cleanRoute);
  }

  updateRouteSEO(cleanRoute);

  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // 1. Employee Login Screen
  if (cleanRoute === '/login') {
    if (authService.isAuthenticated()) {
      navigateToRoute('/portal/dashboard', true);
      return;
    }
    appContainer.innerHTML = renderEmployeeLogin();
    initEmployeeLogin(() => {
      navigateToRoute('/portal/dashboard', true);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  // 2. Internal Fix & Flip CRM
  if (cleanRoute === '/portal' || cleanRoute.startsWith('/portal/')) {
    if (!authService.isAuthenticated()) {
      navigateToRoute('/login', true);
      return;
    }

    const parts = cleanRoute.split('/');
    const tab = parts[2] || 'dashboard';

    appContainer.innerHTML = renderCrmLayout(tab);
    initCrmLayout(tab, {
      onLogout: () => {
        ensurePublicLayout();
        navigateToRoute('/', true);
      },
      onRefresh: () => {
        navigateToRoute(cleanRoute, false);
      }
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  // 3. Public Web Pages
  const contentEl = ensurePublicLayout();
  if (!contentEl) return;

  // Manage padding-top on mainContent (Home page has full-screen portal hero at y=0)
  if (cleanRoute === '/') {
    contentEl.classList.remove('pt-20', 'sm:pt-22');
  } else {
    contentEl.classList.add('pt-20', 'sm:pt-22');
  }

  if (cleanRoute === '/get-my-offer') {
    contentEl.innerHTML = renderContactOfferPage();
    initContactOfferPage();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/how-it-works') {
    contentEl.innerHTML = renderHowItWorksPage();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/situations') {
    contentEl.innerHTML = renderSituationsPage();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/about') {
    contentEl.innerHTML = renderAboutPage();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/sell-my-house-louisville-ky') {
    contentEl.innerHTML = renderSellMyHouseLouisville();
    initOfferForm('seoOfferForm_louisville');
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/sell-house-as-is-louisville') {
    contentEl.innerHTML = renderSellHouseAsIsLouisville();
    initOfferForm('seoOfferForm_asis');
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/sell-inherited-house-louisville') {
    contentEl.innerHTML = renderSellInheritedHouseLouisville();
    initOfferForm('seoOfferForm_inherited');
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/sell-rental-property-louisville') {
    contentEl.innerHTML = renderSellRentalPropertyLouisville();
    initOfferForm('seoOfferForm_rental');
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/privacy') {
    contentEl.innerHTML = renderLegalPage('privacy');
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (cleanRoute === '/terms') {
    contentEl.innerHTML = renderLegalPage('terms');
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    // Default: Home Page
    contentEl.innerHTML = renderHomePage();
    currentHeroCleanup = initPortalHero();
    initOfferForm('homeOfferForm');
    initFaqAccordion();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Ensure header is fully visible and interactive on non-home pages
  const header = document.getElementById('siteHeader') || document.querySelector('header');
  if (cleanRoute !== '/') {
    if (header) {
      header.style.opacity = '1';
      header.style.pointerEvents = 'auto';
      header.style.transform = 'translateY(0)';
    }
  }

  setTimeout(initScrollObserver, 60);
}

// Modal Handlers
function initModalHandlers() {
  const modal = document.getElementById('quickOfferModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');

  if (closeBtn) closeBtn.addEventListener('click', () => modal?.classList.remove('open'));
  if (dismissBtn) dismissBtn.addEventListener('click', () => modal?.classList.remove('open'));
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

// Application Entry Point
function initApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Initialize Global Event Tracking
  initGlobalEventTracking();

  // Global Navigation Click Delegate
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-nav], a[href^="/"], a[href^="#"]');
    if (!target) return;

    const navAttr = target.getAttribute('data-nav');
    const hrefAttr = target.getAttribute('href');

    // Skip tel, mailto, javascript, external links
    if (hrefAttr && (hrefAttr.startsWith('tel:') || hrefAttr.startsWith('mailto:') || hrefAttr.startsWith('http'))) {
      return;
    }

    // Handle smooth scrolling for local on-page hash anchors
    if (hrefAttr && hrefAttr.startsWith('#') && !navAttr) {
      const anchorId = hrefAttr.substring(1);
      const targetEl = document.getElementById(anchorId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const route = navAttr || hrefAttr;
    if (route) {
      e.preventDefault();
      navigateToRoute(route, true);
    }
  });

  // Global Custom Navigation Dispatch Listener
  window.addEventListener('app:navigate', (e) => {
    if (e.detail && e.detail.route) {
      navigateToRoute(e.detail.route, true);
    }
  });

  // History Popstate Listener (Back / Forward buttons)
  window.addEventListener('popstate', () => {
    const path = window.location.pathname || '/';
    navigateToRoute(path, false);
  });

  // Hash Change Listener (for backward compatibility)
  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      navigateToRoute(window.location.hash, true);
    }
  });

  // Initial Route Resolution
  const initialHash = window.location.hash;
  const initialPath = window.location.pathname || '/';

  if (initialHash && initialHash.length > 1) {
    navigateToRoute(initialHash, false);
  } else {
    navigateToRoute(initialPath, false);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
