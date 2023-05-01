export interface Warehouse {
  height: number;
  width: number;
  weightLimit: number;
}

export interface Box {
  height: number;
  width: number;
  weight: number;
  priceValue: number;
  position?: {
    x: number;
    y: number;
  };
  color: string;
}

export interface Solution {
  boxes: Box[];
  fitness: number;
}
