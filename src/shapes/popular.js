import PropTypes from 'prop-types';

const popularFilm = PropTypes.shape({
  popularity: PropTypes.number,
  vote_count: PropTypes.number,
  video: false,
  poster_path: PropTypes.string.isRequired,
  id: PropTypes.number,
  adult: false,
  backdrop_path: PropTypes.string.isRequired,
  original_language: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.string.isRequired,
  vote_average: PropTypes.number,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired
});

export default popularFilm;
