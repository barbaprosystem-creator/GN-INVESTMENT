// Security & Credentials Configuration Modal for GN Investment CRM
// Allows operators to configure their username, email, password, quick PIN, and manage team accounts

import { authService } from '../services/authService.js';

export function renderSecurityModal() {
  const currentUser = authService.getCurrentUser() || {};
  const fullUser = authService.getUser(currentUser.id) || currentUser;
  const allUsers = authService.getUsers();

  return `
    <div id="securityModalOverlay" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn font-['Plus_Jakarta_Sans',sans-serif]">
      <div class="bg-[#121621] border border-white/15 shadow-2xl rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative">
        
        <!-- Header -->
        <div class="px-6 py-5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#151b26]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <span class="material-symbols-outlined text-[22px]">manage_accounts</span>
            </div>
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-white tracking-tight">Seguridad y Credenciales de Acceso</h2>
              <p class="text-xs text-gray-400">Configura tu usuario, contraseña personal o gestiona las cuentas de tu equipo</p>
            </div>
          </div>

          <button type="button" id="closeSecurityModalBtn" class="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Tabs Navigation -->
        <div class="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-[#121621] overflow-x-auto text-xs font-mono">
          <button type="button" class="sec-tab-btn active px-4 py-2.5 font-bold uppercase tracking-wider text-white border-b-2 border-[#c5832b] transition-colors" data-sec-tab="sec-my-account">
            Mi Cuenta y Clave
          </button>
          <button type="button" class="sec-tab-btn px-4 py-2.5 font-bold uppercase tracking-wider text-gray-400 hover:text-white border-b-2 border-transparent transition-colors" data-sec-tab="sec-team">
            Usuarios del Sistema (${allUsers.length})
          </button>
          <button type="button" class="sec-tab-btn px-4 py-2.5 font-bold uppercase tracking-wider text-gray-400 hover:text-white border-b-2 border-transparent transition-colors" data-sec-tab="sec-backup">
            Restablecimiento
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto flex-1 space-y-6 text-xs font-mono">
          
          <!-- Alert feedback box -->
          <div id="secAlertBox" class="hidden p-3.5 rounded-xl border flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]" id="secAlertIcon">info</span>
            <span id="secAlertMsg"></span>
          </div>

          <!-- TAB 1: Mi Cuenta (Cambiar usuario y contraseña) -->
          <div id="sec-my-account" class="sec-tab-pane space-y-4">
            <div class="bg-[#0e1219] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c5832b] to-[#9b5d21] text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0">
                ${fullUser.avatar || 'OP'}
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-sm font-bold text-white truncate">${fullUser.name || 'Operador'}</div>
                <div class="text-xs text-gray-400 truncate">Usuario activo: <strong class="text-amber-400 font-bold">${fullUser.username || fullUser.email}</strong></div>
                <div class="text-[10px] text-gray-500">Rol: ${fullUser.role === 'admin' ? 'Administrador Maestro' : 'Supervisor'}</div>
              </div>
            </div>

            <form id="editMyAccountForm" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-400 mb-1">Nombre Completo *</label>
                  <input type="text" id="myAccountName" required value="${fullUser.name || ''}" class="w-full px-3.5 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-gray-400 mb-1">Cargo / Título</label>
                  <input type="text" id="myAccountTitle" value="${fullUser.title || ''}" placeholder="Ej. Director General" class="w-full px-3.5 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-400 mb-1">Nombre de Usuario (Login) *</label>
                  <input type="text" id="myAccountUsername" required value="${fullUser.username || ''}" placeholder="Ej. miguel o admin" class="w-full px-3.5 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                  <span class="text-[10px] text-gray-500 block mt-1">Puedes usar este texto para iniciar sesión.</span>
                </div>
                <div>
                  <label class="block text-gray-400 mb-1">Correo Electrónico (Login)</label>
                  <input type="email" id="myAccountEmail" value="${fullUser.email || ''}" placeholder="correo@gninvestment.com" class="w-full px-3.5 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                </div>
              </div>

              <div class="p-4 bg-[#0a0d14] rounded-2xl border border-white/10 space-y-3">
                <div class="text-xs font-bold text-white flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-amber-400">lock</span>
                  <span>Cambiar Clave y Métodos de Acceso</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-gray-400 mb-1">Nueva Contraseña</label>
                    <div class="relative">
                      <input type="password" id="myAccountPassword" value="${fullUser.password || ''}" placeholder="Mínimo 6 caracteres" class="w-full px-3.5 py-2.5 pr-10 bg-[#121621] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                      <button type="button" class="toggle-password-visibility absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" data-target="myAccountPassword">
                        <span class="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-gray-400 mb-1">PIN Rápido (4 dígitos)</label>
                    <input type="text" maxlength="6" id="myAccountPin" value="${fullUser.pin || ''}" placeholder="Ej. 1234" class="w-full px-3.5 py-2.5 bg-[#121621] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none font-bold text-center tracking-widest text-sm" />
                    <span class="text-[10px] text-gray-500 block mt-1">Permite entrar escribiendo solo tu PIN.</span>
                  </div>
                </div>
              </div>

              <div class="pt-2">
                <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#c5832b] to-[#b87333] hover:from-[#d89136] hover:to-[#c5832b] text-white font-bold uppercase rounded-xl transition-all shadow-lg shadow-[#c5832b]/25 cursor-pointer flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">save</span>
                  <span>Guardar Nuevas Credenciales</span>
                </button>
              </div>
            </form>
          </div>

          <!-- TAB 2: Usuarios del Sistema (Equipo) -->
          <div id="sec-team" class="sec-tab-pane hidden space-y-5">
            <div class="flex items-center justify-between">
              <span class="text-gray-400">Cuentas con acceso autorizado al CRM:</span>
              <button type="button" id="toggleAddUserFormBtn" class="px-3 py-1.5 bg-[#c5832b]/20 hover:bg-[#c5832b]/30 text-amber-300 border border-[#c5832b]/30 rounded-xl font-bold flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">person_add</span>
                <span>+ Nuevo Usuario</span>
              </button>
            </div>

            <!-- Add User Form (Collapsible) -->
            <div id="addNewUserContainer" class="hidden p-4 bg-[#0a0d14] rounded-2xl border border-white/10 space-y-3">
              <div class="text-xs font-bold text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-emerald-400 text-[18px]">add_circle</span>
                <span>Registrar Nuevo Miembro de Equipo</span>
              </div>
              <form id="addNewUserForm" class="space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-gray-400 mb-1">Nombre *</label>
                    <input type="text" id="newUserName" required placeholder="Ej. Juan Operaciones" class="w-full px-3 py-2 bg-[#121621] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-gray-400 mb-1">Rol de Acceso *</label>
                    <select id="newUserRole" class="w-full px-3 py-2 bg-[#121621] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none">
                      <option value="supervisor">Supervisor / PM de Obras</option>
                      <option value="admin">Administrador Maestro</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block text-gray-400 mb-1">Usuario *</label>
                    <input type="text" id="newUserUsername" required placeholder="Ej. juan" class="w-full px-3 py-2 bg-[#121621] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-gray-400 mb-1">Contraseña *</label>
                    <input type="text" id="newUserPassword" required placeholder="Clave123" class="w-full px-3 py-2 bg-[#121621] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-gray-400 mb-1">PIN Opcional</label>
                    <input type="text" id="newUserPin" placeholder="4 dígitos" class="w-full px-3 py-2 bg-[#121621] border border-white/10 rounded-xl text-white focus:border-[#c5832b] focus:outline-none" />
                  </div>
                </div>

                <div class="pt-1 flex justify-end gap-2">
                  <button type="button" id="cancelAddUserBtn" class="px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg cursor-pointer">Cancelar</button>
                  <button type="submit" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg cursor-pointer">Crear Cuenta</button>
                </div>
              </form>
            </div>

            <!-- Users List Table -->
            <div class="divide-y divide-white/5 bg-[#0e1219] rounded-2xl border border-white/5 overflow-hidden">
              ${allUsers.map(u => `
                <div class="p-3.5 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-9 h-9 rounded-xl bg-white/5 text-[#c5832b] font-bold flex items-center justify-center shrink-0 border border-white/5">
                      ${u.avatar || 'OP'}
                    </div>
                    <div class="min-w-0">
                      <div class="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>${u.name}</span>
                        ${u.id === fullUser.id ? `<span class="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">TÚ</span>` : ''}
                      </div>
                      <div class="text-[11px] text-gray-400 truncate">
                        Usuario: <strong class="text-gray-300 font-mono">${u.username || u.email}</strong> • Clave: <span class="text-gray-500">${u.password ? '••••••' : 'Sin clave'}</span> • PIN: <span class="text-gray-500">${u.pin || 'Ninguno'}</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${u.role === 'admin' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}">
                      ${u.role === 'admin' ? 'Admin' : 'Supervisor'}
                    </span>
                    ${u.id !== fullUser.id ? `
                      <button type="button" class="delete-user-btn p-1 text-gray-500 hover:text-red-400 transition-colors cursor-pointer" data-user-id="${u.id}" title="Eliminar usuario">
                        <span class="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TAB 3: Restablecimiento de Emergencia -->
          <div id="sec-backup" class="sec-tab-pane hidden space-y-4">
            <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl space-y-3">
              <div class="flex items-center gap-2 text-red-400 font-bold">
                <span class="material-symbols-outlined text-[20px]">restart_alt</span>
                <span>Restablecer Cuentas a Valores de Fábrica</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">
                Si alguna vez olvidas la contraseña o deseas reiniciar los usuarios a los valores originales de fábrica:
              </p>
              <div class="bg-[#0a0d14] p-3 rounded-xl border border-white/5 space-y-1 text-gray-400">
                <div>• Usuario Administrador: <strong class="text-white">admin</strong> o <strong class="text-white">admin@gninvestment.com</strong></div>
                <div>• Contraseña: <strong class="text-white">admin123</strong></div>
                <div>• PIN Rápido: <strong class="text-white">1234</strong></div>
              </div>
              <div class="pt-2">
                <button type="button" id="resetDefaultUsersBtn" class="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-xl font-bold uppercase transition-colors flex items-center gap-2 cursor-pointer">
                  <span class="material-symbols-outlined text-[16px]">power_settings_new</span>
                  <span>Restablecer Accesos de Fábrica</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function initSecurityModal(callbacks = {}) {
  const overlay = document.getElementById('securityModalOverlay');
  const closeBtn = document.getElementById('closeSecurityModalBtn');
  const tabBtns = document.querySelectorAll('.sec-tab-btn');
  const tabPanes = document.querySelectorAll('.sec-tab-pane');
  const alertBox = document.getElementById('secAlertBox');
  const alertMsg = document.getElementById('secAlertMsg');
  const alertIcon = document.getElementById('secAlertIcon');

  const closeModal = () => {
    if (overlay) overlay.remove();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  const showAlert = (msg, isSuccess = true) => {
    if (!alertBox || !alertMsg) return;
    alertBox.classList.remove('hidden', 'bg-emerald-500/10', 'border-emerald-500/30', 'text-emerald-400', 'bg-red-500/10', 'border-red-500/30', 'text-red-400');
    if (isSuccess) {
      alertBox.classList.add('bg-emerald-500/10', 'border-emerald-500/30', 'text-emerald-400');
      alertIcon.innerText = 'check_circle';
    } else {
      alertBox.classList.add('bg-red-500/10', 'border-red-500/30', 'text-red-400');
      alertIcon.innerText = 'error';
    }
    alertMsg.innerText = msg;
  };

  // Switch tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-sec-tab');
      tabBtns.forEach(b => {
        b.classList.remove('active', 'text-white', 'border-[#c5832b]');
        b.classList.add('text-gray-400', 'border-transparent');
      });
      btn.classList.add('active', 'text-white', 'border-[#c5832b]');
      btn.classList.remove('text-gray-400', 'border-transparent');

      tabPanes.forEach(pane => {
        pane.classList.toggle('hidden', pane.id !== targetId);
      });
    });
  });

  // Toggle password visibility
  document.querySelectorAll('.toggle-password-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetInputId = btn.getAttribute('data-target');
      const input = document.getElementById(targetInputId);
      if (input) {
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) icon.innerText = isPass ? 'visibility_off' : 'visibility';
      }
    });
  });

  // Save My Account Form
  const myAccountForm = document.getElementById('editMyAccountForm');
  if (myAccountForm) {
    myAccountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentUser = authService.getCurrentUser();
      if (!currentUser) return;

      const name = document.getElementById('myAccountName').value.trim();
      const title = document.getElementById('myAccountTitle').value.trim();
      const username = document.getElementById('myAccountUsername').value.trim();
      const email = document.getElementById('myAccountEmail').value.trim();
      const password = document.getElementById('myAccountPassword').value.trim();
      const pin = document.getElementById('myAccountPin').value.trim();

      const res = authService.updateUser(currentUser.id, {
        name,
        title,
        username,
        email,
        password,
        pin
      });

      if (res.success) {
        showAlert('¡Credenciales actualizadas con éxito! Ahora puedes iniciar sesión con estos datos.', true);
        setTimeout(() => {
          closeModal();
          if (callbacks.onRefresh) callbacks.onRefresh();
        }, 1200);
      } else {
        showAlert(res.error || 'Error al actualizar credenciales.', false);
      }
    });
  }

  // Toggle Add User form in Team tab
  const toggleAddBtn = document.getElementById('toggleAddUserFormBtn');
  const addContainer = document.getElementById('addNewUserContainer');
  const cancelAddBtn = document.getElementById('cancelAddUserBtn');
  const addUserForm = document.getElementById('addNewUserForm');

  if (toggleAddBtn && addContainer) {
    toggleAddBtn.addEventListener('click', () => {
      addContainer.classList.toggle('hidden');
    });
  }

  if (cancelAddBtn && addContainer) {
    cancelAddBtn.addEventListener('click', () => {
      addContainer.classList.add('hidden');
    });
  }

  if (addUserForm) {
    addUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newUserName').value.trim();
      const role = document.getElementById('newUserRole').value;
      const username = document.getElementById('newUserUsername').value.trim();
      const password = document.getElementById('newUserPassword').value.trim();
      const pin = document.getElementById('newUserPin').value.trim();

      const res = authService.addUser({
        name,
        role,
        username,
        password,
        pin
      });

      if (res.success) {
        showAlert(`Usuario "${name}" creado exitosamente.`, true);
        setTimeout(() => {
          closeModal();
          if (callbacks.onRefresh) callbacks.onRefresh();
        }, 800);
      } else {
        showAlert(res.error || 'Error al crear usuario.', false);
      }
    });
  }

  // Delete User button
  document.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const uId = btn.getAttribute('data-user-id');
      if (confirm('¿Estás seguro de revocar y eliminar este usuario del sistema?')) {
        const res = authService.deleteUser(uId);
        if (res.success) {
          showAlert('Usuario eliminado correctamente.', true);
          setTimeout(() => {
            closeModal();
            if (callbacks.onRefresh) callbacks.onRefresh();
          }, 800);
        } else {
          showAlert(res.error || 'Error al eliminar usuario.', false);
        }
      }
    });
  });

  // Reset Default Users
  const resetBtn = document.getElementById('resetDefaultUsersBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Deseas restablecer todos los accesos a los valores de fábrica (admin / admin123)?')) {
        authService.resetToDefaultUsers();
        showAlert('Credenciales restablecidas a valores de fábrica.', true);
        setTimeout(() => {
          closeModal();
          if (callbacks.onRefresh) callbacks.onRefresh();
        }, 1000);
      }
    });
  }
}
