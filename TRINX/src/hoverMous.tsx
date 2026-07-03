"use client";

import { useEffect, useRef } from "react";

// ==== Smoke Crackle Cursor Effect — "خط دخان أعرض شوية" ====

type Particle = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  color: string;
  life: number;
  decay: number;
};

const PALETTE = ["#4b4b4b", "#6b6b6b", "#5a5a5a", "#3d3d3d", "#828282", "#707070"];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickColor() {
   return PALETTE[(Math.random() * PALETTE.length) | 0]!;
}

export default function HoverMouse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
     if (!window.matchMedia("(pointer: fine)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: W / 2, y: H / 2, px: W / 2, py: H / 2 };
    let particles: Particle[] = [];
    let rafId = 0;

    function drawCrackLine(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      jag: number,
      color: string,
      alpha: number,
      width: number,
      blur: number
    ) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = width;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.shadowColor = color;
      ctx!.shadowBlur = blur;
      const midx = (x1 + x2) / 2 + rand(-jag, jag);
      const midy = (y1 + y2) / 2 + rand(-jag, jag);
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      ctx!.lineTo(midx, midy);
      ctx!.lineTo(x2, y2);
      ctx!.stroke();
      ctx!.restore();
    }

    function spawnSpark() {
      particles.push({
        x1: mouse.px,
        y1: mouse.py,
        x2: mouse.x,
        y2: mouse.y,
        width: rand(0.9, 1.3),
        color: pickColor(),
        life: 1,
        decay: rand(0.12, 0.22),
      });
    }

    function onMove(x: number, y: number) {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = x;
      mouse.y = y;
      spawnSpark();
    }

    function handleMouseMove(e: MouseEvent) {
      onMove(e.clientX, e.clientY);
    }
    function handleTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      onMove(t.clientX, t.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    function tick() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        drawCrackLine(p.x1, p.y1, p.x2, p.y2, 5, p.color, p.life, p.width, 8);
      }
      rafId = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}