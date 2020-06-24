import React from 'react';
import styled from '@emotion/styled';
import NewFilmTile from '@app/src/components/NewFilmTile';
import ArrowContainer from '@app/src/components/ArrowContainer';

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  margin: 10px 0;
`;

const TileWrapper = styled.div`
  &:nth-last-of-type(1) {
    padding-right: 50px;
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
`;

const NewFilmCarousel = ({ films }) => {
  return (
    <CarouselContainer>
      <ArrowContainer />
      <CarouselInnerContainer>
        {films.map((film) => {
          return (
            <TileWrapper key={film.id}>
              <NewFilmTile film={film} setShowTileMeta={() => {}} />
            </TileWrapper>
          );
        })}
      </CarouselInnerContainer>
      <ArrowContainer isRight />
    </CarouselContainer>
  );
};

export default NewFilmCarousel;
