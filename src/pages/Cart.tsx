import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Alışveriş Sepeti</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Sepetiniz boş</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;