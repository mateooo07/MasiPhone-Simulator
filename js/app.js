// js/app.js
import { fetchProducts } from './data.js';

const $productos = document.getElementById("productos");
const $cartList = document.getElementById("cartList");
const $cartTotal = document.getElementById("cartTotal");
const $cartCount = document.getElementById("cartCount");
const buscarInput = document.getElementById("buscarInput");
const filtroPrecio = document.getElementById("filtroPrecio");

const verHistorialBtn = document.getElementById("verHistorialBtn");
const vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");
const finalizarBtn = document.getElementById("finalizarBtn");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target === modal) modal.style.display="none"; };

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let historial = JSON.parse(localStorage.getItem("historial")) || [];

function formatoMoneda(v) {
  return "$" + v.toFixed(2);
}
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarUI();
}
function guardarHistorial() {
  localStorage.setItem("historial", JSON.stringify(historial));
}
function totalCarrito() {
  return carrito.reduce((a,b)=>a+b.price*b.qty,0);
}

function renderProductos(list) {
  $productos.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p><strong>${formatoMoneda(p.price)}</strong> | Stock: ${p.stock}</p>
      <button data-id="${p.id}">Agregar</button>
    `;
    $productos.appendChild(card);
  });
}
function actualizarUI() {
  $cartList.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.title} x${item.qty}</span>
      <span>${formatoMoneda(item.price*item.qty)} 
      <button data-remove="${item.id}">X</button></span>`;
    $cartList.appendChild(li);
  });
  $cartTotal.textContent = formatoMoneda(totalCarrito());
  $cartCount.textContent = carrito.reduce((a,b)=>a+b.qty,0);
}

function agregarAlCarrito(id) {
  const prod = productos.find(p=>p.id===id);
  if (!prod || prod.stock <= 0) {
    alert("Producto sin stock disponible");
    return;
  }
  const existe = carrito.find(i=>i.id===id);
  if(existe){ existe.qty++; }
  else { carrito.push({...prod, qty:1}); }
  prod.stock--;
  guardarCarrito();
  renderProductos(productos);
}
function eliminarDelCarrito(id) {
  carrito = carrito.filter(i=>i.id!==id);
  guardarCarrito();
}
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
}
function finalizarCompra() {
  if (carrito.length===0) { alert("Carrito vacío"); return; }
  const orden = {
    id: "ORD-"+Date.now(),
    fecha: new Date().toLocaleString(),
    total: totalCarrito(),
    items: carrito.map(i=>({title:i.title,qty:i.qty}))
  };
  historial.unshift(orden);
  guardarHistorial();
  carrito=[];
  guardarCarrito();
  mostrarModal(`<h3>Compra realizada</h3>
    <p>ID: ${orden.id}</p>
    <p>Total: ${formatoMoneda(orden.total)}</p>`);
}
function mostrarHistorial() {
  if (historial.length===0) { alert("Sin compras aún"); return; }
  let html = "<h3>Historial de compras</h3>";
  historial.forEach(o=>{
    html += `<div><strong>${o.id}</strong> - ${o.fecha} - ${formatoMoneda(o.total)}</div>`;
  });
  mostrarModal(html);
}
function mostrarModal(html) {
  modalBody.innerHTML = html;
  modal.style.display = "flex";
}


document.addEventListener("click", e=>{
  if (e.target.dataset.id) agregarAlCarrito(Number(e.target.dataset.id));
  if (e.target.dataset.remove) eliminarDelCarrito(Number(e.target.dataset.remove));
});
vaciarCarritoBtn.onclick = vaciarCarrito;
finalizarBtn.onclick = finalizarCompra;
verHistorialBtn.onclick = mostrarHistorial;

buscarInput.oninput = ()=> filtrar();
filtroPrecio.onchange = ()=> filtrar();

function filtrar(){
  let term = buscarInput.value.toLowerCase();
  let filtro = filtroPrecio.value;
  let lista = productos.filter(p=> p.title.toLowerCase().includes(term));
  if (filtro==="low") lista=lista.filter(p=>p.price<100);
  if (filtro==="mid") lista=lista.filter(p=>p.price>=100 && p.price<=300);
  if (filtro==="high") lista=lista.filter(p=>p.price>300);
  renderProductos(lista);
}

async function init(){
  productos = await fetchProducts("./products.json");
  renderProductos(productos);
  actualizarUI();
}
init();
