import React, { useState } from 'react';
import styled from '@emotion/styled';
import NewFilmTile from '@app/src/components/NewFilmTile';
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

  &:nth-last-of-type(1) {
    padding-right: 60px;
  }
`;

const CarouselInnerContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-x: scroll;
  width: calc(100% + 50px);
  height: 100%;
  padding-left: 50px;
  pointer-events: auto;

  &:hover {
    &.isHovered {
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
`;

const NewFilmCarousel = ({ films }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <CarouselContainer className={isHovered && 'isHovered'}>
      <ArrowLeftWrapper>
        <ArrowContainer />
      </ArrowLeftWrapper>
      <CarouselInnerContainer className={isHovered && 'isHovered'}>
        {films.map((film) => {
          return (
            <TileWrapper
              key={film.id}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <NewFilmTile film={film} setShowTileMeta={() => {}} />
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

export default NewFilmCarousel;
