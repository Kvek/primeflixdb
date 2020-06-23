import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import trendingFilms from '@app/src/atoms/trendingFilms.atom';
import appConfig from '@app/src/atoms/appConfig.atom';
import FilmCarousel from '@app/src/components/FilmCarousel';
import BackdropImage from '@app/src/components/BackdropImage';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  overflow: scroll;
  background: ${(props) => props.theme.colors.background};
  margin-top: 55px;
`;

const TileContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: scroll;
  height: 100%;
`;

const Home = () => {
  const trending = useRecoilValue(trendingFilms);
  const config = useRecoilValue(appConfig);

  const { secure_base_url } = config;

  return (
    <HomeContainer>
      <BackdropImage baseUrl={secure_base_url} films={trending} />
      <TileContainer></TileContainer>
    </HomeContainer>
  );
};

export default Home;
