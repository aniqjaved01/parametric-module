export interface ProductCatalogItem {
  partId: string;
  description: string;
  dimensions: {
    width?: number | { min: number; max: number };
    height?: number | { min: number; max: number };
    depth?: number | { min: number; max: number };
  };
  finish: 'metal' | 'wood';
  category: 'panel' | 'edge' | 'connector' | 'hardware';
}

export interface ModuleParams {
  width: number;
  height: number;
  finish: 'metal' | 'wood';
}

export interface BOMItem {
  partId: string;
  quantity: number;
  description?: string;
}

export type BOM = BOMItem[];

