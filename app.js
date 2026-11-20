(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  let lang = 'th';

  // data from MoonRacle/Resume/content/*.json
  const jobs = {
    shortgun: { company: 'Shortgun Studio', title: 'Motion Graphic Designer',
      hl: { th: ['ดูแล Motion & Graphics สำหรับ Event ระดับประเทศ และ Roadshow ทั่วไทย', 'Key Clients: Samsung, Lexus, PTT, Nok Air, Amway'],
            en: ['Motion & Graphics for national-scale events and nationwide roadshows', 'Key Clients: Samsung, Lexus, PTT, Nok Air, Amway'] } },
    clickMotion: { company: 'Click Motion Co., Ltd.', title: 'Motion Graphic Designer',
      hl: { th: ["ผลิต Motion & 3D Animation สำหรับแคมเปญทีวีระดับประเทศ รวมถึงโครงการ 'ชิมช้อปใช้'", "รีดีไซน์มาสคอต 'แม่มณี' และทำ VFX Post-production ให้ SCB, Krungsri"],
            en: ["Motion & 3D Animation for national TV campaigns incl. the 'Chim-Shop-Chai' project", "Redesigned SCB's 'Mae Manee' mascot; VFX post-production for leading banks"] } },
    goExtra: { company: 'Go The Extra Mile', title: 'Senior Motion Graphic Designer',
      hl: { th: ['ผลิต Motion Graphics & CGI Ads สำหรับโฆษณาออนไลน์พรีเมียมหลายแพลตฟอร์ม', 'Key Clients: Burger King, The Pizza Company, STAEDTLER, Hunter Poke'],
            en: ['Premium Motion Graphics & CGI Ads across multiple digital platforms', 'Key Clients: Burger King, The Pizza Company, STAEDTLER, Hunter Poke'] } },
    aiContent: { company: 'Nina.digital', title: 'AI Content Director',
      hl: { th: ['ดูแล AI Storytelling Pipeline ตั้งแต่เขียนบท ออกแบบตัวละคร จนถึงตัดต่อ', 'วาง Creative Pipeline ที่ผสม Generative AI เข้ากับ Motion Graphics แบบ Repeatable'],
            en: ['Full AI Storytelling pipeline: scriptwriting → character design → editing', 'Repeatable Creative Pipeline integrating Generative AI with Motion Graphics'] } }
  };
  const periods = {
    shortgun: { th: '2012–2014', en: '2012–2014' }, clickMotion: { th: '2020–2022', en: '2020–2022' },
    goExtra: { th: '2022–ปัจจุบัน', en: '2022–Present' }, aiContent: { th: '2024–ปัจจุบัน', en: '2024–Present' }
  };
  const years = [
    { y: 2012, job: 'shortgun', id: '9YHs1BGWX0k', img: 'y2012' },
    { y: 2019, job: 'clickMotion', id: '-_rIPxQRnmc', img: 'y2019' },
    { y: 2020, job: 'clickMotion', id: 'BJ4l98I5zQs', img: 'y2020' },
    { y: 2021, job: 'clickMotion', id: 'c2H-W1FBsFQ', img: 'y2021' },
    { y: 2022, job: 'clickMotion', id: 'skfflbyNozU', img: 'y2022' },
    { y: 2023, job: 'goExtra', id: 'j2tRb8hwxfY', img: 'y2023' },
    { y: 2024, job: 'goExtra', id: 'g7G_Xs4PSZY', img: 'y2024' },
    { y: 'Ads', job: 'goExtra', id: 'nIN4jYTmnX4', img: 'ads' }
  ];
  const nina = ['6zEKp91ekSY', 'rFx4x0Z41fc', '6eAyf0U0hfc', 'GeHs-y_fxvA', 'lc5gzT-Esnk', 'ya6AX-ji_10', 'l74Gm_b1q9o', 'YefqWsd-Mqc', 'v4NJCMqW5Tk', 'oYIg8Gnp-uE', 'BfOuoNniM8g', 'j8abDGUQDKg', 'EGg8eWWrd6I'];
  const brandCount = 44;

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-th]').forEach(e => { e.textContent = e.dataset[lang]; });
    $('#lang').textContent = lang === 'th' ? 'EN' : 'TH';
    renderTimeline(); renderStage(true);
  }
  $('#lang').addEventListener('click', () => { lang = lang === 'th' ? 'en' : 'th'; applyLang(); observe(); });

  (function split() {
    const h = $('#heroName'); let i = 0;
    h.innerHTML = h.innerHTML.split('<br>').map(p => `<span class="wrap">${[...p].map(c => `<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`).join('<br>');
  })();

  let cur = years.length - 2;
  const yearsEl = $('#years'), stage = $('#stage'), media = $('#stageMedia');
  years.forEach((d, i) => {
    const b = document.createElement('button');
    b.role = 'tab'; b.textContent = d.y;
    b.addEventListener('click', () => { cur = i; renderStage(); });
    yearsEl.append(b);
  });
  function renderStage(instant) {
    const d = years[cur], j = jobs[d.job];
    $$('button', yearsEl).forEach((b, i) => b.setAttribute('aria-selected', i === cur));
    const fill = () => {
      $('#stageImg').src = `assets/reels/${d.img}.jpg`;
      $('#stageImg').alt = `Showreel ${d.y}`;
      $('#stageYear').textContent = d.y;
      $('#stageCompany').textContent = j.company;
      $('#stageRole').textContent = `${j.title} · ${periods[d.job][lang]}`;
      $('#stageList').innerHTML = j.hl[lang].map(t => `<li>${t}</li>`).join('');
      stage.classList.remove('swap'); media.classList.remove('swap');
    };
    if (instant) return fill();
    stage.classList.add('swap'); media.classList.add('swap');
    setTimeout(fill, 320);
  }
  media.addEventListener('click', () => openVideo(years[cur].id, false));

  function renderTimeline() {
    $('#timeline').innerHTML = '<div class="timeline__fill" id="tfill"></div>' + ['aiContent', 'goExtra', 'clickMotion', 'shortgun'].map(k => {
      const j = jobs[k];
      return `<div class="job reveal"><span class="job__period">${periods[k][lang]}</span><h3>${j.company}</h3><p class="job__title">${j.title}</p><ul>${j.hl[lang].map(t => `<li>${t}</li>`).join('')}</ul></div>`;
    }).join('');
  }

  $('#shorts').innerHTML = nina.map((id, i) =>
    `<button class="short reveal" style="--d:${i * 0.04}s" data-id="${id}" aria-label="Nina short ${i + 1}"><img src="assets/reels/n_${id}.jpg" alt="" loading="lazy"><span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><b>#${String(i + 1).padStart(2, '0')}</b></button>`).join('');
  $('#shorts').addEventListener('click', e => { const s = e.target.closest('.short'); if (s) openVideo(s.dataset.id, true); });

  const nums = Array.from({ length: brandCount }, (_, i) => String(i + 1).padStart(2, '0'));
  const logoHTML = n => `<div class="logo"><img src="assets/brands/b${n}.jpg" alt="Brand ${n}" loading="lazy" onerror="this.onerror=null;this.src='assets/brands/b${n}.png'"></div>`;
  const half = Math.ceil(nums.length / 2);
  const row = (arr, cls, t) => `<div class="logos__row ${cls}" style="--t:${t}s">${arr.concat(arr).map(logoHTML).join('')}</div>`;
  $('#logos').innerHTML = row(nums.slice(0, half), '', 70) + row(nums.slice(half), 'rev', 80);

  const modal = $('#modal'), box = $('#modalBox');
  function openVideo(id, vertical) {
    box.className = 'modal__box' + (vertical ? ' vert' : '');
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    modal.hidden = false; document.body.style.overflow = 'hidden';
  }
  function closeVideo() { modal.hidden = true; box.innerHTML = ''; document.body.style.overflow = ''; }
  $('#modalClose').addEventListener('click', closeVideo);
  modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeVideo(); });

  let io;
  function observe() {
    io && io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      const c = e.target.querySelector('[data-count]'); if (c) count(c);
    }), { threshold: .15 });
    $$('.reveal:not(.in)').forEach(el => io.observe(el));
  }
  function count(el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    const to = +el.dataset.count, dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '', t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / 1600, 1), v = to * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec) + suf; if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  $$('.stats li').forEach((li, i) => li.style.setProperty('--d', i * .1 + 's'));

  const prog = $('#progress');
  function onScroll() {
    const h = document.documentElement;
    prog.style.transform = `scaleX(${scrollY / (h.scrollHeight - innerHeight || 1)})`;
    const t = $('#timeline'), f = $('#tfill');
    if (t && f) { const r = t.getBoundingClientRect(); f.style.height = Math.max(0, Math.min(r.height, innerHeight * .6 - r.top)) + 'px'; }
    $('.hero__portrait').style.translate = `0 ${Math.min(scrollY, 600) * -.06}px`;
  }
  addEventListener('scroll', onScroll, { passive: true });

  const cursor = $('#cursor'); let mx = 0, my = 0, cx = 0, cy = 0;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; cursor.classList.add('on'); });
  (function loop() { cx += (mx - cx) * .18; cy += (my - cy) * .18; cursor.style.transform = `translate(${cx - 17}px,${cy - 17}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('pointerover', e => cursor.classList.toggle('big', !!e.target.closest('.stage__media,.short,.btn,.brandnames li')));

  applyLang(); observe(); onScroll();
})();
