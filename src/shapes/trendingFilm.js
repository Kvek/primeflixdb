import PropTypes from 'prop-types';

const videoDataShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  iso_639_1: PropTypes.string.isRequired,
  iso_3166_1: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
});

const trendingFilmShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  video: PropTypes.shape(videoDataShape),
  vote_count: PropTypes.number.isRequired,
  vote_average: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  original_language: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  backdrop_path: PropTypes.string.isRequired,
  adult: PropTypes.bool.isRequired,
  overview: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  media_type: PropTypes.string.isRequired
});

export default trendingFilmShape;
