
import React, { useState, useEffect, useMemo } from 'react';
import { Part, SectionType } from './types';
import { INITIAL_PARTS } from './constants';
import PartCard from './components/PartCard';

const App: React.FC = () => {
  const [parts, setParts] = useState<Part[]>(() => {
    const saved = localStorage.getItem('parts_inventory_v4');
    return saved ? JSON.parse(saved) : INITIAL_PARTS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newPart, setNewPart] = useState<Partial<Part>>({ shelf: 'P3-3', section: '上層', gridX: 1, partNumber: '', name: '' });

  useEffect(() => {
    localStorage.setItem('parts_inventory_v4', JSON.stringify(parts));
  }, [parts]);

  const handleUpdatePart = (id: string, updates: Partial<Part>) => {
    setParts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDeletePart = (id: string) => {
    if (confirm('確定要刪除此料號嗎？')) {
      setParts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    const part: Part = {
      id: Date.now().toString(),
      partNumber: newPart.partNumber || 'TEMP',
      name: newPart.name || '未命名',
      quantity: 0,
      imageUrl: null,
      shelf: newPart.shelf || 'P3-3',
      section: newPart.section as SectionType || '上層',
      gridX: Number(newPart.gridX) || 1
    };
    setParts(prev => [...prev, part]);
    setIsAdding(false);
  };

  // 渲染特定的架位橫排
  const renderRow = (shelf: string, section: SectionType, colorClass: string, label: string) => {
    return (
      <div className="overflow-x-auto scrollbar-hide">
        <div className={`min-w-[1000px] grid grid-cols-[100px_repeat(8,1fr)] border-b-2 border-slate-900 group min-h-[160px]`}>
          {/* 左側標籤區 */}
          <div className={`flex flex-col items-center justify-center font-black border-r-2 border-slate-900 ${colorClass} sticky left-0 z-10`}>
            <span className="text-lg tracking-[0.2em] [writing-mode:vertical-rl] py-4">{label}</span>
          </div>

          {/* 內容區格 */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(col => {
            const items = parts.filter(p => p.shelf === shelf && p.section === section && p.gridX === col);
            return (
              <div key={col} className="p-1 border-r border-slate-300 relative bg-white/50 hover:bg-white transition-colors">
                <div className="flex flex-col gap-1">
                  {items.map(part => (
                    <PartCard key={part.id} part={part} onUpdate={handleUpdatePart} onDelete={handleDeletePart} />
                  ))}
                  <button 
                    onClick={() => {
                      setNewPart({ shelf, section, gridX: col });
                      setIsAdding(true);
                    }}
                    className="opacity-100 md:opacity-0 md:group-hover:opacity-100 w-full py-2 border border-dashed border-slate-400 rounded text-[10px] font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all bg-white/50"
                  >
                    + 新增
                  </button>
                </div>
                <span className="absolute bottom-0 right-1 text-[8px] text-slate-300 pointer-events-none">{col}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-3 md:p-8 font-sans">
      <div className="max-w-[1440px] mx-auto space-y-8 md:space-y-12">
        
        {/* 系統標題 */}
        <header className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end border-b-4 border-slate-900 pb-4">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black italic text-slate-900">倉儲料件位置對應表</h1>
            <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Inventory Management & Mapping System</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative flex-grow sm:flex-grow-0">
                <input 
                  type="text" 
                  placeholder="搜尋料號或品名..." 
                  className="w-full sm:w-[260px] px-4 py-2 border-2 border-slate-900 rounded font-bold text-sm outline-none focus:ring-4 ring-blue-500/20"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
             <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-5 py-2 border-2 border-slate-900 rounded font-black hover:bg-blue-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all text-sm">
                手動新增
             </button>
          </div>
        </header>

        {/* P3 二層架 */}
        <section className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-slate-900">
          <div className="bg-slate-900 text-white px-4 md:px-6 py-2 font-black text-lg md:text-xl flex justify-between items-center">
             <div className="flex items-center gap-2">
                <span className="bg-blue-500 w-3 h-3 rounded-full animate-pulse"></span>
                <span>P3 二層架</span>
             </div>
             <span className="hidden sm:inline text-[10px] opacity-50 font-mono">LOCATION: AREA-A</span>
          </div>
          <div className="border-t-2 border-slate-900">
            {renderRow('P3-2', '下層', 'bg-emerald-400 text-slate-900', '下層')}
          </div>
        </section>

        {/* P3 三層架 */}
        <section className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-slate-900">
          <div className="bg-slate-900 text-white px-4 md:px-6 py-2 font-black text-lg md:text-xl flex justify-between items-center">
             <div className="flex items-center gap-2">
                <span className="bg-amber-500 w-3 h-3 rounded-full animate-pulse"></span>
                <span>P3 三層架</span>
             </div>
             <span className="hidden sm:inline text-[10px] opacity-50 font-mono">LOCATION: AREA-B</span>
          </div>
          <div className="border-t-2 border-slate-900">
            {renderRow('P3-3', '頂層', 'bg-[#ff8a80] text-slate-900', '頂層')}
            {renderRow('P3-3', '上層', 'bg-[#fff176] text-slate-900', '上層')}
            {renderRow('P3-3', '中層', 'bg-[#81c784] text-slate-900', '中層')}
            {renderRow('P3-3', '下層', 'bg-[#4fc3f7] text-slate-900', '下層')}
          </div>
          <div className="overflow-x-auto scrollbar-hide bg-slate-900 text-white text-[10px] font-mono py-1.5 font-bold">
            <div className="min-w-[1000px] grid grid-cols-[100px_repeat(8,1fr)] text-center">
              <div className="border-r border-slate-700">LABEL</div>
              {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="border-r border-slate-700 last:border-0">COLUMN {i}</div>)}
            </div>
          </div>
        </section>

        {/* 搜尋結果彈窗 */}
        {searchTerm && (
          <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6 bg-white/95 backdrop-blur shadow-[0_-20px_50px_rgba(0,0,0,0.2)] border-t-4 border-blue-600 animate-in slide-in-from-bottom duration-300">
            <div className="max-w-[1440px] mx-auto">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-lg md:text-xl">搜尋結果: <span className="text-blue-600">"{searchTerm}"</span></h3>
                  <button onClick={() => setSearchTerm('')} className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
               </div>
               <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {parts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.partNumber.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                    <div key={p.id} className="w-[180px] md:w-[220px] flex-shrink-0">
                       <div className="text-[10px] font-bold text-blue-600 mb-2 uppercase tracking-tighter">{p.shelf} / {p.section} / 欄 {p.gridX}</div>
                       <PartCard part={p} onUpdate={handleUpdatePart} onDelete={handleDeletePart} />
                    </div>
                  ))}
                  {parts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.partNumber.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                    <div className="py-8 text-slate-400 font-bold italic">未找到匹配料件...</div>
                  )}
               </div>
            </div>
          </div>
        )}

        {/* 新增彈窗 */}
        {isAdding && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
            <form onSubmit={handleAddPart} className="bg-white border-4 border-slate-900 rounded-xl p-6 md:p-8 w-full max-w-md space-y-5 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black">新增庫存料項</h2>
                <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-black">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1.5 text-slate-500">位置架位</label>
                  <select value={newPart.shelf} onChange={e => setNewPart(p => ({...p, shelf: e.target.value}))} className="w-full p-2.5 border-2 border-slate-900 rounded-lg font-bold bg-slate-50 focus:bg-white transition-colors outline-none">
                    <option value="P3-2">P3 二層架</option>
                    <option value="P3-3">P3 三層架</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1.5 text-slate-500">存放層級</label>
                  <select value={newPart.section} onChange={e => setNewPart(p => ({...p, section: e.target.value as SectionType}))} className="w-full p-2.5 border-2 border-slate-900 rounded-lg font-bold bg-slate-50 focus:bg-white transition-colors outline-none">
                    <option value="頂層">頂層</option>
                    <option value="上層">上層</option>
                    <option value="中層">中層</option>
                    <option value="下層">下層</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1.5 text-slate-500">對應欄位 (Column 1-8)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="8" 
                  value={newPart.gridX} 
                  onChange={e => setNewPart(p => ({...p, gridX: Number(e.target.value)}))} 
                  className="w-full p-2.5 border-2 border-slate-900 rounded-lg font-bold bg-slate-50 focus:bg-white transition-colors outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1.5 text-slate-500">料號 (Part ID)</label>
                <input required placeholder="例如: ME001..." value={newPart.partNumber} onChange={e => setNewPart(p => ({...p, partNumber: e.target.value}))} className="w-full p-2.5 border-2 border-slate-900 rounded-lg font-bold bg-slate-50 focus:bg-white transition-colors outline-none" />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1.5 text-slate-500">品名 (Description)</label>
                <input required placeholder="例如: 控制器電池" value={newPart.name} onChange={e => setNewPart(p => ({...p, name: e.target.value}))} className="w-full p-2.5 border-2 border-slate-900 rounded-lg font-bold bg-slate-50 focus:bg-white transition-colors outline-none" />
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 font-bold border-2 border-slate-900 rounded-lg hover:bg-slate-50 transition-colors">取消</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-black border-2 border-slate-900 rounded-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">確認儲存</button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* 底部邊框裝飾 */}
      <footer className="mt-12 py-6 border-t-2 border-slate-200 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase">
        Digital Inventory Management System © 2024
      </footer>
    </div>
  );
};

export default App;
