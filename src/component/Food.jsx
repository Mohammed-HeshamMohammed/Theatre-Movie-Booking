import React from 'react'
import { foods } from '../TheatreData';
import CardFoodDrink from './CardFoodDrink';
import Title from './Title';

function Food() {
    return (
      <div className="m-5 mb-2">
        <Title head="Don't Eat To Much >ᴗ<" />
        <div className="boxs container mb-3 ">
          {foods.map((item) => {
            return (
              <CardFoodDrink
                key={item.id}
                id={item.id}
                img={item.image}
                title={item.title}
                price={item.price}
                category="food"
              />
            );
          })}
        </div>
      </div>
    );
}

export default Food
