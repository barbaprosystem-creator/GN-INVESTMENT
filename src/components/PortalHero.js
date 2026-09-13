import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Architectural SVG Dot Pattern (Section 7 of Technical Guide)
 * Crisp CAD/survey dot grid pattern for high-end editorial depth.
 */
function renderArchitecturalDotPattern() {
  return `
    <svg class="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="portalArchitecturalDots" width="28" height="28" patternUnits="userSpaceOnUse" x="0" y="0">
          <circle cx="2" cy="2" r="1" fill="#FFFFFF" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#portalArchitecturalDots)" />
    </svg>
  `;
}

/**
 * Renders the HTML structure for the pinned G&N Portal Hero with 60fps HTML5 Canvas.
 * Supports a complete 3-Act cinematic scrollytelling experience:
 * Act 1: Kentucky House entrance walkthrough (120 WebP frames).
 * Milestone 1: Living room plaster wall action card ("SELL YOUR HOUSE AS-IS.").
 * Act 2: 3D Metallic Logo Reveal transition ("al volver a hacer scroll") (120 WebP frames).
 * Act 3: Process Walkthrough ("How a Direct Sale Works" 4-step wall) (120 WebP frames).
 */
export function renderPortalHero() {
  return `
    <!-- Pinned Scroll-Controlled Hero Runway (800vh total scroll distance for 3 cinematic chapters) -->
    <section id="portalHeroSection" class="relative w-full h-[800vh] bg-[#F7F5F1] select-none">
      
      <!-- Pinned 100vh Sticky Viewport (Locked in place by GSAP pin until scroll completes) -->
      <div id="portalHeroPin" class="w-full h-screen overflow-hidden bg-[#0A0E17] relative">
        
        <!-- ============================================================
             LAYER 0: 60FPS HTML5 CANVAS ENGINE (Apple / Lumalabs Sequence)
             Single <canvas> driven by requestAnimationFrame + LERP (0.22)
             Dual source: 1920x1080 (Desktop) vs 1080x1920 (Mobile)
             Triple sequence:
             - Act 1: Walkthrough (120f)
             - Act 2: 3D Metallic Logo Reveal (120f)
             - Act 3: Process Walkthrough "How a Direct Sale Works" (120f)
             ============================================================ -->
        <div id="portalCanvasContainer" class="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-[#0A0E17]">
          <canvas 
            id="portalCanvas" 
            class="w-full h-full block pointer-events-none"
            style="width: 100%; height: 100%; display: block;"
            aria-label="Kentucky Home, 3D Brand Emblem, and Direct Sale Transformation Sequence"
          ></canvas>
          
          <!-- Subtle architectural dot pattern overlay -->
          ${renderArchitecturalDotPattern()}

          <!-- Cinematic ambient contrast grading over the edges -->
          <div id="portalVignette" class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none transition-opacity duration-300"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>

          <!-- Cinematic Pure White Light Bloom Transition between Chapters -->
          <div id="portalLightTransition" class="absolute inset-0 bg-white pointer-events-none z-10" style="opacity: 0;"></div>

          <!-- Bottom Ambient Dissolve: Fades seamlessly into the page's warm cream palette -->
          <div 
            id="portalBottomDissolve" 
            class="absolute inset-x-0 bottom-0 h-72 sm:h-96 pointer-events-none z-15"
            style="opacity: 0; background: linear-gradient(to top, #F7F5F1 20%, rgba(247, 245, 241, 0.9) 55%, rgba(247, 245, 241, 0.35) 80%, transparent 100%);"
          ></div>

          <!-- Full Viewport Daylight Veil: Smooth daylight washing over the room as scroll finishes -->
          <div 
            id="portalExitVeil" 
            class="absolute inset-0 pointer-events-none z-15" 
            style="opacity: 0; background: radial-gradient(circle at 50% 100%, rgba(247, 245, 241, 0.96) 0%, rgba(247, 245, 241, 0.7) 50%, rgba(247, 245, 241, 0.2) 85%, transparent 100%);"
          ></div>
        </div>

        <!-- Semantic H1 for SEO & Screen Readers -->
        <h1 class="sr-only">G&amp;N Investments — Direct Real Estate Buyers in Louisville &amp; Kentucky. Sell Your House As-Is.</h1>

        <!-- ============================================================
             LAYER 1: INTERIOR ROOM INTERACTIVE ACTION CARD (Milestone 1)
             Progress 28%–35%: Fades in seamlessly over the plaster wall
             Positioned cleanly under the wall headline with CTAs & trust proof
             ============================================================ -->
        <style>
          #portalWallCard {
            transform: perspective(850px) rotateY(26deg) rotateX(-3.5deg) skewY(-13.5deg) scale(0.95);
            -webkit-transform: perspective(850px) rotateY(26deg) rotateX(-3.5deg) skewY(-13.5deg) scale(0.95);
            transform-origin: left center;
            -webkit-transform-origin: left center;
            transform-style: preserve-3d;
          }
          @media (min-width: 768px) {
            #portalWallCard {
              transform: perspective(1000px) rotateY(18deg) rotateX(-3deg) skewY(-9.8deg) scale(1.15);
              -webkit-transform: perspective(1000px) rotateY(18deg) rotateX(-3deg) skewY(-9.8deg) scale(1.15);
            }
          }
        </style>

        <div 
          id="portalWallLayer" 
          class="absolute inset-x-0 bottom-0 top-[66.5%] sm:top-[62%] md:top-[53.5%] z-20 pointer-events-none flex items-start justify-start pl-[16vw] pr-4 sm:pl-[16vw] md:pl-[9.4vw] md:pr-6"
          style="perspective: 1000px; -webkit-perspective: 1000px; perspective-origin: 30% 85%; -webkit-perspective-origin: 30% 85%; transform-style: preserve-3d; opacity: 0;"
        >
          <div 
            id="portalWallCard" 
            class="max-w-md sm:max-w-lg md:max-w-2xl text-left pointer-events-auto"
          >
            
            <!-- Architectural Metadata Badge -->
            <div class="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-3">
              <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-copper animate-pulse"></span>
              <span class="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-soft-copper font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                LOUISVILLE &amp; KENTUCKY DIRECT BUYERS
              </span>
            </div>

            <!-- Trust Subtitle -->
            <p 
              id="wallTrust" 
              class="text-sm sm:text-lg md:text-xl text-white max-w-lg leading-snug sm:leading-relaxed font-semibold filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
            >
              No repairs. No listings. No fees.
            </p>

            <p class="text-[11px] sm:text-sm text-gray-200 mt-0.5 sm:mt-1 max-w-md filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              We purchase residential property in any condition across Jefferson County and Kentucky.
            </p>

            <!-- Actions -->
            <div 
              id="wallActions" 
              class="flex flex-row items-center gap-2 sm:gap-4 mt-3 sm:mt-6"
            >
              <a 
                href="#homeOfferSection" 
                id="portalCtaBtn"
                data-nav="#homeOfferSection"
                data-analytics-cta="get-my-offer" 
                data-location="portal_hero_wall" 
                class="btn-copper py-2.5 sm:py-3.5 px-4 sm:px-8 text-xs sm:text-base font-bold shadow-lifted inline-flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Get My Offer</span>
                <span class="material-symbols-outlined text-[15px] sm:text-[18px]">arrow_forward</span>
              </a>

              <a 
                href="tel:5024903131" 
                data-location="portal_hero_wall" 
                class="btn-secondary bg-white/20 hover:bg-white/35 text-white border-white/40 py-2.5 sm:py-3.5 px-3.5 sm:px-6 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-md cursor-pointer whitespace-nowrap"
              >
                <span class="material-symbols-outlined text-[15px] sm:text-[18px] text-soft-copper">call</span>
                <span>Call (502) 490-3131</span>
              </a>
            </div>

          </div>
        </div>

        <!-- Initial Scroll Indicator (0%–2%) -->
        <div 
          id="portalScrollPrompt" 
          class="absolute bottom-8 inset-x-0 mx-auto w-fit z-20 flex flex-col items-center gap-1.5 text-white/80 text-xs font-mono uppercase tracking-widest pointer-events-none transition-opacity duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          <span class="font-bold tracking-wider">Scroll to Explore</span>
          <span class="material-symbols-outlined text-[18px] text-copper animate-bounce">expand_more</span>
        </div>

        <!-- Second Scroll Indicator for Milestone 1 ("Scroll to Continue") -->
        <div 
          id="portalSecondScrollPrompt" 
          class="absolute bottom-8 inset-x-0 mx-auto w-fit z-20 flex flex-col items-center gap-1.5 text-white/90 text-xs font-mono uppercase tracking-widest pointer-events-none transition-opacity duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style="opacity: 0;"
        >
          <span class="font-bold tracking-wider">Scroll to Continue</span>
          <span class="material-symbols-outlined text-[18px] text-copper animate-bounce">expand_more</span>
        </div>

        <!-- Third Scroll Indicator for Milestone 3 (Process Wall: "Scroll to Explore Full Site") -->
        <div 
          id="portalProcessPrompt" 
          class="absolute bottom-8 inset-x-0 mx-auto w-fit z-20 flex flex-col items-center gap-1.5 text-white/90 text-xs font-mono uppercase tracking-widest pointer-events-none transition-opacity duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style="opacity: 0;"
        >
          <span class="font-bold tracking-wider">Scroll to Explore Full Site</span>
          <span class="material-symbols-outlined text-[18px] text-copper animate-bounce">expand_more</span>
        </div>

        <!-- Admin / Staff Panel Access Button (Initial Hero Screens) -->
        <div id="portalAdminContainer" class="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 pointer-events-auto transition-opacity duration-300">
          <a 
            href="/login" 
            data-nav="/login"
            id="portalAdminBtn"
            class="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 text-white/90 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer shadow-lg"
            title="Acceso al Panel de Administración"
          >
            <span class="material-symbols-outlined text-[15px] sm:text-[17px] text-soft-copper group-hover:rotate-12 transition-transform">admin_panel_settings</span>
            <span class="font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">Admin</span>
          </a>
        </div>

      </div>
    </section>
  `;
}

