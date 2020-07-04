import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import TileLoader from '@components/TileLoader';

const LoadingTileGroupContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Tile = styled.div`
  display: block;
`;

const LoadingTileGroup = ({ count }) => {
  const groupItems = [];

  for (let i = 0; i < count; i++) {
    groupItems.push(<TileLoader />);
  }

  return (
    <LoadingTileGroupContainer>
      {groupItems.map((tile, index) => (
        <Tile key={index.toString()}>{tile}</Tile>
      ))}
    </LoadingTileGroupContainer>
  );
};

LoadingTileGroup.propTypes = {
  count: PropTypes.number.isRequired
};

export default LoadingTileGroup;
