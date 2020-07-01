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
  cursor: pointer;
  overflow: hidden;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  pointer-events: auto;

  svg {
    opacity: 0;
    height: 10px;
    transition: opacity 0.2s linear, margin-bottom 0.2s linear;
    padding: 10px;
    color: ${(props) => props.theme.colors.white};
    pointer-events: auto;
  }

  &:hover {
    transform: ${(props) => !props.isScrolling && 'scale(1.15)'};
    box-shadow: rgba(0, 0, 0, 0.25) -1px 3px 8px 0px;

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
  flex-direction: column;
  background: ${(props) => props.theme.colors.background};
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s linear;
  border-radius: 5px;
`;

const MetaVideo = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
`;

const MetaContent = styled.div`
  display: flex;
  width: 100%;
  height: 130px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: auto;

  &.showMeta {
    width: 320px;
    min-height: 330px;
    margin-left: -35px;
    margin-right: -35px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 0 10px 3px;
    z-index: 3;

    ${FilmTileMetaContainer} {
      z-index: 2;
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }

  &.hideMeta {
    width: 250px;
    height: 147px;

    ${FilmTileMetaContainer} {
      width: 0;
      height: 0;
      opacity: 0;
    }
  }
`;

const FilmTile = ({ film, setShowTileMeta, isScrolling }) => {
  const { backdrop_path } = film;
  const [showMeta, setShowMeta] = useState(false);

  return (
    <Container
      className={showMeta ? 'showMeta' : ' hideMeta'}
      onMouseLeave={() => {
        setShowMeta(false);
        setShowTileMeta(false);
      }}
    >
      <FilmTileWrapper
        bgImage={
          backdrop_path && `https://image.tmdb.org/t/p/w500/${backdrop_path}`
        }
        isScrolling={isScrolling}
      >
        <span
          onClick={() => {
            setShowMeta(true);
            setShowTileMeta(true);
          }}
        >
          <ChevronDown />
        </span>
      </FilmTileWrapper>
      {showMeta && (
        <FilmTileMetaContainer>
          <MetaVideo></MetaVideo>
          <MetaContent></MetaContent>
        </FilmTileMetaContainer>
      )}
    </Container>
  );
};

export default FilmTile;
