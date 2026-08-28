export function renderParallaxExperience() {
  return `
    <section class="parallax-hero relative h-[250vh] sm:h-[300vh] bg-[#0c0e12] text-white my-10 overflow-clip rounded-3xl border border-white/10 shadow-2xl" id="parallaxSection">
      <!-- Sticky Fullscreen Viewport Container -->
      <div class="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4">
        
        <!-- Ambient Liquid Light Behind House -->
        <div id="parallaxHouseGlow" class="absolute w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full bg-[#B76E79]/20 blur-[90px] transition-all duration-300 pointer-events-none"></div>

        <!-- Top Progress Header -->
        <div class="absolute top-20 sm:top-24 left-0 right-0 z-30 flex flex-col items-center text-center px-4 pointer-events-none">
          <span class="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#efbba5] font-bold mb-1 flex items-center gap-1.5">
            <span class="status-dot"></span> Interactive Transformation
          </span>
          <h2 id="parallaxStageTitle" class="font-headline-md text-lg sm:text-2xl md:text-3xl text-white transition-opacity duration-200">
            The Burden of Traditional Selling
          </h2>
          <!-- Micro Progress Bar -->
          <div class="w-28 sm:w-36 h-1 bg-white/15 rounded-full mt-2 overflow-hidden">
            <div id="parallaxProgressBar" class="h-full bg-gradient-to-r from-[#B76E79] to-[#efbba5] w-0 transition-all duration-75"></div>
          </div>
        </div>

        <!-- Layer 1 & 2: House & Copper Scan Beam -->
        <div class="relative w-full max-w-[540px] z-10 flex items-center justify-center mt-6 sm:mt-10">
          <img 
            src="/images/house-isolated.png" 
            alt="Kentucky House" 
            id="parallaxHouseImg" 
            class="w-full max-h-[40vh] sm:max-h-[50vh] object-contain rounded-2xl shadow-2xl transition-transform duration-75 will-change-transform" 
          />
          
          <!-- Copper Scanner Beam -->
          <div 
            id="parallaxScanLine" 
            class="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#efbba5]/70 to-transparent pointer-events-none opacity-0 shadow-[0_0_30px_rgba(239,187,165,0.8)]"
            style="transform: translateX(-100%);"
          ></div>
        </div>

        <!-- Layer 3: Stress / Friction Tags (Fly away on scroll) -->
        <div id="stressTag1" class="tag-stress absolute top-[30%] sm:top-[28%] left-[4%] sm:left-[12%] z-20 bg-red-950/85 backdrop-blur-md border border-red-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-red-200 shadow-xl flex items-center gap-1.5 transition-all duration-200 will-change-transform">
          <span>⚠️</span>
          <span>Repairs &amp; Roof: $25,000+</span>
        </div>

        <div id="stressTag2" class="tag-stress absolute top-[64%] sm:top-[65%] left-[3%] sm:left-[10%] z-20 bg-red-950/85 backdrop-blur-md border border-red-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-red-200 shadow-xl flex items-center gap-1.5 transition-all duration-200 will-change-transform">
          <span>⏳</span>
          <span>6+ Months on MLS Market</span>
        </div>

        <div id="stressTag3" class="tag-stress absolute top-[38%] right-[4%] sm:right-[12%] z-20 bg-red-950/85 backdrop-blur-md border border-red-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-red-200 shadow-xl flex items-center gap-1.5 transition-all duration-200 will-change-transform">
          <span>💸</span>
          <span>6% Realtor Commission (~$18k)</span>
        </div>

        <!-- Layer 4: Solution Card (Springs in as stress disappears) -->
        <div id="parallaxSolutionCard" class="opacity-0 scale-90 translate-y-8 pointer-events-none absolute z-30 max-w-sm w-[90%] sm:w-auto bg-[#14181f]/90 backdrop-blur-2xl border border-[#B76E79] p-5 sm:p-6 rounded-3xl shadow-2xl transition-all duration-300">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="status-dot"></span>
            <span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#efbba5]">The G&amp;N Advantage</span>
          </div>
          <h3 class="font-headline-md text-xl sm:text-2xl font-bold text-white mb-1">Sell 100% As-Is</h3>
          <p class="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
            Zero repairs. Zero commissions. Standard closing costs paid by us. Cash payout in 7 to 14 days.
          </p>
          <a href="#get-offer" data-nav="get-offer" class="shimmer-btn bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl w-full flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-95 transition-all cursor-pointer">
            <span>Claim My Direct Cash Offer</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <!-- Scroll Cue Indicator -->
        <div id="parallaxScrollCue" class="absolute bottom-6 z-20 flex flex-col items-center gap-0.5 text-[10px] sm:text-[11px] text-white/50 animate-bounce pointer-events-none">
          <span>Scroll to transform</span>
          <span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
        </div>
      </div>
    </section>
  `;
}

