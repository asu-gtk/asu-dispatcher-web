import React, { useState } from 'react';
import { OpenPit3DScene } from './components/OpenPit3DScene';
import { DriverTabletView } from './components/DriverTabletView';
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
  Smartphone,
  Monitor
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
}

const mockFleet: FleetItem[] = [
  { code: 'TRUCK-101', model: 'БелАЗ-75131 (130т)', driver: 'Иванов А.С.', status: 'В движении с рудой', fuel: 420, payload: 131.2, speed: 28.5, statusColor: 'bg-emerald-500' },
  { code: 'TRUCK-104', model: 'БелАЗ-75131 (130т)', driver: 'Петров Б.В.', status: 'Возврат порожним', fuel: 395, payload: 0.0, speed: 34.0, statusColor: 'bg-blue-500' },
  { code: 'TRUCK-108', model: 'CAT 777 (100т)', driver: 'Асанов К.М.', status: 'Под погрузкой', fuel: 310, payload: 98.4, speed: 0.0, statusColor: 'bg-amber-500' },
  { code: 'EXC-02', model: 'ЭКГ-5А (5.0 м³)', driver: 'Сидоров Д.А.', status: 'Погрузка в забое', fuel: 0, payload: 9.0, speed: 0.0, statusColor: 'bg-amber-500' },
  { code: 'EXC-07', model: 'Hitachi EX3600 (21 м³)', driver: 'Жолдошев Т.К.', status: 'Погрузка в забое', fuel: 0, payload: 37.8, speed: 0.0, statusColor: 'bg-emerald-500' },
];

export default function App() {
  const [roleMode, setRoleMode] = useState<'dispatcher' | 'driver'>('dispatcher');
  const [activeTab, setActiveTab] = useState<'map' | 'optimizer' | 'fleet' | 'reports'>('map');
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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Главный селектор роли в шапке */}
      <div className="h-11 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Режим интерфейса:</span>
          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setRoleMode('dispatcher')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
                roleMode === 'dispatcher'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Диспетчерский центр (3D & Аналитика)
            </button>

            <button
              onClick={() => setRoleMode('driver')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
                roleMode === 'driver'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Бортовой терминал водителя (Планшет в кабине)
            </button>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Core Online (:8080)
          </span>
        </div>
      </div>

      {/* Отображение выбранного интерфейса */}
      {roleMode === 'driver' ? (
        <DriverTabletView />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Боковая панель навигации диспетчера */}
          <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
            <div>
              <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-bold text-sm tracking-wider uppercase">АСУ ГТК</h1>
                  <p className="text-xs text-slate-400">Горно-транспортный комплекс</p>
                </div>
              </div>

              <nav className="p-3 space-y-1">
                <button
                  onClick={() => setActiveTab('map')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'map' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  3D Мониторинг & Карта
                </button>

                <button
                  onClick={() => setActiveTab('optimizer')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'optimizer' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  Симплекс-Оптимизация
                </button>

                <button
                  onClick={() => setActiveTab('fleet')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'fleet' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  Парк техники (18)
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'reports' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Аналитика & Отчеты
                </button>
              </nav>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-2">
                <span>Статус Core API</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  200 OK :8080
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>UDP Телеметрия</span>
                <span className="font-mono text-slate-300">PORT 9999</span>
              </div>
            </div>
          </aside>

          {/* Основной контент диспетчера */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Верхняя панель KPI */}
            <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-400">Смена #1 (08:00 – 20:00)</div>
                  <div className="text-sm font-semibold text-slate-200">Горизонт +1620м • Вскрыша / Руда</div>
                </div>

                <div className="h-8 w-px bg-slate-800"></div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Объем смены</div>
                      <div className="text-xs font-mono font-bold text-slate-100">14,820 т / 16,000 т</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Расход ГСМ</div>
                      <div className="text-xs font-mono font-bold text-slate-100">2,340 л (0.158 л/т)</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Себестоимость</div>
                      <div className="text-xs font-mono font-bold text-cyan-300">14.82 руб / (т·км)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/api/v1/reports/shift/xlsx"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  Экспорт в Excel (.xlsx)
                </a>

                <button
                  onClick={handleRunOptimizer}
                  disabled={optimizing}
                  className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  <Sliders className="w-4 h-4" />
                  {optimizing ? 'Расчет симплекса...' : 'Авто-Оптимизация'}
                </button>
              </div>
            </header>

            {/* Рабочая зона */}
            <div className="flex-1 p-4 grid grid-cols-12 gap-4 overflow-hidden">
              {/* 3D Вьюпорт / Сцена карьера */}
              <div className="col-span-8 flex flex-col gap-4 overflow-hidden">
                <div className="flex-1 min-h-0">
                  <OpenPit3DScene />
                </div>

                {/* Быстрый статус рейсов */}
                <div className="h-44 bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Телеметрия в реальном времени</span>
                    <span className="text-xs font-mono text-emerald-400">Частота: 2.5 Гц</span>
                  </div>
                  <div className="flex-1 overflow-auto font-mono text-xs space-y-1 text-slate-300">
                    <div className="text-emerald-400">[03:14:22] UDP RECEIVE: TRUCK-101 (Lat 42.8746, Lon 74.5698) V=28.5 km/h, Payload=131.2t, Fuel=420L</div>
                    <div className="text-blue-400">[03:14:21] UDP RECEIVE: TRUCK-104 (Lat 42.8710, Lon 74.5620) V=34.0 km/h, Payload=0.0t, Fuel=395L</div>
                    <div className="text-amber-400">[03:14:19] EVENT: EXC-02 Завершена погрузка самосвала TRUCK-108 (98.4т) &rarr; Назначен Отвал-Восток</div>
                    <div className="text-slate-500">[03:14:15] OPTIMIZER: Пересчет целевой функции. Отклонение себестоимости: -4.2%</div>
                  </div>
                </div>
              </div>

              {/* Правая колонка: Парк техники & Оптимизация */}
              <div className="col-span-4 flex flex-col gap-4 overflow-hidden">
                {/* Карточка парка на линии */}
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      Парк на линии
                    </h3>
                    <span className="text-xs font-mono text-slate-400">5 ед. активно</span>
                  </div>

                  <div className="flex-1 overflow-auto space-y-2 pr-1">
                    {mockFleet.map((v) => (
                      <div key={v.code} className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${v.statusColor}`}></span>
                            <span className="font-mono font-bold text-xs text-slate-200">{v.code}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{v.model}</div>
                          <div className="text-[10px] text-slate-500">{v.status}</div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-xs font-bold text-amber-400">{v.payload > 0 ? `${v.payload} т` : 'Порожний'}</div>
                          <div className="text-[11px] text-slate-400">{v.fuel > 0 ? `${v.fuel} л` : '-'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Карточка Симплекс-распределения */}
                <div className="h-56 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-cyan-400" />
                        Симплекс-Оптимизация
                      </h3>
                      {optSuccess && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Оптимум найден
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      Минимизация себестоимости 1 тонно-километра через алгоритм линейного программирования Apache Commons Math.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>ЭКГ-5А #2 (L=3.2 км)</span>
                      <span className="text-amber-400 font-bold">2 БелАЗ-75131</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Hitachi EX3600 (L=2.4 км)</span>
                      <span className="text-amber-400 font-bold">3 CAT 777</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                      <span>Экономия за смену:</span>
                      <span>-84,200 руб</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
