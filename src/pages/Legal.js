export function renderLegalPage(type = 'privacy') {
  const isPrivacy = type === 'privacy';

  return `
    <div class="flex flex-col w-full relative z-10 pb-28 md:pb-16 max-w-4xl mx-auto px-4">
      <div class="pt-6 pb-6 text-center reveal">
        <h1 class="font-headline-md text-3xl sm:text-4xl text-on-surface">
          ${isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p class="text-xs sm:text-sm text-on-surface-variant mt-1">
          Last Updated: August 2026 • G&amp;N Investment LLC
        </p>
      </div>

      <div class="reveal bg-[#181c26]/85 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col gap-6 text-sm text-on-surface-variant leading-relaxed">
        ${isPrivacy ? `
          <div>
            <h2 class="font-bold text-lg text-on-surface font-headline-md mb-2">1. Information We Collect</h2>
            <p>
              When you submit a property evaluation request on G&amp;N Investment ("the Website"), we collect personal details including your full name, telephone number, email address, property physical address, reason for selling, and estimated property condition.
            </p>
          </div>

          <div>
            <h2 class="font-bold text-lg text-on-surface font-headline-md mb-2">2. How We Use Your Information</h2>
            <p>
              We use the submitted information solely to evaluate your residential real estate, contact you regarding a potential direct purchase offer, and coordinate property visits or closing procedures. We do not sell, rent, or trade your personal information to third-party telemarketers.
            </p>
          </div>

          <div>
            <h2 class="font-bold text-lg text-on-surface font-headline-md mb-2">3. Communication &amp; SMS Consent</h2>
            <p>
              By providing your telephone number and submitting an inquiry form, you authorize G&amp;N Investment to contact you via telephone call or SMS text message regarding your property offer request. Standard message and data rates may apply. You may opt-out at any time by replying STOP to any text message.
            </p>
          </div>

          <div>
            <h2 class="font-bold text-lg text-on-surface font-headline-md mb-2">4. Data Security</h2>
            <p>
              We maintain industry-standard physical, electronic, and procedural safeguards to protect your personal and property data against unauthorized access, disclosure, or misuse.
            </p>
          </div>
        ` : `
          <div>
            <h2 class="font-bold text-lg text-on-surface font-headline-md mb-2">1. Nature of Our Business</h2>
            <p>
              G&amp;N Investment is a private real estate investment company. We purchase properties directly for investment and renovation purposes. We are NOT licensed real estate agents or brokers representing property sellers in a fiduciary capacity.
            </p>
          </div>

          <div>
            <h2 class="font-bold text-lg text-on-surface font-headline-md mb-2">2. No-Obligation Offers</h2>
            <p>
              Any estimated valuation or purchase offer presented by G&amp;N Investment is completely voluntary and free of charge. Submitting your property information does not obligate you to sell your home or enter into a legally binding contract until a formal Purchase and Sale Agreement is signed by all parties.
            </p>
          </div>

          <div>
            <h2 class="font-bold text-lg text-on-surface font-headline-md mb-2">3. Closings &amp; Title</h2>
            <p>
              All real estate transactions are executed in compliance with Kentucky real estate law and finalized through independent, licensed title companies or closing attorneys.
            </p>
          </div>
        `}

        <div class="pt-6 border-t border-white/10 text-center">
          <a href="#home" data-nav="home" class="text-xs font-bold text-[#efbba5] hover:underline inline-flex items-center gap-1">
            <span>&larr; Return to Home Page</span>
          </a>
        </div>
      </div>
    </div>
  `;
}
