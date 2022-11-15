import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const PizzaCart: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6314fc585b85ba9b11dae920.mockapi.io/collections/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <> Завантаження...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} грн</h3>
    </div>
  );
};
