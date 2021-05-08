import React from 'react';

import TextGradient from 'components/TextGradient';
import UserContainer from 'components/UserContainer';

const HomePage = () => {
  return (
    <div className="Home">
      <div className="Home_container">
        <TextGradient value="Olá, seja bem-vindo! Aqui você poderá buscar por um determinado usuário do GitHub." />
        <UserContainer />
      </div>
    </div>
  )
}

export default HomePage;