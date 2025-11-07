
let workers = [];
let customers = [];
function moluachon(){
  const meniu=document.querySelector('.xnxx');
  meniu.style.display="block";
  meniu.style.opacity='1';

}
function dongluachon(){
  const meniu=document.querySelector('.xnxx');
 
     meniu.style.opacity='0';  
    meniu.style.display="none";
}
// Hàm tải dữ liệu 1 lần duy nhất
async function loadData() {
  try {
    const resWorkers = await fetch('../json/worker.json');
    const resCustomers = await fetch('../json/customers.json');

    if (!resWorkers.ok || !resCustomers.ok) {
      throw new Error("Không thể tải dữ liệu JSON");
    }

    workers = await resWorkers.json();
    customers = await resCustomers.json();
    console.log("✅ Dữ liệu đã tải xong:", { workers, customers });
  } catch (err) {
    console.error("Lỗi khi tải dữ liệu:", err);
  }
}

// Hàm hiển thị khách hàng
function loadCustomers() {
  const thead = document.querySelector("thead");
  const tbody = document.querySelector("tbody");
  const chucnang = document.querySelector(".chucnang");

  // Thanh công cụ sắp xếp
  chucnang.innerHTML = `
     <button onclick="showAddForm()">➕ Thêm khách hàng</button>
    <button onclick="sortCustomersByPriceDesc()">Giá ↓</button>
    <button onclick="sortCustomersByPriceAsc()">Giá ↑</button>
    <button onclick="sortCustomersByIdAsc()">ID ↑</button>
    <button onclick="sortCustomersByIdDesc()">ID ↓</button>
  `;

  // Tiêu đề bảng
  thead.innerHTML = `
    <tr>
      <th style="width:50px;">ID</th>
      <th style="width:120px;">Chức năng</th>
      <th style="width:180px;">Họ tên</th>
      <th style="width:120px;">SĐT</th>
      <th style="width:200px;">Sản phẩm</th>
      <th style="width:160px;">Danh mục</th>
      <th style="width:120px;">Giá (₫)</th>
      <th style="width:140px;">Ngày nhận</th>
      <th style="width:140px;">Ngày thanh toán</th>
      <th style="width:100px;">Lãi suất (%)</th>
      <th style="width:140px;">Tổng giá trị (₫)</th>
    </tr>
  `;

  // Tạo nội dung từng hàng
  const rows = customers.map(item => `
    <tr>
      <td>${item.id}</td>
      <td>
        <button class="edit" onclick="editCustomer(${item.id})">✏️ Sửa</button>
        <button class="delete" onclick="deleteCustomer(${item.id})">🗑️ Xóa</button>
      </td>
      <td>${item.hoten}</td>
      <td>${item.sdt}</td>
      <td>${item.sanpham}</td>
      <td>${item.danhmuc}</td>
      <td>${item.gia.toLocaleString()}₫</td>
      <td>${item.ngaynhan}</td>
      <td>${item.ngaythanhtoan}</td>
      <td>${item.laixuat}%</td>
      <td>${item.tonggiatri.toLocaleString()}₫</td>
    </tr>
  `).join("");

  tbody.innerHTML = rows;
}


// Hàm hiển thị nhân viên
function loadWorker() {
  const thead = document.querySelector("thead");
  const tbody = document.querySelector("tbody");
  const chucnang = document.querySelector(".chucnang");

  // 🧭 Thanh công cụ cho nhân viên
  chucnang.innerHTML = `
    <button onclick="showAddWorkerForm()">➕ Thêm nhân viên</button>
    <button onclick="sortWorkerByIdAsc()">ID ↑</button>
    <button onclick="sortWorkerByIdDesc()">ID ↓</button>
    <button onclick="sortWorkerByLuongAsc()">Lương ↑</button>
    <button onclick="sortWorkerByLuongDesc()">Lương ↓</button>
    <button onclick="filterDiemDanh()">✅ Có mặt</button>
    <button onclick="loadWorker()">🔄 Tải lại</button>
  `;

  // 🧾 Tiêu đề bảng
  thead.innerHTML = `
    <tr>
      <th style="width:50px;">ID</th>
      <th style="width:120px;">Chức năng</th>
      <th style="width:180px;">Tên</th>
      <th style="width:80px;">Tuổi</th>
      <th style="width:140px;">Chức vụ</th>
      <th style="width:120px;">Điểm danh</th>
      <th style="width:140px;">Lương / giờ</th>
    </tr>
  `;

  // 🧍‍♂️ Hàng dữ liệu
  const rows = workers.map(item => `
    <tr>
      <td>${item.id}</td>
      <td>
        <button class="edit" onclick="editWorker(${item.id})">✏️ Sửa</button>
        <button class="delete" onclick="deleteWorker(${item.id})">🗑️ Xóa</button>
      </td>
      <td>${item.ten}</td>
      <td>${item.tuoi}</td>
      <td>${item.chuc}</td>
      <td>
        <input type="checkbox" ${item.diemdanh ? "checked" : ""} onchange="toggleDiemDanh(${item.id}, this.checked)">
      </td>
      <td>${item.luongtheoh.toLocaleString()} VND</td>
    </tr>
  `).join("");

  tbody.innerHTML = rows;
}

