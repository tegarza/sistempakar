<?php include 'header.php'; include 'data_penyakit.php'; ?>
<div class="container">
  <h2>Solusi dan Pencegahan Penyakit Kulit</h2>
  <?php foreach ($penyakit_data as $nama => $info) {
    echo "<h3>$nama</h3><p><strong>Penanganan:</strong> {$info['penanganan']}</p><p><strong>Pencegahan:</strong> {$info['pencegahan']}</p>";
  } ?>
</div>
