import React from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import appConfig from '@atoms/appConfig.atom';
import popularFilms from '@atoms/popularFilms.atom';

import BackdropImage from '@components/BackdropImage';

import NewFilmCarousel from '@app/components/NewFilmCarousel';

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
  const popular = useRecoilValue(popularFilms);
  const config = useRecoilValue(appConfig);

  const { secure_base_url } = config;

  return (
    <HomeContainer>
      <BackdropImage
        baseUrl={secure_base_url}
        films={popular.length !== 0 && popular[0]}
      />
      <TilesContainer>
        <NewFilmCarousel films={popular} />
      </TilesContainer>
    </HomeContainer>
  );
};

export default Home;
