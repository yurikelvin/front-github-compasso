import React, { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import NotFound from 'components/NotFound';
import Spinner from 'components/Spinner';
import RepositoryContainer from 'components/RepositoryContainer';

import { ReactComponent as FollowersIcon } from 'assets/img/followers.svg';

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const { username } = useParams();

  const loadUserInfo = async () => {
    if (!username || username.trim() === '') {
      setUserInfo({});
      setLoading(false);
      return;
    }

    setUserInfo({
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
    })
    setLoading(false);
  }

  useEffect(() => {
    if (state) {
      const { user } = state;
      setUserInfo(user);
      setLoading(false);
    } else {
      loadUserInfo();
    }
    // eslint-disable-next-line
  }, [state])


  const canDisplayUser = !loading && userInfo && Object.keys(userInfo).length > 0;
  const notFoundUser = !loading && userInfo && Object.keys(userInfo).length === 0;

  if (notFoundUser) {
    return <div className="w-full h-full flex">
      <NotFound description="Nenhum resultado encontrado!" />
    </div>
  }

  if (loading) {
    return <div className="w-full h-full flex">
      <Spinner loading={loading} />
    </div>
  }

  const { avatar_url: avatarUrl, name, login, followers, following, bio } = userInfo;

  return (
    <div className="UserProfile">
      {canDisplayUser && (
        <div className="UserProfile_container">
          <aside className="UserProfile_info">
            <div>
              <img className="UserProfile_avatar avatar_rounded" src={avatarUrl} alt={name}/>
              <div className="UserProfile_details">
                <h1 className="UserProfile_name">{name}</h1>
                <span className="UserProfile_username">{login}</span>
              </div>
              <div className="mt-1">
                <span className="UserProfile_bio">
                  {bio}
                </span>
              </div>
              <div className="UserProfile_statTile">
                <FollowersIcon width={24} height={24} />
                <span className="UserProfile_stat">{followers} seguidores</span>
                {'•'}
                <span className="UserProfile_stat">{following} seguindo</span>
              </div>
            </div>
          </aside>
          <RepositoryContainer user={userInfo} />
        </div>
      )}
    </div>
  )
}

export default UserProfilePage;