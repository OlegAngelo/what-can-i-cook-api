const { Router } = require('express');
const router = Router();

const {
    getRecipes,
} = require('../controllers/index.controller');

router.get('/', getRecipes);

router.use(function(req, res, next) {
    res.status(404).send('404');
});

module.exports = router;