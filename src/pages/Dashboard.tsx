import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (error) throw error;
          setUser(userData);
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-600">
        Kullanıcı bilgileri bulunamadı.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Hoş Geldiniz, {user.full_name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Kullanıcı Bilgileri</h2>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium">Departman:</span> {user.department}</p>
              <p><span className="font-medium">Rol:</span> {user.role}</p>
              <p><span className="font-medium">E-posta:</span> {user.email}</p>
            </div>
          </div>
          
          {/* Buraya kullanıcının rolüne göre özel içerikler eklenecek */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;