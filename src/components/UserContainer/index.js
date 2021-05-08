import React, { useState, useEffect, useRef } from 'react';

import Search from 'components/Search';
import UserItem from 'components/UserItem';
import NotFound from 'components/NotFound';
import Spinner from 'components/Spinner';

const UserContainer = () => {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState('');
  const [user, setUser] = useState(null);

  const retrieveUser = async () => {
    setLoading(true);
    setUser({
      "login": "yurikelvin",
      "id": 24192482,
      "node_id": "MDQ6VXNlcjI0MTkyNDgy",
      "avatar_url": "https://avatars.githubusercontent.com/u/24192482?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/yurikelvin",
      "html_url": "https://github.com/yurikelvin",
      "followers_url": "https://api.github.com/users/yurikelvin/followers",
      "following_url": "https://api.github.com/users/yurikelvin/following{/other_user}",
      "gists_url": "https://api.github.com/users/yurikelvin/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/yurikelvin/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/yurikelvin/subscriptions",
      "organizations_url": "https://api.github.com/users/yurikelvin/orgs",
      "repos_url": "https://api.github.com/users/yurikelvin/repos",
      "events_url": "https://api.github.com/users/yurikelvin/events{/privacy}",
      "received_events_url": "https://api.github.com/users/yurikelvin/received_events",
      "type": "User",
      "site_admin": false,
      "name": "Yuri Silva",
      "company": null,
      "blog": "",
      "location": null,
      "email": null,
      "hireable": null,
      "bio": "Computer Science Student - UFCG",
      "twitter_username": null,
      "public_repos": 24,
      "public_gists": 1,
      "followers": 21,
      "following": 10,
      "created_at": "2016-11-26T16:48:04Z",
      "updated_at": "2021-05-06T02:09:08Z"
    });
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