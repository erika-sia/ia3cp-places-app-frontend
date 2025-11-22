import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './PlaceItem.css';

const PlaceItem = props => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <Link to={`/places/${props.id}`}>
          <div className="place-item__image">
            <img src={`http://localhost:5005/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default PlaceItem;

