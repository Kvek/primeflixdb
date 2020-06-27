import React, { useState } from 'react';
import styled from '@emotion/styled';
import YouTube from 'react-youtube';
import { ChevronDown } from '@app/src/assets';

const FilmTileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 250px;
  height: 147px;
  min-width: 250px;
  transition: transform 0.2s linear,
    max-height 0.25s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
  box-shadow: rgba(0, 0, 0, 0.25) -1px 3px 8px 0px;
  cursor: pointer;
  pointer-events: auto;
  overflow: hidden;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;

  svg {
    opacity: 0;
    height: 10px;
    transition: opacity 0.2s linear, margin-bottom 0.2s linear;
    padding: 10px;
    color: ${(props) => props.theme.colors.white};
  }

  &:hover {
    transform: ${(props) => !props.isScrolling && 'scale(1.15)'};
    z-index: 1;

    svg {
      opacity: 1;

      &:hover {
        margin-bottom: -5px;
      }
    }
  }
`;

const FilmTileMetaContainer = styled.div`
  display: flex;
  background: red;
  position: absolute;
  transition: all 0.2s linear;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: min-width 0.2s linear, min-height 0.2s linear;

  &.showMeta {
    min-width: 350px;
    min-height: 441px;

    ${FilmTileMetaContainer} {
      z-index: 2;
      width: 350px;
      height: 440px;
    }
  }

  &.hideMeta {
    min-width: 250px;
    min-height: 147px;

    ${FilmTileMetaContainer} {
      z-index: 1;
      width: 0;
      height: 0;
      transition: all x2s linear;
    }
  }
`;

const FilmTile = ({ film, setShowTileMeta, isScrolling }) => {
  const { backdrop_path } = film;
  const [showMeta, setShowMeta] = useState(false);

  return (
    <Container className={showMeta ? 'showMeta' : ' hideMeta'}>
      <FilmTileWrapper
        // onMouseLeave={() => {
        //   setShowMeta(false);
        //   setShowTileMeta(false);
        // }}
        onClick={() => {
          setShowMeta(!showMeta);
          setShowTileMeta(true);
        }}
        bgImage={
          backdrop_path && `https://image.tmdb.org/t/p/w500/${backdrop_path}`
        }
        isScrolling={isScrolling}
      >
        <ChevronDown
          onClick={() => {
            setShowMeta(true);
            setShowTileMeta(true);
          }}
        />
      </FilmTileWrapper>
      <FilmTileMetaContainer>
        {/* <MetaVideo></MetaVideo>
        <MetaContent></MetaContent> */}
      </FilmTileMetaContainer>
    </Container>
  );
};

export default FilmTile;
