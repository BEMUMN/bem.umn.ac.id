// Peel: the BEM XVI signature move.
//
// A sheet of paper folds back from its bottom-right corner, exactly like the
// dog-eared "XVI" in the logo, and the page underneath is revealed. Scroll is
// the hand: the fold line is driven by the parent act's --sc-p (published by
// the scrollcraft engine), never by a timer.
//
// Geometry, per frame:
//   fold line      n·P = k, n = (cos a, sin a), swept from the corner (k = kMax)
//                  to the opposite corner (k = 0)
//   sheet          rect ∩ {n·P <= k}  -> CSS clip-path polygon (real DOM stays)
//   flap           the cut part, reflected across the fold and foreshortened by
//                  `lift` so it reads as paper rising toward you, not a flat
//                  mirror: P' = P - (1 + lift)·s·n, s = n·P - k
//   cast shadow    a strip on the revealed page next to the fold
//
// Only transform-free geometry is written (clip-path + SVG points), no layout
// properties, once per frame and only when progress changed.

type Pt = [number, number];

interface PeelState {
  el: HTMLElement;
  act: HTMLElement | null;
  sheet: HTMLElement;
  under: HTMLElement;
  flap: SVGSVGElement;
  flapPoly: SVGPolygonElement;
  flapShadowA: SVGPolygonElement;
  flapShadowB: SVGPolygonElement;
  flapGrad: SVGLinearGradientElement;
  cast: SVGSVGElement;
  castPoly: SVGPolygonElement;
  castGrad: SVGLinearGradientElement;
  from: number;
  to: number;
  angleAttr: string;
  rest: number;
  lift: number;
  hover: boolean;
  hoverAmt: number;
  hoverTarget: number;
  w: number;
  h: number;
  last: number;
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const ease = (x: number) => {
  x = clamp01(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** Sutherland–Hodgman against one half-plane. keep(P) >= 0 is inside. */
function clipHalf(poly: Pt[], keep: (p: Pt) => number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const sa = keep(a);
    const sb = keep(b);
    if (sa >= 0) out.push(a);
    if (sa >= 0 !== sb >= 0) {
      const t = sa / (sa - sb);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
}

const ptsAttr = (poly: Pt[]) => poly.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
const clipPath = (poly: Pt[]) =>
  poly.length < 3 ? 'polygon(0 0, 0 0, 0 0)' : `polygon(${poly.map((p) => `${p[0].toFixed(1)}px ${p[1].toFixed(1)}px`).join(', ')})`;

function angleFor(s: PeelState): number {
  if (s.angleAttr && s.angleAttr !== 'auto') return (parseFloat(s.angleAttr) * Math.PI) / 180;
  // auto: fold perpendicular to the diagonal, so the sweep is even on any aspect,
  // pulled halfway toward the logo's 45 degrees.
  const diag = Math.atan2(s.h, s.w);
  return (diag + Math.PI / 4) / 2;
}

function progressOf(s: PeelState): number {
  if (s.act) {
    const v = parseFloat(s.act.style.getPropertyValue('--sc-p'));
    if (!Number.isNaN(v)) return v;
  }
  // No engine progress yet: derive from position (pinned-act formula).
  const host = s.act ?? s.el;
  const r = host.getBoundingClientRect();
  const travel = Math.max(r.height - innerHeight, 1);
  return clamp01(-r.top / travel);
}

function render(s: PeelState, p: number) {
  const { w, h } = s;
  if (!w || !h) return;
  const e = ease((p - s.from) / Math.max(s.to - s.from, 0.0001));
  s.el.style.setProperty('--peel', e.toFixed(4));
  s.el.classList.toggle('is-peeling', e > 0.001 && e < 0.999);
  s.el.classList.toggle('is-peeled', e >= 0.999);
  const handoff = e > 0.6;
  s.sheet.style.pointerEvents = handoff ? 'none' : '';
  s.under.style.pointerEvents = handoff ? '' : 'none';

  if (reduce) {
    // Fewer and gentler: the page still changes, it just cross-fades. The fade
    // is kept short (middle fifth of the fold window) so the two grounds never
    // sit half-mixed for long.
    s.sheet.style.opacity = String(1 - clamp01((e - 0.4) / 0.2));
    s.flap.style.display = 'none';
    s.cast.style.display = 'none';
    return;
  }

  const a = angleFor(s);
  const nx = Math.cos(a);
  const ny = Math.sin(a);
  const kMax = w * nx + h * ny;
  const rest = Math.min(s.rest + s.hoverAmt, kMax * 0.5);
  const k0 = kMax - rest;
  const k = k0 * (1 - e);

  const rect: Pt[] = [[0, 0], [w, 0], [w, h], [0, h]];

  if (k >= kMax - 0.5) {
    s.sheet.style.clipPath = '';
    s.flap.style.display = 'none';
    s.cast.style.display = 'none';
    return;
  }

  const sheetPoly = clipHalf(rect, (q) => k - (nx * q[0] + ny * q[1]));
  s.sheet.style.clipPath = clipPath(sheetPoly);

  const cut = clipHalf(rect, (q) => nx * q[0] + ny * q[1] - k);
  if (cut.length < 3 || k <= 0.5) {
    s.flap.style.display = 'none';
    s.cast.style.display = 'none';
    return;
  }
  s.flap.style.display = '';
  s.cast.style.display = '';

  const m = 1 + s.lift;
  let maxS = 0;
  const flap: Pt[] = cut.map((q) => {
    const sd = nx * q[0] + ny * q[1] - k;
    if (sd > maxS) maxS = sd;
    return [q[0] - m * sd * nx, q[1] - m * sd * ny];
  });
  s.flapPoly.setAttribute('points', ptsAttr(flap));

  // The flap's own shadow on the sheet: two offset copies, no blur filter
  // (a per-frame blur is the expensive thing on a phone).
  const off = (d: number): Pt[] => flap.map((q) => [q[0] - nx * d * 0.6, q[1] - ny * d * 0.6 + d * 0.5]);
  const depth = Math.min(maxS * 0.06, 18);
  s.flapShadowA.setAttribute('points', ptsAttr(off(depth * 0.5)));
  s.flapShadowB.setAttribute('points', ptsAttr(off(depth)));

  // Shade across the flap, perpendicular to the fold: crease, highlight, edge.
  const fx = k * nx, fy = k * ny;
  const ex = fx - nx * s.lift * maxS, ey = fy - ny * s.lift * maxS;
  s.flapGrad.setAttribute('x1', fx.toFixed(1));
  s.flapGrad.setAttribute('y1', fy.toFixed(1));
  s.flapGrad.setAttribute('x2', ex.toFixed(1));
  s.flapGrad.setAttribute('y2', ey.toFixed(1));

  // Shadow cast by the lifted page onto the revealed one.
  const sw = Math.min(28 + maxS * 0.16, 140);
  const strip = clipHalf(clipHalf(rect, (q) => nx * q[0] + ny * q[1] - k), (q) => k + sw - (nx * q[0] + ny * q[1]));
  s.castPoly.setAttribute('points', ptsAttr(strip));
  s.castGrad.setAttribute('x1', fx.toFixed(1));
  s.castGrad.setAttribute('y1', fy.toFixed(1));
  s.castGrad.setAttribute('x2', (fx + nx * sw).toFixed(1));
  s.castGrad.setAttribute('y2', (fy + ny * sw).toFixed(1));
}

function measure(s: PeelState) {
  s.w = s.el.clientWidth;
  s.h = s.el.clientHeight;
  for (const svg of [s.flap, s.cast]) svg.setAttribute('viewBox', `0 0 ${s.w} ${s.h}`);
  s.last = -1;
}

export function initPeels(root: ParentNode = document): () => void {
  const states: PeelState[] = [];
  const observers: ResizeObserver[] = [];
  let raf = 0;
  let stopped = false;
  root.querySelectorAll<HTMLElement>('[data-peel]').forEach((el) => {
    const q = <T extends Element>(sel: string) => el.querySelector(sel) as T;
    const s: PeelState = {
      el,
      act: el.closest<HTMLElement>('[data-sc-act]'),
      sheet: q<HTMLElement>('.peel__sheet'),
      under: q<HTMLElement>('.peel__under'),
      flap: q<SVGSVGElement>('.peel__flap'),
      flapPoly: q<SVGPolygonElement>('.peel__flap-paper'),
      flapShadowA: q<SVGPolygonElement>('.peel__flap-shadow-a'),
      flapShadowB: q<SVGPolygonElement>('.peel__flap-shadow-b'),
      flapGrad: q<SVGLinearGradientElement>('.peel__flap linearGradient'),
      cast: q<SVGSVGElement>('.peel__cast'),
      castPoly: q<SVGPolygonElement>('.peel__cast polygon'),
      castGrad: q<SVGLinearGradientElement>('.peel__cast linearGradient'),
      from: parseFloat(el.dataset.peelFrom ?? '0.1'),
      to: parseFloat(el.dataset.peelTo ?? '0.8'),
      angleAttr: el.dataset.peelAngle ?? 'auto',
      rest: parseFloat(el.dataset.peelRest ?? '0'),
      lift: Math.min(Math.max(parseFloat(el.dataset.peelLift ?? '0.6'), 0.05), 1),
      hover: 'peelHover' in el.dataset && fine && !reduce,
      hoverAmt: 0,
      hoverTarget: 0,
      w: 0,
      h: 0,
      last: -1,
    };
    if (!s.sheet || !s.under || !s.flap || !s.cast) return;
    measure(s);
    const ro = new ResizeObserver(() => measure(s));
    ro.observe(el);
    observers.push(ro);
    if (s.hover) {
      // Embodiment: the turned-up corner leans toward a hand that comes near it.
      el.addEventListener('pointermove', (ev) => {
        const r = el.getBoundingClientRect();
        const dx = (r.right - ev.clientX) / r.width;
        const dy = (r.bottom - ev.clientY) / r.height;
        const near = clamp01(1 - Math.hypot(dx, dy) / 0.45);
        s.hoverTarget = near * 70;
      });
      el.addEventListener('pointerleave', () => (s.hoverTarget = 0));
    }
    states.push(s);
  });
  if (!states.length) return () => {};

  const tick = () => {
    if (stopped) return;
    for (const s of states) {
      if (s.hover) {
        const d = s.hoverTarget - s.hoverAmt;
        if (Math.abs(d) > 0.2) {
          s.hoverAmt += d * 0.14;
          s.last = -1;
        }
      }
      const p = progressOf(s);
      if (Math.abs(p - s.last) < 0.00005) continue;
      s.last = p;
      render(s, p);
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    observers.forEach((o) => o.disconnect());
  };
}
