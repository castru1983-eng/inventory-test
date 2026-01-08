
export type SectionType = '頂層' | '上層' | '中層' | '下層' | '通用';

export interface Part {
  id: string;
  partNumber: string;
  name: string;
  quantity: number;
  imageUrl: string | null;
  description?: string;
  shelf: string; // 例如: 'P3-2', 'P3-3'
  section: SectionType;
  gridX: number; // 欄位 (1-10)
}

export type SortField = 'partNumber' | 'name' | 'quantity';
export type SortOrder = 'asc' | 'desc';
