export function renderFooter() {
  return `
    <footer class="w-full bg-ink text-white/90 pt-16 pb-28 md:pb-16 border-t border-white/10 mt-16 sm:mt-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-8">
        
        <!-- Top Row: Brand Summary + Main Call to Action -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          <div class="flex flex-col gap-3 max-w-xl">
            <div class="flex items-center gap-3">
              <img 
                src="/images/gn-logo-transparent.png" 
                alt="G&N Investment Emblem" 
                class="h-10 sm:h-12 w-auto object-contain brightness-110" 
              />
              <span class="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
                G&amp;N Investment
              </span>
            </div>
            <p class="text-sm text-gray-300 leading-relaxed">
              We are a local real estate investment company buying residential houses directly in Louisville, Jefferson County, and throughout Kentucky. Sell as-is with zero agent commissions, no repairs, and a closing timeline tailored to your needs.
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap items-center gap-3">
            <a 
              href="tel:5024903131" 
              data-location="footer"
              class="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 px-5 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px] text-soft-copper">call</span>
              <span>Call (502) 490-3131</span>
            </a>

            <a 
              href="/get-my-offer" 
              data-nav="/get-my-offer"
              data-analytics-cta="get-my-offer"
              data-location="footer"
              class="btn-copper px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <span>Get My Offer</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

        </div>

        <!-- Middle Columns: Navigation & Local Services -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 text-sm border-b border-white/10">
          
          <!-- Column 1: Navigation -->
          <div class="flex flex-col gap-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-soft-copper font-sans">Explore</span>
            <a href="/" data-nav="/" class="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="/how-it-works" data-nav="how-it-works" class="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="/situations" data-nav="situations" class="text-gray-300 hover:text-white transition-colors">Common Situations</a>
            <a href="/about" data-nav="about" class="text-gray-300 hover:text-white transition-colors">About G&amp;N Investment</a>
            <a href="/get-my-offer" data-nav="/get-my-offer" class="text-gray-300 hover:text-white transition-colors font-bold text-soft-copper">Get My Offer</a>
          </div>

          <!-- Column 2: Local Kentucky Areas -->
          <div class="flex flex-col gap-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-soft-copper font-sans">Kentucky Focus</span>
            <a href="/sell-my-house-louisville-ky" data-nav="sell-my-house-louisville-ky" class="text-gray-300 hover:text-white transition-colors">Louisville Metro</a>
            <a href="/sell-house-as-is-louisville" data-nav="sell-house-as-is-louisville" class="text-gray-300 hover:text-white transition-colors">Sell As-Is Louisville</a>
            <span class="text-gray-400">Jefferson County</span>
            <span class="text-gray-400">Oldham &amp; Bullitt Counties</span>
            <span class="text-gray-400">Lexington &amp; Central KY</span>
          </div>

          <!-- Column 3: Property Scenarios -->
          <div class="flex flex-col gap-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-soft-copper font-sans">Selling Situations</span>
            <a href="/sell-house-as-is-louisville" data-nav="sell-house-as-is-louisville" class="text-gray-300 hover:text-white transition-colors">Homes Needing Repairs</a>
            <a href="/sell-inherited-house-louisville" data-nav="sell-inherited-house-louisville" class="text-gray-300 hover:text-white transition-colors">Inherited &amp; Estate Homes</a>
            <a href="/sell-rental-property-louisville" data-nav="sell-rental-property-louisville" class="text-gray-300 hover:text-white transition-colors">Rental &amp; Tenant Properties</a>
            <a href="/situations" data-nav="situations" class="text-gray-300 hover:text-white transition-colors">Urgent Timeline Closings</a>
          </div>

          <!-- Column 4: Contact & Portal -->
          <div class="flex flex-col gap-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-soft-copper font-sans">Contact &amp; Hours</span>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="material-symbols-outlined text-[18px] text-soft-copper">phone</span>
              <a href="tel:5024903131" class="hover:text-white">(502) 490-3131</a>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="material-symbols-outlined text-[18px] text-soft-copper">location_on</span>
              <span>Louisville, KY</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="material-symbols-outlined text-[18px] text-soft-copper">schedule</span>
              <span>Mon – Sat: 8:00 AM – 7:00 PM</span>
            </div>
            <div class="pt-2">
              <a href="/login" data-nav="login" class="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-soft-copper transition-colors">
                <span class="material-symbols-outlined text-[15px]">lock</span>
                <span>Employee Portal / CRM</span>
              </a>
            </div>
          </div>

        </div>

        <!-- Bottom Row: Real Estate Legal Disclaimer & Copyright -->
        <div class="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-gray-400">
          
          <div class="max-w-3xl leading-relaxed">
            <p>
              <strong>Disclaimer:</strong> G&amp;N Investment LLC is a private real estate investment company. We purchase properties directly for investment, renovation, and long-term portfolio purposes. We are not licensed real estate brokers or agents acting as your representative, and we do not charge real estate commissions. All purchases are formalized with written agreements and executed through independent, licensed Kentucky title companies.
            </p>
          </div>

          <div class="flex items-center gap-4 shrink-0">
            <a href="/privacy" data-nav="privacy" class="hover:text-white underline">Privacy Policy</a>
            <a href="/terms" data-nav="terms" class="hover:text-white underline">Terms of Service</a>
          </div>

        </div>

        <div class="mt-6 pt-4 border-t border-white/5 text-center text-[11px] text-gray-500">
          &copy; ${new Date().getFullYear()} G&amp;N Investment LLC. All rights reserved. Equal Housing Opportunity.
        </div>

      </div>
    </footer>
  `;
}

export function initFooter() {
  // Clean initialization if needed for back-to-top or event tracking
}