export function initParallaxExperience() {
  const section = document.getElementById('parallaxSection');
  if (!section) return;

  const title = document.getElementById('parallaxStageTitle');
  const progressBar = document.getElementById('parallaxProgressBar');
  const scanLine = document.getElementById('parallaxScanLine');
  const houseImg = document.getElementById('parallaxHouseImg');
  const houseGlow = document.getElementById('parallaxHouseGlow');
  const tag1 = document.getElementById('stressTag1');
  const tag2 = document.getElementById('stressTag2');
  const tag3 = document.getElementById('stressTag3');
  const solutionCard = document.getElementById('parallaxSolutionCard');
  const scrollCue = document.getElementById('parallaxScrollCue');

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = section.offsetHeight - windowH;
    
    // Progress clamped 0 to 1
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDist));

    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }

    if (progress <= 0.05) {
      if (scrollCue) scrollCue.style.opacity = '1';
    } else {
      if (scrollCue) scrollCue.style.opacity = '0';
    }

    // PHASE 1: Traditional Stress (0.0 to 0.3)
    if (progress < 0.28) {
      if (title) title.innerText = "The Burden of Traditional Selling";
      if (houseGlow) houseGlow.style.backgroundColor = "rgba(183, 110, 121, 0.15)";
      
      if (tag1) {
        tag1.style.transform = `translate(0px, 0px) rotate(0deg)`;
        tag1.style.opacity = "1";
      }
      if (tag2) {
        tag2.style.transform = `translate(0px, 0px) rotate(0deg)`;
        tag2.style.opacity = "1";
      }
      if (tag3) {
        tag3.style.transform = `translate(0px, 0px) rotate(0deg)`;
        tag3.style.opacity = "1";
      }

      if (scanLine) scanLine.style.opacity = "0";
      if (solutionCard) {
        solutionCard.style.opacity = "0";
        solutionCard.style.transform = "scale(0.9) translateY(20px)";
        solutionCard.style.pointerEvents = "none";
      }
    } 
    // PHASE 2: Copper Scan Beam & Stress Flying Away (0.28 to 0.68)
    else if (progress >= 0.28 && progress < 0.68) {
      const p = (progress - 0.28) / 0.4; // 0 to 1
      if (title) title.innerText = "G&N Instant As-Is Transformation";

      // Scan beam sweeps left to right
      if (scanLine) {
        scanLine.style.opacity = "1";
        scanLine.style.left = `${p * 110}%`;
      }

      // House subtle scale
      if (houseImg) {
        houseImg.style.transform = `scale(${1 + p * 0.04})`;
      }

      // Glow intensifies
      if (houseGlow) {
        houseGlow.style.backgroundColor = `rgba(239, 187, 165, ${0.15 + p * 0.25})`;
      }

      // Tags fly away in different directions
      const fadeOut = Math.max(0, 1 - p * 1.5);
      if (tag1) {
        tag1.style.transform = `translate(${-p * 90}px, ${-p * 70}px) rotate(${-p * 15}deg)`;
        tag1.style.opacity = `${fadeOut}`;
      }
      if (tag2) {
        tag2.style.transform = `translate(${-p * 100}px, ${p * 60}px) rotate(${-p * 10}deg)`;
        tag2.style.opacity = `${fadeOut}`;
      }
      if (tag3) {
        tag3.style.transform = `translate(${p * 110}px, ${-p * 50}px) rotate(${p * 15}deg)`;
        tag3.style.opacity = `${fadeOut}`;
      }

      if (solutionCard) {
        solutionCard.style.opacity = "0";
        solutionCard.style.transform = "scale(0.9) translateY(20px)";
        solutionCard.style.pointerEvents = "none";
      }
    } 
    // PHASE 3: G&N Solution Reveal (0.68 to 1.0)
    else {
      const p = (progress - 0.68) / 0.32; // 0 to 1
      if (title) title.innerText = "Direct Cash Offer • Complete Peace of Mind";

      if (scanLine) scanLine.style.opacity = "0";

      if (tag1) tag1.style.opacity = "0";
      if (tag2) tag2.style.opacity = "0";
      if (tag3) tag3.style.opacity = "0";

      if (houseGlow) {
        houseGlow.style.backgroundColor = "rgba(183, 110, 121, 0.4)";
      }

      if (solutionCard) {
        solutionCard.style.opacity = "1";
        solutionCard.style.transform = `scale(1) translateY(0px)`;
        solutionCard.style.pointerEvents = "auto";
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
