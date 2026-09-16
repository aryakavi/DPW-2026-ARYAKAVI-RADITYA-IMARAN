# Menjalankan Versi Bab melalui Server Lokal

Fetch membaca JSON lewat HTTP. Mulai bab 4, buka aplikasi lewat server lokal, bukan klik dua kali HTML (`file://`). Semua path aplikasi relatif terhadap halaman sehingga setiap folder bab bisa dijalankan sendiri.

## Node.js — server yang disertakan

Node.js harus terpasang dan tersedia di terminal. Buka terminal di folder bab ini, lalu:

```powershell
node server.cjs
```

Buka `http://127.0.0.1:8000/index.html`. Untuk port lain:

```powershell
node server.cjs 8001
```

Buka `http://127.0.0.1:8001/index.html`. Hentikan dengan Ctrl+C. Tidak perlu `npm install`. Root server selalu folder tempat `server.cjs` disimpan. Server hanya membaca file; bukan API/database dan tidak menerima penyimpanan form.

## PHP

Jika PHP sudah terpasang, buka terminal **di dalam folder bab yang ingin diuji**:

```powershell
php -S localhost:8000
```

Buka `http://localhost:8000/index.html`. Jika terminal berada di folder induk `Jobsheet 6`, URL harus menyertakan nama bab, misalnya `http://localhost:8000/Bab-4-Jobsheet-6/buku/list.html`.

## VS Code Live Server / Laragon

- Live Server: klik kanan `index.html` pada folder bab → Open with Live Server; gunakan alamat/port yang dibuka editor.
- Laragon: tempatkan proyek di document root Laragon, aktifkan Apache, lalu buka melalui URL HTTP yang sesuai nama folder/domain lokal.

## Memeriksa fetch

1. Buka `buku/list.html` lalu DevTools → Network, refresh.
2. Periksa permintaan `buku.json`: status 200 dan respons array 10 objek.
3. Pada anggota, periksa `anggota.json`: array 4 objek.
4. Teks loading terlihat selama simulasi 600ms; UI tetap bisa digunakan.
5. Filter yang diketik selama loading diterapkan ketika respons selesai.

## Menguji kegagalan

- Sementara ubah `fetch("../data/buku.json")` dalam `assets/js/buku.js` ke nama yang tidak ada. Refresh → pesan status 404 dalam tabel, loading berhenti.
- Pulihkan nama file setelah mencoba.
- Sementara gunakan JSON tidak valid untuk melihat error parsing, atau `[]` untuk keadaan data kosong. Pulihkan data sesudahnya.
- Pada Bab 8, tombol Muat Ulang dapat digunakan untuk mencoba kembali setelah sumber data diperbaiki.

Browser dapat mencatat 404/permintaan gagal di Network/Console selama pengujian yang disengaja. Aplikasi tetap harus menampilkan pesan dan menyelesaikan loading, bukan menghasilkan rejection yang tidak ditangani.
