<?php
// ==========================================================================
// REVISI — Jobsheet 10 (Autentikasi & Manajemen Sesi)
// File : includes/footer.php  (salinan perbaikan dari final)
// --------------------------------------------------------------------------
// [SALAH -> DIPERBAIKI] Label footer masih tertulis "Jobsheet 9".
//                       Seharusnya "Jobsheet 10". Lihat baris bertanda REVISI.
// [DIBERSIHKAN]         Tag PHP kosong "<?php ?>" di awal file dihapus
//                       (tidak berefek apa pun, hanya rapi).
// ==========================================================================
?>
    </main>

    <footer>
        <p>&copy; 2026 SIMPUS-Mini &mdash; Jobsheet 10</p><!-- REVISI: tadinya "Jobsheet 9" -->
    </footer>
    <script src="<?php echo $base; ?>assets/js/app.js"></script>
    <?php if (!empty($extra_scripts)): foreach ($extra_scripts as $src): ?>
    <script src="<?php echo $src; ?>"></script>
    <?php endforeach;
    endif; ?>
</body>
</html>
