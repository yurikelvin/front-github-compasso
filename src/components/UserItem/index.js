import React from 'react';

import { useHistory } from 'react-router-dom';

import { ReactComponent as FollowersIcon } from 'assets/img/followers.svg';
import { ReactComponent as RepositoryIcon } from 'assets/img/repository.svg';

const UserItem = ({ user }) => {
  const history = useHistory();

  const { avatar_url: avatarUrl, name, login, followers, following, bio, public_repos: publicRepos } = user;

  const handleClickUserItem = () => {
    history.push({
      pathname: `/${login}`,
      state: { user }
    })
  }

  return (
    <div className="UserItem" onClick={handleClickUserItem}>
      <div className="UserItem_leftAside">
        <div className="UserItem_avatarContainer">
          <img className="UserItem_avatar avatar_rounded" src={avatarUrl} alt={name} />
        </div>
        <div className="UserItem_details">
          <div className="UserItem_profileMetadata">
            <h3 className="UserItem_name">{name}</h3>
            <span className="UserItem_username">@{login}</span>
          </div>
          <div>
            <span className="UserItem_bio">
              {bio}
            </span>
          </div>
        </div>
      </div>
      <div className="UserItem_rightAside">
        <div className="UserItem_statTile">
          <FollowersIcon width={24} height={24} />
          <span className="UserItem_stat">{followers} seguidores</span>
          {'•'}
          <span className="UserItem_stat">{following} seguindo</span>
        </div>
        <div className="UserItem_statTile">
          <RepositoryIcon width={24} height={24} />
          <span className="UserItem_stat">{publicRepos} repositórios públicos</span>
        </div>
      </div>
    </div>
  )
};

export default UserItem;