import React from 'react';
import styled from '@emotion/styled';

import TileLoader from '@app/src/components/TileLoader';

const LoadingTileGroupContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  overflow: scroll;
`;

const LoadingTileGroup = ({ count }) => {
  let groupItems = [];

  for (let i = 0; i < count; i++) {
    groupItems.push(<TileLoader key={i} />);
  }

  return (
    <LoadingTileGroupContainer>
      {groupItems.map((tile) => tile)}
    </LoadingTileGroupContainer>
  );
};

export default LoadingTileGroup;
