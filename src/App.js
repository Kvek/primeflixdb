import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'emotion-theming';
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
} from '@fortawesome/fontawesome-free-solid';
import { Router } from '@reach/router';
import theme from '@app/src/theme';
import { getTrending, getMediaVideo, getConfig } from '@app/src/Api';

import trendingFilms from '@app/src/atoms/trendingFilms.atom';
import appConfig from '@app/src/atoms/appConfig.atom';

import Navbar from '@app/src/components/Navbar';

import Films from '@app/src/pages/Films';
import Home from '@app/src/pages/Home';
import Tv from '@app/src/pages/Tv';
import Trailers from '@app/src/pages/Trailers';
import Playlists from '@app/src/pages/Playlists';
import Sidebar from '@app/src/components/Sidebar';

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
  const setTrending = useSetRecoilState(trendingFilms);
  const setAppConfig = useSetRecoilState(appConfig);

  useEffect(() => {
    library.add(
      faSearch,
      faTicketAlt,
      faFilm,
      faBell,
      faUserCircle,
      faArrowAltCircleRight,
      faBars,
      faTimes
    );

    getConfig().then((res) => {
      setAppConfig(res?.data?.images);
    });

    getTrending().then((res) => {
      let newData = res?.data?.results.map(async (film) => {
        const { media_type, id } = film;
        let videoData = [];

        await getMediaVideo(media_type, id).then((res) => {
          const data = {
            ...film,
            ...{ video: res?.data?.results[0] },
          };
          videoData = data;
        });
        return videoData;
      });

      Promise.all(newData).then((data) => {
        setTrending(data);
      });
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
