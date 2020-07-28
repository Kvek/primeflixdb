import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const TileLoaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const TileLoader = ({ width, height }) => (
  <TileLoaderContainer>
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      backgroundColor='#000000'
      foregroundColor='#09090c'
    >
      <rect x='0' y='0' rx='2' ry='2' width='100%' height='100%' />
    </ContentLoader>
  </TileLoaderContainer>
);

TileLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

TileLoader.defaultProps = {
  width: '100%',
  height: '100%'
};

export default TileLoader;
