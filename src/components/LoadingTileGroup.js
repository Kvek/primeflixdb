import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import TileLoader from '@components/TileLoader';

const LoadingTileGroupContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Tile = styled.div`
  display: block;
  min-width: 260px;
  height: 147px;
  margin: 5px 20px 5px 0;

  &:nth-last-of-type(1) {
    margin-right: 0;
  }
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
  count: PropTypes.number
};

LoadingTileGroup.defaultProps = {
  count: 0
};

export default LoadingTileGroup;
