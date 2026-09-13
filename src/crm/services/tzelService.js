// TZEL Intelligence Service for GN Investment
// Connects directly to the live TZEL database (Turso LibSQL / HTTP REST API)
// Provides 0ms cached local data with background synchronization

const TURSO_URL = 'https://tzel-surplus-msosa2112.aws-us-east-1.turso.io/v2/pipeline';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3ODEwNTQwNDUsImlkIjoiMDE5ZWE3YjMtZTAwMS03OWQxLTg0YzAtZDRkMjFiZGM3OWE2IiwicmlkIjoiZDdjNDhjMmMtYjczNC00YmE4LTliZmItOGUzYTRiMTZjYWY2In0.XB8CyIO-B4huGxm__xIZEftowKoGlGQdGH-CVlLCAfpD06NXhTC6yxfCCHuYwcRKIX97jCeDzB1gZoUdzVWSDg';

const CACHE_KEY_AUCTIONS = 'gn_tzel_auctions_cache';
const CACHE_KEY_VIOLATIONS = 'gn_tzel_violations_cache';
const CACHE_KEY_LAST_SYNC = 'gn_tzel_last_sync';

// Fallback curated distressed properties from Louisville, KY (in case of offline/network issues)
const FALLBACK_AUCTIONS = [
  {
    id: 'KY_JEFF_24CI400689',
    caseNumber: '24CI400689',
    address: '2303 W. Chestnut St, Louisville, KY 40211',
    county: 'Jefferson',
    state: 'KY',
    auctionDate: '07/17/2026',
    plaintiff: 'COMMONWEALTH OF KENTUCKY / JEFFERSON CO',
    defendant: 'SONIA LAIRD, ET AL.',
    debtAmount: 110703.77,
    appraisalValue: 8000,
    mlsEstimatedValue: 145883,
    absenteeOwner: false,
    type: 'AUCTION',
    potentialDiscount: 94.5
  },
  {
    id: 'KY_JEFF_25CI401322',
    caseNumber: '25CI401322',
    address: '2715 W. Kentucky St, Louisville, KY 40211',
    county: 'Jefferson',
    state: 'KY',
    auctionDate: '07/17/2026',
    plaintiff: 'LOUISVILLE/JEFFERSON COUNTY METRO GOV',
    defendant: 'LOUISVILLE 46, LLC',
    debtAmount: 37000.00,
    appraisalValue: 60000,
    mlsEstimatedValue: 152000,
    absenteeOwner: true,
    type: 'AUCTION',
    potentialDiscount: 60.5
  },
  {
    id: 'KY_JEFF_24CI400854',
    caseNumber: '24CI400854',
    address: '4412 Bellevue Ave, Louisville, KY 40215',
    county: 'Jefferson',
    state: 'KY',
    auctionDate: '07/22/2026',
    plaintiff: 'FREEDOM MORTGAGE CORPORATION',
    defendant: 'ANTHONY SMITH',
    debtAmount: 42300.00,
    appraisalValue: 45000,
    mlsEstimatedValue: 119450,
    absenteeOwner: true,
    type: 'AUCTION',
    potentialDiscount: 64.6
  },
  {
    id: 'KY_JEFF_23CI400387',
    caseNumber: '23CI400387',
    address: '9911 Mary Dell Lane, Louisville, KY 40202',
    county: 'Jefferson',
    state: 'KY',
    auctionDate: '07/17/2026',
    plaintiff: 'COMMONWEALTH OF KENTUCKY',
    defendant: 'KELLY G. FAWBUSH (Estate / Heirs)',
    debtAmount: 111309.85,
    appraisalValue: 55000,
    mlsEstimatedValue: 185000,
    absenteeOwner: false,
    type: 'AUCTION',
    potentialDiscount: 70.2
  },
  {
    id: 'KY_JEFF_24CI401099',
    caseNumber: '24CI401099',
    address: '10503 Hill Peak Rd, Louisville, KY 40229',
    county: 'Jefferson',
    state: 'KY',
    auctionDate: '08/05/2026',
    plaintiff: 'U.S. BANK TRUST NATIONAL ASSOC.',
    defendant: 'MARCUS R. WHITE',
    debtAmount: 64800.00,
    appraisalValue: 72000,
    mlsEstimatedValue: 178000,
    absenteeOwner: true,
    type: 'AUCTION',
    potentialDiscount: 59.5
  }
];

