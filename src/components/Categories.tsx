import React, { useState } from "react";

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onClickCategory }) => {
    console.log("category render");

    const categories = [
      "Всі",
      `М'ясні`,
      "Вегетаріанські",
      "Гриль",
      "Гострі",
      "З бортиками",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? "active" : ""}
              key={index}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
