import { renderOfferForm, initOfferForm } from '../components/OfferForm.js';

/**
 * 1. Local SEO Landing: Sell My House Fast Louisville KY
 */
export function renderSellMyHouseLouisville() {
  const neighborhoods = [
    "The Highlands", "Old Louisville", "Germantown", "Clifton / Crescent Hill",
    "St. Matthews", "Jeffersontown", "South End / Iroquois", "West End / Portland",
    "Shively", "Valley Station", "Middletown", "Fern Creek"
  ];

  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        <!-- Header -->
        <div class="text-center mb-10 sm:mb-14">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">Louisville, KY Home Buyers</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2 leading-tight">
            Sell Your House Fast in Louisville, KY
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-2xl mx-auto mt-3 leading-relaxed">
            Looking to sell your Louisville property without agent commissions, open houses, or repair delays? G&amp;N Investment buys homes across Jefferson County directly with private capital.
          </p>
        </div>

        <!-- Two Column Layout: Content + 2-Step Offer Form -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          <div class="lg:col-span-7 flex flex-col gap-6 text-left">
            <div class="clean-card p-6 sm:p-8 flex flex-col gap-4">
              <h2 class="text-2xl font-serif font-bold text-ink">
                A Simpler Way to Sell in Louisville
              </h2>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
                When you list a house on the Louisville MLS, traditional buyers often ask for thousands in inspection repair allowances, home appraisal contingencies, and agent fees totaling 6%. If your schedule or finances demand a simpler, guaranteed approach, selling direct to G&amp;N Investment gives you speed and peace of mind.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div class="flex items-center gap-2 text-xs font-semibold text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>Close in 7–14 Days</span>
                </div>
                <div class="flex items-center gap-2 text-xs font-semibold text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>0% Realtor Commissions</span>
                </div>
                <div class="flex items-center gap-2 text-xs font-semibold text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>Zero Repairs Required</span>
                </div>
                <div class="flex items-center gap-2 text-xs font-semibold text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>Standard Closing Costs Paid</span>
                </div>
              </div>
            </div>

            <!-- Neighborhoods Pill Box -->
            <div class="bg-white rounded-2xl p-6 border border-border-warm shadow-subtle flex flex-col gap-3">
              <h3 class="text-sm font-bold text-ink uppercase tracking-wider text-copper">
                Louisville Neighborhoods We Frequently Buy In
              </h3>
              <p class="text-xs text-warm-gray leading-relaxed">
                We buy residential single-family homes, duplexes, and multi-family units throughout all Louisville zip codes:
              </p>
              <div class="flex flex-wrap gap-2 pt-1">
                ${neighborhoods.map(n => `
                  <span class="text-xs font-medium bg-warm-white text-ink px-3 py-1 rounded-full border border-border-warm">
                    ${n}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right Column: Lead Form -->
          <div class="lg:col-span-5 w-full">
            ${renderOfferForm({ formId: 'seoOfferForm_louisville' })}
          </div>

        </div>

      </div>
    </div>
  `;
}

/**
 * 2. Local SEO Landing: Sell House As-Is Louisville
 */
export function renderSellHouseAsIsLouisville() {
  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        <div class="text-center mb-10 sm:mb-14">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">Zero Fixes Required</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2 leading-tight">
            Sell Your House As-Is in Louisville, KY
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-2xl mx-auto mt-3 leading-relaxed">
            Don't spend thousands fixing up a property just to sell it. We purchase Louisville homes in their exact current condition—no cleaning, no repairs, and no contractor headaches.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          <div class="lg:col-span-7 flex flex-col gap-6 text-left">
            <div class="clean-card p-6 sm:p-8 flex flex-col gap-4">
              <h2 class="text-2xl font-serif font-bold text-ink">
                What We Mean by 100% "As-Is"
              </h2>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Many retail buyers make an offer only to demand costly roof replacements, plumbing repairs, or electrical panel upgrades after a home inspection. At G&amp;N Investment, we evaluate your house knowing it needs work.
              </p>

              <ul class="flex flex-col gap-2.5 text-xs sm:text-sm text-warm-gray pt-2">
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-copper text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Roof &amp; Water Damage:</strong> Old shingle damage, leaks, or stained drywall are completely acceptable.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-copper text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Plumbing &amp; HVAC:</strong> Broken furnaces, leaking pipes, or outdated AC units.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-copper text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Foundation &amp; Basements:</strong> Cracked masonry, damp basements, or historic settling.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-copper text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Unwanted Belongings:</strong> You don't even need to clean out old furniture or trash. Take what you want and leave the rest.</span>
                </li>
              </ul>
            </div>

            <div class="rounded-2xl overflow-hidden border border-border-warm shadow-subtle">
              <img src="/images/as-is-house.jpg" alt="Louisville house bought as-is" class="w-full h-56 sm:h-72 object-cover" />
              <div class="p-4 bg-white text-xs text-warm-gray">
                We handle all renovation responsibilities after closing.
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 w-full">
            ${renderOfferForm({ formId: 'seoOfferForm_asis' })}
          </div>

        </div>

      </div>
    </div>
  `;
}

/**
 * 3. Local SEO Landing: Sell Inherited House Louisville
 */
export function renderSellInheritedHouseLouisville() {
  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        <div class="text-center mb-10 sm:mb-14">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">Probate &amp; Estate Liquidation</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2 leading-tight">
            Sell an Inherited House in Louisville, KY
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-2xl mx-auto mt-3 leading-relaxed">
            Liquidate probate or inherited real estate respectfully, without family disputes, out-of-pocket repairs, or ongoing maintenance costs.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          <div class="lg:col-span-7 flex flex-col gap-6 text-left">
            <div class="clean-card p-6 sm:p-8 flex flex-col gap-4">
              <h2 class="text-2xl font-serif font-bold text-ink">
                Navigating Probate and Inherited Property
              </h2>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Inheriting a family property often comes at an emotional time. When siblings or heirs live out of town, maintaining the yard, paying property taxes, and clearing out decades of personal belongings can quickly become a heavy chore.
              </p>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
                We work directly with estate executors, probate administrators, and local Kentucky closing attorneys to structure a clean, respectful title transfer. You take any family keepsakes you desire, and we purchase the property and handle all remaining items.
              </p>

              <div class="p-4 bg-warm-white rounded-xl border border-border-warm flex flex-col gap-1 text-xs">
                <strong class="text-copper">No Cleanout Required:</strong>
                <span class="text-warm-gray">Keep the sentimental items and leave unwanted furniture, clothing, and household items right where they are.</span>
              </div>
            </div>

            <div class="rounded-2xl overflow-hidden border border-border-warm shadow-subtle">
              <img src="/images/situation-inherited.jpg" alt="Historic Louisville family home" class="w-full h-56 sm:h-72 object-cover" />
            </div>
          </div>

          <div class="lg:col-span-5 w-full">
            ${renderOfferForm({ formId: 'seoOfferForm_inherited' })}
          </div>

        </div>

      </div>
    </div>
  `;
}

/**
 * 4. Local SEO Landing: Sell Rental Property Louisville
 */
export function renderSellRentalPropertyLouisville() {
  return `
    <div class="flex flex-col w-full text-ink py-10 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        <div class="text-center mb-10 sm:mb-14">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">Landlord Solutions</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-2 leading-tight">
            Sell a Rental Property in Louisville, KY
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-2xl mx-auto mt-3 leading-relaxed">
            Tired of tenant disputes, late rent, or deferred maintenance? We buy Louisville rental properties with tenants in place or vacant.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          <div class="lg:col-span-7 flex flex-col gap-6 text-left">
            <div class="clean-card p-6 sm:p-8 flex flex-col gap-4">
              <h2 class="text-2xl font-serif font-bold text-ink">
                Sell Tenant-Occupied Properties with Ease
              </h2>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Selling a rental on the open market is notoriously difficult: tenants often refuse showings, leave the property messy for photos, or withhold rent during listing periods. Traditional retail buyers also refuse to purchase homes with existing tenants.
              </p>
              <p class="text-xs sm:text-sm text-warm-gray leading-relaxed">
                As real estate investors, G&amp;N Investment regularly acquires properties with active leases, non-paying tenants, or expiring agreements. You collect your sale proceeds at closing and pass on all landlord management responsibilities to our team.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold">
                <div class="flex items-center gap-2 text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>Tenants In-Place OK</span>
                </div>
                <div class="flex items-center gap-2 text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>No Evictions Needed</span>
                </div>
                <div class="flex items-center gap-2 text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>Single or Multi-Family</span>
                </div>
                <div class="flex items-center gap-2 text-ink">
                  <span class="material-symbols-outlined text-copper text-[18px]">check_circle</span>
                  <span>Cash Out Your Equity</span>
                </div>
              </div>
            </div>

            <div class="rounded-2xl overflow-hidden border border-border-warm shadow-subtle">
              <img src="/images/situation-rental.jpg" alt="Louisville rental duplex property" class="w-full h-56 sm:h-72 object-cover" />
            </div>
          </div>

          <div class="lg:col-span-5 w-full">
            ${renderOfferForm({ formId: 'seoOfferForm_rental' })}
          </div>

        </div>

      </div>
    </div>
  `;
}
