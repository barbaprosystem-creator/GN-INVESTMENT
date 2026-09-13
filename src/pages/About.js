export function renderAboutPage() {
  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        <!-- Header -->
        <div class="text-center mb-12 sm:mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">About G&amp;N Investment</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2">
            Local Kentucky Real Estate Buyers
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-xl mx-auto mt-3 leading-relaxed">
            Founded with a commitment to providing homeowners with a simpler, honest, and direct way to sell residential property without traditional sales friction.
          </p>
        </div>

        <!-- Full-Width Warm Image of Louisville -->
        <div class="rounded-2xl sm:rounded-3xl overflow-hidden border border-border-warm shadow-card mb-16">
          <img 
            src="/images/about-louisville.jpg" 
            alt="Louisville Kentucky Skyline and Ohio River" 
            class="w-full h-64 sm:h-[400px] object-cover" 
          />
          <div class="p-4 bg-white border-t border-border-warm flex items-center justify-between text-xs text-warm-gray">
            <span class="font-bold text-ink">Proudly Serving the Commonwealth of Kentucky</span>
            <span>Louisville Metro &middot; Jefferson County &middot; Surrounding Communities</span>
          </div>
        </div>

        <!-- Core Philosophy Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div class="flex flex-col gap-4">
            <span class="text-xs font-bold uppercase tracking-wider text-copper">Our Philosophy</span>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-ink leading-tight">
              Real Estate Decisions Should Be Clear and Respectful
            </h2>
            <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
              Traditional real estate transactions have grown increasingly complicated. Between open-house disruptions, inspection repair demands, bank financing delays, and 6% agent commissions, selling a property can quickly feel exhausting.
            </p>
            <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
              G&amp;N Investment operates as a direct investment principal. When you reach out to us, you are speaking directly with the buyer. There are no middlemen, no wholesale assignment games, and no unexpected inspection renegotiations.
            </p>
          </div>

          <!-- Key Principles Card -->
          <div class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border-warm shadow-subtle flex flex-col gap-5">
            <h3 class="text-lg font-serif font-bold text-ink border-b border-border-warm pb-3">
              The G&amp;N Standard
            </h3>

            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-copper text-[22px] shrink-0 mt-0.5">verified</span>
              <div>
                <strong class="text-sm font-bold text-ink block">Direct Buyer</strong>
                <p class="text-xs text-warm-gray leading-relaxed">We purchase properties directly for our long-term portfolio and revitalizations.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-copper text-[22px] shrink-0 mt-0.5">verified</span>
              <div>
                <strong class="text-sm font-bold text-ink block">Independent Title Closings</strong>
                <p class="text-xs text-warm-gray leading-relaxed">Every transaction is finalized through licensed, independent Kentucky title companies to protect your rights.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-copper text-[22px] shrink-0 mt-0.5">verified</span>
              <div>
                <strong class="text-sm font-bold text-ink block">Zero Sales Pressure</strong>
                <p class="text-xs text-warm-gray leading-relaxed">Our valuations are 100% free with no obligation. You decide what timeline and offer makes sense.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Callout Banner -->
        <div class="bg-warm-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-border-warm text-center flex flex-col items-center gap-4">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">Get In Touch</span>
          <h3 class="text-2xl sm:text-3xl font-serif font-bold text-ink">
            Ready for a Straightforward Valuation?
          </h3>
          <p class="text-xs sm:text-sm text-warm-gray max-w-md">
            Tell us about your Kentucky property. We'll provide a fair, honest As-Is offer within 24 hours.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
            <a 
              href="/get-my-offer" 
              data-nav="get-my-offer"
              data-analytics-cta="get-my-offer"
              data-location="about_page_bottom"
              class="btn-primary w-full sm:w-auto px-8 py-3.5"
            >
              <span>Get My Offer</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
            <a 
              href="tel:5024903131" 
              data-location="about_page_bottom"
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
