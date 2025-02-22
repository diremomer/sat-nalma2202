import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Satın Alma Sistemi</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
            >
              <LogOut className="h-5 w-5" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;