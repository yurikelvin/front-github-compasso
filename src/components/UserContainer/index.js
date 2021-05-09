import React, { useState, useEffect, useRef } from 'react';

import Search from 'components/Search';
import UserItem from 'components/UserItem';
import NotFound from 'components/NotFound';
import Spinner from 'components/Spinner';

import UserService from 'services/user';

const UserContainer = () => {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState('');
  const [user, setUser] = useState(null);
  const userService = new UserService();

  const retrieveUser = async () => {
    setLoading(true);
    let userData = {};
    try {
      const response = await userService.getUserProfile(searchValue);
      userData = response.data;
    } catch (e) {
      // TODO: Handle with errors
    }
    setUser(userData);
    setLoading(false);
  }

  useEffect(() => {
    if (searchRef && searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      retrieveUser();
    } else {
      setUser(null);
    }
    // eslint-disable-next-line
  }, [searchValue]);

  const canDisplayUser = !loading && user && Object.keys(user).length > 0;
  const notFoundUser = !loading && user && Object.keys(user).length === 0;

  return (
    <div className="UserContainer">
      <Search inputRef={searchRef} value={searchValue} onChange={setSearchValue} placeholder="Procurar usuário no GitHub" />
      <div className="UserContainer_userInfo">
        <Spinner loading={loading} />
        {canDisplayUser && <UserItem  user={user} />}
        {notFoundUser && <NotFound description="Nenhum resultado encontrado atende a busca !" />}
      </div>
    </div>
  )
};

export default UserContainer;