export interface Symptom {
  id: number;
  code: string;
  name: string;
  weight: number;
}

export interface Rule {
  diseaseId: number;
  symptomIds: number[];
  cfValue: number;
}

export interface DiagnosisResult {
  disease: Disease;
  certainty: number;
}

export interface Disease {
  id: number;
  code: string; // <-- Add this
  name: string;
  description: string;
  treatment: string;
  prevention: string;
}