/**
 * Initializes the 60fps HTML5 Canvas WebP Frame Sequence Engine and GSAP ScrollTrigger timeline.
 */
export function initPortalHero() {
  const section = document.getElementById('portalHeroSection');
  const pinContainer = document.getElementById('portalHeroPin');
  const canvas = document.getElementById('portalCanvas');
  const wallLayer = document.getElementById('portalWallLayer');
  const scrollPrompt = document.getElementById('portalScrollPrompt');
  const secondScrollPrompt = document.getElementById('portalSecondScrollPrompt');
  const processPrompt = document.getElementById('portalProcessPrompt');
  const lightTransition = document.getElementById('portalLightTransition');
  const bottomDissolve = document.getElementById('portalBottomDissolve');
  const exitVeil = document.getElementById('portalExitVeil');
  const vignette = document.getElementById('portalVignette');
  const header = document.getElementById('siteHeader') || document.querySelector('header');

  if (!section || !pinContainer || !canvas) return;

  // Initialize Initial Visual States
  if (wallLayer) wallLayer.style.opacity = '0';
  if (scrollPrompt) scrollPrompt.style.opacity = '1';
  if (secondScrollPrompt) secondScrollPrompt.style.opacity = '0';
  if (processPrompt) processPrompt.style.opacity = '0';
  if (lightTransition) lightTransition.style.opacity = '0';
  if (bottomDissolve) bottomDissolve.style.opacity = '0';
  if (exitVeil) exitVeil.style.opacity = '0';

  // Keep header strictly hidden during the entire hero scrollytelling experience
  if (header) {
    header.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    header.style.opacity = '0';
    header.style.pointerEvents = 'none';
    header.style.transform = 'translateY(-10px)';
  }

  // ============================================================
  // CONFIGURATION & CONSTANTS
  // Triple-chapter parameters:
  // Sequence 1: Walkthrough (120 frames)
  // Sequence 2: 3D Metallic Logo Reveal (120 frames)
  // Sequence 3: Process Walkthrough (120 frames)
  // ============================================================
  const TOTAL_FRAMES_WALKTHROUGH = 120;
  const TOTAL_FRAMES_LOGO = 120;
  const TOTAL_FRAMES_PROCESS = 120;
  const LERP_SMOOTHING = 0.22;

  // Dual-source responsive orientation tracker
  let isDesktop = window.innerWidth >= 768;
  let activeOrientation = isDesktop ? 'desktop' : 'mobile';

  // Multi-sequence cache state
  const imageCache = new Map();
  const loadingSet = new Set();
  let targetProgress = 0;
  let currentProgress = 0;
  let displayedKey = null;
  let needsRedraw = true;
  let rafId = null;

  // Cache helper
  function getFrameUrl(seq, frameIndex, orientation) {
    const padded = String(frameIndex).padStart(4, '0');
    if (seq === 'logo') {
      return `/frames/logo-${orientation}/frame-${padded}.webp`;
    }
    if (seq === 'process') {
      return `/frames/process-${orientation}/frame-${padded}.webp`;
    }
    return `/frames/${orientation}/frame-${padded}.webp`;
  }

  function preloadFrame(seq, frameIndex, orientation, priority = false) {
    const key = `${seq}_${orientation}_${frameIndex}`;
    if (imageCache.has(key) || loadingSet.has(key)) return;

    loadingSet.add(key);
    const img = new Image();
    if (priority) img.fetchPriority = 'high';
    img.src = getFrameUrl(seq, frameIndex, orientation);

    img.onload = () => {
      loadingSet.delete(key);
      imageCache.set(key, img);
      needsRedraw = true;
      if (displayedKey === null && seq === 'walkthrough' && frameIndex === 1) {
        drawFrame('walkthrough', 1, orientation);
      }
    };
    img.onerror = () => {
      loadingSet.delete(key);
    };
  }

  function loadNearbyFrames(seq, centerFrame, orientation) {
    let totalFrames = TOTAL_FRAMES_WALKTHROUGH;
    if (seq === 'logo') totalFrames = TOTAL_FRAMES_LOGO;
    else if (seq === 'process') totalFrames = TOTAL_FRAMES_PROCESS;

    const minFrame = Math.max(1, centerFrame - 4);
    const maxFrame = Math.min(totalFrames, centerFrame + 18);
    for (let f = minFrame; f <= maxFrame; f++) {
      preloadFrame(seq, f, orientation);
    }
  }

  // Draw current frame using aspect-ratio cover math with exact pixel sizing
  function drawFrame(seq, frameIndex, orientation) {
    const key = `${seq}_${orientation}_${frameIndex}`;
    let img = imageCache.get(key);
    let totalFrames = TOTAL_FRAMES_WALKTHROUGH;
    if (seq === 'logo') totalFrames = TOTAL_FRAMES_LOGO;
    else if (seq === 'process') totalFrames = TOTAL_FRAMES_PROCESS;

    // Fallback to nearest available frame in current sequence
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 30; offset++) {
        const prev = imageCache.get(`${seq}_${orientation}_${Math.max(1, frameIndex - offset)}`);
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imageCache.get(`${seq}_${orientation}_${Math.min(totalFrames, frameIndex + offset)}`);
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Get exact bounding box of the canvas in CSS pixels
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = rect.width > 0 ? rect.width : window.innerWidth;
    const cssH = rect.height > 0 ? rect.height : window.innerHeight;
    const targetW = Math.max(1, Math.round(cssW * dpr));
    const targetH = Math.max(1, Math.round(cssH * dpr));

    // Keep internal canvas pixel buffer in 100% exact sync with CSS display container
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover math: preserve exact natural aspect ratio without any stretching or deformation
    const imgAspect = iw / ih;
    const canvasAspect = cw / ch;

    let dw, dh;
    if (canvasAspect > imgAspect) {
      dw = cw;
      dh = Math.round(cw / imgAspect);
    } else {
      dh = ch;
      dw = Math.round(ch * imgAspect);
    }

    const offsetX = Math.round((cw - dw) / 2);
    const offsetY = Math.round((ch - dh) / 2);

    ctx.drawImage(img, offsetX, offsetY, dw, dh);
    displayedKey = key;
    needsRedraw = false;
  }

  // Preload initial anchors immediately:
  // Walkthrough: Frames 1 to 24 eagerly, plus frame 120
  preloadFrame('walkthrough', 1, activeOrientation, true);
  for (let f = 2; f <= 24; f++) {
    preloadFrame('walkthrough', f, activeOrientation, false);
  }
  preloadFrame('walkthrough', TOTAL_FRAMES_WALKTHROUGH, activeOrientation, false);

  // Logo sequence: Frame 1 & 120
  preloadFrame('logo', 1, activeOrientation, false);
  preloadFrame('logo', 2, activeOrientation, false);
  preloadFrame('logo', TOTAL_FRAMES_LOGO, activeOrientation, false);

  // Process sequence: Frame 1 & 120
  preloadFrame('process', 1, activeOrientation, false);
  preloadFrame('process', 2, activeOrientation, false);
  preloadFrame('process', TOTAL_FRAMES_PROCESS, activeOrientation, false);

  // Multi-stage progressive background preloader triggered on scroll
  let preloadedPhase1 = false;
  let preloadedPhase2 = false;
  let preloadedPhase3 = false;

  function handleProgressivePreload(progress) {
    if (progress > 0.08 && !preloadedPhase1) {
      preloadedPhase1 = true;
      for (let f = 25; f <= TOTAL_FRAMES_WALKTHROUGH; f += 2) {
        preloadFrame('walkthrough', f, activeOrientation, false);
      }
      for (let f = 3; f <= 35; f++) {
        preloadFrame('logo', f, activeOrientation, false);
      }
    }
    if (progress > 0.25 && !preloadedPhase2) {
      preloadedPhase2 = true;
      for (let f = 36; f <= TOTAL_FRAMES_LOGO; f++) {
        preloadFrame('logo', f, activeOrientation, false);
      }
      for (let f = 3; f <= 35; f++) {
        preloadFrame('process', f, activeOrientation, false);
      }
    }
    if (progress > 0.50 && !preloadedPhase3) {
      preloadedPhase3 = true;
      for (let f = 36; f <= TOTAL_FRAMES_PROCESS; f++) {
        preloadFrame('process', f, activeOrientation, false);
      }
    }
  }

  // Responsive Breakpoint Handler
  function handleMediaChange(e) {
    const newIsDesktop = e.matches;
    if (newIsDesktop !== isDesktop) {
      isDesktop = newIsDesktop;
      activeOrientation = isDesktop ? 'desktop' : 'mobile';
      imageCache.clear();
      loadingSet.clear();
      preloadedPhase1 = false;
      preloadedPhase2 = false;
      preloadedPhase3 = false;
      preloadFrame('walkthrough', 1, activeOrientation, true);
      preloadFrame('logo', 1, activeOrientation, false);
      preloadFrame('process', 1, activeOrientation, false);
      needsRedraw = true;
    }
  }

  const mediaWatcher = window.matchMedia('(min-width: 768px)');
  if (mediaWatcher.addEventListener) {
    mediaWatcher.addEventListener('change', handleMediaChange);
  } else if (mediaWatcher.addListener) {
    mediaWatcher.addListener(handleMediaChange);
  }

  // Render loop driven by requestAnimationFrame with LERP smoothing
  function startRenderLoop() {
    const render = () => {
      // Linear interpolation smoothing (0.22)
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * LERP_SMOOTHING;
      } else {
        currentProgress = targetProgress;
      }

      // ============================================================
      // TRIPLE CHAPTER FRAME MAPPING (800vh runway)
      //
      // Chapter 1: House Entrance Walkthrough (progress 0.00 -> 0.36)
      // - 0.00 to 0.02: Hold frame 1 (exterior Kentucky home)
      // - 0.02 to 0.28: Scrub frames 1 -> 120 (enter doorway -> living room)
      // - 0.28 to 0.35: Hold frame 120 (living room wall with CTA card)
      // - 0.35 to 0.37: Transition window 1
      //
      // Chapter 2: 3D Metallic Logo Reveal (progress 0.37 -> 0.62)
      // - 0.37 to 0.39: Transition into logo sequence (frame 1, pure white)
      // - 0.39 to 0.58: Scrub logo frames 1 -> 120 (lines -> 3D metallic shine -> flare)
      // - 0.58 to 0.61: Hold frame 120 (flare in pure white)
      //
      // Chapter 3: Process Walkthrough ("How a Direct Sale Works") (progress 0.61 -> 0.94)
      // - 0.61 to 0.64: Transition from white flare into arched hallway (frame 1)
      // - 0.64 to 0.88: Scrub process frames 1 -> 120 (advance through arches into room wall)
      // - 0.88 to 0.94: Hold frame 120 (process wall with 4 steps & CTA prompt)
      //
      // Outro: Unpin into page body (progress 0.94 -> 1.00)
      // ============================================================
      let activeSeq = 'walkthrough';
      let targetFrame = 1;

      if (currentProgress < 0.37) {
        activeSeq = 'walkthrough';
        if (currentProgress <= 0.02) {
          targetFrame = 1;
        } else if (currentProgress >= 0.28) {
          targetFrame = TOTAL_FRAMES_WALKTHROUGH;
        } else {
          const norm = (currentProgress - 0.02) / (0.28 - 0.02);
          targetFrame = Math.min(TOTAL_FRAMES_WALKTHROUGH, Math.max(1, Math.round(norm * (TOTAL_FRAMES_WALKTHROUGH - 1)) + 1));
        }
      } else if (currentProgress < 0.62) {
        activeSeq = 'logo';
        if (currentProgress <= 0.39) {
          targetFrame = 1;
        } else if (currentProgress >= 0.58) {
          targetFrame = TOTAL_FRAMES_LOGO;
        } else {
          const norm = (currentProgress - 0.39) / (0.58 - 0.39);
          targetFrame = Math.min(TOTAL_FRAMES_LOGO, Math.max(1, Math.round(norm * (TOTAL_FRAMES_LOGO - 1)) + 1));
        }
      } else {
        activeSeq = 'process';
        if (currentProgress <= 0.64) {
          targetFrame = 1;
        } else if (currentProgress >= 0.88) {
          targetFrame = TOTAL_FRAMES_PROCESS;
        } else {
          const norm = (currentProgress - 0.64) / (0.88 - 0.64);
          targetFrame = Math.min(TOTAL_FRAMES_PROCESS, Math.max(1, Math.round(norm * (TOTAL_FRAMES_PROCESS - 1)) + 1));
        }
      }

      const key = `${activeSeq}_${activeOrientation}_${targetFrame}`;
      if (displayedKey !== key || needsRedraw) {
        drawFrame(activeSeq, targetFrame, activeOrientation);
        loadNearbyFrames(activeSeq, targetFrame, activeOrientation);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
  }

  // Header visibility helper: remains strictly hidden during hero, reveals fluidly as hero transitions out
  function updateHeaderVisibility(progress, rectBottom) {
    const adminContainer = document.getElementById('portalAdminContainer');
    const isPastHero = (rectBottom <= window.innerHeight * 0.5) || progress >= 0.94;
    if (header) {
      if (isPastHero) {
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
        header.style.transform = 'translateY(0)';
      } else {
        header.style.opacity = '0';
        header.style.pointerEvents = 'none';
        header.style.transform = 'translateY(-10px)';
      }
    }
    if (adminContainer) {
      if (isPastHero) {
        adminContainer.style.opacity = '0';
        adminContainer.style.pointerEvents = 'none';
      } else {
        adminContainer.style.opacity = '1';
        adminContainer.style.pointerEvents = 'auto';
      }
    }
  }

  // Wall interactivity helper: ensures pointer-events are enabled whenever the card is visible
  function updateWallInteractivity(progress) {
    if (progress >= 0.24 && progress <= 0.42) {
      if (wallLayer) {
        wallLayer.classList.add('is-interactive');
        wallLayer.style.pointerEvents = 'auto';
      }
    } else {
      if (wallLayer) {
        wallLayer.classList.remove('is-interactive');
        if (progress < 0.22 || progress > 0.44) {
          wallLayer.style.pointerEvents = 'none';
        }
      }
    }
  }

  // Direct native scroll tracker as absolute guarantee of progress updates
  function updateScrollProgressDirectly() {
    if (!section.isConnected) return;
    const rect = section.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable > 0) {
      const raw = -rect.top / totalScrollable;
      targetProgress = Math.max(0, Math.min(1, raw));
    }

    handleProgressivePreload(targetProgress);
    updateWallInteractivity(targetProgress);
    updateHeaderVisibility(targetProgress, rect.bottom);
  }

  window.addEventListener('scroll', updateScrollProgressDirectly, { passive: true });
  window.addEventListener('resize', () => { needsRedraw = true; }, { passive: true });

  // Direct click handler on Hero Wall CTA button for foolproof responsiveness
  const portalCtaBtn = document.getElementById('portalCtaBtn');
  if (portalCtaBtn) {
    portalCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = document.getElementById('homeOfferSection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const addr = document.getElementById('homeOfferForm_address');
          if (addr) addr.focus();
        }, 500);
      } else {
        window.location.href = '/get-my-offer';
      }
    });
  }

  startRenderLoop();

  // ============================================================
  // MASTER GSAP SCROLLTRIGGER TIMELINE
  // Pins the viewport and choreographs:
  // - Act 1 Walkthrough (0.00 to 0.28)
  // - Milestone 1 Plaster Wall Card (0.28 to 0.35)
  // - Transition 1 White Bloom (0.35 to 0.39)
  // - Act 2 3D Logo Reveal (0.39 to 0.58)
  // - Transition 2 White Bloom (0.58 to 0.64)
  // - Act 3 Process Walkthrough (0.64 to 0.88)
  // - Milestone 3 Process Wall & CTA prompt (0.88 to 0.94)
  // - Unpin into homepage body (0.94 to 1.00)
  // ============================================================
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === section) st.kill();
  });

  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinContainer,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: 0.3,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetProgress = self.progress;
        handleProgressivePreload(self.progress);
        updateWallInteractivity(self.progress);
        updateHeaderVisibility(self.progress, section.getBoundingClientRect().bottom);
      },
      onLeave: () => {
        if (header) {
          header.style.opacity = '1';
          header.style.pointerEvents = 'auto';
          header.style.transform = 'translateY(0)';
        }
      },
      onEnterBack: () => {
        if (header) {
          header.style.opacity = '0';
          header.style.pointerEvents = 'none';
          header.style.transform = 'translateY(-10px)';
        }
      }
    }
  });

  // 1. Initial Prompt fades out on initial scroll
  masterTimeline.to(
    scrollPrompt,
    { opacity: 0, ease: 'power1.out', duration: 0.02 },
    0.02
  );

  // 2. Milestone 1: Wall interactive card fades in as walkthrough reaches the living room wall (0.27 to 0.29)
  masterTimeline.fromTo(
    wallLayer,
    { opacity: 0, pointerEvents: 'none' },
    { opacity: 1, pointerEvents: 'auto', ease: 'power2.out', duration: 0.03 },
    0.28
  );

  // Second scroll prompt hints user to continue scrolling
  if (secondScrollPrompt) {
    masterTimeline.fromTo(
      secondScrollPrompt,
      { opacity: 0 },
      { opacity: 1, ease: 'power1.out', duration: 0.02 },
      0.29
    );
  }

  // 3. Resuming Scroll ("al volver a hacer scroll"):
  // Wall Layer and Second Scroll Prompt fade out (0.35 to 0.37)
  masterTimeline.to(
    wallLayer,
    { opacity: 0, pointerEvents: 'none', ease: 'power2.in', duration: 0.02 },
    0.35
  );
  if (secondScrollPrompt) {
    masterTimeline.to(
      secondScrollPrompt,
      { opacity: 0, ease: 'power1.out', duration: 0.02 },
      0.35
    );
  }

  // 4. White light bloom transition 1: Walkthrough to 3D Logo Reveal (0.35 to 0.39)
  if (lightTransition) {
    masterTimeline.fromTo(
      lightTransition,
      { opacity: 0 },
      { opacity: 1, ease: 'power1.inOut', duration: 0.02 },
      0.35
    );
    masterTimeline.to(
      lightTransition,
      { opacity: 0, ease: 'power1.inOut', duration: 0.02 },
      0.37
    );
  }

  // Vignette management: fade out during pristine studio 3D logo
  if (vignette) {
    masterTimeline.to(
      vignette,
      { opacity: 0, ease: 'power1.inOut', duration: 0.03 },
      0.36
    );
  }

  // 5. White light bloom transition 2: 3D Logo Flare into Process Walkthrough (0.58 to 0.64)
  if (lightTransition) {
    masterTimeline.fromTo(
      lightTransition,
      { opacity: 0 },
      { opacity: 1, ease: 'power1.inOut', duration: 0.025 },
      0.58
    );
    masterTimeline.to(
      lightTransition,
      { opacity: 0, ease: 'power1.inOut', duration: 0.035 },
      0.61
    );
  }

  // Vignette restores subtly during the house process walkthrough
  if (vignette) {
    masterTimeline.to(
      vignette,
      { opacity: 1, ease: 'power1.inOut', duration: 0.03 },
      0.62
    );
  }

  // 6. Milestone 3: Process Wall Hold prompt (0.88 to 0.93)
  if (processPrompt) {
    masterTimeline.fromTo(
      processPrompt,
      { opacity: 0 },
      { opacity: 1, ease: 'power1.out', duration: 0.03 },
      0.88
    );
    masterTimeline.to(
      processPrompt,
      { opacity: 0, ease: 'power1.in', duration: 0.02 },
      0.925
    );
  }

  // 7. Fluid Exit Transition: Ambient daylight & bottom dissolve into the website body (0.92 to 0.985)
  if (bottomDissolve) {
    masterTimeline.fromTo(
      bottomDissolve,
      { opacity: 0 },
      { opacity: 1, ease: 'power2.inOut', duration: 0.06 },
      0.92
    );
  }
  if (exitVeil) {
    masterTimeline.fromTo(
      exitVeil,
      { opacity: 0 },
      { opacity: 0.85, ease: 'power2.inOut', duration: 0.055 },
      0.93
    );
  }
  if (canvas) {
    masterTimeline.fromTo(
      canvas,
      { scale: 1, y: 0 },
      { scale: 1.03, y: -16, ease: 'power1.out', duration: 0.065 },
      0.92
    );
  }

  // 8. Final cushion before releasing pin to the rest of the homepage (0.985 to 1.00)
  masterTimeline.to({}, { duration: 0.015 }, 0.985);

  // Refresh ScrollTrigger after DOM layout stabilizes
  setTimeout(() => {
    ScrollTrigger.refresh();
    updateScrollProgressDirectly();
  }, 100);

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 350);

  // Cleanup handler
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    masterTimeline.kill();
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === section) st.kill();
    });
    window.removeEventListener('scroll', updateScrollProgressDirectly);
    if (mediaWatcher.removeEventListener) {
      mediaWatcher.removeEventListener('change', handleMediaChange);
    }
    if (header) {
      header.style.opacity = '1';
      header.style.pointerEvents = 'auto';
      header.style.transform = 'translateY(0)';
    }
  };
}
