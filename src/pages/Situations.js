export function renderSituationsPage() {
  const categories = [
    { id: "all", label: "All Situations" },
    { id: "repairs", label: "Major Repairs" },
    { id: "inherited", label: "Inheritance & Probate" },
    { id: "landlord", label: "Tired Landlord" },
    { id: "foreclosure", label: "Pre-Foreclosure" }
  ];

  const situations = [
    {
      id: "repairs",
      title: "Major Repairs & Renovation Needs",
      desc: "Sell 100% As-Is without spending tens of thousands on roofs, foundation, plumbing, HVAC, or contractor estimates.",
      badge: "Zero Fixes Needed",
      solution: "We purchase in exact present condition, taking full responsibility for all required repairs.",
      img: "/images/house-before.jpg"
    },
    {
      id: "inherited",
      title: "Inherited Property & Probate Estate",
      desc: "Liquidate inherited estate or family homes easily, without family dispute, ongoing maintenance costs, or probate delays.",
      badge: "Estate Solution",
      solution: "We work directly with probate attorneys and executors for a clean, respectful title transfer.",
      img: "/images/situation-inherited.jpg"
    },
    {
      id: "landlord",
      title: "Tired Landlord & Rental Properties",
      desc: "Sell rental properties with non-paying tenants, lease violations, or deferred maintenance headaches.",
      badge: "Tenants In Place OK",
      solution: "We assume existing leases or manage tenant transitions after closing with zero stress to you.",
      img: "/images/situation-rental.jpg"
    },
    {
      id: "foreclosure",
      title: "Pre-Foreclosure & Urgent Payout",
      desc: "Stop impending bank auctions, protect your credit score, and extract your equity with a guaranteed closing date.",
      badge: "Fast Cash Wire",
      solution: "We can close in as little as 7 days, working directly with the closing title company to pay off lenders.",
      img: "/images/closing-table.jpg"
    }
  ];

  return `
    <div class="flex flex-col w-full relative z-10 pb-28 md:pb-16 pt-6 text-[#111315]">
      <!-- Title Header (Constrained) -->
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-4 pb-8 flex flex-col gap-2 text-center reveal">
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ 01 // PROPERTY SCENARIOS ]</span>
        <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#111315] font-['Playfair_Display',serif]">
          SITUATIONS WE RESOLVE
        </h1>
        <p class="text-base text-[#555964] max-w-lg mx-auto leading-relaxed">
          Discreet, expedited solutions for complex property circumstances across Kentucky.
        </p>
      </div>

      <!-- Interactive Category Filter Bar -->
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 flex gap-3 overflow-x-auto pb-4 hide-scrollbar justify-start sm:justify-center mb-10" id="situationsFilterBar">
        ${categories.map((c, i) => `
          <button 
            type="button" 
            data-filter="${c.id}" 
            class="filter-pill shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer ${
              i === 0
                ? 'bg-[#111315] text-white shadow-md'
                : 'bg-black/5 text-[#555964] hover:text-black hover:bg-black/10'
            }"
          >
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Full-Width Situations Feed (100% Screen Width Imagery) -->
      <div class="w-full flex flex-col gap-16 sm:gap-24" id="situationsGrid">
        ${situations.map((s, idx) => `
          <div 
            class="situation-card reveal flex flex-col gap-6 w-full" 
            data-category="${s.id}"
          >
            <!-- 100% Full-Width Panoramic Image -->
            <div class="w-full overflow-hidden">
              <img 
                src="${s.img}" 
                alt="${s.title}" 
                class="w-full h-80 sm:h-[480px] object-cover select-none" 
              />
            </div>

            <!-- Content Area (Constrained to max-w-7xl) -->
            <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-black/10">
              <div class="flex flex-col gap-2 max-w-2xl">
                <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ ${s.badge} ]</span>
                <h3 class="text-2xl sm:text-4xl font-black font-['Playfair_Display',serif] text-[#111315]">${s.title}</h3>
                <p class="text-base text-[#555964] leading-relaxed mt-1">${s.desc}</p>
              </div>

              <!-- Solution Box & Action Link -->
              <div class="flex flex-col gap-3 min-w-[280px] sm:min-w-[340px]">
                <div class="p-4 bg-[#ede9df] text-xs font-mono text-[#111315] flex flex-col gap-1">
                  <span class="font-bold text-[#b88a76] uppercase">G&amp;N Execution:</span>
                  <span class="leading-relaxed">${s.solution}</span>
                </div>

                <a href="#get-offer" data-nav="get-offer" class="shimmer-btn bg-[#111315] hover:bg-[#252a35] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm">
                  <span>Request Cash Offer For This Scenario</span>
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Direct Contact Prompt -->
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 mt-16">
        <div class="text-center reveal p-8 sm:p-14 bg-[#111315] text-white flex flex-col items-center gap-4">
          <h3 class="text-2xl sm:text-4xl font-black font-['Playfair_Display',serif] text-white">Have a Unique or Complex Situation?</h3>
          <p class="text-sm sm:text-base text-gray-300 max-w-md">
            Every Kentucky homeowner's circumstance is different. Speak confidentially with our acquisitions team today.
          </p>
          <a href="tel:5028007355" class="shimmer-btn bg-[#efbba5] hover:bg-[#efbba5]/90 text-[#111315] text-xs font-extrabold uppercase tracking-widest px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-lg mt-2">
            <span class="material-symbols-outlined text-[18px]">call</span>
            <span>Call (502) 800-SELL</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initSituationsFilter() {
  const filterBar = document.getElementById('situationsFilterBar');
  const cards = document.querySelectorAll('.situation-card');
  if (!filterBar || cards.length === 0) return;

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;

    const filter = btn.getAttribute('data-filter');

    // Update Pill Active States
    filterBar.querySelectorAll('.filter-pill').forEach((pill) => {
      pill.className = 'filter-pill shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer bg-black/5 text-[#555964] hover:text-black hover:bg-black/10';
    });
    btn.className = 'filter-pill shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer bg-[#111315] text-white shadow-md';

    // Filter Cards
    cards.forEach((card) => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
