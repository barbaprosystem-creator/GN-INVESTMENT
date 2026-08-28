export function renderShowcaseCarousel() {
  const cases = [
    {
      tag: "100% AS-IS ACQUISITION",
      title: "South End Ranch Estate",
      location: "Louisville, KY",
      metrics: "0 Repairs • Closed in 8 Days",
      condition: "Severe Roof & Foundation Wear",
      payout: "$100% Direct Cash",
      image: "/images/house-before.jpg",
      afterImage: "/images/house-after.jpg"
    },
    {
      tag: "INHERITED / PROBATE RESOLVED",
      title: "Historic Victorian Heirloom",
      location: "Old Louisville, KY",
      metrics: "Zero Probate Delays • 4 Heirs Paid",
      condition: "Deferred 20-Yr Maintenance",
      payout: "Direct Escrow Wire",
      image: "/images/situation-inherited.jpg",
      afterImage: "/images/situation-inherited.jpg"
    },
    {
      tag: "TIRED LANDLORD / LEASE ASSUMED",
      title: "Brick Residential Duplex",
      location: "St. Matthews, KY",
      metrics: "Tenants in Place • Zero Eviction Hassle",
      condition: "Occupied Multi-Unit",
      payout: "Full Equity Liquidated",
      image: "/images/situation-rental.jpg",
      afterImage: "/images/situation-rental.jpg"
    },
    {
      tag: "EXPEDITED CASH ESCROW",
      title: "Suburban Single Family",
      location: "Jefferson County, KY",
      metrics: "Pre-Foreclosure Averted • 7-Day Wire",
      condition: "As-Is Handover",
      payout: "Certified Title Funds",
      image: "/images/closing-table.jpg",
      afterImage: "/images/closing-table.jpg"
    }
  ];

  return `
    <div class="w-full relative my-12" id="showcaseCarouselSection">
      <!-- Section Header with Editorial Navigation Controls (Constrained) -->
      <div class="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs font-mono uppercase tracking-widest text-[#b88a76] flex items-center gap-2 font-extrabold">
            <span class="w-2 h-2 rounded-full bg-[#b88a76] animate-ping"></span>
            [ RECENT CASE STUDIES // KENTUCKY ]
          </span>
          <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111315] font-['Plus_Jakarta_Sans',sans-serif]">
            ACQUISITIONS <span class="text-[#b88a76]">/</span> PORTFOLIO
          </h2>
        </div>

        <!-- Slider Arrows (Horizon Style) -->
        <div class="flex items-center gap-2 self-start sm:self-auto">
          <button 
            id="showcasePrevBtn" 
            class="w-12 h-12 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center text-[#111315] active:scale-95 transition-all cursor-pointer"
            aria-label="Previous Project"
          >
            <span class="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <button 
            id="showcaseNextBtn" 
            class="w-12 h-12 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center text-[#111315] active:scale-95 transition-all cursor-pointer"
            aria-label="Next Project"
          >
            <span class="material-symbols-outlined text-[22px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Asymmetric Left-Bleed Track with Right Background Guide Line -->
      <div class="relative w-full">
        
        <!-- Architectural Vertical Guide Line on the Right Side -->
        <div class="absolute right-4 sm:right-10 lg:right-16 top-0 bottom-0 w-px bg-black/15 z-0 pointer-events-none flex flex-col justify-between py-2">
          <span class="text-[9px] font-mono text-[#717580] -rotate-90 origin-top-right transform translate-x-3 tracking-widest uppercase">PORTFOLIO_RUNWAY</span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#b88a76] -translate-x-[2.5px]"></span>
        </div>

        <!-- Horizontal Drag / Scroll Carousel (Bleeding off Left Edge) -->
        <div 
          id="showcaseTrack" 
          class="relative z-10 flex gap-6 sm:gap-8 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory py-2 pl-0 pr-16 sm:pr-24 lg:pr-36 w-full"
        >
          ${cases.map((c, i) => `
            <div class="${i === 0 ? '-ml-1 sm:-ml-2' : ''} w-[82vw] sm:w-[560px] lg:w-[720px] shrink-0 snap-start flex flex-col gap-4 group">
              
              <!-- Panoramic Image Bleeding Left -->
              <div class="relative h-72 sm:h-[440px] w-full overflow-hidden">
                <img 
                  src="${c.image}" 
                  alt="${c.title}" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none" 
                />
                
                <!-- Monospace Top Tag -->
                <div class="absolute top-4 left-4 z-10 bg-[#111315]/90 text-[#efbba5] text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 shadow-md">
                  ${c.tag}
                </div>

                <div class="absolute bottom-4 right-4 z-10 bg-[#111315]/90 text-white text-[10px] font-mono px-3 py-1.5 shadow-md">
                  📍 ${c.location}
                </div>
              </div>

              <!-- Editorial Details Directly Underneath Image -->
              <div class="flex flex-col gap-2 pt-1 pl-4 sm:pl-6">
                <h3 class="text-2xl font-black text-[#111315] font-['Plus_Jakarta_Sans',sans-serif] group-hover:text-[#b88a76] transition-colors">
                  ${c.title}
                </h3>
                
                <div class="flex items-center justify-between text-xs font-mono text-[#555964] border-y border-black/10 py-2.5">
                  <span>CONDITION: <strong class="text-[#111315]">${c.condition}</strong></span>
                  <span class="text-green-700 font-bold">${c.payout}</span>
                </div>

                <span class="text-xs font-mono text-[#717580] uppercase tracking-wider">
                  ${c.metrics}
                </span>
              </div>

            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initShowcaseCarousel() {
  const track = document.getElementById('showcaseTrack');
  const prevBtn = document.getElementById('showcasePrevBtn');
  const nextBtn = document.getElementById('showcaseNextBtn');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 600;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}
