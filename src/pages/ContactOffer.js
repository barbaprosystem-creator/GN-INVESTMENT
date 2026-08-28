export function renderContactOfferPage() {
  return `
    <div class="flex flex-col w-full relative min-h-[100dvh] max-w-3xl mx-auto px-4 pb-28 md:pb-16 pt-6 text-[#111315]">
      <!-- Title Header -->
      <div class="pt-4 pb-6 flex flex-col gap-2 text-center reveal">
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ 24-HOUR VALUATION ]</span>
        <h1 class="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111315] font-['Plus_Jakarta_Sans',sans-serif]">
          GET YOUR DIRECT OFFER
        </h1>
        <p class="text-sm sm:text-base text-[#555964] max-w-md mx-auto leading-relaxed">
          Provide your property details and our Louisville acquisitions team will deliver a fair As-Is cash offer within 24 hours.
        </p>
      </div>

      <form id="getOfferForm" class="flex flex-col gap-5" novalidate>
        <!-- Step 1: Property Details -->
        <div class="reveal delay-100 bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-md flex flex-col gap-4">
          <div class="flex items-center gap-2.5 border-b border-black/8 pb-3">
            <span class="material-symbols-outlined text-[#b88a76] text-[22px]">home</span>
            <h2 class="font-bold text-base sm:text-lg text-[#111315] font-['Plus_Jakarta_Sans',sans-serif]">1. Property Information</h2>
          </div>

          <div class="flex flex-col gap-3.5">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerAddress">
                Property Address <span class="text-red-500">*</span>
              </label>
              <input class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#8a8e99]" id="offerAddress" placeholder="Street Address, City, KY Zip" type="text" required />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerPropertyType">
                  Property Type
                </label>
                <div class="relative">
                  <select class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 appearance-none focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all" id="offerPropertyType">
                    <option value="Single Family Home">Single Family Home</option>
                    <option value="Condominium">Condo / Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Multi-Family">Multi-Family / Duplex</option>
                    <option value="Mobile Home">Mobile / Manufactured</option>
                    <option value="Vacant Land">Vacant Land / Lot</option>
                  </select>
                  <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555964] pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerBeds">
                  Bedrooms
                </label>
                <input class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#8a8e99]" id="offerBeds" placeholder="e.g. 3" type="number" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerBaths">
                  Bathrooms
                </label>
                <input class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#8a8e99]" id="offerBaths" placeholder="e.g. 2" type="number" step="0.5" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerOccupancy">
                  Occupancy Status
                </label>
                <div class="relative">
                  <select class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 appearance-none focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all" id="offerOccupancy">
                    <option value="Owner Occupied">Owner Occupied</option>
                    <option value="Vacant">Vacant</option>
                    <option value="Tenant Occupied">Tenant Occupied</option>
                  </select>
                  <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555964] pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerCondition">
                  Property Condition
                </label>
                <div class="relative">
                  <select class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 appearance-none focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all" id="offerCondition">
                    <option value="Needs Major Repairs">Needs Major Repairs / Total Fixer</option>
                    <option value="Fair / Outdated">Fair / Cosmetic Updates Needed</option>
                    <option value="Good / Move-In Ready">Good / Well Maintained</option>
                    <option value="Severe Damage">Severe Fire / Water / Storm Damage</option>
                  </select>
                  <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555964] pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Contact Details -->
        <div class="reveal delay-200 bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-md flex flex-col gap-4">
          <div class="flex items-center gap-2.5 border-b border-black/8 pb-3">
            <span class="material-symbols-outlined text-[#b88a76] text-[22px]">person</span>
            <h2 class="font-bold text-base sm:text-lg text-[#111315] font-['Plus_Jakarta_Sans',sans-serif]">2. Your Contact Information</h2>
          </div>

          <div class="flex flex-col gap-3.5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerFullName">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#8a8e99]" id="offerFullName" placeholder="Your Name" type="text" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerPhone">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <input class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#8a8e99]" id="offerPhone" placeholder="(502) 000-0000" type="tel" required />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerEmail">
                  Email Address
                </label>
                <input class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#8a8e99]" id="offerEmail" placeholder="name@example.com" type="email" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerTimeline">
                  Desired Timeline
                </label>
                <div class="relative">
                  <select class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 appearance-none focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all" id="offerTimeline">
                    <option value="ASAP (7-14 Days)">ASAP (7–14 Days)</option>
                    <option value="30 Days">Within 30 Days</option>
                    <option value="60+ Days">60+ Days / Flexible</option>
                    <option value="Just Exploring">Just Exploring Values</option>
                  </select>
                  <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555964] pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-[#111315] uppercase tracking-wider pl-0.5" for="offerNotes">
                Additional Property Details or Notes
              </label>
              <textarea class="w-full bg-[#f7f6f2] border border-black/10 rounded-xl text-[#111315] text-base py-3 px-3.5 focus:outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#8a8e99] h-24 resize-none" id="offerNotes" placeholder="Tell us anything about the roof, plumbing, liens, or specific timeline goals..."></textarea>
            </div>
          </div>
        </div>

        <button type="submit" class="shimmer-btn bg-[#111315] hover:bg-[#252a35] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full shadow-lg active:scale-[0.97] transition-all flex items-center justify-center gap-2 cursor-pointer mt-1">
          <span>Submit Property for Cash Offer</span>
          <span class="material-symbols-outlined text-[18px]">send</span>
        </button>

        <div class="flex items-center justify-center gap-2 text-xs text-[#555964] text-center">
          <span class="material-symbols-outlined text-[16px] text-green-600">verified_user</span>
          <span>100% Confidential • Zero Realtor Fees • Zero Obligation</span>
        </div>
      </form>
    </div>
  `;
}

export function initFullOfferForm() {
  const form = document.getElementById('getOfferForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.getElementById('offerAddress').value.trim();
    const fullName = document.getElementById('offerFullName').value.trim();
    const phone = document.getElementById('offerPhone').value.trim();

    if (!address || !fullName || !phone) {
      alert('Please fill out the required address, name, and phone fields.');
      return;
    }

    const modal = document.getElementById('quickOfferModal');
    if (modal) {
      document.getElementById('modalOwnerTitle').innerText = `Thank You, ${fullName}!`;
      document.getElementById('modalAddressText').innerText = address;
      modal.classList.add('open');
    }
  });
}
