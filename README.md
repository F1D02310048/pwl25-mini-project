# pwl25-mini-project - Products REST API (CRUD)
Nama: [Fadila Rahmania]
NIM: [F1D02310048]

## Ringkasan Proyek
Proyek ini mengimplementasikan REST API CRUD (Create, Read, Update, Delete) sederhana untuk mengelola data produk menggunakan Node.js dengan framework Express.js dan database MySQL. Struktur proyek mengikuti pola Model-View-Controller (MVC) dan menyertakan middleware wajib (Logger, Validator, Error Handler).

## Struktur Folder Proyek
Struktur folder mengadopsi pola MVC (Model, Controller, Routes) yang dipadukan dengan folder untuk Config dan Middleware. 

<img width="435" height="399" alt="gambar" src="https://github.com/user-attachments/assets/c55f3a19-34b5-47f0-ad9c-086e8aeb6c7b" />

## Database
Saya menggunakan database MySQL dengan nama femalehijab dan satu tabel bernama produk.

<img width="1082" height="321" alt="gambar" src="https://github.com/user-attachments/assets/b254d28a-7d58-42d2-aa2a-a3d9b569226f" />

## Penjelasan Kode Utama
Berikut adalah penjelasan singkat untuk setiap file berdasarkan kode yang Anda berikan:
1. **config/db.js**: Menghubungkan aplikasi ke database MySQL menggunakan mysql2/promise dengan konfigurasi yang diambil dari .env. Ini memastikan informasi sensitif terpisah dari kode.

2. **models/productModel.js**: Bertanggung jawab untuk semua interaksi database (CRUD). Fungsi-fungsi di sini mengeksekusi query SQL murni, seperti getAllProducts, createProduct, updateProduct, dan deleteProduct.

3. **controllers/productController.js**: Mengandung logika bisnis dan menangani request dari client (mengambil data dari req.params atau req.body) dan mengirimkan response JSON. Ia memanggil fungsi dari productModel dan menangani error dasar (misalnya, data tidak ditemukan).

4. **routes/productRoutes.js**: Mendefinisikan semua endpoint CRUD untuk resource /api/produk dan mengarahkan request ke controller yang sesuai.
    GET /: getAllProducts (Mengambil semua data produk)
    GET /:id: getProductById (Mengambil data produk berdasarkan ID)
    POST /: validateProduct, createProduct (Menambahkan produk baru)
    PUT /:id: validateProduct, updateProduct (Memperbarui data produk berdasarkan ID)
    DELETE /:id: deleteProduct (Menghapus produk berdasarkan ID)

5. **middleware/logger.js**: Middleware sederhana untuk mencatat metode HTTP (req.method) dan URL (req.url) dari setiap request yang masuk ke server.

6. **middleware/validateProduct.js**: Middleware validasi input. Ini memastikan field wajib (nama_produk, kategori, harga, stok, tanggal_masuk) tidak kosong sebelum request dilanjutkan ke controller. Jika ada yang kosong, ia akan mengembalikan response HTTP 400 Bad Request.

7. **middleware/errorHandler.js**: Middleware penanganan error. Jika ada error yang tidak tertangkap (HTTP 500), middleware ini akan mencatat error tersebut di konsol server dan mengirimkan response JSON ke client dengan pesan error umum.

8. **app.js** File entry point. Menginisialisasi Express, mendaftarkan middleware global (express.json(), logger, errorHandler), dan mengaitkan route (/api/produk) ke router produk.

## Implementasi Middleware Wajib
- logger (middleware/logger.js): Mencatat setiap request yang masuk (METHOD URL) ke konsol server.
- validateProduct (middleware/validateProduct.js): Memastikan field wajib (nama_produk, kategori, harga, stok, tanggal_masuk) terisi sebelum operasi POST atau PUT dilanjutkan. Jika gagal, mengembalikan HTTP 400.
- errorHandler (middleware/errorHandler.js): Middleware terakhir untuk menangkap error yang tidak terduga dan mengembalikan response HTTP 500 yang seragam.

## Hasil Uji API dengan Postman
1. Screenshot Endpoint GET: Gambar dibawah menunjukkan hasil pengujian endpoint GET pada URL http://localhost:3000/api/produk menggunakan Postman. Endpoint ini berfungsi untuk mengambil seluruh data produk yang tersimpan di dalam database. Pada bagian pengaturan request, tidak terdapat parameter maupun body karena metode GET hanya digunakan untuk membaca data. Hasil response yang ditampilkan dalam format JSON menunjukkan bahwa proses pengambilan data berhasil dengan nilai "success": true. Data yang dikembalikan berupa array berisi beberapa objek produk, masing-masing memiliki atribut seperti id, nama_produk, kategori, harga, stok, tanggal_masuk, expired_date, dan is_best_seller. Berdasarkan hasil tersebut dapat disimpulkan bahwa endpoint GET /api/produk berfungsi dengan baik dan berhasil menampilkan seluruh data produk secara lengkap dari database.
   
   <img width="869" height="966" alt="Screenshot 2025-10-26 205047" src="https://github.com/user-attachments/assets/d8ed6219-b5d1-4f30-b366-edb9eed18583" />