function sortCustomersByPriceDesc() {
  // Sắp xếp mảng customers theo giá giảm dần
  customers.sort((a, b) => b.gia - a.gia);
  
  // Sau khi sắp xếp xong thì gọi lại hàm hiển thị
  loadCustomers();
}
function sortCustomersByPriceAsc() {
  customers.sort((a, b) => a.gia - b.gia);
  loadCustomers();
}
function sortCustomersByIdAsc() {
  customers.sort((a, b) => a.id - b.id);
  loadCustomers();
}
function deleteCustomer(id) {
  // Hỏi xác nhận trước khi xóa
  if (!confirm("Bạn có chắc muốn xóa khách hàng này không?")) return;

  // Tìm vị trí phần tử có id tương ứng
  const index = customers.findIndex(c => c.id === id);

  if (index !== -1) {
    customers.splice(index, 1); // Xóa khỏi mảng
    loadCustomers();            // Cập nhật lại bảng
  } else {
    alert("Không tìm thấy khách hàng cần xóa!");
  }
}
let currentEditId = null; // lưu ID khách hàng đang sửa

function editCustomer(id) {
  const customer = customers.find(c => c.id === id);
  if (!customer) return alert("Không tìm thấy khách hàng!");

  currentEditId = id;

  // Gán dữ liệu vào form
  document.getElementById("edit-id").value = customer.id;
  document.getElementById("edit-hoten").value = customer.hoten;
  document.getElementById("edit-sdt").value = customer.sdt;
  document.getElementById("edit-sanpham").value = customer.sanpham;
  document.getElementById("edit-danhmuc").value = customer.danhmuc;
  document.getElementById("edit-gia").value = customer.gia;
  document.getElementById("edit-ngaynhan").value = customer.ngaynhan;
  document.getElementById("edit-ngaythanhtoan").value = customer.ngaythanhtoan;
  document.getElementById("edit-laixuat").value = customer.laixuat;
  document.getElementById("edit-tonggiatri").value = customer.tonggiatri;

  document.getElementById("editForm").style.display = "flex";
}

function closeEditForm() {
  document.getElementById("editForm").style.display = "none";
  currentEditId = null;
}

function saveEdit() {
  const customer = customers.find(c => c.id === currentEditId);
  if (!customer) return alert("Không tìm thấy khách hàng!");

  // Lấy giá trị mới từ form
  customer.hoten = document.getElementById("edit-hoten").value;
  customer.sdt = document.getElementById("edit-sdt").value;
  customer.sanpham = document.getElementById("edit-sanpham").value;
  customer.danhmuc = document.getElementById("edit-danhmuc").value;
  customer.gia = Number(document.getElementById("edit-gia").value);
  customer.ngaynhan = document.getElementById("edit-ngaynhan").value;
  customer.ngaythanhtoan = document.getElementById("edit-ngaythanhtoan").value;
  customer.laixuat = Number(document.getElementById("edit-laixuat").value);

  // Tính lại tổng giá trị = giá + (giá * lãi suất / 100)
  customer.tonggiatri = Math.round(customer.gia * (1 + customer.laixuat / 100));

  closeEditForm();
  loadCustomers(); // Cập nhật lại bảng
}
function showAddForm() {
  const form = document.getElementById("addForm");
  form.style.display = "flex";
  form.classList.add("show");
}

function hideAddForm() {
  const form = document.getElementById("addForm");
  form.classList.remove("show");
  setTimeout(() => (form.style.display = "none"), 200);
}

