import PropTypes from 'prop-types';

const genreShape = {
  id: PropTypes.number,
  name: PropTypes.string
};

const filmShape = {
  adult: PropTypes.bool,
  backdrop_path: PropTypes.string,
  budget: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.shape(genreShape)),
  homepage: PropTypes.string,
  id: PropTypes.number,
  imdb_id: PropTypes.string,
  original_language: PropTypes.string,
  original_title: PropTypes.string,
  overview: PropTypes.string,
  popularity: PropTypes.number,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  revenue: PropTypes.number,
  runtime: PropTypes.number,
  status: PropTypes.string,
  tagline: PropTypes.string,
  title: PropTypes.string,
  vote_average: PropTypes.number,
  vote_count: PropTypes.number
};

export default filmShape;
