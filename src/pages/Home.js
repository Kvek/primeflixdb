import React from 'react';
import trendingFilms from '@app/src/atoms/trendingFilms.atom';
import { useRecoilValue } from 'recoil';

const Home = () => {
  const trending = useRecoilValue(trendingFilms);

  return <div>Home component</div>;
};

export default Home;
