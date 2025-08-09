const form = document.getElementById('Mjt16');
const form2 = document.getElementById('formProfesorAndStaff');
const student = document.getElementById('studentBtn');
const professor = document.getElementById('professorBtn');

professor.addEventListener('click', () => {
    form2.style.display = 'flex';
    form.style.display = 'none';
});

student.addEventListener('click', () => {
    form.style.display = 'flex';
    form2.style.display = 'none';
});

// ----------- ฟังก์ชัน validate ฟอร์มนักศึกษา -----------
form.addEventListener('submit', function(e) {
    let valid = true;
    // ลบ error เดิม
    form.querySelectorAll('.error-message').forEach(el => el.remove());

    // Helper function
    function showError(input, message) {
        const err = document.createElement('span');
        err.className = 'error-message';
        err.style.color = 'red';
        err.style.fontSize = '0.9em';
        err.textContent = message;
        if (input.parentNode) input.parentNode.appendChild(err);
    }

    // ชื่อ-นามสกุล
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
        showError(name, 'กรุณากรอกชื่อ-นามสกุล');
        valid = false;
    }
    // รหัสนักศึกษา
    const codeStudent = form.querySelector('#codeStudent');
    if (!codeStudent.value.trim()) {
        showError(codeStudent, 'กรุณากรอกรหัสนักศึกษา');
        valid = false;
    } else if (!/^\d{8,}$/.test(codeStudent.value.trim())) {
        showError(codeStudent, 'รหัสนักศึกษาต้องเป็นตัวเลขอย่างน้อย 8 หลัก');
        valid = false;
    }
    // โทรศัพท์มือถือ
    const phone = form.querySelector('#phone');
    if (!phone.value.trim()) {
        showError(phone, 'กรุณากรอกเบอร์โทรศัพท์');
        valid = false;
    } else if (!/^\d{9,10}$/.test(phone.value.trim())) {
        showError(phone, 'เบอร์โทรศัพท์ไม่ถูกต้อง');
        valid = false;
    }
    // หลักสูตร (radio)
    const course = form.querySelector('input[name="course"]:checked');
    if (!course) {
        const courseDiv = form.querySelector('#selectCoure');
        showError(courseDiv, 'กรุณาเลือกหลักสูตร');
        valid = false;
    }
    // ภาค (radio)
    const sector = form.querySelector('input[name="sector"]:checked');
    if (!sector) {
        const courseDiv = form.querySelector('#selectCoure');
        showError(courseDiv, 'กรุณาเลือกภาค');
        valid = false;
    }
    // สาขาวิชาเดิม
    const major = form.querySelector('#major');
    if (!major.value.trim()) {
        showError(major, 'กรุณากรอกสาขาวิชาเดิม');
        valid = false;
    }
    // คณะเดิม
    const Fuculty = form.querySelector('#Fuculty');
    if (!Fuculty.value.trim()) {
        showError(Fuculty, 'กรุณากรอกคณะเดิม');
        valid = false;
    }
    // สาขาวิชาใหม่
    const newMajor = form.querySelector('#newMajor');
    if (!newMajor.value.trim()) {
        showError(newMajor, 'กรุณากรอกสาขาวิชาใหม่');
        valid = false;
    }
    // คณะใหม่
    const newFuculty = form.querySelector('#newFuculty');
    if (!newFuculty.value.trim()) {
        showError(newFuculty, 'กรุณากรอกคณะใหม่');
        valid = false;
    }
    // เหตุผลในการขอย้าย
    const reason = form.querySelector('textarea');
    if (!reason.value.trim()) {
        showError(reason, 'กรุณากรอกเหตุผลในการขอย้าย');
        valid = false;
    }
    // วันที่
    const dateMove = form.querySelector('#dateMove');
    if (!dateMove.value) {
        showError(dateMove, 'กรุณาเลือกวันที่');
        valid = false;
    }
    // แนบไฟล์
    const attachFiles = form.querySelector('#attachFiles');
    if (!attachFiles.value) {
        showError(attachFiles, 'กรุณาแนบไฟล์ใบรายงานผลศึกษา');
        valid = false;
    }
    // ลายเซ็น
    const signatureInput = form.querySelector('#signatureInput');
    const canvas = document.getElementById('signatureCanvas');
    if (canvas) {
        // ตรวจสอบว่ามีการวาดลายเซ็นหรือไม่ (pixel data)
        const blank = document.createElement('canvas');
        blank.width = canvas.width;
        blank.height = canvas.height;
        if (canvas.toDataURL() === blank.toDataURL()) {
            showError(canvas, 'กรุณาเซ็นชื่อ');
            valid = false;
        }
    }
    if (!valid) {
        e.preventDefault();
    }
});




/*----------showcode---------*/
const closeCodeBtn = document.getElementById('closeCodeBtn');
const showCodeBtn = document.getElementById('showCodeBtn');
const codeSnapshot = document.getElementById('codeSnapshot');
showCodeBtn.addEventListener('click', () => {
    codeSnapshot.style.display = 'block';
});


closeCodeBtn.addEventListener('click', () => {
codeSnapshot.style.display = 'none';
});



/* --------> signature setting <---------*/
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    // เริ่มวาด
    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.beginPath(); // ป้องกันเส้นลากต่อเนื่อง
    });
    canvas.addEventListener('mousemove', draw);

    // สำหรับ Touch บนมือถือ
    canvas.addEventListener('touchstart', () => drawing = true);
    canvas.addEventListener('touchend', () => {
        drawing = false;
        ctx.beginPath();
    });
    canvas.addEventListener('touchmove', draw);

    function draw(e) {
        if (!drawing) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // ล้างลายเซ็น
    document.getElementById('clearBtn').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    });


//  <!-- /* -------formProfesorAndStaff--------- */ -->

    /*------- option-list ------*/
const select = document.getElementById('option-list');
const listOption = document.querySelectorAll('.boxResponse');
const sigandsub = document.getElementById('signature2&button-form2')

select.addEventListener('change', function() {
    listOption.forEach(m => m.style.display = 'none');
    sigandsub.style.display = 'none'
    const SelectList = this.value;
    if (SelectList && SelectList !== 'default') {
        document.getElementById(SelectList).style.display = 'flex';
        sigandsub.style.display = 'flex'
    }
});



    const canvas2 = document.getElementById('signatureCanvas2');
    const ctx2 = canvas2.getContext('2d');
    let drawing2 = false;

    // เริ่มวาด
    canvas2.addEventListener('mousedown', () => drawing2 = true);
    canvas2.addEventListener('mouseup', () => {
        drawing2 = false;
        ctx2.beginPath(); // ป้องกันเส้นลากต่อเนื่อง
    });
    canvas2.addEventListener('mousemove', draw2);

    // สำหรับ Touch บนมือถือ
    canvas2.addEventListener('touchstart', () => drawing2 = true);
    canvas2.addEventListener('touchend', () => {
        drawing2 = false;
        ctx2.beginPath();
    });
    canvas2.addEventListener('touchmove', draw2);

    function draw2(e) {
        if (!drawing2) return;
        e.preventDefault();
        const rect = canvas2.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx2.lineWidth = 2;
        ctx2.lineCap = 'round';
        ctx2.strokeStyle = '#000';
        ctx2.lineTo(x, y);
        ctx2.stroke();
        ctx2.beginPath();
        ctx2.moveTo(x, y);
    }

    // ล้างลายเซ็น
    document.getElementById('clearBtn2').addEventListener('click', () => {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.beginPath();
    });













