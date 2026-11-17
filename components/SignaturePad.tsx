"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eraser } from "lucide-react";

type Props = {
  label: string;
  required?: boolean;
  error?: string;
  /** Called with a PNG data URL after each stroke, or "" when cleared. */
  onChange: (dataUrl: string) => void;
};

/** Minimal pointer-based signature pad; exports a PNG data URL. */
export default function SignaturePad({ label, required, error, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const inkRef = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  // Size the backing store to the rendered width × device pixel ratio.
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const { width } = canvas.getBoundingClientRect();
    const height = 180;
    // Preserve existing ink across resizes.
    const prev = inkRef.current ? canvas.toDataURL("image/png") : null;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#22303c";
    if (prev) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, width, height);
      img.src = prev;
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = point(e);
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx || !last.current) return;
    // Dot for a tap.
    ctx.beginPath();
    ctx.arc(last.current.x, last.current.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = "#22303c";
    ctx.fill();
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    e.preventDefault();
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const end = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    inkRef.current = true;
    setHasInk(true);
    onChange(e.currentTarget.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    inkRef.current = false;
    setHasInk(false);
    onChange("");
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="block text-[13px] font-bold tracking-[0.02em]">
          {label}
          {required && <span className="text-[#d1495b]"> *</span>}
        </span>
        <button
          type="button"
          onClick={clear}
          disabled={!hasInk}
          className="inline-flex items-center gap-1 text-[12px] font-bold tracking-[0.06em] text-navy/60 hover:text-navy disabled:opacity-40"
        >
          <Eraser className="h-3.5 w-3.5" strokeWidth={2.4} /> CLEAR
        </button>
      </div>
      <div
        className={`relative overflow-hidden rounded-[14px] border bg-card ${
          error ? "border-[#d1495b]" : "border-navy/15"
        }`}
      >
        <canvas
          ref={canvasRef}
          className="block w-full touch-none"
          style={{ height: 180 }}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={(e) => {
            if (drawing.current) end(e);
          }}
          aria-label={label}
          role="img"
        />
        {!hasInk && (
          <span className="pointer-events-none absolute inset-x-0 bottom-9 text-center font-script text-[22px] text-navy/35">
            sign here with your finger or mouse
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-6 bottom-7 border-b border-dashed border-navy/25" />
      </div>
      {error && (
        <p className="mt-1.5 text-[13px] font-bold text-[#d1495b]">{error}</p>
      )}
    </div>
  );
}
