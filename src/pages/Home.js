import { renderPortalHero, initPortalHero } from '../components/PortalHero.js';
import { renderOfferForm, initOfferForm } from '../components/OfferForm.js';
import { renderComparisonTable } from '../components/ComparisonTable.js';
import { renderFaqAccordion, initFaqAccordion } from '../components/FaqAccordion.js';

export function renderHomePage() {
  return `
    <div class="flex flex-col w-full text-ink">
      
      <!-- =========================================================================
           1. HERO SECTION: Pinned 300vh Scroll-Controlled G&N Portal Experience
           ========================================================================= -->
      ${renderPortalHero()}


      <!-- =========================================================================
           2. TRUST STRIP: Quiet Editorial Rule Strip (No chunky badge boxes)
           ========================================================================= -->
      <section class="w-full bg-[#F7F5F1] py-4 sm:py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-ink">
            
            <div class="reveal-text delay-75 trust-item flex items-center gap-2.5 sm:justify-start">
              <span class="beacon-dot"></span>
              <span><strong>Local Kentucky Buyer</strong></span>
            </div>

            <div class="reveal-text delay-150 trust-item flex items-center gap-2.5 sm:justify-center border-l-0 sm:border-l border-border-warm sm:pl-4">
              <span class="beacon-dot"></span>
              <span><strong>Sell In Current Condition</strong></span>
            </div>

            <div class="reveal-text delay-225 trust-item flex items-center gap-2.5 sm:justify-center border-l-0 sm:border-l border-border-warm sm:pl-4">
              <span class="beacon-dot"></span>
              <span><strong>0% Real Estate Commissions</strong></span>
            </div>

            <div class="reveal-text delay-300 trust-item flex items-center gap-2.5 sm:justify-end border-l-0 sm:border-l border-border-warm sm:pl-4">
              <span class="beacon-dot"></span>
              <span><strong>Choose Your Closing Date</strong></span>
            </div>

          </div>
        </div>
      </section>

      <!-- =========================================================================
           3. INLINE 2-STEP "GET MY OFFER" LEAD CAPTURE
           Placed directly after the Trust Strip for immediate valuation access
           ========================================================================= -->
      <section class="py-12 sm:py-16 w-full" id="homeOfferSection">
        <div class="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div class="text-left mb-6 sm:mb-8 max-w-xl">
            <div class="reveal-text badge-copper mb-1">
              <span class="beacon-dot"></span>
              <span>Start Your Valuation</span>
            </div>
            <h2 class="reveal-text delay-75 text-3xl sm:text-4xl font-serif font-bold text-ink">
              Request Your Direct As-Is Offer
            </h2>
            <p class="reveal-text delay-150 text-xs sm:text-sm text-warm-gray mt-1 leading-relaxed">
              Complete the two brief steps below. There are zero fees, zero sales obligation, and your privacy is strictly protected.
            </p>
          </div>

          <div class="reveal-text delay-150">
            ${renderOfferForm({ formId: 'homeOfferForm' })}
          </div>

        </div>
      </section>



      <!-- =========================================================================
           4. COMMON SITUATIONS: 3 Featured Stories + Quiet Editorial Index
           (Replaces repetitive 6-card grid with authentic storytelling)
           ========================================================================= -->
      <section class="py-12 sm:py-20 w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div class="max-w-2xl text-left mb-12 sm:mb-16">
            <div class="reveal-text badge-copper mb-2">
              <span class="beacon-dot"></span>
              <span>Common Situations</span>
            </div>
            <h2 class="reveal-text delay-75 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ink leading-tight">
              Properties We Buy Across Kentucky
            </h2>
            <p class="reveal-text delay-150 text-sm sm:text-base text-warm-gray mt-3 leading-relaxed">
              We focus on situations where listing on the retail market causes unnecessary delay, expense, or anxiety. Here are three of the most frequent circumstances we resolve.
            </p>
          </div>

          <!-- 3 Featured Situations (With Honest Photography & Micro-Motion) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            <!-- Story 1: Repairs Needed -->
            <div class="reveal-text delay-75 group flex flex-col text-left">
              <div class="rounded-xl overflow-hidden border border-border-warm double-bezel-subtle mb-4 card-zoom-wrapper">
                <img 
                  src="/images/as-is-house.jpg" 
                  alt="Property needing updates purchased as-is in Louisville" 
                  class="w-full h-48 sm:h-56 object-cover" 
                />
              </div>
              <span class="text-[11px] font-bold text-copper uppercase tracking-wider mb-1">01 &middot; Structural &amp; Cosmetic</span>
              <h3 class="text-xl font-serif font-bold text-ink mb-2">Homes Needing Significant Repairs</h3>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed mb-3">
                Roofs, old plumbing, outdated electrical panels, or wet basements. Traditional buyers request inspection concessions; we buy in present condition and take on all renovation work.
              </p>
              <a href="/sell-house-as-is-louisville" data-nav="sell-house-as-is-louisville" class="hover-arrow text-xs font-bold text-ink hover:text-copper underline mt-auto">
                <span>Learn about selling As-Is</span>
                <span class="arrow-icon">&rarr;</span>
              </a>
            </div>

            <!-- Story 2: Inherited Property -->
            <div class="reveal-text delay-150 group flex flex-col text-left">
              <div class="rounded-xl overflow-hidden border border-border-warm double-bezel-subtle mb-4 card-zoom-wrapper">
                <img 
                  src="/images/situation-inherited.jpg" 
                  alt="Inherited residential estate home in Old Louisville" 
                  class="w-full h-48 sm:h-56 object-cover" 
                />
              </div>
              <span class="text-[11px] font-bold text-copper uppercase tracking-wider mb-1">02 &middot; Probate &amp; Estates</span>
              <h3 class="text-xl font-serif font-bold text-ink mb-2">Inherited Property in Louisville</h3>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed mb-3">
                Handling a probate or family property from out-of-town or across heirs. We coordinate with estate attorneys, require zero cleanout, and ensure a dignified, clean title transfer.
              </p>
              <a href="/sell-inherited-house-louisville" data-nav="sell-inherited-house-louisville" class="hover-arrow text-xs font-bold text-ink hover:text-copper underline mt-auto">
                <span>Learn about estate sales</span>
                <span class="arrow-icon">&rarr;</span>
              </a>
            </div>

            <!-- Story 3: Rental Properties -->
            <div class="reveal-text delay-225 group flex flex-col text-left">
              <div class="rounded-xl overflow-hidden border border-border-warm double-bezel-subtle mb-4 card-zoom-wrapper">
                <img 
                  src="/images/situation-rental.jpg" 
                  alt="Rental property duplex in Jefferson County" 
                  class="w-full h-48 sm:h-56 object-cover" 
                />
              </div>
              <span class="text-[11px] font-bold text-copper uppercase tracking-wider mb-1">03 &middot; Landlord Fatigue</span>
              <h3 class="text-xl font-serif font-bold text-ink mb-2">Rental Property in Jefferson County</h3>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed mb-3">
                Tenants behind on rent, expiring leases, or tired of maintenance calls. We buy occupied or vacant multi-unit and single-family rentals without requiring evictions before closing.
              </p>
              <a href="/sell-rental-property-louisville" data-nav="sell-rental-property-louisville" class="hover-arrow text-xs font-bold text-ink hover:text-copper underline mt-auto">
                <span>Learn about rental buyouts</span>
                <span class="arrow-icon">&rarr;</span>
              </a>
            </div>

          </div>

          <!-- Secondary Editorial Index: Quieter 3-Column List for Remaining Situations -->
          <div class="reveal-text delay-150 bg-white rounded-2xl p-6 sm:p-8 border border-border-warm double-bezel-subtle">
            <div class="text-xs font-bold text-ink uppercase tracking-wider mb-4 border-b border-border-warm pb-2">
              Additional Circumstances We Support
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <h4 class="font-serif font-bold text-base text-ink mb-1">Vacant &amp; Unoccupied Homes</h4>
                <p class="text-xs text-warm-gray leading-relaxed">
                  Stop ongoing insurance, property tax, and utility drain on an unused Kentucky property.
                </p>
              </div>

              <div>
                <h4 class="font-serif font-bold text-base text-ink mb-1">Expedited Relocation Closings</h4>
                <p class="text-xs text-warm-gray leading-relaxed">
                  Job moves or sudden deadlines where waiting for 60-day mortgage underwriting is impractical.
                </p>
              </div>

              <div>
                <h4 class="font-serif font-bold text-base text-ink mb-1">Downsizing &amp; Life Transitions</h4>
                <p class="text-xs text-warm-gray leading-relaxed">
                  Discreet, respectful sales without dozens of strangers walking through your home during open houses.
                </p>
              </div>
            </div>
          </div>

          <!-- Single, Authoritative CTA After the Group (No repeated CTAs per tile) -->
          <div class="reveal-text delay-150 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border-warm">
            <div class="text-xs sm:text-sm text-warm-gray text-left">
              Have questions about your specific property or circumstance?
            </div>
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <a 
                href="/get-my-offer" 
                data-nav="/get-my-offer"
                data-analytics-cta="get-my-offer"
                data-location="situations_section"
                class="btn-primary w-full sm:w-auto px-7 py-3 text-xs sm:text-sm"
              >
                <span>Get My Offer</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
              <a 
                href="tel:5024903131" 
                data-location="situations_section"
                class="btn-secondary w-full sm:w-auto px-5 py-3 text-xs sm:text-sm"
              >
                <span class="material-symbols-outlined text-[17px] text-copper">call</span>
                <span>(502) 490-3131</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- =========================================================================
           5. LOCAL PROOF & INTEGRITY BLOCK (High-Trust Editorial Statement)
           ========================================================================= -->
      <section class="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          <div class="reveal-text lg:col-span-5 relative">
            <div class="rounded-2xl overflow-hidden border border-border-warm double-bezel card-zoom-wrapper">
              <img 
                src="/images/closing-table.jpg" 
                alt="Kentucky real estate deed and closing documents at title company" 
                class="w-full h-72 sm:h-96 object-cover" 
              />
              <div class="p-4 bg-white border-t border-border-warm flex items-center justify-between text-xs text-warm-gray">
                <span class="font-bold text-ink">Independent Title Escrow</span>
                <span>Jefferson Co. &middot; Certified Closings</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 flex flex-col items-start text-left">
            <div class="reveal-text badge-copper mb-2">
              <span class="beacon-dot"></span>
              <span>Our Commitment</span>
            </div>
            <h2 class="reveal-text delay-75 text-3xl sm:text-4xl font-serif font-bold text-ink leading-tight mb-4">
              A Local Team. A Clear Process.
            </h2>
            
            <p class="reveal-text delay-150 text-xs sm:text-sm text-warm-gray leading-relaxed mb-4">
              We believe selling a home should never involve misleading numbers, pressure tactics, or wholesale games. G&amp;N Investment operates as a direct private investment principal based in Kentucky.
            </p>

            <!-- Ruled Editorial Statement Box -->
            <div class="reveal-text delay-225 p-5 sm:p-6 bg-white rounded-xl border border-border-warm double-bezel-subtle text-xs text-ink leading-relaxed flex flex-col gap-3 my-2 w-full">
              <p class="italic text-ink/90 font-serif text-sm">
                &ldquo;When you speak with G&amp;N Investment, you are speaking directly with the buyers who will fund the transaction and sign the deed. We review property values fairly, outline every dollar openly, and close through licensed Kentucky title companies where your funds are guaranteed.&rdquo;
              </p>
              <div class="pt-2 border-t border-border-warm flex items-center justify-between text-[11px] text-warm-gray font-mono">
                <span>G&amp;N Investment Acquisitions Team</span>
                <span>Louisville, KY</span>
              </div>
            </div>

            <!-- Key Verifiable Facts -->
            <div class="reveal-text delay-300 grid grid-cols-2 gap-4 w-full pt-4 text-xs">
              <div class="flex flex-col gap-0.5">
                <strong class="text-ink font-bold">Direct Principal Buyer</strong>
                <span class="text-warm-gray">We buy for our own portfolio; we do not assign contracts.</span>
              </div>
              <div class="flex flex-col gap-0.5">
                <strong class="text-ink font-bold">Licensed Title Partners</strong>
                <span class="text-warm-gray">All closings executed with independent Kentucky title attorneys.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           6. COMPARISON MATRIX (Direct Buyer vs MLS Brokerage)
           ========================================================================= -->
      <section class="py-16 sm:py-24 w-full">
        <div class="max-w-6xl mx-auto px-4 sm:px-8">
          
          <div class="max-w-2xl text-left mb-10">
            <div class="reveal-text badge-copper mb-2">
              <span class="beacon-dot"></span>
              <span>Comparison</span>
            </div>
            <h2 class="reveal-text delay-75 text-3xl sm:text-4xl font-serif font-bold text-ink">
              Direct Sale vs. Traditional MLS Listing
            </h2>
            <p class="reveal-text delay-150 text-xs sm:text-sm text-warm-gray mt-2">
              An objective evaluation of costs, repair responsibilities, and timelines.
            </p>
          </div>

          <div class="reveal-text delay-150">
            ${renderComparisonTable()}
          </div>

        </div>
      </section>

      <!-- =========================================================================
           7. FREQUENTLY ASKED QUESTIONS
           ========================================================================= -->
      <section class="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-8 w-full" id="faq">
        
        <div class="max-w-2xl text-left mb-10">
          <div class="reveal-text badge-copper mb-2">
            <span class="beacon-dot"></span>
            <span>Common Questions</span>
          </div>
          <h2 class="reveal-text delay-75 text-3xl sm:text-4xl font-serif font-bold text-ink">
            Frequently Asked Questions
          </h2>
          <p class="reveal-text delay-150 text-xs sm:text-sm text-warm-gray mt-2">
            Clear, honest answers to the practical questions property owners ask us most.
          </p>
        </div>

        <div class="reveal-text delay-150">
          ${renderFaqAccordion()}
        </div>

      </section>



      <!-- =========================================================================
           9. FINAL CALL TO ACTION BANNER (Understated Confidence)
           ========================================================================= -->
      <section class="px-4 sm:px-8 max-w-6xl mx-auto w-full my-8">
        <div class="reveal-text delay-75 bg-ink text-white rounded-2xl p-8 sm:p-12 double-bezel-dark flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div class="flex flex-col gap-2 max-w-xl">
            <span class="text-xs font-bold uppercase tracking-wider text-soft-copper">LOUISVILLE &amp; KENTUCKY</span>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready to Talk About Your Property?
            </h3>
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Tell us a little about the home and we will help you understand your options. There is never any obligation to accept an offer.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a 
              href="/get-my-offer" 
              data-nav="/get-my-offer"
              data-analytics-cta="get-my-offer"
              data-location="final_cta_banner"
              class="btn-copper w-full sm:w-auto px-7 py-3.5 text-sm font-bold whitespace-nowrap"
            >
              <span>Get My Offer</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>

            <a 
              href="tel:5024903131" 
              data-location="final_cta_banner"
              class="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 w-full sm:w-auto px-6 py-3.5 text-sm font-semibold"
            >
              <span class="material-symbols-outlined text-[18px] text-soft-copper">call</span>
              <span>Call (502) 490-3131</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  `;
}
