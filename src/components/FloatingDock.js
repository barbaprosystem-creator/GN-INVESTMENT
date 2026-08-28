export function renderFloatingDock() {
  const dockItems = [
    {
      id: "home",
      label: "Home",
      icon: "home",
      href: "#home",
      nav: "home",
      isPrimary: false
    },
    {
      id: "how-it-works",
      label: "Process",
      icon: "timeline",
      href: "#how-it-works",
      nav: "how-it-works",
      isPrimary: false
    },
    {
      id: "get-offer",
      label: "Get Cash Offer",
      icon: "local_offer",
      href: "#get-offer",
      nav: "get-offer",
      isPrimary: true
    },
    {
      id: "situations",
      label: "Situations",
      icon: "domain",
      href: "#situations",
      nav: "situations",
      isPrimary: false
    },
    {
      id: "about",
      label: "About Us",
      icon: "info",
      href: "#about",
      nav: "about",
      isPrimary: false
    },
    {
      id: "call",
      label: "(502) 800-SELL",
      icon: "call",
      href: "tel:5028007355",
      nav: null,
      isPrimary: false,
      isPhone: true
    }
  ];

  return `
    <!-- Floating Luxury Dock (Dock-Two System - Centered at Bottom) -->
    <nav class="fixed bottom-3 sm:bottom-6 inset-x-0 mx-auto w-fit z-50 flex justify-center items-center pointer-events-auto max-w-[95vw]" id="floatingDockNav" aria-label="Floating Navigation Dock">
      <div class="dock-container flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-2xl border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_20px_rgba(184,138,118,0.1)] transition-all select-none">
        
        ${dockItems.map((item) => `
          <div class="dock-item-wrapper relative flex flex-col items-center group">
            
            <!-- Tooltip Label (Floating on Hover) -->
            <div class="dock-tooltip absolute -top-9 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:-translate-y-1 bg-[#111315] text-[#efbba5] text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg border border-black/20 shadow-xl whitespace-nowrap z-30">
              ${item.label}
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111315]"></div>
            </div>

            <!-- Dock Icon Button -->
            <a 
              href="${item.href}" 
              ${item.nav ? `data-nav="${item.nav}"` : ''} 
              data-dock-id="${item.id}"
              class="dock-item flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-150 relative cursor-pointer ${
                item.isPrimary 
                  ? 'bg-[#111315] text-white font-bold shadow-md shadow-black/20 border border-black/20' 
                  : 'bg-black/5 hover:bg-black/10 text-gray-700 hover:text-black border border-black/5'
              }"
              aria-label="${item.label}"
            >
              <span class="material-symbols-outlined text-[20px] sm:text-[22px] pointer-events-none">
                ${item.icon}
              </span>

              <!-- Active Status Indicator Dot -->
              <span class="dock-active-dot absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#b88a76] opacity-0 transition-opacity"></span>
            </a>
          </div>
        `).join('')}

      </div>
    </nav>
  `;
}

export function initFloatingDock() {
  const dockNav = document.getElementById('floatingDockNav');
  const container = dockNav ? dockNav.querySelector('.dock-container') : null;
  const items = dockNav ? dockNav.querySelectorAll('.dock-item') : [];

  if (!container || items.length === 0) return;

  // Magnification Physics Curve (Desktop Mouse Move)
  function onMouseMove(e) {
    if (window.innerWidth < 768) return; // Disable magnification on mobile touch

    const mouseX = e.clientX;
    const maxScale = 1.32;
    const minScale = 1.0;
    const radius = 130;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - itemCenter);

      if (dist < radius) {
        const scale = minScale + (maxScale - minScale) * Math.cos((dist / radius) * (Math.PI / 2));
        item.style.transform = `scale(${scale}) translateY(-${(scale - 1) * 14}px)`;
      } else {
        item.style.transform = 'scale(1) translateY(0)';
      }
    });
  }

  function onMouseLeave() {
    items.forEach((item) => {
      item.style.transform = 'scale(1) translateY(0)';
    });
  }

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', onMouseLeave);

  // Update Active Route Dot
  function updateActiveDockDot(route) {
    items.forEach((item) => {
      const dockId = item.getAttribute('data-dock-id');
      const dot = item.querySelector('.dock-active-dot');
      const isCurrent = dockId === route || (route === '' && dockId === 'home');

      if (dot) {
        dot.style.opacity = isCurrent ? '1' : '0';
      }

      if (isCurrent && !item.classList.contains('bg-gradient-to-tr')) {
        item.classList.add('border-[#efbba5]/60', 'text-[#efbba5]');
      } else if (!item.classList.contains('bg-gradient-to-tr')) {
        item.classList.remove('border-[#efbba5]/60', 'text-[#efbba5]');
      }
    });
  }

  window.updateActiveDockDot = updateActiveDockDot;

  // Initial Sync
  const currentHash = window.location.hash.replace('#', '') || 'home';
  updateActiveDockDot(currentHash);
}
