import React, { useState } from 'react';
import FilmTile from '@app/src/components/FilmTile';
import styled from '@emotion/styled';

const FilmTileWrapper = styled.div`
  transition: transform 0.2s linear;

  &:hover {
    transform: translateX(0) !important;
    z-index: 2;

    & ~ ${() => FilmTileWrapper} {
      transform: translateX(5%);
    }
  }
`;

const FilmCarouselInnerContainer = styled.div`
  display: flex;
  min-width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  height: 100%;
  transition: transform 0.2s linear;
  pointer-events: none;

  &:hover {
    pointer-events: auto;

    ${FilmTileWrapper} {
      transform: translateX(-5%);
    }
  }
`;

const FilmCarouselContainer = styled.div`
  overflow: hidden;
  width: 100%;
  margin: 20px;
  max-height: 100%;
  pointer-events: none;

  &.showTileMeta {
    z-index: 2;
    margin-bottom: -200px;
    margin-top: -80px;

    @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
      margin-bottom: -373px;
    }

    @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
      margin-bottom: -388px;
    }

    @media (min-width: ${(props) => props.theme.maxPageWidth.wide}) {
      margin-bottom: -415px;
    }

    ${FilmCarouselInnerContainer} {
      padding-bottom: 220px;
      padding-top: 100px;
    }
  }
`;

const FilmCarousel = ({ films }) => {
  const [showTileMeta, setShowTileMeta] = useState(false);

  return (
    <FilmCarouselContainer className={showTileMeta && 'showTileMeta'}>
      <FilmCarouselInnerContainer>
        {films.map((film) => {
          return (
            <FilmTileWrapper>
              <FilmTile
                film={film}
                key={film?.id}
                setShowTileMeta={setShowTileMeta}
              />
            </FilmTileWrapper>
          );
        })}
      </FilmCarouselInnerContainer>
    </FilmCarouselContainer>
  );
};

export default React.memo(FilmCarousel);
