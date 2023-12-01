// Alert.js
import React, { useEffect } from 'react';

const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
