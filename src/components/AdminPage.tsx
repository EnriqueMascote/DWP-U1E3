import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { Product } from '../types';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
}

export function AdminPage({ products, onAddProduct, onUpdateProduct, onDeleteProduct }: AdminPageProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    date: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      date: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      date: formData.date
    };

    if (editingId !== null) {
      onUpdateProduct({ ...productData, id: editingId });
      setEditingId(null);
    } else {
      onAddProduct(productData);
      setIsAdding(false);
    }
    resetForm();
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      date: product.date
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsAdding(false);
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Administración de Productos
        </h1>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId !== null) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-purple-100">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            {editingId !== null ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Categoría
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="">Seleccionar categoría</option>
                <option value="Electronics">Electrónicos</option>
                <option value="Sports">Deportes</option>
                <option value="Home">Hogar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Precio
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={cancelEditing}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              <X size={20} />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              <Save size={20} />
              Guardar
            </button>
          </div>
        </form>
      )}

      {/* Products List */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">
          Lista de Productos
        </h2>
        <div className="space-y-4">
          {products.map(product => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b border-purple-100 last:border-b-0 pb-4 last:pb-0 hover:bg-purple-50 p-4 rounded-lg transition-colors"
            >
              <div>
                <h3 className="font-semibold text-lg text-purple-900">{product.name}</h3>
                <div className="text-sm text-purple-600">
                  <p>Categoría: {product.category}</p>
                  <p>Precio: ${product.price.toFixed(2)}</p>
                  <p>Fecha: {new Date(product.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <p className="text-purple-500 text-center py-8">
              No hay productos disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}