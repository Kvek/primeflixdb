import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import mediaTile from '@atoms/mediaTile.atom';

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 147px;
  margin-right: 5px;
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
  display: none;
  flex: 0;
  border: 1px solid;
`;

const Tile = ({ id }) => {
  const [mediaData, updateMediaTile] = useRecoilState(mediaTile(id));
  const { backdrop_path } = mediaData;

  return (
    <TileContainer>
      <TileContentContainer
        bgImage={
          backdrop_path && `https://image.tmdb.org/t/p/w500/${backdrop_path}`
        }
      />
      <TileMetaContainer />
    </TileContainer>
  );
};

Tile.propTypes = {
  id: PropTypes.number.isRequired
};

export default Tile;
