export function renderBeforeAfterSlider() {
  return `
    <div class="w-full my-8 relative flex flex-col items-center">
      <!-- Section Tag & Title (Constrained to max-w-7xl) -->
      <div class="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-8 reveal">
        <span class="text-xs font-mono font-extrabold uppercase tracking-widest text-[#b88a76]">
          [ 03 // THE AS-IS REALITY ]
        </span>
        <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111315] font-['Playfair_Display',serif] mt-2">
          YOU SELL AS-IS <span class="text-[#b88a76]">/</span> WE HANDLE THE REST
        </h2>
        <p class="text-sm text-[#555964] max-w-md mx-auto mt-1 leading-relaxed">
          Drag the slider to see how we purchase homes in any condition without asking you for a single repair.
        </p>
      </div>

      <!-- 100% Full-Width Edge-to-Edge Comparison Viewport -->
      <div class="relative w-full aspect-[16/10] sm:aspect-[21/9] overflow-hidden select-none cursor-ew-resize group" id="beforeAfterContainer">
        <!-- After Image (Background) -->
        <img 
          src="/images/house-after.jpg" 
          alt="Renovated Modern Home" 
          class="absolute inset-0 w-full h-full object-cover" 
        />
        <div class="absolute top-4 right-4 sm:right-8 z-10 bg-[#111315]/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 shadow-md">
          ✨ G&amp;N Renovated Vision
        </div>

        <!-- Before Image (Clipped Foreground) -->
        <div class="absolute inset-0 overflow-hidden" id="beforeImageWrapper" style="width: 50%;">
          <img 
            src="/images/house-before.jpg" 
            alt="As-Is Distressed House" 
            class="absolute inset-0 w-full h-full object-cover max-w-none" 
            id="beforeImageInner"
          />
          <div class="absolute top-4 left-4 sm:left-8 z-10 bg-black/90 text-[#efbba5] text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 shadow-md">
            ⚠️ 100% As-Is Handover
          </div>
        </div>

        <!-- Draggable Divider Line -->
        <div class="absolute inset-y-0 z-20 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)]" id="sliderDivider" style="left: 50%;">
          <!-- Center Handle Button -->
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111315] text-white flex items-center justify-center shadow-2xl border-2 border-white cursor-pointer hover:scale-110 active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-[20px] sm:text-[22px]">code</span>
          </div>
        </div>

        <!-- Bottom Caption Overlay -->
        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white z-10 pointer-events-none">
          <div class="flex flex-col">
            <span class="text-xs font-mono font-bold text-[#efbba5] uppercase">Zero Out-Of-Pocket Expenses</span>
            <span class="text-xs text-gray-200">No roof fixes • No cosmetic updates • No inspection demands</span>
          </div>
          <span class="text-[10px] font-mono uppercase tracking-widest text-white/80 bg-black/50 px-2.5 py-1">
            ↔ Drag Slider to Compare
          </span>
        </div>
      </div>
    </div>
  `;
}

export function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterContainer');
  const beforeWrapper = document.getElementById('beforeImageWrapper');
  const beforeInner = document.getElementById('beforeImageInner');
  const divider = document.getElementById('sliderDivider');

  if (!container || !beforeWrapper || !beforeInner || !divider) return;

  function syncImageWidth() {
    const width = container.offsetWidth;
    beforeInner.style.width = `${width}px`;
  }

  window.addEventListener('resize', syncImageWidth);
  syncImageWidth();

  let isDragging = false;

  function setPosition(xPos) {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    beforeWrapper.style.width = `${percentage}%`;
    divider.style.left = `${percentage}%`;
  }

  function onMouseDown(e) {
    isDragging = true;
    setPosition(e.clientX);
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    setPosition(e.clientX);
  }

  function onMouseUp() {
    isDragging = false;
  }

  function onTouchStart(e) {
    isDragging = true;
    if (e.touches.length > 0) setPosition(e.touches[0].clientX);
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    if (e.touches.length > 0) setPosition(e.touches[0].clientX);
  }

  function onTouchEnd() {
    isDragging = false;
  }

  container.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  container.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd);
}