2. Screenshot Endpoint GET berdasarkan ID: Gambar dibawah menunjukkan hasil pengujian endpoint GET pada URL http://localhost:3000/api/produk/1 menggunakan Postman. Endpoint ini digunakan untuk mengambil data produk berdasarkan ID tertentu, dalam hal ini produk dengan ID = 1. Pada pengaturan request, tidak terdapat body karena metode GET hanya digunakan untuk membaca data dari server. Hasil response yang diterima dalam format JSON menampilkan status "success": true, yang menandakan permintaan berhasil diproses. Data yang dikembalikan berupa satu objek produk dengan detail seperti nama_produk = “Hijab Polos Premium”, kategori = “Pashmina”, harga = “75000.00”, stok = 20, tanggal_masuk = “2025-09-30”, expired_date = “2026-09-30”, dan is_best_seller = 1. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint GET /api/produk/:id berfungsi dengan baik dan berhasil menampilkan data produk sesuai ID yang diminta.
   
   <img width="885" height="879" alt="Screenshot 2025-10-26 205034" src="https://github.com/user-attachments/assets/7f0911fa-144f-4faf-acb9-22ff9c47718e" />

3. Screenshot Endpoint POST: Gambar dibawah menunjukkan hasil pengujian endpoint POST pada URL http://localhost:3000/api/produk menggunakan Postman. Endpoint ini berfungsi untuk menambahkan data produk baru ke dalam database. Pada bagian pengaturan request, tipe body yang digunakan adalah raw JSON, di mana pengguna mengirimkan data produk seperti nama_produk, kategori, harga, stok, tanggal_masuk, expired_date, dan is_best_seller. Setelah permintaan dikirim, server merespons dengan kode status 201 Created, yang menandakan bahwa data berhasil ditambahkan. Response JSON menampilkan "success": true dan pesan "message": "Product created", disertai data produk yang baru saja dimasukkan, termasuk ID baru yaitu id: 6. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint POST /api/produk berfungsi dengan baik dan berhasil menambahkan produk baru ke dalam database sesuai data yang dikirimkan melalui request.
   
   <img width="985" height="909" alt="Screenshot 2025-10-26 205733" src="https://github.com/user-attachments/assets/4aded2a8-92c7-4c55-b770-584387829021" />

4. Screenshot Endpoint PUT dengan ID: Gambar dibawah menunjukkan hasil pengujian endpoint PUT pada URL http://localhost:3000/api/produk/1 menggunakan Postman. Endpoint ini digunakan untuk memperbarui data produk yang sudah ada berdasarkan ID tertentu, dalam hal ini produk dengan ID = 1. Pada bagian body, pengguna mengirimkan data baru dalam format raw JSON, seperti nama_produk, kategori, harga, stok, tanggal_masuk, dan expired_date. Setelah permintaan dijalankan, server memberikan respons dengan status 200 OK yang menandakan pembaruan data berhasil dilakukan. Hasil response JSON menampilkan "success": true dan pesan "message": "Product updated", disertai data produk yang telah diperbarui, termasuk perubahan pada nama produk menjadi “Hijab Polos Premium Updated”, harga menjadi 80000, dan stok menjadi 25. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint PUT /api/produk/:id berfungsi dengan baik dan berhasil memperbarui data produk sesuai dengan informasi yang dikirimkan melalui request.
   
   <img width="766" height="964" alt="Screenshot 2025-10-26 210752" src="https://github.com/user-attachments/assets/d02ad83e-e8fc-4a16-922b-3316cea7c1f1" />

5. Screenshot Endpoint DELETE dengan ID: Gambar dibawah menunjukkan hasil pengujian endpoint DELETE pada URL http://localhost:3000/api/produk/2 menggunakan Postman. Endpoint ini digunakan untuk menghapus data produk berdasarkan ID tertentu, dalam hal ini produk dengan ID = 2. Pada pengujian ini, metode DELETE digunakan untuk menghapus data secara permanen dari database, sehingga tidak diperlukan body pada request. Setelah permintaan dijalankan, server memberikan respons dalam format JSON dengan nilai "success": true dan pesan "message": "Product deleted", yang menandakan bahwa proses penghapusan data berhasil dilakukan. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint DELETE /api/produk/:id berfungsi dengan baik dan berhasil menghapus data produk sesuai dengan ID yang diminta dari database.
 
   <img width="872" height="781" alt="Screenshot 2025-10-26 210825" src="https://github.com/user-attachments/assets/ab0017b6-8231-4e42-85e6-2300441d3a54" />






