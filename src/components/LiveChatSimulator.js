export function renderLiveChatSimulator() {
  return `
    <div class="w-full max-w-lg mx-auto glass-glow-card rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative my-6" id="liveChatSimulator">
      <!-- Chat Header -->
      <div class="bg-[#181c25]/90 backdrop-blur-xl px-4 py-3.5 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative flex items-center justify-center">
            <img alt="G&N Specialist" class="h-9 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" src="/images/gn-logo-transparent.png" />
            <span class="status-dot absolute -bottom-0.5 -right-0.5 border-2 border-[#181c25]"></span>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-sm text-on-surface">Sarah (G&amp;N Acquisitions)</span>
              <span class="material-symbols-outlined text-[#efbba5] text-[14px]" title="Verified Specialist">verified</span>
            </div>
            <span class="text-[10px] text-green-400 font-semibold tracking-wide">● Active Now • Louisville, KY</span>
          </div>
        </div>

        <button type="button" id="btnRestartChat" class="text-xs text-on-surface-variant hover:text-[#efbba5] p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer" title="Replay Conversation">
          <span class="material-symbols-outlined text-[18px]">replay</span>
        </button>
      </div>

      <!-- Message Feed (Dark Charcoal Theme) -->
      <div id="chatMessageFeed" class="p-4 sm:p-5 flex flex-col gap-3 min-h-[340px] max-h-[380px] overflow-y-auto hide-scrollbar bg-[#12151b]/80">
        <!-- Messages injected sequentially -->
      </div>

      <!-- Typing Indicator Box -->
      <div id="chatTypingIndicator" class="px-5 py-2 flex items-center gap-2 text-xs text-on-surface-variant/70 hidden bg-[#12151b]/80">
        <div class="flex items-center gap-1 bg-[#1e2330] px-3 py-1.5 rounded-full border border-white/10 shadow-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-[#efbba5] animate-bounce" style="animation-delay: 0ms;"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#efbba5] animate-bounce" style="animation-delay: 150ms;"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#efbba5] animate-bounce" style="animation-delay: 300ms;"></span>
        </div>
        <span class="text-[11px] italic text-[#efbba5]/80">Sarah is typing...</span>
      </div>

      <!-- Interactive Quick Question Prompts -->
      <div class="px-4 py-3 bg-[#181c25]/90 backdrop-blur-md border-t border-white/10 flex flex-col gap-2">
        <div class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/80">
          Try Asking a Question:
        </div>
        <div class="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1" id="chatQuickPrompts">
          <button type="button" class="chat-prompt-btn shrink-0 bg-[#222836] hover:bg-primary/20 hover:text-[#efbba5] text-[11px] font-semibold text-on-surface px-3.5 py-1.5 rounded-full border border-white/10 shadow-xs transition-all cursor-pointer" data-question="repairs">
            🔧 Roof &amp; Major Repairs?
          </button>
          <button type="button" class="chat-prompt-btn shrink-0 bg-[#222836] hover:bg-primary/20 hover:text-[#efbba5] text-[11px] font-semibold text-on-surface px-3.5 py-1.5 rounded-full border border-white/10 shadow-xs transition-all cursor-pointer" data-question="timeline">
            📅 How fast can we close?
          </button>
          <button type="button" class="chat-prompt-btn shrink-0 bg-[#222836] hover:bg-primary/20 hover:text-[#efbba5] text-[11px] font-semibold text-on-surface px-3.5 py-1.5 rounded-full border border-white/10 shadow-xs transition-all cursor-pointer" data-question="commissions">
            💰 Any fees or commissions?
          </button>
        </div>
      </div>
    </div>
  `;
}

