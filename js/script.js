/* GLOBAL: canvas background particles + gentle gradient morph + typed name + cursor trail */

(() => {
  // Canvas setup
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Simple particles
  const particles = [];
  const PCOUNT = 80;
  for (let i=0;i<PCOUNT;i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random()*2 + 0.8,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4,
      hue:  Math.random()*360
    });
  }

  function animate(){
    if (!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // soft gradient overlay that gently morphs
    const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    g.addColorStop(0, 'rgba(255,107,107,0.06)');
    g.addColorStop(0.5, 'rgba(157,127,234,0.04)');
    g.addColorStop(1, 'rgba(48,227,202,0.04)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // draw particles
    for (let p of particles){
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${0.08 + Math.sin(Date.now()/2000 + p.x*0.001)*0.02})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x< -10) p.x = canvas.width + 10;
      if (p.x>canvas.width+10) p.x = -10;
      if (p.y< -10) p.y = canvas.height + 10;
      if (p.y>canvas.height+10) p.y = -10;
    }

    requestAnimationFrame(animate);
  }
  animate();

  // Typed name (simple)
  const typedEl = document.getElementById('typed-name');
  if (typedEl) {
    const name = "Mary Angel M";
    typedEl.textContent = "";
    let i = 0;
    function type() {
      if (i <= name.length) {
        typedEl.textContent = name.slice(0, i);
        i++;
        setTimeout(type, 70);
      }
    }
    setTimeout(type, 350);
  }

  // Custom cursor trail
  const cursor = document.createElement('div');
  cursor.style.position = 'fixed';
  cursor.style.width = '12px';
  cursor.style.height = '12px';
  cursor.style.borderRadius = '50%';
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = 9999;
  cursor.style.background = 'radial-gradient(circle,#fff, rgba(255,255,255,0.6))';
  cursor.style.boxShadow = '0 6px 18px rgba(157,127,234,0.18)';
  cursor.style.transform = 'translate(-50%,-50%)';
  cursor.style.mixBlendMode = 'screen';
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // small enhancement: close orb menu when navigating
  document.querySelectorAll('.orb-link').forEach(a => {
    a.addEventListener('click', () => {
      const checkbox = document.getElementById('menu-toggle');
      if (checkbox) checkbox.checked = false;
    });
  });

})();
// Future animations & interactions here ✨
console.log("Portfolio script loaded successfully.");
// Fade-in animation for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => observer.observe(item));
