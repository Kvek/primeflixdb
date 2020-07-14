import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import FilmInnerCarousel from '@components/FilmInnerCarousel';
import ArrowContainer from '@components/ArrowContainer';
import LoadingTileGroup from '@components/LoadingTileGroup';

import filmShape from '@app/shapes/film';

import AppContext from '@app/AppContext';

const CarouselOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const CarouselIndicator = styled.div`
  height: 10px;
  width: 100px;
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 1;
  padding: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
`;

const Indicator = styled.span`
  width: 16px;
  height: 2px;
  display: flex;
  margin: 0 3px;
  background: ${(props) =>
    props.currentCarousel ? props.theme.colors.white : props.theme.colors.gray};
  padding: 0;
  cursor: pointer;
  z-index: 1;

  &.isLoading {
    background: ${(props) => props.theme.colors.black};
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  pointer-events: none;
  height: 250px;
  position: relative;
  align-items: center;
`;

const FilmInnerCarouselContainer = styled.div`
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  scroll-snap-type: x mandatory;
  width: 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  overflow-x: visible;
  scrollbar-width: none;
  pointer-events: auto;

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
  height: 100%;
  max-height: 147px;
  left: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;

  &.isLoading {
    display: none;
  }
`;

const ArrowRightWrapper = styled.div`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'none' : 'flex')};
  width: 50px;
  height: 100%;
  max-height: 147px;
  right: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;

  &.isLoading {
    display: none;
  }
`;

const NewFilmCarousel = ({ films }) => {
  const currentCarouselIndex = useRef(0);
  const currentCarousel = useRef([]);
  const carouselContainerRef = useRef(null);
  const [currentIndicator, setCurrentIndicator] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const appConfig = useContext(AppContext);

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
        setCurrentIndicator(Number(entry.target.id));
      }
    });
  }, options);

  const setRef = (el, index) => {
    currentCarousel.current[index] = el;
    if (currentCarousel.current[index]) {
      observer.observe(currentCarousel.current[index]);
    }
  };

  useEffect(() => {
    if (films.length) return setIsLoading(false);
  }, [films]);

  return (
    <CarouselOuterContainer>
      <CarouselIndicator>
        {isLoading ? (
          <>
            <Indicator className={isLoading && 'isLoading'} />
            <Indicator className={isLoading && 'isLoading'} />
            <Indicator className={isLoading && 'isLoading'} />
          </>
        ) : (
          films.map((_, index) => (
            <Indicator
              currentCarousel={currentIndicator === index}
              onClick={() => scrollCarousel(index)}
              key={index.toString()}
            />
          ))
        )}
      </CarouselIndicator>
      <CarouselContainer>
        <ArrowLeftWrapper className={isLoading && 'isLoading'}>
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
          {isLoading ? (
            <LoadingTileGroup count={appConfig?.numberOfTiles} />
          ) : (
            films.map((film, index) => (
              <FilmInnerCarousel
                films={film}
                key={index.toString()}
                ref={(el) => setRef(el, index)}
                id={index}
              />
            ))
          )}
        </FilmInnerCarouselContainer>

        <ArrowRightWrapper className={isLoading && 'isLoading'}>
          <ArrowContainer
            isRight
            onClickHandler={() =>
              scrollCarousel(
                currentCarouselIndex.current === films.length - 1
                  ? films.length - 1
                  : currentCarouselIndex.current + 1
              )
            }
          />
        </ArrowRightWrapper>
      </CarouselContainer>
    </CarouselOuterContainer>
  );
};

NewFilmCarousel.propTypes = {
  films: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape(filmShape)))
    .isRequired
};

export default React.memo(NewFilmCarousel);
