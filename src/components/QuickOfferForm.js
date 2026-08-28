export function renderQuickOfferForm() {
  return `
    <div class="hero-form-card" id="heroOfferCard">
      <div class="hero-form-header">
        <span class="hero-form-badge">⚡ Instant Property Evaluation</span>
        <h3 class="hero-form-title">Get Your Direct Offer</h3>
        <p class="hero-form-subtitle">Fill out this quick form. No repairs, no fees, no obligations.</p>
      </div>

      <form id="quickOfferForm" novalidate>
        <!-- Name -->
        <div class="form-group">
          <label class="form-label" for="quickName">Full Name <span class="required">*</span></label>
          <input type="text" id="quickName" name="name" class="form-input" placeholder="e.g. John Smith" required />
        </div>

        <!-- Phone & Email in row -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="quickPhone">Phone Number <span class="required">*</span></label>
            <input type="tel" id="quickPhone" name="phone" class="form-input" placeholder="(502) 000-0000" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="quickEmail">Email Address <span class="required">*</span></label>
            <input type="email" id="quickEmail" name="email" class="form-input" placeholder="john@example.com" required />
          </div>
        </div>

        <!-- Property Address -->
        <div class="form-group">
          <label class="form-label" for="quickAddress">Property Address <span class="required">*</span></label>
          <input type="text" id="quickAddress" name="address" class="form-input" placeholder="Street Address, City, KY Zip" required />
        </div>

        <!-- Reason for Selling & Timeframe -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="quickReason">Reason For Selling</label>
            <select id="quickReason" name="reason" class="form-select">
              <option value="Need Repairs">Needs Major Repairs</option>
              <option value="Inherited Property">Inherited Property / Estate</option>
              <option value="Tired Landlord">Tired Landlord / Rental</option>
              <option value="Fast Cash">Want to Sell Quickly</option>
              <option value="Vacant Property">Vacant Property</option>
              <option value="Facing Foreclosure">Pre-Foreclosure / Debt</option>
              <option value="Relocation">Relocating / Downsizing</option>
              <option value="Other">Other / General Sale</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="quickTimeframe">Preferred Closing</label>
            <select id="quickTimeframe" name="timeframe" class="form-select">
              <option value="ASAP (Under 14 Days)">ASAP (Under 14 Days)</option>
              <option value="Within 30 Days" selected>Within 30 Days</option>
              <option value="60+ Days (Flexible)">60+ Days (Flexible)</option>
              <option value="Just Exploring Options">Just Exploring Options</option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary btn-full btn-lg btn-glow" id="quickSubmitBtn">
          <span>REQUEST MY OFFER</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <div class="form-security-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--success);">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>100% Free &amp; Confidential. Zero Commission or Obligation.</span>
        </div>
      </form>
    </div>
  `;
}

export function initQuickOfferForm(onSuccess) {
  const form = document.getElementById('quickOfferForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#quickName').value.trim();
    const phone = form.querySelector('#quickPhone').value.trim();
    const email = form.querySelector('#quickEmail').value.trim();
    const address = form.querySelector('#quickAddress').value.trim();
    const reason = form.querySelector('#quickReason').value;
    const timeframe = form.querySelector('#quickTimeframe').value;

    if (!name || !phone || !email || !address) {
      alert('Please fill out all required fields marked with an asterisk (*).');
      return;
    }

    const leadData = {
      name,
      phone,
      email,
      address,
      reason,
      timeframe,
      submittedAt: new Date().toISOString(),
      source: 'Hero Quick Form'
    };

    // Store in localStorage for persistence
    try {
      const existingLeads = JSON.parse(localStorage.getItem('gn_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('gn_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.warn('Storage error:', err);
    }

    if (onSuccess) {
      onSuccess(leadData);
    }
  });
}
