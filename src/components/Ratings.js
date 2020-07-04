import React, { useEffect, useState } from 'react';
import {
  Rating12,
  Rating12A,
  Rating15,
  Rating18,
  RatingU,
  RatingPG
} from '@app/assets';

import styled from '@emotion/styled';

const Rating = styled.div`
  color: ${(props) => props.theme.colors.lightgrey};
  width: 50px;
  height: 20px;
`;

const Ratings = ({ rating }) => {
  const [currentRating, setRating] = useState('');

  const usToUk = (usRating) => {
    let ukRating = '';

    switch (usRating) {
      case 'G':
        ukRating = 'U';
        break;

      case 'PG':
        ukRating = 'PG';
        break;

      case 'PG-13':
        ukRating = '12A';
        break;

      case 'R':
        ukRating = '15';
        break;

      case 'NC-17':
        ukRating = '18';
        break;

      default:
        ukRating = '';
        break;
    }
    return ukRating;
  };

  const getRatingIcon = (ratingString) => {
    let ratingIcon;
    switch (ratingString) {
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

  const getCertificate = (film) => film?.release_dates[0]?.certification;

  useEffect(() => {
    const certificateList = rating?.results?.filter(
      (film) => getCertificate(film) !== ''
    );

    const usOrUk = certificateList?.filter(
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

  return currentRating ? 'getRatingIcon(currentRating)' : null;
};

export default Ratings;
