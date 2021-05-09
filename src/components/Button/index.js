import React from 'react';

const Button = ({ onClick, name }) => {
  return (
    <div className="Button" onClick={onClick}>{name}</div>
  )
}

export default Button;