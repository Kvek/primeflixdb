import React from 'react';
import styled from '@emotion/styled';

import TileLoader from '@app/src/components/TileLoader';

const LoadingTileGroupContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Tile = styled.div`
  display: block;
`;

const LoadingTileGroup = ({ count }) => {
  let groupItems = [];

  for (let i = 0; i < count; i++) {
    groupItems.push(<TileLoader />);
  }

  return (
    <LoadingTileGroupContainer>
      {groupItems.map((tile, index) => (
        <Tile key={index}>{tile}</Tile>
      ))}
    </LoadingTileGroupContainer>
  );
};

export default LoadingTileGroup;
