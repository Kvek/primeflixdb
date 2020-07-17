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
  padding-right: 8px;
  width: 100%;
  height: 100%;
  max-width: 260px;
  max-height: 147px;
  transition: all 0.2s linear;
  pointer-events: auto;
  position: relative;

  &.currentHoveredTile {
    z-index: 2;
  }

  &.showMeta {
    transform: scale(1) translate3d(0, 0, 0) !important;

    & ~ ${() => TileWrapper} {
      transform: translate3d(76px, 0, 0) !important;
    }

    &:hover {
      transform: translate3d(0, 0, 0) !important;

      & ~ ${() => TileWrapper} {
        transform: translate3d(76px, 0, 0) !important;
      }
    }
  }

  &.hideMeta {
    &:hover {
      transform: scale(1.2) translate3d(0, 0, 0) !important;

      & ~ ${() => TileWrapper} {
        transform: translate3d(28px, 0, 0) !important;
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

  &.hideMeta {
    &:hover {
      ${TileWrapper} {
        transform: translate3d(-28px, 0, 0);
      }
    }
  }

  &.showMeta {
    ${TileWrapper} {
      transform: translate3d(-68px, 0, 0);
    }

    &:hover {
      ${TileWrapper} {
        transform: translate3d(-68px, 0, 0);
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
  pointer-events: auto;
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
    if (showTileMeta) {
      toggleMeta(index);
    } else {
      toggleMeta(null);
    }
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
  const [isMetaShowing, setIsMetaShowing] = useState(false);

  useEffect(() => {
    if (currentMetaShowingTile) {
      setIsMetaShowing(true);
    } else {
      setIsMetaShowing(false);
    }
    return () => {
      setIsMetaShowing(false);
    };
  }, [currentMetaShowingTile]);

  return (
    <FilmInnerCarouselContainer
      ref={ref}
      id={id}
      className={currentMetaShowingTile ? 'showMeta' : 'hideMeta'}
    >
      <TileContainer>
        {films.map((film, index) => (
          <TileWrapper
            key={index.toString()}
            className={classnames(
              currentMetaShowingTile === index && 'showMeta',
              !isMetaShowing && 'hideMeta'
            )}
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
