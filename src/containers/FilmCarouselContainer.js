import React from 'react';
import styled from '@emotion/styled';

import FilmCarousel from '@app/src/components/FilmCarousel';

const CarouselContainer = styled.div`
  margin: 25px 0;
`;

const FilmCarouselContainer = ({ films }) => {
  return (
    <CarouselContainer>
      <FilmCarousel films={films} />
    </CarouselContainer>
  );
};

export default FilmCarouselContainer;
