import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics.js';

/**
 * Renders the 2-step progressive disclosure "Get My Offer" form.
 * Refined with an understated, calm title-review sheet aesthetic.
 * @param {Object} options - Config options (formId, initialAddress)
 */
export function renderOfferForm(options = {}) {
  const formId = options.formId || 'offerCaptureForm';
  const initialAddress = options.initialAddress || '';

  return `
    <div class="w-full bg-white rounded-2xl border border-border-warm double-bezel p-5 sm:p-8 md:p-9 transition-all" id="${formId}_container">
      
      <!-- Progress Bar & Step Indicator (Calm, no gimmicky % before start) -->
      <div class="mb-6 sm:mb-7">
        <div class="flex items-center justify-between text-xs font-semibold text-warm-gray mb-2">
          <span id="${formId}_stepLabel" class="font-bold text-copper uppercase tracking-wider text-[11px]">
            Step 1 of 2 — Property &amp; Contact
          </span>
          <span id="${formId}_stepDetail" class="text-[11px] text-warm-gray font-mono">
            Initial Valuation
          </span>
        </div>
        <div class="w-full h-1.5 bg-warm-white rounded-full overflow-hidden border border-border-warm">
          <div id="${formId}_progressBar" class="h-full bg-copper transition-all duration-300 rounded-full" style="width: 50%;"></div>
        </div>
      </div>

      <form id="${formId}" method="POST" action="#" novalidate class="flex flex-col gap-4">
        
        <!-- ============================================================
             STEP 1: ESSENTIAL CONTACT
             ============================================================ -->
        <div id="${formId}_step1" class="flex flex-col gap-4">
          
          <div class="text-left mb-1">
            <h3 class="text-xl sm:text-2xl font-serif font-bold text-ink">Property Location</h3>
            <p class="text-xs sm:text-sm text-warm-gray mt-0.5">Enter your Kentucky property details to begin your valuation review.</p>
          </div>

          <!-- Property Address (Required) -->
          <div class="flex flex-col text-left">
            <label class="form-label" for="${formId}_address">
              Property Address <span class="required-star">*</span>
            </label>
            <input 
              type="text" 
              id="${formId}_address" 
              name="propertyAddress" 
              class="form-input" 
              placeholder="e.g. 1428 S 28th St, Louisville, KY" 
              value="${initialAddress}"
              required 
              autocomplete="street-address"
            />
            <span class="form-error-msg hidden" id="${formId}_address_error">Please enter the property address.</span>
          </div>

          <!-- Full Name (Required) -->
          <div class="flex flex-col text-left">
            <label class="form-label" for="${formId}_fullName">
              Full Name <span class="required-star">*</span>
            </label>
            <input 
              type="text" 
              id="${formId}_fullName" 
              name="fullName" 
              class="form-input" 
              placeholder="e.g. Sarah Johnson" 
              required 
              autocomplete="name"
            />
            <span class="form-error-msg hidden" id="${formId}_fullName_error">Please enter your full name.</span>
          </div>

          <!-- Phone Number (Required) -->
          <div class="flex flex-col text-left">
            <label class="form-label" for="${formId}_phone">
              Phone Number <span class="required-star">*</span>
            </label>
            <input 
              type="tel" 
              id="${formId}_phone" 
              name="phoneNumber" 
              class="form-input" 
              placeholder="(502) 000-0000" 
              required 
              autocomplete="tel"
            />
            <span class="form-error-msg hidden" id="${formId}_phone_error">Please enter a valid phone number.</span>
          </div>

          <!-- Email Address (Optional) -->
          <div class="flex flex-col text-left">
            <label class="form-label" for="${formId}_email">
              Email Address <span class="text-xs font-normal text-warm-gray">(Optional)</span>
            </label>
            <input 
              type="email" 
              id="${formId}_email" 
              name="emailAddress" 
              class="form-input" 
              placeholder="name@example.com" 
              autocomplete="email"
            />
            <span class="form-error-msg hidden" id="${formId}_email_error">Please enter a valid email address.</span>
          </div>

          <!-- Reassurance note under the first field group -->
          <div class="p-3 bg-warm-white rounded-lg border border-border-warm text-xs text-warm-gray flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px] text-copper shrink-0">lock</span>
            <span>No obligation. We’ll only use your information to discuss your property.</span>
          </div>

          <!-- Continue / Get My Offer Button -->
          <div class="pt-1">
            <button 
              type="button" 
              id="${formId}_btnContinue" 
              class="btn-copper w-full py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-copper"
            >
              <span id="${formId}_btnContinueText">Get My Offer &rarr;</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <!-- ============================================================
             STEP 2: PROPERTY DETAILS
             ============================================================ -->
        <div id="${formId}_step2" class="hidden flex flex-col gap-4">
          
          <div class="flex items-center justify-between text-left mb-1">
            <div>
              <h3 class="text-xl sm:text-2xl font-serif font-bold text-ink">Property Condition &amp; Timeline</h3>
              <p class="text-xs sm:text-sm text-warm-gray mt-0.5">Helps us deliver an accurate, tailored As-Is cash valuation.</p>
            </div>
            <button 
              type="button" 
              id="${formId}_btnBack" 
              class="text-xs font-bold text-warm-gray hover:text-ink underline cursor-pointer shrink-0"
            >
              &larr; Back
            </button>
          </div>

          <!-- Property Type -->
          <div class="flex flex-col text-left">
            <label class="form-label" for="${formId}_propertyType">Property Type</label>
            <div class="relative">
              <select id="${formId}_propertyType" name="propertyType" class="form-select appearance-none pr-10">
                <option value="Single Family Home">Single Family Home</option>
                <option value="Multi-Family / Duplex">Multi-Family / Duplex</option>
                <option value="Townhouse / Condo">Townhouse / Condo</option>
                <option value="Mobile / Manufactured">Mobile / Manufactured</option>
                <option value="Vacant Land / Lot">Vacant Land / Lot</option>
                <option value="Commercial / Other">Commercial / Other</option>
              </select>
              <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none text-[20px]">expand_more</span>
            </div>
          </div>

          <!-- Bedrooms & Bathrooms -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="flex flex-col text-left">
              <label class="form-label" for="${formId}_bedrooms">Bedrooms</label>
              <input type="number" id="${formId}_bedrooms" name="bedrooms" class="form-input" placeholder="e.g. 3" min="0" max="20" />
            </div>

            <div class="flex flex-col text-left">
              <label class="form-label" for="${formId}_bathrooms">Bathrooms</label>
              <input type="number" id="${formId}_bathrooms" name="bathrooms" class="form-input" placeholder="e.g. 2" min="0" max="20" step="0.5" />
            </div>
          </div>

          <!-- Occupancy Status & Condition -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="flex flex-col text-left">
              <label class="form-label" for="${formId}_occupancy">Occupancy Status</label>
              <div class="relative">
                <select id="${formId}_occupancy" name="occupancyStatus" class="form-select appearance-none pr-10">
                  <option value="Owner Occupied">Owner Occupied</option>
                  <option value="Vacant">Vacant</option>
                  <option value="Tenant Occupied">Tenant Occupied</option>
                  <option value="Family Occupied">Family Occupied</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none text-[20px]">expand_more</span>
              </div>
            </div>

            <div class="flex flex-col text-left">
              <label class="form-label" for="${formId}_condition">Property Condition</label>
              <div class="relative">
                <select id="${formId}_condition" name="propertyCondition" class="form-select appearance-none pr-10">
                  <option value="Needs Significant Repairs">Needs Significant Repairs (As-Is)</option>
                  <option value="Cosmetic Updates Needed">Cosmetic Updates Needed</option>
                  <option value="Good Condition">Good / Move-in Ready</option>
                  <option value="Storm / Fire / Water Damage">Storm / Fire / Water Damage</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none text-[20px]">expand_more</span>
              </div>
            </div>
          </div>

          <!-- Desired Timeline -->
          <div class="flex flex-col text-left">
            <label class="form-label" for="${formId}_timeline">Desired Closing Timeline</label>
            <div class="relative">
              <select id="${formId}_timeline" name="desiredTimeline" class="form-select appearance-none pr-10">
                <option value="As soon as possible (7–14 days)">As soon as possible (7–14 days)</option>
                <option value="Within 30 days">Within 30 days</option>
                <option value="Within 60 days">Within 60 days</option>
                <option value="Flexible / Just exploring">Flexible / Just exploring options</option>
              </select>
              <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none text-[20px]">expand_more</span>
            </div>
          </div>

          <!-- Additional Notes -->
          <div class="flex flex-col text-left">
            <label class="form-label" for="${formId}_notes">
              Additional Notes or Circumstances <span class="text-xs font-normal text-warm-gray">(Optional)</span>
            </label>
            <textarea 
              id="${formId}_notes" 
              name="additionalNotes" 
              class="form-textarea h-20 resize-none" 
              placeholder="Tell us about the roof, plumbing, liens, estate status, or your desired closing date..."
            ></textarea>
          </div>

          <!-- Final Submit Button -->
          <div class="pt-2">
            <button 
              type="submit" 
              id="${formId}_btnSubmit" 
              class="btn-copper w-full py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-copper"
            >
              <span id="${formId}_btnSubmitText">Submit Offer Request</span>
              <span class="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>

          <!-- Subtext and Privacy Consent -->
          <div class="flex flex-col gap-1 text-center text-xs text-warm-gray pt-1">
            <p class="font-semibold text-ink">No obligation. Your information is kept private.</p>
            <p class="text-[11px] leading-relaxed text-warm-gray/90">
              By clicking "Get My Offer", you consent to receive a valuation review call or SMS from G&amp;N Investment regarding this property. You may opt out anytime. View our 
              <a href="/privacy" class="text-ink underline hover:text-copper" data-nav="privacy">Privacy Policy</a> and 
              <a href="/terms" class="text-ink underline hover:text-copper" data-nav="terms">Terms</a>.
            </p>
          </div>

        </div>

      </form>
    </div>
  `;
}

