/* Method Comparison Demo — animates the hero's side-by-side panels.
   Returns a cleanup function that clears all timers. */

const COLS = 8, ROWS = 5;
const W = 240, H = 186;
const CW = W / COLS, CH = H / ROWS;

const STEPS = [
  {
    text: 'Let me carefully examine this geometric diagram...',
    hm: [0.15,0.22,0.30,0.38,0.35,0.28,0.18,0.08,0.20,0.32,0.44,0.52,0.48,0.36,0.22,0.10,0.22,0.38,0.52,0.60,0.55,0.40,0.24,0.10,0.20,0.34,0.46,0.52,0.46,0.32,0.18,0.08,0.16,0.26,0.38,0.42,0.34,0.22,0.10,0.04],
    bars: [{ name:'Triangle body',pct:70 },{ name:'Side labels',pct:52 },{ name:'Background',pct:28 }],
  },
  {
    text: 'I can see a triangular shape with three vertices and three distinct sides.',
    hm: [0.08,0.28,0.44,0.54,0.48,0.32,0.14,0.04,0.12,0.38,0.58,0.70,0.62,0.44,0.18,0.06,0.15,0.46,0.68,0.78,0.68,0.46,0.20,0.06,0.18,0.44,0.62,0.70,0.60,0.38,0.16,0.05,0.12,0.28,0.42,0.48,0.38,0.22,0.08,0.03],
    bars: [{ name:'Triangle body',pct:82 },{ name:'Vertices',pct:56 },{ name:'Outer region',pct:16 }],
  },
  {
    text: "There's a small square marker at the bottom-left corner \u2014 that's a right angle symbol (90\u00B0).",
    hm: [0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.06,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.20,0.08,0.04,0.04,0.04,0.04,0.04,0.04,0.75,0.38,0.10,0.04,0.04,0.04,0.04,0.04,0.94,0.70,0.32,0.08,0.04,0.04,0.04,0.04],
    bars: [{ name:'Right angle',pct:94 },{ name:'Corner area',pct:68 },{ name:'Adj. sides',pct:30 }],
  },
  {
    text: 'Right angle at the bottom-left vertex. The two legs extend vertically upward and horizontally to the right.',
    hm: [0.44,0.08,0.04,0.04,0.04,0.04,0.04,0.04,0.52,0.08,0.04,0.04,0.04,0.04,0.04,0.04,0.58,0.10,0.04,0.04,0.04,0.04,0.04,0.04,0.74,0.34,0.08,0.04,0.04,0.04,0.04,0.04,0.90,0.66,0.42,0.30,0.20,0.10,0.04,0.04],
    bars: [{ name:'Right angle',pct:90 },{ name:'Vertical leg',pct:56 },{ name:'Horiz. leg',pct:42 }],
  },
  {
    text: 'The vertical leg has a label on the left side: a = 3.',
    hm: [0.88,0.06,0.04,0.04,0.04,0.04,0.04,0.04,0.92,0.06,0.04,0.04,0.04,0.04,0.04,0.04,0.90,0.08,0.04,0.04,0.04,0.04,0.04,0.04,0.82,0.12,0.04,0.04,0.04,0.04,0.04,0.04,0.28,0.10,0.04,0.04,0.04,0.04,0.04,0.04],
    bars: [{ name:'Label a=3',pct:91 },{ name:'Vertical leg',pct:74 },{ name:'Right angle',pct:20 }],
  },
  {
    text: 'The horizontal leg along the bottom is labeled b = 4.',
    hm: [0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.08,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.14,0.26,0.44,0.58,0.54,0.38,0.16,0.04,0.20,0.52,0.88,0.94,0.88,0.52,0.20,0.04],
    bars: [{ name:'Label b=4',pct:93 },{ name:'Horiz. leg',pct:78 },{ name:'Label a=3',pct:22 }],
  },
  {
    text: 'The hypotenuse (diagonal side opposite the right angle) is marked c = ? \u2014 this is the value to compute.',
    hm: [0.04,0.08,0.14,0.22,0.18,0.10,0.04,0.04,0.04,0.06,0.18,0.54,0.80,0.44,0.14,0.04,0.04,0.04,0.08,0.30,0.70,0.56,0.22,0.06,0.04,0.04,0.04,0.10,0.32,0.44,0.18,0.04,0.04,0.04,0.04,0.04,0.12,0.22,0.10,0.04],
    bars: [{ name:'Hypo. c=?',pct:84 },{ name:'Triangle body',pct:34 },{ name:'Labels',pct:16 }],
  },
  {
    text: 'For any right triangle: c\u00B2 = a\u00B2 + b\u00B2, where c is the hypotenuse.',
    hm: [0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.07,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.09,0.07,0.06,0.06,0.06,0.06,0.06,0.06],
    bars: [{ name:'Label a=3',pct:10 },{ name:'Label b=4',pct:8 },{ name:'Right angle',pct:6 }],
  },
  {
    text: 'Substituting a=3 and b=4:  c\u00B2 = 3\u00B2 + 4\u00B2 = 9 + 16 = 25',
    hm: [0.30,0.04,0.04,0.04,0.04,0.28,0.08,0.04,0.34,0.04,0.04,0.04,0.04,0.22,0.06,0.04,0.36,0.04,0.04,0.04,0.16,0.14,0.04,0.04,0.18,0.12,0.26,0.40,0.40,0.12,0.04,0.04,0.10,0.38,0.54,0.58,0.48,0.10,0.04,0.04],
    bars: [{ name:'Label a=3',pct:35 },{ name:'Label b=4',pct:32 },{ name:'Hypo. c=?',pct:18 }],
  },
  {
    text: 'c = \u221a25 = 5. The classic 3\u20134\u20135 Pythagorean triple! \u2713',
    hm: [0.06,0.64,0.06,0.04,0.04,0.04,0.04,0.04,0.04,0.10,0.74,0.28,0.04,0.04,0.04,0.04,0.04,0.04,0.18,0.84,0.38,0.08,0.04,0.04,0.04,0.04,0.04,0.26,0.90,0.48,0.10,0.04,0.04,0.04,0.04,0.04,0.34,0.94,0.58,0.10],
    bars: [{ name:'Hypo. c=?',pct:94 },{ name:'Label a=3',pct:28 },{ name:'Label b=4',pct:24 }],
  },
];

