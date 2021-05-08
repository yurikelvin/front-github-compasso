import React from 'react';

const Spinner = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className="Spinner" >
      <div className="Spinner_loader" />
      <span className="Spinner_description">Carregando</span>
    </div>
  )
};

export default Spinner;