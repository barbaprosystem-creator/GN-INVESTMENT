# Resumen de Transformación: Panel Operativo Real Sin Datos Hardcodeados

Se ha eliminado por completo la dependencia de datos simulados y valores fijos en el panel de administración CRM de **G&N Investment** (`/portal/*`). Ahora el sistema funciona como un sistema operativo inmobiliario real, con persistencia local de 0ms, captura de solicitudes directas de la web pública, conversión en 1 clic y exportación/restauración de base de datos.

---

## 1. Cambios Principales Implementados

### A. Eliminación de Semillas Hardcodeadas (`crmStore.js`)
- Se removió la inyección obligatoria por defecto de `INITIAL_PROJECTS` e `INITIAL_EXPENSES`.
- Si el almacenamiento está vacío, el sistema inicia con arreglos limpios (`[]`), sin inventar cifras de inversión, proyectos ni márgenes irreales.
- Los datos de demostración ahora son **100% opcionales** mediante el botón *"Cargar Ejemplos"*, útil si el usuario desea explorar la interfaz con datos de muestra.
- Se agregó el botón *"Limpiar Cartera"* / *"Limpiar Todo"* para reiniciar la base de datos a cero en cualquier momento.

### B. Nueva Vista de Leads Web Entrantes (`LeadsView.js` & `#portal/leads`)
- Se conectaron directamente los formularios públicos del sitio web (`OfferForm.js`, `QuickOfferForm.js`, `FullOfferForm.js`) que guardan en `gn_leads`.
- **Pipeline de Estado**: Permite mover a los prospectos entre fases:
  1. *Nuevo (Sin atender)* con indicador parpadeante en el menú lateral.
  2. *Contactado / En llamada*
  3. *Visita Agendada*
  4. *Oferta Presentada*
  5. *Bajo Contrato*
  6. *Comprado / Cerrado*
  7. *Descartado*
- **Acciones directas por lead**:
  - Enlace directo de llamada `tel:${lead.phone}`.
  - Enlace de correo `mailto:${lead.email}`.
  - Enlace para ver la propiedad en Google Maps.
  - Edición rápida de notas.
- **Conversión a Fix & Flip en 1 Clic**:
  - Botón *"Convertir a Fix & Flip"* que abre una ventana con la dirección y datos del vendedor pre-cargados.
  - Genera automáticamente la propiedad en la cartera con número de proyecto secuencial (`FLIP-101`, `FLIP-102`, etc.), asigna checklist inicial de adquisición y vincula el lead.
- **Registro de Lead Manual**: Permite registrar llamadas telefónicas entrantes o visitas directas de propietarios.

### C. Copia de Seguridad y Restauración de Base de Datos (JSON)
- Ubicado en el pie del menú lateral (`CrmLayout.js`):
  - **Respaldar BD**: Descarga un archivo `GN_Investment_BD_YYYY-MM-DD.json` con todas las propiedades, gastos y leads.
  - **Restaurar BD**: Permite subir un archivo JSON para recuperar o migrar toda la base de datos entre navegadores o computadoras.

### D. Estados Cero Pulidos y Métricas Reales
- **`DashboardView.js`**:
  - Si la cartera está vacía, muestra un banner de bienvenida con accesos rápidos para registrar la primera propiedad o revisar los leads web, evitando gráficos rotos o divisiones por cero.
  - Incluye un nuevo widget de **Leads Recientes** en el dashboard principal junto a las propiedades y gastos.
  - Detecta automáticamente si hay datos antiguos de prueba en el navegador y despliega un botón para purgarlos con un clic.
- **`ProjectsView.js`**: Estado vacío con CTA directo para registrar la primera propiedad.
- **`ExpensesView.js`**: Estado vacío limpio y soporte para gastos generales de empresa cuando aún no hay proyectos asignados.
- **`ProjectDetailModal.js`**: Agregado botón de *"Eliminar Propiedad"* con confirmación para gestión CRUD completa.

### E. Sistema de Credenciales y Usuarios Configurables (`SecurityModal.js` & `authService.js`)
- **Configuración de Usuario y Contraseña Propios**:
  - Se añadió el botón de configuración `⚙️` en la tarjeta del usuario del menú lateral y un botón `manage_accounts` en la barra superior.
  - Permite cambiar el **Nombre**, **Usuario de Acceso**, **Correo Electrónico**, **Contraseña** y **PIN Rápido de 4 dígitos** en cualquier momento.
  - Las nuevas credenciales se guardan de inmediato en `localStorage` y reemplazan a las anteriores.
- **Gestión de Cuentas de Equipo**:
  - Pestaña para visualizar las cuentas activas con sus roles (*Administrador Maestro* o *Supervisor*).
  - Posibilidad de crear nuevas cuentas para socios, asistentes o jefes de obra.
- **Restablecimiento de Fábrica**:
  - Tanto dentro del panel como en la pantalla de inicio de sesión (`/login`), se incluye la opción de emergencia para restablecer las credenciales a los valores originales (`admin` / `admin123` / PIN `1234`) en caso de olvido.

---

## 2. Pruebas de Verificación Automatizadas

Se ejecutó un script de prueba integral verificando el ciclo completo en memoria:
1. Verificación de arreglos limpios iniciales: Proyectos = 0, Gastos = 0, Leads = 0.
2. Guardado de lead entrante (`Roberto Silva`).
3. Conversión de lead a proyecto `FLIP-101` con cálculo de ARV y precio pactado.
4. Registro de gasto real ($1,500 en Home Depot).
5. Cálculo dinámico de métricas ejecutivas, ROI y capital invertido.
6. Compilación de Vite (`npm run build`): **0 errores** (36 módulos empaquetados con éxito).

---

## 3. Guía de Acceso para el Usuario

- **URL de Acceso**: `http://localhost:5173/#login` (o haz clic en el botón flotante **Acceso Portal** en la página de inicio).
- **Credenciales**:
  - Email: `admin@gninvestment.com` (o usuario: `admin`)
  - Contraseña: `admin123` (o PIN rápido: `1234`)
- **Secciones Disponibles**:
  - `#portal/dashboard`: Visión global de capital, leads y gastos.
  - `#portal/leads`: Bandeja de leads capturados desde la web con conversión a proyecto.
  - `#portal/projects`: Cartera de inmuebles Fix & Flip con checklists y cálculo de ROI.
  - `#portal/expenses`: Libro mayor de facturas con exportación a CSV.
  - `#portal/tzel`: Radar y mapa táctico en vivo de Jefferson County.
