import React, { useState } from 'react';
import ImageUpload from '../../shared/components/form-elements/ImageUpload';
import { useForm } from '../../shared/hooks/form-hook';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          profileImage: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          profileImage: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLoginMode) {
        const response = await fetch('http://localhost:5005/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        onLogin(data.userId, data.token);
      } else {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.profileImage.value);

        const response = await fetch('http://localhost:5005/api/users/signup', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }

        onLogin(data.userId, data.token);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="authentication">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      <h2>Login Required</h2>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <>
            <div>
              <label>Your Name</label>
              <input
                type="text"
                value={formState.inputs.name?.value || ''}
                onChange={(e) => inputHandler('name', e.target.value, e.target.value.trim() !== '')}
                required
              />
            </div>
            <ImageUpload
              id="profileImage"
              center
              onInput={inputHandler}
              errorText="You must choose a valid JPG or PNG image."
            />
          </>
        )}

        <div>
          <label>E-Mail</label>
          <input
            type="email"
            value={formState.inputs.email.value}
            onChange={(e) => inputHandler('email', e.target.value, e.target.value.includes('@'))}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={formState.inputs.password.value}
            onChange={(e) => inputHandler('password', e.target.value, e.target.value.length >= 6)}
            minLength="6"
            required
          />
        </div>

        <button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </button>
      </form>
      
      <button onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </button>
    </div>
  );
};

export default Auth;
