import React from 'react';
import ContentLoader from 'react-content-loader';

const TileLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={150}
      viewBox='0 0 250 150'
      backgroundColor='#000000'
      foregroundColor='#09090c'
    >
      <rect x='0' y='0' rx='2' ry='2' width='250' height='150' />
    </ContentLoader>
  );
};

export default TileLoader;