// Conversation Script
const initialConversation = [
  {
    sender: "user",
    text: "Hi! I inherited a home in Louisville that needs major roof and plumbing work. Can I sell it without fixing anything?",
    time: "10:14 AM"
  },
  {
    sender: "agent",
    text: "Hello! Absolutely. We purchase 100% As-Is, so you don't have to spend a dime on repairs, roof fixes, or cleaning.",
    time: "10:15 AM"
  },
  {
    sender: "user",
    text: "Do you charge real estate commissions or closing fees?",
    time: "10:15 AM"
  },
  {
    sender: "agent",
    text: "Zero commission (0%) and G&N pays all standard title closing costs. What you are offered is what you take home.",
    time: "10:16 AM"
  },
  {
    sender: "user",
    text: "That sounds great. How soon could we close?",
    time: "10:16 AM"
  },
  {
    sender: "agent",
    text: "As fast as 7 days, or on whichever future date works best for your schedule! 🏡",
    time: "10:17 AM"
  }
];

const interactiveResponses = {
  repairs: {
    user: "What if the house has water damage or foundation issues?",
    agent: "No problem at all! We evaluate the property in its current condition and handle all remediation and repairs ourselves after closing."
  },
  timeline: {
    user: "Can I choose my own closing date?",
    agent: "Yes! Whether you need funds in 7 days or need 60 days to pack and relocate, we work entirely on your timeline."
  },
  commissions: {
    user: "Are there any hidden deductions at closing?",
    agent: "None whatsoever. No 6% realtor fees, no inspection demand lists, and no closing fee surprises. 100% transparent."
  }
};

let chatTimeoutId = null;

export function initLiveChatSimulator() {
  const feed = document.getElementById('chatMessageFeed');
  const typing = document.getElementById('chatTypingIndicator');
  const restartBtn = document.getElementById('btnRestartChat');
  const promptButtons = document.querySelectorAll('.chat-prompt-btn');

  if (!feed || !typing) return;

  function appendMessage(msg) {
    const isUser = msg.sender === 'user';
    const bubble = document.createElement('div');
    bubble.className = `flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 opacity-0 transform translate-y-3 transition-all duration-300`;

    bubble.innerHTML = `
      <div class="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
        isUser
          ? 'bg-primary text-white rounded-br-xs'
          : 'bg-[#1e2432] text-on-surface border border-white/10 rounded-bl-xs'
      }">
        ${msg.text}
      </div>
      <span class="text-[9px] text-on-surface-variant/50 px-1">${msg.time || 'Just now'}</span>
    `;

    feed.appendChild(bubble);

    requestAnimationFrame(() => {
      bubble.classList.remove('opacity-0', 'translate-y-3');
      bubble.classList.add('opacity-100', 'translate-y-0');
      feed.scrollTop = feed.scrollHeight;
    });
  }

  function playSequence(messages, index = 0) {
    if (index >= messages.length) {
      if (typing) typing.classList.add('hidden');
      return;
    }

    const current = messages[index];
    const isAgent = current.sender === 'agent';

    if (isAgent) {
      if (typing) typing.classList.remove('hidden');
      feed.scrollTop = feed.scrollHeight;

      chatTimeoutId = setTimeout(() => {
        if (typing) typing.classList.add('hidden');
        appendMessage(current);
        chatTimeoutId = setTimeout(() => playSequence(messages, index + 1), 1000);
      }, 1200);
    } else {
      appendMessage(current);
      chatTimeoutId = setTimeout(() => playSequence(messages, index + 1), 600);
    }
  }

  function startChat() {
    clearTimeout(chatTimeoutId);
    feed.innerHTML = '';
    if (typing) typing.classList.add('hidden');
    playSequence(initialConversation);
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', startChat);
  }

  promptButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const qKey = btn.getAttribute('data-question');
      const pair = interactiveResponses[qKey];
      if (!pair) return;

      appendMessage({ sender: 'user', text: pair.user });
      if (typing) typing.classList.remove('hidden');
      feed.scrollTop = feed.scrollHeight;

      setTimeout(() => {
        if (typing) typing.classList.add('hidden');
        appendMessage({ sender: 'agent', text: pair.agent });
      }, 1100);
    });
  });

  startChat();
}
