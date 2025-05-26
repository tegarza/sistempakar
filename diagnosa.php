<?php session_start(); include 'header.php'; include 'data_penyakit.php'; 
$_SESSION['user'] = $_POST; ?>
<div class="container">
  <div class="inner">
    <h2>Form Diagnosa</h2>
    <form action="hasil.php" method="POST">
      <h4>Pilih Gejala yang Anda Alami:</h4>
      <?php
      $tingkat = [
        "1" => "Sangat Yakin (1.0)", 
        "0.8" => "Yakin (0.8)", 
        "0.6" => "Cukup Yakin (0.6)", 
        "0.4" => "Sedikit Yakin (0.4)", 
        "0.2" => "Tidak Tahu (0.2)", 
        "0" => "Tidak (0.0)"
      ];
      foreach ($gejala_data as $kode => $nama) {
        echo "<label>$nama<br><select name='gejala[$kode]'><option value=''>--Pilih--</option>";
        foreach ($tingkat as $val => $label) echo "<option value='$val'>$label</option>";
        echo "</select></label><br>";
      }
      ?>
      <button type="submit" class="btn">Diagnosa Sekarang</button>
    </form>
  </div>
</div>
