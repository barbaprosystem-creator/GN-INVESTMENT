export function renderMobileStickyBar() {
  return `
    <nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#12151b]/92 backdrop-blur-2xl border-t border-white/10 pb-safe shadow-2xl shadow-black" id="bottomNav">
      <div class="flex items-center justify-around h-16 px-2">
        <a href="#home" data-nav="home" class="flex flex-col items-center justify-center gap-0.5 w-12 h-12 text-[#efbba5] font-semibold transition-all">
          <span class="material-symbols-outlined text-[20px]">home</span>
          <span class="text-[10px] tracking-tight">Home</span>
        </a>

        <a href="#how-it-works" data-nav="how-it-works" class="flex flex-col items-center justify-center gap-0.5 w-12 h-12 text-on-surface-variant/70 hover:text-[#efbba5] transition-all">
          <span class="material-symbols-outlined text-[20px]">timeline</span>
          <span class="text-[10px] tracking-tight">Process</span>
        </a>

        <!-- Middle Quick Offer Button -->
        <a href="#get-offer" data-nav="get-offer" class="flex flex-col items-center justify-center w-12 h-12 -mt-5 bg-gradient-to-tr from-primary to-[#efbba5] text-[#12151b] font-bold rounded-full shadow-lg shadow-primary/30 border-2 border-[#12151b] active:scale-95 transition-transform" title="Request Cash Offer">
          <span class="material-symbols-outlined text-[24px]">local_offer</span>
        </a>

        <a href="#situations" data-nav="situations" class="flex flex-col items-center justify-center gap-0.5 w-12 h-12 text-on-surface-variant/70 hover:text-[#efbba5] transition-all">
          <span class="material-symbols-outlined text-[20px]">domain</span>
          <span class="text-[10px] tracking-tight">Scenarios</span>
        </a>

        <a href="#about" data-nav="about" class="flex flex-col items-center justify-center gap-0.5 w-12 h-12 text-on-surface-variant/70 hover:text-[#efbba5] transition-all">
          <span class="material-symbols-outlined text-[20px]">info</span>
          <span class="text-[10px] tracking-tight">About</span>
        </a>
      </div>
    </nav>
  `;
}
