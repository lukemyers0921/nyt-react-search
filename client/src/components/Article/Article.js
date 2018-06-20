import React from "react";

const Article = props => (
  <div className="card">
    <div className="card-header bg-dark text-white">
    <a href = {props.url}>{props.title}</a>
    {props.header}
    </div>
    <div className="card-body">
    <p className="card-title">{props.date}</p>
    </div>
    </div>
);

export default Article;
