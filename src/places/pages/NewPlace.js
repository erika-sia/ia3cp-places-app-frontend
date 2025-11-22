import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../shared/components/form-elements/ImageUpload';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const NewPlace = ({ userId }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', userId);
      formData.append('image', formState.inputs.image.value);

      const response = await fetch('http://localhost:5005/api/places', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create place');
      }

      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      setIsLoading(false);
    }
  };

  return (
    <form className="place-form" onSubmit={handleSubmit}>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div>
        <label>Title</label>
        <input
          type="text"
          value={formState.inputs.title.value}
          onChange={(e) => inputHandler('title', e.target.value, e.target.value.trim() !== '')}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          rows="3"
          value={formState.inputs.description.value}
          onChange={(e) => inputHandler('description', e.target.value, e.target.value.length >= 5)}
          required
        />
      </div>

      <div>
        <label>Address</label>
        <input
          type="text"
          value={formState.inputs.address.value}
          onChange={(e) => inputHandler('address', e.target.value, e.target.value.trim() !== '')}
          required
        />
      </div>

      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please upload an image for this place."
      />

      <button type="submit" disabled={!formState.isValid}>ADD PLACE</button>
    </form>
  );
};

export default NewPlace;
