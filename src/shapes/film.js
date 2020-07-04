import PropTypes from 'prop-types';

const genreShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string
});

const filmShape = PropTypes.shape({
  adult: PropTypes.bool,
  backdrop_path: PropTypes.string.isRequired,
  belongs_to_collection: null,
  budget: PropTypes.number,
  genres: PropTypes.arrayOf(genreShape),
  homepage: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  imdb_id: 'tt0137523',
  original_language: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  popularity: 34.693,
  poster_path: PropTypes.string.isRequired,
  production_companies: PropTypes.arrayOf({
    id: 508,
    logo_path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    origin_country: PropTypes.string.isRequired
  }),
  production_countries: [],
  release_date: PropTypes.string.isRequired,
  revenue: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  spoken_languages: [
    {
      iso_639_1: PropTypes.string,
      name: PropTypes.string
    }
  ],
  status: 'Released',
  tagline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  video: PropTypes.bool,
  vote_average: PropTypes.number,
  vote_count: PropTypes.number
});

export default filmShape;
