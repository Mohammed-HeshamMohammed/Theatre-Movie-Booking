import React from "react";
import TheatreCard from "./TheatreCard";
import { theatreData } from "../TheatreData";
import "../css/TheatreList.css";
import Title from "./Title";

function TheatreList() {
  let theatreInfo = theatreData;
  return (
    <div className="m-5 mb-2">
      <Title head="Have Fun Picking 😊" />
      <div className="boxs container mb-3 ">
        {theatreInfo.map((item) => {
          return (
            <TheatreCard
              key={item.id}
              id={item.id}
              img={item.image}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TheatreList;
