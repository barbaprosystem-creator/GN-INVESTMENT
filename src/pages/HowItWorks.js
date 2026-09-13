export function renderHowItWorksPage() {
  const detailedSteps = [
    {
      num: "01",
      title: "Tell Us About the Property",
      summary: "Start with an online inquiry or a quick phone conversation.",
      detail: "Share your address, general property condition, and your ideal timeline. Whether your home is in pristine shape or needs significant structural, plumbing, or roof work, we evaluate it as-is. There is no fee, no obligation, and no high-pressure sales pitch.",
      icon: "edit_note"
    },
    {
      num: "02",
      title: "We Review Your Situation",
      summary: "Neighborhood market assessment and a friendly 15-minute visit.",
      detail: "We analyze recent neighborhood comps across Louisville or your Kentucky county. Next, we schedule a single, convenient 15-minute walkthrough. You do not need to clean, stage, or repair anything before we arrive.",
      icon: "search"
    },
    {
      num: "03",
      title: "Receive a Direct Offer",
      summary: "A transparent, written As-Is cash offer with 0% commissions.",
      detail: "Within 24 hours of reviewing the property, we present a straightforward offer. What we offer is what you receive at closing: zero Realtor commissions, zero surprise fees, and we cover standard title closing costs.",
      icon: "request_quote"
    },
    {
      num: "04",
      title: "Choose Your Closing Date",
      summary: "Close in as few as 7–14 days, or on whatever date fits your schedule.",
      detail: "You stay in total control. Need to close fast to relocate or resolve a financial deadline? We can close in 7 to 14 days once clear title is confirmed. Need 60 or 90 days to arrange your next home? We schedule closing when you are ready.",
      icon: "event_available"
    }
  ];

  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        
        <!-- Header -->
        <div class="text-center mb-12 sm:mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">How It Works</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2">
            The Simple Way to Sell Your Kentucky Home
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-xl mx-auto mt-3 leading-relaxed">
            Selling a property directly eliminates the stress of open houses, bank financing contingencies, and costly repair lists. Here is exactly how our process works from start to finish.
          </p>
        </div>

        <!-- 4 Detailed Steps Timeline -->
        <div class="flex flex-col gap-6 sm:gap-8 mb-16">
          ${detailedSteps.map((step) => `
            <div class="clean-card p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
              
              <div class="w-12 h-12 rounded-2xl bg-warm-white border border-border-warm flex items-center justify-center text-copper font-mono font-bold text-lg shrink-0">
                ${step.num}
              </div>

              <div class="flex flex-col gap-2 flex-1">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl sm:text-2xl font-serif font-bold text-ink">${step.title}</h2>
                  <span class="material-symbols-outlined text-copper text-[22px] hidden sm:block">${step.icon}</span>
                </div>
                <p class="text-xs sm:text-sm font-semibold text-copper">${step.summary}</p>
                <p class="text-xs sm:text-sm text-warm-gray leading-relaxed mt-1">${step.detail}</p>
              </div>

            </div>
          `).join('')}
        </div>

        <!-- Closing Process Details Card -->
        <div class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-border-warm shadow-subtle mb-12">
          <div class="flex flex-col gap-3">
            <span class="text-xs font-bold uppercase tracking-wider text-copper">Certified Closing</span>
            <h3 class="text-2xl font-serif font-bold text-ink">How Closing Day Works in Kentucky</h3>
            <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
              Every transaction with G&amp;N Investment is executed legally and transparently through an independent, licensed Kentucky title company or closing attorney. They verify clear title, prepare the deed, and ensure funds are wired directly into your bank account or issued via certified cashier's check on the day of closing.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-warm text-xs">
              <div class="flex items-center gap-2 text-ink font-semibold">
                <span class="material-symbols-outlined text-copper text-[18px]">verified</span>
                <span>Licensed Title Escrow</span>
              </div>
              <div class="flex items-center gap-2 text-ink font-semibold">
                <span class="material-symbols-outlined text-copper text-[18px]">verified</span>
                <span>Direct Bank Wire Funds</span>
              </div>
              <div class="flex items-center gap-2 text-ink font-semibold">
                <span class="material-symbols-outlined text-copper text-[18px]">verified</span>
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Callout -->
        <div class="text-center flex flex-col items-center gap-4">
          <h3 class="text-2xl font-serif font-bold text-ink">Ready to begin Step 1?</h3>
          <p class="text-xs sm:text-sm text-warm-gray max-w-md">
            Request your free property evaluation with zero obligation.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2">
            <a 
              href="/get-my-offer" 
              data-nav="/get-my-offer"
              data-analytics-cta="get-my-offer"
              data-location="how_it_works_page"
              class="btn-primary w-full sm:w-auto px-8 py-3.5"
            >
              <span>Get My Offer</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
            <a 
              href="tel:5024903131" 
              data-location="how_it_works_page"
              class="btn-secondary w-full sm:w-auto px-6 py-3.5"
            >
              <span class="material-symbols-outlined text-[18px] text-copper">call</span>
              <span>Call (502) 490-3131</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}
