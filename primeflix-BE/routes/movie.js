var express = require('express');
var router = express.Router();
const { getPopular, getTrending, getNowPlaying, getImdbId } = require('../Api');

router.get('/', async (req, res, next) => {
  const updateFilmData = (data) => {
    return data.map(async (film) => {
      return getImdb(film.id, film);
    });
  };

  const getImdb = async (id, film) => {
    return await getImdbId('movie', id).then((response) => ({
      ...film,
      imdb_id: response.data.imdb_id,
    }));
  };

  const popular = getPopular().then((result) =>
    Promise.all(updateFilmData(result.data.results))
  );

  const trending = getTrending().then((result) =>
    Promise.all(updateFilmData(result.data.results))
  );

  const nowPlaying = getNowPlaying().then((result) =>
    Promise.all(updateFilmData(result.data.results))
  );

  const data = {
    popular: await popular,
    trending: await trending,
    now_playing: await nowPlaying,
  };

  res.json(data);
});

module.exports = router;
