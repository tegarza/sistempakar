import { SYMPTOMS, DISEASES, RULES, calculateCertaintyFactor } from './expert-system';
import { DiagnosisResult } from './types';



const welcomeSection = document.getElementById('welcome-section')!;
const diagnosisSection = document.getElementById('diagnosis-section')!;
const resultSection = document.getElementById('result-section')!;
const diagnosisResult = document.getElementById('diagnosis-result')!;
const diseaseInfo = document.getElementById('disease-info')!;
const symptomsList = document.getElementById('symptoms-list')!;

let selectedSymptoms: number[] = [];


document.getElementById("start-btn")?.addEventListener("click", () => {
  document.getElementById("welcome-section")?.classList.add("d-none");
  document.getElementById("diagnosis-section")?.classList.remove("d-none");
});

document.getElementById('diagnose-btn')?.addEventListener('click', processDiagnosis);
document.getElementById('restart-btn')?.addEventListener('click', restartDiagnosis);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-btn')?.addEventListener('click', startDiagnosis);
});

function startDiagnosis(): void {
    welcomeSection.classList.add('d-none');
    diagnosisSection.classList.remove('d-none');
    renderSymptoms();
    renderDiseaseInfo();
}

function backToWelcome(): void {
    diagnosisSection.classList.add('d-none');
    welcomeSection.classList.remove('d-none');
    selectedSymptoms = [];
}

function renderSymptoms(): void {
    symptomsList.innerHTML = '';

    SYMPTOMS.forEach(symptom => {
        const symptomItem = document.createElement('div');
        symptomItem.className = 'list-group-item list-group-item-action';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-2 symptom-checkbox';
        checkbox.value = symptom.id.toString();
        checkbox.id = `symptom-${symptom.id}`;
        checkbox.addEventListener('change', handleSymptomSelection);

        const label = document.createElement('label');
        label.className = 'form-check-label w-100';
        label.htmlFor = `symptom-${symptom.id}`;
        label.innerHTML = `
            <strong>${symptom.code}</strong>: 
            ${symptom.name} <br>
            <small class="text-muted">Bobot: ${symptom.weight}</small>
        `;

        symptomItem.appendChild(checkbox);
        symptomItem.appendChild(label);
        symptomsList.appendChild(symptomItem);
    });
}

function handleSymptomSelection(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const symptomId = parseInt(checkbox.value);

    if (checkbox.checked) {
        if (!selectedSymptoms.includes(symptomId)) {
            selectedSymptoms.push(symptomId);
        }
    } else {
        selectedSymptoms = selectedSymptoms.filter(id => id !== symptomId);
    }
}

function processDiagnosis(): void {
    if (selectedSymptoms.length === 0) {
        alert('Silakan pilih minimal satu gejala!');
        return;
    }

    const results = calculateCertaintyFactor(selectedSymptoms);
    renderDiagnosisResults(results);

    diagnosisSection.classList.add('d-none');
    resultSection.classList.remove('d-none');
}

function renderDiagnosisResults(results: DiagnosisResult[]): void {
    diagnosisResult.innerHTML = '';
    diseaseInfo.innerHTML = ''; // Kosongkan info penyakit terlebih dahulu

    if (results.length === 0) {
        diagnosisResult.innerHTML = `
            <div class="alert alert-warning">
                Sistem tidak dapat mengidentifikasi penyakit berdasarkan gejala yang dipilih.
                Silakan konsultasikan dengan dokter spesialis kulit.
            </div>
        `;
        return; // Keluar dari fungsi tanpa render disease info
    }

    const topResult = results[0];

    let resultHTML = `
        <div class="alert ${topResult.certainty > 0.6 ? 'alert-success' : 'alert-warning'}">
            <h5>${topResult.disease.code} - ${topResult.disease.name}</h5>
            <p>Tingkat Kepastian: ${(topResult.certainty * 100).toFixed(2)}%</p>
            ${topResult.certainty <= 0.6 ? '<p class="mb-0">Kepercayaan rendah, disarankan untuk konsultasi dengan dokter.</p>' : ''}
        </div>

        <div class="card mb-3">
            <div class="card-header">
                <h6>Deskripsi Penyakit</h6>
            </div>
            <div class="card-body">
                <p>${topResult.disease.description}</p>
            </div>
        </div>
    `;

    if (results.length > 1) {
        resultHTML += `<h6 class="mt-4">Kemungkinan Lain:</h6><ul class="list-group">`;

        for (let i = 1; i < Math.min(results.length, 3); i++) {
            resultHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${results[i].disease.code} - ${results[i].disease.name}
                    <span class="badge bg-primary rounded-pill">${(results[i].certainty * 100).toFixed(2)}%</span>
                </li>
            `;
        }

        resultHTML += `</ul>`;
    }

    diagnosisResult.innerHTML = resultHTML;
    
    // Hanya render disease info jika ada hasil diagnosa
    if (results.length > 0) {
        renderDiseaseInfo(topResult.disease.id);
    }
}

function renderDiseaseInfo(diseaseId?: number): void {
    diseaseInfo.innerHTML = '';

    // Jika tidak ada diseaseId, tidak render apa-apa
    if (!diseaseId) return;

    const disease = DISEASES.find(d => d.id === diseaseId);
    if (!disease) return;

    const diseaseCol = document.createElement('div');
    diseaseCol.className = 'col-md-12 mb-4';

    const relatedRules = RULES.filter(r => r.diseaseId === disease.id);
    const relatedSymptoms = relatedRules
        .map(r => r.symptomIds.map(id => SYMPTOMS.find(s => s.id === id)))
        .reduce((acc, val) => acc.concat(val), []);

    diseaseCol.innerHTML = `
        <div class="card h-100">
            <div class="card-header">
                <h5>${disease.code} - ${disease.name}</h5>
            </div>
            <div class="card-body">
                <p><strong>Deskripsi:</strong> ${disease.description}</p>
                <p class="mb-1"><strong>Gejala:</strong></p>
                <ul class="mb-2">
                    ${relatedSymptoms.map(s =>
                        s ? `<li>${s.code}: ${s.name} (Bobot: ${s.weight})</li>` : ''
                    ).join('')}
                </ul>
                <p class="mb-1"><strong>Penanganan:</strong></p>
                <div class="mb-2" style="white-space: pre-line">${disease.treatment}</div>
                <p class="mb-1"><strong>Pencegahan:</strong></p>
                <div style="white-space: pre-line">${disease.prevention}</div>
            </div>
        </div>
    `;

    diseaseInfo.appendChild(diseaseCol);
}

function restartDiagnosis(): void {
    selectedSymptoms = [];
    document.querySelectorAll('.symptom-checkbox').forEach((checkbox: Element) => {
        (checkbox as HTMLInputElement).checked = false;
    });

    resultSection.classList.add('d-none');
    welcomeSection.classList.remove('d-none');
    renderDiseaseInfo();
}
