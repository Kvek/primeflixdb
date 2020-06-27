import React from 'react';
import styled from '@emotion/styled';

import FilmCarousel from '@app/src/components/FilmCarousel';

const CarouselContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
`;

const CarouselTitle = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 50px;

  h3 {
    font-size: 25px;
    margin: 0;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.white};
  }
`;

const FilmCarouselContainer = ({ films, title }) => {
  return (
    <CarouselContainer>
      <CarouselTitle>
        <h3>{'title'}</h3>
      </CarouselTitle>
      <FilmCarousel films={films} />
    </CarouselContainer>
  );
};

export default FilmCarouselContainer;
