import React, { useState } from 'react';

import TabItem from 'components/TabItem';
import UserRepositories from 'components/UserRepositories';

import { formatDate } from 'util/date';

const Tab = {
  REPOSITORIES: 'repositories',
  STARRED: 'starred',
  OVERVIEW: 'overview'
}

const RepositoryContainer = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(Tab.OVERVIEW);
  const { login: username, created_at: createdAt, public_repos: publicRepos } = user;

  const changeTab = tab => {
    if (selectedTab !== tab) {
      setSelectedTab(tab);
    }
  };

  const getOverViewContent = () => {
    return (
      <div className="RepositoryContainer_overview">
        <span>
          O usuário {username} foi criado no dia {formatDate(createdAt)}.
        </span>
        <span className="mt-1">
          Até o momento este usuário contribuiu com {publicRepos} repositório(s) público(s).
        </span>
        <span className="mt-1">
          Para visualizar o(s) repositório(s) público(s) clique no botão <span className="highlight">Repos</span>.
        </span>
        <span className="mt-1">
          Para visualizar o(s) repositório(s) favoritado(s), ou mais visitado(s) por este usuário, clique no botão <span className="highlight">Starred</span>.
        </span>
      </div>
    )
  }

  let contentTab = '';
  switch(selectedTab) {
    case Tab.REPOSITORIES:
      contentTab = <UserRepositories key="normal-repositories" username={username} starred={false} />
      break;
    case Tab.STARRED:
      contentTab = <UserRepositories key="starred-repositories" username={username} starred />
      break;
    case Tab.OVERVIEW:
      contentTab = getOverViewContent();
      break;
    default:
      contentTab = <div />;
  }
  return (
    <div className="RepositoryContainer">
      <div>
        <nav className="RepositoryContainer_nav">
          <TabItem
            description="Visão Geral"
            isActive={selectedTab === Tab.OVERVIEW}
            handleClick={() => changeTab(Tab.OVERVIEW)}
          />
          <TabItem
            description="Repos"
            isActive={selectedTab === Tab.REPOSITORIES}
            handleClick={() => changeTab(Tab.REPOSITORIES)}
          />
          <TabItem
            description="Starred"
            isActive={selectedTab === Tab.STARRED}
            handleClick={() => changeTab(Tab.STARRED)}
          />
        </nav>
      </div>
      <div className="RepositoryContainer_content">
        {contentTab}
      </div>
    </div>
  )
}

export default RepositoryContainer;