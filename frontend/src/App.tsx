import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import Contact from './components/Contact';
import AdminOrders from './pages/admin/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenus from './pages/admin/AdminMenus';
import { MenuDetail } from './components/MenuDetail';
import MenusPage from './pages/MenusPage';
import Register from './pages/Register';
import CommandeForm from './components/CommandeForm';

function App () {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/menu/:id" element={<MenuDetail />} />
    <Route path="/menus" element={<MenusPage />} />
    {/* <Route path="/commander/:id" element={<Checkout />} /> */}
    <Route path="/register" element={<Register />} />
    <Route path="/commande/:id" element={<CommandeForm />} />
    
    {/* Page principale du Dashboard */}
    <Route path="/admin" element={
      <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_EMPLOYE']}>
        <AdminDashboard />
      </ProtectedRoute>
    } />

    {/* Page dédiée aux Commandes */}
    <Route path="/admin/commandes" element={ 
      <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_EMPLOYE']}>
        <AdminOrders />
      </ProtectedRoute>
    } />

    {/* Page dédiée aux Menus */}
    <Route path="/admin/menus" element={ 
      <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_EMPLOYE']}>
        <AdminMenus />
      </ProtectedRoute>
    } />
  </Routes>
</Router>
  );
}

export default App;