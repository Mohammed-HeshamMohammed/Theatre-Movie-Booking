import React from "react";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../css/TheatreCard.css';  // Make sure to import your updated CSS file

function TheatreCard(props) {
  return (
    <Card className="shadow custom-card">
      <Card.Img className="card-image" variant="top" src={props.img} />
      <div className="card-body">
        <Card.Title className="text-danger">{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button className="btn btn-danger mt-3" variant="primary">
          <NavLink to={"/home/seats/" + props.id}> Reserve Seats</NavLink>
        </Button>
      </div>
    </Card>
  );
}

export default TheatreCard;