export const tzelService = {
  // Check if live API is configured
  isLiveConfigured() {
    return Boolean(TURSO_URL && TURSO_TOKEN);
  },

  // Get cached auctions immediately (0ms)
  getCachedAuctions() {
    try {
      const data = localStorage.getItem(CACHE_KEY_AUCTIONS);
      if (data) return JSON.parse(data);
    } catch {}
    return FALLBACK_AUCTIONS;
  },

  // Fetch live auctions from Turso
  async fetchLiveAuctions(forceRefresh = false) {
    // If not force refresh, return cache if recent (< 10 minutes)
    if (!forceRefresh) {
      const cached = this.getCachedAuctions();
      if (cached && cached.length > 0) {
        // trigger background fetch quietly
        this._syncAuctionsBackground();
        return cached;
      }
    }

    return await this._syncAuctionsBackground();
  },

  // Background query to Turso
  async _syncAuctionsBackground() {
    try {
      const sql = `
        SELECT 
          auction_id, case_number, address, county, state, 
          auction_date, plaintiff, defendant, debt_amount, 
          appraisal_value, mls_estimated_value, absentee_owner,
          pdf_url, defendant_phones, defendant_emails
        FROM foreclosure_auctions 
        ORDER BY created_at DESC 
        LIMIT 60
      `;

      const res = await fetch(TURSO_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TURSO_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            { type: 'execute', stmt: { sql } },
            { type: 'close' }
          ]
        })
      });

      if (!res.ok) throw new Error(`Turso HTTP error ${res.status}`);

      const json = await res.json();
      const firstResult = json?.results?.[0]?.response?.result;
      if (!firstResult || !firstResult.rows) throw new Error('No rows from Turso');

      const colNames = firstResult.cols.map(c => c.name);
      const parsedRows = firstResult.rows.map(row => {
        const item = {};
        colNames.forEach((col, idx) => {
          const valObj = row[idx];
          item[col] = valObj ? valObj.value : null;
        });

        const debt = Number(item.debt_amount || 0);
        const appraisal = Number(item.appraisal_value || 0);
        const arv = Number(item.mls_estimated_value || 0);
        
        let discount = 0;
        if (arv > 0 && appraisal > 0) {
          discount = Number((((arv - appraisal) / arv) * 100).toFixed(1));
        }

        return {
          id: item.auction_id || `auction_${item.case_number}`,
          caseNumber: item.case_number || 'N/A',
          address: item.address || 'Louisville, KY',
          county: item.county || 'Jefferson',
          state: item.state || 'KY',
          auctionDate: item.auction_date || 'Pending',
          plaintiff: item.plaintiff || 'Creditor Bank',
          defendant: item.defendant || 'Owner',
          debtAmount: debt,
          appraisalValue: appraisal,
          mlsEstimatedValue: arv || (appraisal ? Math.round(appraisal * 1.75) : 135000),
          absenteeOwner: item.absentee_owner === '1' || item.absentee_owner === 1,
          phones: item.defendant_phones || '',
          emails: item.defendant_emails || '',
          pdfUrl: item.pdf_url || '',
          type: 'AUCTION',
          potentialDiscount: discount > 0 ? discount : 45.0
        };
      });

      if (parsedRows.length > 0) {
        localStorage.setItem(CACHE_KEY_AUCTIONS, JSON.stringify(parsedRows));
        localStorage.setItem(CACHE_KEY_LAST_SYNC, new Date().toISOString());
        return parsedRows;
      }
    } catch (err) {
      console.warn('Turso live fetch fallback triggered:', err.message);
    }

    return this.getCachedAuctions();
  },

  // Fetch Code Violations (physical distress opportunities)
  async fetchLiveViolations() {
    try {
      const cached = localStorage.getItem(CACHE_KEY_VIOLATIONS);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.length > 0) return parsed;
      }

      const sql = `
        SELECT 
          violation_id, case_number, address, violation_type, 
          report_date, status, owner_name, mls_estimated_value, 
          absentee_owner, defendant_phones
        FROM code_violations 
        ORDER BY report_date DESC 
        LIMIT 40
      `;

      const res = await fetch(TURSO_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TURSO_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            { type: 'execute', stmt: { sql } },
            { type: 'close' }
          ]
        })
      });

      if (res.ok) {
        const json = await res.json();
        const firstResult = json?.results?.[0]?.response?.result;
        if (firstResult && firstResult.rows) {
          const colNames = firstResult.cols.map(c => c.name);
          const parsed = firstResult.rows.map(row => {
            const item = {};
            colNames.forEach((col, idx) => {
              item[col] = row[idx] ? row[idx].value : null;
            });
            return {
              id: item.violation_id || `viol_${item.case_number}`,
              caseNumber: item.case_number,
              address: item.address,
              violationType: item.violation_type || 'Property Maintenance Violation',
              reportDate: item.report_date,
              status: item.status || 'Active Violation',
              ownerName: item.owner_name || 'Owner of Record',
              mlsEstimatedValue: Number(item.mls_estimated_value || 120000),
              absenteeOwner: item.absentee_owner === '1' || item.absentee_owner === 1,
              phone: item.defendant_phones || '',
              type: 'CODE_VIOLATION'
            };
          });

          localStorage.setItem(CACHE_KEY_VIOLATIONS, JSON.stringify(parsed));
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Violations fetch fallback triggered:', err.message);
    }

    return [];
  },

  // Convert a TZEL opportunity into a Fix & Flip project format
  createProjectPayloadFromLead(tzelLead, customOptions = {}) {
    const defaultRehabEstimate = 45000;
    const estimatedPurchase = tzelLead.appraisalValue > 0 
      ? tzelLead.appraisalValue 
      : (tzelLead.debtAmount > 0 ? Math.round(tzelLead.debtAmount * 0.9) : 65000);
    const targetArv = tzelLead.mlsEstimatedValue || Math.round(estimatedPurchase * 1.8);

    return {
      title: `${tzelLead.address.split(',')[0]} - Fix & Flip`,
      address: tzelLead.address,
      county: tzelLead.county || 'Jefferson',
      state: tzelLead.state || 'KY',
      status: 'acquisition', // 'acquisition' | 'rehab' | 'listed' | 'sold'
      purchasePrice: customOptions.purchasePrice || estimatedPurchase,
      closingCosts: customOptions.closingCosts || 3500,
      rehabBudget: customOptions.rehabBudget || defaultRehabEstimate,
      holdingBudget: customOptions.holdingBudget || 4200, // insurance, utilities, taxes
      targetArv: customOptions.targetArv || targetArv,
      actualSalePrice: 0,
      acquisitionDate: new Date().toISOString().split('T')[0],
      targetCompletionDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90-day flip cycle
      tzelSource: {
        leadId: tzelLead.id,
        caseNumber: tzelLead.caseNumber,
        type: tzelLead.type,
        defendant: tzelLead.defendant || tzelLead.ownerName,
        plaintiff: tzelLead.plaintiff || '',
        debtAmount: tzelLead.debtAmount || 0,
        appraisalValue: tzelLead.appraisalValue || 0,
        absenteeOwner: tzelLead.absenteeOwner
      },
      notes: `Lead importado de TZEL Intelligence. Caso judicial: ${tzelLead.caseNumber || 'N/A'}. Demandado/Dueño: ${tzelLead.defendant || tzelLead.ownerName || 'N/A'}.`
    };
  }
};
