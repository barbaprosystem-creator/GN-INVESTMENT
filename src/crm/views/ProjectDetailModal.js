// Project Detail Modal / Drawer for Fix & Flip CRM
// Complete financial ledger, stage checklist & expense management per property

import { crmStore } from '../services/crmStore.js';

export function renderProjectDetailModal(projectId) {
  const project = crmStore.getProject(projectId);
  if (!project) return '';

  const fin = crmStore.computeProjectFinancials(projectId);
  const expenses = crmStore.getExpenses(projectId);

  const formatMoney = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  const statusMap = {
    acquisition: { label: 'En Adquisición', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
    rehab: { label: 'En Remodelación / Obra', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    listed: { label: 'En Venta (Listado MLS)', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    sold: { label: 'Vendido & Liquidado', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' }
  };

  const currentStatus = statusMap[project.status] || statusMap.rehab;

  return `
    <div id="projectDetailModalOverlay" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div class="bg-[#12161f] border border-white/15 shadow-2xl rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden relative">
        
        <!-- Modal Top Bar -->
        <div class="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4 bg-[#151b26]">
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="text-[10px] font-mono font-bold px-3 py-0.5 rounded-full border ${currentStatus.color}">
                ${currentStatus.label}
              </span>
              <span class="text-xs font-mono text-gray-400 font-bold">${project.projectNumber}</span>
              ${project.beds ? `<span class="text-xs font-mono text-gray-500">• ${project.beds} Hab / ${project.baths} Baños • ${project.sqft} sqft</span>` : ''}
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">${project.title}</h2>
            <p class="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
              <span class="material-symbols-outlined text-[15px] text-[#c5832b]">location_on</span>
              <span>${project.address}</span>
            </p>
          </div>

          <button type="button" id="closeProjectModalBtn" class="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Quick Summary Bar (Key Financials) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-4 sm:px-6 bg-[#0e1219] border-b border-white/10 font-mono text-xs">
          <div>
            <div class="text-gray-400 text-[10px] uppercase">Precio Compra</div>
            <div class="text-white font-bold text-sm sm:text-base">${formatMoney(fin.purchasePrice)}</div>
          </div>
          <div>
            <div class="text-gray-400 text-[10px] uppercase">Gastos Rehab Real</div>
            <div class="text-amber-400 font-bold text-sm sm:text-base">${formatMoney(fin.totalExpensesSpent)}</div>
            <div class="text-[10px] text-gray-500">Ppto: ${formatMoney(fin.rehabBudget)}</div>
          </div>
          <div>
            <div class="text-gray-400 text-[10px] uppercase">Base Total Invertida</div>
            <div class="text-white font-bold text-sm sm:text-base">${formatMoney(fin.totalBasis)}</div>
          </div>
          <div>
            <div class="text-gray-400 text-[10px] uppercase">Beneficio Neto (ROI)</div>
            <div class="${fin.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'} font-extrabold text-sm sm:text-base">
              ${formatMoney(fin.netProfit)} (${fin.roi}%)
            </div>
          </div>
        </div>

        <!-- Modal Tabs Navigation -->
        <div class="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-[#12161f] overflow-x-auto text-xs font-mono">
          <button type="button" class="proj-tab-btn active px-4 py-2.5 font-bold uppercase tracking-wider text-white border-b-2 border-[#c5832b] transition-colors" data-tab="tab-finances">
            Desglose Financiero
          </button>
          <button type="button" class="proj-tab-btn px-4 py-2.5 font-bold uppercase tracking-wider text-gray-400 hover:text-white border-b-2 border-transparent transition-colors" data-tab="tab-expenses">
            Gastos y Facturas (${expenses.length})
          </button>
          <button type="button" class="proj-tab-btn px-4 py-2.5 font-bold uppercase tracking-wider text-gray-400 hover:text-white border-b-2 border-transparent transition-colors" data-tab="tab-checklist">
            Checklist de Obra
          </button>
          <button type="button" class="proj-tab-btn px-4 py-2.5 font-bold uppercase tracking-wider text-gray-400 hover:text-white border-b-2 border-transparent transition-colors" data-tab="tab-settings">
            Estado & Configuración
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-6 overflow-y-auto flex-1 space-y-6">
          
          <!-- TAB 1: Financials Breakdown -->
          <div id="tab-finances" class="proj-tab-pane space-y-6">
            <!-- Cost Basis Formula Card -->
            <div class="bg-[#171d28] border border-white/10 rounded-2xl p-5 shadow-lg">
              <h3 class="text-xs font-bold text-[#d4a56e] uppercase tracking-wider font-mono mb-3">
                BALANCE Y FORMULA DE COSTES (COST BASIS)
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div class="space-y-2.5 bg-black/20 p-4 rounded-xl border border-white/5">
                  <div class="flex justify-between items-center text-gray-300">
                    <span>Precio de Adquisición:</span>
                    <strong class="text-white">${formatMoney(fin.purchasePrice)}</strong>
                  </div>
                  <div class="flex justify-between items-center text-gray-300">
                    <span>Gastos de Cierre & Título:</span>
                    <strong class="text-white">${formatMoney(fin.closingCosts)}</strong>
                  </div>
                  <div class="flex justify-between items-center text-gray-300">
                    <span>Gastos de Materiales:</span>
                    <strong class="text-amber-400">${formatMoney(fin.materialSpent)}</strong>
                  </div>
                  <div class="flex justify-between items-center text-gray-300">
                    <span>Mano de Obra / Cuadrillas:</span>
                    <strong class="text-blue-400">${formatMoney(fin.laborSpent)}</strong>
                  </div>
                  <div class="flex justify-between items-center text-gray-300">
                    <span>Permisos de la Ciudad:</span>
                    <strong class="text-purple-400">${formatMoney(fin.permitsSpent)}</strong>
                  </div>
                  <div class="flex justify-between items-center text-gray-300">
                    <span>Holding Costs (Luz/Agua/Seguro):</span>
                    <strong class="text-emerald-400">${formatMoney(fin.holdingSpent)}</strong>
                  </div>
                  <div class="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-bold">
                    <span class="text-white">BASE TOTAL INVERTIDA:</span>
                    <span class="text-[#c5832b] font-mono text-base">${formatMoney(fin.totalBasis)}</span>
                  </div>
                </div>

                <div class="space-y-2.5 bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-center text-gray-300 mb-2">
                      <span>Valor de Venta (ARV):</span>
                      <strong class="text-xl text-white">${formatMoney(fin.saleRevenue)}</strong>
                    </div>
                    <div class="flex justify-between items-center text-gray-400 text-[11px] mb-3">
                      <span>Estado de Venta:</span>
                      <span class="text-gray-300">${project.status === 'sold' ? 'Cerrado / Cobrado' : 'Proyectado al Mercado'}</span>
                    </div>

                    <div class="p-3 bg-[#12161f] rounded-lg border border-white/5 space-y-1.5">
                      <div class="flex justify-between items-center">
                        <span class="text-gray-300 font-bold">GANANCIA NETA NETA:</span>
                        <span class="${fin.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'} font-extrabold text-base">
                          ${formatMoney(fin.netProfit)}
                        </span>
                      </div>
                      <div class="flex justify-between items-center text-[11px]">
                        <span class="text-gray-400">Retorno sobre Inversión (ROI):</span>
                        <span class="text-emerald-400 font-bold">+${fin.roi}%</span>
                      </div>
                    </div>
                  </div>

                  <div class="pt-2 text-[11px] text-gray-400">
                    ${fin.isUnderBudget 
                      ? `<span class="text-emerald-400 font-bold">✓ Por debajo del presupuesto de obra por ${formatMoney(fin.rehabBudgetVariance)}</span>`
                      : `<span class="text-red-400 font-bold">⚠ Desvío de presupuesto por ${formatMoney(Math.abs(fin.rehabBudgetVariance))}</span>`
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes from Acquisition -->
            <div class="bg-[#171d28] border border-white/10 rounded-2xl p-5 shadow-lg">
              <h4 class="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono mb-2">Notas y Estrategia del Flip</h4>
              <p class="text-xs text-gray-300 leading-relaxed">${project.notes || 'Sin notas registradas.'}</p>
            </div>
          </div>

          <!-- TAB 2: Itemized Expenses for this Project -->
          <div id="tab-expenses" class="proj-tab-pane hidden space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white uppercase font-mono tracking-wider">REGISTRO DE GASTOS ESPECÍFICO</h3>
                <p class="text-xs text-gray-400">Todos los pagos y recibos cargados a esta propiedad</p>
              </div>
              <button type="button" id="modalAddExpenseBtn" class="px-3.5 py-2 bg-[#c5832b] hover:bg-[#d89136] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md">
                <span class="material-symbols-outlined text-[16px]">add</span>
                <span>Añadir Gasto</span>
              </button>
            </div>

            <div class="bg-[#0f131a] border border-white/10 rounded-2xl overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs font-mono">
                  <thead class="bg-[#161c26] text-gray-400 border-b border-white/10 uppercase text-[10px]">
                    <tr>
                      <th class="py-3 px-4">Fecha</th>
                      <th class="py-3 px-4">Categoría</th>
                      <th class="py-3 px-4">Proveedor / Vendor</th>
                      <th class="py-3 px-4">Descripción</th>
                      <th class="py-3 px-4 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5">
                    ${expenses.length === 0 ? `
                      <tr>
                        <td colspan="5" class="py-8 text-center text-gray-500 font-mono">
                          No hay gastos registrados para esta propiedad aún.
                        </td>
                      </tr>
                    ` : expenses.map(e => `
                      <tr class="hover:bg-white/5 transition-colors">
                        <td class="py-3 px-4 text-gray-400">${e.date}</td>
                        <td class="py-3 px-4">
                          <span class="text-[9px] font-bold px-2 py-0.5 rounded-full border ${e.category === 'material' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : e.category === 'labor' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-gray-500/10 text-gray-300 border-gray-500/20'}">
                            ${e.category.toUpperCase()}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-white font-bold">${e.vendor}</td>
                        <td class="py-3 px-4 text-gray-400 max-w-xs truncate">${e.description}</td>
                        <td class="py-3 px-4 text-right text-white font-bold">${formatMoney(e.amount)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB 3: Rehab Stage Checklist -->
          <div id="tab-checklist" class="proj-tab-pane hidden space-y-4">
            <div>
              <h3 class="text-sm font-bold text-white uppercase font-mono tracking-wider">CHECKLIST DE AVANCE DE OBRA</h3>
              <p class="text-xs text-gray-400">Marca los hitos a medida que la cuadrilla completa cada fase</p>
            </div>

            <div class="space-y-2 bg-[#0e1219] p-4 rounded-2xl border border-white/10" id="projectChecklistContainer">
              ${(project.checklist || []).map((item, idx) => `
                <label class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                  <input 
                    type="checkbox" 
                    class="proj-chk-input w-4 h-4 rounded bg-gray-900 border-gray-700 text-[#c5832b] focus:ring-[#c5832b]" 
                    data-check-id="${item.id}"
                    ${item.completed ? 'checked' : ''}
                  />
                  <span class="text-xs font-mono ${item.completed ? 'line-through text-gray-500' : 'text-gray-200'}">
                    ${item.label}
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- TAB 4: Project Settings / Status Edit -->
          <div id="tab-settings" class="proj-tab-pane hidden space-y-4">
            <form id="projectEditForm" class="space-y-4 max-w-xl">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase font-mono mb-1">Estado de la Propiedad</label>
                <select id="editProjectStatus" class="w-full px-3 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-xs text-white focus:border-[#c5832b] focus:outline-none font-mono">
                  <option value="acquisition" ${project.status === 'acquisition' ? 'selected' : ''}>En Adquisición</option>
                  <option value="rehab" ${project.status === 'rehab' ? 'selected' : ''}>En Remodelación / Rehab</option>
                  <option value="listed" ${project.status === 'listed' ? 'selected' : ''}>En Venta (Listado MLS)</option>
                  <option value="sold" ${project.status === 'sold' ? 'selected' : ''}>Vendido & Liquidado</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-gray-400 uppercase font-mono mb-1">Presupuesto Rehab ($)</label>
                  <input type="number" id="editRehabBudget" value="${project.rehabBudget || 0}" class="w-full px-3 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-xs text-white focus:border-[#c5832b] focus:outline-none font-mono" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-400 uppercase font-mono mb-1">ARV / Venta Estimada ($)</label>
                  <input type="number" id="editTargetArv" value="${project.targetArv || 0}" class="w-full px-3 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-xs text-white focus:border-[#c5832b] focus:outline-none font-mono" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase font-mono mb-1">Precio Real de Venta Final (si fue vendida)</label>
                <input type="number" id="editActualSalePrice" value="${project.actualSalePrice || 0}" placeholder="Ej. 254000" class="w-full px-3 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-xs text-white focus:border-[#c5832b] focus:outline-none font-mono" />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase font-mono mb-1">Notas de Estrategia</label>
                <textarea id="editProjectNotes" rows="3" class="w-full px-3 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-xs text-white focus:border-[#c5832b] focus:outline-none font-mono">${project.notes || ''}</textarea>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                <button type="submit" class="px-5 py-2.5 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer font-mono shadow-lg shadow-[#c5832b]/20">
                  Guardar Cambios de Propiedad
                </button>
                <button type="button" id="deleteCurrentProjectBtn" class="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold font-mono uppercase rounded-xl transition-colors cursor-pointer flex items-center gap-1.5" title="Eliminar propiedad de la cartera">
                  <span class="material-symbols-outlined text-[15px]">delete_forever</span>
                  <span>Eliminar Propiedad</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function initProjectDetailModal(projectId, callbacks = {}) {
  const overlay = document.getElementById('projectDetailModalOverlay');
  const closeBtn = document.getElementById('closeProjectModalBtn');
  const tabBtns = document.querySelectorAll('.proj-tab-btn');
  const tabPanes = document.querySelectorAll('.proj-tab-pane');
  const chkInputs = document.querySelectorAll('.proj-chk-input');
  const form = document.getElementById('projectEditForm');
  const modalAddExpBtn = document.getElementById('modalAddExpenseBtn');

  // Close modal
  const closeModal = () => {
    if (overlay) overlay.remove();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Switch tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => {
        b.classList.remove('active', 'text-white', 'border-[#c5832b]');
        b.classList.add('text-gray-400', 'border-transparent');
      });
      btn.classList.add('active', 'text-white', 'border-[#c5832b]');
      btn.classList.remove('text-gray-400', 'border-transparent');

      tabPanes.forEach(pane => {
        pane.classList.toggle('hidden', pane.id !== targetTabId);
      });
    });
  });

  // Checklist updates
  chkInputs.forEach(input => {
    input.addEventListener('change', () => {
      const chkId = input.getAttribute('data-check-id');
      const project = crmStore.getProject(projectId);
      if (project && project.checklist) {
        const item = project.checklist.find(c => c.id === chkId);
        if (item) {
          item.completed = input.checked;
          crmStore.saveProject(project);
        }
      }
    });
  });

  // Add Expense for this specific project
  if (modalAddExpBtn && callbacks.onOpenAddExpense) {
    modalAddExpBtn.addEventListener('click', () => {
      closeModal();
      callbacks.onOpenAddExpense(projectId);
    });
  }

  // Save edits form
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('editProjectStatus').value;
      const rehabBudget = Number(document.getElementById('editRehabBudget').value || 0);
      const targetArv = Number(document.getElementById('editTargetArv').value || 0);
      const actualSalePrice = Number(document.getElementById('editActualSalePrice').value || 0);
      const notes = document.getElementById('editProjectNotes').value.trim();

      const project = crmStore.getProject(projectId);
      if (project) {
        project.status = status;
        project.rehabBudget = rehabBudget;
        project.targetArv = targetArv;
        project.actualSalePrice = actualSalePrice;
        project.notes = notes;
        crmStore.saveProject(project);

        alert('Propiedad actualizada con éxito.');
        closeModal();
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  }

  // Delete project handler
  const deleteBtn = document.getElementById('deleteCurrentProjectBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const project = crmStore.getProject(projectId);
      const title = project ? project.title : 'esta propiedad';
      if (confirm(`¿Estás seguro de eliminar permanentemente "${title}" y todos sus gastos asociados?`)) {
        crmStore.deleteProject(projectId);
        alert('Propiedad eliminada de la cartera.');
        closeModal();
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  }
}
