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
function light(){
    const icon=document.querySelector(".k");
    const backgroundHeader=document.querySelector(".lon");
    const backgroundMenu=document.querySelector(".be");
    if(icon.innerHTML=='<i class="fa-solid fa-moon"></i>'){
        icon.innerHTML='<i class="fa-solid fa-sun"></i>';
        backgroundHeader.style.backgroundColor = "rgba(12, 12, 12, 0.336)";
        backgroundMenu.style.backgroundColor = "rgba(12, 12, 12, 0.336)";
    }
    else{
         icon.innerHTML='<i class="fa-solid fa-moon"></i>';
        backgroundHeader.style.backgroundColor = "rgba(170, 170, 170, 0.422)";
        backgroundMenu.style.backgroundColor = "rgba(170, 170, 170, 0.422)";
    }
}  
         function showmenu(){
            const container = document.querySelector('.container');
            const lon = document.querySelector('.lon');
            container.style.display='flex';
            lon.style.display='none';
        }
        function menu(){
            const  be=document.querySelector('.container');
            const lon = document.querySelector('.lon');
            be.style.display='none';
            lon.style.display='flex';
        }
        document.querySelector('.input').addEventListener('submit',function(e){
        e.preventDefault();
        const name=document.querySelector('.name').value;
        const pass=document.querySelector('.pass').value;
        const items=document.querySelectorAll('.x');
        if(pass=='lamdeptrai123'&&name=='leduylam'){
             window.location.href = "quanly.html";
        }
        else{
            const thongbao=document.querySelector('.thongbao');
            thongbao.style.display='block';
            items.forEach(el => {
    el.classList.add("loi"); // bật/tắt class highlight cho từng thẻ
  });
            this.reset();

        }


        });