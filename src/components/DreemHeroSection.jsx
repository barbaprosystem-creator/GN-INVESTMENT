import React from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';

/**
 * Editorial Architecture Hero Section (Dreem Studio / ONAR Style)
 * Features Layered Z-Index Typography behind transparent architecture render.
 */
export default function DreemHeroSection({
  logoText = "ONAR.",
  giantHeadline = "DREEM STUDIO",
  houseImageUrl = "/images/house-cutout.png", // or a high-res wood/glass house PNG
  phoneNumber = "+1 (502) 800-7355",
  onCtaClick = () => {},
}) {
  return (
    <div className="relative w-full min-h-screen bg-[#f4f2ec] text-[#1a1c1e] flex flex-col justify-between overflow-hidden font-sans selection:bg-[#1a1c1e] selection:text-[#f4f2ec]">
      
      {/* =========================================================================
          1. NAVBAR (Minimalist Editorial Bar)
          ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="text-2xl sm:text-3xl font-black tracking-tighter text-[#111315]">
          {logoText}
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium tracking-wide uppercase text-[#4a4d52]">
          <a href="#home" className="hover:text-black transition-colors font-semibold text-black">Home</a>
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#services" className="hover:text-black transition-colors">Services</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </nav>

        {/* Right Phone Capsule */}
        <a 
          href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
          className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#e0ded6] shadow-sm text-xs sm:text-sm font-semibold text-[#1a1c1e] hover:bg-white hover:shadow-md transition-all active:scale-95"
        >
          <span className="w-6 h-6 rounded-full bg-[#1a1c1e] text-white flex items-center justify-center">
            <Phone className="w-3 h-3" />
          </span>
          <span className="font-mono tracking-tight">{phoneNumber}</span>
        </a>
      </header>


      {/* =========================================================================
          2. HERO CONTENT GRID & LAYERED ARCHITECTURAL RENDERS
          ========================================================================= */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center my-auto pb-12 sm:pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative min-h-[480px] sm:min-h-[560px]">
          
          {/* LEFT COLUMN: Editorial Subtitle & CTA (z-20: Always Clickable & Readable) */}
          <div className="lg:col-span-5 z-20 flex flex-col items-start gap-6 max-w-md pt-4 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8e5db] text-[#55585f] text-[11px] font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1c1e]" />
              EST. 2026 • ARCHITECTURAL STUDIO
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#3d4046] font-normal leading-relaxed">
              We design timeless living spaces at the intersection of organic materials, structural precision, and Nordic minimalism.
            </p>

            <button 
              onClick={onCtaClick}
              className="group flex items-center gap-3 px-7 py-4 rounded-full bg-[#111315] hover:bg-[#25282d] text-white text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore Our Work</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </div>

          {/* RIGHT COLUMN: House Render Layer (z-10: Sits ON TOP of Giant Typography) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end pointer-events-none">
            <div className="relative w-full max-w-[620px] lg:max-w-[740px] z-10">
              <img 
                src={houseImageUrl} 
                alt="Modern Architecture Residence" 
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>

        </div>

        {/* LAYER 0 (BACKGROUND TYPOGRAPHY): Giant "DREEM STUDIO" Text
            Positioned absolute across the bottom of the hero.
            z-index: 5 (Behind the house render at z-10, but in front of background at z-0) */}
        <div 
          className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 w-full text-center z-[5] pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="block font-black uppercase text-[#23272e] tracking-tighter leading-none text-[13.5vw] lg:text-[14.5vw] opacity-95">
            {giantHeadline}
          </span>
        </div>

      </main>


      {/* =========================================================================
          3. HERO FOOTER BAR (Anthracite / Charcoal Bottom Contrast Strip)
          ========================================================================= */}
      <footer className="relative z-30 w-full bg-[#14171c] text-[#9ca3af] border-t border-white/10 px-6 sm:px-10 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono tracking-widest uppercase">
          
          <div className="flex items-center gap-3 text-white">
            <span className="w-2 h-2 rounded-full bg-[#efbba5]" />
            <span className="font-bold">WHERE ARCHITECTURE MEETS TIMELESS CRAFT</span>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            <span>RESIDENTIAL & COMMERCIAL</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hidden md:inline">SUSTAINABLE MATERIALS</span>
            <span className="text-white/20">•</span>
            <span className="text-white font-bold">ALL RIGHTS RESERVED © {new Date().getFullYear()}</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