const MEM = [22, 25, 28, 32, 36, 48, 62, 75, 88, 96];

function $id(id: string): HTMLElement | null {
  return document.getElementById(id);
}

function buildCells(svgId: string): SVGRectElement[] {
  const svg = document.getElementById(svgId) as SVGSVGElement | null;
  if (!svg) return [];
  const cells: SVGRectElement[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x',      String(c * CW));
      rect.setAttribute('y',      String(r * CH));
      rect.setAttribute('width',  String(CW + 0.5));
      rect.setAttribute('height', String(CH + 0.5));
      rect.setAttribute('fill', 'oklch(48% 0.18 28)');
      rect.setAttribute('fill-opacity', '0');
      svg.appendChild(rect);
      cells.push(rect);
    }
  }
  return cells;
}

interface BarRefs { row: HTMLDivElement; name: HTMLElement; fill: HTMLElement; pct: HTMLElement; }

function buildBars(containerId: string): BarRefs[] {
  const container = $id(containerId);
  if (!container) return [];
  return Array.from({ length: 3 }, (_, i) => {
    const row = document.createElement('div');
    row.className = 'cmp-bar-row';
    row.innerHTML =
      `<span class="cmp-bar-name"  id="${containerId}n${i}"></span>` +
      `<div  class="cmp-bar-track"><div class="cmp-bar-fill" id="${containerId}f${i}"></div></div>` +
      `<span class="cmp-bar-pct"   id="${containerId}p${i}"></span>`;
    container.appendChild(row);
    return {
      row, name: $id(`${containerId}n${i}`)!, fill: $id(`${containerId}f${i}`)!, pct: $id(`${containerId}p${i}`)!,
    };
  });
}

// Store per-element typing timers in a WeakMap to avoid mutating DOM nodes
const typingTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

function typeInto(el: HTMLElement, text: string, onDone?: () => void) {
  clearTimeout(typingTimers.get(el));
  el.innerHTML = '<span class="stream-cursor"></span>';
  let i = 0;
  (function tick() {
    if (i <= text.length) {
      const safe = text.slice(0, i).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      el.innerHTML = safe + (i < text.length ? '<span class="stream-cursor"></span>' : '');
      i++;
      typingTimers.set(el, setTimeout(tick, i < 5 ? 25 : 11));
    } else {
      onDone?.();
    }
  })();
}

