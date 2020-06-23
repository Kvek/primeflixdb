import React, { useState } from 'react';
import FilmTile from '@app/src/components/FilmTile';
import styled from '@emotion/styled';

const FilmCarouselInnerContainer = styled.div`
  display: flex;
  min-width: 100%;
  max-height: 100%;
  overflow: scroll;
  padding: 20px;
`;

const FilmCarouselContainer = styled.div`
  overflow: hidden;
  width: 100%;
  margin: 20px;
  max-height: 100%;

  &.showTileMeta {
    z-index: 2;
    overflow: visible;

    ${FilmCarouselInnerContainer} {
      margin-bottom: -198px;
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
            <FilmTile
              film={film}
              key={film?.id}
              setShowTileMeta={setShowTileMeta}
            />
          );
        })}
      </FilmCarouselInnerContainer>
    </FilmCarouselContainer>
  );
};

export default React.memo(FilmCarousel);
