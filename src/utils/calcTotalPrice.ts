import { T_CartItem } from "redux/cart/types";

export const calcTotalPrice = (items: T_CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
