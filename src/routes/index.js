const { Router } = require('express');
const router = Router();

const {
    getRecipeList,
} = require('../controllers/index.controller');

router.get('/', getRecipeList);

router.use(function(req, res, next) {
    res.status(404).send('404');
});

module.exports = router;