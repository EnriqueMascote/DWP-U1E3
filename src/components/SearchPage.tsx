import React, { useState } from 'react';
import { Search, Filter, List, SortAsc, Calendar, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface SearchPageProps {
  products: Product[];
}

export function SearchPage({ products }: SearchPageProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('');

  const resetFilters = () => {
    setSearchText('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setDateRange({ start: '', end: '' });
    setSortBy('');
  };

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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
        Demostración de Búsqueda Web
      </h1>

      {/* Search Controls */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 space-y-4 border border-purple-100">
        {/* Text Search */}
        <div className="flex items-center space-x-2">
          <Search className="text-purple-500" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              <Filter className="inline mr-1" size={16} /> Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="">Todas</option>
              <option value="Electronics">Electrónicos</option>
              <option value="Sports">Deportes</option>
              <option value="Home">Hogar</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Rango de Precio
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-1/2 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-1/2 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              <Calendar className="inline mr-1" size={16} /> Rango de Fecha
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-1/2 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-1/2 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Sort and Reset */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-purple-700 mb-1">
              <SortAsc className="inline mr-1" size={16} /> Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-64 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="">Sin orden</option>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
              <option value="date">Fecha</option>
            </select>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            <RotateCcw size={16} />
            Reiniciar Filtros
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
          <List className="mr-2" size={20} />
          Resultados ({filteredProducts.length})
        </h2>
        
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="border-b border-purple-100 last:border-b-0 pb-4 last:pb-0 hover:bg-purple-50 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-lg text-purple-900">{product.name}</h3>
              <div className="text-sm text-purple-600">
                <p>Categoría: {product.category}</p>
                <p>Precio: ${product.price.toFixed(2)}</p>
                <p>Fecha: {new Date(product.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <p className="text-purple-500 text-center py-8">
              No se encontraron resultados que coincidan con los criterios de búsqueda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}