// CRM Store for GN Investment Fix & Flip Portfolio, Expenses & Inbound Web Leads
// Real-world operational architecture: zero hardcoded defaults, real local storage persistence,
// automated web leads capture, 1-click Fix & Flip conversion, and JSON backup/restore.

const STORAGE_KEY_PROJECTS = 'gn_flip_projects';
const STORAGE_KEY_EXPENSES = 'gn_flip_expenses';
const STORAGE_KEY_LEADS = 'gn_leads';

// Optional Demo Seed Data (Only loaded when the user clicks "Cargar Ejemplos" explicitly)
export const DEMO_PROJECTS = [
  {
    id: 'proj-1',
    projectNumber: 'FLIP-101',
    title: '1428 S 28th St - West End Modern Gut',
    address: '1428 S 28th St, Louisville, KY 40211',
    county: 'Jefferson',
    state: 'KY',
    beds: 3,
    baths: 2,
    sqft: 1420,
    status: 'rehab', // 'acquisition' | 'rehab' | 'listed' | 'sold'
    purchasePrice: 42000,
    closingCosts: 2800,
    rehabBudget: 48000,
    holdingBudget: 3500,
    targetArv: 165000,
    actualSalePrice: 0,
    acquisitionDate: '2026-03-12',
    targetCompletionDate: '2026-08-15',
    notes: 'Completa renovación interior. Cocina abierta con isla, baños nuevos, cableado Romex y panel nuevo de 200A.',
    coverImage: '/images/hero-clean-house.jpg',
    checklist: [
      { id: 'c1', label: 'Demolición interior y contenedor', completed: true },
      { id: 'c2', label: 'Permiso Louisville Metro Inspections', completed: true },
      { id: 'c3', label: 'Plomería y tubería PEX rough-in', completed: true },
      { id: 'c4', label: 'Electricidad 200A y cableado', completed: true },
      { id: 'c5', label: 'Inspección de Rough-in aprobada', completed: true },
      { id: 'c6', label: 'Aislamiento e instalación de Drywall', completed: false },
      { id: 'c7', label: 'Gabinetes de cocina y encimeras de cuarzo', completed: false },
      { id: 'c8', label: 'Pintura interior Sherwin Williams & LVP Flooring', completed: false },
      { id: 'c9', label: 'Inspección final y certificado CO', completed: false }
    ]
  },
  {
    id: 'proj-2',
    projectNumber: 'FLIP-102',
    title: '3104 Portland Ave - Historic Craft Flip',
    address: '3104 Portland Ave, Louisville, KY 40212',
    county: 'Jefferson',
    state: 'KY',
    beds: 4,
    baths: 2.5,
    sqft: 1850,
    status: 'listed',
    purchasePrice: 65000,
    closingCosts: 3600,
    rehabBudget: 62000,
    holdingBudget: 4800,
    targetArv: 215000,
    actualSalePrice: 0,
    acquisitionDate: '2025-11-20',
    targetCompletionDate: '2026-05-10',
    notes: 'Restauración de molduras de madera originales, techo nuevo Owens Corning architectural, HVAC dual zone.',
    coverImage: '/images/hero-luxury-real-estate.jpg',
    checklist: [
      { id: 'c1', label: 'Demolición y limpieza de escombros', completed: true },
      { id: 'c2', label: 'Techo nuevo y bajantes', completed: true },
      { id: 'c3', label: 'Instalación sistema HVAC nuevo', completed: true },
      { id: 'c4', label: 'Drywall y enyesado de techos altos', completed: true },
      { id: 'c5', label: 'Gabinetes Shaker blancos y baños de azulejo', completed: true },
      { id: 'c6', label: 'Staging profesional y sesión fotográfica MLS', completed: true }
    ]
  },
  {
    id: 'proj-3',
    projectNumber: 'FLIP-103',
    title: '4412 Bellevue Ave - TZEL Auction Acquired',
    address: '4412 Bellevue Ave, Louisville, KY 40215',
    county: 'Jefferson',
    state: 'KY',
    beds: 3,
    baths: 1.5,
    sqft: 1250,
    status: 'acquisition',
    purchasePrice: 38000,
    closingCosts: 2400,
    rehabBudget: 35000,
    holdingBudget: 2800,
    targetArv: 139000,
    actualSalePrice: 0,
    acquisitionDate: '2026-06-28',
    targetCompletionDate: '2026-10-30',
    notes: 'Adquirido con descuento judicial identificado en TZEL Radar. Requiere remodelación de cocina, baño y pintura exterior.',
    coverImage: '/images/hero-clean-house.jpg',
    checklist: [
      { id: 'c1', label: 'Verificación de título y gravámenes (Lien Search)', completed: true },
      { id: 'c2', label: 'Cierre y transferencia de escritura con abogado', completed: true },
      { id: 'c3', label: 'Vaciado de muebles viejos (Trash out)', completed: false },
      { id: 'c4', label: 'Estimado de materiales y asignación de cuadrilla', completed: false }
    ]
  },
  {
    id: 'proj-4',
    projectNumber: 'FLIP-104',
    title: '715 E Market St - NuLu Urban Residence',
    address: '715 E Market St, Louisville, KY 40202',
    county: 'Jefferson',
    state: 'KY',
    beds: 2,
    baths: 2,
    sqft: 1120,
    status: 'sold',
    purchasePrice: 110000,
    closingCosts: 5200,
    rehabBudget: 55000,
    holdingBudget: 5600,
    targetArv: 249000,
    actualSalePrice: 254000,
    acquisitionDate: '2025-08-10',
    targetCompletionDate: '2026-02-15',
    notes: 'Vendido exitosamente por encima del precio de lista. Margen neto superior al 28%.',
    coverImage: '/images/hero-luxury-real-estate.jpg',
    checklist: [
      { id: 'c1', label: 'Remodelación completa finalizada', completed: true },
      { id: 'c2', label: 'Venta cerrada y fondos recibidos', completed: true }
    ]
  }
];

