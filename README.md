# 🛒 ProyectoFinal - Pavoni

Simulador de **Ecommerce** desarrollado en **HTML, CSS y JavaScript** como proyecto final.  
El sitio permite explorar productos de Apple, agregarlos al carrito, simular compras y guardar un historial.  

---

## 📂 Estructura del proyecto
ProyectoFinal+Pavoni/
├─ index.html # Página principal
├─ styles.css # Estilos generales
├─ products.json # Base de datos de productos
├─ js/
│ ├─ data.js # Carga de datos (fetch JSON)
│ └─ app.js # Lógica de la aplicación

---

## ⚙️ Funcionalidades principales
- **Carga de productos desde JSON** usando `fetch`.
- **Carrito de compras interactivo** con:
  - Agregar productos.
  - Eliminar productos.
  - Vaciar carrito.
  - Control de **stock dinámico** (se descuenta al comprar).
- **Historial de compras** guardado en `localStorage`.
- **Filtros y búsqueda** de productos:
  - Por nombre.
  - Por rango de precio.
- **Modal casero (HTML+CSS+JS)** para mostrar mensajes, sin usar `alert`, `prompt` o librerías externas.
- **Persistencia en LocalStorage**:
  - Carrito.
  - Historial.

---

## 🛠️ Tecnologías usadas
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **JSON** como base de datos estática
- **LocalStorage** para persistencia de datos en el navegador

---

## 🚀 Cómo ejecutar
1. Clonar este repositorio o descargarlo en formato `.zip`.
2. Abrir la carpeta del proyecto.
3. Iniciar un servidor local (recomendado):
   - En VSCode: usar la extensión **Live Server**.
   - O desde consola:
     ```bash
     python -m http.server
     ```
4. Abrir el navegador en `http://localhost:8000` y probar el sitio.

⚠️ Si abrís `index.html` con doble click (modo `file://`), algunos navegadores bloquean `fetch` por seguridad. Por eso es mejor correrlo con servidor local.

---

## 📦 Productos
El archivo [`products.json`](products.json) contiene **15 productos reales de Apple** (iPhone, MacBook, iPad, AirPods, etc.).  
Los `image` son placeholders (`via.placeholder.com`).  
👉 Podés reemplazarlos por imágenes reales guardadas en una carpeta `assets/`.

---

## 👨‍💻 Autor
**Mateo Pavoni**  
Proyecto Final - Curso de JavaScript
