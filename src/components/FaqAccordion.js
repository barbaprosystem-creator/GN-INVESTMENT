export function renderFaqAccordion() {
  const faqs = [
    {
      q: "What does selling 'As-Is' actually mean? Do I need to clean or fix anything?",
      a: "Selling 'As-Is' means you do not have to spend a single dollar or minute on repairs, painting, roof fixes, cleaning, or yard maintenance. You don't even have to remove old furniture, appliances, or unwanted items. Take what you want to keep and leave the rest behind."
    },
    {
      q: "Are there any commissions, appraisal fees, or hidden closing costs?",
      a: "No. We are direct property buyers, not agents representing you for a commission. There are 0% agent fees, zero appraisal demands, and G&N Investment covers standard title and escrow closing fees."
    },
    {
      q: "Am I obligated to accept your offer after submitting my property details?",
      a: "There is never any obligation. Our property reviews and written offers are 100% free. You can review our offer, consult your family, compare your options, and decide what is best for you."
    },
    {
      q: "How fast can we close? Can I choose my own date if I need more time?",
      a: "Yes. Because we do not rely on traditional bank mortgage underwriting, we can close in as few as 7 to 14 days once clear title is verified. If you need 30, 60, or 90 days to arrange your next move, you set the closing date."
    },
    {
      q: "What if there are tenants living in the home or problem leases?",
      a: "We frequently purchase properties with active tenants, lease violations, or behind-on-rent situations. We handle tenant transitions respectfully and professionally after closing so you do not have to navigate evictions or disputes."
    },
    {
      q: "How do you determine the offer price for my property?",
      a: "We look at recent sales of comparable properties in your immediate Louisville or Kentucky neighborhood, factor in the cost of needed repairs, and present a fair, transparent number that makes sense for both sides."
    }
  ];

  return `
    <div class="w-full flex flex-col gap-8">
      
      <!-- Accordion List -->
      <div class="faq-list rounded-2xl bg-white border border-border-warm shadow-subtle p-2 sm:p-4" id="faqAccordion">
        ${faqs.map((item, index) => `
          <div class="faq-item ${index === 0 ? 'open' : ''}" data-faq-index="${index}">
            <button 
              class="faq-question" 
              type="button" 
              aria-expanded="${index === 0 ? 'true' : 'false'}"
            >
              <span class="text-left font-bold text-ink text-sm sm:text-base">${item.q}</span>
              <div class="faq-toggle-icon">
                <span class="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </button>
            <div class="faq-answer">
              <p class="text-xs sm:text-sm leading-relaxed">${item.a}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Unified Action Prompt after FAQ -->
      <div class="bg-warm-white rounded-2xl p-6 sm:p-8 border border-border-warm text-center flex flex-col items-center gap-3">
        <h3 class="text-lg sm:text-xl font-serif font-bold text-ink">
          Have a specific question about your property?
        </h3>
        <p class="text-xs sm:text-sm text-warm-gray max-w-md">
          Our local Louisville team is here to answer your questions with zero sales pressure.
        </p>
        <div class="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
          <a 
            href="/get-my-offer" 
            data-nav="get-my-offer"
            data-analytics-cta="get-my-offer"
            data-location="faq_accordion"
            class="btn-primary w-full sm:w-auto px-7 py-3"
          >
            <span>Get My Offer</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
          <a 
            href="tel:5023843357" 
            data-location="faq_accordion"
            class="btn-secondary w-full sm:w-auto px-6 py-3"
          >
            <span class="material-symbols-outlined text-[18px] text-copper">call</span>
            <span>Call (502) 384-3357</span>
          </a>
        </div>
      </div>

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
