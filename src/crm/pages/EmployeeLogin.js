// Employee Login Component for GN Investment
// Luxury dark executive interface with copper metallic accents & Barbaprosystem feel

import { authService } from '../services/authService.js';

export function renderEmployeeLogin() {
  const users = authService.getUsers();
  const adminUser = users.find(u => u.role === 'admin') || users[0] || { name: 'Admin', username: 'admin', email: 'admin@gninvestment.com' };
  const supervisorUser = users.find(u => u.role === 'supervisor') || users[1];

  return `
    <div class="min-h-screen bg-[#090c10] text-[#e6edf3] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <!-- Ambient Background Glows -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#c5832b]/15 to-[#b87333]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Top Back to Public Website Link -->
      <div class="absolute top-6 left-6 z-20">
        <a href="#home" data-nav="home" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Volver al Sitio Web</span>
        </a>
      </div>

      <!-- Main Login Card -->
      <div class="relative z-10 w-full max-w-md bg-[#121721]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10">
        <!-- Logo & Header -->
        <div class="flex flex-col items-center text-center mb-8">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c5832b] to-[#9b5d21] p-0.5 shadow-lg shadow-[#c5832b]/20 mb-4 flex items-center justify-center">
            <div class="w-full h-full bg-[#0d1219] rounded-2xl flex items-center justify-center">
              <img src="/images/gn-logo-transparent.png" alt="GN Logo" class="h-10 w-auto object-contain" />
            </div>
          </div>
          
          <span class="text-[10px] font-mono font-black tracking-widest uppercase text-[#d4a56e] bg-[#c5832b]/10 border border-[#c5832b]/30 px-3 py-0.5 rounded-full mb-2">
            PORTAL INTERNO DE OPERACIONES
          </span>
          <h1 class="text-2xl font-extrabold text-white tracking-tight">Acceso de Empleados</h1>
          <p class="text-xs text-gray-400 mt-1">Gestión de Fix & Flip, Control de Gastos & Radar TZEL</p>
        </div>

        <!-- Feedback Alert Container -->
        <div id="loginAlert" class="hidden mb-5 p-3.5 rounded-xl text-xs font-medium border flex items-center gap-2.5">
          <span class="material-symbols-outlined text-[18px] shrink-0" id="loginAlertIcon">error</span>
          <span id="loginAlertText"></span>
        </div>

        <!-- Form -->
        <form id="employeeLoginForm" class="space-y-4">
          <div>
            <label for="empEmail" class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5 font-mono">
              Correo Electrónico o Nombre de Usuario
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">badge</span>
              <input 
                type="text" 
                id="empEmail" 
                name="empEmail"
                required
                autocomplete="username"
                placeholder="Ej. admin o tu correo personal" 
                class="w-full pl-10 pr-4 py-3 bg-[#0a0d14] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c5832b] focus:ring-1 focus:ring-[#c5832b] transition-all"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="empPassword" class="block text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">
                Contraseña o PIN Rápido
              </label>
              <span class="text-[11px] text-gray-500 font-mono">PIN o clave</span>
            </div>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">lock</span>
              <input 
                type="password" 
                id="empPassword" 
                name="empPassword"
                required
                autocomplete="current-password"
                placeholder="••••••••" 
                class="w-full pl-10 pr-11 py-3 bg-[#0a0d14] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c5832b] focus:ring-1 focus:ring-[#c5832b] transition-all"
              />
              <button 
                type="button" 
                id="togglePassBtn"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[18px] focus:outline-none p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                <span class="material-symbols-outlined text-[18px]" id="togglePassIcon">visibility</span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="rememberSession" checked class="w-4 h-4 rounded border-gray-700 bg-gray-900 text-[#c5832b] focus:ring-[#c5832b]" />
              <span class="text-xs text-gray-400">Mantener sesión activa</span>
            </label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            id="loginSubmitBtn"
            class="w-full py-3.5 px-4 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#c5832b]/25 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98"
          >
            <span>INGRESAR AL CRM</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </form>

        <!-- Quick Accounts Helper -->
        <div class="mt-6 pt-5 border-t border-white/10 text-center">
          <p class="text-[11px] text-gray-400 mb-2.5 font-mono">ACCESO RÁPIDO:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <button 
              type="button" 
              id="fillAdminBtn"
              class="text-[11px] font-mono bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>${adminUser.name} (${adminUser.username || adminUser.email})</span>
            </button>
            ${supervisorUser ? `
              <button 
                type="button" 
                id="fillRehabBtn"
                class="text-[11px] font-mono bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>${supervisorUser.name} (${supervisorUser.username || supervisorUser.email})</span>
              </button>
            ` : ''}
          </div>
          
          <button type="button" id="loginResetDefaultsBtn" class="mt-3 text-[10px] text-gray-500 hover:text-amber-400 transition-colors font-mono underline cursor-pointer">
            ¿Problemas para acceder? Restablecer a credenciales de fábrica
          </button>
        </div>

        <!-- Connection Security Note -->
        <div class="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono">
          <span class="material-symbols-outlined text-[13px] text-emerald-400">shield_lock</span>
          <span>Conexión cifrada • Credenciales configurables</span>
        </div>
      </div>
    </div>
  `;
}

