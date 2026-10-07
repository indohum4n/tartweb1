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

    /* ===== MODAL POPUP IMAGE ===== */
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  // Buat semua tile bisa diklik
  document.querySelectorAll('.tile').forEach(tile => {
    tile.style.cursor = 'pointer';
    tile.addEventListener('click', function() {
      const thumbImg = this.querySelector('img');
      if(!thumbImg) return;
      
      // Ambil nama file dari src thumbnail (misal: tartguyur.webp -> tartguyur)
      const fileName = thumbImg.src.split('/').pop().split('.')[0];
      
      // Buat path gambar real di folder asset/real
      const realSrc = `asset/real/${fileName}.jpeg`;
      
            const title = this.querySelector('h2') ? this.querySelector('h2').innerText : '';
      const desc = this.querySelector('.desc') ? this.querySelector('.desc').innerText : '';
      const badge = this.querySelector('.tile-badge');
      
      // Cek apakah kartu memiliki badge
      let badgeHtml = '';
      if(badge) {
        badgeHtml = `<span class="modal-badge">${badge.innerText}</span>`;
      }
      
      modalImg.src = realSrc;
      modalCaption.innerHTML = `${badgeHtml}<h4>${title}</h4><p>${desc}</p>`;
      
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // cegah scroll background
    });
  });

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // Kosongkan src setelah modal tutup agar tidak membebani memori
    setTimeout(() => { modalImg.src = ''; }, 400);
  }

  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', function(e) {
    if(e.target === modal) closeModal();
  });
  // Tutup modal dengan tombol ESC di keyboard
  document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });

})();