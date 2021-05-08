import React from 'react';

import classNames from 'classnames';

const TabItem = ({ description, isActive, handleClick }) => {
  const activeClass = classNames({
    'TabItem_active': isActive,
    'TabItem_inactive': !isActive,
  });
  return (
    <div
      onClick={handleClick}
      className={`TabItem ${activeClass}`}>
      {description}
    </div>
  );
};

export default TabItem;