export const DEMO_EXPENSES = [
  {
    id: 'exp-1',
    projectId: 'proj-1',
    category: 'material',
    amount: 3840.50,
    vendor: 'Home Depot (Dixie Hwy)',
    date: '2026-03-20',
    description: 'Madera tratada 2x4, vigas de refuerzo, tornillería estructural y paneles OSB.',
    receiptUrl: '',
    paymentMethod: 'Tarjeta Corporativa GN'
  },
  {
    id: 'exp-2',
    projectId: 'proj-1',
    category: 'labor',
    amount: 4500.00,
    vendor: 'Cuadrilla González (Demolición & Framing)',
    date: '2026-03-25',
    description: 'Demolición total de muros divisorios y retiro de 2 dumpsters de 30 yardas.',
    receiptUrl: '',
    paymentMethod: 'Transferencia Bancaria'
  },
  {
    id: 'exp-3',
    projectId: 'proj-1',
    category: 'permit',
    amount: 680.00,
    vendor: 'Louisville Metro Codes & Regulations',
    date: '2026-03-18',
    description: 'Permiso de construcción residencial y tasa de inspección de estructura.',
    receiptUrl: '',
    paymentMethod: 'Tarjeta Débito'
  },
  {
    id: 'exp-4',
    projectId: 'proj-1',
    category: 'labor',
    amount: 3200.00,
    vendor: 'Kentucky Premier Plumbing LLC',
    date: '2026-04-05',
    description: 'Rough-in de plomería nueva en cocina, baño principal y medio baño. Tuberías PEX y desagüe PVC.',
    receiptUrl: '',
    paymentMethod: 'Cheque GN #1042'
  },
  {
    id: 'exp-5',
    projectId: 'proj-2',
    category: 'labor',
    amount: 8500.00,
    vendor: 'Barba Roofing Solutions',
    date: '2025-12-05',
    description: 'Techo completo nuevo: desmontaje de tejas viejas, ice & water shield y tejas Owens Corning.',
    receiptUrl: '',
    paymentMethod: 'Transferencia'
  },
  {
    id: 'exp-6',
    projectId: 'proj-2',
    category: 'material',
    amount: 6890.00,
    vendor: 'Floor & Decor (Louisville East)',
    date: '2026-01-15',
    description: 'Piso de vinilo de lujo LVP impermeable para planta baja y azulejo cerámico para baños.',
    receiptUrl: '',
    paymentMethod: 'Tarjeta GN Amex'
  }
];

