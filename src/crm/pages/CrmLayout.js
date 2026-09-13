// Main CRM Layout for GN Investment Fix & Flip Management
// 100% Real-World Store: Leads Web, Fix & Flip Portfolio, Expense Accounting & Production TZEL Radar
// Features instant backup & restore via JSON, live new-leads badges, and fluid navigation

import { authService } from '../services/authService.js';
import { crmStore } from '../services/crmStore.js';
import { renderDashboardView, initDashboardView } from '../views/DashboardView.js';
import { renderLeadsView, initLeadsView } from '../views/LeadsView.js';
import { renderProjectsView, initProjectsView } from '../views/ProjectsView.js';
import { renderProjectDetailModal, initProjectDetailModal } from '../views/ProjectDetailModal.js';
import { renderExpensesView, initExpensesView } from '../views/ExpensesView.js';
import { renderTzelRadarView, initTzelRadarView } from '../views/TzelRadarView.js';
import { renderSecurityModal, initSecurityModal } from '../views/SecurityModal.js';

export function renderCrmLayout(activeTab = 'dashboard') {
  const user = authService.getCurrentUser() || { name: 'Operador GN', role: 'admin', avatar: 'GN' };
  const projects = crmStore.getProjects();
  const metrics = crmStore.getGlobalMetrics();

  const tabLabels = {
    dashboard: 'Dashboard Ejecutivo',
    leads: 'Leads Web Entrantes',
    projects: 'Cartera Fix & Flip',
    expenses: 'Control de Gastos & Facturas',
    tzel: 'Mapa Táctico TZEL (Producción)'
  };

  const currentTabLabel = tabLabels[activeTab] || 'Dashboard Ejecutivo';

  return `
    <div class="min-h-screen bg-[#0a0d14] text-[#e6edf3] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <!-- Layout Wrapper -->
      <div class="flex-1 flex flex-col md:flex-row min-h-screen">
        
        <!-- SIDEBAR -->
        <aside id="crmSidebar" class="w-64 shrink-0 bg-[#0f141f] border-r border-white/10 flex flex-col justify-between hidden md:flex z-30">
          <div>
            <!-- Sidebar Header Brand -->
            <div class="h-20 px-6 flex items-center gap-3 border-b border-white/10">
              <img src="/images/gn-logo-transparent.png" alt="GN Logo" class="h-9 w-auto object-contain" />
              <div>
                <span class="text-sm font-black tracking-tight text-white block">GN INVESTMENT</span>
                <span class="text-[9px] font-mono tracking-widest uppercase text-[#c5832b] font-bold">FIX &amp; FLIP CRM</span>
              </div>
            </div>

            <!-- Navigation Links -->
            <nav class="p-4 space-y-1.5 font-mono text-xs">
              <a href="#portal/dashboard" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-[#c5832b] text-white shadow-md shadow-[#c5832b]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                <span class="material-symbols-outlined text-[18px]">dashboard</span>
                <span>Dashboard</span>
              </a>

              <!-- Inbound Web Leads -->
              <a href="#portal/leads" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-colors ${activeTab === 'leads' ? 'bg-[#c5832b] text-white shadow-md shadow-[#c5832b]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                <span class="material-symbols-outlined text-[18px]">contact_phone</span>
                <span>Leads Web</span>
                ${metrics.newLeadsCount > 0 ? `
                  <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold animate-pulse">${metrics.newLeadsCount} nuevo${metrics.newLeadsCount > 1 ? 's' : ''}</span>
                ` : `
                  <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-gray-400 font-bold">${metrics.totalLeadsCount}</span>
                `}
              </a>

              <a href="#portal/projects" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-colors ${activeTab === 'projects' ? 'bg-[#c5832b] text-white shadow-md shadow-[#c5832b]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                <span class="material-symbols-outlined text-[18px]">home_work</span>
                <span>Cartera Fix & Flip</span>
                <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-gray-300 font-bold">${projects.length}</span>
              </a>

              <a href="#portal/expenses" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-colors ${activeTab === 'expenses' ? 'bg-[#c5832b] text-white shadow-md shadow-[#c5832b]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>Control de Gastos</span>
              </a>

              <a href="#portal/tzel" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-colors ${activeTab === 'tzel' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                <span class="material-symbols-outlined text-[18px] text-emerald-400">map</span>
                <span>Mapa Táctico TZEL</span>
                <span class="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Mapa TZEL en Producción"></span>
              </a>
            </nav>

            <!-- Quick Add Expense CTA -->
            <div class="px-4 pt-1">
              <button type="button" id="sidebarAddExpenseBtn" class="w-full py-2.5 px-3 bg-gradient-to-r from-[#c5832b]/20 to-[#b87333]/20 hover:from-[#c5832b]/30 hover:to-[#b87333]/30 text-[#d4a56e] border border-[#c5832b]/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono">
                <span class="material-symbols-outlined text-[16px]">add_circle</span>
                <span>+ Registrar Gasto</span>
              </button>
            </div>
          </div>

          <!-- Database Backup & User Info -->
          <div>
            <!-- Database Backup & Restore Controls -->
            <div class="px-4 py-3 border-t border-white/5 font-mono text-[11px] space-y-2">
              <div class="flex items-center justify-between text-[9px] uppercase tracking-wider text-gray-500 font-bold px-1">
                <span>Base de Datos</span>
                <span class="text-emerald-400 font-normal">Local 0ms</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" id="sidebarExportDbBtn" class="py-1.5 px-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer" title="Descargar copia de seguridad en archivo .json">
                  <span class="material-symbols-outlined text-[13px]">download</span>
                  <span>Respaldar</span>
                </button>
                <button type="button" id="sidebarImportDbBtn" class="py-1.5 px-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer" title="Cargar y restaurar base de datos desde un archivo .json">
                  <span class="material-symbols-outlined text-[13px]">upload</span>
                  <span>Restaurar</span>
                </button>
              </div>
              <input type="file" id="sidebarImportDbFileInput" accept=".json" class="hidden" />
            </div>

            <!-- User Info & Logout -->
            <div class="p-4 border-t border-white/10 bg-[#0c1017]">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#c5832b] to-[#9b5d21] text-white font-bold flex items-center justify-center text-xs shadow-md shrink-0">
                  ${user.avatar || 'OP'}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-white truncate">${user.name}</div>
                  <div class="text-[10px] text-gray-400 font-mono truncate">${user.title || (user.role === 'admin' ? 'Inversiones GN' : 'Supervisor')}</div>
                </div>
                <button type="button" id="sidebarSecurityBtn" class="p-1.5 rounded-lg bg-white/5 hover:bg-[#c5832b]/20 text-gray-400 hover:text-amber-400 transition-colors cursor-pointer" title="Configurar Usuario y Contraseña">
                  <span class="material-symbols-outlined text-[16px]">settings</span>
                </button>
              </div>

              <div class="flex items-center gap-2">
                <a href="#home" class="flex-1 py-1.5 px-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 font-mono" title="Ver sitio web de cara a clientes">
                  <span class="material-symbols-outlined text-[14px]">public</span>
                  <span>Sitio Web</span>
                </a>
                <button type="button" id="sidebarLogoutBtn" class="py-1.5 px-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 font-mono cursor-pointer" title="Cerrar Sesión">
                  <span class="material-symbols-outlined text-[14px]">logout</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- MAIN BODY -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          <!-- TOPBAR -->
          <header class="h-16 sm:h-20 bg-[#0f141f]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between z-20 shrink-0">
            <div class="flex items-center gap-3">
              <!-- Mobile menu toggle -->
              <button type="button" id="mobileMenuToggleBtn" class="md:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white" aria-label="Toggle navigation">
                <span class="material-symbols-outlined text-[20px]">menu</span>
              </button>

              <!-- Desktop Sidebar Toggle -->
              <button type="button" id="toggleSidebarDesktopBtn" class="hidden md:flex p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer" title="Expandir/Contraer Menú Lateral">
                <span class="material-symbols-outlined text-[20px]" id="toggleSidebarIcon">menu_open</span>
              </button>

              <div>
                <div class="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <span class="hidden sm:inline">GN Investment CRM</span>
                  <span class="material-symbols-outlined text-[12px] hidden sm:inline">chevron_right</span>
                  <span class="text-[#c5832b] font-bold">${currentTabLabel}</span>
                </div>
              </div>
            </div>

            <!-- Topbar Right Actions -->
            <div class="flex items-center gap-2.5 sm:gap-3">
              <!-- Live TZEL indicator -->
              <a href="https://tzel.vercel.app" target="_blank" rel="noopener noreferrer" class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Abrir TZEL en nueva pestaña">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>TZEL Live</span>
                <span class="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>

              <a href="#home" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono rounded-xl border border-white/10 transition-colors">
                <span class="material-symbols-outlined text-[15px]">arrow_outward</span>
                <span>Web Pública</span>
              </a>

              <!-- Security & Credentials Button -->
              <button type="button" id="topbarSecurityBtn" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-amber-400 border border-white/10 transition-colors cursor-pointer" title="Configurar Usuario y Contraseña">
                <span class="material-symbols-outlined text-[18px]">manage_accounts</span>
              </button>

              <button type="button" id="topbarLogoutBtn" class="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer" title="Cerrar Sesión">
                <span class="material-symbols-outlined text-[18px]">power_settings_new</span>
              </button>
            </div>
          </header>

          <!-- CONTENT AREA -->
          <main class="flex-1 ${activeTab === 'tzel' ? 'p-0 overflow-hidden flex flex-col h-full min-h-0' : 'p-4 sm:p-8 overflow-y-auto'}" id="crmContent">
            ${activeTab === 'leads' ? renderLeadsView() :
              activeTab === 'projects' ? renderProjectsView() :
              activeTab === 'expenses' ? renderExpensesView() :
              activeTab === 'tzel' ? renderTzelRadarView() :
              renderDashboardView()}
          </main>

        </div>

      </div>

      <!-- Mobile Navigation Drawer Overlay -->
      <div id="mobileDrawerOverlay" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
        <div class="w-72 h-full bg-[#0f141f] border-r border-white/10 p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div class="flex items-center gap-2">
                <img src="/images/gn-logo-transparent.png" alt="GN Logo" class="h-8 w-auto" />
                <span class="font-bold text-white text-xs font-mono">FIX &amp; FLIP CRM</span>
              </div>
              <button type="button" id="closeMobileDrawerBtn" class="text-gray-400 hover:text-white">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav class="space-y-1 text-xs font-mono">
              <a href="#portal/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold ${activeTab === 'dashboard' ? 'bg-[#c5832b] text-white' : 'text-gray-400 hover:text-white'}">
                <span class="material-symbols-outlined text-[18px]">dashboard</span>
                <span>Dashboard</span>
              </a>
              <a href="#portal/leads" class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold ${activeTab === 'leads' ? 'bg-[#c5832b] text-white' : 'text-gray-400 hover:text-white'}">
                <span class="material-symbols-outlined text-[18px]">contact_phone</span>
                <span>Leads Web</span>
                ${metrics.newLeadsCount > 0 ? `<span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold">${metrics.newLeadsCount}</span>` : ''}
              </a>
              <a href="#portal/projects" class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold ${activeTab === 'projects' ? 'bg-[#c5832b] text-white' : 'text-gray-400 hover:text-white'}">
                <span class="material-symbols-outlined text-[18px]">home_work</span>
                <span>Cartera Fix & Flip</span>
                <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-gray-300 font-bold">${projects.length}</span>
              </a>
              <a href="#portal/expenses" class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold ${activeTab === 'expenses' ? 'bg-[#c5832b] text-white' : 'text-gray-400 hover:text-white'}">
                <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>Control de Gastos</span>
              </a>
              <a href="#portal/tzel" class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold ${activeTab === 'tzel' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}">
                <span class="material-symbols-outlined text-[18px]">map</span>
                <span>Mapa Táctico TZEL</span>
              </a>
            </nav>
          </div>

          <div class="pt-4 border-t border-white/10 space-y-2 font-mono text-xs">
            <button type="button" id="mobileDrawerSecurityBtn" class="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">manage_accounts</span>
              <span>Configurar Usuario y Clave</span>
            </button>
            <a href="#home" class="block w-full text-center py-2 bg-white/5 rounded-xl text-gray-300">Ir al Sitio Web</a>
            <button type="button" id="mobileDrawerLogoutBtn" class="block w-full text-center py-2 bg-red-500/10 text-red-400 rounded-xl cursor-pointer">Cerrar Sesión</button>
          </div>
        </div>
      </div>

      <!-- Container for Project Detail Modal -->
      <div id="modalContainer"></div>

      <!-- Global Add Expense Modal for Quick Action -->
      <div id="globalAddExpenseModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#151b26] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-400">add_card</span>
              <span>REGISTRAR GASTO / FACTURA</span>
            </h3>
            <button type="button" id="closeGlobalExpenseModalBtn" class="text-gray-400 hover:text-white cursor-pointer">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="globalAddExpenseForm" class="space-y-3 text-xs font-mono">
            <div>
              <label class="block text-gray-400 mb-1">Propiedad Asignada *</label>
              <select id="globalExpProperty" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                ${projects.length === 0 ? `
                  <option value="general">Gasto General GN (Sin Proyecto Asignado)</option>
                ` : `
                  ${projects.map(p => `<option value="${p.id}">${p.projectNumber} - ${p.title}</option>`).join('')}
                  <option value="general">Gasto General GN (Sin Proyecto Asignado)</option>
                `}
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Categoría *</label>
                <select id="globalExpCategory" required class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                  <option value="material">Materiales (Madera/Pisos/Drywall)</option>
                  <option value="labor">Mano de Obra / Cuadrilla</option>
                  <option value="permit">Permisos Municipales</option>
                  <option value="holding">Holding (Luz LG&E/Agua/Seguro)</option>
                  <option value="closing">Gastos de Cierre / Título</option>
                  <option value="other">Otros Imprevistos</option>
                </select>
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Monto en Dólares ($) *</label>
                <input type="number" step="0.01" id="globalExpAmount" required placeholder="Ej. 1450.50" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Proveedor / Facturador *</label>
                <input type="text" id="globalExpVendor" required placeholder="Ej. Home Depot, 84 Lumber" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Fecha del Gasto *</label>
                <input type="date" id="globalExpDate" required value="${new Date().toISOString().split('T')[0]}" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Método de Pago</label>
              <select id="globalExpPaymentMethod" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                <option value="Tarjeta Corporativa GN">Tarjeta Corporativa GN</option>
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="Cheque GN">Cheque GN</option>
                <option value="Cuenta Comercial Proveedor">Cuenta Comercial Proveedor</option>
                <option value="Efectivo / Recibo Firmado">Efectivo / Recibo Firmado</option>
              </select>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Concepto o Materiales Adquiridos</label>
              <textarea id="globalExpDescription" rows="2" placeholder="Ej. 40 láminas de Drywall 1/2 y 4 cajas de tornillos..." class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none"></textarea>
            </div>

            <div class="pt-3">
              <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold uppercase rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 cursor-pointer">
                Guardar Gasto en Libro Mayor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initCrmLayout(activeTab = 'dashboard', callbacks = {}) {
  // Logout handler
  const handleLogout = () => {
    if (confirm('¿Deseas cerrar la sesión del CRM?')) {
      authService.logout();
      window.location.hash = 'home';
      if (callbacks.onLogout) callbacks.onLogout();
    }
  };

  const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
  const topbarLogoutBtn = document.getElementById('topbarLogoutBtn');
  const mobileDrawerLogoutBtn = document.getElementById('mobileDrawerLogoutBtn');

  if (sidebarLogoutBtn) sidebarLogoutBtn.addEventListener('click', handleLogout);
  if (topbarLogoutBtn) topbarLogoutBtn.addEventListener('click', handleLogout);
  if (mobileDrawerLogoutBtn) mobileDrawerLogoutBtn.addEventListener('click', handleLogout);

  // Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobileMenuToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawerOverlay');
  const closeDrawerBtn = document.getElementById('closeMobileDrawerBtn');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => mobileDrawer.classList.remove('hidden'));
  }
  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => mobileDrawer.classList.add('hidden'));
  }

  // Desktop Sidebar Toggle (Full width for map)
  const toggleSidebarBtn = document.getElementById('toggleSidebarDesktopBtn');
  const sidebar = document.getElementById('crmSidebar');
  const toggleIcon = document.getElementById('toggleSidebarIcon');
  if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
      if (toggleIcon) {
        const isHidden = sidebar.classList.contains('hidden');
        toggleIcon.innerText = isHidden ? 'menu' : 'menu_open';
      }
    });
  }

  // Database Backup (Export JSON)
  const exportDbBtn = document.getElementById('sidebarExportDbBtn');
  if (exportDbBtn) {
    exportDbBtn.addEventListener('click', () => {
      crmStore.exportDatabase();
    });
  }

  // Database Restore (Import JSON)
  const importDbBtn = document.getElementById('sidebarImportDbBtn');
  const importDbFileInput = document.getElementById('sidebarImportDbFileInput');
  if (importDbBtn && importDbFileInput) {
    importDbBtn.addEventListener('click', () => {
      importDbFileInput.click();
    });

    importDbFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const result = crmStore.importDatabase(event.target.result);
          if (result.success) {
            alert(`¡Base de datos restaurada con éxito!\n- ${result.projectsCount} propiedades\n- ${result.expensesCount} gastos\n- ${result.leadsCount} leads de vendedores.`);
            if (callbacks.onRefresh) callbacks.onRefresh();
          } else {
            alert(`Error al importar: ${result.error}`);
          }
        } catch (err) {
          alert(`Error procesando archivo JSON: ${err.message}`);
        }
      };
      reader.readAsText(file);
      // Reset input value so same file can be selected again if desired
      importDbFileInput.value = '';
    });
  }

  // Global Add Expense Modal
  const globalExpModal = document.getElementById('globalAddExpenseModal');
  const sidebarAddBtn = document.getElementById('sidebarAddExpenseBtn');
  const closeGlobalExpBtn = document.getElementById('closeGlobalExpenseModalBtn');
  const globalExpForm = document.getElementById('globalAddExpenseForm');

  const openGlobalExpense = (preselectedProjId = null) => {
    if (!globalExpModal) return;
    if (preselectedProjId) {
      const select = document.getElementById('globalExpProperty');
      if (select) select.value = preselectedProjId;
    }
    globalExpModal.classList.remove('hidden');
  };

  if (sidebarAddBtn) sidebarAddBtn.addEventListener('click', () => openGlobalExpense());
  if (closeGlobalExpBtn && globalExpModal) {
    closeGlobalExpBtn.addEventListener('click', () => globalExpModal.classList.add('hidden'));
  }

  if (globalExpForm) {
    globalExpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const projectId = document.getElementById('globalExpProperty').value;
      const category = document.getElementById('globalExpCategory').value;
      const amount = Number(document.getElementById('globalExpAmount').value || 0);
      const vendor = document.getElementById('globalExpVendor').value.trim();
      const date = document.getElementById('globalExpDate').value;
      const paymentMethod = document.getElementById('globalExpPaymentMethod').value;
      const description = document.getElementById('globalExpDescription').value.trim();

      crmStore.saveExpense({
        projectId,
        category,
        amount,
        vendor,
        date,
        paymentMethod,
        description
      });

      globalExpModal.classList.add('hidden');
      alert(`Gasto de $${amount} registrado con éxito.`);
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  }

  // Open Project Detail Modal Handler
  const openProjectDetail = (projectId) => {
    const container = document.getElementById('modalContainer');
    if (!container) return;
    container.innerHTML = renderProjectDetailModal(projectId);
    initProjectDetailModal(projectId, {
      onOpenAddExpense: (pId) => openGlobalExpense(pId),
      onRefresh: () => {
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  };

  // Open Security & Credentials Modal Handler
  const openSecuritySettings = () => {
    const container = document.getElementById('modalContainer');
    if (!container) return;
    container.innerHTML = renderSecurityModal();
    initSecurityModal({
      onRefresh: () => {
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  };

  const sidebarSecBtn = document.getElementById('sidebarSecurityBtn');
  const topbarSecBtn = document.getElementById('topbarSecurityBtn');
  const mobileDrawerSecBtn = document.getElementById('mobileDrawerSecurityBtn');

  if (sidebarSecBtn) sidebarSecBtn.addEventListener('click', openSecuritySettings);
  if (topbarSecBtn) topbarSecBtn.addEventListener('click', openSecuritySettings);
  if (mobileDrawerSecBtn) mobileDrawerSecBtn.addEventListener('click', openSecuritySettings);

  // Initialize specific tab views
  const viewCallbacks = {
    onOpenAddExpense: openGlobalExpense,
    onOpenProjectDetail: openProjectDetail,
    onRefresh: () => {
      if (callbacks.onRefresh) callbacks.onRefresh();
    }
  };

  if (activeTab === 'leads') {
    initLeadsView(viewCallbacks);
  } else if (activeTab === 'projects') {
    initProjectsView(viewCallbacks);
  } else if (activeTab === 'expenses') {
    initExpensesView(viewCallbacks);
  } else if (activeTab === 'tzel') {
    initTzelRadarView(viewCallbacks);
  } else {
    initDashboardView(viewCallbacks);
  }
}
