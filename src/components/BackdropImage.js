import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import filmShape from '@shapes/film';

import appConfig from '@atoms/appConfig.atom';

const BackdropImageContainer = styled.div`
  width: 100%;
  height: 100%;
  height: 650px;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  background-size: cover;
  transition: all 0.5s linear;

  @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
    height: 650px;
    background-size: cover;
  }
`;

const BackdropGradientContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BackdropGradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -120px;

  background-image: linear-gradient(
    rgba(20, 20, 20, 0) 0,
    rgba(20, 20, 20, 0.15) 15%,
    rgba(20, 20, 20, 0.35) 29%,
    rgba(20, 20, 20, 0.58) 44%,
    #141414 68%,
    #15181c 100%
  );
  z-index: 1;
`;

const BackdropImage = ({ films }) => {
  const config = useRecoilValue(appConfig);
  const [current, setCurrent] = useState(0);
  const { secure_base_url } = config;

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    setCurrent(current >= films.length - 1 ? 0 : current + 1);
  }, 15000);

  if (!films.length) return null;

  return (
    <BackdropImageContainer
      image={
        films[current] &&
        `${secure_base_url}original${films[current].backdrop_path}`
      }
    >
      <BackdropGradientContainer>
        <BackdropGradient />
      </BackdropGradientContainer>
    </BackdropImageContainer>
  );
};

BackdropImage.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape)).isRequired
};

export default BackdropImage;
