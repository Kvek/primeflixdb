import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import filmShape from '@app/shapes/film';

import Tile from '@components/Tile';

import styled from '@emotion/styled';

import mediaTile from '@atoms/mediaTile.atom';

const TileWrapper = styled.div`
  padding-right: 8px;
  width: 100%;
  height: 100%;
  max-width: 260px;
  max-height: 147px;
  transition: all 0.2s ease-in-out;
  pointer-events: auto;
  position: relative;

  &:hover {
    transform: translate3d(0, 0, 0) !important;

    & ~ ${() => TileWrapper} {
      /* transform: translate3d(8px, 0, 0) !important; */
    }
  }
`;

const FilmInnerCarouselContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-left: 50px;
  pointer-events: none;
  transition: margin 0.2s ease-in-out;
  background: red;

  &:hover {
    ${TileWrapper} {
      /* transform: translate3d(-8px, 0, 0); */
    }
  }

  &:nth-last-of-type(1) {
    padding-right: 50px;
  }
`;

const TileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  pointer-events: none;
`;

const MediaTiles = React.memo(({ media }) => {
  const [showTileMeta, setShowMeta] = useState(false);
  const [id, setTileId] = useState(null);
  const setMediaData = useSetRecoilState(mediaTile(id));

  useEffect(() => {
    setTileId(uuidv4());
  }, []);

  useEffect(() => {
    setMediaData(media);
  }, [media, id]);

  return (
    <div
      onMouseEnter={() => setShowMeta(true)}
      onMouseLeave={() => setShowMeta(false)}
    >
      {id && <Tile id={id} showMeta={showTileMeta} />}
    </div>
  );
});

const FilmInnerCarousel = React.forwardRef(({ films, id }, ref) => {
  const [currentHoveredTileIndex, setIndex] = useState(null);

  return (
    <FilmInnerCarouselContainer
      ref={ref}
      id={id}
      currentTileIndex={currentHoveredTileIndex}
    >
      <TileContainer>
        {films.map((film, index) => (
          <TileWrapper
            key={index.toString()}
            onMouseEnter={() => setIndex(index)}
            onMouseLeave={() => setIndex(null)}
          >
            <MediaTiles media={film} />
          </TileWrapper>
        ))}
      </TileContainer>
    </FilmInnerCarouselContainer>
  );
});

MediaTiles.propTypes = {
  media: PropTypes.shape(filmShape).isRequired
};

FilmInnerCarousel.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape)).isRequired,
  id: PropTypes.number.isRequired
};

export default FilmInnerCarousel;
