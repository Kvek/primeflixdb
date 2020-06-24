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
  transition: transform 0.25s linear 0s,
    max-height 0.25s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
  box-shadow: rgba(0, 0, 0, 0.25) -1px 3px 8px 0px;
  cursor: pointer;
  pointer-events: auto;
  overflow: hidden;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  svg {
    opacity: 0;
    height: 10px;
    transition: opacity 0.2s linear, margin-bottom 0.2s linear;
    padding: 10px;
    color: ${(props) => props.theme.colors.white};
  }

  &:hover {
    transform: scale(1.15);

    svg {
      opacity: 1;

      &:hover {
        margin-bottom: -5px;
      }
    }
  }
`;

const FilmTile = ({ film, setShowTileMeta }) => {
  const { backdrop_path } = film;
  const [showMeta, setShowMeta] = useState(false);

  return (
    <>
      <FilmTileWrapper
        onMouseLeave={() => {
          setShowMeta(false);
          setShowTileMeta(false);
        }}
        bgImage={
          backdrop_path && `https://image.tmdb.org/t/p/w500/${backdrop_path}`
        }
      >
        <ChevronDown
          onClick={() => {
            setShowMeta(true);
            setShowTileMeta(true);
          }}
        />
      </FilmTileWrapper>
    </>
  );
};

export default FilmTile;
