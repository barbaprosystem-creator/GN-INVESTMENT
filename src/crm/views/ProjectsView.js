// Projects View for Fix & Flip Portfolio
// Barbaprosystem style grid & high-density card view of all real investment properties

import { crmStore } from '../services/crmStore.js';

export function renderProjectsView(currentFilter = 'all') {
  const allProjects = crmStore.getProjects();
  
  const formatMoney = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  const statusColors = {
    acquisition: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    rehab: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    listed: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    sold: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  const statusLabels = {
    acquisition: 'En Adquisición',
    rehab: 'En Obra / Rehab',
    listed: 'En Venta (MLS)',
    sold: 'Vendido'
  };

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-[#c5832b]">home_work</span>
            <span>Cartera de Propiedades Fix & Flip</span>
          </h2>
          <p class="text-xs text-gray-400 mt-0.5">Control de adquisiciones, obras en curso y margen de retorno por inmueble</p>
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          ${allProjects.length > 0 ? `
            <button type="button" id="clearAllProjectsBtn" class="px-3.5 py-2.5 bg-white/5 hover:bg-red-500/15 text-gray-400 hover:text-red-400 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-mono" title="Limpiar todos los proyectos">
              <span class="material-symbols-outlined text-[16px]">delete_sweep</span>
              <span>Limpiar Cartera</span>
            </button>
          ` : `
            <button type="button" id="loadDemoProjectsBtn" class="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-mono">
              <span class="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Cargar Ejemplos</span>
            </button>
          `}
          
          <button type="button" id="newProjectBtn" class="px-4 py-2.5 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 flex items-center gap-1.5 cursor-pointer font-mono">
            <span class="material-symbols-outlined text-[16px]">add_home</span>
            <span>Nueva Propiedad</span>
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <!-- Status Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-mono pb-1 md:pb-0" id="projectStatusFilters">
          <button type="button" class="proj-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'all' ? 'bg-[#c5832b] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="all">
            Todos (${allProjects.length})
          </button>
          <button type="button" class="proj-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'rehab' ? 'bg-[#c5832b] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="rehab">
            En Obra (${allProjects.filter(p => p.status === 'rehab').length})
          </button>
          <button type="button" class="proj-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'acquisition' ? 'bg-[#c5832b] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="acquisition">
            Adquisición (${allProjects.filter(p => p.status === 'acquisition').length})
          </button>
          <button type="button" class="proj-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'listed' ? 'bg-[#c5832b] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="listed">
            En Venta (${allProjects.filter(p => p.status === 'listed').length})
          </button>
          <button type="button" class="proj-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'sold' ? 'bg-[#c5832b] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="sold">
            Vendidos (${allProjects.filter(p => p.status === 'sold').length})
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-72">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
          <input 
            type="text" 
            id="searchProjectsInput" 
            placeholder="Buscar por dirección o título..." 
            class="w-full pl-9 pr-4 py-2 bg-[#0d1219] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5832b] font-mono"
          />
        </div>
      </div>

      <!-- Property Grid / Empty State -->
      ${allProjects.length === 0 ? `
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-10 text-center space-y-4 shadow-xl">
          <div class="w-16 h-16 rounded-full bg-[#c5832b]/10 text-[#d4a56e] flex items-center justify-center mx-auto">
            <span class="material-symbols-outlined text-[32px]">home_work</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white font-mono">No Hay Propiedades en Cartera</h3>
            <p class="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              Comienza registrando tu primera adquisición Fix & Flip o convierte un lead entrante de vendedor directo capturado por la web.
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
            <button type="button" id="zeroNewProjectBtn" class="px-4 py-2.5 bg-[#c5832b] hover:bg-[#d89136] text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">add_home</span>
              <span>Registrar Primera Propiedad</span>
            </button>
            <a href="#portal/leads" class="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/20 rounded-xl font-bold transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">contact_phone</span>
              <span>Ver Leads Entrantes</span>
            </a>
            <button type="button" id="zeroLoadDemoBtn" class="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Cargar Ejemplos</span>
            </button>
          </div>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projectsGrid">
          ${allProjects.map(p => {
            const fin = crmStore.computeProjectFinancials(p.id);
            const progressPct = fin && fin.rehabBudget > 0 ? Math.min(100, Math.round((fin.totalRehabSpent / fin.rehabBudget) * 100)) : 0;

            return `
              <div class="bg-[#151a24] border border-white/10 hover:border-[#c5832b]/50 rounded-2xl overflow-hidden shadow-xl transition-all cursor-pointer group flex flex-col open-project-btn" data-project-id="${p.id}" data-status="${p.status}">
                <!-- Property Image Header -->
                <div class="relative h-44 w-full bg-[#0a0d14] overflow-hidden">
                  <img 
                    src="${p.coverImage || '/images/hero-clean-house.jpg'}" 
                    alt="${p.title}" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#151a24] via-transparent to-black/30"></div>
                  
                  <div class="absolute top-3 left-3 flex items-center gap-1.5">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${statusColors[p.status] || 'bg-gray-800 text-gray-300'}">
                      ${statusLabels[p.status] || p.status}
                    </span>
                  </div>

                  <div class="absolute top-3 right-3">
                    <span class="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10">
                      ${p.projectNumber}
                    </span>
                  </div>

                  <div class="absolute bottom-2 left-3 right-3 text-white">
                    <h3 class="text-sm font-bold truncate group-hover:text-[#c5832b] transition-colors">${p.title}</h3>
                    <div class="text-[11px] text-gray-300 truncate flex items-center gap-1">
                      <span class="material-symbols-outlined text-[13px] text-[#c5832b]">location_on</span>
                      <span>${p.address}</span>
                    </div>
                  </div>
                </div>

                <!-- Financial Metrics Grid -->
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div class="p-2.5 bg-[#0e1219] rounded-xl border border-white/5">
                      <span class="text-[10px] text-gray-400 block uppercase">Compra</span>
                      <strong class="text-white text-sm">${formatMoney(p.purchasePrice)}</strong>
                    </div>
                    <div class="p-2.5 bg-[#0e1219] rounded-xl border border-white/5">
                      <span class="text-[10px] text-gray-400 block uppercase">ARV Objetivo</span>
                      <strong class="text-white text-sm">${formatMoney(p.targetArv)}</strong>
                    </div>
                    <div class="p-2.5 bg-[#0e1219] rounded-xl border border-white/5">
                      <span class="text-[10px] text-gray-400 block uppercase">Gastado Rehab</span>
                      <strong class="text-amber-400 text-sm">${formatMoney(fin ? fin.totalRehabSpent : 0)}</strong>
                    </div>
                    <div class="p-2.5 bg-[#0e1219] rounded-xl border border-white/5">
                      <span class="text-[10px] text-gray-400 block uppercase">Ganancia Neta</span>
                      <strong class="${fin && fin.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'} text-sm font-bold">
                        ${formatMoney(fin ? fin.netProfit : 0)}
                      </strong>
                    </div>
                  </div>

                  <!-- Progress Bar Rehab -->
                  <div>
                    <div class="flex items-center justify-between text-[11px] font-mono mb-1 text-gray-400">
                      <span>Presupuesto Rehab: ${formatMoney(p.rehabBudget)}</span>
                      <span class="${progressPct > 100 ? 'text-red-400 font-bold' : 'text-gray-300'}">${progressPct}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div class="h-full rounded-full transition-all ${progressPct > 100 ? 'bg-red-500' : 'bg-[#c5832b]'}" style="width: ${progressPct}%"></div>
                    </div>
                  </div>

                  <!-- Card Footer Action -->
                  <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                    <span class="flex items-center gap-1 text-[11px]">
                      <span class="material-symbols-outlined text-[14px]">receipt_long</span>
                      <span>${fin ? fin.expenseCount : 0} facturas</span>
                    </span>
                    <span class="text-[#c5832b] font-bold group-hover:underline flex items-center gap-0.5">
                      <span>Ver Detalles</span>
                      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
                    </span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}

      <!-- Add New Property Modal -->
      <div id="newProjectModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#151b26] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span class="material-symbols-outlined text-[#c5832b]">add_home</span>
              <span>REGISTRAR NUEVA PROPIEDAD FIX & FLIP</span>
            </h3>
            <button type="button" id="closeNewProjModalBtn" class="text-gray-400 hover:text-white cursor-pointer">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="newProjectForm" class="space-y-3 text-xs font-mono">
            <div>
              <label class="block text-gray-400 mb-1">Título del Proyecto / Nombre *</label>
              <input type="text" id="newProjTitle" required placeholder="Ej. 1824 S 4th St - Historic Renovation" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Dirección Completa *</label>
              <input type="text" id="newProjAddress" required placeholder="Ej. 1824 S 4th St, Louisville, KY 40208" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Precio de Compra ($) *</label>
                <input type="number" id="newProjPurchase" required placeholder="55000" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Gastos Cierre ($)</label>
                <input type="number" id="newProjClosing" value="3000" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Presupuesto Rehab ($) *</label>
                <input type="number" id="newProjRehab" required placeholder="45000" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">ARV Estimado de Venta ($) *</label>
                <input type="number" id="newProjArv" required placeholder="175000" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold text-emerald-400" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block text-gray-400 mb-1">Habitaciones</label>
                <input type="number" id="newProjBeds" value="3" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Baños</label>
                <input type="number" id="newProjBaths" step="0.5" value="2" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Sqft</label>
                <input type="number" id="newProjSqft" value="1350" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Estado Inicial</label>
              <select id="newProjStatus" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                <option value="acquisition">En Adquisición</option>
                <option value="rehab" selected>En Remodelación / Rehab</option>
                <option value="listed">En Venta</option>
              </select>
            </div>

            <div class="pt-3">
              <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold uppercase rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 cursor-pointer">
                Crear Propiedad en Portafolio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initProjectsView(callbacks = {}) {
  const filterBtns = document.querySelectorAll('.proj-filter-btn');
  const searchInput = document.getElementById('searchProjectsInput');
  const projectCards = document.querySelectorAll('.open-project-btn');
  const newProjBtn = document.getElementById('newProjectBtn');
  const zeroNewProjBtn = document.getElementById('zeroNewProjectBtn');
  const newProjModal = document.getElementById('newProjectModal');
  const closeNewProjBtn = document.getElementById('closeNewProjModalBtn');
  const newProjForm = document.getElementById('newProjectForm');

  const clearAllBtn = document.getElementById('clearAllProjectsBtn');
  const loadDemoBtn = document.getElementById('loadDemoProjectsBtn');
  const zeroLoadDemoBtn = document.getElementById('zeroLoadDemoBtn');

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (confirm('¿Deseas vaciar la cartera y gastos para tener una base de datos 100% limpia?')) {
        crmStore.clearAllData();
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  }

  const handleLoadDemo = () => {
    crmStore.resetToDemo();
    if (callbacks.onRefresh) callbacks.onRefresh();
  };

  if (loadDemoBtn) loadDemoBtn.addEventListener('click', handleLoadDemo);
  if (zeroLoadDemoBtn) zeroLoadDemoBtn.addEventListener('click', handleLoadDemo);

  // Filter by status buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#c5832b]', 'text-white');
        b.classList.add('bg-white/5', 'text-gray-400');
      });
      btn.classList.add('bg-[#c5832b]', 'text-white');
      btn.classList.remove('bg-white/5', 'text-gray-400');

      projectCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        if (filter === 'all' || cardStatus === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      projectCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // Open Project Detail Modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      if (projId && callbacks.onOpenProjectDetail) {
        callbacks.onOpenProjectDetail(projId);
      }
    });
  });

  // Open/Close New Project Modal
  const openModal = () => {
    if (newProjModal) newProjModal.classList.remove('hidden');
  };

  if (newProjBtn) newProjBtn.addEventListener('click', openModal);
  if (zeroNewProjBtn) zeroNewProjBtn.addEventListener('click', openModal);

  if (closeNewProjBtn && newProjModal) {
    closeNewProjBtn.addEventListener('click', () => {
      newProjModal.classList.add('hidden');
    });
  }

  // Submit New Project Form
  if (newProjForm) {
    newProjForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('newProjTitle').value.trim();
      const address = document.getElementById('newProjAddress').value.trim();
      const purchasePrice = Number(document.getElementById('newProjPurchase').value || 0);
      const closingCosts = Number(document.getElementById('newProjClosing').value || 0);
      const rehabBudget = Number(document.getElementById('newProjRehab').value || 0);
      const targetArv = Number(document.getElementById('newProjArv').value || 0);
      const beds = Number(document.getElementById('newProjBeds').value || 3);
      const baths = Number(document.getElementById('newProjBaths').value || 2);
      const sqft = Number(document.getElementById('newProjSqft').value || 1200);
      const status = document.getElementById('newProjStatus').value;

      crmStore.saveProject({
        title,
        address,
        county: 'Jefferson',
        state: 'KY',
        purchasePrice,
        closingCosts,
        rehabBudget,
        targetArv,
        beds,
        baths,
        sqft,
        status,
        holdingBudget: 3000,
        actualSalePrice: 0,
        acquisitionDate: new Date().toISOString().split('T')[0],
        coverImage: '/images/hero-clean-house.jpg',
        checklist: [
          { id: 'c1', label: 'Inspección de obra y presupuesto final', completed: false },
          { id: 'c2', label: 'Permisos Louisville Metro', completed: false },
          { id: 'c3', label: 'Demolición y limpieza', completed: false },
          { id: 'c4', label: 'Rough-in Plomería & Electricidad', completed: false },
          { id: 'c5', label: 'Drywall, acabados y pintura', completed: false },
          { id: 'c6', label: 'Inspección final de habitabilidad', completed: false }
        ]
      });

      if (newProjModal) newProjModal.classList.add('hidden');
      alert(`Propiedad "${title}" agregada con éxito al portafolio.`);
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  }
}
