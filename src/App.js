import React, { useEffect } from 'react';
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
  faHeart,
  faPlus,
} from '@fortawesome/fontawesome-free-solid';
import { Router } from '@reach/router';
import theme from '@app/src/theme';

import { getConfig } from '@app/src/Api';

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
      faTimes,
      faHeart,
      faPlus
    );

    getConfig().then((res) => {
      setAppConfig(res?.data?.images);
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
