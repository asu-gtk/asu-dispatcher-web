import React, { useRef, useEffect } from 'react';
import { Truck, AlertTriangle, Compass, ShieldCheck, Layers } from 'lucide-react';

interface FleetPosition {
  code: string;
  driver: string;
  x: number;
  y: number;
  heading: number;
  speed: number;
  payload: number;
  fuel: number;
  status: string;
  statusColor: string;
}

export function Pit2DOverviewMap({ fleet }: { fleet: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fleetPositions: FleetPosition[] = [
    { code: 'TRUCK-101', driver: 'Доржиев Э.Д.', x: 190, y: 310, heading: 45, speed: 28.5, payload: 131.2, fuel: 75, status: 'С рудой &rarr; Отвал', statusColor: '#059669' },
    { code: 'TRUCK-104', driver: 'Петров Б.В.', x: 380, y: 190, heading: 220, speed: 34.0, payload: 0.0, fuel: 395, status: 'Порожний &rarr; Забой', statusColor: '#0284c7' },
    { code: 'TRUCK-108', driver: 'Лиханов Д.А.', x: 115, y: 395, heading: 90, speed: 0.0, payload: 98.4, fuel: 310, status: 'Погрузка (Забой #2)', statusColor: '#d97706' },
  ];

  const controlPoints = [
    { x: 90, y: 400, label: 'ЭКГ-5А #2 (Забой)', type: 'excavator', alt: '+1620' },
    { x: 350, y: 160, label: 'Hitachi EX3600 (Забой #7)', type: 'excavator', alt: '+1660' },
    { x: 590, y: 70, label: 'Отвал Восток (ДСК-1)', type: 'dump', alt: '+1680' },
    { x: 260, y: 270, label: 'АТЗ-04 (Заправка)', type: 'fuel', alt: '+1640' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Фон карты карьера
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    // Сетка пикетов
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Горизонты и уступы карьера (топография)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    [
      { cx: 220, cy: 260, rx: 190, ry: 140 },
      { cx: 260, cy: 230, rx: 270, ry: 190 },
      { cx: 300, cy: 200, rx: 340, ry: 240 },
      { cx: 350, cy: 170, rx: 420, ry: 290 },
    ].forEach((ring) => {
      ctx.beginPath();
      ctx.ellipse(ring.cx, ring.cy, ring.rx, ring.ry, -0.3, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Сеть технологических дорог
    const roads = [
      [{ x: 90, y: 400 }, { x: 180, y: 320 }, { x: 300, y: 250 }, { x: 440, y: 150 }, { x: 590, y: 70 }],
      [{ x: 300, y: 250 }, { x: 350, y: 160 }],
      [{ x: 180, y: 320 }, { x: 260, y: 270 }],
    ];

    roads.forEach((road) => {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 26;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(road[0].x, road[0].y);
      for (let i = 1; i < road.length; i++) ctx.lineTo(road[i].x, road[i].y);
      ctx.stroke();

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(road[0].x, road[0].y);
      for (let i = 1; i < road.length; i++) ctx.lineTo(road[i].x, road[i].y);
      ctx.stroke();
    });

    // Контрольные точки объектов карьера
    controlPoints.forEach((pt) => {
      ctx.fillStyle = pt.type === 'excavator' ? '#d97706' : pt.type === 'dump' ? '#059669' : '#2563eb';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(pt.label, pt.x + 14, pt.y + 4);
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${pt.alt}м`, pt.x + 14, pt.y + 17);
    });

    // Отрисовка всех самосвалов на карте
    fleetPositions.forEach((truck) => {
      // След движения (хвост)
      ctx.strokeStyle = truck.statusColor;
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(truck.x, truck.y, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Корпус самосвала
      ctx.save();
      ctx.translate(truck.x, truck.y);
      ctx.rotate((truck.heading * Math.PI) / 180);

      ctx.fillStyle = truck.statusColor;
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-10, -8);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-10, 8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      // Информационная карточка над машиной
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(`${truck.code} (${truck.speed} км/ч)`, truck.x + 14, truck.y - 6);

      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${truck.driver} • ${truck.payload > 0 ? `${truck.payload}т` : 'Порожний'}`, truck.x + 14, truck.y + 8);
    });

  }, []);

  return (
    <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col shadow-sm">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="text-xs font-black text-slate-800 uppercase bg-white/95 px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          Общая 2D Карта трафика карьера (3 активных борта)
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={760}
        height={480}
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}
