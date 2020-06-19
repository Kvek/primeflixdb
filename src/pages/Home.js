import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

import trendingFilms from '@app/src/atoms/trendingFilms.atom';
import appConfig from '@app/src/atoms/appConfig.atom';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  overflow: scroll;
  background: ${(props) => props.theme.colors.background};
  margin-top: 55px;
`;

const BackdropGradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

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

const BackdropImage = styled.div`
  width: 100%;
  height: 100%;
  height: 650px;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-size: cover;
  transition: all 1s linear;

  @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
    height: 650px;
    background-size: cover;
  }
`;
const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  top: calc(100% - 250px);
`;

const Home = () => {
  const trending = useRecoilValue(trendingFilms);
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
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    setCurrent(current >= trending.length - 1 ? 0 : current + 1);
  }, 15000);

  return (
    <HomeContainer>
      <BackdropImage
        key={trending[0]?.id}
        image={`${secure_base_url}original${trending[current]?.backdrop_path}`}
      >
        <BackdropGradient />
      </BackdropImage>
      <TileContainer></TileContainer>
    </HomeContainer>
  );
};

export default Home;
