import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import FilmTile from '@app/src/components/FilmTile';
import ArrowContainer from '@app/src/components/ArrowContainer';
import LoadingTileGroup from '@app/src/components/LoadingTileGroup';

const ArrowLeftWrapper = styled.div`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: calc(100% - 10px);
  max-height: 147px;
  left: 0;
  opacity: 0;
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
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;

  &.showMeta {
    margin-top: -91px;
    margin-bottom: -91px;
  }

  &:hover {
    ${ArrowLeftWrapper}, ${ArrowRightWrapper} {
      opacity: 1;
    }

    &.isHovered {
      margin-top: -30px;
      margin-bottom: -30px;

      ${ArrowLeftWrapper}, ${ArrowRightWrapper} {
        height: calc(100% - 60px);
        opacity: 1;
      }
    }
  }
`;

const TileWrapper = styled.div`
  width: 100%;
  pointer-events: none;
  cursor: pointer;
  padding: 0 5px;
  transition: transform 0.2s linear;

  &:nth-last-of-type(1) {
    padding-right: 60px;
  }

  &:hover {
    z-index: 3;

    &.isHovered {
      transform: translateX(0%) !important;

      & ~ ${() => TileWrapper} {
        transform: translateX(10%) !important;
      }
    }
  }
`;

const CarouselInnerContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-x: scroll;
  height: 100%;
  padding-left: 50px;
  pointer-events: auto;
  scrollbar-width: none;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    &.isHovered {
      padding-top: 30px;
      padding-bottom: 30px;

      ${TileWrapper} {
        &.isHovered {
          transform: translateX(-10%);
        }
      }
    }
  }
`;

const FilmCarousel = ({ films }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const carouselContainer = useRef(null);
  let scrollEventListener;
  let carouselScrollListener;

  useEffect(() => {
    if (films) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [films]);

  useEffect(() => {
    if (!isLoading) {
      carouselContainer.current.addEventListener(
        'scroll',
        (carouselScrollListener = () => {
          clearInterval(scrollEventListener);

          if (!isScrolling) {
            setIsScrolling(true);
          }

          scrollEventListener = setTimeout(() => {
            setIsScrolling(false);
          }, 500);
        })
      );

      return () => {
        carouselContainer.current.removeEventListener(
          'scroll',
          carouselScrollListener
        );
      };
    }
  }, [isLoading]);

  const filmsGroup = films.map((film) => {
    return (
      <TileWrapper
        key={film.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={!isScrolling && isHovered && !showMeta && 'isHovered'}
      >
        <FilmTile
          film={film}
          setShowTileMeta={(status) => setShowMeta(status)}
          isScrolling={isScrolling}
        />
      </TileWrapper>
    );
  });

  return (
    <CarouselContainer
      className={classnames(
        isHovered && !showMeta && 'isHovered',
        showMeta && 'showMeta'
      )}
    >
      <ArrowLeftWrapper isLoading={isLoading}>
        <ArrowContainer />
      </ArrowLeftWrapper>
      <CarouselInnerContainer
        className={isHovered && !showMeta && 'isHovered'}
        ref={carouselContainer}
      >
        {isLoading ? <LoadingTileGroup count={5} /> : filmsGroup}
      </CarouselInnerContainer>
      <ArrowRightWrapper isLoading={isLoading}>
        <ArrowContainer isRight />
      </ArrowRightWrapper>
    </CarouselContainer>
  );
};

export default FilmCarousel;
