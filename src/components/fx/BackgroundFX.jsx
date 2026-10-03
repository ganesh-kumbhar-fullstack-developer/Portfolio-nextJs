"use client";
import { useEffect, useRef } from "react";

/*
 * "Live message broker" background.
 *
 * Service nodes float in 3D depth and form a mesh. Packets (alert events and lighter
 * heartbeats) hop along curved routes leaving glowing trails, all in the theme green.
 * The cursor is the exchange: nearby nodes bend toward it, packets route into it and are
 * consumed. Clicking publishes a shockwave through the mesh.
 * Scrolling flies through the network with depth parallax and warp streaks.
 */

const ACCENT = [61, 252, 154]; // theme phosphor green

const MARGIN = 120; // off-screen band so nodes wrap smoothly
const LINK = 125; // max link length between nodes
const BROKER_R = 230; // exchange's radius of influence

// Most traffic is heartbeat telemetry; the rest are alert events (bigger, longer trails)
const pickType = () => (Math.random() < 0.6 ? "hb" : "evt");

// Pre-rendered radial glow — far cheaper than shadowBlur
function makeSprite([r, g, b]) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d");
  const grd = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grd.addColorStop(0.16, `rgba(${r},${g},${b},0.9)`);
  grd.addColorStop(0.42, `rgba(${r},${g},${b},0.2)`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = grd;
  x.fillRect(0, 0, 64, 64);
  return c;
}

