var express = require('express');
var router = express.Router();
const { getConfig } = require('../Api');

router.get('/', async (req, res, next) => {
  const response = await getConfig();
  res.json(response.data);
});

module.exports = router;
