(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== PRELOADER HIDE ON LOAD ===== */
  window.addEventListener('load', function(){
    const preloader = document.getElementById('preloader');
    if(preloader){
      setTimeout(()=>{
        preloader.classList.add('hide');
        // Mulai animasi hero setelah preloader hilang
        const heroPhoto = document.getElementById('heroPhoto');
        if(heroPhoto) heroPhoto.classList.add('in');
      }, 300);
    }
  });

  /* ===== REVEAL ON SCROLL ===== */
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* ===== NAV SCROLL ===== */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll',()=>{
    if(window.scrollY > 30) nav.classList.add('scrolled'); 
    else nav.classList.remove('scrolled');
  },{passive:true});

  /* ===== MOBILE MENU ===== */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click',()=>{
    burger.classList.toggle('open');
    navLinks.classList.toggle('mobile');
  });
  navLinks.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      burger.classList.remove('open');
      navLinks.classList.remove('mobile');
    });
  });

  /* ===== QUICK WHATSAPP LINK ===== */
  const waLink = document.getElementById('waQuickLink');
  const waRadio = document.querySelectorAll('input[name="quicktart"]');
  
  function updateWaLink() {
    let selectedTart = "Kue Tart Turen";
    waRadio.forEach(r => {
      if (r.checked) selectedTart = r.value;
    });
    const msg = `Halo Kue Tart Turen, saya tertarik memesan tart *${selectedTart}*. Bisa dibantu untuk proses pemesanannya?`;
    waLink.href = 'https://wa.me/6281234567890?text=' + encodeURIComponent(msg);
  }
  if(waLink) {
    updateWaLink();
    waRadio.forEach(r => r.addEventListener('change', updateWaLink));
  }

  /* ===== OPTIMIZED HERO PARALLAX (RAF) ===== */
  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    const heroPhoto = document.getElementById('heroPhoto');
    let ticking = false;
    
    if(heroPhoto){
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const y = window.scrollY;
            if(y < window.innerHeight){
              heroPhoto.style.transform = `scale(1) translateY(${y*0.15}px)`;
              heroPhoto.style.opacity = Math.max(0, 1 - y/(window.innerHeight*0.9));
            }
            ticking = false;
          });
          ticking = true;
        }
      }, {passive:true});
    }
  }
})();