import React from "react";
import { drinks } from "../TheatreData";
import Title from "./Title";
import CardFoodDrink from "./CardFoodDrink";

function Drink() {
  return (
    <div className="m-5 mb-2">
      <Title head="Order Whatever U Like 😊" />
      <div className="boxs container mb-3 ">
        {drinks.map((item) => {
          return (
            <CardFoodDrink
              key={item.id}
              id={item.id}
              img={item.image}
              title={item.title}
              price={item.price}
              category="drink"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Drink;
