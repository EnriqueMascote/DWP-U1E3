import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SearchPage } from './components/SearchPage';
import { AdminPage } from './components/AdminPage';
import { Product } from './types';
import { LayoutGrid, Settings } from 'lucide-react';

// Initial sample data
const initialProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 999.99, date: '2024-03-01' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, date: '2024-02-15' },
  { id: 3, name: 'Running Shoes', category: 'Sports', price: 89.99, date: '2024-03-10' },
  { id: 4, name: 'Coffee Maker', category: 'Home', price: 49.99, date: '2024-01-20' },
  { id: 5, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, date: '2024-03-05' },
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Math.max(0, ...products.map(p => p.id)) + 1
    };
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link 
                to="/"
                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Búsqueda Web
              </Link>
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 transition-colors"
                >
                  <LayoutGrid size={20} />
                  Búsqueda
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 transition-colors"
                >
                  <Settings size={20} />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-8">
          <Routes>
            <Route path="/" element={<SearchPage products={products} />} />
            <Route 
              path="/admin" 
              element={
                <AdminPage 
                  products={products}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;