var express = require('express');
var router = express.Router();
const { getCertification } = require('../Api');

router.get('/', async (req, res) => {
  try {
    const response = await getCertification('movie', req.query.id);
    res.json(response.data);
  } catch (err) {
    return;
  }
});

module.exports = router;
