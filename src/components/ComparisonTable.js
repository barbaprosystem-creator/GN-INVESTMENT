export function renderComparisonTable() {
  const comparisonData = [
    {
      feature: "Real Estate Commissions",
      directBuyer: "0% — No agent commissions ($0 out of pocket)",
      traditionalListing: "Typically 5% to 6% paid by the seller from sale proceeds"
    },
    {
      feature: "Repairs & Improvements",
      directBuyer: "100% As-Is — No painting, roof repairs, or fixes required",
      traditionalListing: "Seller often makes repairs or offers credits after buyer inspections"
    },
    {
      feature: "Cleaning & Belongings",
      directBuyer: "Take what you want and leave the rest behind",
      traditionalListing: "Home must be completely cleaned out and staged for viewings"
    },
    {
      feature: "Showings & Open Houses",
      directBuyer: "One discreet 15-minute walkthrough",
      traditionalListing: "Dozens of prospective buyer tours, lockboxes, and open houses"
    },
    {
      feature: "Closing Date Flexibility",
      directBuyer: "You choose your date: close in 7–14 days or take more time",
      traditionalListing: "Subject to buyer mortgage underwriting, usually 45–60+ days"
    },
    {
      feature: "Standard Closing Fees",
      directBuyer: "G&N Investment pays standard closing costs",
      traditionalListing: "Seller pays approximately 2% to 4% in seller closing expenses"
    }
  ];

  return `
    <div class="w-full flex flex-col gap-6">
      
      <!-- Desktop & Tablet Comparison Table -->
      <div class="hidden md:block overflow-hidden rounded-2xl border border-border-warm bg-white double-bezel">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-border-warm bg-warm-white">
              <th class="p-5 font-bold text-xs uppercase tracking-wider text-warm-gray w-1/3">
                Key Consideration
              </th>
              <th class="p-5 bg-white font-serif font-bold text-lg text-ink w-1/3 border-x border-border-warm text-center">
                <span class="block text-[11px] font-sans font-bold uppercase tracking-wider text-copper mb-0.5">Direct Local Buyer</span>
                G&amp;N Investment
              </th>
              <th class="p-5 font-serif font-bold text-lg text-warm-gray w-1/3 text-center">
                <span class="block text-[11px] font-sans font-bold uppercase tracking-wider text-warm-gray mb-0.5">Traditional Listing</span>
                MLS Real Estate Agent
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-warm text-sm">
            ${comparisonData.map((row) => `
              <tr class="hover:bg-warm-white/50 transition-colors">
                <td class="p-5 font-bold text-ink">
                  ${row.feature}
                </td>
                <td class="p-5 bg-white font-medium text-ink text-center border-x border-border-warm">
                  <div class="flex items-center justify-center gap-2 text-left">
                    <span class="material-symbols-outlined text-green-700 text-[18px] shrink-0">check_circle</span>
                    <span>${row.directBuyer}</span>
                  </div>
                </td>
                <td class="p-5 text-warm-gray text-center">
                  <div class="flex items-center justify-center gap-2 text-left">
                    <span class="material-symbols-outlined text-warm-gray text-[18px] shrink-0">info</span>
                    <span>${row.traditionalListing}</span>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Mobile Comparison Cards (Single Column / 390px friendly) -->
      <div class="flex flex-col gap-4 md:hidden">
        
        <!-- Direct Buyer Card -->
        <div class="bg-white rounded-2xl p-5 border-2 border-copper/30 shadow-card">
          <div class="flex items-center justify-between border-b border-border-warm pb-3 mb-3">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-copper block">Direct Local Buyer</span>
              <h3 class="text-xl font-serif font-bold text-ink">G&amp;N Investment</h3>
            </div>
            <span class="bg-copper text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Simpler Sale
            </span>
          </div>

          <ul class="flex flex-col divide-y divide-border-warm/60 text-xs">
            ${comparisonData.map((r) => `
              <li class="py-2.5 flex items-start gap-2">
                <span class="material-symbols-outlined text-green-700 text-[18px] shrink-0 mt-0.5">check_circle</span>
                <div class="flex flex-col">
                  <span class="font-bold text-warm-gray uppercase text-[10px]">${r.feature}</span>
                  <span class="font-semibold text-ink mt-0.5">${r.directBuyer}</span>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Traditional Listing Card -->
        <div class="bg-white rounded-2xl p-5 border border-border-warm shadow-subtle">
          <div class="flex items-center justify-between border-b border-border-warm pb-3 mb-3">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-warm-gray block">Traditional Route</span>
              <h3 class="text-xl font-serif font-bold text-warm-gray">MLS Real Estate Agent</h3>
            </div>
            <span class="bg-warm-white text-warm-gray border border-border-warm text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Market Listing
            </span>
          </div>

          <ul class="flex flex-col divide-y divide-border-warm/60 text-xs text-warm-gray">
            ${comparisonData.map((r) => `
              <li class="py-2.5 flex items-start gap-2">
                <span class="material-symbols-outlined text-warm-gray text-[18px] shrink-0 mt-0.5">info</span>
                <div class="flex flex-col">
                  <span class="font-bold text-warm-gray uppercase text-[10px]">${r.feature}</span>
                  <span class="mt-0.5 text-ink/80">${r.traditionalListing}</span>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

      </div>

      <!-- Action prompt following comparison -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 text-center">
        <a 
          href="/get-my-offer" 
          data-nav="get-my-offer"
          data-analytics-cta="get-my-offer"
          data-location="comparison_table"
          class="btn-primary w-full sm:w-auto px-7 py-3"
        >
          <span>Get My Offer</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
        <a 
          href="tel:5024903131" 
          data-location="comparison_table"
          class="btn-secondary w-full sm:w-auto px-6 py-3"
        >
          <span class="material-symbols-outlined text-[18px] text-copper">call</span>
          <span>Call (502) 490-3131</span>
        </a>
      </div>

    </div>
  `;
}