export default function BackgroundFX() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(pointer: fine)").matches;
    const glow = makeSprite(ACCENT);

    let w = 0;
    let h = 0;
    let H = 0;
    let nodes = [];
    let packets = [];
    const waves = [];
    let maxPackets = 40;
    let frame = 0;
    let time = 0;
    let waveId = 0;

    const mouse = { x: 0, y: 0, last: -1e9 };
    const broker = { x: 0, y: 0, strength: 0, charge: 0, pulse: 0, rot: 0, consumed: [] };
    const tilt = { x: 0, y: 0 };
    let lastScroll = window.scrollY;
    let scrollV = 0;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight + 120; // spare height for mobile address-bar changes
      H = h + MARGIN * 2;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(170, Math.max(55, (w * h) / 8500)));
      maxPackets = w < 640 ? 22 : 42;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * H,
        z: 0.3 + Math.random() * 0.7, // depth: 0.3 far … 1 near
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        sx: 0,
        sy: 0,
        flash: 0,
        wave: -1,
      }));
      packets = [];
      broker.x = w * 0.7;
      broker.y = h * 0.38;
    };

    // Endpoint helpers: -1 is the exchange, anything else is a node index
    const px = (ref) => (ref === -1 ? broker.x : nodes[ref].sx);
    const py = (ref) => (ref === -1 ? broker.y : nodes[ref].sy);

    // Nearest of a few random candidates — a cheap "routing table"
    const neighbour = (i, maxD = 210) => {
      const a = nodes[i];
      let best = -2;
      let bestD = Infinity;
      for (let k = 0; k < 10; k++) {
        const j = (Math.random() * nodes.length) | 0;
        if (j === i) continue;
        const d = Math.hypot(nodes[j].sx - a.sx, nodes[j].sy - a.sy);
        if (d < bestD && d < maxD) {
          bestD = d;
          best = j;
        }
      }
      return best;
    };

    const spawn = (from, to, type, hops) => {
      if (to < -1 || packets.length >= maxPackets * 1.6) return;
      packets.push({
        a: from,
        b: to,
        t: 0,
        x: px(from),
        y: py(from),
        v: 2 + Math.random() * 1.6,
        type,
        hops,
        trail: [],
        bend: (Math.random() - 0.5) * 0.6,
      });
    };

    const nearBroker = (n) => Math.hypot(n.sx - broker.x, n.sy - broker.y) < BROKER_R * broker.strength;

    const publishWave = (x, y) => waves.push({ x, y, r: 0, id: ++waveId });

    // ---------- simulation ----------
    const step = (dt) => {
      time += dt;
      const now = performance.now();
      const mouseActive = now - mouse.last < 3500;

      // Exchange follows the pointer; otherwise it drifts on its own Lissajous path
      const tx = mouseActive ? mouse.x : w * (0.5 + 0.33 * Math.sin(time * 0.00021));
      const ty = mouseActive ? mouse.y : h * (0.42 + 0.26 * Math.sin(time * 0.00029 + 1.3));
      const ease = mouseActive ? 0.14 : 0.025;
      broker.x += (tx - broker.x) * ease;
      broker.y += (ty - broker.y) * ease;
      broker.strength += ((mouseActive ? 1 : 0.65) - broker.strength) * 0.04;
      broker.rot += 0.012 + broker.charge * 0.05;
      broker.charge *= 0.985;
      broker.pulse *= 0.9;

      // Camera tilt (3D parallax) follows the exchange
      tilt.x += ((broker.x / w - 0.5) * 2 - tilt.x) * 0.05;
      tilt.y += ((broker.y / h - 0.5) * 2 - tilt.y) * 0.05;

      // Scroll velocity → depth parallax + warp
      const scrollY = window.scrollY;
      scrollV = scrollV * 0.82 + (scrollY - lastScroll) * 0.18;
      lastScroll = scrollY;
      const par = scrollY * 0.3;

      // Nodes drift in a gentle flow field, projected with depth and lensed toward the exchange
      const R = BROKER_R * broker.strength;
      for (const n of nodes) {
        n.x += n.vx + Math.sin(time * 0.0004 + n.y * 0.008) * 0.05 * n.z;
        n.y += n.vy + Math.cos(time * 0.0004 + n.x * 0.008) * 0.05 * n.z;
        if (n.x < 0) n.x += w;
        else if (n.x > w) n.x -= w;
        if (n.y < 0) n.y += H;
        else if (n.y > H) n.y -= H;

        let sx = n.x - tilt.x * (n.z - 0.6) * 46;
        let sy = ((((n.y - par * n.z) % H) + H) % H) - MARGIN - tilt.y * (n.z - 0.6) * 34;
        const dx = broker.x - sx;
        const dy = broker.y - sy;
        const d = Math.hypot(dx, dy) || 1;
        if (d < R) {
          const f = 1 - d / R;
          const pull = f * f * 42;
          sx += (dx / d) * pull;
          sy += (dy / d) * pull;
        }
        n.sx = sx;
        n.sy = sy;
        n.flash *= 0.93;
      }

      // Background traffic
      if (packets.length < maxPackets && Math.random() < 0.3) {
        const i = (Math.random() * nodes.length) | 0;
        spawn(i, neighbour(i), pickType(), 2 + ((Math.random() * 5) | 0));
      }

      // Packets travel along curved routes
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        const ax = px(p.a);
        const ay = py(p.a);
        const bx = px(p.b);
        const by = py(p.b);
        const dist = Math.hypot(bx - ax, by - ay) || 1;
        // Packets that wrapped across the screen edge just vanish
        if (dist > 420) {
          packets.splice(k, 1);
          continue;
        }
        p.t += (p.v * (p.b === -1 ? 1.5 : 1)) / dist;
        const t = Math.min(1, p.t);
        const cx = (ax + bx) / 2 - ((by - ay) * p.bend) / 2;
        const cy = (ay + by) / 2 + ((bx - ax) * p.bend) / 2;
        const u = 1 - t;
        p.x = u * u * ax + 2 * u * t * cx + t * t * bx;
        p.y = u * u * ay + 2 * u * t * cy + t * t * by;
        p.trail.push(p.x, p.y);
        if (p.trail.length > (p.type === "hb" ? 16 : 26)) p.trail.splice(0, 2);

        if (p.t < 1) continue;

        if (p.b === -1) {
          // Consumed by the exchange — it just pulses
          broker.charge = Math.min(1, broker.charge + (p.type === "hb" ? 0.08 : 0.22));
          broker.pulse = 1;
          broker.consumed.push(now);
          packets.splice(k, 1);
          continue;
        }
        const node = nodes[p.b];
        node.flash = Math.max(node.flash, p.type === "hb" ? 0.5 : 1);
        if (p.hops > 0) {
          const next = nearBroker(node) && Math.random() < 0.8 ? -1 : neighbour(p.b);
          if (next >= -1) {
            p.a = p.b;
            p.b = next;
            p.t = 0;
            p.hops -= 1;
            p.bend = (Math.random() - 0.5) * 0.6;
            continue;
          }
        }
        packets.splice(k, 1);
      }

      // Shockwaves light nodes as the front passes; some nodes fire events
      const maxR = Math.hypot(w, h);
      for (let k = waves.length - 1; k >= 0; k--) {
        const wv = waves[k];
        wv.r += 11;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.wave === wv.id) continue;
          if (Math.hypot(n.sx - wv.x, n.sy - wv.y) < wv.r) {
            n.wave = wv.id;
            n.flash = 1;
            if (Math.random() < 0.16) {
              spawn(i, neighbour(i, 260), "evt", 2 + ((Math.random() * 3) | 0));
            }
          }
        }
        if (wv.r > maxR) waves.splice(k, 1);
      }

      while (broker.consumed.length && now - broker.consumed[0] > 1000) broker.consumed.shift();
    };

    // ---------- render ----------
    const hex = (radius, rot, alpha, dash) => {
      ctx.globalAlpha = alpha;
      ctx.setLineDash(dash);
      ctx.beginPath();
      for (let k = 0; k <= 6; k++) {
        const a = rot + (k * Math.PI) / 3;
        const x = broker.x + Math.cos(a) * radius;
        const y = broker.y + Math.sin(a) * radius;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      // Mesh links, batched into brightness buckets
      const buckets = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (Math.abs(a.z - b.z) > 0.28) continue;
          const dx = a.sx - b.sx;
          if (dx > LINK || dx < -LINK) continue;
          const dy = a.sy - b.sy;
          if (dy > LINK || dy < -LINK) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > LINK) continue;
          const s = (1 - d / LINK) * Math.min(a.z, b.z);
          const bi = Math.min(3, (s * 4) | 0);
          buckets[bi].moveTo(a.sx, a.sy);
          buckets[bi].lineTo(b.sx, b.sy);
        }
      }
      ctx.lineWidth = 0.8;
      for (let k = 0; k < 4; k++) {
        ctx.strokeStyle = `rgba(61,252,154,${0.045 + k * 0.05})`;
        ctx.stroke(buckets[k]);
      }

      // Warp streaks while scrolling fast
      const warp = Math.min(1, Math.abs(scrollV) / 40);
      if (warp > 0.05) {
        const streaks = new Path2D();
        for (const n of nodes) {
          streaks.moveTo(n.sx, n.sy);
          streaks.lineTo(n.sx, n.sy + scrollV * n.z * 2.4);
        }
        ctx.strokeStyle = `rgba(150,255,210,${0.35 * warp})`;
        ctx.lineWidth = 1;
        ctx.stroke(streaks);
      }

      // Nodes: depth → size and brightness
      const dots = [new Path2D(), new Path2D(), new Path2D()];
      for (const n of nodes) {
        const r = 0.6 + n.z * 1.5;
        const bi = n.z < 0.55 ? 0 : n.z < 0.8 ? 1 : 2;
        dots[bi].moveTo(n.sx + r, n.sy);
        dots[bi].arc(n.sx, n.sy, r, 0, Math.PI * 2);
      }
      for (let k = 0; k < 3; k++) {
        ctx.fillStyle = `rgba(160,255,205,${0.25 + k * 0.25})`;
        ctx.fill(dots[k]);
      }

      ctx.globalCompositeOperation = "lighter";

      // Subscriber links into the exchange
      const R = BROKER_R * broker.strength;
      ctx.lineWidth = 1;
      for (const n of nodes) {
        const d = Math.hypot(n.sx - broker.x, n.sy - broker.y);
        if (d > R) continue;
        const a = (1 - d / R) * 0.5 * broker.strength * n.z;
        const g = ctx.createLinearGradient(n.sx, n.sy, broker.x, broker.y);
        g.addColorStop(0, `rgba(61,252,154,${a * 0.4})`);
        g.addColorStop(1, `rgba(61,252,154,${a})`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(n.sx, n.sy);
        ctx.lineTo(broker.x, broker.y);
        ctx.stroke();
      }

      // Node flashes
      for (const n of nodes) {
        if (n.flash < 0.05) continue;
        const s = 10 + 26 * n.flash * n.z;
        ctx.globalAlpha = n.flash * 0.9;
        ctx.drawImage(glow, n.sx - s / 2, n.sy - s / 2, s, s);
      }

      // Packets: fading trail + glowing head
      ctx.lineCap = "round";
      for (const p of packets) {
        const [r, g, b] = ACCENT;
        const tr = p.trail;
        const segs = tr.length / 2 - 1;
        ctx.strokeStyle = `rgb(${r},${g},${b})`;
        for (let s = 0; s < segs; s++) {
          const f = (s + 1) / segs;
          ctx.globalAlpha = f * (p.type === "hb" ? 0.35 : 0.75);
          ctx.lineWidth = (p.type === "hb" ? 1 : 1.8) * f;
          ctx.beginPath();
          ctx.moveTo(tr[s * 2], tr[s * 2 + 1]);
          ctx.lineTo(tr[s * 2 + 2], tr[s * 2 + 3]);
          ctx.stroke();
        }
        const size = p.type === "hb" ? 10 : 18;
        ctx.globalAlpha = p.type === "hb" ? 0.7 : 1;
        ctx.drawImage(glow, p.x - size / 2, p.y - size / 2, size, size);
      }

      // Shockwaves
      const maxR = Math.hypot(w, h);
      for (const wv of waves) {
        const life = 1 - wv.r / maxR;
        ctx.globalAlpha = life * 0.55;
        ctx.strokeStyle = "rgb(61,252,154)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = life * 0.25;
        ctx.strokeStyle = "rgb(61,252,154)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, Math.max(0, wv.r - 26), 0, Math.PI * 2);
        ctx.stroke();
      }

      // The exchange: glowing core + counter-rotating hexagons
      const st = broker.strength;
      const core = 34 + broker.charge * 46 + broker.pulse * 18;
      ctx.globalAlpha = (0.35 + broker.charge * 0.6) * st;
      ctx.drawImage(glow, broker.x - core / 2, broker.y - core / 2, core, core);
      ctx.globalAlpha = 0.45 * st + broker.pulse * 0.3;
      ctx.drawImage(glow, broker.x - 9, broker.y - 9, 18, 18);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgb(61,252,154)";
      hex(20 + broker.pulse * 6, broker.rot, 0.65 * st, []);
      ctx.strokeStyle = "rgb(61,252,154)";
      hex(34 + broker.charge * 8, -broker.rot * 0.6, 0.3 * st, [4, 6]);

      // Live label beside the exchange (desktop, while the pointer drives it)
      if (finePointer && st > 0.8) {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = Math.min(1, (st - 0.8) * 5) * 0.65;
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = "#8798a8";
        ctx.fillText("exchange://events", broker.x + 44, broker.y - 30);
        ctx.fillStyle = "#3dfc9a";
        ctx.fillText(`${broker.consumed.length * 7} msg/s · consumed`, broker.x + 44, broker.y - 17);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    let lastT = performance.now();
    const loop = (now) => {
      const dt = Math.min(50, now - lastT);
      lastT = now;
      step(dt);
      draw();
      frame = requestAnimationFrame(loop);
    };

    // ---------- input ----------
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.last = performance.now();
    };
    const onDown = (e) => {
      publishWave(e.clientX, e.clientY);
      if (e.pointerType !== "mouse") {
        // Touch: the exchange jumps to the tap for a moment
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.last = performance.now();
      }
    };
    const onLeave = () => {
      mouse.last = -1e9;
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!document.hidden) {
        lastT = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    const onResize = () => {
      // ignore mobile address-bar height jitter
      if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 160) return;
      lastW = window.innerWidth;
      lastH = window.innerHeight;
      init();
      if (reduce) {
        for (let i = 0; i < 90; i++) step(16);
        draw();
      }
    };

    init();
    let onlineTimer = 0;
    if (reduce) {
      // A single, still frame
      for (let i = 0; i < 90; i++) step(16);
      draw();
    } else {
      // The network "comes online" once the boot screen is gone
      const booting = !document.documentElement.classList.contains("booted");
      onlineTimer = setTimeout(() => publishWave(broker.x, broker.y), booting ? 1500 : 400);
      frame = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(onlineTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="bg-fx" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
