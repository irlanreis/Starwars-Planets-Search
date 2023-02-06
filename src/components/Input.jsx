import React from 'react';
import PropTypes from 'prop-types';

function Input({ type, ...props }) {
  return (
    <input type={ type || 'text' } { ...props } />
  );
}

Input.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Input;