export function initEmployeeLogin(onLoginSuccess) {
  const form = document.getElementById('employeeLoginForm');
  const alertBox = document.getElementById('loginAlert');
  const alertText = document.getElementById('loginAlertText');
  const alertIcon = document.getElementById('loginAlertIcon');
  const togglePassBtn = document.getElementById('togglePassBtn');
  const passInput = document.getElementById('empPassword');
  const togglePassIcon = document.getElementById('togglePassIcon');

  const fillAdminBtn = document.getElementById('fillAdminBtn');
  const fillRehabBtn = document.getElementById('fillRehabBtn');
  const resetBtn = document.getElementById('loginResetDefaultsBtn');

  const users = authService.getUsers();
  const adminUser = users.find(u => u.role === 'admin') || users[0];
  const supervisorUser = users.find(u => u.role === 'supervisor') || users[1];

  if (fillAdminBtn && adminUser) {
    fillAdminBtn.addEventListener('click', () => {
      document.getElementById('empEmail').value = adminUser.username || adminUser.email;
      document.getElementById('empPassword').value = adminUser.pin || adminUser.password;
    });
  }

  if (fillRehabBtn && supervisorUser) {
    fillRehabBtn.addEventListener('click', () => {
      document.getElementById('empEmail').value = supervisorUser.username || supervisorUser.email;
      document.getElementById('empPassword').value = supervisorUser.pin || supervisorUser.password;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Deseas restablecer los accesos a los valores de fábrica (admin / PIN 1234)?')) {
        authService.resetToDefaultUsers();
        document.getElementById('empEmail').value = 'admin';
        document.getElementById('empPassword').value = '1234';
        showAlert('Credenciales restablecidas a: admin / 1234 (o admin123)', 'success');
      }
    });
  }

  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassIcon.innerText = isPass ? 'visibility_off' : 'visibility';
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('empEmail').value.trim();
      const password = document.getElementById('empPassword').value.trim();
      const submitBtn = document.getElementById('loginSubmitBtn');

      if (!email || !password) {
        showAlert('Por favor ingresa usuario y contraseña.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin material-symbols-outlined text-[16px]">sync</span>
        <span>AUTENTICANDO...</span>
      `;

      try {
        const result = await authService.login(email, password);
        if (result.success) {
          showAlert(`¡Bienvenido, ${result.user.name}! Ingresando al CRM...`, 'success');
          setTimeout(() => {
            if (typeof onLoginSuccess === 'function') {
              onLoginSuccess(result.user);
            } else {
              window.location.hash = 'portal/dashboard';
            }
          }, 450);
        } else {
          showAlert(result.error || 'Credenciales inválidas', 'error');
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>INGRESAR AL CRM</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          `;
        }
      } catch (err) {
        showAlert('Error al procesar la autenticación: ' + err.message, 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>INGRESAR AL CRM</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        `;
      }
    });
  }

  function showAlert(msg, type = 'error') {
    if (!alertBox || !alertText) return;
    alertBox.classList.remove('hidden', 'bg-red-500/10', 'border-red-500/30', 'text-red-400', 'bg-emerald-500/10', 'border-emerald-500/30', 'text-emerald-400');
    
    if (type === 'error') {
      alertBox.classList.add('bg-red-500/10', 'border-red-500/30', 'text-red-400');
      alertIcon.innerText = 'error';
    } else {
      alertBox.classList.add('bg-emerald-500/10', 'border-emerald-500/30', 'text-emerald-400');
      alertIcon.innerText = 'check_circle';
    }
    alertText.innerText = msg;
  }
}
