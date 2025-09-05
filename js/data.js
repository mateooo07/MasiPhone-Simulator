export async function fetchProducts(path = "../products.json") {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Error cargando productos");
    return await res.json();
  } catch {
    alert("No se pudieron cargar los productos.");
    return [];
  }
}