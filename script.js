// Nothing — interactions.

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // -------------------------------------------------------
  // i18n
  // -------------------------------------------------------
  const dict = {
    en: {
      brand: 'Nothing',
      nav_manifesto: 'Manifesto', nav_object: 'The Object', nav_process: 'Process', nav_essay: 'Essay', nav_contact: 'Reach',
      cta: 'Acquire Nothing',
      hero_meta: 'Volume 01 / Edition of None',
      hero_w1: 'Nothing,', hero_w2: 'precisely', hero_w3: 'engineered.',
      hero_sub: 'A long, unwavering meditation on absence. Calibrated to the seventh decimal. Tuned by hand. Confirmed by no one.',
      hero_btn: 'Begin the descent',
      hero_ghost: '↓ Or scroll, gently',
      marquee: 'Empty   Quiet   Considered   Negligible   Untouched   Unsaid   Unbothered   Empty   Quiet   Considered   Negligible   Untouched   Unsaid   Unbothered',
      m_h: 'A manifesto for the unremarkable.',
      m_p1: 'We have made too many things. Too many shapes, too many edges, too many promises uttered into rooms that were already full. Nothing is the inverse practice. We sand it down. We sand the sander.',
      m_p2: 'Each surface here is a refusal. Each line a long apology to your retinas. The product, should we ever ship it, will be the absence of itself, gift-wrapped, hand-numbered, sent nowhere.',
      m_p3: 'Nothing is not a brand. Nothing is not a movement. Nothing is, at most, a Tuesday afternoon that forgot to introduce itself.',
      o_h1: 'The Object', o_h2: ', as such.',
      spec_l1: 'Material', spec_v1: 'Ambient air',
      spec_l2: 'Finish', spec_v2: 'Bare attention',
      spec_l3: 'Weight', spec_v3: '0.000 g',
      spec_l4: 'Capacity', spec_v4: 'Whatever you bring',
      spec_l5: 'Origin', spec_v5: 'An unobserved Tuesday',
      spec_l6: 'Edition', spec_v6: '1 of ∅',
      o_cap: 'Photographed in a room without light. Calibrated against a wall that was, on reflection, not there.',
      p_h1: 'Process', p_h2: '. Or the long way around.',
      p_c1_t: 'Removal', p_c1_d: 'We begin with a thing and slowly, patiently, take from it. The thing forgives us.',
      p_c2_t: 'Quietening', p_c2_d: 'We turn the volume down on the remaining shapes until they hum at the frequency of forgotten dreams.',
      p_c3_t: 'Calibration', p_c3_d: 'An engineer in a grey shirt squints at a grey number for a grey afternoon. The number does not change. It is correct.',
      p_c4_t: 'Disappearance', p_c4_d: 'The piece is removed from itself. What remains is what was always there, only more so.',
      p_c5_t: 'Delivery', p_c5_d: 'Nothing arrives in a box that did not exist. You open it. It opens you.',
      s1: 'Decisions made in haste', s2: 'Hours spent staring', s3: 'Materials, none chosen', s4: 'Times we changed our minds',
      e_h: 'An essay on the absence of essay.',
      e_p1: 'There is a particular kind of quiet that arrives only after every other sound has politely excused itself. We are interested in that quiet. We are, perhaps, only interested in that quiet.',
      e_p2: 'Consider a room. Now consider the room without the room. Now consider what remains, which is, of course, you, and the long fluorescent hum of your own paying attention. That is the work. That is all the work.',
      e_q: 'To make Nothing is harder than to make Something. Something has demands. Nothing has only its terrible, quiet patience.',
      e_cite: 'by a person we did not interview',
      e_p3: 'We could go on. In fact, we have been going on, in the next room, for several years now. You are welcome to listen. Bring nothing. We will match it.',
      c_w1: 'Say', c_w2: 'nothing,', c_w3: 'back.',
      c_sub: 'If you must, you may whisper it into the form below. We will not respond. This is the agreement.',
      c_l1: 'Your name, optional', c_l2: 'Your nothing',
      c_ph: 'Leave this blank, deliberately.',
      c_btn: 'Send into the void',
      c_sent: 'Received. Filed under nothing.',
      f_tag: 'An ongoing refusal, since an unspecified date.',
      f_studio_l: 'Studio', f_studio_v: 'An empty floor, somewhere quiet.',
      f_index_l: 'Index',
      f_legal_l: 'Legal', f_legal_v: 'Nothing is, legally, nothing. Please do not litigate.',
      f_rights: 'Nothing. All wrongs reserved.',
    },
    de: {
      brand: 'Nichts',
      nav_manifesto: 'Manifest', nav_object: 'Das Objekt', nav_process: 'Verfahren', nav_essay: 'Essay', nav_contact: 'Kontakt',
      cta: 'Nichts erwerben',
      hero_meta: 'Band 01 / Auflage von Keiner',
      hero_w1: 'Nichts,', hero_w2: 'präzise', hero_w3: 'konstruiert.',
      hero_sub: 'Eine lange, unbeirrte Meditation über die Abwesenheit. Auf die siebte Nachkommastelle kalibriert. Von Hand gestimmt. Von niemandem bestätigt.',
      hero_btn: 'Den Abstieg beginnen',
      hero_ghost: '↓ Oder sanft scrollen',
      marquee: 'Leer   Still   Bedacht   Vernachlässigbar   Unberührt   Ungesagt   Unbeirrt   Leer   Still   Bedacht   Vernachlässigbar   Unberührt   Ungesagt   Unbeirrt',
      m_h: 'Ein Manifest für das Unauffällige.',
      m_p1: 'Wir haben zu viele Dinge gemacht. Zu viele Formen, zu viele Kanten, zu viele Versprechen, in bereits volle Räume hineingesprochen. Nichts ist die umgekehrte Praxis. Wir schleifen es ab. Wir schleifen den Schleifer.',
      m_p2: 'Jede Fläche hier ist eine Verweigerung. Jede Linie eine lange Entschuldigung an Ihre Netzhäute. Das Produkt, sollten wir es jemals ausliefern, wird die Abwesenheit seiner selbst sein, eingewickelt, von Hand nummeriert, nirgendwohin geschickt.',
      m_p3: 'Nichts ist keine Marke. Nichts ist keine Bewegung. Nichts ist höchstens ein Dienstagnachmittag, der vergessen hat sich vorzustellen.',
      o_h1: 'Das Objekt', o_h2: ', als solches.',
      spec_l1: 'Material', spec_v1: 'Umgebungsluft',
      spec_l2: 'Oberfläche', spec_v2: 'Reine Aufmerksamkeit',
      spec_l3: 'Gewicht', spec_v3: '0,000 g',
      spec_l4: 'Inhalt', spec_v4: 'Was immer Sie mitbringen',
      spec_l5: 'Herkunft', spec_v5: 'Ein unbeobachteter Dienstag',
      spec_l6: 'Auflage', spec_v6: '1 von ∅',
      o_cap: 'Fotografiert in einem Raum ohne Licht. Geeicht gegen eine Wand, die bei näherer Betrachtung nicht da war.',
      p_h1: 'Verfahren', p_h2: '. Oder der lange Weg drumherum.',
      p_c1_t: 'Entfernung', p_c1_d: 'Wir beginnen mit einem Ding und nehmen ihm langsam, geduldig etwas weg. Das Ding verzeiht uns.',
      p_c2_t: 'Beruhigung', p_c2_d: 'Wir drehen die Lautstärke der verbleibenden Formen herunter, bis sie in der Frequenz vergessener Träume summen.',
      p_c3_t: 'Kalibrierung', p_c3_d: 'Ein Ingenieur in grauem Hemd kneift einen ganzen grauen Nachmittag lang die Augen vor einer grauen Zahl zusammen. Die Zahl ändert sich nicht. Sie ist korrekt.',
      p_c4_t: 'Verschwinden', p_c4_d: 'Das Werk wird von sich selbst entfernt. Was bleibt, war ohnehin immer da, nur deutlicher.',
      p_c5_t: 'Auslieferung', p_c5_d: 'Nichts kommt in einer Schachtel an, die nie existiert hat. Sie öffnen sie. Sie öffnet Sie.',
      s1: 'In Eile getroffene Entscheidungen', s2: 'Stunden mit Starren verbracht', s3: 'Materialien, keines gewählt', s4: 'Mal unsere Meinung geändert',
      e_h: 'Ein Essay über die Abwesenheit eines Essays.',
      e_p1: 'Es gibt eine besondere Art von Stille, die erst dann eintritt, wenn sich jedes andere Geräusch höflich verabschiedet hat. Diese Stille interessiert uns. Vielleicht interessiert uns nur sie.',
      e_p2: 'Stellen Sie sich einen Raum vor. Nun denken Sie den Raum ohne den Raum. Nun denken Sie, was bleibt, das sind selbstverständlich Sie selbst, und das lange Neonbrummen Ihrer eigenen Aufmerksamkeit. Das ist die Arbeit. Das ist die ganze Arbeit.',
      e_q: 'Nichts zu machen ist schwerer als Etwas zu machen. Etwas stellt Ansprüche. Nichts besitzt nur seine schreckliche, stille Geduld.',
      e_cite: 'von jemandem, den wir nicht befragt haben',
      e_p3: 'Wir könnten weitermachen. Tatsächlich machen wir seit einigen Jahren im Nebenraum weiter. Sie sind eingeladen zuzuhören. Bringen Sie nichts mit. Wir werden es erwidern.',
      c_w1: 'Sagen', c_w2: 'Sie nichts', c_w3: 'zurück.',
      c_sub: 'Falls Sie müssen, dürfen Sie es in das untenstehende Formular flüstern. Wir werden nicht antworten. Das ist die Vereinbarung.',
      c_l1: 'Ihr Name, optional', c_l2: 'Ihr Nichts',
      c_ph: 'Lassen Sie dies bewusst leer.',
      c_btn: 'Ins Leere senden',
      c_sent: 'Erhalten. Abgelegt unter Nichts.',
      f_tag: 'Eine fortwährende Verweigerung, seit einem unbestimmten Datum.',
      f_studio_l: 'Studio', f_studio_v: 'Eine leere Etage, irgendwo Ruhiges.',
      f_index_l: 'Verzeichnis',
      f_legal_l: 'Rechtliches', f_legal_v: 'Nichts ist, rechtlich gesehen, nichts. Bitte führen Sie keinen Prozess.',
      f_rights: 'Nichts. Alle Rechte irgendwo verlegt.',
    }
  };

  const LANG_ORDER = ['en', 'de', 'blank'];
  const LANG_LABEL = { en: 'EN', de: 'DE', blank: '∅' };

  function applyLang(lang) {
    document.body.classList.remove('lang-en', 'lang-de', 'lang-blank');
    document.body.classList.add('lang-' + lang);

    const label = document.getElementById('lang-label');
    if (label) label.textContent = LANG_LABEL[lang];

    // For en/de — set real text. For blank — keep current text, CSS makes it transparent.
    const source = lang === 'blank' ? null : dict[lang];
    if (!source) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (source[k] === undefined) return;
      // For data-split elements: their .char spans are the only children — safe to overwrite.
      if (el.hasAttribute('data-split')) {
        el.textContent = source[k];
        return;
      }
      if (el.children.length === 0) {
        el.textContent = source[k];
      } else {
        const onlyText = [...el.childNodes].every(n => n.nodeType === 3);
        if (onlyText) el.textContent = source[k];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.getAttribute('data-i18n-placeholder');
      if (source[k] !== undefined) el.setAttribute('placeholder', source[k]);
    });

    // Re-run split on hero/contact words after change
    rerunSplit();

    document.documentElement.lang = lang;
  }

  // -------------------------------------------------------
  // Split text -> char spans (idempotent)
  // -------------------------------------------------------
  function splitOne(el) {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char in';
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.transitionDelay = `${i * 28}ms`;
      el.appendChild(span);
    });
  }
  function splitAll() {
    document.querySelectorAll('[data-split]').forEach(splitOne);
  }
  function rerunSplit() {
    document.querySelectorAll('[data-split]').forEach(el => {
      // already split? collect plain text from chars
      const chars = el.querySelectorAll('.char');
      if (chars.length) {
        let plain = '';
        chars.forEach(c => plain += c.textContent);
        el.textContent = plain;
      }
      splitOne(el);
      // Trigger animation
      el.querySelectorAll('.char').forEach(c => {
        c.classList.remove('in');
        // force reflow then add
        void c.offsetWidth;
        c.classList.add('in');
      });
    });
  }

  const charStyle = document.createElement('style');
  charStyle.textContent = `
    .char { transition: transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1); }
    .char.in { transform: translateY(0) !important; opacity: 1 !important; }
  `;
  document.head.appendChild(charStyle);

  splitAll();

  // -------------------------------------------------------
  // Cursor
  // -------------------------------------------------------
  const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  let mx = innerWidth / 2, my = innerHeight / 2;
  let cx = mx, cy = my, dx = mx, dy = my;

  if (!isTouch) {
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const loop = () => {
      cx += (mx - cx) * 0.15; cy += (my - cy) * 0.15;
      dx += (mx - dx) * 0.45; dy += (my - dy) * 0.45;
      if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      if (dot) dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, [data-magnetic], input, textarea')) cursor?.classList.add('hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, [data-magnetic], input, textarea')) cursor?.classList.remove('hover');
    });

    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }

  // -------------------------------------------------------
  // Reveal: fade in & out as elements enter and leave
  // -------------------------------------------------------
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        en.target.querySelectorAll('.char').forEach(c => c.classList.add('in'));
        if (en.target.classList.contains('count')) animateCount(en.target);
      } else {
        // Fade back out when far from viewport (allows replay)
        if (en.boundingClientRect.top > window.innerHeight) {
          en.target.classList.remove('visible');
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('[data-reveal], .count').forEach(el => io.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.hero [data-split] .char').forEach(c => c.classList.add('in'));
  }, 150);

  function animateCount(el) {
    const target = parseInt(el.dataset.target || '0', 10);
    if (!target) return;
    const dur = 2000, start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * eased).toLocaleString(document.documentElement.lang || 'en');
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // -------------------------------------------------------
  // Scramble
  // -------------------------------------------------------
  const SCRAMBLE_CHARS = '!<>_/[]{}=+*^?#________';
  function scramble(el, finalText, duration = 900) {
    if (el._scrambling) return;
    el._scrambling = true;
    const start = performance.now();
    const len = finalText.length;
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      let out = '';
      for (let i = 0; i < len; i++) {
        const reveal = i / len;
        if (t > reveal) out += finalText[i];
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(tick);
      else { el.textContent = finalText; el._scrambling = false; }
    };
    requestAnimationFrame(tick);
  }
  document.querySelectorAll('[data-scramble]').forEach(el => {
    el.addEventListener('mouseenter', () => scramble(el, el.textContent, 600));
  });

  // -------------------------------------------------------
  // Nav scroll + progress
  // -------------------------------------------------------
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.progress-bar span');
  const onScroll = () => {
    const y = scrollY;
    nav?.classList.toggle('scrolled', y > 40);
    const max = document.body.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${Math.min(y / max, 1) * 100}%`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -------------------------------------------------------
  // Object tilt + card spotlight + hscroll wheel
  // -------------------------------------------------------
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'perspective(1200px) rotateY(0) rotateX(0)'; });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  const hscroll = document.querySelector('.hscroll-track');
  if (hscroll && !isTouch) {
    hscroll.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const max = hscroll.scrollWidth - hscroll.clientWidth;
        const atStart = hscroll.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = hscroll.scrollLeft >= max && e.deltaY > 0;
        if (!atStart && !atEnd) { e.preventDefault(); hscroll.scrollLeft += e.deltaY; }
      }
    }, { passive: false });
  }

  // -------------------------------------------------------
  // Canvas particles
  // -------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    const dust = [];
    const N = 90;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
    };
    resize();
    addEventListener('resize', resize);
    for (let i = 0; i < N; i++) {
      dust.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15 * dpr,
        vy: (Math.random() - 0.5) * 0.15 * dpr,
        r: (Math.random() * 1.2 + 0.4) * dpr,
        a: Math.random() * 0.5 + 0.2,
      });
    }
    let pmx = w / 2, pmy = h / 2;
    addEventListener('mousemove', e => { pmx = e.clientX * dpr; pmy = e.clientY * dpr; });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const light = document.body.classList.contains('theme-light');
      const col = light ? '0,0,0' : '255,255,255';

      const grad = ctx.createRadialGradient(pmx, pmy, 0, pmx, pmy, 400 * dpr);
      grad.addColorStop(0, `rgba(${col},${light ? 0.04 : 0.06})`);
      grad.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];
        p.x += p.vx; p.y += p.vy;
        const ddx = pmx - p.x, ddy = pmy - p.y;
        if (ddx * ddx + ddy * ddy < 40000 * dpr * dpr) {
          p.vx += ddx * 0.00002; p.vy += ddy * 0.00002;
        }
        p.vx *= 0.995; p.vy *= 0.995;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${p.a * (light ? 0.7 : 1)})`;
        ctx.fill();
      }
      for (let i = 0; i < dust.length; i++) {
        for (let j = i + 1; j < dust.length; j++) {
          const a = dust[i], b = dust[j];
          const ddx = a.x - b.x, ddy = a.y - b.y;
          const d2 = ddx * ddx + ddy * ddy;
          const max = 120 * dpr;
          if (d2 < max * max) {
            const alpha = (1 - Math.sqrt(d2) / max) * (light ? 0.08 : 0.12);
            ctx.strokeStyle = `rgba(${col},${alpha})`;
            ctx.lineWidth = 0.5 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  // -------------------------------------------------------
  // Footer
  // -------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const clock = document.getElementById('clock');
  if (clock) {
    const fmt = n => String(n).padStart(2, '0');
    const tick = () => {
      const d = new Date();
      clock.textContent = `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`;
    };
    tick(); setInterval(tick, 1000);
  }

  // -------------------------------------------------------
  // Hero parallax
  // -------------------------------------------------------
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !isTouch) {
    addEventListener('mousemove', e => {
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 8;
      heroTitle.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // -------------------------------------------------------
  // Theme + Language toggles
  // -------------------------------------------------------
  const themeBtn = document.getElementById('theme-btn');
  const langBtn = document.getElementById('lang-btn');

  const savedTheme = localStorage.getItem('nothing-theme') || 'dark';
  document.body.classList.remove('theme-dark', 'theme-light');
  document.body.classList.add('theme-' + savedTheme);

  themeBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark');
    document.body.classList.toggle('theme-dark', !isDark);
    document.body.classList.toggle('theme-light', isDark);
    localStorage.setItem('nothing-theme', isDark ? 'light' : 'dark');
  });

  const savedLang = localStorage.getItem('nothing-lang') || 'en';
  applyLang(savedLang);

  langBtn?.addEventListener('click', () => {
    const cur = LANG_ORDER.find(l => document.body.classList.contains('lang-' + l)) || 'en';
    const next = LANG_ORDER[(LANG_ORDER.indexOf(cur) + 1) % LANG_ORDER.length];
    applyLang(next);
    localStorage.setItem('nothing-lang', next);
  });
})();
