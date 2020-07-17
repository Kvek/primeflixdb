import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import filmShape from '@app/shapes/film';

import Tile from '@components/Tile';

import styled from '@emotion/styled';

import mediaTile from '@atoms/mediaTile.atom';

const TileWrapper = styled.div`
  margin-right: 8px;
  width: 100%;
  height: 100%;
  max-width: 260px;
  max-height: 147px;
  transition: transform 0.2s linear;
  pointer-events: auto;
  position: relative;

  &.currentHoveredTile {
    z-index: 2;
  }

  &.showMeta {
    transform: translateX(0) !important;

    & ~ ${() => TileWrapper} {
      transform: translateX(68px) !important;
    }

    &:hover {
      transform: translateX(0) !important;

      & ~ ${() => TileWrapper} {
        transform: translateX(68px) !important;
      }
    }
  }

  &.hideMeta {
    &:hover {
      transform: scale(1.2) translateX(0) !important;

      & ~ ${() => TileWrapper} {
        transform: translateX(28px) !important;
      }
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
  transition: margin-right 0.2s linear, margin-left 0.2s linear;

  &.hideMeta {
    &:hover {
      margin-right: 28px;
      margin-left: 28px;

      ${TileWrapper} {
        transform: translateX(-28px);
      }
    }
  }

  &.showMeta {
    margin-right: 68px;
    margin-left: 68px;

    ${TileWrapper} {
      transform: translateX(-68px);
    }

    &:hover {
      margin-right: 68px;
      margin-left: 68px;

      ${TileWrapper} {
        transform: translateX(-68px);
      }
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
  opacity: 1;
`;

const MediaTiles = React.memo(({ media, toggleMeta, index }) => {
  const [showTileMeta, setShowMeta] = useState(false);
  const [id, setTileId] = useState(null);
  const setMediaData = useSetRecoilState(mediaTile(id));

  useEffect(() => {
    setTileId(uuidv4());
  }, []);

  useEffect(() => {
    setMediaData(media);
  }, [media, id]);

  useEffect(() => {
    toggleMeta(showTileMeta ? index : null);
  }, [showTileMeta]);

  if (!id) return null;

  return (
    <Tile
      id={id}
      showMeta={showTileMeta}
      toggleMeta={() => setShowMeta(!showTileMeta)}
    />
  );
});

const FilmInnerCarousel = React.forwardRef(({ films, id }, ref) => {
  const [currentMetaShowingTile, setShowMetaStatus] = useState(null);
  const [outerTileIndex, setOuterTileIndex] = useState(null);

  const setOuterTileHoverIndex = (index) => {
    const indexVal = index === 0 || index === films.length - 1;
    setOuterTileIndex(indexVal ? index : null);
  };

  return (
    <FilmInnerCarouselContainer
      ref={ref}
      id={id}
      className={currentMetaShowingTile ? 'showMeta' : 'hideMeta'}
      mediaTileIndex={outerTileIndex}
    >
      <TileContainer>
        {films.map((film, index) => (
          <TileWrapper
            key={index.toString()}
            className={classnames(
              currentMetaShowingTile === index && 'showMeta',
              currentMetaShowingTile === null && 'hideMeta'
            )}
            onMouseOver={() => setOuterTileHoverIndex(index)}
          >
            <MediaTiles
              media={film}
              index={index}
              toggleMeta={setShowMetaStatus}
            />
          </TileWrapper>
        ))}
      </TileContainer>
    </FilmInnerCarouselContainer>
  );
});

MediaTiles.propTypes = {
  media: PropTypes.shape(filmShape).isRequired,
  toggleMeta: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

FilmInnerCarousel.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape)).isRequired,
  id: PropTypes.number.isRequired
};

export default FilmInnerCarousel;
