
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // ตัวอย่างตรวจสอบ
    if (email === "csmjuShop123456@csmju.ac.th" && password === "123456") {
      window.location.href = "home-admin.html"; // ไปยังหน้าใหม่
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  });
});
 