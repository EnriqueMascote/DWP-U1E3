import React, { useState } from 'react';
import { Search, Filter, List, SortAsc, Calendar } from 'lucide-react';

// Sample data
const products = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 999.99, date: '2024-03-01' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, date: '2024-02-15' },
  { id: 3, name: 'Running Shoes', category: 'Sports', price: 89.99, date: '2024-03-10' },
  { id: 4, name: 'Coffee Maker', category: 'Home', price: 49.99, date: '2024-01-20' },
  { id: 5, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, date: '2024-03-05' },
];

function App() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('');

  // Filter and sort the products
  const filteredProducts = products
    .filter(product => {
      const matchesText = product.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = (!priceRange.min || product.price >= Number(priceRange.min)) &&
                          (!priceRange.max || product.price <= Number(priceRange.max));
      const matchesDate = (!dateRange.start || product.date >= dateRange.start) &&
                         (!dateRange.end || product.date <= dateRange.end);
      
      return matchesText && matchesCategory && matchesPrice && matchesDate;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Demostración de Búsqueda Web
        </h1>

        {/* Search Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
          {/* Text Search */}
          <div className="flex items-center space-x-2">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Filter className="inline mr-1" size={16} /> Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Todas</option>
                <option value="Electronics">Electrónicos</option>
                <option value="Sports">Deportes</option>
                <option value="Home">Hogar</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rango de Precio
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-1/2 p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-1/2 p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline mr-1" size={16} /> Rango de Fecha
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-1/2 p-2 border rounded-md"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-1/2 p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <SortAsc className="inline mr-1" size={16} /> Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-1/3 p-2 border rounded-md"
            >
              <option value="">Sin orden</option>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
              <option value="date">Fecha</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <List className="mr-2" size={20} />
            Resultados ({filteredProducts.length})
          </h2>
          
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="border-b last:border-b-0 pb-4 last:pb-0"
              >
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="text-sm text-gray-600">
                  <p>Categoría: {product.category}</p>
                  <p>Precio: ${product.price.toFixed(2)}</p>
                  <p>Fecha: {new Date(product.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No se encontraron resultados que coincidan con los criterios de búsqueda.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;