//  XỬ LÝ THÊM KHÁCH HÀNG
function addCustomer() {
  const hoten = document.getElementById("add_hoten").value.trim();
  const sdt = document.getElementById("add_sdt").value.trim();
  const sanpham = document.getElementById("add_sanpham").value.trim();
  const danhmuc = document.getElementById("add_danhmuc").value.trim();
  const gia = Number(document.getElementById("add_gia").value);
  const ngaynhan = document.getElementById("add_ngaynhan").value;
  const ngaythanhtoan = document.getElementById("add_ngaythanhtoan").value;
  const laixuat = Number(document.getElementById("add_laixuat").value);

  if (!hoten || !sdt || !sanpham || !gia || !ngaynhan || !ngaythanhtoan) {
    alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const tonggiatri = Math.round(gia * (1 + laixuat / 100));
  const newId = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;

  const newCustomer = {
    id: newId,
    hoten, sdt, sanpham, danhmuc,
    gia, ngaynhan, ngaythanhtoan,
    laixuat, tonggiatri
  };

  customers.push(newCustomer);
  loadCustomers();
  hideAddForm();

  // Reset input
  document.querySelectorAll("#addForm input").forEach(i => i.value = "");
}
function sortWorkerByIdAsc() {
  workers.sort((a, b) => a.id - b.id);
  loadWorker();
}

function sortWorkerByIdDesc() {
  workers.sort((a, b) => b.id - a.id);
  loadWorker();
}

function sortWorkerByLuongAsc() {
  workers.sort((a, b) => a.luongtheoh - b.luongtheoh);
  loadWorker();
}

function sortWorkerByLuongDesc() {
  workers.sort((a, b) => b.luongtheoh - a.luongtheoh);
  loadWorker();
}

function filterDiemDanh() {
  const thead = document.querySelector("thead");
  const tbody = document.querySelector("tbody");
  const coMat = workers.filter(w => w.diemdanh);
  const rows = coMat.map(item => `
    <tr>
      <td>${item.id}</td>
      <td>
        <button class="edit" onclick="editWorker(${item.id})">✏️ Sửa</button>
        <button class="delete" onclick="deleteWorker(${item.id})">🗑️ Xóa</button>
      </td>
      <td>${item.ten}</td>
      <td>${item.tuoi}</td>
      <td>${item.chuc}</td>
      <td><input type="checkbox" checked onchange="toggleDiemDanh(${item.id}, this.checked)"></td>
      <td>${item.luongtheoh.toLocaleString()} VND</td>
    </tr>
  `).join("");

  tbody.innerHTML = rows;
}

function loadDoanhthu() {
  const thead = document.querySelector("thead");
  const tbody = document.querySelector("tbody");
  const chucnang = document.querySelector(".chucnang");

  // 🧹 Xóa thanh công cụ
  chucnang.innerHTML = "";

  // 🗓️ Tiêu đề bảng
  thead.innerHTML = `
    <tr>
      <th style="width:200px;">Tháng</th>
      <th style="width:200px;">Tổng doanh thu (₫)</th>
    </tr>
  `;

  // 🧮 Lấy năm hiện tại
  const namHienTai = new Date().getFullYear();

  // 🔢 Tính doanh thu theo tháng (chỉ trong năm hiện tại)
  const doanhthuTheoThang = {};

  customers.forEach(c => {
    const ngayThanhToan = new Date(c.ngaythanhtoan);

    // Bỏ qua nếu không có ngày thanh toán hợp lệ
    if (isNaN(ngayThanhToan)) return;

    const thang = ngayThanhToan.getMonth() + 1;
    const nam = ngayThanhToan.getFullYear();

    // So sánh với năm hiện tại
    if (nam === namHienTai) {
      if (!doanhthuTheoThang[thang]) {
        doanhthuTheoThang[thang] = 0;
      }
      doanhthuTheoThang[thang] += c.tonggiatri;
    }
  });

  // 🧾 Nếu không có dữ liệu năm hiện tại
  if (Object.keys(doanhthuTheoThang).length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="2" style="text-align:center;">Không có dữ liệu doanh thu năm ${namHienTai}</td></tr>
    `;
    return;
  }

  // 🖋️ Tạo các hàng hiển thị
  const rows = Object.entries(doanhthuTheoThang)
    .sort((a, b) => a[0] - b[0]) // Sắp xếp theo tháng tăng dần
    .map(([thang, tong]) => `
      <tr>
        <td>Tháng ${thang}/${namHienTai}</td>
        <td>${tong.toLocaleString()}₫</td>
      </tr>
    `)
    .join("");

  tbody.innerHTML = rows;
}

// Gọi tải dữ liệu 1 lần khi trang load
window.addEventListener("DOMContentLoaded", loadData);