export function initComparisonDemo(): () => void {
  const oursHm   = buildCells('cmpHmOurs');
  const attnHm   = buildCells('cmpHmAttn');
  const oursBars = buildBars('cmpBarsOurs');
  const attnBars = buildBars('cmpBarsAttn');

  attnBars.forEach(br => { br.row.style.display = 'none'; });

  const stepOurs    = $id('cmpStepOurs');
  const traceOurs   = $id('cmpTraceOurs');
  const covFillOurs = $id('cmpCovOurs');
  const covCntOurs  = $id('cmpCovCntOurs');
  const stepAttn    = $id('cmpStepAttn');
  const traceAttn   = $id('cmpTraceAttn');
  const loading     = $id('cmpLoading');
  const loadingMsg  = $id('cmpLoadingMsg');
  const attnWait    = $id('cmpAttnMsg');
  const covFillAttn = $id('cmpCovAttn');
  const covCntAttn  = $id('cmpCovCntAttn');
  const memFill     = $id('cmpMemFill');
  const memPct      = $id('cmpMemPct');
  const oomOverlay  = $id('cmpOom');
  const attnErr     = $id('cmpAttnErr');
  const computeOverlay = $id('cmpComputeOverlay');

  let genO = 0;
  let genB = 0;
  let timerO: ReturnType<typeof setTimeout> | undefined;
  let timerB: ReturnType<typeof setTimeout> | undefined;

  function typeBaseStalling(text: string, myGen: number, onDone?: () => void) {
    if (!traceAttn) return;
    clearTimeout(typingTimers.get(traceAttn));
    if (computeOverlay) computeOverlay.classList.add('active');
    traceAttn.innerHTML = '<span class="stream-cursor"></span>';

    const words = text.split(' ');
    let wIdx = 0;
    let accumulated = '';

    function typeWord() {
      if (wIdx >= words.length) {
        traceAttn!.innerHTML = accumulated.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        if (computeOverlay) computeOverlay.classList.remove('active');
        onDone?.();
        return;
      }
      const word = words[wIdx++];
      const prefix = accumulated ? ' ' : '';
      const chunk = prefix + word;
      let ci = 0;

      function typeChar() {
        if (genB !== myGen) { if (computeOverlay) computeOverlay.classList.remove('active'); return; }
        if (ci <= chunk.length) {
          const partial = accumulated + chunk.slice(0, ci);
          traceAttn!.innerHTML = partial.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + (ci < chunk.length ? '<span class="stream-cursor"></span>' : '');
          ci++;
          typingTimers.set(traceAttn!, setTimeout(typeChar, 32));
        } else {
          accumulated += chunk;
          traceAttn!.innerHTML = accumulated.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '<span class="cmp-token-stall">▐ grad pass</span>';
          const curMem = parseInt(memPct?.textContent ?? '0') || MEM[0];
          if (memFill) memFill.style.width = Math.min(curMem + 4, 99) + '%';
          const delay = Math.random() > 0.85 ? 1800 + Math.random() * 4200 : 750 + Math.random() * 2250;
          typingTimers.set(traceAttn!, setTimeout(() => {
            if (genB !== myGen) { if (computeOverlay) computeOverlay.classList.remove('active'); return; }
            if (memFill) memFill.style.width = curMem + '%';
            typeWord();
          }, delay));
        }
      }
      typeChar();
    }
    typeWord();
  }

  function runOurs(idx: number) {
    if (timerO) clearTimeout(timerO);
    if (traceOurs) clearTimeout(typingTimers.get(traceOurs));
    const myGen = ++genO;
    const step = STEPS[idx];
    const n = STEPS.length;

    if (stepOurs) stepOurs.textContent = `Step ${idx + 1} / ${n}`;
    // No clear here — previous attribution persists until new values arrive at typing-end.
    // Bars and heatmap only reset on full cycle restart.
    if (!traceOurs) return;

    typeInto(traceOurs, step.text, () => {
      if (genO !== myGen) return;
      step.hm.forEach((v, i) => oursHm[i].setAttribute('fill-opacity', v.toFixed(3)));
      step.bars.forEach((b, i) => { oursBars[i].name.textContent=b.name; oursBars[i].fill.style.width=b.pct+'%'; oursBars[i].pct.textContent=b.pct+'%'; });
      if (covFillOurs) covFillOurs.style.width = ((idx + 1) / n * 100) + '%';
      if (covCntOurs)  covCntOurs.textContent  = `${idx + 1} / ${n}`;

      if (idx < n - 1) {
        timerO = setTimeout(() => { if (genO === myGen) runOurs(idx + 1); }, 2200);
      } else {
        timerO = setTimeout(() => {
          if (genO !== myGen) return;
          oursHm.forEach(c => c.setAttribute('fill-opacity','0'));
          oursBars.forEach(br => { br.fill.style.width='0%'; br.pct.textContent=''; br.name.textContent=''; });
          traceOurs.innerHTML = '<span class="stream-cursor"></span>';
          if (covFillOurs) covFillOurs.style.width='0%';
          if (covCntOurs)  covCntOurs.textContent=`0 / ${n}`;
          timerO = setTimeout(() => { if (genO===myGen) runOurs(0); }, 500);
        }, 1500);
      }
    });
  }

  function runBase(idx: number) {
    if (timerB) clearTimeout(timerB);
    if (traceAttn) clearTimeout(typingTimers.get(traceAttn));
    const myGen = ++genB;
    const step = STEPS[idx];
    const n = STEPS.length;
    const isLast = idx === n - 1;

    if (stepAttn) stepAttn.textContent = `Step ${idx + 1} / ${n}`;
    const memVal = MEM[idx];
    if (memFill) { memFill.style.width=memVal+'%'; memFill.classList.toggle('critical', memVal>=80); }
    if (memPct)  memPct.textContent = memVal + '%';
    if (loadingMsg) loadingMsg.textContent = 'Computing…';
    if (loading)    loading.classList.add('show');

    typeBaseStalling(step.text, myGen, () => {
      if (genB !== myGen) return;
      if (isLast) {
        if (loadingMsg) loadingMsg.innerHTML = 'Running<br>backward pass…';
        timerB = setTimeout(() => {
          if (genB !== myGen) return;
          if (memFill) { memFill.style.width='100%'; memFill.classList.add('critical'); }
          if (memPct)  memPct.textContent = '100%';
          timerB = setTimeout(() => {
            if (genB !== myGen) return;
            if (loading) loading.classList.remove('show');
            if (oomOverlay) oomOverlay.classList.add('show');
            if (attnErr)    attnErr.style.display = '';
            timerB = setTimeout(() => {
              if (genB !== myGen) return;
              attnHm.forEach(c => c.setAttribute('fill-opacity','0'));
              attnBars.forEach(br => { br.fill.style.width='0%'; br.pct.textContent=''; br.name.textContent=''; br.row.style.display='none'; });
              if (attnWait)       attnWait.style.display='';
              if (loading)        loading.classList.remove('show');
              if (loadingMsg)     loadingMsg.textContent='Computing…';
              if (oomOverlay)     oomOverlay.classList.remove('show');
              if (attnErr)        attnErr.style.display='none';
              if (computeOverlay) computeOverlay.classList.remove('active');
              if (memFill) { memFill.style.width=MEM[0]+'%'; memFill.classList.remove('critical'); }
              if (memPct)  memPct.textContent = MEM[0]+'%';
              if (traceAttn) traceAttn.innerHTML='<span class="stream-cursor"></span>';
              if (covFillAttn) covFillAttn.style.width='0%';
              if (covCntAttn)  covCntAttn.textContent=`0 / ${n}`;
              timerB = setTimeout(() => { if (genB===myGen) runBase(0); }, 400);
            }, 2800);
          }, 900);
        }, 800);
      } else {
        if (loading) loading.classList.remove('show');
        timerB = setTimeout(() => { if (genB===myGen) runBase(idx+1); }, 80);
      }
    });
  }

  const t1 = setTimeout(() => runOurs(0), 800);
  const t2 = setTimeout(() => runBase(0), 1400);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
    if (timerO) clearTimeout(timerO);
    if (timerB) clearTimeout(timerB);
    if (traceOurs) clearTimeout(typingTimers.get(traceOurs));
    if (traceAttn) clearTimeout(typingTimers.get(traceAttn));
    genO++;
    genB++;
  };
}
