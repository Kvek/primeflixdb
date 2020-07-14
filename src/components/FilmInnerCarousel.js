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
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.5) translateX(0) !important;
    z-index: 1;

    & ~ ${() => TileWrapper} {
      transform: translateX(65px) !important;
    }

    &:nth-of-type(1) {
      transform: scale(1.5) translateX(43px) !important;

      & ~ ${() => TileWrapper} {
        transform: translateX(130px) !important;
      }
    }

    &:nth-last-of-type(1) {
      transform: scale(1.5) translateX(-37px) !important;
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
  position: relative;
  pointer-events: auto;

  &:hover {
    &.isTileHovered {
      margin: 0 50px;

      ${TileWrapper} {
        transform: translateX(-65px);

        &.isLastHovered {
          transform: translateX(-122px);
        }
      }
    }

    &.isFirstHovered {
      margin-left: 0;
    }

    &.isLastHovered {
      margin-right: 0;
    }
  }

  &:nth-last-of-type(1) {
    padding-right: 50px;
  }
`;

const MediaTiles = React.memo(({ media }) => {
  const id = uuidv4();
  const setMediaData = useSetRecoilState(mediaTile(id));

  useEffect(() => {
    setMediaData(media);
  }, [media]);

  return <Tile id={id} />;
});

const FilmInnerCarousel = React.forwardRef(({ films, id }, ref) => {
  const [isLastHovered, setIsLastHovered] = useState(false);
  const [isFirstHovered, setIsFirstHovered] = useState(false);
  const [isTileHovered, setisTileHovered] = useState(false);

  return (
    <FilmInnerCarouselContainer
      ref={ref}
      id={id}
      className={classnames(
        isTileHovered && 'isTileHovered',
        isLastHovered && 'isLastHovered',
        isFirstHovered && 'isFirstHovered'
      )}
    >
      {films.map((film, index) => (
        <TileWrapper
          key={index.toString()}
          className={isLastHovered && 'isLastHovered'}
          onMouseEnter={() => {
            setisTileHovered(true);
            setIsLastHovered(index + 1 === films.length);
            setIsFirstHovered(index === 0);
          }}
          onMouseLeave={() => setisTileHovered(false)}
        >
          <MediaTiles media={film} />
        </TileWrapper>
      ))}
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
