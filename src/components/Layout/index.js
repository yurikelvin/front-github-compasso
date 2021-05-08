import React from 'react';

import { useHistory } from 'react-router-dom';

import { ReactComponent as GithubLogo} from 'assets/img/github-logo.svg';
import compassoLogo from 'assets/img/compasso-logo.png';
import githubMark from 'assets/img/github-mark.png';

const Layout = ({ children }) => {
  const history = useHistory();

  const handleClickGithub = () => {
    history.push({
      pathname: `/`,
    })
  }

  return (
    <div className="Layout">
      <div className="Layout_nav">
        <div className="Layout_nav_github cursor-pointer" onClick={handleClickGithub}>
          <img src={githubMark} alt="Github Mark" width={64} height={64} />
          <GithubLogo title="Github Logo" width={128} height={128} />
        </div>
        <img src={compassoLogo} alt="Compasso" />
      </div>
      <div className="Layout_content">
        <div className="Layout_content_innerDiv">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;