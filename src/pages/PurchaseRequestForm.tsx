import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface FormData {
  title: string;
  description: string;
  estimated_cost: number;
  priority: 'dusuk' | 'orta' | 'yuksek';
}

const PurchaseRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    estimated_cost: 0,
    priority: 'orta'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Kullanıcı bulunamadı');

      const { error } = await supabase
        .from('purchase_requests')
        .insert([
          {
            requester_id: user.id,
            title: formData.title,
            description: formData.description,
            estimated_cost: formData.estimated_cost,
            priority: formData.priority,
            status: 'beklemede'
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        estimated_cost: 0,
        priority: 'orta'
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'estimated_cost' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Satın Alma Talebi Oluştur</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Satın alma talebi başarıyla oluşturuldu!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Talep Başlığı
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="estimated_cost" className="block text-sm font-medium text-gray-700">
              Tahmini Maliyet (TL)
            </label>
            <input
              type="number"
              id="estimated_cost"
              name="estimated_cost"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.estimated_cost}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Öncelik
            </label>
            <select
              id="priority"
              name="priority"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="dusuk">Düşük</option>
              <option value="orta">Orta</option>
              <option value="yuksek">Yüksek</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Gönderiliyor...' : 'Talep Oluştur'}
        </button>
      </form>
    </div>
  );
};

export default PurchaseRequestForm;