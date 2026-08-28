export function renderFaqAccordion() {
  const faqs = [
    {
      q: "What does selling 'AS-IS' mean with G&N Investment?",
      a: "Selling 'AS-IS' means you do not have to spend a single dollar on repairs, painting, roof replacements, plumbing, deep cleaning, or yard maintenance. You don't even have to clean out old furniture or unwanted belongings. We evaluate and purchase the property in its exact current condition."
    },
    {
      q: "Are there any fees, commissions, or hidden costs when working with you?",
      a: "No. Unlike traditional real estate agents who charge 5% to 6% in commissions plus seller closing costs, G&N Investment is a direct buyer. We do not charge fees, there are zero commissions, and we cover all standard closing costs handled by the title company."
    },
    {
      q: "How are you different from a licensed real estate agent?",
      a: "A real estate agent lists your house on the MLS, conducts open houses, and looks for a third-party retail buyer (taking a 6% commission in the process). G&N Investment is the actual buyer. We purchase your property directly for investment purposes with our own capital, eliminating middlemen, loan approvals, and long wait times."
    },
    {
      q: "Am I obligated to accept your offer once you evaluate my property?",
      a: "Absolutely not. Our property evaluations and direct offers are 100% free and come with zero obligation. You are in complete control to decide whether the offer works for your timeline and personal goals."
    },
    {
      q: "How fast can G&N Investment close on my house?",
      a: "Because we purchase directly without relying on traditional mortgage underwriting or bank appraisals, we can close in as little as 7 to 14 days once clear title is confirmed. If you need more time to pack or find your next home, we can schedule the closing date whenever you are ready."
    },
    {
      q: "What if the house has severe damage (fire, water, mold, foundation)?",
      a: "We regularly purchase homes that have suffered roof leaks, burst pipes, fire or smoke damage, foundation issues, or deferred maintenance. You do not need to fix anything before contacting us."
    },
    {
      q: "What if there are tenants living in the home or unwanted items left inside?",
      a: "That is completely fine! We purchase occupied rentals with active leases, problem tenants, or vacant properties. You take what you want and leave behind any trash, old furniture, or items you don't wish to move."
    },
    {
      q: "How do you calculate your direct offer price?",
      a: "Our evaluation is based on the location of your property, current market values of renovated comparable homes in your Louisville/Kentucky neighborhood, and the estimated cost of repairs needed. We aim to present a fair, transparent offer that provides a smooth and hassle-free solution."
    }
  ];

  return `
    <div class="faq-list" id="faqAccordion">
      ${faqs.map((item, index) => `
        <div class="faq-item ${index === 0 ? 'open' : ''}" data-faq-index="${index}">
          <button class="faq-question" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
            <span>${item.q}</span>
            <div class="faq-toggle-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </button>
          <div class="faq-answer">
            <p>${item.a}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function initFaqAccordion() {
  const container = document.getElementById('faqAccordion');
  if (!container) return;

  const items = container.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      items.forEach((other) => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
