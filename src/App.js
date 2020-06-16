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
} from '@fortawesome/fontawesome-free-solid';
import { Router } from '@reach/router';
import theme from '@app/src/theme';
import Navbar from '@app/src/components/Navbar';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 55px;
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
      faArrowAltCircleRight
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <AppContainer></AppContainer>
    </ThemeProvider>
  );
};

export default App;
