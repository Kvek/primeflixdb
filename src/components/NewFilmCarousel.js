import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import FilmInnerCarousel from '@components/FilmInnerCarousel';
import ArrowContainer from '@components/ArrowContainer';

import filmShape from '@app/shapes/film';

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const FilmInnerCarouselContainer = styled.div`
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  scroll-snap-type: x mandatory;
  width: 100%;
  overflow: hidden;
  overflow-x: visible;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArrowLeftWrapper = styled.div`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: calc(100% - 10px);
  max-height: 147px;
  left: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;
`;

const ArrowRightWrapper = styled.div`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'none' : 'flex')};
  width: 50px;
  height: calc(100% - 10px);
  max-height: 147px;
  right: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;
`;

const NewFilmCarousel = ({ films }) => {
  const currentCarouselIndex = useRef(0);
  const currentCarousel = useRef([]);
  const carouselContainerRef = useRef(null);

  const scrollCarousel = (index) => {
    currentCarouselIndex.current = index;
    currentCarousel.current[currentCarouselIndex.current].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  };

  const options = {
    root: carouselContainerRef.current,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentCarouselIndex.current = Number(entry.target.id);
      }
    });
  }, options);

  const setRef = (el, index) => {
    currentCarousel.current[index] = el;
    if (currentCarousel.current[index]) {
      observer.observe(currentCarousel.current[index]);
    }
  };

  return (
    <CarouselContainer>
      <ArrowLeftWrapper>
        <ArrowContainer
          onClickHandler={() =>
            scrollCarousel(
              currentCarouselIndex.current === 0
                ? 0
                : currentCarouselIndex.current - 1
            )
          }
        />
      </ArrowLeftWrapper>

      <FilmInnerCarouselContainer ref={carouselContainerRef}>
        {films.map((film, index) => (
          <FilmInnerCarousel
            films={film}
            key={index.toString()}
            ref={(el) => setRef(el, index)}
            id={index}
          />
        ))}
      </FilmInnerCarouselContainer>

      <ArrowRightWrapper>
        <ArrowContainer
          isRight
          onClickHandler={() =>
            scrollCarousel(
              currentCarouselIndex.current === 3
                ? 3
                : currentCarouselIndex.current + 1
            )
          }
        />
      </ArrowRightWrapper>
    </CarouselContainer>
  );
};
NewFilmCarousel.propTypes = {
  films: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape(filmShape)))
    .isRequired
};

export default NewFilmCarousel;
