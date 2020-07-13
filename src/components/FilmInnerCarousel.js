import React from 'react';
import PropTypes from 'prop-types';
import filmShape from '@app/shapes/film';
import FilmTile from '@components/FilmTile';
import styled from '@emotion/styled';

const FilmInnerCarouselContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  scroll-margin-left: 50px;

  &:nth-last-of-type(1) {
    padding-right: 50px;
  }
`;

const FilmInnerCarousel = React.forwardRef(({ films, id }, ref) => (
  <FilmInnerCarouselContainer ref={ref} id={id}>
    {films.map((film, index) => (
      <FilmTile film={film} setShowTileMeta={() => {}} key={index.toString()} />
    ))}
  </FilmInnerCarouselContainer>
));

FilmInnerCarousel.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape)).isRequired,
  id: PropTypes.number.isRequired
};

export default FilmInnerCarousel;
