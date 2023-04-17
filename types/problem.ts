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
}

export interface VisualBox extends Box {
  position: {
    x: number;
    y: number;
  };
}

export interface Solution {
  boxes: VisualBox[];
  fitness: number;
}
