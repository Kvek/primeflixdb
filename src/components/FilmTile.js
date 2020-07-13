import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import YouTube from 'react-youtube';
import Proptypes from 'prop-types';

import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import filmTile from '@atoms/filmTile.atom';

import { ChevronDown } from '@app/assets';
import { getVideo } from '@app/Api';

import filmShape from '@shapes/film';

import Ratings from '@app/components/Ratings';

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
  cursor: default;
`;

const MetaVideo = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .youtubeContainer {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
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
  flex-direction: column;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  height: 150px;

  h1 {
    font-size: 18px;
    line-height: 18px;
    padding: 6px 8px;
    margin: 0;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    padding: 0 10px 0;
    margin-top: 0;
    margin-bottom: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    font-size: 13px;
    line-height: 15px;
    min-height: 90px;
    max-height: 90px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: auto;
  margin: 0 calc(calc(20% - 250px) / 2);

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

const CtaContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: flex-end;
  max-height: 30px;

  svg {
    margin: 0 5px 5px 0;
    width: 25px;
    height: 25px;
  }
`;

const FavouriteIconContainer = styled.div`
  width: 100%;
  text-align: right;

  svg {
    margin: 0 5px 5px;
    cursor: pointer;
  }
`;

const FilmTile = ({ film, setShowTileMeta, isScrolling }) => {
  const { backdrop_path, id, title, overview, certification } = film;
  const [showMeta, setShowMeta] = useState(false);
  const [videos, setFilmVideos] = useRecoilState(filmTile(id));
  const [isVideoReady, setIsVideoReady] = useState(false);
  const { results: filmTrailers } = videos;

  const getVideoData = (videoId) => {
    if (!Object.keys(videos).length) {
      getVideo(videoId).then((res) => {
        setFilmVideos(res.data);
      });
    }
  };

  const filterTrailer = () => {
    if (filmTrailers) {
      const trailers = filmTrailers.filter(
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
          onKeyPress={() => {}}
          role='button'
          tabIndex={0}
        >
          <ChevronDown />
        </span>
      </FilmTileWrapper>
      <FilmTileMetaContainer>
        <MetaVideo
          bgImage={
            !isVideoReady && `https://image.tmdb.org/t/p/w500/${backdrop_path}`
          }
        >
          {Object.keys(videos).length && (
            <YouTube
              videoId={filterTrailer()?.key}
              id={filterTrailer()?.id}
              containerClassName='youtubeContainer'
              onReady={() => setIsVideoReady(true)}
              opts={{ playerVars: { controls: 0, modestbranding: 1 } }}
            />
          )}
        </MetaVideo>
        <MetaContent>
          <h1>{title}</h1>
          <p>{overview}</p>
          <CtaContainer>
            <Ratings rating={certification} />
            <FavouriteIconContainer>
              <FontAwesomeIcon icon='plus' size='lg' className='hamburger' />
              <FontAwesomeIcon icon='heart' size='lg' className='hamburger' />
            </FavouriteIconContainer>
          </CtaContainer>
        </MetaContent>
      </FilmTileMetaContainer>
    </Container>
  );
};

FilmTile.propTypes = {
  film: Proptypes.shape(filmShape).isRequired,
  isScrolling: Proptypes.bool,
  setShowTileMeta: Proptypes.func.isRequired
};

FilmTile.defaultProps = { isScrolling: false };

export default React.memo(FilmTile);
