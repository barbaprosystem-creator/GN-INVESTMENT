// Production TZEL Tactical Map View for GN Investment CRM
// Clones the exact production map of TZEL (https://tzel.vercel.app)
// Perfectly adapted to 100% of the screen size with fullscreen & import controls

import { crmStore } from '../services/crmStore.js';

export function renderTzelRadarView() {
  return `
    <div class="w-full h-full flex-1 flex flex-col bg-[#0a0d14] relative overflow-hidden animate-fadeIn" id="tzelMapWrapper">
      
      <!-- Slim Tactical Controls Bar (Minimalist 38px to maximize map screen real estate) -->
      <div class="h-10 bg-[#0f141f] border-b border-white/10 px-3 sm:px-5 flex items-center justify-between shrink-0 z-10 text-xs font-mono">
        <div class="flex items-center gap-2.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-white font-bold tracking-wider uppercase text-[11px]">TZEL RADAR TÁCTICO • EN PRODUCCIÓN</span>
          <span class="text-gray-500 hidden lg:inline">•</span>
          <span class="text-gray-400 hidden lg:inline text-[11px]">Subastas Judiciales, Infracciones de Código &amp; Surplus</span>
        </div>

        <div class="flex items-center gap-2">
          <!-- Convert property to Fix & Flip CTA -->
          <button 
            type="button" 
            id="openTzelImporterBtn" 
            class="px-3 py-1 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all shadow-md shadow-[#c5832b]/20 flex items-center gap-1.5 cursor-pointer font-mono"
            title="Importar una propiedad vista en el mapa a la cartera Fix &amp; Flip"
          >
            <span class="material-symbols-outlined text-[15px]">add_home</span>
            <span class="hidden sm:inline">+ Convertir a Fix &amp; Flip</span>
            <span class="sm:hidden">+ Convertir</span>
          </button>

          <!-- Fullscreen Toggle for map -->
          <button 
            type="button" 
            id="fullscreenTzelBtn" 
            class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center" 
            title="Pantalla Completa Inmersiva"
          >
            <span class="material-symbols-outlined text-[16px]" id="fullscreenTzelIcon">fullscreen</span>
          </button>

          <!-- Refresh map button -->
          <button 
            type="button" 
            id="reloadTzelFrameBtn" 
            class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center" 
            title="Recargar Mapa TZEL"
          >
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>

          <!-- Open in new tab -->
          <a 
            href="https://tzel.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center justify-center" 
            title="Abrir en pestaña nueva externa"
          >
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>

      <!-- Live Cloned Production Map Frame (Edge-to-edge 100% screen adaptation) -->
      <div class="flex-1 relative w-full h-full min-h-0 overflow-hidden bg-[#0a0d14]" id="tzelMapFrameContainer">
        <iframe 
          id="tzelProductionFrame"
          src="https://tzel.vercel.app" 
          class="absolute inset-0 w-full h-full border-0 bg-[#0a0d14]"
          allow="geolocation; camera; microphone; fullscreen"
          loading="eager"
          title="TZEL Tactical Map Production"
        ></iframe>
      </div>

      <!-- Modal to Import Deal from TZEL Map to Fix & Flip -->
      <div id="tzelImporterModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#151b26] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span class="material-symbols-outlined text-[#c5832b]">add_home</span>
              <span>CONVERTIR PROPIEDAD DE TZEL A FIX &amp; FLIP</span>
            </h3>
            <button type="button" id="closeTzelImporterModalBtn" class="text-gray-400 hover:text-white cursor-pointer">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="tzelImporterForm" class="space-y-3 text-xs font-mono">
            <div>
              <label class="block text-gray-400 mb-1">Dirección Detectada en el Mapa *</label>
              <input 
                type="text" 
                id="tzelImpAddress" 
                required 
                placeholder="Ej. 2715 W. Kentucky St, Louisville, KY 40211" 
                class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white font-bold focus:border-[#c5832b] focus:outline-none" 
              />
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Título del Proyecto Fix &amp; Flip *</label>
              <input 
                type="text" 
                id="tzelImpTitle" 
                required 
                placeholder="Ej. Kentucky St - Oportunidad Judicial TZEL" 
                class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" 
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Oferta / Precio de Compra ($) *</label>
                <input 
                  type="number" 
                  id="tzelImpPurchasePrice" 
                  required 
                  placeholder="60000" 
                  class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" 
                />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Presupuesto Estimado Rehab ($) *</label>
                <input 
                  type="number" 
                  id="tzelImpRehabBudget" 
                  required 
                  value="45000" 
                  class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" 
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">ARV de Venta MLS ($) *</label>
                <input 
                  type="number" 
                  id="tzelImpTargetArv" 
                  required 
                  placeholder="150000" 
                  class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" 
                />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Gastos de Cierre Estimados ($)</label>
                <input 
                  type="number" 
                  id="tzelImpClosingCosts" 
                  value="3500" 
                  class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Notas del Caso / Expediente</label>
              <textarea 
                id="tzelImpNotes" 
                rows="2" 
                placeholder="Ej. Subasta judicial programada para el 17 de Julio. Deuda bancaria $37,000. Dueño ausente." 
                class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-gray-300 focus:border-[#c5832b] focus:outline-none"
              ></textarea>
            </div>

            <div class="pt-2">
              <button 
                type="submit" 
                class="w-full py-3 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold uppercase rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 cursor-pointer font-mono"
              >
                Crear Proyecto en Cartera Fix &amp; Flip
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

export function initTzelRadarView(callbacks = {}) {
  const openBtn = document.getElementById('openTzelImporterBtn');
  const modal = document.getElementById('tzelImporterModal');
  const closeBtn = document.getElementById('closeTzelImporterModalBtn');
  const form = document.getElementById('tzelImporterForm');
  const reloadBtn = document.getElementById('reloadTzelFrameBtn');
  const iframe = document.getElementById('tzelProductionFrame');
  const fullscreenBtn = document.getElementById('fullscreenTzelBtn');
  const fullscreenIcon = document.getElementById('fullscreenTzelIcon');
  const mapWrapper = document.getElementById('tzelMapWrapper');

  // Reload iframe
  if (reloadBtn && iframe) {
    reloadBtn.addEventListener('click', () => {
      iframe.src = iframe.src;
    });
  }

  // Fullscreen toggle on map wrapper
  if (fullscreenBtn && mapWrapper) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        mapWrapper.requestFullscreen().then(() => {
          if (fullscreenIcon) fullscreenIcon.innerText = 'fullscreen_exit';
        }).catch(() => {});
      } else {
        document.exitFullscreen().then(() => {
          if (fullscreenIcon) fullscreenIcon.innerText = 'fullscreen';
        }).catch(() => {});
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (fullscreenIcon) {
        fullscreenIcon.innerText = document.fullscreenElement ? 'fullscreen_exit' : 'fullscreen';
      }
    });
  }

  // Open modal
  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  }

  // Close modal
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // Autofill title when address changes
  const addrInput = document.getElementById('tzelImpAddress');
  const titleInput = document.getElementById('tzelImpTitle');
  if (addrInput && titleInput) {
    addrInput.addEventListener('input', () => {
      const val = addrInput.value.trim();
      if (val) {
        const shortAddr = val.split(',')[0];
        titleInput.value = `${shortAddr} - Fix & Flip (TZEL)`;
      }
    });
  }

  // Handle Form Submit: Add to Fix & Flip Portfolio
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const address = document.getElementById('tzelImpAddress').value.trim();
      const title = document.getElementById('tzelImpTitle').value.trim() || `${address} - Fix & Flip`;
      const purchasePrice = Number(document.getElementById('tzelImpPurchasePrice').value || 0);
      const rehabBudget = Number(document.getElementById('tzelImpRehabBudget').value || 0);
      const targetArv = Number(document.getElementById('tzelImpTargetArv').value || 0);
      const closingCosts = Number(document.getElementById('tzelImpClosingCosts').value || 3500);
      const notes = document.getElementById('tzelImpNotes').value.trim();

      crmStore.saveProject({
        title,
        address,
        county: 'Jefferson',
        state: 'KY',
        purchasePrice,
        closingCosts,
        rehabBudget,
        targetArv,
        status: 'acquisition',
        acquisitionDate: new Date().toISOString().split('T')[0],
        notes: notes ? `Importado de TZEL: ${notes}` : 'Importado de TZEL Radar Táctico.',
        checklist: [
          { id: 'c1', label: 'Estudio de Título y Gravámenes Judiciales', completed: true },
          { id: 'c2', label: 'Cierre de Compra y Transferencia Deed', completed: false },
          { id: 'c3', label: 'Demolición y Retiro de Escombros', completed: false },
          { id: 'c4', label: 'Permiso y Planos de Obra', completed: false },
          { id: 'c5', label: 'Rehabilitación Integral de Interiores', completed: false }
        ]
      });

      modal.classList.add('hidden');
      alert(`¡Éxito! La propiedad "${address}" ha sido incorporada a tu Cartera de Fix & Flip.`);
      window.location.hash = 'portal/projects';
    });
  }
}
