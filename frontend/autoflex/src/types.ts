export type MeasurementUnit = "KG" | "GRAMS" | "LITERS" | "METERS" | "UNITS" | "PIECES";

export interface RawMaterial {
  id: number;
  name: string;
  stockQuantity: number;
  unit: MeasurementUnit;
}

export interface RequestRawMaterial {
  name: string;
  stockQuantity: number;
  unit: MeasurementUnit;
}

export interface ProductMaterial {
  materialId: number;
  materialName: string;
  requiredQuantity: number;
  unit: MeasurementUnit;
}

export interface RequestProduct {
  name: string;
  price: number;
  materials: ComponentProduct[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  materials: ComponentProduct[];
}

export interface ComponentProduct {
  materialId: number;
  materialName?: string;
  requiredQuantity: number;
}

export interface ProductionSuggestionMaterial {
  name: string;
  requiredQuantity: number;
  stockAtMoment: number;
  unit: MeasurementUnit;
}

export interface ProductionSuggestion {
  productId: number;
  productName: string;
  quantityToProduce: number;
  totalPrice: number;
  materials: ProductionSuggestionMaterial[];
}