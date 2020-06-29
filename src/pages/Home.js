import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { getMovies } from '@app/src/Api';

import trendingFilms from '@app/src/atoms/trendingFilms.atom';
import appConfig from '@app/src/atoms/appConfig.atom';
import popularFilms from '@app/src/atoms/popularFilms.atom';
import nowPlayingFilms from '@app/src/atoms/nowPlayingFilms.atom';

import BackdropImage from '@app/src/components/BackdropImage';
import FilmCarouselContainer from '@app/src/containers/FilmCarouselContainer';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  background: ${(props) => props.theme.colors.background};
  margin-top: 55px;
`;

const TilesContainer = styled.div`
  margin-top: 450px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  height: 100%;
`;

const Home = () => {
  const config = useRecoilValue(appConfig);

  const [trending, setTrending] = useRecoilState(trendingFilms);
  const [popular, setPopular] = useRecoilState(popularFilms);
  const [nowPlaying, setNowPlaying] = useRecoilState(nowPlayingFilms);

  useEffect(() => {
    getMovies().then((res) => {
      setPopular(res.data?.popular);
      setTrending(res.data?.trending);
      setNowPlaying(res.data?.now_playing);
    });
  }, []);

  const { secure_base_url } = config;

  return (
    <HomeContainer>
      <BackdropImage baseUrl={secure_base_url} films={trending} />
      <TilesContainer>
        <FilmCarouselContainer films={popular} title='popular' />
        <FilmCarouselContainer films={nowPlaying} title='Now playing' />
        <FilmCarouselContainer films={trending} title='trending' />
      </TilesContainer>
    </HomeContainer>
  );
};

export default Home;
