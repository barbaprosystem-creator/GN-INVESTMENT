export function renderSavingsCalculator() {
  return `
    <div class="w-full glass-glow-card rounded-3xl p-5 sm:p-8 relative overflow-hidden" id="savingsCalculatorContainer">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/50 pb-4 mb-6">
        <div>
          <span class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
            <span class="status-dot"></span> Interactive Fee &amp; Timeline Estimator
          </span>
          <h3 class="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">
            How Much Do You Save With G&amp;N?
          </h3>
        </div>
        <div class="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
          0% Realtor Fees
        </div>
      </div>

      <!-- Slider Section -->
      <div class="flex flex-col gap-3 mb-8">
        <div class="flex items-center justify-between">
          <label class="text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider">
            Estimated Home Value:
          </label>
          <span id="sliderValueDisplay" class="font-headline-md text-2xl sm:text-3xl font-bold text-primary">
            $300,000
          </span>
        </div>

        <input
          type="range"
          id="homeValueRange"
          min="100000"
          max="650000"
          step="10000"
          value="300000"
          class="w-full cursor-pointer transition-all"
        />

        <div class="flex justify-between text-[11px] text-on-surface-variant/60 font-medium px-0.5">
          <span>$100,000</span>
          <span>$300,000</span>
          <span>$500,000</span>
          <span>$650,000+</span>
        </div>
      </div>

      <!-- Live Comparison Result Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Traditional Listing Breakdown -->
        <div class="bg-white/40 border border-red-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-red-500/10 pb-2 mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-red-600">Traditional Realtor Sale</span>
              <span class="text-[11px] text-red-700 bg-red-100 px-2 py-0.5 rounded-full font-bold">~90 Days</span>
            </div>

            <div class="flex flex-col gap-2 text-xs text-on-surface-variant">
              <div class="flex justify-between">
                <span>Agent Commission (6%):</span>
                <span id="calcAgentFee" class="font-semibold text-red-600">-$18,000</span>
              </div>
              <div class="flex justify-between">
                <span>Seller Closing Costs (3%):</span>
                <span id="calcClosingFee" class="font-semibold text-red-600">-$9,000</span>
              </div>
              <div class="flex justify-between">
                <span>Repairs &amp; Staging Est.:</span>
                <span id="calcRepairFee" class="font-semibold text-red-600">-$10,000</span>
              </div>
              <div class="flex justify-between">
                <span>Holding / Mortgage (3 mos):</span>
                <span id="calcHoldingFee" class="font-semibold text-red-600">-$4,500</span>
              </div>
            </div>
          </div>

          <div class="border-t border-red-500/20 pt-3 mt-4 flex items-center justify-between font-bold">
            <span class="text-xs text-on-surface">Total Deductions:</span>
            <span id="calcTotalDeductions" class="text-sm text-red-600 font-mono">-$41,500</span>
          </div>
        </div>

        <!-- G&N Direct Sale Highlight -->
        <div class="bg-primary/10 border-2 border-primary/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/10 blur-xl pointer-events-none"></div>

          <div>
            <div class="flex items-center justify-between border-b border-primary/20 pb-2 mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-primary">G&amp;N Direct Purchase</span>
              <span class="text-[11px] text-primary font-bold bg-primary/20 px-2.5 py-0.5 rounded-full">7 - 14 Days</span>
            </div>

            <div class="flex flex-col gap-2 text-xs text-on-surface">
              <div class="flex justify-between">
                <span>Agent Commission:</span>
                <span class="font-bold text-green-700">✓ $0.00 (Zero)</span>
              </div>
              <div class="flex justify-between">
                <span>Closing Costs:</span>
                <span class="font-bold text-green-700">✓ $0.00 (100% Paid)</span>
              </div>
              <div class="flex justify-between">
                <span>Repair / Cleaning Expenses:</span>
                <span class="font-bold text-green-700">✓ $0.00 (100% As-Is)</span>
              </div>
              <div class="flex justify-between">
                <span>Holding Costs:</span>
                <span class="font-bold text-green-700">✓ $0.00 (Fast Close)</span>
              </div>
            </div>
          </div>

          <div class="border-t border-primary/20 pt-3 mt-4 flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-on-surface">Estimated Savings Kept:</span>
              <span id="calcTotalSaved" class="font-headline-md text-lg sm:text-xl font-bold text-primary font-mono">
                +$41,500
              </span>
            </div>
            <span class="text-[10px] text-primary/80 font-medium">Money staying directly in your bank account</span>
          </div>
        </div>
      </div>

      <!-- Quick Action Button -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p class="text-xs text-on-surface-variant/70 text-center sm:text-left">
          Ready to skip the fees and hassle? Get your official written offer in 24h.
        </p>
        <a href="#get-offer" data-nav="get-offer" class="shimmer-btn w-full sm:w-auto bg-primary text-on-primary font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary/90 cursor-pointer">
          <span>Lock In My Direct Offer</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
    </div>
  `;
}

export function initSavingsCalculator() {
  const slider = document.getElementById('homeValueRange');
  if (!slider) return;

  const display = document.getElementById('sliderValueDisplay');
  const agentFee = document.getElementById('calcAgentFee');
  const closingFee = document.getElementById('calcClosingFee');
  const repairFee = document.getElementById('calcRepairFee');
  const holdingFee = document.getElementById('calcHoldingFee');
  const totalDeductions = document.getElementById('calcTotalDeductions');
  const totalSaved = document.getElementById('calcTotalSaved');

  function update() {
    const val = parseInt(slider.value, 10);
    const agent = Math.round(val * 0.06);
    const closing = Math.round(val * 0.03);
    const repair = Math.round(val * 0.035);
    const holding = Math.round(val * 0.015);
    const deductions = agent + closing + repair + holding;

    display.innerText = `$${val.toLocaleString()}`;
    agentFee.innerText = `-$${agent.toLocaleString()}`;
    closingFee.innerText = `-$${closing.toLocaleString()}`;
    repairFee.innerText = `-$${repair.toLocaleString()}`;
    holdingFee.innerText = `-$${holding.toLocaleString()}`;
    totalDeductions.innerText = `-$${deductions.toLocaleString()}`;
    totalSaved.innerText = `+$${deductions.toLocaleString()}`;
  }

  slider.addEventListener('input', update);
  update();
}
