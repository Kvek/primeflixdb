import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const FilmDetailsContainer = styled.div`
  display: flex;
  margin-top: 55px;
  max-height: calc(100vh - 55px);
  height: 100%;
  flex-direction: column;
  position: relative;
  min-height: calc(100vh - 55px);
`;

const DetailsBanner = styled.div`
  position: absolute;
  height: calc(100% + 55px);
  top: -55px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: scroll;
`;

const DetailsInnerBanner = styled.div`
  min-height: 200vh;
  background: black;
  height: 100%;
  opacity: 1;
`;

const DetailsContentContainer = styled.div`
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: scroll;
`;

const FilmDetails = ({ id }) => {
  const containerRef = useRef(null);
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const [showBanner, setBannerDisplay] = useState(true);

  useEffect(() => {
    const bannerReference = bannerRef.current;
    const containerReference = containerRef.current;
    const contentReference = contentRef.current;

    const scrollHandler = () => {
      const banner = bannerReference.getBoundingClientRect();
      const container = containerReference.getBoundingClientRect();
      const opacity = (container.height + banner.y) / 1000;

      bannerReference.style.opacity = opacity;

      if (opacity <= 0) {
        containerReference.removeEventListener('scroll', scrollHandler);
        setBannerDisplay(false);
        contentReference.style.position = 'relative';
      }
    };

    containerReference.addEventListener('scroll', scrollHandler);

    return () => {
      containerReference.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <FilmDetailsContainer>
      {showBanner && (
        <DetailsBanner ref={containerRef}>
          <DetailsInnerBanner ref={bannerRef} />
        </DetailsBanner>
      )}
      <DetailsContentContainer ref={contentRef} />
    </FilmDetailsContainer>
  );
};
FilmDetails.propTypes = {
  id: PropTypes.number.isRequired
};
export default FilmDetails;
