import React from 'react';

import { formatDate } from 'util/date';

const RepositoryItem = ({ item, onClickItem }) => {

  const handleClickItem = () => {
    onClickItem(item);
  }

  function hashCode(str) {
    // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  function intToRGB(i) {
    const c = (i & 0x00ffffff).toString(16).toUpperCase();

    return `#${'00000'.substring(0, 6 - c.length)}${c}`;
  }

  const { language, name, created_at: createdAt, updated_at: updatedAt, description }  = item

  let languageBox = null;
  if (language) {
    const languageColor = intToRGB(hashCode(language));
    languageBox = <div className="flex mr-1">
      <div className="rounded_square" style={{ backgroundColor: languageColor, width: '1rem', height: '1rem' }} />
      <div className="ml-1">{language}</div>
      <span className="ml-1">
            {'•'}
      </span>
    </div>
  }
  return (
    <div className="RepositoryItem" onClick={handleClickItem}>
      <div className="RepositoryItem_leftSide">
        <div>
          <span className="RepositoryItem_name">{name}</span>
        </div>
        <div className="RepositoryItem_description">
          <span>{description}</span>
        </div>
        <div className="flex pt-1">
          <div>
            {languageBox}
          </div>
          <span>
            Criado em {formatDate(createdAt)}
          </span>
        </div>
      </div>
      <div className="RepositoryItem_rightSide">
        <span>Atualizado em {formatDate(updatedAt)}</span>
      </div>
    </div>
  )
};

export default RepositoryItem;