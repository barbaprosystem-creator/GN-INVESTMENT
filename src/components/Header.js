export function renderHeader() {
  return `
    <header id="siteHeader" class="fixed top-0 inset-x-0 z-50 bg-[#f7f6f2]/95 backdrop-blur-2xl border-b border-black/8 pt-safe transition-all duration-300 shadow-xs pointer-events-none opacity-0">
      <div class="h-14 sm:h-20 px-3 sm:px-8 flex items-center justify-between max-w-7xl mx-auto w-full pointer-events-auto">
        
        <!-- Mobile: Minimalist Hamburger Menu Button (strictly without logo or name) -->
        <button 
          id="mobileMenuBtn" 
          type="button" 
          aria-label="Open Navigation Menu" 
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 active:scale-95 text-[#111315] transition-transform cursor-pointer"
        >
          <span class="material-symbols-outlined text-[22px]" id="mobileMenuIcon">menu</span>
        </button>

        <!-- Desktop Navigation Links (Without any logo or brand name) -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="/" data-nav="/" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">Home</a>
          <a href="/how-it-works" data-nav="/how-it-works" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">Process</a>
          <a href="/situations" data-nav="/situations" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">Situations</a>
          <a href="/about" data-nav="/about" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">About Us</a>
        </nav>

        <!-- Header Actions (Call, Admin Portal & Get Offer) -->
        <div class="flex items-center gap-2 sm:gap-2.5">
          <a 
            href="tel:5024903131" 
            class="w-8.5 h-8.5 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-[#111315] shadow-xs hover:scale-105 active:scale-95 transition-transform shrink-0" 
            title="Call (502) 490-3131"
          >
            <span class="material-symbols-outlined text-[17px] sm:text-[20px]">call</span>
          </a>
          <a 
            href="/login" 
            data-nav="/login"
            class="w-8.5 h-8.5 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-[#111315] shadow-xs hover:scale-105 active:scale-95 transition-transform shrink-0" 
            title="Panel de Administración"
          >
            <span class="material-symbols-outlined text-[17px] sm:text-[19px] text-copper">admin_panel_settings</span>
          </a>
          <a 
            href="/get-my-offer" 
            id="headerGetOfferBtn"
            data-nav="/get-my-offer" 
            data-analytics-cta="get-my-offer"
            data-location="header_nav"
            class="shimmer-btn bg-[#111315] hover:bg-[#252a35] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md shadow-black/10 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>GET OFFER</span>
            <span class="material-symbols-outlined text-[13px] sm:text-[14px]">arrow_forward</span>
          </a>
        </div>

      </div>

      <!-- Mobile Navigation Drawer -->
      <div 
        id="mobileMenuDrawer" 
        class="hidden md:hidden w-full bg-[#f7f6f2]/98 backdrop-blur-2xl border-t border-black/8 shadow-xl px-5 py-5 transition-all duration-300 pointer-events-auto"
      >
        <div class="flex flex-col gap-2">
          <a href="/" data-nav="/" class="text-xs font-bold uppercase tracking-widest text-[#111315] hover:text-copper transition-colors py-2.5 border-b border-black/5">Home</a>
          <a href="/how-it-works" data-nav="/how-it-works" class="text-xs font-bold uppercase tracking-widest text-[#111315] hover:text-copper transition-colors py-2.5 border-b border-black/5">Process</a>
          <a href="/situations" data-nav="/situations" class="text-xs font-bold uppercase tracking-widest text-[#111315] hover:text-copper transition-colors py-2.5 border-b border-black/5">Situations</a>
          <a href="/about" data-nav="/about" class="text-xs font-bold uppercase tracking-widest text-[#111315] hover:text-copper transition-colors py-2.5 border-b border-black/5">About Us</a>
          <a href="/login" data-nav="/login" class="text-xs font-bold uppercase tracking-widest text-[#111315]/85 hover:text-copper transition-colors py-2.5 border-b border-black/5 flex items-center justify-between">
            <span>Panel Admin</span>
            <span class="material-symbols-outlined text-[17px] text-copper">admin_panel_settings</span>
          </a>
          
          <div class="pt-3 flex flex-col gap-2.5">
            <a 
              href="/get-my-offer" 
              id="mobileGetOfferBtn"
              data-nav="/get-my-offer" 
              data-analytics-cta="get-my-offer"
              data-location="mobile_menu"
              class="btn-copper py-3 text-center text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get My Offer</span>
              <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
            <a 
              href="tel:5024903131" 
              class="py-2 text-center text-xs font-bold text-ink hover:text-copper flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[16px] text-copper">call</span>
              <span>Call (502) 490-3131</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

/**
 * Initializes mobile hamburger menu toggle and interaction listeners.
 */
export function initHeader() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  const icon = document.getElementById('mobileMenuIcon');

  if (!btn || !drawer || btn.dataset.initialized) return;
  btn.dataset.initialized = 'true';

  function toggleMenu() {
    const isClosed = drawer.classList.contains('hidden');
    if (isClosed) {
      drawer.classList.remove('hidden');
      if (icon) icon.textContent = 'close';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      drawer.classList.add('hidden');
      if (icon) icon.textContent = 'menu';
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  function closeMenu() {
    drawer.classList.add('hidden');
    if (icon) icon.textContent = 'menu';
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any link inside drawer
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // Dedicated Get Offer smooth scroll handler when on Home page
  const handleGetOffer = (e) => {
    const offerSection = document.getElementById('homeOfferSection');
    if (offerSection) {
      e.preventDefault();
      closeMenu();
      offerSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const addr = document.getElementById('homeOfferForm_address');
        if (addr) addr.focus();
      }, 500);
    }
  };

  const deskCta = document.getElementById('headerGetOfferBtn');
  const mobCta = document.getElementById('mobileGetOfferBtn');
  if (deskCta) deskCta.addEventListener('click', handleGetOffer);
  if (mobCta) mobCta.addEventListener('click', handleGetOffer);
}
