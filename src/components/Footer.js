import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function renderFooter() {
  const marqueeItems = [
    "DIRECT CASH CAPITAL",
    "0% REAL ESTATE COMMISSIONS",
    "100% AS-IS ACQUISITION",
    "LOUISVILLE & STATEWIDE",
    "CERTIFIED TITLE CLOSING",
    "7–14 DAY CASH WIRE",
    "ZERO REPAIR DEMANDS",
    "CONFIDENTIAL VALUATION"
  ];

  const marqueeHTML = marqueeItems
    .map((item) => `<span>${item}</span> <span class="text-[#efbba5]">✦</span>`)
    .join(' ');

  return `
    <!-- Cinematic Curtain Reveal Footer System -->
    <div class="relative w-full overflow-hidden cinematic-footer-wrapper mt-20 pt-8 border-t border-white/10" id="cinematicFooter">
      <footer class="relative flex min-h-[85vh] sm:min-h-[90vh] w-full flex-col justify-between overflow-hidden bg-[#0d1016] text-[#f3f4f6] pb-36 sm:pb-28 md:pb-12 pt-14 sm:pt-16">
        
        <!-- Ambient Aurora Glow & Theme-adaptive Grid Background -->
        <div class="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[100px] pointer-events-none z-0"></div>
        <div class="footer-bg-grid absolute inset-0 z-0 pointer-events-none"></div>

        <!-- Giant Background Text: GN INVESTMENTS (Fully fitted on Mobile & Desktop) -->
        <div id="footerGiantText" class="footer-giant-bg-text absolute bottom-36 sm:bottom-16 md:-bottom-[1vh] inset-x-0 mx-auto w-full z-0 pointer-events-none select-none text-center flex flex-col items-center justify-center">
          <div class="sm:hidden flex flex-col items-center">
            <span class="text-[17vw] font-black tracking-tight leading-[0.8] block">GN</span>
            <span class="text-[12vw] font-black tracking-tight leading-[0.8] block">INVESTMENTS</span>
          </div>
          <span class="hidden sm:block text-[14vw] md:text-[18vw] font-black tracking-tighter whitespace-nowrap">GN INVESTMENTS</span>
        </div>

        <!-- 1. Diagonal Sleek Marquee (Top of footer) -->
        <div class="relative w-full overflow-hidden border-y border-white/10 bg-[#12151b]/80 backdrop-blur-md py-4 z-10 -rotate-1 scale-105 shadow-2xl mb-8">
          <div class="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-gray-400 font-mono uppercase space-x-8">
            <div class="flex items-center space-x-8 px-4">
              ${marqueeHTML}
            </div>
            <div class="flex items-center space-x-8 px-4">
              ${marqueeHTML}
            </div>
          </div>
        </div>

        <!-- 2. Main Center Content -->
        <div class="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 my-auto w-full max-w-5xl mx-auto text-center">
          
          <span id="footerBadge" class="text-xs font-mono uppercase tracking-widest text-[#efbba5] font-bold mb-3 inline-flex items-center gap-2 bg-[#181c26]/90 px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
            <span class="status-dot"></span> NEXT STEPS // KENTUCKY REAL ESTATE
          </span>

          <h2 id="footerHeading" class="text-4xl sm:text-6xl md:text-8xl font-black footer-text-glow tracking-tight mb-8 text-center font-['Plus_Jakarta_Sans',sans-serif]">
            Ready To Sell?
          </h2>

          <!-- Interactive Magnetic Action Pills -->
          <div id="footerLinks" class="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl">
            
            <!-- Primary Action Links -->
            <div class="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
              <a 
                href="#get-offer" 
                data-nav="get-offer" 
                class="magnetic-btn footer-glass-pill px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white font-bold text-xs sm:text-base flex items-center gap-3 group bg-gradient-to-tr from-primary to-[#efbba5] text-[#12151b] shadow-xl shadow-primary/30 border border-white/30 cursor-pointer"
              >
                <span class="material-symbols-outlined text-[20px] text-white">local_offer</span>
                <span class="text-white uppercase tracking-wider font-extrabold">Get Cash Offer</span>
                <span class="material-symbols-outlined text-[18px] text-white transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>

              <a 
                href="tel:5028007355" 
                class="magnetic-btn footer-glass-pill px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white font-bold text-xs sm:text-base flex items-center gap-3 group cursor-pointer"
              >
                <span class="material-symbols-outlined text-[20px] text-[#efbba5]">call</span>
                <span class="uppercase tracking-wider">Call (502) 800-SELL</span>
              </a>
            </div>

            <!-- Secondary Text Navigation Links -->
            <div class="flex flex-wrap justify-center gap-2.5 sm:gap-4 w-full mt-2 text-xs">
              <a href="#home" data-nav="home" class="magnetic-btn footer-glass-pill px-5 py-2.5 rounded-full text-gray-300 hover:text-white font-medium">Home</a>
              <a href="#how-it-works" data-nav="how-it-works" class="magnetic-btn footer-glass-pill px-5 py-2.5 rounded-full text-gray-300 hover:text-white font-medium">Process</a>
              <a href="#situations" data-nav="situations" class="magnetic-btn footer-glass-pill px-5 py-2.5 rounded-full text-gray-300 hover:text-white font-medium">Situations</a>
              <a href="#about" data-nav="about" class="magnetic-btn footer-glass-pill px-5 py-2.5 rounded-full text-gray-300 hover:text-white font-medium">About Us</a>
              <a href="#privacy" data-nav="privacy" class="magnetic-btn footer-glass-pill px-5 py-2.5 rounded-full text-gray-400 hover:text-white font-medium">Privacy</a>
              <a href="#terms" data-nav="terms" class="magnetic-btn footer-glass-pill px-5 py-2.5 rounded-full text-gray-400 hover:text-white font-medium">Terms</a>
            </div>

          </div>
        </div>

        <!-- 3. Bottom Bar / Credits -->
        <div class="relative z-20 w-full pt-8 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 mt-8">
          
          <!-- Copyright -->
          <div class="text-gray-400 text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase order-2 md:order-1 text-center sm:text-left">
            &copy; ${new Date().getFullYear()} G&amp;N Investment LLC. Direct Real Estate Buyers.
          </div>

          <!-- Crafted Badge -->
          <div class="footer-glass-pill px-5 py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
            <span class="text-gray-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">Louisville</span>
            <span class="animate-footer-heartbeat text-sm text-red-500">❤</span>
            <span class="text-gray-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">Kentucky</span>
          </div>

          <!-- Back To Top Button -->
          <button 
            type="button" 
            id="footerBackToTopBtn" 
            class="magnetic-btn w-10 h-10 sm:w-11 sm:h-11 rounded-full footer-glass-pill flex items-center justify-center text-gray-300 hover:text-[#efbba5] group order-3 cursor-pointer"
            aria-label="Back to Top"
          >
            <span class="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-y-1">arrow_upward</span>
          </button>

        </div>
      </footer>
    </div>
  `;
}

