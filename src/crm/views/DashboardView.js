// Dashboard View for Fix & Flip CRM
// Real-world operational executive view: Live KPI metrics, Project pipeline, Expense monitoring & Inbound Leads

import { crmStore } from '../services/crmStore.js';

export function renderDashboardView() {
  const metrics = crmStore.getGlobalMetrics();
  const projects = crmStore.getProjects();
  const recentExpenses = crmStore.getExpenses().slice(0, 5);
  const recentLeads = crmStore.getLeads().slice(0, 4);

  const formatMoney = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  // Compute percentages for category breakdown
  const totalCat = metrics.totalSpentAllExpenses || 0;
  const matPct = totalCat > 0 ? Math.round((metrics.totalMaterialsSpent / totalCat) * 100) : 0;
  const labPct = totalCat > 0 ? Math.round((metrics.totalLaborSpent / totalCat) * 100) : 0;
  const permPct = totalCat > 0 ? Math.round((metrics.totalPermitsSpent / totalCat) * 100) : 0;
  const holdPct = totalCat > 0 ? Math.round((metrics.totalHoldingSpent / totalCat) * 100) : 0;

  const isBrandNew = projects.length === 0 && metrics.totalSpentAllExpenses === 0;
  const isLegacyDemo = crmStore.isLegacyDemoActive();

  return `
    <div class="space-y-8 animate-fadeIn">
      <!-- Welcome & Quick Banner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#161c26] to-[#12161f] p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-[#c5832b]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-bold">PORTFOLIO FIX & FLIP ACTIVO • LOUISVILLE KY</span>
          </div>
          <h2 class="text-2xl font-bold text-white tracking-tight">Centro de Control Operativo</h2>
          <p class="text-xs text-gray-400 mt-1 max-w-xl">Supervisión integral de adquisiciones, gastos de remodelación, margen neto y leads de la web.</p>
        </div>

        <div class="flex flex-wrap items-center gap-3 relative z-10 font-mono text-xs">
          <a href="#portal/leads" class="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/20 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-amber-400">contact_phone</span>
            <span>Leads Web (${metrics.newLeadsCount} nuevos)</span>
          </a>
          <button type="button" id="dashQuickExpenseBtn" class="px-4 py-2.5 bg-[#c5832b] hover:bg-[#d89136] text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#c5832b]/20 flex items-center gap-1.5 cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Registrar Gasto</span>
          </button>
        </div>
      </div>

      ${isLegacyDemo ? `
        <!-- Demo Data Notice Banner -->
        <div class="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-amber-200 shadow-lg">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-amber-400 text-[24px] shrink-0">info</span>
            <div>
              <span class="font-bold text-white block">Datos de demostración detectados</span>
              <span class="text-gray-300 text-[11px]">Las propiedades actuales (1428 S 28th St, etc.) son <strong>datos ficticios de muestra</strong> guardados previamente en tu navegador.</span>
            </div>
          </div>
          <button type="button" id="purgeDemoBannerBtn" class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-xl transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-md">
            <span class="material-symbols-outlined text-[16px]">delete_sweep</span>
            <span>Borrar Muestra y Empezar en Blanco</span>
          </button>
        </div>
      ` : ''}

      ${isBrandNew ? `
        <!-- Clean Onboarding Banner for Empty State -->
        <div class="bg-gradient-to-br from-[#1b2230] to-[#131924] border border-[#c5832b]/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#c5832b]/20 text-[#d4a56e] flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[28px]">domain_add</span>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Panel 100% Limpio y Listo para Operar</h3>
              <p class="text-xs text-gray-300 mt-1 leading-relaxed max-w-2xl">
                Los datos de prueba han sido removidos. Todo lo que registres aquí se guardará en tu base de datos local y se sincronizará con las solicitudes que los clientes envíen a través de la web pública.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
            <a href="#portal/projects" class="px-4 py-2 bg-[#c5832b] hover:bg-[#d89136] text-white font-bold rounded-xl transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">add_home</span>
              <span>Registrar Primera Propiedad</span>
            </a>
            <a href="#portal/leads" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">inbox</span>
              <span>Revisar Leads Web</span>
            </a>
            <button type="button" id="dashLoadDemoBtn" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Cargar Datos de Muestra (Opcional)</span>
            </button>
          </div>
        </div>
      ` : ''}

      <!-- KPI Executive Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: Capital Invertido en Compra -->
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-[#c5832b]/50 transition-colors shadow-lg">
          <div class="flex items-center justify-between text-gray-400 mb-3">
            <span class="text-[11px] font-mono uppercase font-bold tracking-wider">CAPITAL EN ADQUISICIONES</span>
            <div class="w-8 h-8 rounded-lg bg-[#c5832b]/15 text-[#d4a56e] flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">real_estate_agent</span>
            </div>
          </div>
          <div class="text-2xl font-extrabold text-white mb-1 font-mono">${formatMoney(metrics.totalPurchaseCapital)}</div>
          <div class="text-[11px] text-gray-400 flex items-center gap-1.5">
            <span class="text-emerald-400 font-bold">${metrics.totalProjectsCount}</span> propiedades compradas
          </div>
        </div>

        <!-- Card 2: Gastos Totales de Obras -->
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-red-500/50 transition-colors shadow-lg">
          <div class="flex items-center justify-between text-gray-400 mb-3">
            <span class="text-[11px] font-mono uppercase font-bold tracking-wider">GASTOS REHAB ACUMULADOS</span>
            <div class="w-8 h-8 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">construction</span>
            </div>
          </div>
          <div class="text-2xl font-extrabold text-white mb-1 font-mono">${formatMoney(metrics.totalSpentAllExpenses)}</div>
          <div class="text-[11px] text-gray-400 flex items-center justify-between">
            <span>Presupuesto: <strong class="text-gray-300 font-mono">${formatMoney(metrics.totalRehabBudget)}</strong></span>
            <span class="text-xs font-mono text-amber-400">${metrics.totalRehabBudget > 0 ? Math.round((metrics.totalSpentAllExpenses / metrics.totalRehabBudget) * 100) : 0}%</span>
          </div>
        </div>

        <!-- Card 3: Beneficio Neto Proyectado -->
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/50 transition-colors shadow-lg">
          <div class="flex items-center justify-between text-gray-400 mb-3">
            <span class="text-[11px] font-mono uppercase font-bold tracking-wider">BENEFICIO NETO (PROYECTADO)</span>
            <div class="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">trending_up</span>
            </div>
          </div>
          <div class="text-2xl font-extrabold text-emerald-400 mb-1 font-mono">${formatMoney(metrics.totalNetProfit)}</div>
          <div class="text-[11px] text-gray-400 flex items-center gap-1.5">
            <span>ROI Promedio:</span>
            <span class="text-emerald-400 font-bold font-mono">+${metrics.averageRoi}%</span>
          </div>
        </div>

        <!-- Card 4: Gastos del Mes -->
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-blue-500/50 transition-colors shadow-lg">
          <div class="flex items-center justify-between text-gray-400 mb-3">
            <span class="text-[11px] font-mono uppercase font-bold tracking-wider">GASTOS DE ESTE MES</span>
            <div class="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">calendar_today</span>
            </div>
          </div>
          <div class="text-2xl font-extrabold text-white mb-1 font-mono">${formatMoney(metrics.currentMonthExpenses)}</div>
          <div class="text-[11px] text-gray-400 flex items-center gap-1.5">
            <span class="text-blue-400 font-bold">${metrics.activeProjectsCount}</span> flips en curso
          </div>
        </div>
      </div>

      <!-- Cost Distribution Bar (Only shown if expenses exist) -->
      ${totalCat > 0 ? `
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider font-mono">DISTRIBUCIÓN DE GASTOS DE OPERACIÓN</h3>
              <p class="text-xs text-gray-400">Desglose de cada dólar invertido en reformas y costos de posesión</p>
            </div>
            <div class="text-xs font-mono text-gray-300">
              Total Desembolsado: <strong class="text-[#c5832b] font-bold text-sm">${formatMoney(metrics.totalSpentAllExpenses)}</strong>
            </div>
          </div>

          <!-- Segmented bar -->
          <div class="w-full h-3.5 bg-black/40 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-white/5 mb-4">
            <div style="width: ${matPct}%" class="h-full bg-amber-500 rounded-l-full transition-all" title="Materiales: ${matPct}%"></div>
            <div style="width: ${labPct}%" class="h-full bg-blue-500 transition-all" title="Mano de Obra: ${labPct}%"></div>
            <div style="width: ${permPct}%" class="h-full bg-purple-500 transition-all" title="Permisos: ${permPct}%"></div>
            <div style="width: ${holdPct}%" class="h-full bg-emerald-500 rounded-r-full transition-all" title="Holding: ${holdPct}%"></div>
          </div>

          <!-- Legend -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
              <div>
                <div class="text-gray-400 text-[11px]">Materiales (${matPct}%)</div>
                <div class="text-white font-bold">${formatMoney(metrics.totalMaterialsSpent)}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
              <div>
                <div class="text-gray-400 text-[11px]">Mano de Obra (${labPct}%)</div>
                <div class="text-white font-bold">${formatMoney(metrics.totalLaborSpent)}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-purple-500 shrink-0"></span>
              <div>
                <div class="text-gray-400 text-[11px]">Permisos (${permPct}%)</div>
                <div class="text-white font-bold">${formatMoney(metrics.totalPermitsSpent)}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
              <div>
                <div class="text-gray-400 text-[11px]">Holding/Luz/Seguro (${holdPct}%)</div>
                <div class="text-white font-bold">${formatMoney(metrics.totalHoldingSpent)}</div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Grid: Active Flips & Right Sidebar (Recent Leads & Expenses) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: Active Projects -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px] text-[#c5832b]">home_work</span>
              <span>Cartera de Flips en Curso</span>
            </h3>
            <a href="#portal/projects" class="text-xs font-bold text-[#c5832b] hover:text-[#d4a56e] transition-colors flex items-center gap-1 font-mono uppercase">
              <span>Ver todas (${projects.length})</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>

          ${projects.length === 0 ? `
            <div class="bg-[#151a24] border border-white/10 rounded-2xl p-8 text-center space-y-3">
              <span class="material-symbols-outlined text-gray-500 text-[36px]">home_work</span>
              <div class="text-sm font-bold text-white">No hay propiedades en cartera</div>
              <p class="text-xs text-gray-400 max-w-sm mx-auto">
                Registra tu primera adquisición o convierte un lead entrante del formulario web para empezar a monitorear costos.
              </p>
              <div class="pt-2">
                <a href="#portal/projects" class="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c5832b] hover:bg-[#d89136] text-white text-xs font-bold font-mono uppercase rounded-xl transition-colors">
                  <span class="material-symbols-outlined text-[16px]">add_home</span>
                  <span>Registrar Propiedad</span>
                </a>
              </div>
            </div>
          ` : `
            <div class="space-y-3">
              ${projects.slice(0, 4).map(p => {
                const fin = crmStore.computeProjectFinancials(p.id);
                const progressPct = fin && fin.rehabBudget > 0 ? Math.min(100, Math.round((fin.totalRehabSpent / fin.rehabBudget) * 100)) : 0;
                const statusColors = {
                  acquisition: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
                  rehab: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                  listed: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                  sold: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                };
                const statusLabels = {
                  acquisition: 'En Adquisición',
                  rehab: 'En Remodelación',
                  listed: 'En Venta (MLS)',
                  sold: 'Vendido'
                };

                return `
                  <div class="bg-[#151a24] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all cursor-pointer group open-project-btn" data-project-id="${p.id}">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${statusColors[p.status] || 'bg-gray-800 text-gray-300'}">
                            ${statusLabels[p.status] || p.status}
                          </span>
                          <span class="text-xs font-mono text-gray-500">${p.projectNumber}</span>
                        </div>
                        <h4 class="text-base font-bold text-white group-hover:text-[#c5832b] transition-colors">${p.title}</h4>
                        <p class="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <span class="material-symbols-outlined text-[14px]">location_on</span>
                          <span>${p.address}</span>
                        </p>
                      </div>

                      <div class="text-left sm:text-right shrink-0">
                        <div class="text-[11px] text-gray-400 font-mono">ARV / VENTA ESTIMADA</div>
                        <div class="text-lg font-bold text-white font-mono">${formatMoney(fin ? fin.saleRevenue : p.targetArv)}</div>
                        <div class="text-xs font-mono ${fin && fin.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'} font-bold">
                          Margen: ${formatMoney(fin ? fin.netProfit : 0)} (+${fin ? fin.roi : 0}%)
                        </div>
                      </div>
                    </div>

                    <!-- Rehab Budget Progress Bar -->
                    <div class="mt-4 pt-3 border-t border-white/5">
                      <div class="flex items-center justify-between text-xs font-mono mb-1.5 text-gray-400">
                        <span>Gasto Rehab: <strong class="text-white">${formatMoney(fin ? fin.totalRehabSpent : 0)}</strong> / Presupuesto: ${formatMoney(p.rehabBudget)}</span>
                        <span class="${progressPct > 100 ? 'text-red-400 font-bold' : 'text-gray-300'}">${progressPct}%</span>
                      </div>
                      <div class="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all ${progressPct > 100 ? 'bg-red-500' : progressPct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${progressPct}%"></div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Right 1 Col: Inbound Leads & Expenses Feed -->
        <div class="space-y-6">
          
          <!-- Inbound Leads Section -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-amber-400">contact_phone</span>
                <span>Leads Entrantes</span>
              </h3>
              <a href="#portal/leads" class="text-xs font-bold text-[#c5832b] hover:text-[#d4a56e] font-mono uppercase">
                <span>Ver todos (${metrics.totalLeadsCount})</span>
              </a>
            </div>

            <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-xl divide-y divide-white/5">
              ${recentLeads.length === 0 ? `
                <div class="py-6 text-center text-xs font-mono text-gray-400 space-y-1">
                  <div>Sin leads recientes</div>
                  <a href="#portal/leads" class="text-amber-400 hover:underline block pt-1">+ Registrar llamada manual</a>
                </div>
              ` : recentLeads.map(l => `
                <div class="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5 mb-0.5">
                      <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${l.status === 'new' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-gray-400'}">
                        ${l.status === 'new' ? 'NUEVO' : l.status}
                      </span>
                      <span class="text-xs font-bold text-white truncate">${l.fullName}</span>
                    </div>
                    <div class="text-[11px] text-gray-400 truncate flex items-center gap-1">
                      <span class="material-symbols-outlined text-[12px] text-[#c5832b]">location_on</span>
                      <span>${l.address}</span>
                    </div>
                  </div>
                  <div class="shrink-0 text-right">
                    ${l.phone ? `
                      <a href="tel:${l.phone}" class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 flex items-center justify-center transition-colors" title="Llamar">
                        <span class="material-symbols-outlined text-[15px]">call</span>
                      </a>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Recent Expenses Section -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-blue-400">receipt_long</span>
                <span>Últimos Gastos</span>
              </h3>
              <a href="#portal/expenses" class="text-xs font-bold text-[#c5832b] hover:text-[#d4a56e] font-mono uppercase">
                <span>Ver todos</span>
              </a>
            </div>

            <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-xl divide-y divide-white/5">
              ${recentExpenses.length === 0 ? `
                <div class="py-6 text-center text-xs font-mono text-gray-400 space-y-1">
                  <div>Sin gastos registrados</div>
                  <button type="button" class="text-[#c5832b] hover:underline pt-1 cursor-pointer" onclick="document.getElementById('dashQuickExpenseBtn').click()">+ Registrar primer gasto</button>
                </div>
              ` : recentExpenses.map(e => `
                <div class="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <div class="text-xs font-bold text-white truncate">${e.vendor}</div>
                    <div class="text-[11px] text-gray-400 truncate">${e.description}</div>
                  </div>
                  <div class="text-right shrink-0">
                    <div class="text-xs font-extrabold text-white font-mono">${formatMoney(e.amount)}</div>
                    <div class="text-[10px] text-gray-500 font-mono">${e.date}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Radar Intel Widget -->
          <div class="bg-gradient-to-br from-[#1b1c2a] to-[#121420] border border-blue-500/20 rounded-2xl p-4 shadow-lg">
            <div class="flex items-center gap-2 text-blue-400 mb-2">
              <span class="material-symbols-outlined text-[18px]">bolt</span>
              <span class="text-xs font-bold uppercase tracking-wider font-mono">TZEL RADAR INTEL</span>
            </div>
            <p class="text-xs text-gray-300 mb-3 leading-relaxed">
              Explora subastas de ejecución y violaciones de código en Jefferson County para adquirir a descuento.
            </p>
            <a href="#portal/tzel" class="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 font-mono">
              <span>EXPLORAR MAPA TZEL</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function initDashboardView(callbacks = {}) {
  // Quick Expense button
  const quickExpBtn = document.getElementById('dashQuickExpenseBtn');
  if (quickExpBtn && callbacks.onOpenAddExpense) {
    quickExpBtn.addEventListener('click', () => callbacks.onOpenAddExpense());
  }

  // Load demo button in empty state
  const loadDemoBtn = document.getElementById('dashLoadDemoBtn');
  if (loadDemoBtn) {
    loadDemoBtn.addEventListener('click', () => {
      crmStore.resetToDemo();
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  }

  // Purge demo banner button
  const purgeDemoBtn = document.getElementById('purgeDemoBannerBtn');
  if (purgeDemoBtn) {
    purgeDemoBtn.addEventListener('click', () => {
      if (confirm('¿Deseas eliminar permanentemente los datos de muestra y comenzar con el panel en blanco?')) {
        crmStore.clearAllData();
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  }

  // Open project cards
  document.querySelectorAll('.open-project-btn').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      if (projId && callbacks.onOpenProjectDetail) {
        callbacks.onOpenProjectDetail(projId);
      }
    });
  });
}
