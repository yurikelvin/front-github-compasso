import React, { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import TextGradient from 'components/TextGradient';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

import GithubService from 'services/github';

const AuthPage = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { search } = useLocation();
  const githubService = new GithubService();

  const loadGithubToken = async code => {
    await githubService.retrieveGithubTokenFromAPI(code);
    
    history.push({
      pathname: '/',
    });    
    setLoading(false);
  }

  useEffect(() => {
    if (githubService.isAuthenticated()) {
      history.push({
        pathname: '/',
      });
    } else {
      if (search.trim() !== '') {
        const searchParams = new URLSearchParams(search);
        const codeValue = searchParams.get('code');
        if (codeValue) {
          loadGithubToken(codeValue)
        }
      }
    }

    setLoading(false);
    // eslint-disable-next-line
  }, []);

 
  if (loading) {
    return <div className="w-full h-full flex">
      <Spinner loading={loading} />
    </div>
  }

  const handleBtnClick = () => {
    const authUrl = githubService.getAuthURL();
    if (authUrl) {
      window.open(authUrl,"_self")
    } 
  }

  return (
    <div className="Auth">
      <div className="Auth_container">
        <TextGradient value="Olá, seja bem-vindo! Para utilizar todas funcionalidades do sistema, pedimos que autorize a nossa extensão no GitHub." />
        <div className="Auth_autorize">
          <Button name="Autorizar" onClick={handleBtnClick} />
        </div>
      </div>
    </div>
  )
};

export default AuthPage;