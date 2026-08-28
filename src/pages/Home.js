import { renderComparisonTable } from '../components/ComparisonTable.js';
import { renderFaqAccordion } from '../components/FaqAccordion.js';
import { renderBeforeAfterSlider } from '../components/BeforeAfterSlider.js';
import { renderShowcaseCarousel } from '../components/ShowcaseCarousel.js';

export function renderHomePage() {
  return `
    <div class="flex flex-col w-full relative min-h-screen pb-24 md:pb-16 overflow-hidden bg-[#f7f6f2] text-[#111315]">
      <!-- Ambient Architectural Scrim Glow -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div class="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#b88a76]/5 blur-[120px]"></div>
        <div class="absolute top-[35%] -right-[20%] w-[70vw] h-[70vw] rounded-full bg-[#e8e4d8]/40 blur-[140px]"></div>
      </div>

      <!-- =========================================================================
           1. HERO SECTION: Full Panoramic Architectural Backdrop (Architectural White Theme)
           ========================================================================= -->
      <section class="relative w-full flex flex-col justify-between overflow-hidden bg-[#f7f6f2] text-[#111315]">
        
        <!-- Top Editorial Meta Bar (Inside Hero) -->
        <div class="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/8 pb-4">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#111315]"></span>
            <span class="text-xs font-mono font-bold uppercase tracking-widest text-[#111315]">
              [ 01 // DIRECT REAL ESTATE CAPITAL • KENTUCKY ]
            </span>
          </div>
          <div class="flex items-center gap-4 text-xs font-mono text-[#555964]">
            <span>LOUISVILLE • LEXINGTON • JEFFERSON CO.</span>
            <span class="text-black/20">•</span>
            <span class="font-bold text-[#111315]">EST. 2026</span>
          </div>
        </div>

        <!-- Hero Visual: Full Image Complete in the Background with Floating Layered Elements -->
        <div class="relative w-full overflow-hidden flex flex-col items-center">
          
          <!-- Full-Bleed High-Res Image in Background -->
          <img 
            src="/images/hero-clean-house.jpg" 
            alt="Modern Residence - GN Investments" 
            class="w-full h-auto object-cover sm:object-contain select-none" 
          />

          <!-- Superimposed Ambient Scrim for Crisp White Typography Readability -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none"></div>

          <!-- Giant Monumental Typography: "DREEM STUDIO" / "GN INVESTMENTS" (WHITE TYPOGRAPHY / ALIGNED TO THE LEFT) -->
          <div class="absolute top-2 sm:top-6 md:top-10 inset-x-0 z-10 max-w-7xl mx-auto w-full px-4 sm:px-10 flex flex-col items-start text-left">
            
            <div class="animate-blur-in text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none font-['Plus_Jakarta_Sans',sans-serif] filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              GN INVESTMENTS
            </div>

            <h1 class="animate-blur-in-delay-1 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight mt-1.5 sm:mt-2.5 font-['Plus_Jakarta_Sans',sans-serif] filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-left">
              SELL DIRECT <span class="text-[#efbba5]">/</span> <span class="text-white font-black">100% AS-IS</span>
            </h1>

            <p 
              id="heroEncryptedText" 
              data-encrypted-text="No 6% agent commissions. No mandatory repair lists. We buy your Kentucky property directly with private cash capital."
              class="text-[11px] sm:text-sm md:text-base text-gray-200 max-w-md lg:max-w-lg leading-relaxed mt-1 sm:mt-1.5 font-normal filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] cursor-pointer transition-all hover:text-white text-left"
              title="Click or hover to decrypt"
            >
              No 6% agent commissions. No mandatory repair lists. We buy your Kentucky property directly with private cash capital.
            </p>
          </div>

          <!-- UNIFIED HORIZONTAL MULTI-FIELD PILL FORM (Floating over the lawn in Architectural White) -->
          <div class="w-full max-w-4xl mx-auto z-20 -mt-6 sm:-mt-12 md:-mt-16 px-2 sm:px-4">
            <form id="heroMultiPillForm" class="w-full bg-white/95 backdrop-blur-2xl p-1.5 sm:p-2 rounded-full border border-black/10 shadow-[0_15px_45px_rgba(0,0,0,0.12)] flex flex-row items-center divide-x divide-black/8" novalidate>
              
              <!-- Field 1: Name -->
              <div class="flex flex-col justify-center px-2 sm:px-4 py-1 sm:py-2 flex-1 min-w-0">
                <label for="pillName" class="text-[7.5px] sm:text-[10px] font-mono font-bold uppercase tracking-tighter sm:tracking-widest text-[#b88a76] truncate">Name</label>
                <input 
                  type="text" 
                  id="pillName" 
                  placeholder="Name" 
                  class="bg-transparent text-[#111315] placeholder:text-[#8a8e99] text-[10px] sm:text-sm focus:outline-none w-full truncate leading-tight mt-0.5" 
                  required 
                />
              </div>

              <!-- Field 2: Address -->
              <div class="flex flex-col justify-center px-2 sm:px-4 py-1 sm:py-2 flex-[1.4] sm:flex-[1.6] min-w-0">
                <label for="pillAddress" class="text-[7.5px] sm:text-[10px] font-mono font-bold uppercase tracking-tighter sm:tracking-widest text-[#b88a76] truncate">Address</label>
                <input 
                  type="text" 
                  id="pillAddress" 
                  placeholder="KY Address" 
                  class="bg-transparent text-[#111315] placeholder:text-[#8a8e99] text-[10px] sm:text-sm focus:outline-none w-full truncate leading-tight mt-0.5" 
                  required 
                />
              </div>

              <!-- Field 3: Phone -->
              <div class="flex flex-col justify-center px-2 sm:px-4 py-1 sm:py-2 flex-1 min-w-0">
                <label for="pillPhone" class="text-[7.5px] sm:text-[10px] font-mono font-bold uppercase tracking-tighter sm:tracking-widest text-[#b88a76] truncate">Phone</label>
                <input 
                  type="tel" 
                  id="pillPhone" 
                  placeholder="Phone" 
                  class="bg-transparent text-[#111315] placeholder:text-[#8a8e99] text-[10px] sm:text-sm focus:outline-none w-full truncate leading-tight mt-0.5" 
                  required 
                />
              </div>

              <!-- Field 4: Email -->
              <div class="flex flex-col justify-center px-2 sm:px-4 py-1 sm:py-2 flex-1 min-w-0">
                <label for="pillEmail" class="text-[7.5px] sm:text-[10px] font-mono font-bold uppercase tracking-tighter sm:tracking-widest text-[#b88a76] truncate">Email</label>
                <input 
                  type="email" 
                  id="pillEmail" 
                  placeholder="Email" 
                  class="bg-transparent text-[#111315] placeholder:text-[#8a8e99] text-[10px] sm:text-sm focus:outline-none w-full truncate leading-tight mt-0.5" 
                />
              </div>

              <!-- Submit Button Pill -->
              <div class="p-0.5 sm:p-1.5 shrink-0 flex items-center">
                <button 
                  type="submit" 
                  class="shimmer-btn bg-[#111315] hover:bg-[#232730] text-white font-extrabold text-[9px] sm:text-xs uppercase tracking-tight sm:tracking-widest px-3 sm:px-8 py-2.5 sm:py-4 rounded-full flex items-center justify-center gap-1 sm:gap-2 shadow-md shadow-black/20 cursor-pointer whitespace-nowrap active:scale-95 transition-all"
                  title="Get Cash Offer"
                >
                  <span class="hidden sm:inline">GET CASH OFFER</span>
                  <span class="sm:hidden text-[9px] font-bold">OFFER</span>
                  <span class="material-symbols-outlined text-[13px] sm:text-[16px]">arrow_forward</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        <!-- HERO BOTTOM FOOTER CONTRAST STRIP (Warm Bone / Sand Light Strip) -->
        <div class="relative z-30 w-full bg-[#eae6dc] text-[#111315] border-y border-black/8 px-4 sm:px-8 py-3.5 sm:py-4 mt-6">
          <div class="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto hide-scrollbar text-xs font-mono tracking-widest uppercase">
            <div class="flex items-center gap-2.5 text-[#111315] font-bold shrink-0">
              <span class="w-2 h-2 rounded-full bg-[#b88a76]"></span>
              <span>WHERE ARCHITECTURE MEETS DIRECT CAPITAL</span>
            </div>
            <div class="flex items-center gap-4 shrink-0 text-[#555964]">
              <span>LOUISVILLE & STATEWIDE</span>
              <span class="text-black/20">•</span>
              <span>0% AGENT COMMISSIONS</span>
              <span class="text-black/20">•</span>
              <span class="text-[#b88a76] font-bold">CERTIFIED ESCROW CLOSING</span>
            </div>
          </div>
        </div>

      </section>

      <!-- =========================================================================
           2. ASYMMETRIC EDITORIAL: Built on Direct Capital (Architectural Layout)
           ========================================================================= -->
      <section class="py-12 sm:py-20 w-full">
        <!-- Content Constrained to max-w-7xl -->
        <div class="max-w-7xl mx-auto px-4 sm:px-8 mb-10 flex flex-col gap-6">
          <span class="text-xs font-mono uppercase tracking-widest text-[#b88a76] font-extrabold">
            [ 02 // DIRECT BUYING ADVANTAGE ]
          </span>

          <h2 class="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111315] leading-[0.95] font-['Plus_Jakarta_Sans',sans-serif]">
            BUILT WITH CAPITAL <span class="text-[#b88a76]">/</span><br/>
            DESIGNED FOR SPEED
          </h2>

          <p class="text-base sm:text-lg text-[#3d414a] leading-relaxed max-w-2xl font-normal">
            Traditional real estate is bogged down by mortgage contingencies, appraisal demands, and open-house disruptions. G&amp;N operates as a direct private investment principal — eliminating middleman commissions and closing on your terms.
          </p>

          <!-- Big Stat Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-black/10">
            <div class="flex flex-col">
              <span class="text-4xl sm:text-5xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-[#111315] tracking-tight">$12M+</span>
              <span class="text-xs font-mono font-bold text-[#555964] uppercase tracking-wider mt-1">Direct Capital Deployed</span>
            </div>
            <div class="flex flex-col">
              <span class="text-4xl sm:text-5xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-[#b88a76] tracking-tight">7–14</span>
              <span class="text-xs font-mono font-bold text-[#555964] uppercase tracking-wider mt-1">Days Average Close</span>
            </div>
            <div class="flex flex-col col-span-2 sm:col-span-1">
              <span class="text-4xl sm:text-5xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-[#111315] tracking-tight">0%</span>
              <span class="text-xs font-mono font-bold text-[#555964] uppercase tracking-wider mt-1">Realtor Fees ($0)</span>
            </div>
          </div>
        </div>

        <!-- 100% Full-Width Edge-to-Edge Architectural Photo -->
        <div class="w-full relative overflow-hidden">
          <img 
            src="/images/situation-inherited.jpg" 
            alt="Old Louisville Historic Property" 
            class="w-full h-80 sm:h-[460px] object-cover select-none" 
          />
          <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-xs font-mono text-[#555964] border-b border-black/10">
            <span>CASE STUDY: PROBATE ESTATE SALE // LOUISVILLE, KY</span>
            <span class="font-bold text-[#111315]">REPAIRS REQUIRED: $0.00 (100% AS-IS)</span>
          </div>
        </div>
      </section>

      <!-- =========================================================================
           3. INTERACTIVE BEFORE & AFTER SLIDER (The As-Is Reality)
           ========================================================================= -->
      <section class="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        ${renderBeforeAfterSlider()}
      </section>

      <!-- =========================================================================
           4. HORIZONTAL PROPERTY SHOWCASE CAROUSEL (100% Full Width Portfolio)
           ========================================================================= -->
      <section class="py-12 sm:py-20 w-full">
        ${renderShowcaseCarousel()}
      </section>

      <!-- =========================================================================
           5. COMPARISON MATRIX (Direct Buyer vs MLS Brokerage)
           ========================================================================= -->
      <section class="py-12 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div class="flex flex-col items-center text-center gap-2 mb-10 reveal">
          <span class="text-xs font-mono uppercase tracking-widest text-[#b88a76] font-extrabold">
            [ 03 // VALUE COMPARISON ]
          </span>
          <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111315] font-['Plus_Jakarta_Sans',sans-serif]">
            DIRECT SALE <span class="text-[#b88a76]">VS.</span> MLS AGENT
          </h2>
          <p class="text-sm text-[#555964] max-w-md mt-1">
            Evaluate the real mathematical breakdown between selling direct to G&amp;N vs. the traditional market.
          </p>
        </div>

        <div class="reveal">
          ${renderComparisonTable()}
        </div>
      </section>

      <!-- =========================================================================
           6. FAQ ACCORDION (High-Contrast Editorial)
           ========================================================================= -->
      <section class="py-12 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto w-full" id="faq">
        <div class="flex flex-col items-center text-center gap-2 mb-10 reveal">
          <span class="text-xs font-mono uppercase tracking-widest text-[#b88a76] font-extrabold">
            [ 04 // CLARITY &amp; QUESTIONS ]
          </span>
          <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111315] font-['Plus_Jakarta_Sans',sans-serif]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div class="reveal">
          ${renderFaqAccordion()}
        </div>
      </section>

      <!-- =========================================================================
           7. BOTTOM COMMAND BANNER
           ========================================================================= -->
      <section class="px-4 sm:px-8 max-w-6xl mx-auto w-full mt-8 mb-4">
        <div class="bg-[#111315] text-white rounded-2xl p-6 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#efbba5] shrink-0">
              <span class="material-symbols-outlined text-[26px]">real_estate_agent</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#efbba5] font-bold">Confidential Evaluation</span>
              <h3 class="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-white">Ready for a Direct Cash Valuation?</h3>
              <p class="text-xs sm:text-sm text-gray-300">Receive your written As-Is offer with zero fees and no obligation.</p>
            </div>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <a href="tel:5028007355" class="w-full sm:w-auto px-5 py-3.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider text-center transition-all">
              Call (502) 800-SELL
            </a>
            <a href="#get-offer" data-nav="get-offer" class="shimmer-btn w-full sm:w-auto bg-[#efbba5] hover:bg-[#efbba5]/90 text-[#111315] text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full shadow-lg text-center whitespace-nowrap">
              Get Offer →
            </a>
          </div>
        </div>
      </section>

    </div>
  `;
}
