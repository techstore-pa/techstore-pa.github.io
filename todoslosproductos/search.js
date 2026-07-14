// Función de búsqueda y filtrado
function filtrarProductos() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const productGrid = document.getElementById('product-grid');
  const noResults = document.getElementById('no-results');
  
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  
  const productCards = productGrid.querySelectorAll('.product-card');
  let visibleProducts = 0;
  
  productCards.forEach(card => {
    const productName = card.getAttribute('data-name').toLowerCase();
    const productCategory = card.getAttribute('data-category');
    
    // Buscar por nombre
    const matchesSearch = productName.includes(searchTerm);
    
    // Filtrar por categoría
    const matchesCategory = !selectedCategory || productCategory === selectedCategory;
    
    // Mostrar u ocultar
    if (matchesSearch && matchesCategory) {
      card.style.display = 'block';
      visibleProducts++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Mostrar mensaje de no resultados
  noResults.style.display = visibleProducts === 0 ? 'block' : 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  
  // Búsqueda en tiempo real
  searchInput.addEventListener('input', filtrarProductos);
  
  // Filtro por categoría
  categoryFilter.addEventListener('change', filtrarProductos);
});
