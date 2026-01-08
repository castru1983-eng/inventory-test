
import { Part } from './types';

export const INITIAL_PARTS: Part[] = [
  // P3 三層架 - 上層 (黃色區)
  { id: 'p3-3-up-1', shelf: 'P3-3', section: '上層', gridX: 1, partNumber: 'me0120000084', name: '控制器電池', quantity: 5, imageUrl: null },
  { id: 'p3-3-up-1b', shelf: 'P3-3', section: '上層', gridX: 1, partNumber: 'me0120000085', name: '手臂電池', quantity: 2, imageUrl: null },
  { id: 'p3-3-up-2', shelf: 'P3-3', section: '上層', gridX: 2, partNumber: 'me0050000158', name: '辨識鏡頭usb', quantity: 1, imageUrl: null },
  { id: 'p3-3-up-3', shelf: 'P3-3', section: '上層', gridX: 3, partNumber: 'ME0050000181', name: '彩色CCD(CG)', quantity: 1, imageUrl: null },
  
  // P3 三層架 - 中層 (灰/綠區)
  { id: 'p3-3-mid-1', shelf: 'P3-3', section: '中層', gridX: 1, partNumber: 'A00100000721', name: '主控制模組', quantity: 1, imageUrl: null },
  { id: 'p3-3-mid-2', shelf: 'P3-3', section: '中層', gridX: 2, partNumber: 'ME0160000101', name: '轉盤控制板', quantity: 1, imageUrl: null },
  
  // P3 三層架 - 下層 (藍色區)
  { id: 'p3-3-low-1', shelf: 'P3-3', section: '下層', gridX: 1, partNumber: 'ME00200000554', name: '亞前主機', quantity: 1, imageUrl: null },
  { id: 'p3-3-low-3', shelf: 'P3-3', section: '下層', gridX: 3, partNumber: 'ME00700000140', name: '無油式真空幫浦', quantity: 2, imageUrl: null },

  // P3 二層架 (綠色區)
  { id: 'p3-2-low-1', shelf: 'P3-2', section: '下層', gridX: 1, partNumber: 'ME0100000078', name: '前撥片馬達', quantity: 1, imageUrl: null },
  { id: 'p3-2-low-2', shelf: 'P3-2', section: '下層', gridX: 2, partNumber: 'ME00200000443', name: 'NAS-SYNOLOGY DS923+', quantity: 1, imageUrl: null },
];
