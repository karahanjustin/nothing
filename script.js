// =========================================================
// Nothing — a study in absence. Scripts to make it move.
// =========================================================

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // -------------------------------------------------------
  // Custom cursor with lerp follow + magnetic targets
  // -------------------------------------------------------
  const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my, dx = mx, dy = my;

  if (!isTouch) {
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const cursorLoop = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      dx += (mx - dx) * 0.45;
      dy += (my - dy) * 0.45;
      if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      if (dot) dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      requestAnimationFrame(cursorLoop);
    };
    cursorLoop();

    const hoverables = document.querySelectorAll('a, button, [data-magnetic], input, textarea');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
    });

    // Magnetic
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const strength = 0.35;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // -------------------------------------------------------
  // Split text → per-char reveal
  // -------------------------------------------------------
  document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.transitionDelay = `${i * 28}ms`;
      el.appendChild(span);
    });
  });

  const charStyle = document.createElement('style');
  charStyle.textContent = `
    .char {
      transition: transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1);
    }
    .char.in { transform: translateY(0) !important; opacity: 1 !important; }
  `;
  document.head.appendChild(charStyle);

  // -------------------------------------------------------
  // IntersectionObserver — reveals, char-ins, counters
  // -------------------------------------------------------
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('visible');
      en.target.querySelectorAll('.char').forEach(c => c.classList.add('in'));
      if (en.target.dataset.split !== undefined) {
        en.target.querySelectorAll('.char').forEach(c => c.classList.add('in'));
      }
      if (en.target.classList.contains('count')) animateCount(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-reveal], [data-split], .count').forEach(el => io.observe(el));
  // Trigger hero immediately
  setTimeout(() => {
    document.querySelectorAll('.hero [data-split]').forEach(el => {
      el.querySelectorAll('.char').forEach(c => c.classList.add('in'));
    });
    document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('visible'));
  }, 200);

  // Counter
  function animateCount(el) {
    const target = parseInt(el.dataset.target || '0', 10);
    if (!target) return;
    const dur = 2000;
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // -------------------------------------------------------
  // Scramble text on hover / on reveal
  // -------------------------------------------------------
  const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

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
    const original = el.textContent;
    el.dataset.original = original;
    const so = new IntersectionObserver((ents, obs) => {
      ents.forEach(e => {
        if (e.isIntersecting) { scramble(el, original); obs.unobserve(el); }
      });
    }, { threshold: 0.4 });
    so.observe(el);
    el.addEventListener('mouseenter', () => scramble(el, original, 600));
  });

  // -------------------------------------------------------
  // Nav state + scroll progress
  // -------------------------------------------------------
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.progress-bar span');
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = Math.min(y / max, 1);
    if (progress) progress.style.width = `${pct * 100}%`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -------------------------------------------------------
  // 3D tilt for the object
  // -------------------------------------------------------
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1200px) rotateY(0) rotateX(0)';
    });
  });

  // -------------------------------------------------------
  // Card spotlight
  // -------------------------------------------------------
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // -------------------------------------------------------
  // Horizontal scroll: translate vertical wheel → horizontal
  // -------------------------------------------------------
  const hscroll = document.querySelector('.hscroll-track');
  if (hscroll && !isTouch) {
    hscroll.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const max = hscroll.scrollWidth - hscroll.clientWidth;
        const atStart = hscroll.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = hscroll.scrollLeft >= max && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          hscroll.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });
  }

  // -------------------------------------------------------
  // Canvas particle field — drifting dust + connecting lines
  // -------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    const dust = [];
    const N = 90;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(1, 1);
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < N; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15 * dpr,
        vy: (Math.random() - 0.5) * 0.15 * dpr,
        r: (Math.random() * 1.2 + 0.4) * dpr,
        a: Math.random() * 0.5 + 0.2,
      });
    }

    let pmx = w / 2, pmy = h / 2;
    window.addEventListener('mousemove', e => {
      pmx = e.clientX * dpr; pmy = e.clientY * dpr;
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Soft gradient glow that follows cursor
      const grad = ctx.createRadialGradient(pmx, pmy, 0, pmx, pmy, 400 * dpr);
      grad.addColorStop(0, 'rgba(255,255,255,0.06)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Update dust
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];
        p.x += p.vx; p.y += p.vy;

        // gentle attraction toward cursor
        const ddx = pmx - p.x, ddy = pmy - p.y;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 < 40000 * dpr * dpr) {
          p.vx += ddx * 0.00002;
          p.vy += ddy * 0.00002;
        }
        p.vx *= 0.995; p.vy *= 0.995;

        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }

      // Connecting lines
      for (let i = 0; i < dust.length; i++) {
        for (let j = i + 1; j < dust.length; j++) {
          const a = dust[i], b = dust[j];
          const ddx = a.x - b.x, ddy = a.y - b.y;
          const d2 = ddx * ddx + ddy * ddy;
          const max = 120 * dpr;
          if (d2 < max * max) {
            const alpha = (1 - Math.sqrt(d2) / max) * 0.12;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };
    draw();
  }

  // -------------------------------------------------------
  // Footer clock + year
  // -------------------------------------------------------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
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
  // Parallax on hero title (subtle on mousemove)
  // -------------------------------------------------------
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !isTouch) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroTitle.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
})();
