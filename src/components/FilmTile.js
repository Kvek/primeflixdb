import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import YouTube from 'react-youtube';

import styled from '@emotion/styled';

import filmVideos from '@app/src/atoms/filmVideos.atom';

import { ChevronDown } from '@app/src/assets';
import { getVideo } from '@app/src/Api';

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

  &.metabackground {
    min-width: 100%;
    height: 100%;

    &:hover {
      transform: none;
    }
  }

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

  .youtubeContainer {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
    margin-bottom: 50px;
  }

  .youtubeContainer iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
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
      transition: opacity 0.2s linear;
    }
  }

  &.hideMeta {
    width: 250px;
    height: 147px;

    ${FilmTileMetaContainer} {
      width: 0;
      height: 0;
      opacity: 0;
      transition: opacity 0.2s linear;
    }
  }
`;

const FilmTile = ({ film, setShowTileMeta, isScrolling }) => {
  const { backdrop_path, id } = film;
  const [showMeta, setShowMeta] = useState(false);
  const [videos, setFilmVideos] = useRecoilState(filmVideos(id));
  const { results: filmTrailers } = videos;

  const getVideoData = (id) => {
    if (!Object.keys(videos).length) {
      getVideo(id).then((res) => {
        setFilmVideos(res.data);
      });
    }
  };

  const filterTrailer = () => {
    if (filmTrailers) {
      let trailers = filmTrailers.filter(
        (trailer) => trailer.type === 'Trailer' || trailer.type === 'Teaser'
      );

      return (
        trailers.find((trailer) => trailer.type === 'Trailer') ?? trailers[0]
      );
    }
  };

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
            getVideoData(id);
          }}
        >
          <ChevronDown />
        </span>
      </FilmTileWrapper>
      <FilmTileMetaContainer>
        <MetaVideo>
          {Object.keys(videos).length && filterTrailer()?.key ? (
            <YouTube
              videoId={filterTrailer()?.key}
              id={filterTrailer()?.id}
              containerClassName='youtubeContainer'
              opts={{
                playerVars: { controls: 0, modestbranding: 1 },
              }}
            />
          ) : (
            <FilmTileWrapper
              bgImage={
                backdrop_path &&
                `https://image.tmdb.org/t/p/w500/${backdrop_path}`
              }
              className='metabackground'
            />
          )}
        </MetaVideo>
        <MetaContent></MetaContent>
      </FilmTileMetaContainer>
    </Container>
  );
};

export default React.memo(FilmTile);
