import React from 'react';
import './Button.css';

const Button = props => {
  return (
    <button
      type={props.type || 'button'}
      className={`button ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'} ${props.size && `button--${props.size}`}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

