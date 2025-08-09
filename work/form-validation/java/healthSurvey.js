

const closeCodeBtn = document.getElementById('closeCodeBtn');
const showCodeBtn = document.getElementById('showCodeBtn');
const codeSnapshot = document.getElementById('codeSnapshot');
showCodeBtn.addEventListener('click', () => {
    codeSnapshot.style.display = 'block';
});


closeCodeBtn.addEventListener('click', () => {
codeSnapshot.style.display = 'none';
});

      
const form = document.getElementById('healthSurveyForm');

//เงื่อนไข
// 1.age ต้องอยู่ระหว่าง 15 ถึง 60 ปี
const ageInput = document.getElementById('age');
const errorAge = document.getElementById('errorAge');

ageInput.addEventListener('input', () => {
    const age = parseInt(ageInput.value, 10);
    if (isNaN(age) || age < 15 || age > 60) {
        errorAge.textContent = 'กรุณากรอกอายุที่ถูกต้อง (15-60 ปี)';
        ageInput.classList.add('error');
    } else {
        errorAge.textContent = '';
        ageInput.classList.remove('error');
    }
});

// 2.น้ำหนัก และส่วนสูง ต้องเป็นตัวเลข
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const errorWeight = document.getElementById('errorWeight');
const errorHeight = document.getElementById('errorHeight');

weightInput.addEventListener('input', () => {
    const weight = parseFloat(weightInput.value);
    if (isNaN(weight) || weight <= 0) {
        errorWeight.textContent = 'กรุณากรอกน้ำหนักที่ถูกต้อง';
        weightInput.classList.add('error');
    } else {
        errorWeight.textContent = '';
        weightInput.classList.remove('error');
    }
});

heightInput.addEventListener('input', () => {
    const height = parseFloat(heightInput.value);
    if (isNaN(height) || height <= 0) {
        errorHeight.textContent = 'กรุณากรอกส่วนสูงที่ถูกต้อง';
        heightInput.classList.add('error');
    } else {
        errorHeight.textContent = '';
        heightInput.classList.remove('error');
    }
});

// 3.โรคประจำตัว ถ้าเลือก มี ให้แสดง textarea ระบุรายละเอียด
const diseaseSelectYes = document.getElementById('yes');
const diseaseSelectNo = document.getElementById('no');
const diseaseDetails = document.getElementById('disease-details-container'); 


diseaseSelectYes.addEventListener('change', () => {
    if (diseaseSelectYes.checked) {
        diseaseDetails.style.display = 'flex';
        diseaseSelectNo.checked = false; 
    } else {
        diseaseDetails.style.display = 'none';
        diseaseDetails.value = '';
    }
});
diseaseSelectNo.addEventListener('change', () => {
    if (diseaseSelectNo.checked) {
        diseaseDetails.style.display = 'none';
        diseaseDetails.value = '';
        diseaseSelectYes.checked = false; 
    }
});

// การประมวลผล
// คำนวนค่า BMI = น้ำหนัก (กิโลกรัม) / (ส่วนสูง (เมตร)^2)

const calculateBMI = (weightInput, heightInput) => {
    if (heightInput <= 0) return 0;
    return (weightInput / ((heightInput / 100) ** 2)).toFixed(2);
}


// แสดงผลลัพธ์ใน modal พร้อมกับหมวดหมู่ของ น้ำหนักน้อย, ปกติ, น้ำหนักเกิน, อ้วน

const bmiModal = document.getElementById('BmiModalContainer');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const closeBmiModal = document.getElementById('closeBmiModal');

closeBmiModal.addEventListener('click', () => {
    bmiModal.style.display = 'none';
    bmiValue.textContent = '';
    form.reset();
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (!ageInput.value.trim()) {
        errorAge.textContent = 'กรุณากรอกอายุ';
        ageInput.classList.add('error');
        isValid = false;
    }

    if (!weightInput.value.trim()) {
        errorWeight.textContent = 'กรุณากรอกน้ำหนัก';
        weightInput.classList.add('error');
        isValid = false;
    }

    if (!heightInput.value.trim()) {
        errorHeight.textContent = 'กรุณากรอกส่วนสูง';
        heightInput.classList.add('error');
        isValid = false;
    }

    const errorConitalDisesase = document.getElementById('errorConnitalDisesase');

        if (!diseaseSelectYes.checked && !diseaseSelectNo.checked) {
            errorConitalDisesase.textContent = 'กรุณาเลือกสถานะโรคประจำตัว';
            errorConitalDisesase.classList.add('error');
            isValid = false;
        } else {
            errorConitalDisesase.textContent = '';
            errorConitalDisesase.classList.remove('error');  
        }

        const errorDisesase = document.getElementById('errorDisease');

        if (diseaseSelectYes.checked && !diseaseDetails.value.trim()) {
            errorDisesase.textContent = 'กรุณากรอกรายละเอียดโรคประจำตัว';
            diseaseDetails.classList.add('error');
            isValid = false;
        }

    if (!isValid) {
        return;
    }   

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    if (!isNaN(weight) && weight > 0 && !isNaN(height) && height > 0) {
        const bmi = parseFloat(calculateBMI(weight, height));
        let category = '';
        if (bmi < 18.5) {
            category = 'น้ำหนักน้อย';
        } else if (bmi < 24.9) {
            category = 'ปกติ';
        } else if (bmi < 29.9) {
            category = 'น้ำหนักเกิน';
        } else {
            category = 'อ้วน';
        }
        bmiValue.textContent = `BMI ของคุณ: ${bmi}`;
        bmiCategory.textContent = `หมวดหมู่: ${category}`;
        bmiModal.style.display = 'flex';
    }
});





