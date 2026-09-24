import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../css/TheatreCard.css";

function TheatreCard(props) {
  return (
    <Card className="custom-card">
      <Card.Img className="card-image" variant="top" src={props.img} alt={props.title} />
      <div className="card-body">
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <NavLink to={"/home/seats/" + props.id} className="btn btn-primary-accent">
          Reserve Seats
        </NavLink>
      </div>
    </Card>
  );
}

export default TheatreCard;
