import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

import styled from '@emotion/styled';

import popularFilms from '@atoms/popularFilms.atom';

import BackdropImage from '@components/BackdropImage';

import NewFilmCarousel from '@components/NewFilmCarousel';
import LoadingTileGroup from '@components/LoadingTileGroup';

import carouselTypes from '@app/carouselTypes';

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
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(3);

  const [ref, inView] = useInView({
    threshold: 1.0
  });

  React.useEffect(() => {
    // listen to loading changes inside each carousel
    if (currentCarouselIndex <= carouselTypes.length) {
      setCurrentCarouselIndex(currentCarouselIndex + 1);
    }
  }, [inView]);

  return (
    <HomeContainer>
      <BackdropImage films={popular.length !== 0 ? popular[0] : []} />
      <TilesContainer style={{ marginTop: popular.length ? '-120px' : 0 }}>
        {carouselTypes.map(
          (carousel, index) =>
            index <= currentCarouselIndex - 2 && (
              <NewFilmCarousel films={popular} key={carousel} />
            )
        )}
      </TilesContainer>

      {/* listen to loading changes inside each carousel */}
      {currentCarouselIndex !== carouselTypes.length && (
        <div ref={ref}>
          <LoadingTileGroup count={5} />
        </div>
      )}
    </HomeContainer>
  );
};

export default Home;
