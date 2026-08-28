export function renderAboutPage() {
  return `
    <div class="flex flex-col w-full relative pb-28 md:pb-16 pt-6 text-[#111315]">
      
      <!-- Editorial Top Banner (Constrained Header) -->
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-4 pb-8 flex flex-col gap-3">
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ ABOUT G&amp;N INVESTMENT ]</span>
        <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#111315] font-['Playfair_Display',serif] leading-none">
          PROFESSIONAL <span class="text-[#b88a76]">/</span> LOCAL <span class="text-[#b88a76]">/</span> DIRECT
        </h1>
        <p class="text-base sm:text-lg text-[#555964] max-w-xl leading-relaxed">
          Kentucky's trusted residential property acquisitions firm. Built on private direct capital and verified escrow title closings.
        </p>
      </div>

      <!-- 100% Full-Width Edge-to-Edge Architectural Photo -->
      <div class="w-full mb-16 overflow-hidden">
        <img 
          src="/images/hero-clean-house.jpg" 
          alt="Modern Residence - GN Investments" 
          class="w-full h-80 sm:h-[500px] object-cover select-none" 
        />
      </div>

      <!-- The Standard Section (Constrained) -->
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col gap-6 mb-16">
        <div class="text-left reveal">
          <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ 01 // CORE PILLARS ]</span>
          <h2 class="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#111315] mt-1 font-['Playfair_Display',serif]">THE G&amp;N STANDARD</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4 border-t border-black/10">
          <!-- Pillar 1 -->
          <div class="reveal delay-100 flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#b88a76]">01. SPEED</span>
            <h3 class="font-bold text-lg text-[#111315] font-['Playfair_Display',serif]">Swift Execution</h3>
            <p class="text-sm text-[#555964] leading-relaxed">Direct private capital. No mortgage lender approval delays or retail appraisals.</p>
          </div>

          <!-- Pillar 2 -->
          <div class="reveal delay-200 flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#b88a76]">02. CLARITY</span>
            <h3 class="font-bold text-lg text-[#111315] font-['Playfair_Display',serif]">Absolute Clarity</h3>
            <p class="text-sm text-[#555964] leading-relaxed">Zero hidden fees, 0% agent commission, and full transparency throughout.</p>
          </div>

          <!-- Pillar 3 -->
          <div class="reveal delay-300 flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#b88a76]">03. INTEGRITY</span>
            <h3 class="font-bold text-lg text-[#111315] font-['Playfair_Display',serif]">Fair Valuation</h3>
            <p class="text-sm text-[#555964] leading-relaxed">Maximized equity payout based on real current Kentucky market dynamics.</p>
          </div>
        </div>
      </div>

      <!-- 100% Full-Width Panoramic Skyline Strip -->
      <div class="w-full mb-12 overflow-hidden">
        <img src="/images/about-louisville.jpg" alt="Louisville Kentucky Skyline" class="w-full h-80 sm:h-[460px] object-cover select-none" />
      </div>

      <!-- Local Commitment Text (Constrained) -->
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col gap-4 mb-16">
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#b88a76]">[ 02 // LOCAL EXPERTISE ]</span>
        <h3 class="text-3xl sm:text-4xl font-black text-[#111315] font-['Playfair_Display',serif]">Deep Kentucky Roots</h3>
        <p class="text-base text-[#555964] leading-relaxed max-w-3xl">
          We live and operate right here in the Commonwealth. From Jefferson County and Louisville Metro to Lexington and surrounding communities, we understand neighborhood micro-markets intimately.
        </p>
        <div class="flex items-center gap-8 pt-4 border-t border-black/10 max-w-2xl">
          <div class="flex flex-col">
            <span class="font-black text-3xl text-[#111315]">100%</span>
            <span class="text-xs text-[#717580] uppercase tracking-wider font-mono">As-Is Purchase</span>
          </div>
          <div class="h-10 w-px bg-black/10"></div>
          <div class="flex flex-col">
            <span class="font-black text-3xl text-[#111315]">0%</span>
            <span class="text-xs text-[#717580] uppercase tracking-wider font-mono">Commission</span>
          </div>
          <div class="h-10 w-px bg-black/10"></div>
          <div class="flex flex-col">
            <span class="font-black text-3xl text-[#b88a76]">7–14</span>
            <span class="text-xs text-[#717580] uppercase tracking-wider font-mono">Days Closing</span>
          </div>
        </div>
      </div>

    </div>
  `;
}
