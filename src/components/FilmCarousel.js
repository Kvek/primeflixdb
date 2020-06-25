import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import FilmTile from '@app/src/components/FilmTile';
import ArrowContainer from '@app/src/components/ArrowContainer';

const ArrowLeftWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;
`;

const ArrowRightWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 50px;
  height: 100%;
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
  margin: 10px 0;
  pointer-events: none;

  &:hover {
    ${ArrowLeftWrapper}, ${ArrowRightWrapper} {
      opacity: 1;
    }

    &.isHovered {
      margin-top: -20px;
      margin-bottom: -20px;

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
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselContainer = useRef(null);
  let scrollEventListener;

  useEffect(() => {
    carouselContainer.current.addEventListener('scroll', () => {
      clearInterval(scrollEventListener);

      if (!isScrolling) {
        setIsScrolling(true);
      }

      scrollEventListener = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    });

    return () => {
      carouselContainer.removeEventListener('scroll');
    };
  }, [carouselContainer]);

  return (
    <CarouselContainer className={isHovered && 'isHovered'}>
      <ArrowLeftWrapper>
        <ArrowContainer />
      </ArrowLeftWrapper>
      <CarouselInnerContainer
        className={isHovered && 'isHovered'}
        ref={carouselContainer}
      >
        {films.map((film) => {
          return (
            <TileWrapper
              key={film.id}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={!isScrolling && isHovered && 'isHovered'}
            >
              <FilmTile
                film={film}
                setShowTileMeta={() => {}}
                isScrolling={isScrolling}
              />
            </TileWrapper>
          );
        })}
      </CarouselInnerContainer>
      <ArrowRightWrapper>
        <ArrowContainer isRight />
      </ArrowRightWrapper>
    </CarouselContainer>
  );
};

export default FilmCarousel;
