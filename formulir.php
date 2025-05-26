<?php include 'header.php'; ?>
<div class="container">
  <h2>Formulir Data Pengguna</h2>
  <form method="POST" action="diagnosa.php">
    <label>Nama:</label><input type="text" name="nama" required><br>
    <label>Umur:</label><input type="number" name="umur" required><br>
    <label>Jenis Kelamin:</label>
    <select name="jk" required>
      <option value="Laki-laki">Laki-laki</option>
      <option value="Perempuan">Perempuan</option>
    </select><br>
    <button type="submit" class="btn">Lanjut ke Diagnosa</button>
  </form>
</div>