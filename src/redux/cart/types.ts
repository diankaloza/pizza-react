export type T_CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
  };
  
  export interface I_CartSlice {
    totalPrice: number;
    items: T_CartItem[];
  }