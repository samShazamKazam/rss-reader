import React, { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const addError = (message) => {
    setErrorMessage(message);
  };

  const clearError = () => {
    setErrorMessage('');
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, addError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};