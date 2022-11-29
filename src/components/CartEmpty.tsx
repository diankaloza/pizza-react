import { Link } from "react-router-dom";
import cartEmptyImg from "../assets/img/empty-cart.png";

export const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пуста <span>😕</span>
        </h2>
        <p>
          Ймовірніше за все - ви ще не замовили піцу.
          <br />
          Для того, щоб замовити піцу, перейдіть на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </>
  );
};
