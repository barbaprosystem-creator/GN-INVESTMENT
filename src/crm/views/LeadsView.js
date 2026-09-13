// Leads View for Fix & Flip CRM
// Manages real inbound seller inquiries submitted through website valuation forms
// Features: Live status pipeline, 1-click Fix & Flip conversion, phone/email actions, CSV export

import { crmStore } from '../services/crmStore.js';

export function renderLeadsView(currentFilter = 'all') {
  const leads = crmStore.getLeads();
  const metrics = crmStore.getGlobalMetrics();

  const stageBadges = {
    new: { label: 'Nuevo (Sin Atender)', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
    contacted: { label: 'Contactado / En Llamada', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    visited: { label: 'Visita Agendada', color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' },
    offered: { label: 'Oferta Presentada', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
    contract: { label: 'Bajo Contrato / Aceptada', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    closed: { label: 'Comprado / Cerrado', color: 'bg-green-500/20 text-green-300 border-green-500/40' },
    discarded: { label: 'Descartado / No Califica', color: 'bg-red-500/10 text-red-400 border-red-500/20' }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Reciente';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('es-US', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
        d.toLocaleTimeString('es-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header & Top Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 ${metrics.newLeadsCount > 0 ? 'animate-pulse' : ''}"></span>
            <span class="text-[11px] font-mono tracking-wider uppercase text-amber-400 font-bold">PIPELINE DE ADQUISICIONES DIRECTAS</span>
          </div>
          <h2 class="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-400">contact_phone</span>
            <span>Leads Entrantes de Vendedores</span>
          </h2>
          <p class="text-xs text-gray-400 mt-0.5">Solicitudes de oferta en efectivo capturadas en tiempo real desde el sitio web</p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button type="button" id="exportLeadsCsvBtn" class="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-mono" title="Exportar lista de contactos a CSV">
            <span class="material-symbols-outlined text-[16px]">download</span>
            <span>Exportar CSV</span>
          </button>
          
          <button type="button" id="openAddManualLeadModalBtn" class="px-4 py-2.5 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 flex items-center gap-1.5 cursor-pointer font-mono">
            <span class="material-symbols-outlined text-[16px]">add_call</span>
            <span>+ Registrar Lead Manual</span>
          </button>
        </div>
      </div>

      <!-- Quick Metrics Counters -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg">
          <span class="text-[10px] text-gray-400 uppercase font-bold block">TOTAL LEADS RECIBIDOS</span>
          <div class="text-white text-xl sm:text-2xl font-extrabold mt-1">${leads.length}</div>
          <span class="text-[10px] text-gray-400 mt-0.5 block">Desde web pública</span>
        </div>

        <div class="bg-[#151a24] border border-amber-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="text-[10px] text-amber-400 uppercase font-bold block">POR ATENDER (NUEVOS)</span>
            ${metrics.newLeadsCount > 0 ? `<span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>` : ''}
          </div>
          <div class="text-amber-400 text-xl sm:text-2xl font-extrabold mt-1">${metrics.newLeadsCount}</div>
          <span class="text-[10px] text-amber-400/80 mt-0.5 block">Requieren primera llamada</span>
        </div>

        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 shadow-lg">
          <span class="text-[10px] text-blue-400 uppercase font-bold block">EN NEGOCIACIÓN</span>
          <div class="text-blue-400 text-xl sm:text-2xl font-extrabold mt-1">${metrics.inNegotiationLeadsCount}</div>
          <span class="text-[10px] text-gray-400 mt-0.5 block">Llamadas o visitas en curso</span>
        </div>

        <div class="bg-[#151a24] border border-emerald-500/30 rounded-2xl p-4 shadow-lg">
          <span class="text-[10px] text-emerald-400 uppercase font-bold block">CONVERTIDOS A FLIP</span>
          <div class="text-emerald-400 text-xl sm:text-2xl font-extrabold mt-1">${metrics.convertedLeadsCount}</div>
          <span class="text-[10px] text-emerald-400/80 mt-0.5 block">Bajo contrato o en obra</span>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-[#151a24] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <!-- Status Filter Buttons -->
        <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-mono pb-1 md:pb-0" id="leadStatusFilters">
          <button type="button" class="lead-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'all' ? 'bg-[#c5832b] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="all">
            Todos (${leads.length})
          </button>
          <button type="button" class="lead-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'new' ? 'bg-amber-500 text-black font-extrabold' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="new">
            Nuevos (${leads.filter(l => l.status === 'new').length})
          </button>
          <button type="button" class="lead-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'contacted' ? 'bg-[#c5832b] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="contacted">
            Contactados (${leads.filter(l => l.status === 'contacted').length})
          </button>
          <button type="button" class="lead-filter-btn px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${currentFilter === 'contract' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}" data-filter="contract">
            Contrato (${leads.filter(l => l.status === 'contract').length})
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-72">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
          <input 
            type="text" 
            id="searchLeadsInput" 
            placeholder="Buscar por nombre, teléfono, dirección..." 
            class="w-full pl-9 pr-4 py-2 bg-[#0d1219] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5832b] font-mono"
          />
        </div>
      </div>

      <!-- Leads List / Empty State -->
      ${leads.length === 0 ? `
        <div class="bg-[#151a24] border border-white/10 rounded-2xl p-10 text-center space-y-4 shadow-xl">
          <div class="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <span class="material-symbols-outlined text-[32px]">mark_email_read</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white font-mono">Bandeja de Leads Vacía</h3>
            <p class="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              Aún no se han recibido ofertas desde los formularios públicos de la web. Cuando un propietario solicite una oferta en efectivo, aparecerá aquí de inmediato.
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="#get-my-offer" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[15px]">open_in_new</span>
              <span>Probar Formulario Web</span>
            </a>
            <button type="button" id="zeroStateManualLeadBtn" class="px-4 py-2 bg-[#c5832b] hover:bg-[#d89136] text-white rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">add_call</span>
              <span>Registrar Primer Lead Manual</span>
            </button>
            <button type="button" id="zeroStateDemoLeadBtn" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">restart_alt</span>
              <span>Cargar Leads de Muestra</span>
            </button>
          </div>
        </div>
      ` : `
        <div class="space-y-4" id="leadsContainer">
          ${leads.map(lead => {
            const currentBadge = stageBadges[lead.status] || stageBadges.new;
            const isConverted = Boolean(lead.convertedProjectId);

            return `
              <div class="bg-[#151a24] border border-white/10 hover:border-white/20 rounded-2xl p-5 shadow-xl transition-all lead-card" data-lead-id="${lead.id}" data-status="${lead.status}">
                <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  
                  <!-- Left: Seller & Property Info -->
                  <div class="space-y-2.5 flex-1 min-w-0">
                    <div class="flex items-center gap-2.5 flex-wrap">
                      <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${currentBadge.color}">
                        ${currentBadge.label}
                      </span>
                      <span class="text-[11px] font-mono text-gray-500">
                        ${formatDate(lead.submittedAt)}
                      </span>
                      <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5">
                        Canal: ${lead.source || 'Web'}
                      </span>
                      ${isConverted ? `
                        <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                          <span class="material-symbols-outlined text-[12px]">verified</span>
                          <span>Convertido a Proyecto</span>
                        </span>
                      ` : ''}
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>${lead.fullName}</span>
                      </h3>
                      <div class="flex items-center gap-3 text-xs font-mono">
                        ${lead.phone ? `
                          <a href="tel:${lead.phone}" class="text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/20 transition-colors" title="Llamar al vendedor">
                            <span class="material-symbols-outlined text-[13px]">call</span>
                            <span>${lead.phone}</span>
                          </a>
                        ` : ''}
                        ${lead.email ? `
                          <a href="mailto:${lead.email}" class="text-gray-300 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-lg border border-white/10 transition-colors" title="Enviar correo">
                            <span class="material-symbols-outlined text-[13px]">mail</span>
                            <span class="truncate max-w-[180px]">${lead.email}</span>
                          </a>
                        ` : ''}
                      </div>
                    </div>

                    <!-- Property Address & Specs -->
                    <div class="bg-[#0e1219] p-3 rounded-xl border border-white/5 text-xs font-mono space-y-1.5">
                      <div class="flex items-center justify-between gap-2 flex-wrap">
                        <div class="text-white font-bold flex items-center gap-1.5">
                          <span class="material-symbols-outlined text-amber-400 text-[16px]">location_on</span>
                          <span>${lead.address}</span>
                        </div>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.address)}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white text-[11px] flex items-center gap-0.5">
                          <span>Ver en Maps</span>
                          <span class="material-symbols-outlined text-[12px]">open_in_new</span>
                        </a>
                      </div>

                      <div class="flex items-center gap-4 text-[11px] text-gray-400 flex-wrap pt-1 border-t border-white/5">
                        ${lead.bedrooms || lead.bathrooms ? `
                          <span class="flex items-center gap-1 text-gray-300">
                            <span class="material-symbols-outlined text-[14px] text-gray-500">bed</span>
                            <span>${lead.bedrooms || '?'} Hab / ${lead.bathrooms || '?'} Baños</span>
                          </span>
                        ` : ''}
                        ${lead.occupancy ? `
                          <span class="text-gray-400">Ocupación: <strong class="text-gray-200">${lead.occupancy}</strong></span>
                        ` : ''}
                        ${lead.timeline ? `
                          <span class="text-amber-400">Plazo: <strong>${lead.timeline}</strong></span>
                        ` : ''}
                      </div>

                      ${lead.condition ? `
                        <div class="text-[11px] text-gray-400 pt-1">
                          <span class="text-gray-500">Condición:</span> <span class="text-gray-300">${lead.condition}</span>
                        </div>
                      ` : ''}

                      ${lead.notes ? `
                        <div class="text-[11px] text-gray-400 pt-1 border-t border-white/5">
                          <span class="text-gray-500">Notas / Razón de venta:</span> <span class="text-amber-200/90 italic">"${lead.notes}"</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>

                  <!-- Right: Stage Selector & Operational Actions -->
                  <div class="lg:w-64 shrink-0 flex flex-col justify-between space-y-3 pt-2 lg:pt-0">
                    <div>
                      <label class="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">Mover en Pipeline</label>
                      <select class="lead-status-select w-full px-3 py-2 bg-[#0c1017] border border-white/15 rounded-xl text-xs text-white focus:border-[#c5832b] focus:outline-none font-mono" data-lead-id="${lead.id}">
                        <option value="new" ${lead.status === 'new' ? 'selected' : ''}>1. Nuevo (Sin contactar)</option>
                        <option value="contacted" ${lead.status === 'contacted' ? 'selected' : ''}>2. Contactado / En llamada</option>
                        <option value="visited" ${lead.status === 'visited' ? 'selected' : ''}>3. Visita Agendada</option>
                        <option value="offered" ${lead.status === 'offered' ? 'selected' : ''}>4. Oferta Presentada</option>
                        <option value="contract" ${lead.status === 'contract' ? 'selected' : ''}>5. Bajo Contrato</option>
                        <option value="closed" ${lead.status === 'closed' ? 'selected' : ''}>6. Comprado / Cerrado</option>
                        <option value="discarded" ${lead.status === 'discarded' ? 'selected' : ''}>7. Descartado</option>
                      </select>
                    </div>

                    <!-- 1-Click Action: Convert to Fix & Flip Project -->
                    <div class="space-y-1.5 pt-1">
                      ${!isConverted ? `
                        <button type="button" class="convert-lead-btn w-full py-2.5 px-3 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#c5832b]/20 flex items-center justify-center gap-1.5 cursor-pointer" data-lead-id="${lead.id}">
                          <span class="material-symbols-outlined text-[16px]">transform</span>
                          <span>Convertir a Fix &amp; Flip</span>
                        </button>
                      ` : `
                        <button type="button" class="view-converted-project-btn w-full py-2.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer" data-project-id="${lead.convertedProjectId}">
                          <span class="material-symbols-outlined text-[16px]">home_work</span>
                          <span>Ver Proyecto Creado</span>
                        </button>
                      `}

                      <div class="flex items-center justify-between text-xs font-mono text-gray-500 pt-1">
                        <button type="button" class="edit-lead-notes-btn text-gray-400 hover:text-white transition-colors flex items-center gap-1 p-1" data-lead-id="${lead.id}" title="Editar notas">
                          <span class="material-symbols-outlined text-[14px]">edit_note</span>
                          <span>Notas</span>
                        </button>

                        <button type="button" class="delete-lead-btn text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 p-1" data-lead-id="${lead.id}" title="Eliminar lead">
                          <span class="material-symbols-outlined text-[14px]">delete</span>
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}

      <!-- Modal 1: Convert Lead into Fix & Flip Project -->
      <div id="convertLeadModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#151b26] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span class="material-symbols-outlined text-[#c5832b]">transform</span>
              <span>CONVERTIR LEAD A PROYECTO FIX & FLIP</span>
            </h3>
            <button type="button" id="closeConvertLeadModalBtn" class="text-gray-400 hover:text-white cursor-pointer">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="convertLeadForm" class="space-y-3 text-xs font-mono">
            <input type="hidden" id="convertTargetLeadId" />

            <div>
              <label class="block text-gray-400 mb-1">Título del Proyecto *</label>
              <input type="text" id="convertProjTitle" required class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Dirección del Inmueble *</label>
              <input type="text" id="convertProjAddress" required class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Precio de Compra Pactado ($) *</label>
                <input type="number" id="convertProjPurchase" required value="45000" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Gastos de Cierre ($)</label>
                <input type="number" id="convertProjClosing" value="2500" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Presupuesto Estimado Rehab ($) *</label>
                <input type="number" id="convertProjRehab" required value="40000" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">ARV Objetivo de Venta ($) *</label>
                <input type="number" id="convertProjArv" required value="160000" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none text-sm font-bold text-emerald-400" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block text-gray-400 mb-1">Habitaciones</label>
                <input type="number" id="convertProjBeds" value="3" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Baños</label>
                <input type="number" id="convertProjBaths" step="0.5" value="2" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Sqft Estimado</label>
                <input type="number" id="convertProjSqft" value="1400" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
            </div>

            <div class="pt-3">
              <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold uppercase rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 cursor-pointer flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">add_home_work</span>
                <span>Crear Proyecto y Añadir a Cartera</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal 2: Add Manual Lead (Direct Phone Call / Walk-in) -->
      <div id="manualLeadModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#151b26] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-400">add_call</span>
              <span>REGISTRAR LLAMADA DIRECTA / LEAD MANUAL</span>
            </h3>
            <button type="button" id="closeManualLeadModalBtn" class="text-gray-400 hover:text-white cursor-pointer">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="manualLeadForm" class="space-y-3 text-xs font-mono">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Nombre del Vendedor *</label>
                <input type="text" id="manualLeadName" required placeholder="Ej. Roberto Martínez" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Teléfono Móvil *</label>
                <input type="tel" id="manualLeadPhone" required placeholder="(502) 555-0123" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-400 mb-1">Correo Electrónico</label>
                <input type="email" id="manualLeadEmail" placeholder="vendedor@correo.com" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Urgencia / Plazo</label>
                <select id="manualLeadTimeline" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                  <option value="Inmediato (< 7 días)">Inmediato (< 7 días)</option>
                  <option value="1-30 días" selected>1-30 días</option>
                  <option value="30-60 días">30-60 días</option>
                  <option value="Solo explorando ofertas">Solo explorando ofertas</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Dirección de la Propiedad *</label>
              <input type="text" id="manualLeadAddress" required placeholder="Ej. 1920 W Broadway, Louisville, KY 40203" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block text-gray-400 mb-1">Habitaciones</label>
                <input type="number" id="manualLeadBeds" value="3" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Baños</label>
                <input type="number" id="manualLeadBaths" step="0.5" value="1.5" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Ocupación</label>
                <select id="manualLeadOccupancy" class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                  <option value="Vacante">Vacante</option>
                  <option value="Propietario">Propietario</option>
                  <option value="Inquilino">Inquilino</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-gray-400 mb-1">Notas de la Conversación / Estado de la Casa</label>
              <textarea id="manualLeadNotes" rows="2" placeholder="Motivo de la venta, precio orientativo que busca, condiciones de la casa..." class="w-full px-3 py-2 bg-[#0c1017] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none"></textarea>
            </div>

            <div class="pt-3">
              <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold uppercase rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 cursor-pointer">
                Guardar Lead en el Sistema
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

export function initLeadsView(callbacks = {}) {
  // 1. Export CSV
  const exportBtn = document.getElementById('exportLeadsCsvBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      crmStore.exportLeadsCsv();
    });
  }

  // 2. Filter tabs
  const filterBtns = document.querySelectorAll('.lead-filter-btn');
  const cards = document.querySelectorAll('.lead-card');
  const searchInput = document.getElementById('searchLeadsInput');

  const applyFilters = () => {
    let activeFilter = 'all';
    filterBtns.forEach(btn => {
      if (btn.classList.contains('bg-[#c5832b]') || btn.classList.contains('bg-amber-500') || btn.classList.contains('bg-emerald-600')) {
        activeFilter = btn.getAttribute('data-filter');
      }
    });

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach(card => {
      const status = card.getAttribute('data-status');
      const text = card.innerText.toLowerCase();

      const matchFilter = activeFilter === 'all' || status === activeFilter;
      const matchSearch = !query || text.includes(query);

      if (matchFilter && matchSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.getAttribute('data-filter');
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#c5832b]', 'bg-amber-500', 'bg-emerald-600', 'text-white', 'text-black', 'font-extrabold');
        b.classList.add('bg-white/5', 'text-gray-400');
      });
      btn.classList.remove('bg-white/5', 'text-gray-400');
      if (f === 'new') {
        btn.classList.add('bg-amber-500', 'text-black', 'font-extrabold');
      } else if (f === 'contract') {
        btn.classList.add('bg-emerald-600', 'text-white', 'font-bold');
      } else {
        btn.classList.add('bg-[#c5832b]', 'text-white', 'font-bold');
      }
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // 3. Status select dropdowns
  document.querySelectorAll('.lead-status-select').forEach(select => {
    select.addEventListener('change', () => {
      const leadId = select.getAttribute('data-lead-id');
      const newStatus = select.value;
      crmStore.updateLeadStatus(leadId, newStatus);
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  });

  // 4. Delete lead button
  document.querySelectorAll('.delete-lead-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      if (confirm('¿Deseas eliminar permanentemente este registro de lead?')) {
        crmStore.deleteLead(leadId);
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  });

  // 5. Edit lead notes
  document.querySelectorAll('.edit-lead-notes-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const lead = crmStore.getLead(leadId);
      if (!lead) return;
      const newNotes = prompt('Editar notas del lead:', lead.notes || '');
      if (newNotes !== null) {
        lead.notes = newNotes.trim();
        crmStore.saveLead(lead);
        if (callbacks.onRefresh) callbacks.onRefresh();
      }
    });
  });

  // 6. Convert Lead to Fix & Flip Modal
  const convertModal = document.getElementById('convertLeadModal');
  const closeConvertModalBtn = document.getElementById('closeConvertLeadModalBtn');
  const convertForm = document.getElementById('convertLeadForm');

  document.querySelectorAll('.convert-lead-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const lead = crmStore.getLead(leadId);
      if (!lead || !convertModal) return;

      document.getElementById('convertTargetLeadId').value = lead.id;
      document.getElementById('convertProjTitle').value = lead.address ? lead.address.split(',')[0] + ' - Flip' : `Inmueble ${lead.fullName}`;
      document.getElementById('convertProjAddress').value = lead.address || '';
      document.getElementById('convertProjBeds').value = lead.bedrooms || 3;
      document.getElementById('convertProjBaths').value = lead.bathrooms || 2;

      convertModal.classList.remove('hidden');
    });
  });

  if (closeConvertModalBtn && convertModal) {
    closeConvertModalBtn.addEventListener('click', () => convertModal.classList.add('hidden'));
  }

  if (convertForm) {
    convertForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const leadId = document.getElementById('convertTargetLeadId').value;
      const title = document.getElementById('convertProjTitle').value.trim();
      const address = document.getElementById('convertProjAddress').value.trim();
      const purchasePrice = Number(document.getElementById('convertProjPurchase').value || 45000);
      const closingCosts = Number(document.getElementById('convertProjClosing').value || 2500);
      const rehabBudget = Number(document.getElementById('convertProjRehab').value || 40000);
      const targetArv = Number(document.getElementById('convertProjArv').value || 160000);
      const beds = Number(document.getElementById('convertProjBeds').value || 3);
      const baths = Number(document.getElementById('convertProjBaths').value || 2);
      const sqft = Number(document.getElementById('convertProjSqft').value || 1400);

      const created = crmStore.convertLeadToProject(leadId, {
        title,
        address,
        purchasePrice,
        closingCosts,
        rehabBudget,
        targetArv,
        beds,
        baths,
        sqft
      });

      if (convertModal) convertModal.classList.add('hidden');
      alert(`¡Propiedad ${created.projectNumber} creada con éxito en el portafolio!`);

      // Redirect to projects view
      window.location.hash = 'portal/projects';
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  }

  // 7. View Converted Project Button
  document.querySelectorAll('.view-converted-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      if (projId && callbacks.onOpenProjectDetail) {
        callbacks.onOpenProjectDetail(projId);
      } else {
        window.location.hash = 'portal/projects';
      }
    });
  });

  // 8. Manual Lead Modal
  const manualModal = document.getElementById('manualLeadModal');
  const openManualBtn = document.getElementById('openAddManualLeadModalBtn');
  const zeroStateManualBtn = document.getElementById('zeroStateManualLeadBtn');
  const closeManualBtn = document.getElementById('closeManualLeadModalBtn');
  const manualForm = document.getElementById('manualLeadForm');

  const openManualModal = () => {
    if (manualModal) manualModal.classList.remove('hidden');
  };

  if (openManualBtn) openManualBtn.addEventListener('click', openManualModal);
  if (zeroStateManualBtn) zeroStateManualBtn.addEventListener('click', openManualModal);
  if (closeManualBtn && manualModal) {
    closeManualBtn.addEventListener('click', () => manualModal.classList.add('hidden'));
  }

  if (manualForm) {
    manualForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('manualLeadName').value.trim();
      const phone = document.getElementById('manualLeadPhone').value.trim();
      const email = document.getElementById('manualLeadEmail').value.trim();
      const address = document.getElementById('manualLeadAddress').value.trim();
      const timeline = document.getElementById('manualLeadTimeline').value;
      const bedrooms = document.getElementById('manualLeadBeds').value;
      const bathrooms = document.getElementById('manualLeadBaths').value;
      const occupancy = document.getElementById('manualLeadOccupancy').value;
      const notes = document.getElementById('manualLeadNotes').value.trim();

      crmStore.saveLead({
        fullName,
        phone,
        email,
        address,
        timeline,
        bedrooms,
        bathrooms,
        occupancy,
        notes,
        source: 'Llamada Directa GN',
        status: 'new'
      });

      if (manualModal) manualModal.classList.add('hidden');
      alert(`Lead de ${fullName} registrado correctamente.`);
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  }

  // 9. Zero state demo lead button
  const zeroDemoBtn = document.getElementById('zeroStateDemoLeadBtn');
  if (zeroDemoBtn) {
    zeroDemoBtn.addEventListener('click', () => {
      crmStore.resetToDemo();
      if (callbacks.onRefresh) callbacks.onRefresh();
    });
  }
}
