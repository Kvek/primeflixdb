import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import { Star } from '@app/assets';

const StarRatingContainer = styled.div`
  display: flex;

  svg {
    width: 12px;
    margin: 0 2px;
  }
`;

const StarRating = ({ stars, rating }) => {
  const [starsArray, setStarsArray] = useState([]);

  const numberOfStars = () => {
    const ratedStars = ((Math.round((rating / 10) * stars) * 2) / 2).toFixed(1);
    const starArr = [];

    for (let i = 0; i < stars; i++) {
      starArr.push(<Star color={ratedStars >= i + 1 ? 'gold' : 'white'} />);
    }
    setStarsArray(starArr);
  };

  useEffect(() => {
    numberOfStars();
  }, [stars, rating]);

  return (
    <StarRatingContainer title={(rating / 10) * stars}>
      {starsArray.map((star, index) => (
        <Fragment key={index.toString()}>{star}</Fragment>
      ))}
    </StarRatingContainer>
  );
};

StarRating.propTypes = {
  stars: PropTypes.number,
  rating: PropTypes.number
};

StarRating.defaultProps = {
  stars: 5,
  rating: 0
};

export default StarRating;
