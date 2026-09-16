import React, { useState, useEffect } from 'react';
import {
  Truck,
  AlertTriangle,
  Fuel,
  Gauge,
  Weight,
  MapPin,
  CheckCircle,
  Radio,
  Clock,
  Compass,
  ArrowRight,
  ShieldAlert
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
      <header className="h-14 bg-slate-900 border border-slate-800 rounded-2xl px-6 flex items-center justify-between mb-4 shrink-0">
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
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Левая колонка: Текущее маршрутное задание */}
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          {/* Блок активного задания */}
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 flex flex-col justify-between shrink-0 shadow-xl shadow-amber-500/5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  Текущий рейс #14
                </span>
                <span className="text-xs font-mono text-slate-400">План смены: 18 рейсов</span>
              </div>

              <div className="text-2xl font-black text-slate-100 flex items-center gap-3 mb-2">
                <MapPin className="w-7 h-7 text-amber-400" />
                {tripState === 'TO_EXCAVATOR' && 'Следовать под погрузку: ЭКГ-5А #2'}
                {tripState === 'LOADING' && 'Идет погрузка в забое (Горизонт +1620м)'}
                {tripState === 'TO_DUMP' && 'Транспортировка руды: Отвал-Восток (Сектор 3)'}
                {tripState === 'UNLOADING' && 'Разгрузка на бункере ДСК-1'}
              </div>

              <div className="text-sm text-slate-300 flex items-center gap-4 mt-2">
                <span>Плечо откатки: <strong>3.2 км</strong></span>
                <span>•</span>
                <span>Вид горной массы: <strong className="text-emerald-400">Руда товарная</strong></span>
              </div>
            </div>

            {/* Большая кнопка подтверждения этапа для сенсорного экрана */}
            <button
              onClick={handleNextStep}
              className="mt-6 w-full py-5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition transform active:scale-98 shadow-lg shadow-amber-500/20"
            >
              <span>
                {tripState === 'TO_EXCAVATOR' && 'ПРИБЫЛ ПОД ПОГРУЗКУ'}
                {tripState === 'LOADING' && 'ПОГРУЗКА ЗАВЕРШЕНА (В ПУТЬ)'}
                {tripState === 'TO_DUMP' && 'ПРИБЫЛ НА ТОЧКУ РАЗГРУЗКИ'}
                {tripState === 'UNLOADING' && 'РАЗГРУЗКА ЗАВЕРШЕНА (НОВЫЙ РЕЙС)'}
              </span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Интерактивная схема маршрута для водителя */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between overflow-hidden">
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Навигационная подсказка (Трасса #4)
            </div>

            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono">
              <div className="text-center">
                <div className="text-xs text-slate-400">Забой</div>
                <div className="text-base font-bold text-amber-400">ЭКГ-5А #2</div>
                <div className="text-[10px] text-slate-500">+1620 м</div>
              </div>

              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="text-xs text-slate-400 mb-1">Осталось 1.8 км (уклон -6%)</div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-3/5 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-slate-400">Пункт разгрузки</div>
                <div className="text-base font-bold text-emerald-400">Отвал Восток</div>
                <div className="text-[10px] text-slate-500">+1680 м</div>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center justify-between mt-2">
              <span>Рекомендуемая скорость: <strong className="text-slate-200">30 км/ч</strong></span>
              <span>Ограничение на вираже: <strong className="text-amber-400">20 км/ч</strong></span>
            </div>
          </div>
        </div>

        {/* Правая колонка: Приборы и датчики (Крупные виджеты) */}
        <div className="col-span-5 flex flex-col gap-4">
          {/* Спидометр */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Gauge className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Скорость</div>
                <div className="text-4xl font-black font-mono text-cyan-400 tracking-tight">{speed} <span className="text-base text-slate-400 font-sans">км/ч</span></div>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-slate-400">
              Лимит: 40 км/ч
            </div>
          </div>

          {/* Вес груза в кузове (Тензодатчик) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Weight className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Вес в кузове</div>
                <div className="text-4xl font-black font-mono text-emerald-400 tracking-tight">{payload} <span className="text-base text-slate-400 font-sans">т</span></div>
              </div>
            </div>
            <div className="text-right text-xs font-mono">
              <div className="text-slate-400">Номинал: 130 т</div>
              <div className="text-emerald-400 font-bold">Загрузка: 98.7%</div>
            </div>
          </div>

          {/* Уровень топлива в баке */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Fuel className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Остаток ГСМ</div>
                <div className="text-4xl font-black font-mono text-amber-400 tracking-tight">{fuel} <span className="text-base text-slate-400 font-sans">л</span></div>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-slate-400">
              Бак: 600 л (64%)
            </div>
          </div>

          {/* Быстрые кнопки статусов водителя */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 text-left transition flex flex-col justify-between">
              <Clock className="w-5 h-5 text-amber-400 mb-1" />
              <div className="text-xs font-bold text-slate-200">Технологический перерыв / Обед</div>
            </button>

            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 text-left transition flex flex-col justify-between">
              <Fuel className="w-5 h-5 text-blue-400 mb-1" />
              <div className="text-xs font-bold text-slate-200">Запрос на заправку ГСМ</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
