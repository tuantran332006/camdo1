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
    const icon=document.querySelectorAll(".k");
    const background=document.querySelectorAll('.x');
    if(icon.length > 0 && icon[0].innerHTML === '<i class="fa-solid fa-moon"></i>'){
        icon.forEach(sun=>{
            sun.innerHTML='<i class="fa-solid fa-sun"></i>';
        });
        background.forEach(bg=>{
            bg.style.backgroundColor="rgba(12, 12, 12, 0.5)";
            bg.style.color="white";
        });
    }
    else{
        icon.forEach(sun=>{
            sun.innerHTML='<i class="fa-solid fa-moon"></i>';
        });
        background.forEach(bg=>{
            bg.style.backgroundColor="rgba(204, 204, 204, 0.422)";
            bg.style.color=" rgb(63, 63, 63)"; 
        });
    }
} 
   function nhapthongtin(){
     window.location.href = "nhapthongtin.html";
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