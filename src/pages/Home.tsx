import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShoppingCart, FileText, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Satın Alma Sistemi
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Kurumsal satın alma süreçlerinizi kolayca yönetin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Link
          to="/purchase-request"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <FileText className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Talep Oluştur</h2>
          <p className="text-gray-600">
            Yeni bir satın alma talebi oluşturun
          </p>
        </Link>

        <Link
          to="/products"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <ShoppingCart className="h-12 w-12 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ürünler</h2>
          <p className="text-gray-600">
            Mevcut ürünleri görüntüleyin
          </p>
        </Link>

        <Link
          to="/dashboard"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Building2 className="h-12 w-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Panel</h2>
          <p className="text-gray-600">
            Talep ve sipariş durumlarını takip edin
          </p>
        </Link>

        <Link
          to="/admin"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="h-12 w-12 text-red-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Yönetim</h2>
          <p className="text-gray-600">
            Kullanıcı ve sistem yönetimi
          </p>
        </Link>
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Nasıl Çalışır?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Talep Oluşturun
            </h3>
            <p className="text-gray-600">
              İhtiyacınız olan ürün veya hizmet için detaylı bir talep oluşturun
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Onay Süreci
            </h3>
            <p className="text-gray-600">
              Talebiniz ilgili departmanlar tarafından incelenir ve onaylanır
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Takip Edin
            </h3>
            <p className="text-gray-600">
              Talebinizin durumunu panel üzerinden anlık olarak takip edin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;