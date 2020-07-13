import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'emotion-theming';
import { chunk } from 'lodash';

import styled from '@emotion/styled';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faTicketAlt,
  faFilm,
  faBell,
  faUserCircle,
  faArrowAltCircleRight,
  faBars,
  faTimes,
  faHeart,
  faPlus
} from '@fortawesome/fontawesome-free-solid';
import { Router } from '@reach/router';

import appConfig from '@atoms/appConfig.atom';
import trendingFilms from '@atoms/trendingFilms.atom';
import popularFilms from '@atoms/popularFilms.atom';
import nowPlayingFilms from '@atoms/nowPlayingFilms.atom';

import theme from '@app/theme';
import { getConfig, getMovies } from '@app/Api';

import Sidebar from '@components/Sidebar';
import Navbar from '@components/Navbar';

import Films from '@pages/Films';
import Home from '@pages/Home';
import Tv from '@pages/Tv';
import Trailers from '@pages/Trailers';
import Playlists from '@pages/Playlists';

const AppContainer = styled.div`
  width: 100%;
  min-width: calc(100% - 40px);
  height: 100%;
  min-height: calc(100vh - 55px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: ${(props) => props.theme.colors.background};
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const App = () => {
  const setAppConfig = useSetRecoilState(appConfig);
  const setTrending = useSetRecoilState(trendingFilms);
  const setPopular = useSetRecoilState(popularFilms);
  const setNowPlaying = useSetRecoilState(nowPlayingFilms);

  useEffect(() => {
    library.add(
      faSearch,
      faTicketAlt,
      faFilm,
      faBell,
      faUserCircle,
      faArrowAltCircleRight,
      faBars,
      faTimes,
      faHeart,
      faPlus
    );

    getConfig().then((res) => {
      setAppConfig(res?.data?.images);
    });

    getMovies().then((res) => {
      setPopular(chunk(res.data?.popular, 5));
      setTrending(chunk(res.data?.trending, 5));
      setNowPlaying(chunk(res.data?.now_playing, 5));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar />
        <Router>
          <Home path='/' />
          <Tv path='/tv' />
          <Films path='/films' />
          <Trailers path='/trailers' />
          <Playlists path='/playlists' />
        </Router>
      </AppContainer>
      <Sidebar />
    </ThemeProvider>
  );
};

export default App;
