// Expenses View for Fix & Flip CRM
// Modeled after Barbaprosystem ProjectAccountingTab & BillsPage
// High financial precision, filters, CSV export & invoice ledger

import { crmStore } from '../services/crmStore.js';

export function renderExpensesView() {
  const expenses = crmStore.getExpenses();
  const projects = crmStore.getProjects();
  const metrics = crmStore.getGlobalMetrics();

  const formatMoney = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(num || 0);
  };

  const categoryBadges = {
    material: { label: 'Material', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
    labor: { label: 'Cuadrilla / Labor', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    permit: { label: 'Permiso', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    holding: { label: 'Holding / Luz', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    closing: { label: 'Cierre / Legal', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
    other: { label: 'Varios', color: 'bg-gray-500/10 text-gray-300 border-gray-500/30' }
  };

  // Map project names
  const projMap = {};
  projects.forEach(p => { projMap[p.id] = p.title; });

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Top Title & Action Buttons -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-400">receipt_long</span>
            <span>Libro Mayor de Gastos y Facturas</span>
          </h2>
          <p class="text-xs text-gray-400 mt-0.5">Control exhaustivo de compras de materiales, pagos de nómina a cuadrillas y servicios</p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button type="button" id="exportExpensesCsvBtn" class="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-mono" title="Exportar a CSV">
            <span class="material-symbols-outlined text-[16px]">download</span>
            <span>Exportar CSV</span>
          </button>
          <button type="button" id="printExpensesReportBtn" class="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-mono" title="Imprimir libro mayor">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Imprimir</span>
          </button>
          <button type="button" id="openAddExpenseModalBtn" class="px-4 py-2.5 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 flex items-center gap-1.5 cursor-pointer font-mono">
            <span class="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Registrar Gasto</span>
          </button>
        </div>
      </div>

      <!-- Quick Metrics Counters -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg">
          <span class="text-[10px] text-gray-400 uppercase font-bold block">TOTAL GASTADO</span>
          <strong class="text-white text-base sm:text-lg">${formatMoney(metrics.totalSpentAllExpenses)}</strong>
        </div>
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg">
          <span class="text-[10px] text-amber-400 uppercase font-bold block">MATERIALES</span>
          <strong class="text-amber-400 text-base sm:text-lg">${formatMoney(metrics.totalMaterialsSpent)}</strong>
        </div>
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg">
          <span class="text-[10px] text-blue-400 uppercase font-bold block">CUADRILLAS / LABOR</span>
          <strong class="text-blue-400 text-base sm:text-lg">${formatMoney(metrics.totalLaborSpent)}</strong>
        </div>
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg">
          <span class="text-[10px] text-purple-400 uppercase font-bold block">PERMISOS CIUDAD</span>
          <strong class="text-purple-400 text-base sm:text-lg">${formatMoney(metrics.totalPermitsSpent)}</strong>
        </div>
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg col-span-2 sm:col-span-1">
          <span class="text-[10px] text-emerald-400 uppercase font-bold block">HOLDING / LUZ / AGUA</span>
          <strong class="text-emerald-400 text-base sm:text-lg">${formatMoney(metrics.totalHoldingSpent)}</strong>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Property Filter -->
          <div class="w-full sm:w-auto">
            <select id="expenseFilterProperty" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
              <option value="ALL">Todas las Propiedades (${expenses.length})</option>
              ${projects.map(p => `<option value="${p.id}">${p.title}</option>`).join('')}
            </select>
          </div>

          <!-- Category Filter -->
          <div class="w-full sm:w-auto">
            <select id="expenseFilterCategory" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
              <option value="ALL">Todas las Categorías</option>
              <option value="material">Materiales</option>
              <option value="labor">Cuadrillas / Mano de Obra</option>
              <option value="permit">Permisos y Licencias</option>
              <option value="holding">Holding / Utilidades</option>
              <option value="closing">Cierre & Título</option>
              <option value="other">Otros Gastos</option>
            </select>
          </div>
        </div>

        <!-- Search input -->
        <div class="relative w-full md:w-64">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
          <input 
            type="text" 
            id="expenseSearchInput" 
            placeholder="Buscar proveedor o detalle..." 
            class="w-full pl-9 pr-4 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#c5832b]"
          />
        </div>
      </div>

      <!-- Expenses Ledger Table / Empty State -->
      ${expenses.length === 0 ? `
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-10 text-center space-y-4 shadow-xl">
          <div class="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
            <span class="material-symbols-outlined text-[32px]">receipt_long</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white font-mono">Libro Mayor Limpio</h3>
            <p class="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              No se han registrado facturas ni compras de obra todavía. Puedes registrar facturas de Home Depot, pagos a subcontratistas o permisos municipales.
            </p>
          </div>
          <div class="pt-2">
            <button type="button" id="zeroStateAddExpenseBtn" class="px-4 py-2.5 bg-[#c5832b] hover:bg-[#d89136] text-white font-mono font-bold text-xs uppercase rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Registrar Primer Gasto</span>
            </button>
          </div>
        </div>
      ` : `
        <div class="bg-[#151a24] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs font-mono" id="expensesTable">
              <thead class="bg-[#0f131a] text-gray-400 border-b border-white/10 uppercase text-[10px] tracking-wider">
                <tr>
                  <th class="py-3.5 px-4">Fecha</th>
                  <th class="py-3.5 px-4">Propiedad Asignada</th>
                  <th class="py-3.5 px-4">Categoría</th>
                  <th class="py-3.5 px-4">Proveedor / Vendor</th>
                  <th class="py-3.5 px-4">Método de Pago</th>
                  <th class="py-3.5 px-4">Concepto / Descripción</th>
                  <th class="py-3.5 px-4 text-right">Monto</th>
                  <th class="py-3.5 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5" id="expensesTableBody">
                ${expenses.map(e => {
                  const badge = categoryBadges[e.category] || categoryBadges.other;
                  const propTitle = projMap[e.projectId] || 'Gasto General GN';

                  return `
                    <tr class="hover:bg-white/5 transition-colors expense-row" data-id="${e.id}" data-project="${e.projectId}" data-category="${e.category}">
                      <td class="py-3.5 px-4 text-gray-300 whitespace-nowrap">${e.date}</td>
                      <td class="py-3.5 px-4">
                        <span class="text-white font-bold max-w-xs truncate block" title="${propTitle}">${propTitle}</span>
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${badge.color}">
                          ${badge.label}
                        </span>
                      </td>
                      <td class="py-3.5 px-4 text-white font-bold whitespace-nowrap">${e.vendor}</td>
                      <td class="py-3.5 px-4 text-gray-400 whitespace-nowrap">${e.paymentMethod || 'Contado'}</td>
                      <td class="py-3.5 px-4 text-gray-400 max-w-xs truncate" title="${e.description}">${e.description}</td>
                      <td class="py-3.5 px-4 text-right text-white font-bold font-mono text-sm whitespace-nowrap">${formatMoney(e.amount)}</td>
                      <td class="py-3.5 px-4 text-center whitespace-nowrap">
                        <button type="button" class="delete-expense-btn text-gray-500 hover:text-red-400 transition-colors p-1" data-expense-id="${e.id}" title="Eliminar este gasto">
                          <span class="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div class="p-4 border-t border-white/5 bg-[#0f131a] flex items-center justify-between text-xs font-mono text-gray-400">
            <span>Mostrando <strong class="text-white" id="displayedCount">${expenses.length}</strong> comprobantes</span>
            <span>Suma mostrada: <strong class="text-white font-mono text-sm" id="displayedSum">${formatMoney(metrics.totalSpentAllExpenses)}</strong></span>
          </div>
        </div>
      `}

      <!-- Add Expense Modal -->
      <div id="addExpenseModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#151b26] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-400">add_card</span>
              <span>REGISTRAR GASTO / FACTURA</span>
            </h3>
            <button type="button" id="closeAddExpenseModalBtn" class="text-gray-400 hover:text-white cursor-pointer">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="addExpenseForm" class="space-y-3 text-xs font-mono">
            <div>
              <label class="block text-gray-400 mb-1">Propiedad Asignada *</label>
              <select id="newExpProperty" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                ${projects.length === 0 ? `
                  <option value="general">Gasto General Operativo (Sin Proyecto)</option>
                ` : `
                  ${projects.map(p => `<option value="${p.id}">${p.projectNumber} - ${p.title}</option>`).join('')}
                  <option value="general">Gasto General Operativo (Sin Proyecto)</option>
                `}
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Categoría *</label>
                <select id="newExpCategory" required class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                  <option value="material">Materiales (Madera/Pisos/Drywall)</option>
                  <option value="labor">Cuadrilla / Mano de Obra</option>
                  <option value="permit">Permisos Municipales</option>
                  <option value="holding">Holding (Luz LG&E/Agua/Seguro)</option>
                  <option value="closing">Gastos de Cierre / Título</option>
                  <option value="other">Otros Imprevistos</option>
                </select>
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Monto en Dólares ($) *</label>
                <input type="number" step="0.01" id="newExpAmount" required placeholder="Ej. 1450.50" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Proveedor / Cuadrilla *</label>
                <input type="text" id="newExpVendor" required placeholder="Ej. Home Depot, Cuadrilla Pérez" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Fecha del Gasto *</label>
                <input type="date" id="newExpDate" required value="${new Date().toISOString().split('T')[0]}" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Método de Pago</label>
              <select id="newExpPaymentMethod" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                <option value="Tarjeta Corporativa GN">Tarjeta Corporativa GN</option>
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="Cheque GN">Cheque GN</option>
                <option value="Cuenta Comercial Proveedor">Cuenta Comercial Proveedor</option>
                <option value="Efectivo / Recibo Firmado">Efectivo / Recibo Firmado</option>
              </select>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Concepto o Materiales Adquiridos</label>
              <textarea id="newExpDescription" rows="2" placeholder="Ej. 40 láminas de Drywall 1/2 y 4 cajas de tornillos para cocina..." class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none"></textarea>
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

export function initExpensesView(callbacks = {}) {
  const modal = document.getElementById('addExpenseModal');
  const openModalBtn = document.getElementById('openAddExpenseModalBtn');
  const zeroStateAddBtn = document.getElementById('zeroStateAddExpenseBtn');
  const closeModalBtn = document.getElementById('closeAddExpenseModalBtn');
  const form = document.getElementById('addExpenseForm');

  const filterProp = document.getElementById('expenseFilterProperty');
  const filterCat = document.getElementById('expenseFilterCategory');
  const searchInput = document.getElementById('expenseSearchInput');
  const rows = document.querySelectorAll('.expense-row');
  const displayedCount = document.getElementById('displayedCount');

  const exportBtn = document.getElementById('exportExpensesCsvBtn');
  const printBtn = document.getElementById('printExpensesReportBtn');

  // Open / Close Modal
  const openModal = () => {
    if (modal) modal.classList.remove('hidden');
  };

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (zeroStateAddBtn) zeroStateAddBtn.addEventListener('click', openModal);
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  // Export CSV
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      crmStore.exportExpensesCsv();
    });
  }

  // Print
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Filter handler
  const applyFilters = () => {
    const selectedProp = filterProp ? filterProp.value : 'ALL';
    const selectedCat = filterCat ? filterCat.value : 'ALL';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let visibleCount = 0;
    rows.forEach(row => {
      const p = row.getAttribute('data-project');
      const c = row.getAttribute('data-category');
      const text = row.innerText.toLowerCase();

      const matchProp = selectedProp === 'ALL' || p === selectedProp;
      const matchCat = selectedCat === 'ALL' || c === selectedCat;
      const matchSearch = !query || text.includes(query);

      if (matchProp && matchCat && matchSearch) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (displayedCount) displayedCount.innerText = String(visibleCount);
  };

  if (filterProp) filterProp.addEventListener('change', applyFilters);
  if (filterCat) filterCat.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // Delete Expense buttons
  document.querySelectorAll('.delete-expense-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expId = btn.getAttribute('data-expense-id');
      if (confirm('¿Estás seguro de eliminar este registro de gasto?')) {
        crmStore.deleteExpense(expId);
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  });

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const projectId = document.getElementById('newExpProperty').value;
      const category = document.getElementById('newExpCategory').value;
      const amount = Number(document.getElementById('newExpAmount').value || 0);
      const vendor = document.getElementById('newExpVendor').value.trim();
      const date = document.getElementById('newExpDate').value;
      const paymentMethod = document.getElementById('newExpPaymentMethod').value;
      const description = document.getElementById('newExpDescription').value.trim();

      crmStore.saveExpense({
        projectId,
        category,
        amount,
        vendor,
        date,
        paymentMethod,
        description
      });

      if (modal) modal.classList.add('hidden');
      alert(`Gasto de $${amount} registrado con éxito.`);
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  }
}
