import React, { useState } from 'react';
import { OpenPit3DScene } from './components/OpenPit3DScene';
import {
  Truck,
  Activity,
  BarChart3,
  Sliders,
  FileSpreadsheet,
  Gauge,
  Layers,
  Fuel,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Clock,
  Shield,
  Sparkles,
  Construction,
  AlertCircle,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

interface FleetItem {
  code: string;
  model: string;
  driver: string;
  status: string;
  fuel: number;
  payload: number;
  speed: number;
  statusColor: string;
  bench: string;
}

const mockFleet: FleetItem[] = [
  { code: 'TRUCK-101', model: 'БелАЗ-75131 (130т)', driver: 'Доржиев Э.Д.', status: 'В движении с рудой', fuel: 75, payload: 131.2, speed: 28.5, statusColor: 'bg-amber-500', bench: 'Горизонт +1620' },
  { code: 'TRUCK-104', model: 'БелАЗ-75131 (130т)', driver: 'Петров Б.В.', status: 'Возврат порожним', fuel: 395, payload: 0.0, speed: 34.0, statusColor: 'bg-cyan-500', bench: 'Горизонт +1640' },
  { code: 'TRUCK-108', model: 'CAT 777 (100т)', driver: 'Лиханов Д.А.', status: 'Под погрузкой', fuel: 310, payload: 98.4, speed: 0.0, statusColor: 'bg-amber-500', bench: 'Горизонт +1620' },
  { code: 'EXC-02', model: 'ЭКГ-5А (5.0 м³)', driver: 'Сидоров Д.А.', status: 'Погрузка в забое', fuel: 0, payload: 9.0, speed: 0.0, statusColor: 'bg-amber-500', bench: 'Забой #2 (+1620)' },
  { code: 'EXC-07', model: 'Hitachi EX3600 (21 м³)', driver: 'Жолдошев Т.К.', status: 'Погрузка в забое', fuel: 0, payload: 37.8, speed: 0.0, statusColor: 'bg-emerald-500', bench: 'Забой #7 (+1660)' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'3d' | 'optimizer' | 'fleet' | 'reports'>('3d');
  const [optimizing, setOptimizing] = useState(false);
  const [optSuccess, setOptSuccess] = useState(false);

  const handleRunOptimizer = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptSuccess(true);
      setTimeout(() => setOptSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a0e14] text-slate-100 font-sans overflow-hidden select-none">
      {/* Левая боковая панель АСУ ГТК */}
      <aside className="w-64 bg-[#111620] border-r border-[#1d2636] flex flex-col justify-between shrink-0">
        <div>
          {/* Бренд АСУ ГТК */}
          <div className="p-4 border-b border-[#1d2636] flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm tracking-wider uppercase text-slate-100">АСУ ГТК</div>
              <div className="text-[11px] text-slate-400 font-medium">Диспетчерский центр</div>
            </div>
          </div>

          {/* Меню навигации */}
          <nav className="p-3 space-y-1.5">
            <button
              onClick={() => setActiveTab('3d')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                activeTab === '3d'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#18202c]'
              }`}
            >
              <Activity className="w-4 h-4" />
              3D Карьер & Мониторинг
            </button>

            <button
              onClick={() => setActiveTab('optimizer')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                activeTab === 'optimizer'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#18202c]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Симплекс-Оптимизация
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                activeTab === 'fleet'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#18202c]'
              }`}
            >
              <Truck className="w-4 h-4" />
              Парк техники (18 ед.)
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                activeTab === 'reports'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#18202c]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Сменные отчеты & Аналитика
            </button>
          </nav>
        </div>

        {/* Футер статуса бэкенда */}
        <div className="p-4 border-t border-[#1d2636] bg-[#0c1017]">
          <div className="text-[11px] text-slate-400 flex items-center justify-between mb-2">
            <span>Java Core Server</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ONLINE :8080
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>UDP Telemetry</span>
            <span className="font-mono text-cyan-400 font-bold">PORT 9999</span>
          </div>
        </div>
      </aside>

      {/* Основная рабочая область диспетчера */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Верхняя KPI-панель смены */}
        <header className="h-16 bg-[#111620] border-b border-[#1d2636] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-xs font-bold text-slate-200">Смена #1 (08:00 – 20:00)</div>
              <div className="text-[11px] text-slate-400">Участок «Северный карьер» • Руда / Вскрыша</div>
            </div>

            <div className="h-8 w-px bg-[#1d2636]"></div>

            <div className="flex items-center gap-8">
              {/* Объем */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-emerald-400">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Объем смены</div>
                  <div className="text-xs font-bold font-mono text-slate-100">14,820 т / 16,000 т (92.6%)</div>
                </div>
              </div>

              {/* Расход ГСМ */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-700/40 flex items-center justify-center text-amber-400">
                  <Fuel className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Расход ГСМ</div>
                  <div className="text-xs font-bold font-mono text-slate-100">2,340 л (0.158 л/т)</div>
                </div>
              </div>

              {/* Себестоимость */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-cyan-400">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Себестоимость т·км</div>
                  <div className="text-xs font-bold font-mono text-cyan-300">14.82 руб / (т·км)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="http://localhost:8080/api/v1/reports/shift/xlsx"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 bg-[#18202c] hover:bg-[#222d3d] border border-[#2d3b4e] rounded-xl text-xs font-bold text-slate-200 transition shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Excel Отчет (.xlsx)</span>
            </a>

            <button
              onClick={handleRunOptimizer}
              disabled={optimizing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg shadow-amber-500/10 disabled:opacity-50"
            >
              <Sliders className="w-4 h-4" />
              <span>{optimizing ? 'Расчет...' : 'Авто-Оптимизация'}</span>
            </button>
          </div>
        </header>

        {/* Рабочая сетка диспетчера */}
        <div className="flex-1 p-4 grid grid-cols-12 gap-4 min-h-0">
          {/* Левая 3D-сцена и журнал телеметрии */}
          <div className="col-span-8 flex flex-col gap-4 min-h-0">
            <div className="flex-1 min-h-0">
              <OpenPit3DScene />
            </div>

            {/* Консоль телеметрии самосвалов в реальном времени */}
            <div className="h-44 bg-[#111620] border border-[#1d2636] rounded-3xl p-4 flex flex-col overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                    Журнал UDP-Телеметрии в реальном времени
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">2.5 Hz RT-STREAM</span>
              </div>
              <div className="flex-1 overflow-auto font-mono text-xs space-y-1.5 text-slate-300 pr-1">
                <div className="text-amber-400 flex items-center justify-between font-bold">
                  <span>[03:15:10] AI PREDICT: Борт #101 остаток ГСМ 75л &rarr; Запланирован заезд на АТЗ-04 (+1640м)</span>
                  <span className="text-amber-500 font-normal">AUTO-ROUTE</span>
                </div>
                <div className="text-emerald-400 flex items-center justify-between">
                  <span>[03:15:08] UDP: TRUCK-101 (Lat 42.8746, Lon 74.5698) V=28.5 km/h, Груз=131.2т, Топливо=75л</span>
                  <span className="text-slate-500">24ms</span>
                </div>
                <div className="text-cyan-400 flex items-center justify-between">
                  <span>[03:15:05] UDP: TRUCK-104 (Lat 42.8710, Lon 74.5620) V=34.0 km/h, Порожний, Топливо=395л</span>
                  <span className="text-slate-500">22ms</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>[03:15:01] EVENT: EXC-02 Завершена погрузка борта TRUCK-108 (98.4т) &rarr; Назначен Отвал-Восток</span>
                  <span className="text-slate-500">80ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка: Предиктивный радар рисков & Парк на линии */}
          <div className="col-span-4 flex flex-col gap-4 min-h-0">
            {/* Блок предиктивной аналитики и прогнозирования инцидентов */}
            <div className="bg-[#111620] border-2 border-amber-500/40 rounded-3xl p-4 flex flex-col gap-2.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-black text-slate-100 uppercase tracking-wider">
                    Предиктивный радар рисков
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-mono font-bold">
                  2 события
                </span>
              </div>

              {/* Событие 1: Прогноз топлива */}
              <div className="bg-[#161d29] p-2.5 rounded-2xl border border-[#273449] flex items-start gap-2.5">
                <Fuel className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-slate-200">Борт #101: Остаток ГСМ 75 л (~45 мин)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Прогноз: остановка через 2 рейса. Маршрут автоматически перестроен через АТЗ-04.
                  </div>
                </div>
              </div>

              {/* Событие 2: Очередь экскаватора */}
              <div className="bg-[#161d29] p-2.5 rounded-2xl border border-[#273449] flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-slate-200">Забой #2: Риск затора (3 самосвала)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Симплекс перенаправил борт #108 на свободный забой #7 (Hitachi EX3600).
                  </div>
                </div>
              </div>
            </div>

            {/* Реестр парка на линии */}
            <div className="flex-1 bg-[#111620] border border-[#1d2636] rounded-3xl p-4 flex flex-col min-h-0 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Парк на линии</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">5 активных ед.</span>
              </div>

              <div className="flex-1 overflow-auto space-y-2 pr-1">
                {mockFleet.map((v) => (
                  <div
                    key={v.code}
                    className="p-2.5 bg-[#151b24] border border-[#222d3d] rounded-2xl flex items-center justify-between hover:border-amber-500/40 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${v.statusColor}`}></span>
                        <span className="font-mono font-bold text-xs text-slate-100">{v.code}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">{v.model}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{v.bench} • {v.status}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-amber-400">{v.payload > 0 ? `${v.payload} т` : 'Порожний'}</div>
                      <div className={`text-[11px] font-bold ${v.fuel <= 80 ? 'text-amber-400' : 'text-slate-400'}`}>
                        {v.fuel > 0 ? `${v.fuel} л` : '-'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карточка Симплекс-распределения */}
            <div className="h-44 bg-[#111620] border border-[#1d2636] rounded-3xl p-4 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Симплекс-Оптимизация</h3>
                </div>
                {optSuccess && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Оптимум
                  </span>
                )}
              </div>

              <div className="bg-[#151b24] p-2.5 rounded-2xl border border-[#222d3d] text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>ЭКГ-5А #2 (L=3.2 км)</span>
                  <span className="text-amber-400 font-bold">2 БелАЗ-75131</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Hitachi EX3600 (L=2.4 км)</span>
                  <span className="text-amber-400 font-bold">3 CAT 777</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-[#222d3d]">
                  <span>Экономия:</span>
                  <span>-84,200 руб</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
