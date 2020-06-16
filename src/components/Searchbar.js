import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    min-width: 350px;
    max-width: 550px;
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
  border: 1px solid;
  border-radius: 5px;
  padding: 5px 0;
  background: ${(props) => props.theme.colors.white};
  overflow: scroll;
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
  background: ${(props) => props.theme.colors.white};
`;

const Options = styled.li`
  list-style: none;
  font-size: 18px;
  line-height: 18px;
  min-height: 40px;
  padding: 4px 0;
  display: flex;
  padding-left: 10px;
  align-items: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.background};

  &:hover {
    background: ${(props) => props.theme.colors.gray};
  }
`;

const Searchbar = ({ onIconClick }) => {
  const [searchInput, setsearchInput] = useState('');
  const [searchOptions, setSearchOptions] = useState(null);
  const [isBlured, setIsBlured] = useState(true);

  useEffect(() => {
    if (searchInput) {
      Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=b4ac50bea5731f7106812c256c1b3048&query=${searchInput}`
      ).then((res) => {
        return setSearchOptions(res.data.results);
      });
    }
  });

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
              {searchOptions.length === 0 && <Options>No results</Options>}
              {searchOptions.map(({ poster_path, title }) => {
                return <Options>{title}</Options>;
              })}
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

Searchbar.propTypes = {};

export default Searchbar;
