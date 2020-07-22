import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import filmShape from '@shapes/film';

import appConfig from '@atoms/appConfig.atom';

import Carousel from '@app/components/Carousel';

const BackdropImageContainer = styled.div`
  min-width: 100%;
  width: 100%;
  height: 350px;
  display: flex;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: all 0.5s linear;
  position: relative;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    height: 500px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
    height: 650px;
  }
`;

const BackdropGradientContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const BackdropGradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -125px;

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

  if (!films.length) return null;

  return (
    <Carousel duration={100000}>
      {films.map((film) => (
        <BackdropImageContainer
          image={`${config?.images?.secure_base_url}original${film.backdrop_path}`}
          key={film.backdrop_path}
        >
          <BackdropGradientContainer>
            <BackdropGradient />
          </BackdropGradientContainer>
        </BackdropImageContainer>
      ))}
    </Carousel>
  );
};

BackdropImage.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape)).isRequired
};

export default BackdropImage;
