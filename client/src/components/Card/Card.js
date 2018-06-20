import React from "react";
import "./card.css"

const Card = props => (
  <div className = "container">
  <div className="card">
    <div className="card-header bg-dark text-white text-center">
        {props.title}
      </div>
    <div className = "card-body">
        <form>
        {props.body}
        </form>
      </div>
  </div>
</div>
);

export default Card;
