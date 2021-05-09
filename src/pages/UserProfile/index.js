import React, { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import NotFound from 'components/NotFound';
import Spinner from 'components/Spinner';
import RepositoryContainer from 'components/RepositoryContainer';

import UserService from 'services/user';

import { ReactComponent as FollowersIcon } from 'assets/img/followers.svg';

const UserProfilePage = () => {
  const userService = new UserService();
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

    let userData = {};
    try {
      const response = await userService.getUserProfile(username);
      userData = response.data;
    } catch (e) {
      // TODO: Handle with errors
    }
    setUserInfo(userData);
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