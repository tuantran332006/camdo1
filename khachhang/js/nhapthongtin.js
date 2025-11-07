       const observer = new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    })
  },{threshold:.2});

  document.querySelectorAll('.reveal-section').forEach(el=>{
    observer.observe(el);
  });
        document.getElementById('input').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn việc gửi form và tải lại trang

    // Lấy giá trị từ các trường input
    const name = document.getElementById('name').value;
    const money = document.getElementById('money').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const goivay = document.getElementById('goivay').value;
    const taisan = document.getElementById('taisan').value;
    const loi=document.querySelector('#input');
    const loi1=document.querySelector('.loi');

     if (!name || !money || !phonenumber || goivay === "null" || taisan === "NULL") {
               loi.style.height='450px';
    loi.style.boxShadow='0 0 8px 8px rgba(255, 7, 77, 0.303)';
    loi1.style.display='flex';
    
    loi1.style.animation="none";
    loi.style.animation='none';
    loi.offsetHeight;
    loi1.offsetHeight;
    loi1.style.animation="to 2s";
    loi.style.animation='rung 1.5s';
            }

    // Tạo đối tượng lưu thông tin
    
    else{
        loi1.style.display='none';
        const formData = {
        name: name,
        money: money,
        phonenumber: phonenumber,
        goivay: goivay,
        taisan: taisan,
    };
    this.reset();
    const loi=document.querySelector('#input');
               loi.style.boxShadow='0 0 8px 8px rgba(50, 211, 252, 0.564)';
                const e=document.querySelector('.thongbao');
        const i=document.getElementById('input');
        e.style.opacity='1';
        i.style.opacity='0';
        i.style.zIndex='-1';
}
});
    function khachhang(){
        window.location.href = "khachhang.html";
    }
    function nhapthem(){
        const e=document.querySelector('.thongbao');
        const i=document.getElementById('input');
        const loi=document.querySelector('.loi');
               loi.style.display='none';
        e.style.opacity='0';
        i.style.opacity='1';
        i.style.zIndex='10';
    }