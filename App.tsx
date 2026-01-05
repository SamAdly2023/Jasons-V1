
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, CartItem, Product, Design, AppRoute } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Create from './pages/Create';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';

interface AppContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const login = () => {
    // Simulating Google Login
    setUser({
      id: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://picsum.photos/seed/user/100',
      isAdmin: true // For testing dashboard access
    });
  };

  const logout = () => setUser(null);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path={AppRoute.HOME} element={<Home />} />
              <Route path={AppRoute.GALLERY} element={<Gallery />} />
              <Route path={AppRoute.CREATE} element={<Create />} />
              <Route path={AppRoute.CHECKOUT} element={<Checkout />} />
              <Route path={AppRoute.ADMIN} element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={AppRoute.HOME} />} />
              <Route path="*" element={<Navigate to={AppRoute.HOME} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
