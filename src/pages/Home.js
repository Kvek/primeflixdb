import React from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import trendingFilms from '@app/src/atoms/trendingFilms.atom';
import appConfig from '@app/src/atoms/appConfig.atom';
import BackdropImage from '@app/src/components/BackdropImage';
import FilmCarouselContainer from '@app/src/containers/FilmCarouselContainer';

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

const TilesContainer = styled.div`
  margin-top: 500px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  height: 100%;
`;

const Home = () => {
  const trending = useRecoilValue(trendingFilms);
  const config = useRecoilValue(appConfig);

  const { secure_base_url } = config;

  return (
    <HomeContainer>
      <BackdropImage baseUrl={secure_base_url} films={trending} />
      <TilesContainer>
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
        <FilmCarouselContainer films={trending} />
      </TilesContainer>
    </HomeContainer>
  );
};

export default Home;
