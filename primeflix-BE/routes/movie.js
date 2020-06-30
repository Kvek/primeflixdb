var express = require('express');
var router = express.Router();
const {
  getPopular,
  getTrending,
  getNowPlaying,
  getImdbId,
  getMovieFanArt,
} = require('../Api');

router.get('/', async (req, res, next) => {
  const updateFilmData = (data) => {
    return data.map(async (film) => {
      return getImdb(film.id, film);
    });
  };

  const getImdb = async (id, film) => {
    return await getImdbId('movie', id).then(async (response) => {
      return await {
        ...film,
        imdb_id: response.data.imdb_id,
        fan_art: await getFanArt(response.data.imdb_id),
      };
    });
  };

  const getFanArt = async (id) => {
    try {
      let data = await getMovieFanArt(id);
      let art = await data.data;

      const artData = {
        moviebackground:
          art.moviebackground
            .filter((film) => film.lang === 'en' || film.lang === '')
            .slice(0, 4) || null,
        movieposter:
          art.movieposter.filter((film) => film.lang === 'en')[0] || null,
        hdmovieclearart:
          art.hdmovieclearart.filter((film) => film.lang === 'en')[0] || null,
        hdmovielogo:
          art.hdmovielogo.filter((film) => film.lang === 'en')[0] || null,
      };

      return artData;
    } catch (err) {
      return {};
    }
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
