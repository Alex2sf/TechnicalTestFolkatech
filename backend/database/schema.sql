CREATE DATABASE IF NOT EXISTS teknikaltest_db;
USE teknikaltest_db;

-- 1. Struktur Tabel Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Struktur Tabel Products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NULL,
  brand VARCHAR(100) NOT NULL DEFAULT 'UBRUKOPI',
  category VARCHAR(100) NOT NULL DEFAULT 'Roasted Bean',
  origin VARCHAR(100) NULL,
  species VARCHAR(100) NULL,
  roast_level VARCHAR(100) NULL,
  tasted VARCHAR(100) NULL,
  processing VARCHAR(100) NULL,
  price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 10,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  rating_count INT DEFAULT 0,
  image_url VARCHAR(500) NULL,
  description TEXT NULL,
  information TEXT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_products_name (name),
  INDEX idx_products_category (category),
  INDEX idx_products_price (price),
  INDEX idx_products_active_created (is_active, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Data Dummy Produk Kopi
INSERT INTO products (name, slug, brand, category, origin, species, roast_level, tasted, processing, price, stock, rating, rating_count, image_url, description, information) VALUES
('ABID CLEVER DRIPPER 102', 'abid-clever-dripper-102', 'UBRUKOPI', 'Equipment', 'Lainnya', 'Lainnya', 'Lainnya', 'Lainnya', 'Lainnya', 480000.00, 15, 5.0, 7, 'https://i.imgur.com/I2ODF9z.png', 'ABID Clever Dripper 102 memudahkan penyeduhan kopi manual brew dengan kontrol perendaman yang presisi.', 'Kapasitas 1-4 cups, Material BPA-Free Acrylic.'),
('Almond Biscuit', 'almond-biscuit', 'G COFFEE ROASTERY', 'Roasted Bean', 'Bandung', 'Arabika', 'Light Roast', 'Sweet', 'Honey White', 250000.00, 20, 5.0, 7, 'https://i.imgur.com/6BBrukQ.png', 'Kopi roasted bean dengan tasting notes almond, biscuit, dan butter cookies yang manis lembut.', 'Netto: 200gr, Process: Honey White.'),
('Aceh Gayo Coffee Beans', 'aceh-gayo-coffee-beans', 'ANOMALI COFFEE', 'Roasted Bean', 'Aceh', 'Arabika', 'Medium Roast', 'Nutty', 'Natural', 90000.00, 35, 5.0, 7, 'https://i.imgur.com/QMpUfTt.png', 'Kopi single origin Aceh Gayo dengan aroma rempah dan dark chocolate body yang mantap.', 'Netto: 200gr, Asal: Aceh Gayo Takengon.'),
('Blackpearl Coffee Beans', 'blackpearl-coffee-beans', 'ANOMALI COFFEE', 'Roasted Bean', 'Jawa', 'Robusta', 'Dark Roast', 'Chocolate', 'Natural', 90000.00, 18, 5.0, 7, 'https://i.imgur.com/u07DjPu.png', 'Perpaduan kopi pilihan dengan karakter bold dark chocolate, cocok untuk espresso dan es kopi susu.', 'Netto: 250gr, Dark Roast Blend Espresso.'),
('Bokasso #3', 'bokasso-3', 'TITIK TEMU ROASTERY', 'Roasted Bean', 'Lainnya', 'Arabika', 'Light to Medium', 'Fruity', 'Washed', 180000.00, 12, 5.0, 7, 'https://i.imgur.com/zdSz5xd.png', 'Notes floral peach, melati, dan black tea yang sangat menyegarkan saat diseduh V60.', 'Netto: 200gr, Origin: Ethiopia.'),
('Brazil Fazenda IP', 'brazil-fazenda-ip', 'COMMON GROUNDS', 'Roasted Bean', 'Lainnya', 'Arabika', 'Medium Roast', 'Sweet', 'Pulped Natural', 145000.00, 25, 5.0, 7, 'https://i.imgur.com/YbydIJ1.png', 'Kopi Brazil klasik dengan rasa hazelnut, karamel manis, dan tingkat keasaman rendah yang seimbang.', 'Netto: 200gr, Origin: Carmo de Minas, Brazil.'),
('Columbia Popayan Decaf', 'columbia-popayan-decaf', 'MORNING OWL', 'Roasted Bean', 'Lainnya', 'Arabika', 'Medium Roast', 'Sweet', 'Sugarcane EA Decaf', 165000.00, 14, 5.0, 7, 'https://i.imgur.com/AsN5Ggt.png', 'Kopi tanpa kafein dengan proses tebu alami tanpa bahan kimia berlebih. Tetap harum dan manis.', 'Netto: 200gr, Decaffeinated naturally.'),
('East Nusa Tenggara Flores', 'flores-bajawa', 'KORU COFFEE', 'Roasted Bean', 'Flores', 'Arabika', 'Medium Roast', 'Spicy', 'Full Washed', 110000.00, 30, 5.0, 7, 'https://i.imgur.com/tt4YFzs.png', 'Flores Bajawa terkenal dengan aroma tembakau manis, kayu manis, dan aftertaste cokelat hangat.', 'Netto: 250gr, Single Origin Flores Bajawa.'),
('Toraja Sapan Premium', 'toraja-sapan', 'TANAMERA', 'Roasted Bean', 'Toraja', 'Arabika', 'Medium to Dark', 'Spicy', 'Washed', 125000.00, 22, 5.0, 7, 'https://i.imgur.com/zMM9GLL.png', 'Kopi Toraja Sapan pegunungan tinggi Sulawesi dengan hint herbal, kayu manis, dan acidity bersih.', 'Netto: 200gr, Origin: Sapan, Toraja.');