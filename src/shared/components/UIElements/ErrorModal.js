import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../FormElements/Button';
import './Modal.css';

const ErrorModal = props => {
  const content = (
    <div className="error-modal" onClick={props.onClear}>
      <h2>An Error Occurred!</h2>
      <p>{props.error}</p>
      {props.onClear && <Button onClick={props.onClear}>Okay</Button>}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default ErrorModal;

