import React from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

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
  display: flex;
  flex-direction: column;
  z-index: 2;
  height: 100%;
`;

const Home = () => {
  const popular = useRecoilValue(popularFilms);

  return (
    <HomeContainer>
      <BackdropImage films={popular.length !== 0 ? popular[0] : []} />
      <TilesContainer style={{ marginTop: popular.length ? '-120px' : 0 }}>
        <NewFilmCarousel films={popular} />
      </TilesContainer>
    </HomeContainer>
  );
};

export default Home;
