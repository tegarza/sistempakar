import { Symptom, Disease, Rule, DiagnosisResult } from './types';


// Basis Pengetahuan: Gejala (Tabel 3.2)
export const SYMPTOMS: Symptom[] = [
  { id: 1, code: "G01", name: "Merasakan sedikit demam, pliek, cepat merasa lelah, lean dan lemah", weight: 0.8 },
  { id: 2, code: "G02", name: "Tubuh mengalami demam tinggi", weight: 0.8 },
  { id: 3, code: "G03", name: "Mengalami sakit kepala, nyeri sendi dan pusing", weight: 0.6 },
  { id: 4, code: "G04", name: "Ruam berair muncul di sekujur tubuh hingga rongga mulut, mata, telinga serta hidung", weight: 0.8 },
  { id: 5, code: "G05", name: "Kulit terasa gatal", weight: 0.8 },
  { id: 6, code: "G06", name: "Bagian kecil yang kasar pada kulit dengan dikelilingi lingkaran merah muda", weight: 0.8 },
  { id: 7, code: "G07", name: "Terasa demam, pliek, cepat merasa lelah, dan lemah", weight: 0.6 },
  { id: 8, code: "G08", name: "Terasa nyeri sendi, sakit kepala dan pusing", weight: 0.8 },
  { id: 9, code: "G09", name: "Rasa sakit seperti terbakar", weight: 0.8 },
  { id: 10, code: "G10", name: "Kulit menjadi sensitif selama beberapa hari hingga 1 minggu", weight: 0.6 },
  { id: 11, code: "G11", name: "Timbul bintik kecil kemerahan pada kulit", weight: 0.6 }
];

// Basis Pengetahuan: Penyakit (Tabel 3.1)
export const DISEASES: Disease[] = [
  {
    id: 1,
    code: "P01",
    name: "Penyakit Kulit Cacar Air",
    description: "Cacar air adalah infeksi virus yang sangat menular, disebabkan oleh virus Varicella-zoster. Penyakit ini umumnya menyerang anak-anak tetapi dapat juga terjadi pada dewasa dengan gejala yang lebih berat.",
    treatment: "Obat anti demam, bila demam tinggi, Obat untuk mengurangi rasa gatal , bisa berupa obat luar berupa bedak salisil, atau obat yang diminum, obat antivirus berupa obat saleb asiklovir yang dioleskan pada ruam, Antibiotik diberikan bila ada infeksi bakteri.",
    prevention: "Vaksinasi (Vaksin Varicella), Hindari Kontak dengan penderita, terutama kelompok rentan (bayi, ibu hamil, orang dengan imun lemah), Jaga Daya Tahan Tubuh, Proteksi Lingkungan."
  },
  {
    id: 2,
    code: "P02",
    name: "Penyakit Kulit Kurap (Tinea Corporis)",
    description: " Infeksi jamur pada kulit yang menyerang lapisan luar, menyebabkan lesi berbentuk cincin (ringworm).",
    treatment: "Penggunaan obat anti jamur yang mengandung mikonazol dengan benar dapat menghilangkan infeksi.",
    prevention: "Hindari kontak dengan hewan atau orang yang terinfeksi. Gunakan alas kaki di area lembab (kolam renang, kamar mandi umum). Keringkan tubuh segera setelah berkeringat atau mandi."
  },
  {
    id: 3,
    code: "P03",
    name: "Penyakit Kulit Herpes Zoster",
    description: "Herpes zoster (cacar api/shingles) adalah infeksi kulit yang disebabkan oleh reaktivasi virus Varicella-zoster, virus yang sama penyebab cacar air. Setelah seseorang sembuh dari cacar air, virus dapat tetap dormant di saraf dan aktif kembali saat daya tahan tubuh menurun, terutama pada lansia atau orang dengan sistem imun lemah.",
    treatment: "Diobati dengan antivirus famicilovirm, acyclovir,  dan valacyclovir.",
    prevention: "Vaksin Shingrix (Zoster Vaccine Recombinant), Vaksin Cacar Air (Varicella), Jaga Daya Tahan Tubuh, Hindari Kontak dengan Orang Rentan."
  }
];

// Basis Pengetahuan: Aturan (Rules)
export const RULES: Rule[] = [
  { diseaseId: 1, symptomIds: [1, 2, 3, 4], cfValue: 0.8 },
  { diseaseId: 2, symptomIds: [5, 6], cfValue: 0.8 },
  { diseaseId: 3, symptomIds: [7, 8, 9, 10, 11], cfValue: 0.8 }
];

// Fungsi Certainty Factor (CF)
export function calculateCertaintyFactor(selectedSymptoms: number[]): DiagnosisResult[] {
  const results: DiagnosisResult[] = [];

  DISEASES.forEach(disease => {
    let totalCF = 0;
    let matchedRules = 0;

    const diseaseRules = RULES.filter(rule => rule.diseaseId === disease.id);

    diseaseRules.forEach(rule => {
      const matchedSymptoms = rule.symptomIds.filter(symptomId =>
        selectedSymptoms.includes(symptomId)
      ).length;

      if (matchedSymptoms === rule.symptomIds.length) {
        totalCF += rule.cfValue * (1 - totalCF);
        matchedRules++;
      }
    });

    if (matchedRules > 0) {
      results.push({
        disease,
        certainty: totalCF
      });
    }
  });

  return results.sort((a, b) => b.certainty - a.certainty);
}
