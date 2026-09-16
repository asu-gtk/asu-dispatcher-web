import React, { useState } from 'react';
import { OpenPit3DScene } from './components/OpenPit3DScene';
import { Pit2DOverviewMap } from './components/Pit2DOverviewMap';
import { BroadcastModal } from './components/BroadcastModal';
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
  BrainCircuit,
  Send,
  Map
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
  { code: 'TRUCK-101', model: 'БелАЗ-75131 (130т)', driver: 'Доржиев Э.Д.', status: 'В движении с рудой', fuel: 75, payload: 131.2, speed: 28.5, statusColor: 'bg-emerald-500', bench: 'Горизонт +1620' },
  { code: 'TRUCK-104', model: 'БелАЗ-75131 (130т)', driver: 'Петров Б.В.', status: 'Возврат порожним', fuel: 395, payload: 0.0, speed: 34.0, statusColor: 'bg-blue-500', bench: 'Горизонт +1640' },
  { code: 'TRUCK-108', model: 'CAT 777 (100т)', driver: 'Лиханов Д.А.', status: 'Под погрузкой', fuel: 310, payload: 98.4, speed: 0.0, statusColor: 'bg-amber-500', bench: 'Горизонт +1620' },
  { code: 'EXC-02', model: 'ЭКГ-5А (5.0 м³)', driver: 'Сидоров Д.А.', status: 'Погрузка в забое', fuel: 0, payload: 9.0, speed: 0.0, statusColor: 'bg-amber-500', bench: 'Забой #2 (+1620)' },
  { code: 'EXC-07', model: 'Hitachi EX3600 (21 м³)', driver: 'Жолдошев Т.К.', status: 'Погрузка в забое', fuel: 0, payload: 37.8, speed: 0.0, statusColor: 'bg-emerald-500', bench: 'Забой #7 (+1660)' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'optimizer' | 'fleet' | 'reports'>('map');
  const [mapMode, setMapMode] = useState<'3d' | '2d'>('3d');
  const [optimizing, setOptimizing] = useState(false);
  const [optSuccess, setOptSuccess] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleRunOptimizer = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptSuccess(true);
      setTimeout(() => setOptSuccess(false), 4000);
    }, 1200);
  };

  const handleSendBroadcast = (target: string, type: string, message: string) => {
    setToast(`Распоряжение [${type.toUpperCase()}] успешно отправлено на ${target}`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 text-slate-900 font-sans overflow-hidden select-none">
      {/* Левая боковая панель АСУ ГТК */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Бренд АСУ ГТК */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm tracking-wider uppercase text-slate-900">АСУ ГТК</div>
              <div className="text-[11px] text-slate-500 font-medium">Диспетчерский центр</div>
            </div>
          </div>

          {/* Меню навигации */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('map')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'map'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-4 h-4 text-blue-600" />
              Карьер & Мониторинг
            </button>

            <button
              onClick={() => setActiveTab('optimizer')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'optimizer'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sliders className="w-4 h-4 text-blue-600" />
              Симплекс-Оптимизация
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'fleet'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-4 h-4 text-blue-600" />
              Парк техники (18 ед.)
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'reports'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Сменные отчеты & Аналитика
            </button>
          </nav>
        </div>

        {/* Футер статуса бэкенда */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="text-[11px] text-slate-600 flex items-center justify-between mb-2">
            <span>Java Core Server</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ONLINE :8080
            </span>
          </div>
          <div className="text-[11px] text-slate-600 flex items-center justify-between">
            <span>UDP Telemetry</span>
            <span className="font-mono text-blue-700 font-bold">PORT 9999</span>
          </div>
        </div>
      </aside>

      {/* Основная рабочая область диспетчера */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Верхняя KPI-панель смены */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-xs font-bold text-slate-900">Смена #1 (08:00 – 20:00)</div>
              <div className="text-[11px] text-slate-500">Участок «Северный карьер» • Руда / Вскрыша</div>
            </div>

            <div className="h-8 w-px bg-slate-200"></div>

            <div className="flex items-center gap-8">
              {/* Объем */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Объем смены</div>
                  <div className="text-xs font-bold font-mono text-slate-900">14,820 т / 16,000 т (92.6%)</div>
                </div>
              </div>

              {/* Расход ГСМ */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Fuel className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Расход ГСМ</div>
                  <div className="text-xs font-bold font-mono text-slate-900">2,340 л (0.158 л/т)</div>
                </div>
              </div>

              {/* Себестоимость */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Себестоимость т·км</div>
                  <div className="text-xs font-bold font-mono text-blue-800">14.82 руб / (т·км)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Кнопка отправки распоряжения на борт */}
            <button
              onClick={() => setBroadcastOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Send className="w-4 h-4 text-blue-600" />
              <span>Отправить распоряжение</span>
            </button>

            <a
              href="http://localhost:8080/api/v1/reports/shift/xlsx"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Excel Отчет (.xlsx)</span>
            </a>

            <button
              onClick={handleRunOptimizer}
              disabled={optimizing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm disabled:opacity-50"
            >
              <Sliders className="w-4 h-4" />
              <span>{optimizing ? 'Расчет...' : 'Авто-Оптимизация'}</span>
            </button>
          </div>
        </header>

        {/* Уведомление об отправке */}
        {toast && (
          <div className="bg-blue-600 text-white px-6 py-2 text-xs font-bold text-center shadow-md animate-fade-in">
            {toast}
          </div>
        )}

        {/* Рабочая сетка диспетчера */}
        <div className="flex-1 p-3.5 grid grid-cols-12 gap-3.5 min-h-0">
          {/* Левая интерактивная карта (3D / 2D переключатель) и журнал телеметрии */}
          <div className="col-span-8 flex flex-col gap-3 min-h-0">
            {/* Панель переключения 3D цифровой двойник / 2D схема трафика */}
            <div className="flex-1 min-h-0 relative">
              <div className="absolute top-3 right-3 z-20 flex bg-white p-1 rounded-xl border border-slate-200 shadow-md">
                <button
                  onClick={() => setMapMode('3d')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    mapMode === '3d' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  3D Двойник карьера
                </button>
                <button
                  onClick={() => setMapMode('2d')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    mapMode === '2d' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2D Карта трафика парка
                </button>
              </div>

              {mapMode === '3d' ? <OpenPit3DScene /> : <Pit2DOverviewMap fleet={mockFleet} />}
            </div>

            {/* Консоль телеметрии самосвалов в реальном времени */}
            <div className="h-44 bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Журнал UDP-Телеметрии в реальном времени
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-bold">2.5 Hz RT-STREAM</span>
              </div>
              <div className="flex-1 overflow-auto font-mono text-xs space-y-1.5 text-slate-700 pr-1">
                <div className="text-amber-800 bg-amber-50 p-1 rounded border border-amber-200 flex items-center justify-between font-bold">
                  <span>[03:15:10] AI PREDICT: Борт #101 остаток ГСМ 75л &rarr; Запланирован заезд на АТЗ-04 (+1640м)</span>
                  <span className="text-amber-700 font-semibold text-[10px]">AUTO-ROUTE</span>
                </div>
                <div className="text-emerald-800 flex items-center justify-between">
                  <span>[03:15:08] UDP: TRUCK-101 (Lat 42.8746, Lon 74.5698) V=28.5 km/h, Груз=131.2т, Топливо=75л</span>
                  <span className="text-slate-400">24ms</span>
                </div>
                <div className="text-blue-800 flex items-center justify-between">
                  <span>[03:15:05] UDP: TRUCK-104 (Lat 42.8710, Lon 74.5620) V=34.0 km/h, Порожний, Топливо=395л</span>
                  <span className="text-slate-400">22ms</span>
                </div>
                <div className="text-slate-600 flex items-center justify-between">
                  <span>[03:15:01] EVENT: EXC-02 Завершена погрузка борта TRUCK-108 (98.4т) &rarr; Назначен Отвал-Восток</span>
                  <span className="text-slate-400">80ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка: Предиктивный радар рисков & Парк на линии */}
          <div className="col-span-4 flex flex-col gap-3 min-h-0">
            {/* Блок предиктивной аналитики и прогнозирования инцидентов */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-3.5 flex flex-col gap-2 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Предиктивный радар рисков
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded-full text-[10px] font-mono font-bold border border-blue-200">
                  2 события
                </span>
              </div>

              {/* Событие 1: Прогноз топлива */}
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-start gap-2.5">
                <Fuel className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-amber-950">Борт #101: Остаток ГСМ 75 л (~45 мин)</div>
                  <div className="text-[11px] text-amber-900 mt-0.5">
                    Прогноз: остановка через 2 рейса. Маршрут перестроен через АТЗ-04 (+1640м).
                  </div>
                </div>
              </div>

              {/* Событие 2: Очередь экскаватора */}
              <div className="bg-blue-50 p-2 rounded-xl border border-blue-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-blue-950">Забой #2: Риск затора (3 самосвала)</div>
                  <div className="text-[11px] text-blue-900 mt-0.5">
                    Симплекс перенаправил борт #108 на свободный забой #7 (Hitachi EX3600).
                  </div>
                </div>
              </div>
            </div>

            {/* Реестр парка на линии */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col min-h-0 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-600" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Парк на линии</h3>
                </div>
                <span className="text-xs font-mono text-slate-500">5 активных ед.</span>
              </div>

              <div className="flex-1 overflow-auto space-y-2 pr-1">
                {mockFleet.map((v) => (
                  <div
                    key={v.code}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:border-blue-300 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${v.statusColor}`}></span>
                        <span className="font-mono font-bold text-xs text-slate-900">{v.code}</span>
                      </div>
                      <div className="text-[11px] text-slate-700 mt-0.5">{v.model}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{v.bench} • {v.status}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-slate-900">{v.payload > 0 ? `${v.payload} т` : 'Порожний'}</div>
                      <div className={`text-[11px] font-bold ${v.fuel <= 80 ? 'text-amber-700' : 'text-slate-500'}`}>
                        {v.fuel > 0 ? `${v.fuel} л` : '-'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карточка Симплекс-распределения */}
            <div className="h-44 bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Симплекс-Оптимизация</h3>
                </div>
                {optSuccess && (
                  <span className="text-xs text-emerald-700 flex items-center gap-1 font-mono font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Оптимум
                  </span>
                )}
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>ЭКГ-5А #2 (L=3.2 км)</span>
                  <span className="text-blue-800 font-bold">2 БелАЗ-75131</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Hitachi EX3600 (L=2.4 км)</span>
                  <span className="text-blue-800 font-bold">3 CAT 777</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold pt-1 border-t border-slate-200">
                  <span>Экономия:</span>
                  <span>-84,200 руб</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно рассылки распоряжений */}
      <BroadcastModal
        isOpen={broadcastOpen}
        onClose={() => setBroadcastOpen(false)}
        onSend={handleSendBroadcast}
      />
    </div>
  );
}
