var express = require('express');
var router = express.Router();
const { getNowPlaying, getMediaVideo } = require('../Api');

router.get('/', async (req, res, next) => {
  const updateFilmData = (data) => {
    return data.map(async (film) => {
      return getVideo(film.id, film);
    });
  };

  const getVideo = async (id, film) => {
    return await getMediaVideo('movie', id).then((response) => ({
      ...film,
      ...{
        video: response.data.results[0],
      },
    }));
  };

  const nowPlaying = getNowPlaying().then((result) =>
    Promise.all(updateFilmData(result.data.results))
  );

  res.json(await nowPlaying);
});

module.exports = router;
