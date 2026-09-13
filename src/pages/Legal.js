export function renderLegalPage(type = 'privacy') {
  const isPrivacy = type === 'privacy';

  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        
        <!-- Header -->
        <div class="text-center mb-10">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">Legal Information</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2">
            ${isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <p class="text-xs sm:text-sm text-warm-gray mt-2">
            Last Updated: September 2026 &middot; G&amp;N Investment LLC
          </p>
        </div>

        <!-- Content Card -->
        <div class="clean-card p-6 sm:p-10 flex flex-col gap-6 text-sm text-warm-gray leading-relaxed">
          ${isPrivacy ? `
            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">1. Information We Collect</h2>
              <p>
                When you submit a property evaluation inquiry on G&amp;N Investment ("the Website"), we collect details necessary to formulate an accurate purchase valuation. This includes your full name, telephone number, email address, physical property address, occupancy status, and property condition notes.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">2. How We Use Your Information</h2>
              <p>
                We use the submitted information solely to review your real estate, contact you regarding a potential direct purchase offer, and coordinate walkthroughs or escrow title closing procedures. We do not sell, rent, or trade your personal information to third-party telemarketers or marketing aggregators.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">3. Communication &amp; SMS Consent</h2>
              <p>
                By providing your telephone number and clicking "Get My Offer", you authorize G&amp;N Investment to contact you via telephone calls or SMS text messages regarding your property evaluation request. Standard message and data rates may apply. You may opt out of SMS communications at any time by replying STOP to any text message.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">4. Analytics &amp; Cookies</h2>
              <p>
                We collect aggregated, non-personally identifiable behavioral metrics (such as button clicks and form progression) to improve the website experience. We do not send your personal details (names, phone numbers, or addresses) to analytics trackers.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">5. Data Security</h2>
              <p>
                We implement reasonable administrative, technical, and physical safeguards to protect the property and personal details you provide against unauthorized access, loss, or alteration.
              </p>
            </div>
          ` : `
            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">1. Nature of Our Business (Investor Disclosure)</h2>
              <p>
                G&amp;N Investment LLC is a private real estate investment and development company. We purchase residential properties directly for investment, renovation, and portfolio management. We are NOT licensed real estate brokers or agents acting as your fiduciary representative, and we do not represent property owners in an agency capacity.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">2. No-Obligation Valuations</h2>
              <p>
                Any estimated purchase valuation or cash offer presented by G&amp;N Investment is completely voluntary and provided free of charge. Submitting your property information does not obligate you to sell your home or enter into a contract until a formal written Purchase and Sale Agreement is signed by all legal parties.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">3. Title Closings &amp; Kentucky Law</h2>
              <p>
                All real estate purchases executed by G&amp;N Investment comply with Kentucky real estate laws and are finalized through independent, licensed Kentucky title companies or closing attorneys. All deed transfers and escrow disbursements are conducted under standard title insurance practices.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-serif font-bold text-ink mb-2">4. Equal Housing Opportunity</h2>
              <p>
                G&amp;N Investment conducts business in strict accordance with the Federal Fair Housing Act and Kentucky fair housing regulations. We do not discriminate on the basis of race, color, religion, sex, handicap, familial status, or national origin.
              </p>
            </div>
          `}

          <div class="pt-6 border-t border-border-warm flex items-center justify-between">
            <a href="/" data-nav="/" class="text-xs font-bold text-ink hover:text-copper inline-flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Return to Home</span>
            </a>

            <a href="/get-my-offer" data-nav="get-my-offer" class="text-xs font-bold text-copper hover:underline">
              Get My Offer &rarr;
            </a>
          </div>

        </div>

      </div>
    </div>
  `;
}