export const DEMO_LEADS = [
  {
    id: 'lead-demo-1',
    fullName: 'Carlos Mendoza',
    phone: '(502) 555-0149',
    email: 'carlos.mendoza@gmail.com',
    address: '2214 Magazine St, Louisville, KY 40211',
    propertyType: 'single-family',
    bedrooms: '3',
    bathrooms: '1',
    occupancy: 'Vacante',
    condition: 'Requiere reparaciones mayores (techo goteando y cocina antigua)',
    timeline: 'Inmediato (< 7 días)',
    notes: 'Heredó la casa de su tío, vive en Indianápolis y necesita vender rápido al contado sin comisiones de agente.',
    source: 'Formulario 2 Pasos (Home)',
    submittedAt: '2026-09-12T14:20:00.000Z',
    status: 'new'
  },
  {
    id: 'lead-demo-2',
    fullName: 'Sarah Jenkins',
    phone: '(502) 555-0832',
    email: 'sjenkins.ky@outlook.com',
    address: '1108 Southwestern Pkwy, Louisville, KY 40211',
    propertyType: 'single-family',
    bedrooms: '4',
    bathrooms: '2',
    occupancy: 'Ocupada por inquilino con retraso',
    condition: 'Condición regular, necesita actualización de HVAC y pintura',
    timeline: '1-30 días',
    notes: 'Cansada de lidiar con inquilinos morosos. Quiere oferta neta en efectivo para cerrar antes de fin de mes.',
    source: 'Formulario Rápido Hero',
    submittedAt: '2026-09-11T18:45:00.000Z',
    status: 'contacted'
  }
];

