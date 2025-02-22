/*
  # Satın Alma Sistemi Veritabanı Şeması

  1. Yeni Tablolar
    - `products` (ürünler)
      - `id` (uuid, birincil anahtar)
      - `name` (metin, ürün adı)
      - `description` (metin, ürün açıklaması)
      - `price` (decimal, fiyat)
      - `stock` (integer, stok miktarı)
      - `image_url` (metin, ürün görseli)
      - `created_at` (zaman damgası)

    - `orders` (siparişler)
      - `id` (uuid, birincil anahtar)
      - `user_id` (uuid, kullanıcı referansı)
      - `status` (metin, sipariş durumu)
      - `total_amount` (decimal, toplam tutar)
      - `created_at` (zaman damgası)

    - `order_items` (sipariş detayları)
      - `id` (uuid, birincil anahtar)
      - `order_id` (uuid, sipariş referansı)
      - `product_id` (uuid, ürün referansı)
      - `quantity` (integer, miktar)
      - `unit_price` (decimal, birim fiyat)

  2. Güvenlik
    - Tüm tablolar için RLS aktif
    - Ürünleri herkes görüntüleyebilir
    - Siparişleri sadece ilgili kullanıcı görüntüleyebilir
*/

-- Ürünler tablosu
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Siparişler tablosu
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL CHECK (total_amount >= 0),
  created_at timestamptz DEFAULT now()
);

-- Sipariş detayları tablosu
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL CHECK (unit_price >= 0)
);

-- RLS politikaları
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Ürünler için okuma politikası
CREATE POLICY "Ürünleri herkes görüntüleyebilir"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Siparişler için politikalar
CREATE POLICY "Kullanıcılar kendi siparişlerini görüntüleyebilir"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar sipariş oluşturabilir"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Sipariş detayları için politikalar
CREATE POLICY "Kullanıcılar kendi sipariş detaylarını görüntüleyebilir"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );