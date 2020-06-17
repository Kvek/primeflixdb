import React, { useEffect, Component } from 'react';
import styled from '@emotion/styled';
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
import Navbar from '@app/src/components/Navbar';

import Films from '@app/src/pages/Films';
import Home from '@app/src/pages/Home';
import Tv from '@app/src/pages/Tv';
import Trailers from '@app/src/pages/Trailers';
import Playlists from '@app/src/pages/Playlists';

const AppContainer = styled.div`
  width: 100%;
  min-width: calc(100% - 40px);
  height: calc(100vh - 55px);
  max-height: calc(100vh - 65px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 55px 0 0;
  padding: 10px 0 0;
  background: ${(props) => props.theme.colors.app};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const App = () => {
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
    </ThemeProvider>
  );
};

export default App;
