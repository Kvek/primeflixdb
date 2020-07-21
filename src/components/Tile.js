import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import mediaTile from '@atoms/mediaTile.atom';

import { PlayButton, CloseIcon } from '@app/assets';

import StarRating from '@components/StarRating';
import Keyword from '@components/Keyword';
import Ratings from '@components/Ratings';

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 147px;
  pointer-events: auto;
`;

const TileContentContainer = styled.div`
  display: flex;
  flex: 1;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  pointer-events: auto;
`;

const TileMetaContainer = styled.div`
  height: 150%;
  position: absolute;
  width: 150%;
  display: flex;
  background-color: ${(props) => props.theme.colors.meta};
  left: -25%;
  top: -25%;
  z-index: 2;
  transform: scale(0);
  transition: transform 0.2s ease-in;

  &.showMeta {
    transform: scale(1);
  }
`;

const MetaPoster = styled.div`
  height: calc(100% - 10px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0 5px 5px;

  img {
    height: 100%;
  }

  svg {
    position: absolute;
    z-index: 1;
    height: 80px;
    opacity: 0;
    transition: opacity 0.2s linear;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`;

const MetaContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  padding: 5px;
  flex-direction: column;
`;

const MetaCloseContainer = styled.div`
  svg {
    position: absolute;
    right: 7px;
    top: 7px;
    width: 12px;
    height: 12px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s linear;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`;

const MediaTitle = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-size: 20px;
  white-space: nowrap;
  padding: 0;
  margin: 10px 0 10px;
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    color: ${(props) => props.theme.colors.gray};
  }
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const MediaSynopsis = styled.div`
  display: flex;
  width: 100%;
`;

const MediaOverview = styled.div`
  padding-left: 5px;
  width: 200px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  line-height: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.lightgrey};
  margin: 0;
  height: 112px;
`;

const MetaCtaContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
  width: 100%;
`;

const MetaTagContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const RatingsContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1;

  svg {
    width: 25px;
    height: 25px;
  }
`;

const Tile = ({ id, showMeta, toggleMeta }) => {
  const mediaData = useRecoilValue(mediaTile(id));
  const path = 'https://image.tmdb.org/t/p/original/';

  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    vote_average,
    vote_count,
    genres,
    release_dates
  } = mediaData;

  const toggleTileMeta = () => {
    toggleMeta(!showMeta ? id : null);
  };

  return (
    <TileContainer>
      <TileContentContainer
        bgImage={backdrop_path && `${path}${backdrop_path}`}
        onClick={toggleTileMeta}
      />
      <TileMetaContainer className={showMeta && 'showMeta'}>
        <MetaPoster>
          <img src={poster_path && `${path}${poster_path}`} alt={title} />
          <PlayButton />
        </MetaPoster>

        <MetaContent>
          <MetaCloseContainer>
            <CloseIcon onclick={toggleTileMeta} />
          </MetaCloseContainer>

          <Content>
            <MediaTitle>
              {title}
              <StarContainer>
                <StarRating rating={vote_average} />
                <span>({vote_count})</span>
              </StarContainer>
            </MediaTitle>
            <MediaSynopsis>
              <MediaOverview>{overview}</MediaOverview>
            </MediaSynopsis>
          </Content>

          <MetaCtaContainer>
            <MetaTagContainer>
              {genres &&
                genres
                  .slice(0, 3)
                  .map((genre) => (
                    <Keyword key={genre?.name} title={genre?.name} />
                  ))}
            </MetaTagContainer>
            <RatingsContainer>
              <Ratings rating={release_dates} />
            </RatingsContainer>
          </MetaCtaContainer>
        </MetaContent>
      </TileMetaContainer>
    </TileContainer>
  );
};

Tile.propTypes = {
  id: PropTypes.string.isRequired,
  showMeta: PropTypes.bool.isRequired,
  toggleMeta: PropTypes.func.isRequired
};

export default React.memo(Tile);
