import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import LoadingTileGroup from '@components/LoadingTileGroup';
import FilmCarousel from '@components/FilmCarousel';

import filmShape from '@shapes/film';

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

const FilmCarouselContainer = ({ films, title }) => (
  <CarouselContainer>
    <CarouselTitle>
      <h3>{title}</h3>
    </CarouselTitle>
    {films.length ? (
      <FilmCarousel films={films} />
    ) : (
      <LoadingTileGroup count={5} />
    )}
  </CarouselContainer>
);

FilmCarouselContainer.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape)).isRequired,
  title: PropTypes.string.isRequired
};

export default FilmCarouselContainer;
