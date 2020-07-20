import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const CarouselContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
`;

const CarouselInnerContainer = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.75s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  z-index: 1;
  min-height: 100%;
  height: 100%;
`;

const Carousel = ({ duration, children }) => {
  const carouselRef = React.useRef(null);

  useEffect(() => {
    carouselRef.current.addEventListener('transitionend', () => {
      carouselRef.current.appendChild(carouselRef.current.firstElementChild);

      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = 'translate(0)';

      setTimeout(() => {
        carouselRef.current.style.transition =
          'all 0.75s cubic-bezier(0.785, 0.135, 0.150, 0.860)';
      });
    });
  }, [carouselRef.current]);

  useEffect(() => {
    setInterval(() => {
      carouselRef.current.style.justifyContent = 'flex-start';
      carouselRef.current.style.transform = 'translate(-100%)';
    }, duration);
  }, []);

  return (
    <CarouselContainer>
      <CarouselInnerContainer ref={carouselRef}>
        {children}
      </CarouselInnerContainer>
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  duration: PropTypes.number,
  children: PropTypes.node.isRequired
};

Carousel.defaultProps = {
  duration: 5500
};
export default Carousel;
