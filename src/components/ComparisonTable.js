export function renderComparisonTable() {
  const rows = [
    {
      factor: "Agent Commissions",
      gn: "0% ($0 Commission)",
      traditional: "5% – 6% of sale price"
    },
    {
      factor: "Closing Costs",
      gn: "100% Paid by G&N",
      traditional: "2% – 4% paid out of pocket"
    },
    {
      factor: "Required Repairs & Cleanout",
      gn: "Zero (100% As-Is)",
      traditional: "Mandatory fixes & staging"
    },
    {
      factor: "Public Showings & Open Houses",
      gn: "1 Private Confidential Visit",
      traditional: "Dozens of stranger tours"
    },
    {
      factor: "Closing Timeline",
      gn: "7 to 14 Days (You Choose)",
      traditional: "60 to 90+ Days average"
    },
    {
      factor: "Financing Risk & Appraisal",
      gn: "None (Private Direct Capital)",
      traditional: "High risk of mortgage fallout"
    }
  ];

  return `
    <div class="w-full">
      <!-- High-Contrast Mobile Comparison View (No Bulky Dark Containers) -->
      <div class="flex flex-col gap-6 md:hidden">
        
        <!-- Direct Buyer Section (G&N) -->
        <div class="bg-white rounded-2xl p-6 border border-black/10 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-black/8 pb-3">
            <div>
              <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b88a76]">DIRECT CAPITAL</span>
              <h3 class="text-xl font-black text-[#111315] font-['Playfair_Display',serif]">G&amp;N Investment</h3>
            </div>
            <span class="bg-[#111315] text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
              RECOMMENDED
            </span>
          </div>

          <ul class="flex flex-col divide-y divide-black/6 text-sm">
            ${rows.map(r => `
              <li class="py-3 flex items-start gap-3">
                <span class="material-symbols-outlined text-green-600 text-[20px] shrink-0 mt-0.5">check_circle</span>
                <div class="flex flex-col">
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#717580]">${r.factor}</span>
                  <span class="text-sm font-bold text-[#111315]">${r.gn}</span>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Traditional Agent Section -->
        <div class="bg-[#ede9df] rounded-2xl p-6 border border-black/8 shadow-xs flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-black/8 pb-3">
            <div>
              <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-[#717580]">TRADITIONAL ROUTE</span>
              <h3 class="text-xl font-bold text-[#111315] font-['Playfair_Display',serif]">MLS Real Estate Agent</h3>
            </div>
            <span class="bg-black/10 text-[#555964] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
              Standard MLS
            </span>
          </div>

          <ul class="flex flex-col divide-y divide-black/6 text-sm">
            ${rows.map(r => `
              <li class="py-3 flex items-start gap-3 opacity-90">
                <span class="material-symbols-outlined text-red-600 text-[20px] shrink-0 mt-0.5">cancel</span>
                <div class="flex flex-col">
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#717580]">${r.factor}</span>
                  <span class="text-sm text-[#111315] font-medium">${r.traditional}</span>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

      </div>

      <!-- High-Contrast Desktop Comparison Matrix -->
      <div class="hidden md:block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-black/10 bg-[#f0ece4]">
              <th class="p-5 text-[#111315] font-bold text-sm uppercase tracking-wider font-mono w-1/3">Selling Factors</th>
              <th class="p-5 bg-white text-[#111315] font-extrabold text-base w-1/3 text-center border-x border-black/10">
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#b88a76] block">Direct Buyer</span>
                G&amp;N Investment
              </th>
              <th class="p-5 text-[#555964] font-bold text-sm uppercase tracking-wider font-mono w-1/3 text-center">
                Traditional Real Estate Agent
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black/8 text-sm">
            ${rows.map(r => `
              <tr class="hover:bg-black/[0.015] transition-colors">
                <td class="p-5 font-bold text-[#111315]">${r.factor}</td>
                <td class="p-5 bg-white font-bold text-[#111315] text-center border-x border-black/10">
                  <span class="inline-flex items-center gap-1.5 text-green-700">
                    <span class="material-symbols-outlined text-[18px]">check_circle</span>
                    ${r.gn}
                  </span>
                </td>
                <td class="p-5 text-[#555964] text-center">
                  <span class="inline-flex items-center gap-1.5 text-red-600 font-medium">
                    <span class="material-symbols-outlined text-[18px]">cancel</span>
                    ${r.traditional}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
