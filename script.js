let dataExperience = [];
let dataEducation = [];

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabName).style.display = 'block';
    document.getElementById('nav-' + tabName).classList.add('active');
}

function submitData() {
    const nama = document.getElementById('inNama').value;
    const email = document.getElementById('inEmail').value;
    const prodi = document.getElementById('inProdi').value;
    const tanggal = document.getElementById('inTanggal').value;
    const level = document.getElementById('inLevel').value;

    if (!nama || !prodi || !tanggal) {
        alert("Lengkapi field wajib: Nama, Divisi, dan Tanggal.");
        return;
    }

    const preview = document.getElementById('previewCard');
    preview.style.transform = "scale(1.03)";
    
    setTimeout(() => {
        document.getElementById('outNama').innerText = nama;
        document.getElementById('outEmail').innerText = email || "---";
        document.getElementById('outProdi').innerText = prodi;
        document.getElementById('outTanggal').innerText = formatIDDate(tanggal);
        document.getElementById('outLevel').innerText = level;
        preview.style.transform = "scale(1)";
        alert("Profil berhasil diperbarui!");
    }, 200);
}

function formatIDDate(dateStr) {
    if (!dateStr) return "--/--/----";
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

function addExperience() {
    const id = Date.now();
    renderExpForm({ id, perusahaan: "", posisi: "" });
}

function renderExpForm(item) {
    const list = document.getElementById('experience-list');
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.id = `exp-form-${item.id}`;
    div.innerHTML = `
        <div class="form-grid">
            <div class="form-group"><label>Perusahaan</label><input type="text" id="corp-${item.id}" value="${item.perusahaan}"></div>
            <div class="form-group"><label>Posisi</label><input type="text" id="pos-${item.id}" value="${item.posisi}"></div>
        </div>
        <div class="form-actions-row">
            <button class="btn-save-small" onclick="saveExp(${item.id})">Simpan</button>
            <button class="btn-del-small" onclick="document.getElementById('exp-form-${item.id}').remove()">Batal</button>
        </div>
    `;
    list.appendChild(div);
}

function saveExp(id) {
    const corp = document.getElementById(`corp-${id}`).value;
    const pos = document.getElementById(`pos-${id}`).value;
    if(!corp || !pos) return alert("Isi semua data!");

    const index = dataExperience.findIndex(x => x.id === id);
    if(index > -1) dataExperience[index] = { id, perusahaan: corp, posisi: pos };
    else dataExperience.push({ id, perusahaan: corp, posisi: pos });

    document.getElementById(`exp-form-${id}`).remove();
    renderExpCards();
}

function renderExpCards() {
    const container = document.getElementById('experience-display-list');
    container.innerHTML = "";
    dataExperience.forEach(item => {
        container.innerHTML += `
            <div class="result-card">
                <div><strong>${item.perusahaan}</strong><p>${item.posisi}</p></div>
                <div class="card-actions">
                    <i class="fa-solid fa-pen" onclick="editExp(${item.id})"></i>
                    <i class="fa-solid fa-trash" onclick="deleteExp(${item.id})"></i>
                </div>
            </div>
        `;
    });
}

function deleteExp(id) {
    dataExperience = dataExperience.filter(x => x.id !== id);
    renderExpCards();
}

function editExp(id) {
    const item = dataExperience.find(x => x.id === id);
    renderExpForm(item);
}

function addEducation() {
    const id = Date.now();
    renderEduForm({ id, institusi: "", gelar: "" });
}

function renderEduForm(item) {
    const list = document.getElementById('education-list');
    const div = document.createElement('div');
    div.className = 'education-item';
    div.id = `edu-form-${item.id}`;
    div.innerHTML = `
        <div class="form-grid">
            <div class="form-group"><label>Institusi</label><input type="text" id="inst-${item.id}" value="${item.institusi}"></div>
            <div class="form-group"><label>Gelar/Jurusan</label><input type="text" id="degree-${item.id}" value="${item.gelar}"></div>
        </div>
        <div class="form-actions-row">
            <button class="btn-save-small" onclick="saveEdu(${item.id})">Simpan</button>
            <button class="btn-del-small" onclick="document.getElementById('edu-form-${item.id}').remove()">Batal</button>
        </div>
    `;
    list.appendChild(div);
}

function saveEdu(id) {
    const inst = document.getElementById(`inst-${id}`).value;
    const deg = document.getElementById(`degree-${id}`).value;
    if(!inst || !deg) return alert("Isi semua data!");

    const index = dataEducation.findIndex(x => x.id === id);
    if(index > -1) dataEducation[index] = { id, institusi: inst, gelar: deg };
    else dataEducation.push({ id, institusi: inst, gelar: deg });

    document.getElementById(`edu-form-${id}`).remove();
    renderEduCards();
}

function renderEduCards() {
    const container = document.getElementById('education-display-list');
    container.innerHTML = "";
    dataEducation.forEach(item => {
        container.innerHTML += `
            <div class="result-card">
                <div><strong>${item.institusi}</strong><p>${item.gelar}</p></div>
                <div class="card-actions">
                    <i class="fa-solid fa-pen" onclick="editEdu(${item.id})"></i>
                    <i class="fa-solid fa-trash" onclick="deleteEdu(${item.id})"></i>
                </div>
            </div>
        `;
    });
}

function deleteEdu(id) {
    dataEducation = dataEducation.filter(x => x.id !== id);
    renderEduCards();
}

function editEdu(id) {
    const item = dataEducation.find(x => x.id === id);
    renderEduForm(item);
}