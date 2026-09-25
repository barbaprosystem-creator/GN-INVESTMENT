import { renderOfferForm, initOfferForm } from '../components/OfferForm.js';

export function renderContactOfferPage() {
  return `
    <div class="flex flex-col w-full text-ink py-8 sm:py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        
        <!-- Header -->
        <div class="text-center mb-8 sm:mb-10">
          <span class="text-xs font-bold uppercase tracking-wider text-copper">24-Hour Valuation</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-ink mt-1.5">
            Get My Offer
          </h1>
          <p class="text-sm sm:text-base text-warm-gray max-w-lg mx-auto mt-2 leading-relaxed">
            Provide a few details about your property. Our Louisville acquisitions team will review the details and present a fair, no-obligation As-Is cash offer.
          </p>
        </div>

        <!-- Trust Badges Strip -->
        <div class="grid grid-cols-3 gap-2 sm:gap-4 text-center mb-8 max-w-2xl mx-auto">
          <div class="p-3 bg-white rounded-xl border border-border-warm shadow-subtle flex flex-col items-center">
            <span class="material-symbols-outlined text-copper text-[22px] mb-1">home_repair_service</span>
            <span class="text-xs font-bold text-ink">Zero Repairs</span>
            <span class="text-[10px] text-warm-gray">100% As-Is</span>
          </div>

          <div class="p-3 bg-white rounded-xl border border-border-warm shadow-subtle flex flex-col items-center">
            <span class="material-symbols-outlined text-copper text-[22px] mb-1">percent</span>
            <span class="text-xs font-bold text-ink">0% Commissions</span>
            <span class="text-[10px] text-warm-gray">No Hidden Fees</span>
          </div>

          <div class="p-3 bg-white rounded-xl border border-border-warm shadow-subtle flex flex-col items-center">
            <span class="material-symbols-outlined text-copper text-[22px] mb-1">verified_user</span>
            <span class="text-xs font-bold text-ink">No Obligation</span>
            <span class="text-[10px] text-warm-gray">100% Confidential</span>
          </div>
        </div>

        <!-- 2-Step Offer Form -->
        <div class="max-w-2xl mx-auto w-full">
          ${renderOfferForm({ formId: 'dedicatedOfferForm' })}
        </div>

        <!-- Prefer to call? -->
        <div class="mt-8 text-center bg-white rounded-2xl p-6 border border-border-warm shadow-subtle max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3 text-left">
            <div class="w-10 h-10 rounded-full bg-warm-white border border-border-warm flex items-center justify-center text-copper shrink-0">
              <span class="material-symbols-outlined text-[20px]">phone_in_talk</span>
            </div>
            <div>
              <div class="font-bold text-sm text-ink">Prefer to talk directly?</div>
              <div class="text-xs text-warm-gray">Speak with our local Louisville team right now.</div>
            </div>
          </div>

          <a 
            href="tel:5023843357" 
            data-location="dedicated_offer_call"
            class="btn-secondary text-xs sm:text-sm font-bold w-full sm:w-auto px-5 py-2.5"
          >
            <span class="material-symbols-outlined text-[16px] text-copper">call</span>
            <span>Call (502) 384-3357</span>
          </a>
        </div>

      </div>
    </div>
  `;
}

export function initContactOfferPage() {
  initOfferForm('dedicatedOfferForm');
}
