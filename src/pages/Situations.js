export function renderSituationsPage() {
  const situationsList = [
    {
      id: "repairs",
      title: "Homes Needing Major Repairs",
      tag: "100% As-Is Purchase",
      desc: "Traditional buyers demand pristine condition, home inspection repair lists, and bank-mandated improvements. If your property needs a new roof, plumbing updates, HVAC replacement, foundation attention, or cosmetic remodeling, you don't have to invest a single dollar before selling.",
      solution: "We purchase the property in its exact current state, take full responsibility for all subsequent renovations, and never ask for repair credits.",
      icon: "handyman",
      link: "/sell-house-as-is-louisville"
    },
    {
      id: "inherited",
      title: "Inherited Property & Probate Estates",
      tag: "Probate & Estate Solutions",
      desc: "Managing an inherited property while mourning a loved one can be emotionally and financially draining—especially if there are multiple heirs, deferred maintenance, or you live outside the Louisville area.",
      solution: "We work respectfully alongside estate executors and probate attorneys to provide a clean, dignified cash purchase with no cleanout required.",
      icon: "family_restroom",
      link: "/sell-inherited-house-louisville"
    },
    {
      id: "landlord",
      title: "Rental Properties & Tired Landlords",
      tag: "Tenant-Occupied OK",
      desc: "Owning rental real estate can become exhausting when faced with non-paying tenants, lease violations, property damage, or the ongoing burden of maintenance calls.",
      solution: "We regularly buy tenant-occupied duplexes, multi-family units, and single-family rentals. You do not have to perform evictions or wait for leases to expire.",
      icon: "apartment",
      link: "/sell-rental-property-louisville"
    },
    {
      id: "vacant",
      title: "Vacant & Unoccupied Properties",
      tag: "Eliminate Holding Costs",
      desc: "An empty house continues to accumulate property taxes, utility bills, lawn maintenance expenses, and insurance costs every single month—along with the risk of vandalism or weather damage.",
      solution: "Convert an unused asset into liquid capital quickly and stop paying monthly holding expenses.",
      icon: "cottage",
      link: "/get-my-offer"
    },
    {
      id: "fast",
      title: "Need to Sell on a Fast Timeline",
      tag: "7–14 Day Closings",
      desc: "When facing a job relocation, unexpected medical expenses, or sudden financial deadlines, waiting 60 to 90 days for a traditional MLS buyer's mortgage approval isn't practical.",
      solution: "Without bank mortgage contingencies, we can finalize closing in as few as 7 to 14 days once clear title is verified.",
      icon: "schedule",
      link: "/sell-my-house-louisville-ky"
    },
    {
      id: "transition",
      title: "Major Life Transitions & Downsizing",
      tag: "Discreet & Simple",
      desc: "Whether transitioning into retirement living, navigating a divorce, or downsizing from a large family home, having dozens of strangers walk through your personal space during open houses can feel intrusive.",
      solution: "We provide a private, confidential sale with a single friendly walkthrough and total control over your move-out date.",
      icon: "swap_horiz",
      link: "/get-my-offer"
    }
  ];

  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        <!-- Header -->
        <div class="text-center mb-12 sm:mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">Situations We Handle</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2">
            Practical Solutions for Every Property Situation
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-xl mx-auto mt-3 leading-relaxed">
            Real estate challenges don't have to be overwhelming. G&amp;N Investment provides straightforward, respectful cash offers tailored to your circumstances.
          </p>
        </div>

        <!-- 6 Detailed Situation Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          ${situationsList.map((item) => `
            <div class="clean-card p-6 sm:p-8 flex flex-col justify-between gap-6" id="${item.id}">
              
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-xl bg-warm-white border border-border-warm flex items-center justify-center text-copper">
                    <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
                  </div>
                  <span class="text-[11px] font-bold uppercase tracking-wider text-copper bg-warm-white px-2.5 py-1 rounded-full border border-border-warm">
                    ${item.tag}
                  </span>
                </div>

                <h2 class="text-xl sm:text-2xl font-serif font-bold text-ink">${item.title}</h2>
                <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">${item.desc}</p>

                <div class="p-3.5 bg-warm-white rounded-xl border border-border-warm/80 text-xs text-ink">
                  <strong class="text-copper block mb-0.5">How G&amp;N Helps:</strong>
                  <span>${item.solution}</span>
                </div>
              </div>

              <div class="pt-4 border-t border-border-warm/60 flex items-center justify-between">
                <a 
                  href="/get-my-offer" 
                  data-nav="get-my-offer"
                  data-analytics-cta="get-my-offer"
                  data-location="situations_page_card"
                  class="btn-primary py-2.5 px-5 text-xs font-bold"
                >
                  <span>Get My Offer</span>
                  <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
                </a>

                <a href="${item.link}" data-nav="${item.link}" class="text-xs text-warm-gray hover:text-ink underline">
                  Detailed guide
                </a>
              </div>

            </div>
          `).join('')}
        </div>

        <!-- Bottom Consultation Prompt -->
        <div class="bg-ink text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-4">
          <span class="text-xs font-bold uppercase tracking-wider text-soft-copper">Confidential Consultation</span>
          <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white">
            Have a Situation Not Listed Here?
          </h3>
          <p class="text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed">
            Every home and family situation in Kentucky is different. Speak confidentially with our acquisitions team to explore your options without pressure.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
            <a 
              href="/get-my-offer" 
              data-nav="get-my-offer"
              data-analytics-cta="get-my-offer"
              data-location="situations_page_bottom"
              class="btn-copper w-full sm:w-auto px-7 py-3.5 text-sm font-bold"
            >
              <span>Get My Offer</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
            <a 
              href="tel:5024903131" 
              data-location="situations_page_bottom"
              class="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 w-full sm:w-auto px-6 py-3.5 text-sm font-semibold"
            >
              <span class="material-symbols-outlined text-[18px] text-soft-copper">call</span>
              <span>Call (502) 490-3131</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}
