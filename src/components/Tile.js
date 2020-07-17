import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import mediaTile from '@atoms/mediaTile.atom';

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 147px;
  pointer-events: auto;
`;

const TileContentContainer = styled.div`
  display: flex;
  flex: 1;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  pointer-events: auto;
`;

const TileMetaContainer = styled.div`
  height: 150%;
  position: absolute;
  width: 150%;
  display: flex;
  background: white;
  left: -25%;
  top: -25%;
  z-index: 2;
  transform: scale(0);
  transition: transform 0.2s ease-in;

  &.showMeta {
    transform: scale(1);
  }
`;

const Tile = ({ id, showMeta, toggleMeta }) => {
  const mediaData = useRecoilValue(mediaTile(id));
  const { backdrop_path } = mediaData;

  return (
    <TileContainer onClick={toggleMeta}>
      <TileContentContainer
        bgImage={
          backdrop_path && `https://image.tmdb.org/t/p/w500/${backdrop_path}`
        }
      />
      <TileMetaContainer className={showMeta && 'showMeta'} />
    </TileContainer>
  );
};

Tile.propTypes = {
  id: PropTypes.string.isRequired,
  showMeta: PropTypes.bool.isRequired,
  toggleMeta: PropTypes.func.isRequired
};

export default React.memo(Tile);
