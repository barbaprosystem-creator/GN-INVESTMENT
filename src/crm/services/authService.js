// Authentication Service for GN Investment Employee Portal
// 100% Configurable credentials stored in localStorage with session persistence
// Supports custom usernames, emails, passwords, quick PINs, and multi-user team management.

const STORAGE_KEY_USERS = 'gn_crm_users';
const SESSION_STORAGE_KEY = 'gn_crm_employee_session';

// Factory default accounts (can be modified or overwritten at any time by the user)
const DEFAULT_USERS = [
  {
    id: 'usr-admin',
    name: 'Gerencia Inversiones',
    email: 'admin@gninvestment.com',
    username: 'admin',
    password: 'admin123',
    pin: '1234',
    role: 'admin',
    avatar: 'GN',
    title: 'Director de Operaciones',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-supervisor',
    name: 'Operaciones & Obras',
    email: 'rehab@gninvestment.com',
    username: 'rehab',
    password: 'flip2026',
    pin: '2026',
    role: 'supervisor',
    avatar: 'OP',
    title: 'Supervisor Fix & Flip',
    createdAt: new Date().toISOString()
  }
];

export const authService = {
  // Initialize user database if not present
  _init() {
    if (!localStorage.getItem(STORAGE_KEY_USERS)) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
    }
  },

  // Get all registered users
  getUsers() {
    this._init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
    } catch {
      return DEFAULT_USERS;
    }
  },

  // Get specific user by ID
  getUser(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  // Check if session is currently active
  isAuthenticated() {
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return Boolean(parsed && parsed.token && parsed.user);
    } catch {
      return false;
    }
  },

  // Get current active employee session
  getCurrentUser() {
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!session) return null;
      const parsed = JSON.parse(session);
      return parsed.user || null;
    } catch {
      return null;
    }
  },

  // Log in with email OR username, and password OR PIN
  async login(identifier, password) {
    this._init();
    const cleanId = String(identifier || '').trim().toLowerCase();
    const cleanPass = String(password || '').trim();

    if (!cleanId || !cleanPass) {
      return {
        success: false,
        error: 'Por favor ingresa usuario y contraseña o PIN.'
      };
    }

    const users = this.getUsers();

    // Match against any user: identifier matches email or username, and password matches password or pin
    const matchedUser = users.find(u => {
      const matchEmail = u.email && u.email.toLowerCase() === cleanId;
      const matchUsername = u.username && u.username.toLowerCase() === cleanId;
      const matchPassword = u.password && u.password === cleanPass;
      const matchPin = u.pin && String(u.pin) === cleanPass;

      return (matchEmail || matchUsername) && (matchPassword || matchPin);
    });

    if (matchedUser) {
      this._saveSession(matchedUser);
      return { success: true, user: matchedUser };
    }

    return {
      success: false,
      error: 'Usuario o contraseña incorrectos. Verifica tus credenciales.'
    };
  },

  // Save or update user credentials
  updateUser(userId, updates) {
    this._init();
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) {
      return { success: false, error: 'Usuario no encontrado.' };
    }

    // Check if new email or username collides with another user
    if (updates.email || updates.username) {
      const newEmail = updates.email ? updates.email.trim().toLowerCase() : '';
      const newUsername = updates.username ? updates.username.trim().toLowerCase() : '';

      const collision = users.some(u => 
        u.id !== userId && (
          (newEmail && u.email && u.email.toLowerCase() === newEmail) ||
          (newUsername && u.username && u.username.toLowerCase() === newUsername)
        )
      );

      if (collision) {
        return { success: false, error: 'El correo o nombre de usuario ya está en uso por otra cuenta.' };
      }
    }

    // Calculate avatar from name initials if name is updated
    let avatar = users[idx].avatar;
    if (updates.name) {
      const words = updates.name.trim().split(' ');
      avatar = words.length > 1 
        ? (words[0][0] + words[1][0]).toUpperCase() 
        : words[0].substring(0, 2).toUpperCase();
    }

    const updatedUser = {
      ...users[idx],
      ...updates,
      avatar,
      updatedAt: new Date().toISOString()
    };

    users[idx] = updatedUser;
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

    // If updating current active session user, refresh session
    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      this._saveSession(updatedUser);
    }

    return { success: true, user: updatedUser };
  },

  // Create new user account
  addUser(userData) {
    this._init();
    const users = this.getUsers();
    const email = String(userData.email || '').trim().toLowerCase();
    const username = String(userData.username || '').trim().toLowerCase();

    if (!email && !username) {
      return { success: false, error: 'Debes especificar al menos un correo o nombre de usuario.' };
    }

    if (!userData.password && !userData.pin) {
      return { success: false, error: 'Debes definir una contraseña o PIN de acceso.' };
    }

    // Check uniqueness
    const exists = users.some(u => 
      (email && u.email && u.email.toLowerCase() === email) ||
      (username && u.username && u.username.toLowerCase() === username)
    );

    if (exists) {
      return { success: false, error: 'Ya existe una cuenta con ese correo o usuario.' };
    }

    const words = (userData.name || 'Operador GN').trim().split(' ');
    const avatar = words.length > 1 
      ? (words[0][0] + words[1][0]).toUpperCase() 
      : words[0].substring(0, 2).toUpperCase();

    const newUser = {
      id: 'usr-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: userData.name || 'Operador GN',
      email: userData.email || '',
      username: userData.username || '',
      password: userData.password || '',
      pin: userData.pin || '',
      role: userData.role || 'supervisor',
      avatar,
      title: userData.title || 'Miembro del Equipo',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    return { success: true, user: newUser };
  },

  // Delete user account
  deleteUser(userId) {
    this._init();
    let users = this.getUsers();
    
    // Safety: ensure at least one admin remains
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) return { success: false, error: 'Usuario no encontrado.' };

    const remainingAdmins = users.filter(u => u.id !== userId && u.role === 'admin');
    if (userToDelete.role === 'admin' && remainingAdmins.length === 0) {
      return { success: false, error: 'No puedes eliminar el único usuario administrador del sistema.' };
    }

    users = users.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    return { success: true };
  },

  // Reset to factory demo credentials
  resetToDefaultUsers() {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
    return { success: true, users: DEFAULT_USERS };
  },

  _saveSession(user) {
    const sessionData = {
      token: 'gn_jwt_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
        title: user.title
      },
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  },

  // Log out and clear session
  logout() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};
