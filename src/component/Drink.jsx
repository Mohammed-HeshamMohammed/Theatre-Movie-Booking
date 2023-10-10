import React from "react";
import { drinks} from "../TheatreData";
import Title from "./Title";
import CardFoodDrink from "./CardFoodDrink";

function Drink() {
  let drinkData = drinks;
  localStorage.setItem("drinks",JSON.stringify(drinkData));
  return (
    <div className="m-5 mb-2">
      <Title head="Order Whatever U Like 😊" />
      <div className="boxs container mb-3 ">
        {drinkData.map((item) => {
          return (
            <CardFoodDrink
              key={item.id}
              id={item.id}
              img={item.image}
              title={item.title}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Drink;
