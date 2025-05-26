<?php session_start(); include 'header.php'; include 'data_penyakit.php';  ?>
<div class="container">
  <h2>Hasil Diagnosa</h2>
  <?php
  echo "<p><strong>Nama:</strong> {$_SESSION['user']['nama']}</p>";
  echo "<p><strong>Umur:</strong> {$_SESSION['user']['umur']} tahun</p>";
  echo "<p><strong>Jenis Kelamin:</strong> {$_SESSION['user']['jk']}</p>";

  $cf_pakar = ["G01"=>0.8,"G02"=>0.8,"G03"=>0.6,"G04"=>0.8,"G05"=>0.8,"G06"=>0.8,"G07"=>0.6,"G08"=>0.8,"G09"=>0.8,"G10"=>0.6,"G11"=>0.6];
  $gejala = $_POST['gejala'];
  $hasil = [];
  foreach ($penyakit_data as $nama => $info) {
    $cf_total = 0; $first = true;
    foreach ($info['gejala'] as $kode) {
      if (isset($gejala[$kode]) && $gejala[$kode] !== '') {
        $cf_user = floatval($gejala[$kode]);
        $cf = $cf_pakar[$kode] * $cf_user;
        $cf_total = $first ? $cf : $cf_total + $cf * (1 - $cf_total);
        $first = false;
      }
    }
    $hasil[$nama] = round($cf_total, 4);
  }
  arsort($hasil);
  $top = array_key_first($hasil);
  echo "<h3>$top (" . ($hasil[$top]*100) . "%)</h3>";
  echo "<p><strong>Deskripsi:</strong> {$penyakit_data[$top]['deskripsi']}</p>";
  echo "<p><strong>Gejala yang Dipilih:</strong></p><ul>";
  foreach ($gejala as $k => $v) if ($v > 0) echo "<li>{$gejala_data[$k]} - Keyakinan: $v</li>";
  echo "</ul><p><strong>Penanganan:</strong> {$penyakit_data[$top]['penanganan']}</p>";
  echo "<p><strong>Pencegahan:</strong> {$penyakit_data[$top]['pencegahan']}</p>";
  ?>
  <button class="btn" onclick="window.location.href='formulir.php'">Diagnosa Ulang</button>
</div>
