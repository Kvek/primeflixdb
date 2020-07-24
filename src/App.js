import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'emotion-theming';
import { chunk, isEqual } from 'lodash';
import withSizes from 'react-sizes';

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
import { Router, Redirect } from '@reach/router';

import appConfig from '@atoms/appConfig.atom';
import trendingFilms from '@atoms/trendingFilms.atom';
import popularFilms from '@atoms/popularFilms.atom';
import nowPlayingFilms from '@atoms/nowPlayingFilms.atom';

import theme from '@app/theme';
import { getConfig, getMovies } from '@app/Api';
import AppContext from '@app/AppContext';

import Sidebar from '@components/Sidebar';
import Navbar from '@components/Navbar';

import Films from '@pages/Films';
import Details from '@pages/Details';
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

const App = ({ numberOfTiles, deviceWidths }) => {
  const setAppConfig = useSetRecoilState(appConfig);
  const setTrending = useSetRecoilState(trendingFilms);
  const setPopular = useSetRecoilState(popularFilms);
  const setNowPlaying = useSetRecoilState(nowPlayingFilms);

  const [appConfigContext, setAppConfigContext] = useState({});

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
      setAppConfig({ images: res?.data?.images });
    });
  }, []);

  useEffect(() => {
    getMovies().then((res) => {
      setPopular(chunk(res.data?.popular, numberOfTiles));
      setTrending(chunk(res.data?.trending, numberOfTiles));
      setNowPlaying(chunk(res.data?.now_playing, numberOfTiles));
    });
  }, [numberOfTiles]);

  useEffect(() => {
    if (!isEqual(appConfigContext, { numberOfTiles, deviceWidths })) {
      setAppConfigContext({
        deviceWidths,
        numberOfTiles
      });
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appConfigContext}>
        <AppContainer>
          <Navbar />
          <Router>
            <Home path='/' />
            <Tv path='tv' />
            <Films path='films' />
            <Details path='details/:id' />
            <Trailers path='/trailers' />
            <Playlists path='/playlists' />
            <Redirect from='*' to='/' noThrow />
          </Router>
        </AppContainer>
        <Sidebar />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

const mapSizesToProps = (sizes) => {
  const isDesktop = sizes.width >= 1024 && sizes.width <= 1528;
  const isWide = sizes.width > 1528;

  return {
    deviceWidths: {
      isMobile: withSizes.isMobile(sizes),
      isTablet: withSizes.isTablet(sizes),
      isDesktop,
      isWide
    },
    numberOfTiles: isWide ? 7 : 5
  };
};

App.propTypes = {
  numberOfTiles: PropTypes.number.isRequired,
  deviceWidths: PropTypes.shape({
    isMobile: PropTypes.bool,
    isTablet: PropTypes.bool,
    isDesktop: PropTypes.bool,
    isWide: PropTypes.bool
  }).isRequired
};

export default withSizes(mapSizesToProps)(App);
