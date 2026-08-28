/**
 * Aceternity-style EncryptedText / Text Scramble Decoder
 * Progressive matrix-style character decryption with copper glow highlights.
 */
export class EncryptedTextDecoder {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    this.chars = options.chars || '!<>-_\\/[]{}—=+*^?#~%&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.targetText = options.text || (this.el ? this.el.getAttribute('data-encrypted-text') || this.el.innerText : '');
    this.speed = options.speed || 22; // ms per step (balanced sweet spot)
    this.revealDelay = options.revealDelay || 100; // initial delay
    this.isDecoding = false;
    this.frame = 0;
    this.queue = [];
  }

  start() {
    if (!this.el || !this.targetText) return;
    this.isDecoding = true;
    
    const length = this.targetText.length;
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const to = this.targetText[i];
      // Balanced, elegant staggered reveal window for each character
      const start = Math.floor(i * 0.55) + 3;
      const end = start + Math.floor(Math.random() * 8) + 5;
      this.queue.push({ to, start, end, char: '' });
    }

    this.frame = 0;
    setTimeout(() => this.update(), this.revealDelay);
  }

  update() {
    if (!this.el) return;

    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      let { to, start, end, char } = this.queue[i];

      if (to === ' ') {
        output += ' ';
        complete++;
        continue;
      }

      if (this.frame >= end) {
        complete++;
        output += `<span class="text-gray-200 transition-colors duration-200">${to}</span>`;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.35) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="text-[#efbba5] font-mono font-bold filter drop-shadow-[0_0_8px_rgba(239,187,165,0.85)] inline-block transform scale-105">${char}</span>`;
      } else {
        const dummy = this.chars[Math.floor(Math.random() * this.chars.length)];
        output += `<span class="text-gray-500/40 font-mono inline-block opacity-40">${dummy}</span>`;
      }
    }

    this.el.innerHTML = output;

    if (complete < this.queue.length) {
      this.frame++;
      setTimeout(() => this.update(), this.speed);
    } else {
      this.isDecoding = false;
    }
  }
}

export function initEncryptedText(selector = '#heroEncryptedText') {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const text = el.getAttribute('data-encrypted-text') || el.innerText.trim();
    if (text) {
      const decoder = new EncryptedTextDecoder(el, { text });
      decoder.start();

      // Also replay decryption on user hover / tap
      el.addEventListener('mouseenter', () => {
        if (!decoder.isDecoding) decoder.start();
      });
    }
  });
}
