export function renderHeader() {
  return `
    <header class="fixed top-0 inset-x-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-2xl border-b border-black/8 pt-safe transition-all shadow-xs">
      <div class="h-20 sm:h-24 px-4 sm:px-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <!-- Official Logo with Enhanced Brand Presence -->
        <a href="#home" class="flex items-center gap-3.5 group shrink-0 py-1" data-nav="home" title="G&N Investment - Home">
          <img 
            alt="G&N Investment Logo" 
            class="h-12 sm:h-15 w-auto object-contain transition-transform duration-200 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]" 
            src="/images/gn-logo-transparent.png" 
          />
          <div class="hidden sm:flex flex-col">
            <span class="text-base sm:text-lg font-black tracking-tight text-[#111315] font-['Playfair_Display',serif] leading-tight group-hover:text-[#b88a76] transition-colors">G&amp;N INVESTMENT</span>
            <span class="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#b88a76] font-extrabold">DIRECT REAL ESTATE CAPITAL</span>
          </div>
        </a>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#home" data-nav="home" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">Home</a>
          <a href="#how-it-works" data-nav="how-it-works" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">Process</a>
          <a href="#situations" data-nav="situations" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">Situations</a>
          <a href="#about" data-nav="about" class="text-xs font-bold uppercase tracking-wider text-[#4a4e58] hover:text-black transition-colors">About Us</a>
        </nav>

        <!-- Header Actions -->
        <div class="flex items-center gap-2.5">
          <a href="tel:5028007355" class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-[#111315] shadow-xs hover:scale-105 active:scale-95 transition-transform" title="Call (502) 800-SELL">
            <span class="material-symbols-outlined text-[18px] sm:text-[20px]">call</span>
          </a>
          <a href="#get-offer" data-nav="get-offer" class="shimmer-btn bg-[#111315] hover:bg-[#252a35] text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md shadow-black/10 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <span>GET OFFER</span>
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </header>
  `;
}
