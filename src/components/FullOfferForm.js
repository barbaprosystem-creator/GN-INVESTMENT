export function renderFullOfferForm() {
  return `
    <div class="offer-page-container" id="fullOfferContainer">
      <!-- Progress Stepper -->
      <div class="steps-progress">
        <div class="steps-bar-line">
          <div class="steps-bar-fill" id="stepProgressFill" style="width: 0%;"></div>
        </div>

        <div class="step-indicator active" id="stepInd1">
          <div class="step-number">1</div>
          <span class="step-label">Owner Info</span>
        </div>

        <div class="step-indicator" id="stepInd2">
          <div class="step-number">2</div>
          <span class="step-label">Property Details</span>
        </div>

        <div class="step-indicator" id="stepInd3">
          <div class="step-number">3</div>
          <span class="step-label">Situation</span>
        </div>
      </div>

      <form id="fullOfferForm" novalidate>
        <!-- ================= STEP 1: OWNER INFO ================= -->
        <div class="step-pane active" id="stepPane1">
          <div style="margin-bottom: 1.75rem;">
            <span class="badge" style="background: var(--copper-100); color: var(--copper-800); font-weight: 700; padding: 0.25rem 0.65rem; border-radius: var(--radius-sm); font-size: 0.75rem;">
              Step 1 of 3
            </span>
            <h3 style="font-size: 1.5rem; margin-top: 0.5rem; color: var(--dark-900);">Who Should We Contact?</h3>
            <p style="color: var(--slate-500); font-size: 0.95rem;">Enter your contact information so our Louisville team can reach out with your confidential evaluation.</p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="fullFirstName">First Name <span class="required">*</span></label>
              <input type="text" id="fullFirstName" name="firstName" class="form-input" placeholder="First Name" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="fullLastName">Last Name <span class="required">*</span></label>
              <input type="text" id="fullLastName" name="lastName" class="form-input" placeholder="Last Name" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="fullPhone">Phone Number <span class="required">*</span></label>
              <input type="tel" id="fullPhone" name="phone" class="form-input" placeholder="(502) 555-0199" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="fullEmail">Email Address <span class="required">*</span></label>
              <input type="email" id="fullEmail" name="email" class="form-input" placeholder="name@email.com" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Preferred Contact Method</label>
            <div class="choice-grid" id="contactMethodGrid">
              <div class="choice-chip active" data-value="Phone Call">📞 Phone Call</div>
              <div class="choice-chip" data-value="Text Message">💬 Text Message</div>
              <div class="choice-chip" data-value="Email">✉️ Email</div>
            </div>
            <input type="hidden" id="fullContactMethod" name="contactMethod" value="Phone Call" />
          </div>

          <div class="form-nav-buttons" style="justify-content: flex-end;">
            <button type="button" class="btn btn-primary btn-lg" id="btnNext1">
              <span>Next: Property Details</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- ================= STEP 2: PROPERTY INFO ================= -->
        <div class="step-pane" id="stepPane2">
          <div style="margin-bottom: 1.75rem;">
            <span class="badge" style="background: var(--copper-100); color: var(--copper-800); font-weight: 700; padding: 0.25rem 0.65rem; border-radius: var(--radius-sm); font-size: 0.75rem;">
              Step 2 of 3
            </span>
            <h3 style="font-size: 1.5rem; margin-top: 0.5rem; color: var(--dark-900);">Tell Us About The Property</h3>
            <p style="color: var(--slate-500); font-size: 0.95rem;">We evaluate properties AS-IS across Kentucky. No preparation is necessary.</p>
          </div>

          <div class="form-group">
            <label class="form-label" for="fullAddress">Property Street Address <span class="required">*</span></label>
            <input type="text" id="fullAddress" name="address" class="form-input" placeholder="e.g. 1244 Eastern Pkwy" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="fullCity">City <span class="required">*</span></label>
              <input type="text" id="fullCity" name="city" class="form-input" value="Louisville" placeholder="Louisville, Shepherdsville, etc." required />
            </div>
            <div class="form-group">
              <label class="form-label" for="fullZip">ZIP Code <span class="required">*</span></label>
              <input type="text" id="fullZip" name="zip" class="form-input" placeholder="40204" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="fullPropertyType">Property Type</label>
              <select id="fullPropertyType" name="propertyType" class="form-select">
                <option value="Single Family Home" selected>Single Family Home</option>
                <option value="Multi-Family / Duplex">Multi-Family / Duplex</option>
                <option value="Townhouse / Condo">Townhouse / Condo</option>
                <option value="Mobile / Manufactured Home">Mobile / Manufactured Home</option>
                <option value="Vacant Land / Lot">Vacant Land / Lot</option>
                <option value="Commercial / Other">Commercial / Other</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="fullOccupancy">Occupancy Status</label>
              <select id="fullOccupancy" name="occupancy" class="form-select">
                <option value="Owner Occupied" selected>Owner Occupied</option>
                <option value="Vacant">Vacant</option>
                <option value="Tenant Occupied">Tenant Occupied</option>
                <option value="Squatter / Family Member">Other / Family Member</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Approximate Property Condition</label>
            <div class="choice-grid" id="conditionGrid">
              <div class="choice-chip" data-value="Great Condition">✨ Move-In Ready</div>
              <div class="choice-chip active" data-value="Needs Minor Updates">🛠️ Needs Minor Work</div>
              <div class="choice-chip" data-value="Needs Major Repairs">🏚️ Needs Major Repairs</div>
              <div class="choice-chip" data-value="Distressed / Damaged">⚠️ Heavy Damage / As-Is</div>
            </div>
            <input type="hidden" id="fullCondition" name="condition" value="Needs Minor Updates" />
          </div>

          <div class="form-nav-buttons">
            <button type="button" class="btn btn-outline" id="btnBack2">
              &larr; Back
            </button>
            <button type="button" class="btn btn-primary btn-lg" id="btnNext2">
              <span>Next: Selling Situation</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- ================= STEP 3: SELLING SITUATION ================= -->
        <div class="step-pane" id="stepPane3">
          <div style="margin-bottom: 1.75rem;">
            <span class="badge" style="background: var(--copper-100); color: var(--copper-800); font-weight: 700; padding: 0.25rem 0.65rem; border-radius: var(--radius-sm); font-size: 0.75rem;">
              Step 3 of 3
            </span>
            <h3 style="font-size: 1.5rem; margin-top: 0.5rem; color: var(--dark-900);">Your Timeline &amp; Goals</h3>
            <p style="color: var(--slate-500); font-size: 0.95rem;">Help us prepare the most accurate and favorable direct cash offer for your situation.</p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="fullReason">Primary Reason for Selling</label>
              <select id="fullReason" name="reason" class="form-select">
                <option value="House Needs Major Repairs" selected>House Needs Major Repairs / Updates</option>
                <option value="Inherited Property / Probate">Inherited Property / Probate Estate</option>
                <option value="Tired of Being a Landlord">Tired of Being a Landlord / Problem Tenants</option>
                <option value="Need to Sell Quickly">Need to Sell Quickly &amp; Avoid Listing Hassle</option>
                <option value="Facing Foreclosure / Behind on Payments">Facing Foreclosure / Financial Relief</option>
                <option value="Relocating / Job Transfer">Relocating / Moving Out of State</option>
                <option value="Divorce / Family Transition">Divorce / Life Transition</option>
                <option value="Downsizing / Retirement">Downsizing / Retirement</option>
                <option value="Fire, Water or Storm Damage">Fire, Water, or Storm Damage</option>
                <option value="Other Circumstance">Other Circumstance</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="fullTimeframe">How Soon Would You Like to Sell?</label>
              <select id="fullTimeframe" name="timeframe" class="form-select">
                <option value="Immediately (Within 7-14 Days)">Immediately (Within 7-14 Days)</option>
                <option value="Within 30 Days" selected>Within 30 Days</option>
                <option value="Within 60-90 Days">Within 60-90 Days</option>
                <option value="Flexible / Just Exploring Options">Flexible / Just Exploring Options</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Does the property require major structural, roof, or plumbing repairs?</label>
            <div class="choice-grid" id="repairNeedGrid">
              <div class="choice-chip active" data-value="Yes, Needs Work">🔨 Yes, Significant Work</div>
              <div class="choice-chip" data-value="Minor Repairs Only">🛠️ Only Minor Cosmetics</div>
              <div class="choice-chip" data-value="No Major Repairs">✅ No Major Repairs</div>
              <div class="choice-chip" data-value="Unsure / As-Is">❓ Unsure (Sell As-Is)</div>
            </div>
            <input type="hidden" id="fullRepairNeed" name="repairNeed" value="Yes, Needs Work" />
          </div>

          <div class="form-group">
            <label class="form-label" for="fullComments">Additional Details or Special Requests (Optional)</label>
            <textarea id="fullComments" name="comments" class="form-textarea" placeholder="Tell us anything else relevant about the property, remaining belongings, mortgage balance, or desired closing date..."></textarea>
          </div>

          <div class="form-nav-buttons">
            <button type="button" class="btn btn-outline" id="btnBack3">
              &larr; Back
            </button>
            <button type="submit" class="btn btn-primary btn-xl btn-glow" id="btnSubmitFull">
              <span>REQUEST MY PROPERTY OFFER</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </form>

      <!-- ================= SUCCESS CONFIRMATION STATE ================= -->
      <div class="success-state-box" id="fullOfferSuccess" style="display: none;">
        <div class="success-icon-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="badge" style="background: var(--success-light); color: var(--success-dark); font-weight: 700; padding: 0.35rem 0.9rem; border-radius: var(--radius-full); font-size: 0.85rem; margin-bottom: 0.75rem; display: inline-block;">
          Offer Request Received!
        </span>
        <h3 id="successOwnerName">Thank You!</h3>
        <p>
          We have received your property details. A member of the G&amp;N Investment team is reviewing your information and will reach out shortly to discuss your direct offer.
        </p>

        <div class="success-summary-card">
          <div style="font-weight: 700; color: var(--slate-900); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
            <span>Submission Reference:</span>
            <span id="successRefCode" style="color: var(--copper-600); font-family: monospace; font-size: 1.05rem;">#GN-7482</span>
          </div>
          <div style="font-size: 0.9rem; color: var(--slate-600); line-height: 1.6;">
            <div><strong>Property:</strong> <span id="successPropertyAddress">123 Main St</span></div>
            <div><strong>Contact:</strong> <span id="successContactInfo">John Smith</span></div>
            <div><strong>Next Step:</strong> 15-minute introductory phone review &amp; scheduling a free visit.</div>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
          <a href="tel:5028007355" class="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Call Us Right Now: (502) 800-SELL
          </a>
          <button type="button" class="btn btn-outline" id="btnResetOfferForm">
            Submit Another Property
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initFullOfferForm() {
  const form = document.getElementById('fullOfferForm');
  const container = document.getElementById('fullOfferContainer');
  if (!form || !container) return;

  let currentStep = 1;
  const totalSteps = 3;

  function updateStepsView() {
    // Hide all step panes
    document.querySelectorAll('.step-pane').forEach((p) => p.classList.remove('active'));
    const activePane = document.getElementById(`stepPane${currentStep}`);
    if (activePane) activePane.classList.add('active');

    // Update indicators
    for (let i = 1; i <= totalSteps; i++) {
      const ind = document.getElementById(`stepInd${i}`);
      if (!ind) continue;
      ind.classList.remove('active', 'completed');
      if (i === currentStep) {
        ind.classList.add('active');
      } else if (i < currentStep) {
        ind.classList.add('completed');
      }
    }

    // Update progress fill bar
    const fill = document.getElementById('stepProgressFill');
    if (fill) {
      const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
      fill.style.width = `${percent}%`;
    }

    // Smooth scroll into container view
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Setup Choice Chips
  function setupChoiceGrid(gridId, hiddenInputId) {
    const grid = document.getElementById(gridId);
    const hidden = document.getElementById(hiddenInputId);
    if (!grid || !hidden) return;

    grid.querySelectorAll('.choice-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        grid.querySelectorAll('.choice-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        hidden.value = chip.getAttribute('data-value') || chip.innerText;
      });
    });
  }

  setupChoiceGrid('contactMethodGrid', 'fullContactMethod');
  setupChoiceGrid('conditionGrid', 'fullCondition');
  setupChoiceGrid('repairNeedGrid', 'fullRepairNeed');

  // Step 1 Validation & Next
  const btnNext1 = document.getElementById('btnNext1');
  if (btnNext1) {
    btnNext1.addEventListener('click', () => {
      const first = document.getElementById('fullFirstName').value.trim();
      const last = document.getElementById('fullLastName').value.trim();
      const phone = document.getElementById('fullPhone').value.trim();
      const email = document.getElementById('fullEmail').value.trim();

      if (!first || !last || !phone || !email) {
        alert('Please complete all required fields in Step 1.');
        return;
      }
      currentStep = 2;
      updateStepsView();
    });
  }

  // Step 2 Validation & Next
  const btnNext2 = document.getElementById('btnNext2');
  if (btnNext2) {
    btnNext2.addEventListener('click', () => {
      const address = document.getElementById('fullAddress').value.trim();
      const city = document.getElementById('fullCity').value.trim();
      const zip = document.getElementById('fullZip').value.trim();

      if (!address || !city || !zip) {
        alert('Please complete all required property fields in Step 2.');
        return;
      }
      currentStep = 3;
      updateStepsView();
    });
  }

  // Back Buttons
  const btnBack2 = document.getElementById('btnBack2');
  if (btnBack2) {
    btnBack2.addEventListener('click', () => {
      currentStep = 1;
      updateStepsView();
    });
  }

  const btnBack3 = document.getElementById('btnBack3');
  if (btnBack3) {
    btnBack3.addEventListener('click', () => {
      currentStep = 2;
      updateStepsView();
    });
  }

  // Final Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const lead = {
      firstName: document.getElementById('fullFirstName').value.trim(),
      lastName: document.getElementById('fullLastName').value.trim(),
      phone: document.getElementById('fullPhone').value.trim(),
      email: document.getElementById('fullEmail').value.trim(),
      contactMethod: document.getElementById('fullContactMethod').value,
      address: document.getElementById('fullAddress').value.trim(),
      city: document.getElementById('fullCity').value.trim(),
      zip: document.getElementById('fullZip').value.trim(),
      propertyType: document.getElementById('fullPropertyType').value,
      occupancy: document.getElementById('fullOccupancy').value,
      condition: document.getElementById('fullCondition').value,
      reason: document.getElementById('fullReason').value,
      timeframe: document.getElementById('fullTimeframe').value,
      repairNeed: document.getElementById('fullRepairNeed').value,
      comments: document.getElementById('fullComments').value.trim(),
      refCode: `GN-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: new Date().toISOString(),
      source: 'Full Multi-Step Form'
    };

    // Save to localStorage
    try {
      const leads = JSON.parse(localStorage.getItem('gn_leads') || '[]');
      leads.push(lead);
      localStorage.setItem('gn_leads', JSON.stringify(leads));
    } catch (err) {
      console.warn(err);
    }

    // Display Success Screen
    form.style.display = 'none';
    const progressEl = container.querySelector('.steps-progress');
    if (progressEl) progressEl.style.display = 'none';

    const successBox = document.getElementById('fullOfferSuccess');
    if (successBox) {
      successBox.style.display = 'block';
      document.getElementById('successOwnerName').innerText = `Thank You, ${lead.firstName}!`;
      document.getElementById('successRefCode').innerText = lead.refCode;
      document.getElementById('successPropertyAddress').innerText = `${lead.address}, ${lead.city}, KY ${lead.zip}`;
      document.getElementById('successContactInfo').innerText = `${lead.phone} | ${lead.email}`;
    }

    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Reset button
  const resetBtn = document.getElementById('btnResetOfferForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      const progressEl = container.querySelector('.steps-progress');
      if (progressEl) progressEl.style.display = 'flex';
      const successBox = document.getElementById('fullOfferSuccess');
      if (successBox) successBox.style.display = 'none';
      currentStep = 1;
      updateStepsView();
    });
  }
}
