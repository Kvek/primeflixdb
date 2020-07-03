import React, { useEffect, useState } from 'react';
import {
  Rating12,
  Rating12A,
  Rating15,
  Rating18,
  RatingU,
  RatingPG,
} from '@app/src/assets';

import styled from '@emotion/styled';

const Rating = styled.div`
  color: ${(props) => props.theme.colors.lightgrey};
  width: 50px;
  height: 20px;
`;

const Ratings = ({ rating }) => {
  const [currentRating, setRating] = useState('');

  const usToUk = (usRating) => {
    let rating = '';

    switch (usRating) {
      case 'G':
        rating = 'U';
        break;

      case 'PG':
        rating = 'PG';
        break;

      case 'PG-13':
        rating = '12A';
        break;

      case 'R':
        rating = '15';
        break;

      case 'NC-17':
        rating = '18';
        break;

      default:
        rating = '';
        break;
    }
    return rating;
  };

  const getRatingIcon = (rating) => {
    let ratingIcon;
    switch (rating) {
      case 'U':
        ratingIcon = <RatingU />;
        break;

      case 'PG':
        ratingIcon = <RatingPG />;
        break;

      case '12':
        ratingIcon = <Rating12 />;
        break;

      case '12A':
        ratingIcon = <Rating12A />;
        break;

      case '15':
        ratingIcon = <Rating15 />;
        break;

      case '輔15級':
        ratingIcon = <Rating15 />;
        break;

      case '18':
        ratingIcon = <Rating18 />;
        break;

      case '18+':
        ratingIcon = <Rating18 />;
        break;

      case 'M18':
        ratingIcon = <Rating18 />;
        break;

      default:
        ratingIcon = <Rating>{rating}</Rating>;
        break;
    }

    return ratingIcon;
  };

  const getCertificate = (film) => {
    return film?.release_dates[0]?.certification;
  };

  useEffect(() => {
    let certificateList = rating?.results?.filter(
      (film) => getCertificate(film) !== ''
    );

    let usOrUk = certificateList?.filter(
      (film) => film?.iso_3166_1 === 'US' || film?.iso_3166_1 === 'GB'
    );

    if (usOrUk?.length) {
      const certification = getCertificate(usOrUk[0]);
      const isUSA = usOrUk?.filter((film) => film?.iso_3166_1 === 'US');

      if (isUSA?.length) {
        setRating(usToUk(certification));
      } else {
        setRating(certification);
      }
    } else {
      const certification =
        certificateList && getCertificate(certificateList[0]);
      setRating(certification);
    }
  }, [rating]);

  return <div>{getRatingIcon(currentRating)}</div>;
};

export default Ratings;
