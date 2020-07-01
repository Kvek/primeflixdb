var express = require('express');
var router = express.Router();
const { getMediaVideo } = require('../Api');

router.get('/', async (req, res) => {
  try {
    const response = await getMediaVideo('movie', req.query.id);
    res.json(response.data);
  } catch (err) {
    return;
  }
});

module.exports = router;
