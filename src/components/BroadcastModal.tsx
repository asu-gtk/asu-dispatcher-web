import React, { useState } from 'react';
import { Radio, Send, X, AlertTriangle, Construction, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (target: string, type: string, message: string) => void;
}

export function BroadcastModal({ isOpen, onClose, onSend }: BroadcastModalProps) {
  const [target, setTarget] = useState('ALL');
  const [msgType, setMsgType] = useState('blast');
  const [messageText, setMessageText] = useState('Внимание: В 13:00 плановые взрывные работы (БВР) на горизонте +1680. Покинуть зону до 12:45.');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    onSend(target, msgType, messageText);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Отправка распоряжения на технику</h2>
              <p className="text-xs text-slate-500">Мгновенная доставка в бортовые планшеты</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sentSuccess ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <div className="text-sm font-black text-slate-900">Распоряжение успешно разослано!</div>
            <div className="text-xs text-slate-500">Доставлено на бортовые терминалы по сети LTE/MESH</div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Получатель:</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              >
                <option value="ALL">📢 ВСЕМ САМОСВАЛАМ И ЭКСКАВАТОРАМ (ЦИРКУЛЯРНО)</option>
                <option value="TRUCK-101">Борт #101 (БелАЗ-75131 • Доржиев Э.Д.)</option>
                <option value="TRUCK-104">Борт #104 (БелАЗ-75131 • Петров Б.В.)</option>
                <option value="TRUCK-108">Борт #108 (CAT 777 • Лиханов Д.А.)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Тип оповещения:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'blast', label: 'БВР (Взрыв)', color: 'bg-red-50 text-red-700 border-red-200' },
                  { id: 'urgent', label: 'Осыпь/Погода', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { id: 'info', label: 'Маршрут', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setMsgType(t.id)}
                    className={`p-2 rounded-xl text-xs font-bold border transition ${
                      msgType === t.id ? `${t.color} ring-2 ring-blue-500 font-black` : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Текст распоряжения:</label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
            >
              <Send className="w-4 h-4" />
              <span>ОТПРАВИТЬ РАСПОРЯЖЕНИЕ</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
