export type MeasurementUnit = "KG" | "GRAMS" | "LITERS" | "METERS" | "UNITS" | "PIECES";

export interface RawMaterial {
  id: number;
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

export interface Product {
  id: number;
  name: string;
  price: number;
  materials: ProductMaterial[];
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