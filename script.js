const toggle=document.querySelector('.nav-toggle');
const links=document.querySelector('.nav-links');
if(toggle){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false');toggle.setAttribute('aria-label',open?'Close menu':'Open menu')})}
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>links.classList.remove('open')));
const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',(e)=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
document.getElementById('year').textContent=new Date().getFullYear();

// Premium motion: count-up metrics once they enter the viewport.
const counters=document.querySelectorAll('.count');
const countObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target, target=Number(el.dataset.target||0), suffix=el.dataset.suffix||'';
  let start=0; const duration=1100; const started=performance.now();
  const tick=(now)=>{
    const progress=Math.min((now-started)/duration,1);
    const eased=1-Math.pow(1-progress,3);
    el.textContent=Math.round(target*eased)+suffix;
    if(progress<1)requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick); countObserver.unobserve(el);
})},{threshold:.7});
counters.forEach(c=>countObserver.observe(c));

// Gentle pointer parallax on the hero card.
const heroCard=document.querySelector('.hero-card');
window.addEventListener('pointermove',(e)=>{
  if(!heroCard || window.matchMedia('(max-width: 720px)').matches) return;
  const x=(e.clientX/window.innerWidth-.5), y=(e.clientY/window.innerHeight-.5);
  heroCard.style.transform=`perspective(1200px) rotateY(${x*5-5}deg) rotateX(${y*-4+2}deg) translateY(-3px)`;
});
heroCard?.addEventListener('pointerleave',()=>{heroCard.style.transform=''});
const form=document.getElementById('contactForm');
form.addEventListener('submit',(e)=>{e.preventDefault();const fd=new FormData(form);const subject=encodeURIComponent('Website enquiry for Hassan Shabbir');const body=encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`);window.location.href=`mailto:engr.hassanshabbir@outlook.com?subject=${subject}&body=${body}`});
