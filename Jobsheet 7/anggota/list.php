<?php
$page_title = "Daftar Anggota";
include __DIR__ . '/../includes/header.php';
?>
        <section>
            <h2>Daftar Anggota</h2>

            <div class="search-box">
                <label for="search-input">Cari Nama Anggota</label>
                <input type="text" id="search-input" placeholder="Ketik nama anggota...">
            </div>

            <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>No. Anggota</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>No. HP</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A001</td>
                        <td>Siti Aminah</td>
                        <td>Malang</td>
                        <td>0812xxxx</td>
                        <td>
                            <button type="button">Edit</button>
                            <button type="button" class="btn-hapus">Hapus</button>
                        </td>
                    </tr>
                    <tr>
                        <td>A002</td>
                        <td>Budi Santoso</td>
                        <td>Batu</td>
                        <td>0813xxxx</td>
                        <td>
                            <button type="button">Edit</button>
                            <button type="button" class="btn-hapus">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </section>
<?php include __DIR__ . '/../includes/footer.php'; ?>
