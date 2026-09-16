import React, { useRef, useEffect, useState } from 'react';
import { Compass, Navigation2, AlertCircle, Layers, ZoomIn, ZoomOut } from 'lucide-react';

interface NavPoint {
  x: number;
  y: number;
  name: string;
  type: 'excavator' | 'dump' | 'waypoint';
  altitude: number;
}

export function DriverNavMap({ vehicleSpeed }: { vehicleSpeed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [progress, setProgress] = useState(0.35);

  // Трасса карьера: координаты контрольных точек
  const waypoints: NavPoint[] = [
    { x: 80, y: 320, name: 'ЭКГ-5А #2 (Забой)', type: 'excavator', altitude: 1620 },
    { x: 160, y: 260, name: 'Вираж Горизонт +1630', type: 'waypoint', altitude: 1630 },
    { x: 280, y: 220, name: 'Разъезд Сектор-2', type: 'waypoint', altitude: 1645 },
    { x: 380, y: 140, name: 'Подъем Трасса #4 (-6%)', type: 'waypoint', altitude: 1660 },
    { x: 520, y: 80, name: 'Отвал Восток (ДСК)', type: 'dump', altitude: 1680 },
  ];

  // Другие машины на трассе для предотвращения столкновений (CAS - Collision Avoidance)
  const nearbyTrucks = [
    { x: 310, y: 200, code: 'БелАЗ-104', speed: 34, heading: 210, dist: '280м' },
    { x: 140, y: 275, code: 'БелАЗ-108', speed: 0, heading: 90, dist: '650м (забой)' },
  ];

  // Анимация движения машины по трассе
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 1.0 ? 0.05 : prev + 0.003));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Отрисовка интерактивной векторной карты навигации
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Очистка фона (темная топографическая карта)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Сетка координат (пикеты)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Изолинии / уступы карьера (топография)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    [
      { cx: 200, cy: 220, rx: 190, ry: 150 },
      { cx: 240, cy: 200, rx: 250, ry: 190 },
      { cx: 280, cy: 180, rx: 320, ry: 240 },
    ].forEach((ring) => {
      ctx.beginPath();
      ctx.ellipse(ring.cx, ring.cy, ring.rx, ring.ry, -0.3, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Отрисовка технологической автодороги
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(waypoints[0].x, waypoints[0].y);
    for (let i = 1; i < waypoints.length; i++) {
      ctx.lineTo(waypoints[i].x, waypoints[i].y);
    }
    ctx.stroke();

    // Разметка полотна дороги
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(waypoints[0].x, waypoints[0].y);
    for (let i = 1; i < waypoints.length; i++) {
      ctx.lineTo(waypoints[i].x, waypoints[i].y);
    }
    ctx.stroke();

    // Маршрутная линия навигатора (Активный маршрут)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(waypoints[0].x, waypoints[0].y);
    for (let i = 1; i < waypoints.length; i++) {
      ctx.lineTo(waypoints[i].x, waypoints[i].y);
    }
    ctx.stroke();

    // Контрольные точки (Забой, Отвал, Виражи)
    waypoints.forEach((pt) => {
      ctx.fillStyle = pt.type === 'excavator' ? '#f59e0b' : pt.type === 'dump' ? '#10b981' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.type === 'waypoint' ? 5 : 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Подписи точек
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(pt.name, pt.x + 12, pt.y + 4);
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`+${pt.altitude}м`, pt.x + 12, pt.y + 16);
    });

    // Другие самосвалы (Система антиколлизии / CAS)
    nearbyTrucks.forEach((trk) => {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(trk.x, trk.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Радиус безопасности
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(trk.x, trk.y, 25, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillStyle = '#93c5fd';
      ctx.fillText(`${trk.code} (${trk.dist})`, trk.x + 10, trk.y - 4);
    });

    // Расчет текущей позиции нашего самосвала на ломаной трассы
    const totalSegments = waypoints.length - 1;
    const currentSegmentIndex = Math.min(totalSegments - 1, Math.floor(progress * totalSegments));
    const segmentProgress = (progress * totalSegments) - currentSegmentIndex;

    const pA = waypoints[currentSegmentIndex];
    const pB = waypoints[currentSegmentIndex + 1];

    const currentX = pA.x + (pB.x - pA.x) * segmentProgress;
    const currentY = pA.y + (pB.y - pA.y) * segmentProgress;
    const angle = Math.atan2(pB.y - pA.y, pB.x - pA.x);

    // Зона безопасности нашего самосвала (радар)
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 35, 0, Math.PI * 2);
    ctx.stroke();

    // Маркер нашего самосвала (Стрелка направления движения)
    ctx.save();
    ctx.translate(currentX, currentY);
    ctx.rotate(angle);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(-10, -8);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, 8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // Метка "ВЫ" над машиной
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('ВЫ (TRUCK-101)', currentX - 45, currentY - 20);

  }, [progress, zoom]);

  return (
    <div className="flex-1 w-full h-full min-h-[360px] bg-slate-950 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col">
      {/* Верхний оверлей навигации */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 text-xs font-mono flex items-center gap-3 shadow-lg">
          <Navigation2 className="w-5 h-5 text-amber-400 rotate-45 animate-pulse" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-sans">Маневр через 350 м</div>
            <div className="text-sm font-bold text-slate-100 font-sans">Плавный правый вираж &rarr; Горизонт +1660м</div>
          </div>
        </div>

        <div className="bg-emerald-950/80 border border-emerald-700/60 px-3 py-2 rounded-2xl text-xs font-mono text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          CAS: ДИСТАНЦИЯ БЕЗОПАСНА (280м)
        </div>
      </div>

      {/* Кнопки масштабирования карты */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
          className="w-10 h-10 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center transition shadow-lg"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
          className="w-10 h-10 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center transition shadow-lg"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>

      {/* Сам холст векторной навигации */}
      <canvas
        ref={canvasRef}
        width={720}
        height={460}
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
}
