import { renderLiveChatSimulator } from '../components/LiveChatSimulator.js';

export function renderHowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Contact G&N Investment",
      desc: "Submit your address online or call (502) 800-SELL. 100% free with zero obligation.",
      icon: "chat"
    },
    {
      num: "02",
      title: "Quick 10-Min Phone Review",
      desc: "We discuss your property details and understand your timeline and selling goals.",
      icon: "phone_in_talk"
    },
    {
      num: "03",
      title: "Private Walkthrough",
      desc: "A brief on-site visit. No cleaning, repairs, staging, or inspection checklist required.",
      icon: "location_home"
    },
    {
      num: "04",
      title: "Receive Written Cash Offer",
      desc: "A clear, transparent offer with 0% commissions and all standard closing costs covered.",
      icon: "request_quote"
    },
    {
      num: "05",
      title: "Choose Your Closing Date",
      desc: "Close in 7 to 14 days, or pick your exact timeline. No bank mortgage delays.",
      icon: "event_available"
    },
    {
      num: "06",
      title: "Closing & Get Paid",
      desc: "Finalized through a licensed local Kentucky title company. Funds wired directly to you.",
      icon: "verified"
    }
  ];

  return `
    <div class="flex flex-col w-full relative z-10 pb-28 md:pb-16 max-w-5xl mx-auto px-4 sm:px-6 pt-6 text-[#111315]">
      <!-- Header -->
      <div class="pt-4 pb-6 flex flex-col gap-2 text-center reveal">
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ 01 // 6-STEP PROCESS ]</span>
        <h1 class="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111315] font-['Playfair_Display',serif]">
          HOW SELLING TO US WORKS
        </h1>
        <p class="text-sm sm:text-base text-[#555964] max-w-md mx-auto leading-relaxed">
          From first message to closing day, see how transparent and stress-free selling your Kentucky home can be.
        </p>
      </div>

      <!-- Live Chat Simulator Interactive Demonstration -->
      <div class="reveal mb-10">
        <div class="text-center mb-3">
          <span class="text-[11px] font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ LIVE EXPERIENCE PREVIEW ]</span>
          <h2 class="text-xl sm:text-2xl font-bold text-[#111315] font-['Playfair_Display',serif] mt-0.5">See A Typical Consultation</h2>
        </div>
        ${renderLiveChatSimulator()}
      </div>

      <!-- Step Timeline Stack -->
      <div class="flex flex-col gap-4 mt-6">
        <div class="text-center mb-4 reveal">
          <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ DETAILED BREAKDOWN ]</span>
          <h2 class="text-xl sm:text-3xl font-bold text-[#111315] font-['Playfair_Display',serif] mt-0.5">The 6 Acquisition Steps</h2>
        </div>

        ${steps.map((s, idx) => `
          <div class="reveal rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-sm border border-black/8 bg-white">
            <div class="w-11 h-11 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-[#b88a76] font-bold text-sm shrink-0">
              ${s.num}
            </div>
            <div class="flex flex-col gap-1 flex-1">
              <h3 class="font-bold text-base text-[#111315] font-['Playfair_Display',serif]">${s.title}</h3>
              <p class="text-xs sm:text-sm text-[#555964] leading-relaxed">${s.desc}</p>
            </div>
            <span class="material-symbols-outlined text-[#b88a76] text-[22px] hidden sm:block shrink-0">${s.icon}</span>
          </div>
        `).join('')}
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center reveal flex flex-col items-center gap-3">
        <a href="#get-offer" data-nav="get-offer" class="shimmer-btn w-full max-w-xs bg-[#111315] hover:bg-[#252a35] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-md shadow-black/10 flex items-center justify-center gap-2 active:scale-95 transition-all">
          <span>Start Step 1: Get Cash Offer</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
    </div>
  `;
}
