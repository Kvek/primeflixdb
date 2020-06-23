import React, { useState } from 'react';
import styled from '@emotion/styled';
import YouTube from 'react-youtube';

const FilmTileContainer = styled.div`
  min-width: 100%;
  min-height: 149px;
  display: flex;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    min-height: 173px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
    min-height: 188px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.wide}) {
    min-height: 215px;
  }
`;

const FilmTileMetaContainer = styled.div`
  height: 0;
  width: 100%;
  display: none;
  transition: height 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0.5s;
  position: relative;

  .youtubeContainer iframe {
    height: 147px;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
      height: 173px;
    }

    @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
      height: 188px;
    }

    @media (min-width: ${(props) => props.theme.maxPageWidth.wide}) {
      height: 215px;
    }
  }
`;

const FilmTileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 147px;
  min-width: 250px;
  min-height: 147px;
  transition: transform 0.25s linear 0.1s,
    max-height 0.25s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
  margin: 10px 5px;
  cursor: pointer;
  pointer-events: auto;

  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) -1px 3px 8px 0px;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    height: 173px;
    width: 295px;
    min-width: 295px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
    height: 188px;
    width: 320px;
    min-width: 320px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.wide}) {
    height: 215px;
    width: 365px;
    min-width: 365px;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.25s linear 0s;
  }

  &.showMeta {
    transform: scale(1.05) translateY(0%);
    transition: max-height 0.25s cubic-bezier(0.23, 1, 0.32, 1) 0s;

    @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
      height: 346px;
      max-height: 346px;
    }

    @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
      height: 376px;
      max-height: 376px;
    }

    @media (min-width: ${(props) => props.theme.maxPageWidth.wide}) {
      height: 430px;
      max-height: 430px;
    }

    ${FilmTileMetaContainer} {
      transition: height 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s;
      display: block;
      height: 100%;
    }
  }
`;

const FilmTile = ({ film, setShowTileMeta }) => {
  const { backdrop_path } = film;
  const [showMeta, setShowMeta] = useState(false);

  return (
    <FilmTileWrapper
      onMouseLeave={() => {
        setShowMeta(false);
        setShowTileMeta(false);
      }}
      className={showMeta && 'showMeta'}
    >
      <FilmTileContainer
        bgImage={
          backdrop_path && `https://image.tmdb.org/t/p/w500/${backdrop_path}`
        }
        onClick={() => {
          setShowMeta(true);
          setShowTileMeta(true);
        }}
      />
      <FilmTileMetaContainer>
        {showMeta && (
          <YouTube
            // onReady={(event) => event.target.playVideo()}
            onEnd={() => showMeta && setShowMeta(false)}
            containerClassName='youtubeContainer'
            modestbranding={1}
            videoId={'9W0H0qJPIPQ'}
            opts={{
              playerVars: {
                controls: 0,
                rel: 0,
              },
            }}
          />
        )}
      </FilmTileMetaContainer>
    </FilmTileWrapper>
  );
};

export default FilmTile;
