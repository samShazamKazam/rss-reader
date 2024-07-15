import React from 'react';
import { useError } from './ErrorContext';

const ErrorDisplay = () => {
  const { errorMessage, clearError } = useError();

  if (!errorMessage) return null;

  return (
    <div className="error-message">
      {errorMessage}
      <button onClick={clearError}>Dismiss</button>
    </div>
  );
};

export default ErrorDisplay;