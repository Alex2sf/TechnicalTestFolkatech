Folkatech Technical Test - Fullstack App

Project ini saya buat untuk memenuhi tugas technical test di PT Folka Indonesia Teknologi. Aplikasi terdiri dari REST API (Express.js + MySQL) dan Web Client (React.js + Tailwind CSS).

Tech Stack

- Backend: Node.js, Express.js, MySQL (mysql2)
- Frontend: React.js (Vite), Tailwind CSS, Axios, Lucide React
- Auth: JWT (jsonwebtoken) & bcryptjs


Fitur Aplikasi

1. Autentikasi User
   - Register akun baru (password di-hash dengan bcrypt).
   - Login user dengan return token JWT.
   - Proteksi route privat menggunakan middleware JWT di backend dan ProtectedRoute di frontend.

2. Katalog & Detail Produk
   - Menampilkan list produk kopi dengan paginasi.
   - Filter produk berdasarkan origin, species, roast level, proses, dan batas harga maksimal.
   - Pencarian produk berdasarkan nama.
   - Sorting berdasarkan nama produk, harga terendah/tertinggi, dan rating.
   - Halaman detail produk lengkap dengan spesifikasi dan rekomendasi produk terkait.

3. Format JSON:API
   - Format response endpoint dibuat mengikuti konvensi standar JSON:API v1.0 (`data`, `attributes`, `meta`, dan `errors`).

4. Optimasi Database
   - Connection Pool: Menggunakan pool connection pada `mysql2` untuk handle request secara konkuren dan efisien.
   - Indexing: Menambahkan index pada kolom yang sering di-query:
     - `idx_users_email` untuk mempercepat query cek email saat login/register.
     - `idx_products_name` untuk query search nama.
     - `idx_products_category` & `idx_products_price` untuk filtering dan sorting.
     - Composite index `idx_products_active_created` untuk query pagination produk aktif.


Cara Menjalankan

 1. Database
Buat database MySQL baru bernama `teknikaltest_db`, lalu import file skema tabel:
```text
File SQL: backend/database/schema.sql
```

 2. Backend
Masuk ke folder `backend` dan install dependencies:
```bash
cd backend
npm install
```

Sesuaikan konfigurasi di file `.env`:
```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=teknikaltest_db
JWT_SECRET=tekniknal_test
```

Jalankan server:
```bash
node src/server.js
# Server jalan di http://localhost:5000
```

 3. Frontend
Buka terminal baru, masuk ke folder `frontend`:
```bash
cd frontend
npm install
npm run dev
# Buka URL yang muncul di terminal
```

Testing API
Untuk mempermudah pengujian endpoint, file collection Postman sudah disertakan di root project:
`Folkatech-API.postman_collection.json`.
