import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, type, ...props }) {
  return (
    <button type={ type || 'button' } { ...props }>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
}.isRequired;

export default Button;
