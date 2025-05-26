<?php
$gejala_data = [
  "G01" => "Merasakan demam ringan, pilek, lelah",
  "G02" => "Demam tinggi",
  "G03" => "Sakit kepala dan nyeri sendi",
  "G04" => "Ruam berair di seluruh tubuh",
  "G05" => "Kulit terasa gatal",
  "G06" => "Kulit kasar & lingkaran merah muda",
  "G07" => "Lelah, pilek, demam ringan",
  "G08" => "Nyeri sendi dan pusing",
  "G09" => "Rasa terbakar di kulit",
  "G10" => "Kulit sensitif selama beberapa hari",
  "G11" => "Bintik merah kecil di kulit"
];
$penyakit_data = [
  "Cacar Air" => [
    "gejala" => ["G01", "G02", "G03", "G04"],
    "deskripsi" => "Infeksi virus varicella yang menimbulkan ruam dan gelembung air.",
    "penanganan" => "Istirahat, minum obat penurun panas, hindari garukan.",
    "pencegahan" => "Vaksinasi dan menjaga daya tahan tubuh."
  ],
  "Kurap" => [
    "gejala" => ["G05", "G06"],
    "deskripsi" => "Infeksi jamur di kulit berbentuk lingkaran merah gatal.",
    "penanganan" => "Gunakan salep anti jamur secara rutin.",
    "pencegahan" => "Jaga kebersihan tubuh dan pakaian."
  ],
  "Herpes Zoster" => [
    "gejala" => ["G07", "G08", "G09", "G10", "G11"],
    "deskripsi" => "Cacar api yang disebabkan reaktivasi virus varicella zoster.",
    "penanganan" => "Obat antivirus dan pereda nyeri sesuai resep.",
    "pencegahan" => "Vaksin zoster dan pola hidup sehat."
  ]
];
?>