export function initFooter() {
  const footerWrapper = document.getElementById('cinematicFooter');
  const giantText = document.getElementById('footerGiantText');
  const heading = document.getElementById('footerHeading');
  const badge = document.getElementById('footerBadge');
  const links = document.getElementById('footerLinks');
  const backToTopBtn = document.getElementById('footerBackToTopBtn');

  if (!footerWrapper) return;

  // 1. GSAP ScrollTrigger Background Parallax on Giant Text
  if (giantText) {
    gsap.fromTo(
      giantText,
      { y: '8vh', scale: 0.8, opacity: 0 },
      {
        y: '0vh',
        scale: 1,
        opacity: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: footerWrapper,
          start: 'top 85%',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      }
    );
  }

  // 2. GSAP ScrollTrigger Staggered Content Reveal on Heading and Actions
  if (heading && links) {
    gsap.fromTo(
      [badge, heading, links],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerWrapper,
          start: 'top 65%',
          end: 'bottom 90%',
          scrub: 1,
        },
      }
    );
  }

  // 3. Back to Top Click Handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Zero-dependency Magnetic Button Physics on Desktop
  if (window.innerWidth >= 768) {
    const magneticBtns = footerWrapper.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const h = rect.width / 2;
        const w = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - w;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          rotationX: -y * 0.1,
          rotationY: x * 0.1,
          scale: 1.04,
          ease: 'power2.out',
          duration: 0.35,
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1.1,
        });
      });
    });
  }
}
