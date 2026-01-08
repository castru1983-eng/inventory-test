
import React, { useRef } from 'react';
import { Part } from '../types';

interface PartCardProps {
  part: Part;
  onUpdate: (id: string, updates: Partial<Part>) => void;
  onDelete: (id: string) => void;
}

const PartCard: React.FC<PartCardProps> = ({ part, onUpdate, onDelete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(part.id, { imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-800 rounded shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full min-h-[140px]">
      {/* 照片區域 */}
      <div 
        className="h-20 bg-slate-100 flex items-center justify-center cursor-pointer border-b border-slate-200 relative group"
        onClick={() => fileInputRef.current?.click()}
      >
        {part.imageUrl ? (
          <img src={part.imageUrl} alt={part.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-slate-400 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            <span className="text-[10px] font-bold">上傳照片</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      </div>

      {/* 資訊區域 */}
      <div className="p-2 flex-grow flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <span className="bg-slate-800 text-white text-[9px] px-1 font-mono rounded">{part.partNumber}</span>
          <button onClick={() => onDelete(part.id)} className="text-slate-300 hover:text-red-500">
             <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <h3 className="text-[11px] font-bold text-slate-700 leading-tight line-clamp-2 min-h-[2em]">{part.name}</h3>
        
        <div className="mt-auto pt-1 flex items-center justify-between">
          <div className="flex items-center border border-slate-200 rounded overflow-hidden">
            <button 
              onClick={() => onUpdate(part.id, { quantity: Math.max(0, part.quantity - 1) })}
              className="px-1.5 py-0.5 bg-slate-50 hover:bg-slate-200 text-xs font-bold"
            >-</button>
            <input 
              type="number" 
              value={part.quantity}
              onChange={(e) => onUpdate(part.id, { quantity: parseInt(e.target.value) || 0 })}
              className="w-8 text-center text-[11px] font-bold outline-none"
            />
            <button 
              onClick={() => onUpdate(part.id, { quantity: part.quantity + 1 })}
              className="px-1.5 py-0.5 bg-slate-50 hover:bg-slate-200 text-xs font-bold"
            >+</button>
          </div>
          <span className={`text-[9px] font-black ${part.quantity > 0 ? 'text-blue-600' : 'text-red-500'}`}>
            {part.quantity > 0 ? '庫存' : '缺貨'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartCard;
