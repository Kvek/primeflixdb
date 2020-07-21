import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const KeywordWrapper = styled.span`
  background-color: ${(props) => props.theme.colors.lightgrey};
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 10px;
  margin: 0 3px;
  opacity: 0.5;
  cursor: pointer;
  font-weight: 400;
  line-height: 10px;
  display: block;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  white-space: nowrap;
  width: auto;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    opacity: 0.7;
  }
`;

const Keyword = ({ title }) => (
  <KeywordWrapper title={title}>{title}</KeywordWrapper>
);

Keyword.propTypes = {
  title: PropTypes.string.isRequired
};

export default Keyword;
