const form = document.getElementById('eventBookingForm');
const ticket_type = document.getElementById('ticket_type');
const quantity = document.getElementById('quantity');

// Modal
const modal = document.getElementById('confirmModal');
const modalTicket = document.getElementById('modalTicket');
const modalQuantity = document.getElementById('modalQuantity');
const closeModal = document.getElementById('closeModal');
const errorQuantity = document.getElementById('errorQuantity');

// ปรับจำนวนตั๋วตามประเภท
// ticket_type.addEventListener('change', function() {
//     if (ticket_type.value === 'vip' || ticket_type.value === 'Premium') {
//         quantity.min = 1;
//         quantity.max = 2;
            
//     } else {
//         quantity.min = 1;
//         quantity.max = 5;
//     }
// });

form.addEventListener('submit', function(e) {
    e.preventDefault(); // ป้องกันการส่งฟอร์มจริง

    const nameInput = document.getElementById('name');
    const errorname = document.getElementById('errorName');
    const patternName = /^[A-Za-z\u0E00-\u0E7F]+(?:\s+[A-Za-z\u0E00-\u0E7F]+)+$/;
    const cleanedName = nameInput.value.trim().replace(/\s+/g, ' ');

    const phone = document.getElementById('Phone');
    const errorphone = document.getElementById('errorPhone');
    const phonePattern = /^0\d{9}$/;

    // รีเซ็ตข้อความ error
    errorname.textContent = '';
    errorphone.textContent = '';
    errorQuantity.textContent = '';

    let isValid = true;

    if (ticket_type.value === 'vip' || ticket_type.value === 'Premium'){
        quantity.min = 1;
        quantity.max = 2;
        if (quantity.value > 2) {
            errorQuantity.textContent = 'กรุณาเลือกจำนวนตั๋วได้ไม่เกิน 2 สำหรับประเภท VIP หรือ Premium';
            isValid = false;
    }}else {
        quantity.min = 1;
        quantity.max = 5;
        if (quantity.value > 5) {
            errorQuantity.textContent = 'กรุณาเลือกจำนวนตั๋วได้ไม่เกิน 5 สำหรับประเภทปกติ';
            isValid = false;
        }}
    if (!patternName.test(cleanedName)) {
        errorname.textContent = 'กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 คำขึ้นไป และชื่อนามสกุลคั่นด้วยช่องว่าง';
        isValid = false;
    }

    if (!phonePattern.test(phone.value)) {
        errorphone.textContent = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก) และขึ้นต้นด้วย 0';
        isValid = false;
    }

    // ถ้าข้อมูลถูกต้องทั้งหมด
    if (isValid) {
        modalTicket.textContent = ticket_type.value;
        modalQuantity.textContent = quantity.value;
        modal.style.display = 'block';
        modalTicket.style.color = 'blue';
        modalQuantity.style.color = 'blue';
        
    } 
});


// ปิด Modal และรีเซ็ตฟอร์ม
closeModal.addEventListener('click', () => {
    
    modal.style.display = 'none';
    form.reset();
});
