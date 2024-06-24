import axios from 'axios';

import { useState, useEffect } from 'react';

import '../stylessheet/GitHubData.css'

const GitHubData = () => {
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState('');
  const [reposData, setReposData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    //console.log(e.target.value);
  };

  const gitHubToken = import.meta.env.VITE_GITHUB_TOKEN;
  const urlApi = import.meta.env.VITE_URL_API;
  //console.log('GitHub token', gitHubToken);
  //console.log('Url api', urlApi);

  const callApiUser = async (user) => {
    const urlUser = `${urlApi}${user}`;
    const reposUrl = `${urlUser}/repos`;

    const headers = {
      Authorization: `token ${gitHubToken}`,
    }

    try {
      const [userData, reposData] = await Promise.all([
      await axios.get(urlUser, { headers }),
      await axios.get(reposUrl, { headers }),
    ]);
    //console.log(userData);
    //console.log(reposData);
    setUserData(userData.data);
    setReposData(reposData.data);
    setError(false);
    setErrorMessage('');

    } catch (error) {
      setError(true)
      if (error.response.status === 404) {
        //console.log('Please, enter a valid username');
        setErrorMessage('Please, enter a valid GitHub username.');
        setUserData('');
        setReposData([]);
        //Luego de 3 segundos, se borra el error
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
      } else {
        //console.log(`Error: ${error.message}`);
        setErrorMessage('Error', error.message);
        setUserData('');
        setReposData([]);
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
      }
    }
};

  const searchUser = (e) => {
    e.preventDefault();
    if (inputValue === '') {
      //console.log('Please enter a username');
      setError(true);
      setErrorMessage('Please enter a username.');
      setUserData('');
      setReposData([]);
      setTimeout(() => {
          setErrorMessage('');
      }, 3000);
      return;
    }
    callApiUser(inputValue);
  }

  const MostrarError = ({ mensaje }) => (
    <h5 style={{ color: 'red', width: '100%', textAlign: 'left' }}>{mensaje}</h5>
  )
  
  return (
    <section className="main-wrapper">
        <div className="search-wrapper">
            <input 
            onChange={onInputChange}
            type="text" 
            className="search-user" 
            placeholder="Enter a GitHub Username" />
            <button onClick={ searchUser }>Search</button>
        </div>
        {error && <MostrarError mensaje={errorMessage} />}

        {userData && (
          <div className="data-wrapper">
            <div>
                <div className="left-section">
                    <img src={userData.avatar_url} alt="GitHub Avatar Image" />
                </div>
                <div className="right-section">
                    <h3>{userData.name}</h3>
                    <p>{userData.bio}</p>
                    <div className="user-stats">
                        <p>{userData.followers} <span>Followers</span></p>
                        <p>{userData.following} <span>Following</span></p>
                        <p>{userData.public_repos} <span>Repos</span></p>
                    </div>
                
                    <h3>Repositories: </h3>
                    <div className="link-repos">
                      {reposData.map((repo) => (
                        <a key={repo.id} href="{repo.html_url}">{repo.name}</a>
                      ))}
                    </div>
                </div>
            </div>
        </div>
        )}
    </section>
  );
};

export default GitHubData;