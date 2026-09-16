import React, { useState, useEffect } from 'react';
import { DriverNavMap } from './DriverNavMap';
import {
  Truck,
  Fuel,
  Gauge,
  Weight,
  MapPin,
  Radio,
  Clock,
  ArrowRight,
  ShieldAlert,
  Layers,
  Flame,
  AlertTriangle
} from 'lucide-react';

export function DriverTabletView() {
  const [speed, setSpeed] = useState(28.5);
  const [payload, setPayload] = useState(128.4);
  const [fuel, setFuel] = useState(385);
  const [tripState, setTripState] = useState<'TO_EXCAVATOR' | 'LOADING' | 'TO_DUMP' | 'UNLOADING'>('TO_DUMP');
  const [sosActive, setSosActive] = useState(false);

  // Имитация динамики скорости
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const delta = (Math.random() - 0.48) * 1.5;
        return Math.max(0, Math.min(45, Number((prev + delta).toFixed(1))));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextStep = () => {
    if (tripState === 'TO_EXCAVATOR') setTripState('LOADING');
    else if (tripState === 'LOADING') setTripState('TO_DUMP');
    else if (tripState === 'TO_DUMP') setTripState('UNLOADING');
    else if (tripState === 'UNLOADING') setTripState('TO_EXCAVATOR');
  };

  return (
    <div className="flex-1 flex flex-col bg-black text-white p-4 select-none font-sans overflow-hidden">
      {/* Верхняя строка статуса планшета */}
      <header className="h-14 bg-slate-900 border border-slate-800 rounded-2xl px-6 flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black text-sm">
            101
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              БелАЗ-75131 • Борт №101
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-slate-400">Водитель: Иванов А. С. (Смена #1)</div>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-sm">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>GPS: 42.8746, 74.5698</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>11:42:08</span>
          </div>
          <button
            onClick={() => setSosActive(!sosActive)}
            className={`px-4 py-1.5 rounded-xl font-bold flex items-center gap-2 transition ${
              sosActive
                ? 'bg-red-600 text-white animate-bounce'
                : 'bg-red-950/60 border border-red-800 text-red-400 hover:bg-red-900/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            {sosActive ? 'СИГНАЛ SOS ОТПРАВЛЕН' : 'SOS / АВАРИЯ'}
          </button>
        </div>
      </header>

      {/* Основная рабочая зона планшета */}
      <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
        {/* Левая колонка: Карта навигации и текущее задание */}
        <div className="col-span-8 flex flex-col gap-3 min-h-0">
          {/* Интерактивная карта навигации карьера */}
          <div className="flex-1 min-h-0">
            <DriverNavMap vehicleSpeed={speed} />
          </div>

          {/* Панель текущего рейсового задания */}
          <div className="h-28 bg-slate-900 border-2 border-amber-500/50 rounded-2xl px-6 py-3 flex items-center justify-between shrink-0 shadow-xl shadow-amber-500/5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-[11px] font-bold uppercase tracking-wider border border-amber-500/30">
                  Рейс #14 (План: 18)
                </span>
                <span className="text-xs text-slate-300">
                  Вид: <strong className="text-emerald-400">Руда товарная</strong> • Плечо: <strong>3.2 км</strong>
                </span>
              </div>

              <div className="text-lg font-black text-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  {tripState === 'TO_EXCAVATOR' && 'Следовать под погрузку: ЭКГ-5А #2 (Горизонт +1620м)'}
                  {tripState === 'LOADING' && 'Идет погрузка в забое (Экскаватор #2)'}
                  {tripState === 'TO_DUMP' && 'Транспортировка руды: Отвал Восток (Сектор 3)'}
                  {tripState === 'UNLOADING' && 'Разгрузка на приемном бункере ДСК-1'}
                </span>
              </div>
            </div>

            {/* Большая кнопка подтверждения этапа */}
            <button
              onClick={handleNextStep}
              className="px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-base rounded-2xl flex items-center gap-3 transition transform active:scale-95 shadow-lg shadow-amber-500/20 shrink-0"
            >
              <span>
                {tripState === 'TO_EXCAVATOR' && 'ПРИБЫЛ'}
                {tripState === 'LOADING' && 'В ПУТЬ'}
                {tripState === 'TO_DUMP' && 'НА РАЗГРУЗКЕ'}
                {tripState === 'UNLOADING' && 'СЛЕДУЮЩИЙ РЕЙС'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Правая колонка: Приборы HUD и датчики */}
        <div className="col-span-4 flex flex-col gap-3">
          {/* Спидометр */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Скорость</div>
                <div className="text-3xl font-black font-mono text-cyan-400 tracking-tight">
                  {speed} <span className="text-xs text-slate-400 font-sans">км/ч</span>
                </div>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-slate-400">
              Лимит: 40 км/ч
            </div>
          </div>

          {/* Вес в кузове */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Weight className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Вес в кузове</div>
                <div className="text-3xl font-black font-mono text-emerald-400 tracking-tight">
                  {payload} <span className="text-xs text-slate-400 font-sans">т</span>
                </div>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono">
              <div className="text-slate-400">Ном: 130 т</div>
              <div className="text-emerald-400 font-bold">98.7%</div>
            </div>
          </div>

          {/* Остаток топлива */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Fuel className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Остаток ГСМ</div>
                <div className="text-3xl font-black font-mono text-amber-400 tracking-tight">
                  {fuel} <span className="text-xs text-slate-400 font-sans">л</span>
                </div>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-slate-400">
              64% (385/600л)
            </div>
          </div>

          {/* Быстрые статусы водителя */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 text-left transition flex flex-col justify-between">
              <Clock className="w-5 h-5 text-amber-400" />
              <div className="text-xs font-bold text-slate-200">Обед / Перерыв</div>
            </button>

            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 text-left transition flex flex-col justify-between">
              <Fuel className="w-5 h-5 text-blue-400" />
              <div className="text-xs font-bold text-slate-200">Запрос на ГСМ</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
