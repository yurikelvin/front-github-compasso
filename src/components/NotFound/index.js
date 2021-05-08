import React from 'react';

import { ReactComponent as NotFoundIcon } from 'assets/img/not-found.svg';

const NotFound = ({ description = '', iconHeight = 64, iconWidth = 64 }) => {
  return (
    <div className="NotFound">
      <NotFoundIcon width={iconHeight} height={iconWidth} className="NotFound_icon" />
      <h2 className="NotFound_title">Ooops !</h2>
      <h3 className="NotFound_description">{description}</h3>
    </div>
  )
}

export default NotFound;