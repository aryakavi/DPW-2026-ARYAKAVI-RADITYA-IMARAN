# Deployment KegiatanKita ke Vercel

## Temuan dan perbaikan

1. Setiap halaman daftar (`kegiatan/list.html`, `peserta/list.html`, `pendaftaran/list.html`) memuat `app.js` lalu script loader halaman masing-masing (`kegiatan.js`, `peserta.js`, `pendaftaran.js`) setelahnya. Tanpa tag ini, fetch tidak pernah dijalankan dan tabel tetap kosong.
2. Deployment menggunakan file **statis** HTML/CSS/JS/JSON. Tidak diperlukan file konfigurasi tambahan; pengaturan deployment dilakukan melalui dashboard Vercel.
3. Event `table:updated` dikirim setelah loader selesai agar filter dan counter tersinkron.
4. Counter tidak menghitung baris pesan error/kosong sebagai data.

Path JSON `../data/*.json` sesuai jika halaman dibuka pada `/<folder>/list.html`. Kapitalisasi `assets/css/Style.css` juga sesuai file yang tersedia. Nama file/folder di Vercel harus sama persis, termasuk huruf besar/kecil.

## Pengaturan Vercel

Pada Settings → Build and Deployment (atau saat import proyek):

| Pengaturan | Nilai |
|---|---|
| Root Directory | `Jobsheet-6-KegiatanKita` **jika folder ini berada di dalam repository yang lebih besar**. Jika isi repository langsung `index.html`, `assets`, dan `data`, gunakan root repository (`.`/kosong). |
| Framework Preset | Other |
| Build Command | Aktifkan Override dan kosongkan nilainya agar build dilewati; tidak perlu menjalankan `node server.cjs`. |
| Output Directory | Aktifkan Override dan isi `.` (folder yang berisi `index.html`). |
| Install Command | Tidak diperlukan; aplikasi tidak memakai dependensi npm. |

`server.cjs` digunakan untuk mencoba secara lokal. Vercel menyajikan file statis langsung dan tidak perlu menjalankan proses `listen()` dari server lokal tersebut.

## Setelah mengunggah perubahan

1. Pastikan file HTML, seluruh `assets/`, dan ketiga file `data/*.json` masuk ke sumber deployment.
2. Simpan pengaturan Root Directory lalu lakukan deployment baru/Redeploy.
3. Periksa URL berikut, mengganti domain dengan domain deployment Anda:

```text
https://domain-anda.vercel.app/
https://domain-anda.vercel.app/kegiatan/list.html
https://domain-anda.vercel.app/peserta/list.html
https://domain-anda.vercel.app/pendaftaran/list.html
https://domain-anda.vercel.app/pendaftaran/daftar.html
https://domain-anda.vercel.app/assets/js/kegiatan.js
https://domain-anda.vercel.app/assets/css/Style.css
https://domain-anda.vercel.app/data/kegiatan.json
https://domain-anda.vercel.app/data/peserta.json
https://domain-anda.vercel.app/data/pendaftaran.json
```

4. Daftar kegiatan seharusnya berisi 10 baris, peserta 4 baris, dan pendaftaran 4 baris setelah indikator loading selesai.
5. Di DevTools → Network, pastikan request JSON berstatus 200 dan responsnya JSON, bukan halaman HTML fallback.

Jika `/` masih 404, periksa Root Directory dan output deployment. Jika hanya `/data/*.json` yang 404, pastikan data ikut diunggah. Jika domain bekerja tetapi URL tertentu tidak, catat URL lengkap dan kode status untuk diagnosis berikutnya.

## Hasil verifikasi lokal

Pengujian browser melalui server HTTP statis berhasil untuk:

- Beranda dan lima halaman lainnya: respons 200, seluruh tautan/script/CSS tersedia dengan kapitalisasi nama file yang tepat.
- JSON kegiatan, peserta, dan pendaftaran: respons 200 dengan tipe `application/json`, masing-masing 10, 4, dan 4 objek.
- Loading, pencarian selama fetch, konfirmasi Cancel/OK, counter, menu mobile, dan validasi form kosong.
- Muat Ulang kegiatan: data pulih tanpa duplikasi dan tombol aktif kembali setelah selesai.
- Form pendaftaran: kegiatan berkuota 0 tidak dapat dipilih, pendaftaran ganda dicegah, dan kuota berkurang pada sesi berjalan.

Pengujian browser statis tidak bergantung pada proses server Node untuk merender data.
