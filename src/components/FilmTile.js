import React, { useState } from 'react';
import styled from '@emotion/styled';
import YouTube from 'react-youtube';

const FilmTileContainer = styled.div`
  width: 100%;
  height: 149px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.25) -1px 3px 8px 0px;
  border: 0;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    height: 208px;
  }
`;

const FilmTileMetaContainer = styled.div`
  height: 0;
  width: 100%;
  display: none;
  transition: height 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0.5s;
  border: 0;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    display: flex;
  }

  .youtubeContainer iframe {
    max-height: 208px;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 2px;
    left: 0;
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
  margin: 0 10px;
  cursor: pointer;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    height: 173px;
    width: 295px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
    height: 188px;
    width: 320px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.wide}) {
    height: 215px;
    width: 365px;
  }

  &:hover {
    transform: scale(1.15);
    transition: transform 0.25s linear 0s;
  }

  &.showMeta {
    @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
      max-height: 420px;
      transition: max-height 0.25s cubic-bezier(0.23, 1, 0.32, 1) 0s;

      ${FilmTileMetaContainer} {
        transition: height 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s;
        display: flex;
        min-height: 100%;
      }
    }
  }
`;

const FilmTile = ({ film }) => {
  const { backdrop_path } = film;
  const [showMeta, setShowMeta] = useState(false);

  return (
    <FilmTileWrapper
      onMouseLeave={() => setShowMeta(false)}
      className={showMeta && 'showMeta'}
      bgImage={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
    >
      <FilmTileContainer />
      <FilmTileMetaContainer>
        {showMeta && (
          <YouTube
            onReady={(event) => event.target.playVideo()}
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
