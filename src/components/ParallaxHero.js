export function renderParallaxHero() {
  return `
    <div class="relative w-full overflow-hidden pt-4 pb-12 sm:pb-20" id="parallaxHeroContainer">
      <!-- Ambient Multi-Layer Background (Moves at speed 0.15) -->
      <div class="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div id="parallaxBlob1" class="absolute -top-[15%] left-[5%] w-[70vw] sm:w-[45vw] h-[70vw] sm:h-[45vw] rounded-full bg-primary/15 blur-[80px] will-change-transform"></div>
        <div id="parallaxBlob2" class="absolute top-[35%] -right-[15%] w-[75vw] sm:w-[50vw] h-[75vw] sm:h-[50vw] rounded-full bg-[#B76E79]/20 blur-[90px] will-change-transform"></div>
      </div>

      <div class="max-w-5xl mx-auto px-4 flex flex-col items-center">
        <!-- Hero Header Text (Enters with cascade) -->
        <div class="text-center flex flex-col items-center gap-2.5 mb-8 sm:mb-12 max-w-2xl">
          <div class="hero-animate-badge inline-flex items-center gap-1.5 self-center shimmer-badge text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/25 shadow-xs">
            <span class="status-dot"></span>
            <span>Direct Real Estate Buyers • Louisville &amp; Kentucky</span>
          </div>

          <h1 class="hero-animate-title font-headline-md text-3xl sm:text-5xl md:text-6xl text-on-surface leading-tight tracking-tight">
            Sell Your Kentucky House <br/>
            <span class="italic text-primary font-serif font-semibold">Without The Hassle</span>
          </h1>

          <p class="hero-animate-sub font-body-md text-sm sm:text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            Skip the 6% agent commissions, open houses, and expensive repairs. Receive a fair, written direct cash offer and choose your closing date.
          </p>
        </div>

        <!-- Central Parallax Visual Stage (House + Floating Friction Badges) -->
        <div class="relative w-full max-w-3xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center my-2 sm:my-6" id="parallaxStage">
          <!-- House Image Layer (Moves at speed 0.25) -->
          <div id="parallaxHouseLayer" class="relative z-10 w-full h-full flex items-center justify-center will-change-transform transition-transform duration-75">
            <img 
              src="/images/house-isolated.png" 
              alt="Kentucky Home As-Is" 
              class="w-full max-h-[38vh] sm:max-h-[50vh] object-contain drop-shadow-[0_20px_35px_rgba(124,85,68,0.25)] rounded-2xl"
            />

            <!-- Subtle Copper Glow Ring Behind House -->
            <div class="absolute inset-0 bg-radial from-primary/20 via-transparent to-transparent blur-2xl -z-10 pointer-events-none"></div>
          </div>

          <!-- Floating Parallax Badge 1: Repairs (Top Left - Speed -0.3) -->
          <div id="parallaxTagRepairs" class="absolute top-[8%] left-[2%] sm:left-[6%] z-20 glass-glow-card py-2 px-3 sm:px-4 rounded-xl border border-red-500/30 bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-2 will-change-transform">
            <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">⚠️</span>
            <div class="flex flex-col">
              <span class="text-[10px] sm:text-[11px] font-bold text-on-surface leading-tight">Avoid $25,000+ Repairs</span>
              <span class="text-[9px] text-on-surface-variant/70">Roof, plumbing &amp; HVAC covered</span>
            </div>
          </div>

          <!-- Floating Parallax Badge 2: Commissions (Top Right - Speed -0.22) -->
          <div id="parallaxTagCommissions" class="absolute top-[12%] right-[2%] sm:right-[6%] z-20 glass-glow-card py-2 px-3 sm:px-4 rounded-xl border border-green-500/30 bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-2 will-change-transform">
            <span class="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <div class="flex flex-col">
              <span class="text-[10px] sm:text-[11px] font-bold text-on-surface leading-tight">0% Realtor Commission</span>
              <span class="text-[9px] text-green-700 font-semibold">Keep 100% of your equity</span>
            </div>
          </div>

          <!-- Floating Parallax Badge 3: Fast Close (Bottom Left - Speed 0.35) -->
          <div id="parallaxTagClose" class="absolute bottom-[10%] left-[4%] sm:left-[10%] z-20 glass-glow-card py-2 px-3 sm:px-4 rounded-xl border border-primary/30 bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-2 will-change-transform">
            <span class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">⚡</span>
            <div class="flex flex-col">
              <span class="text-[10px] sm:text-[11px] font-bold text-on-surface leading-tight">Close in 7–14 Days</span>
              <span class="text-[9px] text-on-surface-variant/70">Or choose your custom date</span>
            </div>
          </div>

          <!-- Floating Parallax Badge 4: As-Is (Bottom Right - Speed 0.28) -->
          <div id="parallaxTagAsIs" class="absolute bottom-[6%] right-[4%] sm:right-[10%] z-20 glass-glow-card py-2 px-3 sm:px-4 rounded-xl border border-primary/30 bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-2 will-change-transform">
            <span class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">🏡</span>
            <div class="flex flex-col">
              <span class="text-[10px] sm:text-[11px] font-bold text-on-surface leading-tight">100% As-Is Purchase</span>
              <span class="text-[9px] text-on-surface-variant/70">No cleaning or staging</span>
            </div>
          </div>
        </div>

        <!-- Integrated Glass Offer Form -->
        <div class="hero-animate-form w-full max-w-lg glass-glow-card rounded-2xl p-5 sm:p-7 relative overflow-hidden mt-4 sm:mt-8 shadow-xl">
          <div class="flex items-center justify-between mb-3.5 border-b border-white/60 pb-2.5">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-primary">Fast Direct Valuation</span>
              <h2 class="font-headline-md text-lg sm:text-xl font-bold text-on-surface">Get Your Free Cash Offer</h2>
            </div>
            <span class="bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              ⚡ 24h Response
            </span>
          </div>

          <form id="heroQuickForm" class="flex flex-col gap-3" novalidate>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-bold text-on-surface/80 uppercase tracking-wider pl-0.5" for="heroAddress">
                Property Address <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/80 text-[20px]">location_on</span>
                <input class="w-full bg-white/85 border border-white/70 rounded-xl text-on-surface text-base py-3 pl-10 pr-3 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 shadow-inner" id="heroAddress" placeholder="Enter your full Kentucky address" type="text" required />
              </div>
            </div>

            <!-- Quick City Fill Chips -->
            <div class="flex items-center gap-1.5 flex-wrap text-[11px] text-on-surface-variant/70 -mt-1 mb-1">
              <span class="text-[10px] font-semibold uppercase">Popular:</span>
              <button type="button" class="quick-chip bg-white/70 px-2 py-0.5 rounded-md border border-white/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" data-val="Louisville, KY">Louisville</button>
              <button type="button" class="quick-chip bg-white/70 px-2 py-0.5 rounded-md border border-white/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" data-val="Lexington, KY">Lexington</button>
              <button type="button" class="quick-chip bg-white/70 px-2 py-0.5 rounded-md border border-white/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" data-val="Jefferson County, KY">Jefferson Co.</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-on-surface/80 uppercase tracking-wider pl-0.5" for="heroName">
                  Your Name <span class="text-red-500">*</span>
                </label>
                <input class="w-full bg-white/85 border border-white/70 rounded-xl text-on-surface text-base py-2.5 px-3 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 shadow-inner" id="heroName" placeholder="Full Name" type="text" required />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-on-surface/80 uppercase tracking-wider pl-0.5" for="heroPhone">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <input class="w-full bg-white/85 border border-white/70 rounded-xl text-on-surface text-base py-2.5 px-3 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 shadow-inner" id="heroPhone" placeholder="(502) 000-0000" type="tel" required />
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-bold text-on-surface/80 uppercase tracking-wider pl-0.5" for="heroReason">
                Property Situation
              </label>
              <div class="relative">
                <select class="w-full bg-white/85 border border-white/70 rounded-xl text-on-surface text-base py-2.5 px-3 appearance-none focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all shadow-inner" id="heroReason">
                  <option value="Need Major Repairs">Needs Major Repairs / Renovations</option>
                  <option value="Inherited Property">Inherited Property / Probate</option>
                  <option value="Tired Landlord">Tired Landlord / Rental</option>
                  <option value="Fast Cash">Want Fast Cash Sale</option>
                  <option value="Vacant Property">Vacant Property</option>
                  <option value="Pre-Foreclosure">Pre-Foreclosure</option>
                  <option value="Other">Other / General Sale</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
              </div>
            </div>

            <button type="submit" class="shimmer-btn mt-1 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.97] transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 w-full cursor-pointer">
              <span>Request My Free Cash Offer</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <div class="flex items-center justify-center gap-2 text-[10px] text-on-surface-variant/70 text-center mt-0.5">
              <span class="material-symbols-outlined text-[14px] text-green-600">verified_user</span>
              <span>100% Free &amp; Confidential • Zero Commission • No Obligation</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initParallaxHero() {
  const container = document.getElementById('parallaxHeroContainer');
  if (!container) return;

  const house = document.getElementById('parallaxHouseLayer');
  const tagRepairs = document.getElementById('parallaxTagRepairs');
  const tagCommissions = document.getElementById('parallaxTagCommissions');
  const tagClose = document.getElementById('parallaxTagClose');
  const tagAsIs = document.getElementById('parallaxTagAsIs');
  const blob1 = document.getElementById('parallaxBlob1');
  const blob2 = document.getElementById('parallaxBlob2');

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Check if hero is in view
    if (scrollY < window.innerHeight * 1.5) {
      // 1. House subtle depth float (speed: 0.12)
      if (house) {
        house.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      }

      // 2. Friction Tags floating at distinct speeds creating true 3D parallax
      if (tagRepairs) {
        tagRepairs.style.transform = `translate3d(0, ${scrollY * -0.16}px, 0) scale(${1 - scrollY * 0.0003})`;
      }
      if (tagCommissions) {
        tagCommissions.style.transform = `translate3d(0, ${scrollY * -0.22}px, 0) scale(${1 - scrollY * 0.0003})`;
      }
      if (tagClose) {
        tagClose.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
      }
      if (tagAsIs) {
        tagAsIs.style.transform = `translate3d(0, ${scrollY * 0.24}px, 0)`;
      }

      // 3. Ambient blobs moving slowly in background
      if (blob1) {
        blob1.style.transform = `translate3d(${scrollY * 0.08}px, ${scrollY * 0.05}px, 0)`;
      }
      if (blob2) {
        blob2.style.transform = `translate3d(${scrollY * -0.06}px, ${scrollY * 0.08}px, 0)`;
      }
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  updateParallax();
}
