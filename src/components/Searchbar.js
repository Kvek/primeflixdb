import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from '@app/atoms/appConfig.atom';
import { Logo } from '@app/assets';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    min-width: 350px;
    max-width: 550px;
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.desktop}) {
    max-width: none;
  }
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid;
  position: relative;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    min-width: 275px;
    max-width: 550px;
  }

  input {
    padding: 0 2%;
    width: 100%;
    height: 35px;
    line-height: 16px;
    border: 0;
    font-size: 18px;
  }
`;

const IconContainer = styled.span`
  width: 80px;
  height: 35px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    opacity: 0.7;
    font-size: 18px;

    &.search {
      display: none;

      @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
        display: flex;
      }
    }

    &.cross {
      display: flex;

      @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
        display: none;
      }
    }
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  max-height: 240px;
  width: calc(100% + 1px);
  min-height: 40px;
  top: 40px;
  left: -1px;
  z-index: 2;
  border-radius: 5px;
  padding: 5px 0;
  background: ${(props) => props.theme.colors.app};
  overflow: scroll;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.7);
`;

const Select = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 240px;
  height: 100%;
  padding: 0;
  margin: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Options = styled.li`
  list-style: none;
  font-size: 18px;
  line-height: 18px;
  min-height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 5px 10px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.white};
  height: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};

  &:nth-last-of-type(1) {
    border-bottom: none;
  }

  &.noPoster {
    align-items: center;
    min-height: 40px;

    span {
      margin: 0;
    }
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.gray};
  }

  &.noResult {
    pointer-events: none;
  }
`;

const ListItemText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 5px 10px 5px 0;
`;

const PosterContainer = styled.span`
  min-width: none;
  width: 65px;
  height: 100%;
  display: flex;
  justify-content: center;

  svg {
    width: 45px;
  }

  &.hasPoster {
    min-width: 65px;
  }
`;

const Poster = styled.img`
  min-height: 100px;
  width: 100%;
  height: 100%;
`;

const Searchbar = ({ onIconClick }) => {
  const [searchInput, setsearchInput] = useState('');
  const [searchOptions, setSearchOptions] = useState(null);
  const [isBlured, setIsBlured] = useState(true);
  const imageConfig = useRecoilValue(appConfig);
  const { secure_base_url } = imageConfig;

  useEffect(() => {
    if (searchInput) {
      Axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=b4ac50bea5731f7106812c256c1b3048&query=${searchInput}`
      ).then((res) => {
        setSearchOptions(res.data.results);
      });
    }
  }, [searchInput]);

  return (
    <SearchBarContainer>
      <InputContainer>
        <input
          type='text'
          value={searchInput}
          onChange={(e) => {
            setsearchInput(e.target.value);
            setIsBlured(false);
          }}
          onFocus={() => setIsBlured(false)}
          onBlur={() => setIsBlured(true)}
        />
        {searchOptions && searchInput && !isBlured && (
          <SelectContainer>
            <Select>
              {searchOptions.length === 0 && (
                <Options className='noResult'>No results</Options>
              )}
              {searchOptions.map(
                ({ title, poster_path }) =>
                  title?.length && (
                    <Options className={!poster_path && 'noPoster'}>
                      <ListItemText>{title}</ListItemText>

                      <PosterContainer className={poster_path && 'hasPoster'}>
                        {poster_path ? (
                          <Poster
                            src={`${secure_base_url}original${poster_path}`}
                            alt='poster'
                          />
                        ) : (
                          <Logo />
                        )}
                      </PosterContainer>
                    </Options>
                  )
              )}
            </Select>
          </SelectContainer>
        )}
      </InputContainer>
      <IconContainer onClick={onIconClick}>
        <FontAwesomeIcon icon='times' className='cross' />
        <FontAwesomeIcon icon='search' className='search' />
      </IconContainer>
    </SearchBarContainer>
  );
};

Searchbar.propTypes = {
  onIconClick: PropTypes.func.isRequired
};

export default Searchbar;
