import React, { useEffect, useState } from 'react';

import Spinner from 'components/Spinner';
import InfiniteScrollList from 'components/InfiniteScrollList';
import RepositoryItem from 'components/RepositoryItem';

import RepositoryService from 'services/repository';

const UserRepositories = ({ username, starred }) => {
  const repositoryService = new RepositoryService();
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultPage = 1;
  const perPage = 10;

  const getLoadingFn = async (page, size) => {
    if (starred) {
      return repositoryService.getStarredRepositories(username, page, size);
    }

    return repositoryService.getRepositories(username, page, size);
  };

  const loadStarredRepositories = async () => {
    try {
      const response = await repositoryService.getStarredRepositories(username, defaultPage, perPage)
      setRepositories(response.data);
    } catch(e) {
      // TODO
    }
  }

  const loadNormalRepositories = async () => {
    try {
      const response = await repositoryService.getRepositories(username, defaultPage, perPage)
      setRepositories(response.data);
    } catch(e) {
      // TODO
    }
  }

  const loadRepositories = async () => {
    setLoading(true);
    if (starred) {
      await loadStarredRepositories();
    } else {
      await loadNormalRepositories();
    }
    setLoading(false);
  }

  useEffect(() => {
    loadRepositories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="w-full h-full flex">
      <Spinner loading={loading} />
    </div>
  }

  const onClickItem = item => {
    if (item.html_url) {
      window.open(item.html_url);
    }
  }

  return (
    <div className="UserRepositories">
      <div
        id="userRepositoriesDiv"
        className="UserRepositories_innerList">
        <InfiniteScrollList
          scrollableTarget="userRepositoriesDiv"
          message="Todos repositórios foram exibidos."
          initialItems={repositories}
          initialPage={defaultPage}
          getItems={getLoadingFn}
          handleClickItem={onClickItem}>
          <RepositoryItem />
        </InfiniteScrollList>
        {repositories.length === 0 && (
          <div className="UserRepositories_emptyList">
            <span className="text-gray-700">Nenhum repositório encontrado.</span>
          </div>
        )}
      </div>
    </div>
  )
};

export default UserRepositories;