/**
 * Initializes validation and submission handlers.
 * Ensures error messages are strictly hidden until field interaction or submit attempt.
 */
export function initOfferForm(formId = 'offerCaptureForm') {
  const form = document.getElementById(formId);
  if (!form) return;

  const step1 = document.getElementById(`${formId}_step1`);
  const step2 = document.getElementById(`${formId}_step2`);
  const progressBar = document.getElementById(`${formId}_progressBar`);
  const stepLabel = document.getElementById(`${formId}_stepLabel`);
  const stepDetail = document.getElementById(`${formId}_stepDetail`);
  const btnContinue = document.getElementById(`${formId}_btnContinue`);
  const btnBack = document.getElementById(`${formId}_btnBack`);
  const btnSubmit = document.getElementById(`${formId}_btnSubmit`);
  const btnSubmitText = document.getElementById(`${formId}_btnSubmitText`);

  const addressInput = document.getElementById(`${formId}_address`);
  const nameInput = document.getElementById(`${formId}_fullName`);
  const phoneInput = document.getElementById(`${formId}_phone`);
  const emailInput = document.getElementById(`${formId}_email`);

  let formStartedTracked = false;

  function markFormStarted() {
    if (!formStartedTracked) {
      formStartedTracked = true;
      trackEvent(ANALYTICS_EVENTS.OFFER_FORM_STARTED, { formId });
    }
  }

  // Clear errors and track start on user input, support Enter key on Step 1
  [addressInput, nameInput, phoneInput, emailInput].forEach((input) => {
    if (input) {
      input.addEventListener('focus', markFormStarted, { once: true });
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errEl = document.getElementById(`${input.id}_error`);
        if (errEl) errEl.classList.add('hidden');
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (btnContinue) btnContinue.click();
        }
      });
    }
  });

  // Step 1 Validation & Advancement
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      let isValid = true;

      const address = addressInput?.value.trim() || '';
      if (!address || address.length < 3) {
        addressInput?.classList.add('error');
        const err = document.getElementById(`${formId}_address_error`);
        if (err) err.classList.remove('hidden');
        isValid = false;
      }

      const fullName = nameInput?.value.trim() || '';
      if (!fullName || fullName.length < 2) {
        nameInput?.classList.add('error');
        const err = document.getElementById(`${formId}_fullName_error`);
        if (err) err.classList.remove('hidden');
        isValid = false;
      }

      const phone = phoneInput?.value.trim() || '';
      const phoneDigits = phone.replace(/\D/g, '');
      if (!phone || phoneDigits.length < 7) {
        phoneInput?.classList.add('error');
        const err = document.getElementById(`${formId}_phone_error`);
        if (err) err.classList.remove('hidden');
        isValid = false;
      }

      const email = emailInput?.value.trim() || '';
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput?.classList.add('error');
        const err = document.getElementById(`${formId}_email_error`);
        if (err) err.classList.remove('hidden');
        isValid = false;
      }

      if (!isValid) return;

      trackEvent(ANALYTICS_EVENTS.OFFER_FORM_STEP_1_COMPLETED, { formId });

      // Advance UI to Step 2
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
      if (progressBar) progressBar.style.width = '100%';
      if (stepLabel) {
        stepLabel.innerText = 'Step 2 of 2 — Property Details';
        stepLabel.classList.remove('text-copper');
        stepLabel.classList.add('text-green-700');
      }
      if (stepDetail) stepDetail.innerText = 'Final Details';

      // Gentle scroll if needed
      const container = document.getElementById(`${formId}_container`);
      if (container) {
        const rect = container.getBoundingClientRect();
        if (rect.top < 70) {
          window.scrollTo({ top: window.pageYOffset + rect.top - 80, behavior: 'smooth' });
        }
      }
    });
  }

  // Step 2 Go Back
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
      if (progressBar) progressBar.style.width = '50%';
      if (stepLabel) {
        stepLabel.innerText = 'Step 1 of 2 — Property & Contact';
        stepLabel.classList.add('text-copper');
        stepLabel.classList.remove('text-green-700');
      }
      if (stepDetail) stepDetail.innerText = 'Initial Valuation';
    });
  }

  // Direct click handler on Submit button to safeguard against event capture issues
  if (btnSubmit) {
    btnSubmit.addEventListener('click', (e) => {
      // If clicked while step 1 is active, advance to step 2 first
      if (step1 && !step1.classList.contains('hidden')) {
        e.preventDefault();
        if (btnContinue) btnContinue.click();
      }
    });
  }

  // Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const address = addressInput?.value.trim() || '';
    const fullName = nameInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';

    // If core fields are missing, return cleanly to step 1
    if (!address || address.length < 3 || !fullName || fullName.length < 2 || !phone || phone.replace(/\D/g, '').length < 7) {
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
      if (btnContinue) btnContinue.click();
      return;
    }

    const propertyType = document.getElementById(`${formId}_propertyType`)?.value || 'Single Family Home';
    const bedrooms = document.getElementById(`${formId}_bedrooms`)?.value || '';
    const bathrooms = document.getElementById(`${formId}_bathrooms`)?.value || '';
    const occupancy = document.getElementById(`${formId}_occupancy`)?.value || 'Owner Occupied';
    const condition = document.getElementById(`${formId}_condition`)?.value || 'Needs Significant Repairs';
    const timeline = document.getElementById(`${formId}_timeline`)?.value || 'As soon as possible (7–14 days)';
    const notes = document.getElementById(`${formId}_notes`)?.value.trim() || '';

    if (btnSubmit) btnSubmit.disabled = true;
    if (btnSubmitText) btnSubmitText.innerText = 'Submitting...';

    const leadRecord = {
      id: 'lead-' + Date.now(),
      address,
      fullName,
      phone,
      email,
      propertyType,
      bedrooms,
      bathrooms,
      occupancy,
      condition,
      timeline,
      notes,
      source: window.location.pathname || '/',
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('gn_leads') || '[]');
      existingLeads.unshift(leadRecord);
      localStorage.setItem('gn_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.warn('LocalStorage save warning:', err);
    }

    trackEvent(ANALYTICS_EVENTS.OFFER_FORM_SUBMITTED, {
      formId,
      propertyType,
      condition,
      timeline
    });

    await new Promise((resolve) => setTimeout(resolve, 400));

    if (btnSubmit) btnSubmit.disabled = false;
    if (btnSubmitText) btnSubmitText.innerText = 'Submit Offer Request';

    const modal = document.getElementById('quickOfferModal');
    if (modal) {
      const ownerTitle = document.getElementById('modalOwnerTitle');
      const addressText = document.getElementById('modalAddressText');
      if (ownerTitle) ownerTitle.innerText = `Thank You, ${fullName}!`;
      if (addressText) addressText.innerText = address;
      modal.classList.add('open');
    }

    form.reset();
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    if (progressBar) progressBar.style.width = '50%';
    if (stepLabel) stepLabel.innerText = 'Step 1 of 2 — Property & Contact';
    if (stepDetail) stepDetail.innerText = 'Initial Valuation';
  });
}
