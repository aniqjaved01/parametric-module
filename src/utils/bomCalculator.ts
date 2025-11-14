import { ModuleParams, BOM, ProductCatalogItem, BOMItem } from '../types';
import productCatalog from '../data/productCatalog.json';

const DEPTH = 100; // Fixed depth for the module

/**
 * Checks if a dimension value matches the required dimension
 */
function matchesDimension(
  catalogDim: number | { min: number; max: number } | undefined,
  requiredDim: number
): boolean {
  if (catalogDim === undefined) return true;
  if (typeof catalogDim === 'number') {
    return Math.abs(catalogDim - requiredDim) < 1; // Allow small tolerance
  }
  return requiredDim >= catalogDim.min && requiredDim <= catalogDim.max;
}

/**
 * Finds a part in the catalog that matches the criteria
 */
function findPart(
  category: ProductCatalogItem['category'],
  finish: 'metal' | 'wood',
  partIdPattern?: string,
  width?: number,
  height?: number
): ProductCatalogItem | null {
  return (
    (productCatalog as ProductCatalogItem[]).find((item) => {
      if (item.category !== category || item.finish !== finish) {
        return false;
      }
      if (partIdPattern && !item.partId.includes(partIdPattern)) {
        return false;
      }
      if (width !== undefined && !matchesDimension(item.dimensions.width, width)) {
        return false;
      }
      if (height !== undefined && !matchesDimension(item.dimensions.height, height)) {
        return false;
      }
      return true;
    }) || null
  );
}

/**
 * Adds or updates a BOM item
 */
function addBOMItem(bom: BOM, partId: string, quantity: number, description?: string): void {
  const existing = bom.find((item) => item.partId === partId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    bom.push({ partId, quantity, description });
  }
}

/**
 * Calculates the Bill of Materials for a parametric module
 */
export function calculateBOM(params: ModuleParams): BOM {
  const bom: BOM = [];
  const { width, height, finish } = params;

  // Top panel (width × height)
  const topPanel = findPart('panel', finish, 'TOP', width, height);
  if (topPanel) {
    addBOMItem(bom, topPanel.partId, 1, topPanel.description);
  }

  // Bottom panel (width × height)
  const bottomPanel = findPart('panel', finish, 'BOTTOM', width, height);
  if (bottomPanel) {
    addBOMItem(bom, bottomPanel.partId, 1, bottomPanel.description);
  }

  // Front/Back panels - 2 pieces (width × height)
  const frontBackPanel = findPart('panel', finish, 'SIDE-HEIGHT', width, height);
  if (frontBackPanel) {
    addBOMItem(bom, frontBackPanel.partId, 2, frontBackPanel.description);
  }

  // Left/Right side panels - 2 pieces (height × depth)
  const sidePanel = findPart('panel', finish, 'SIDE-WIDTH', undefined, height);
  if (sidePanel) {
    addBOMItem(bom, sidePanel.partId, 2, sidePanel.description);
  }

  // Horizontal edges - 4 for top, 4 for bottom (8 total)
  const horizontalEdge = findPart('edge', finish, 'HORIZONTAL', width);
  if (horizontalEdge) {
    addBOMItem(bom, horizontalEdge.partId, 8, horizontalEdge.description);
  }

  // Vertical edges - 4 corners
  const verticalEdge = findPart('edge', finish, 'VERTICAL', undefined, height);
  if (verticalEdge) {
    addBOMItem(bom, verticalEdge.partId, 4, verticalEdge.description);
  }

  // Corner connectors - 4 corners
  const cornerConnector = findPart('connector', finish, 'CORNER');
  if (cornerConnector) {
    addBOMItem(bom, cornerConnector.partId, 4, cornerConnector.description);
  }

  // Hardware - screws (4 per panel = 6 panels × 4 = 24 screws)
  const screw = findPart('hardware', finish, 'SCREW');
  if (screw) {
    addBOMItem(bom, screw.partId, 24, screw.description);
  }

  return bom;
}