export const crmStore = {
  // --- Initialization (DO NOT auto-seed mock data; keep clean arrays) ---
  _init() {
    if (localStorage.getItem(STORAGE_KEY_PROJECTS) === null) {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify([]));
    }
    if (localStorage.getItem(STORAGE_KEY_EXPENSES) === null) {
      localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify([]));
    }
    if (localStorage.getItem(STORAGE_KEY_LEADS) === null) {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify([]));
    }
  },

  isLegacyDemoActive() {
    const projects = this.getProjects();
    return projects.some(p => p.id === 'proj-1' || p.id === 'proj-2' || p.id === 'proj-3' || p.id === 'proj-4');
  },

  // --- Projects Management ---
  getProjects() {
    this._init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_PROJECTS) || '[]');
    } catch {
      return [];
    }
  },

  getProject(id) {
    const projects = this.getProjects();
    return projects.find(p => p.id === id) || null;
  },

  saveProject(projectData) {
    this._init();
    const projects = this.getProjects();
    if (projectData.id) {
      const index = projects.findIndex(p => p.id === projectData.id);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...projectData, updatedAt: new Date().toISOString() };
      } else {
        projects.unshift(projectData);
      }
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
      return projectData;
    } else {
      const newProj = {
        ...projectData,
        id: 'proj-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        projectNumber: 'FLIP-' + (projects.length + 101),
        createdAt: new Date().toISOString()
      };
      projects.unshift(newProj);
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
      return newProj;
    }
  },

  deleteProject(id) {
    this._init();
    let projects = this.getProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    // Also clean associated expenses
    let expenses = this.getExpenses().filter(e => e.projectId !== id);
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  },

  // --- Expenses Management ---
  getExpenses(projectId = null) {
    this._init();
    try {
      let expenses = JSON.parse(localStorage.getItem(STORAGE_KEY_EXPENSES) || '[]');
      if (projectId) {
        expenses = expenses.filter(e => e.projectId === projectId);
      }
      return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch {
      return [];
    }
  },

  saveExpense(expenseData) {
    this._init();
    const expenses = this.getExpenses();
    const amount = Number(expenseData.amount || 0);

    if (expenseData.id) {
      const idx = expenses.findIndex(e => e.id === expenseData.id);
      if (idx !== -1) {
        expenses[idx] = { ...expenses[idx], ...expenseData, amount, updatedAt: new Date().toISOString() };
      }
    } else {
      const newExpense = {
        ...expenseData,
        id: 'exp-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        amount,
        createdAt: new Date().toISOString()
      };
      expenses.unshift(newExpense);
    }
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  },

  deleteExpense(id) {
    this._init();
    const expenses = this.getExpenses().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  },

  // --- Inbound Web Leads Management ---
  getLeads() {
    this._init();
    try {
      const rawLeads = JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || '[]');
      return rawLeads.map(l => ({
        id: l.id || ('lead-' + Math.random().toString(36).substring(2, 9)),
        fullName: l.fullName || l.name || 'Propietario / Vendedor',
        phone: l.phone || '',
        email: l.email || '',
        address: l.address || 'Dirección no especificada',
        propertyType: l.propertyType || 'single-family',
        bedrooms: l.bedrooms || '',
        bathrooms: l.bathrooms || '',
        occupancy: l.occupancy || '',
        condition: l.condition || '',
        timeline: l.timeline || l.timeframe || '',
        reason: l.reason || '',
        notes: l.notes || '',
        source: l.source || 'Web Pública',
        submittedAt: l.submittedAt || new Date().toISOString(),
        status: l.status || 'new', // 'new' | 'contacted' | 'visited' | 'offered' | 'contract' | 'closed' | 'discarded'
        convertedProjectId: l.convertedProjectId || null
      })).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    } catch {
      return [];
    }
  },

  getLead(id) {
    const leads = this.getLeads();
    return leads.find(l => l.id === id) || null;
  },

  saveLead(leadData) {
    this._init();
    const leads = this.getLeads();
    if (leadData.id) {
      const idx = leads.findIndex(l => l.id === leadData.id);
      if (idx !== -1) {
        leads[idx] = { ...leads[idx], ...leadData, updatedAt: new Date().toISOString() };
      } else {
        leads.unshift(leadData);
      }
    } else {
      const newLead = {
        ...leadData,
        id: 'lead-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        submittedAt: leadData.submittedAt || new Date().toISOString(),
        status: leadData.status || 'new'
      };
      leads.unshift(newLead);
    }
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  },

  updateLeadStatus(leadId, newStatus) {
    this._init();
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      lead.status = newStatus;
      lead.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    }
  },

  deleteLead(leadId) {
    this._init();
    const leads = this.getLeads().filter(l => l.id !== leadId);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  },

  // 1-Click: Convert an inbound web seller lead into a real Fix & Flip Project
  convertLeadToProject(leadId, overrides = {}) {
    this._init();
    const lead = this.getLead(leadId);
    if (!lead) return null;

    const projects = this.getProjects();
    const title = overrides.title || (lead.address ? lead.address.split(',')[0] : `Inmueble de ${lead.fullName}`);
    
    const newProj = {
      id: 'proj-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      projectNumber: 'FLIP-' + (projects.length + 101),
      title: title,
      address: overrides.address || lead.address,
      county: overrides.county || 'Jefferson',
      state: 'KY',
      beds: Number(lead.bedrooms) || 3,
      baths: Number(lead.bathrooms) || 2,
      sqft: Number(overrides.sqft) || 1400,
      status: 'acquisition',
      purchasePrice: Number(overrides.purchasePrice || 45000),
      closingCosts: Number(overrides.closingCosts || 2500),
      rehabBudget: Number(overrides.rehabBudget || 40000),
      holdingBudget: Number(overrides.holdingBudget || 3000),
      targetArv: Number(overrides.targetArv || 155000),
      actualSalePrice: 0,
      acquisitionDate: new Date().toISOString().split('T')[0],
      targetCompletionDate: overrides.targetCompletionDate || '',
      notes: `Convertido automáticamente desde Lead Web (#${lead.id}).\nVendedor: ${lead.fullName}\nTeléfono: ${lead.phone}\nEmail: ${lead.email}\nCondición reportada: ${lead.condition || 'N/A'}\nNotas adicionales: ${lead.notes || 'Ninguna'}`,
      coverImage: '/images/hero-clean-house.jpg',
      sourceLeadId: lead.id,
      createdAt: new Date().toISOString(),
      checklist: [
        { id: 'c1', label: 'Búsqueda de gravámenes y estudio de título con abogado', completed: true },
        { id: 'c2', label: 'Firma de contrato de compraventa y apertura de Escrow', completed: true },
        { id: 'c3', label: 'Cierre formal y transferencia de llaves', completed: false },
        { id: 'c4', label: 'Trash-out / Vaciado completo y contenedor de escombros', completed: false },
        { id: 'c5', label: 'Inspección de contratistas y cotización detallada de materiales', completed: false },
        { id: 'c6', label: 'Gestión de permisos ante Louisville Metro Codes & Regs', completed: false }
      ]
    };

    projects.unshift(newProj);
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));

    // Update lead status to contract & link project
    lead.status = 'contract';
    lead.convertedProjectId = newProj.id;
    this.saveLead(lead);

    return newProj;
  },

  // --- Financial Computations ---
  computeProjectFinancials(projectId) {
    const project = this.getProject(projectId);
    if (!project) return null;

    const expenses = this.getExpenses(projectId);
    const purchasePrice = Number(project.purchasePrice || 0);
    const closingCosts = Number(project.closingCosts || 0);
    const holdingBudget = Number(project.holdingBudget || 0);
    const rehabBudget = Number(project.rehabBudget || 0);

    // Sum expenses by category
    const materialSpent = expenses.filter(e => e.category === 'material').reduce((acc, e) => acc + Number(e.amount), 0);
    const laborSpent = expenses.filter(e => e.category === 'labor').reduce((acc, e) => acc + Number(e.amount), 0);
    const permitsSpent = expenses.filter(e => e.category === 'permit').reduce((acc, e) => acc + Number(e.amount), 0);
    const holdingSpent = expenses.filter(e => e.category === 'holding').reduce((acc, e) => acc + Number(e.amount), 0);
    const closingSpent = expenses.filter(e => e.category === 'closing').reduce((acc, e) => acc + Number(e.amount), 0);
    const otherSpent = expenses.filter(e => e.category === 'other').reduce((acc, e) => acc + Number(e.amount), 0);

    const totalRehabSpent = materialSpent + laborSpent + permitsSpent + otherSpent;
    const totalExpensesSpent = expenses.reduce((acc, e) => acc + Number(e.amount), 0);

    // Total Cash Invested / Cost Basis
    const totalBasis = purchasePrice + totalExpensesSpent + (closingSpent === 0 ? closingCosts : 0);

    // Target Revenue / ARV
    const saleRevenue = project.status === 'sold' && project.actualSalePrice > 0 
      ? Number(project.actualSalePrice) 
      : Number(project.targetArv || 0);

    // Net Profit & ROI
    const netProfit = saleRevenue - totalBasis;
    const roi = totalBasis > 0 ? Number(((netProfit / totalBasis) * 100).toFixed(1)) : 0;
    const rehabBudgetVariance = rehabBudget - totalRehabSpent;

    return {
      purchasePrice,
      closingCosts,
      rehabBudget,
      holdingBudget,
      materialSpent,
      laborSpent,
      permitsSpent,
      holdingSpent,
      closingSpent,
      otherSpent,
      totalRehabSpent,
      totalExpensesSpent,
      totalBasis,
      saleRevenue,
      netProfit,
      roi,
      rehabBudgetVariance,
      isUnderBudget: rehabBudgetVariance >= 0,
      expenseCount: expenses.length
    };
  },

  // Global Executive Metrics for Dashboard
  getGlobalMetrics() {
    const projects = this.getProjects();
    const expenses = this.getExpenses();
    const leads = this.getLeads();

    let totalPurchaseCapital = 0;
    let totalRehabBudget = 0;
    let totalTargetArv = 0;
    let totalNetProfit = 0;

    projects.forEach(p => {
      const fin = this.computeProjectFinancials(p.id);
      if (fin) {
        totalPurchaseCapital += fin.purchasePrice;
        totalRehabBudget += fin.rehabBudget;
        totalTargetArv += fin.saleRevenue;
        totalNetProfit += fin.netProfit;
      }
    });

    const totalSpentAllExpenses = expenses.reduce((acc, e) => acc + Number(e.amount), 0);
    const totalMaterialsSpent = expenses.filter(e => e.category === 'material').reduce((acc, e) => acc + Number(e.amount), 0);
    const totalLaborSpent = expenses.filter(e => e.category === 'labor').reduce((acc, e) => acc + Number(e.amount), 0);
    const totalPermitsSpent = expenses.filter(e => e.category === 'permit').reduce((acc, e) => acc + Number(e.amount), 0);
    const totalHoldingSpent = expenses.filter(e => e.category === 'holding').reduce((acc, e) => acc + Number(e.amount), 0);

    const activeCount = projects.filter(p => p.status === 'rehab' || p.status === 'acquisition' || p.status === 'listed').length;
    const soldCount = projects.filter(p => p.status === 'sold').length;

    // Current month expenses
    const currentMonthPrefix = new Date().toISOString().substring(0, 7);
    const currentMonthExpenses = expenses
      .filter(e => e.date && e.date.startsWith(currentMonthPrefix))
      .reduce((acc, e) => acc + Number(e.amount), 0);

    const totalInvestedCapital = totalPurchaseCapital + totalSpentAllExpenses;

    // Lead metrics
    const newLeadsCount = leads.filter(l => l.status === 'new').length;
    const inNegotiationLeadsCount = leads.filter(l => ['contacted', 'visited', 'offered'].includes(l.status)).length;
    const convertedLeadsCount = leads.filter(l => ['contract', 'closed'].includes(l.status)).length;

    return {
      activeProjectsCount: activeCount,
      soldProjectsCount: soldCount,
      totalProjectsCount: projects.length,
      totalPurchaseCapital,
      totalSpentAllExpenses,
      totalMaterialsSpent,
      totalLaborSpent,
      totalPermitsSpent,
      totalHoldingSpent,
      totalRehabBudget,
      totalTargetArv,
      totalNetProfit,
      currentMonthExpenses,
      averageRoi: totalInvestedCapital > 0 && projects.length > 0
        ? Number(((totalNetProfit / totalInvestedCapital) * 100).toFixed(1)) 
        : 0,
      totalLeadsCount: leads.length,
      newLeadsCount,
      inNegotiationLeadsCount,
      convertedLeadsCount
    };
  },

  // --- Database Export & Import ---
  exportDatabase() {
    const backupData = {
      meta: {
        app: 'GN Investment Real Estate Operating System',
        exportedAt: new Date().toISOString(),
        version: '2.0'
      },
      projects: this.getProjects(),
      expenses: this.getExpenses(),
      leads: this.getLeads()
    };

    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GN_Investment_BD_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  importDatabase(jsonString) {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (!data || typeof data !== 'object') {
        throw new Error('Formato de archivo inválido.');
      }

      if (Array.isArray(data.projects)) {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(data.projects));
      }
      if (Array.isArray(data.expenses)) {
        localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(data.expenses));
      }
      if (Array.isArray(data.leads)) {
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(data.leads));
      }

      return {
        success: true,
        projectsCount: (data.projects || []).length,
        expensesCount: (data.expenses || []).length,
        leadsCount: (data.leads || []).length
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Error al procesar el archivo JSON.'
      };
    }
  },

  // Export Expenses to CSV
  exportExpensesCsv() {
    const expenses = this.getExpenses();
    const projects = this.getProjects();
    const projMap = {};
    projects.forEach(p => { projMap[p.id] = p.address; });

    let csvContent = 'ID,Fecha,Propiedad,Categoria,Proveedor,Monto,MetodoPago,Descripcion\n';
    expenses.forEach(e => {
      const propAddr = (projMap[e.projectId] || 'General').replace(/,/g, ' ');
      const desc = (e.description || '').replace(/,/g, ';').replace(/\n/g, ' ');
      const vendor = (e.vendor || '').replace(/,/g, ' ');
      csvContent += `${e.id},${e.date},"${propAddr}",${e.category},"${vendor}",${e.amount},"${e.paymentMethod || 'N/A'}","${desc}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `GN_Investment_Gastos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Export Leads to CSV
  exportLeadsCsv() {
    const leads = this.getLeads();
    let csvContent = 'ID,Fecha,Nombre,Telefono,Email,Direccion,TipoPropiedad,Hab,Banos,Condicion,Urgencia,Estado,Origen,Notas\n';
    leads.forEach(l => {
      const addr = (l.address || '').replace(/,/g, ' ');
      const name = (l.fullName || '').replace(/,/g, ' ');
      const notes = (l.notes || '').replace(/,/g, ';').replace(/\n/g, ' ');
      const cond = (l.condition || '').replace(/,/g, ';');
      csvContent += `${l.id},${l.submittedAt},"${name}",${l.phone},${l.email},"${addr}",${l.propertyType},${l.bedrooms},${l.bathrooms},"${cond}","${l.timeline}",${l.status},"${l.source}","${notes}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `GN_Investment_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Clear all data to start 100% clean
  clearAllData() {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify([]));
    // Notice: we can also keep or clear leads if requested
  },

  clearEverything() {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify([]));
  },

  // Reset demo data if explicitly asked by user
  resetToDemo() {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(DEMO_PROJECTS));
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(DEMO_EXPENSES));
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(DEMO_LEADS));
  }
};
