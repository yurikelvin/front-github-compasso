import React from 'react';

import { ReactComponent as SearchIcon } from 'assets/img/search-icon.svg';
import { ReactComponent as CloseIcon } from 'assets/img/close-icon.svg';


const Search = ({ inputRef, value, placeholder, onChange, onClearSearch }) => {
  const handleClearValueClick = () => {
    onChange('');
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onChangeValue = rawValue => {
    onChange(rawValue);
  }

  return (
    <div className="Search">
      <SearchIcon />
      <input
        ref={inputRef}
        value={value}
        className="Search_input"
        placeholder={placeholder}
        onChange={e => {
            onChangeValue(e.currentTarget.value);
        }}
      />
      {value !== null && value.trim() !== '' && (
          <div className="cursor-pointer" onClick={handleClearValueClick}>
            <CloseIcon title="Limpar" />
          </div>
        )}
    </div>
  )
}

export default Search;