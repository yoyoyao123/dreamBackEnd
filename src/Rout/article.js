const express = require('express');
const articleRoute = express.Router();
const {
    addArticle,
    getArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/article');


articleRoute.route('/ajoute/article').post(addArticle);
articleRoute.route('/liste/article').get(getArticle);
articleRoute.route('/modifier/article/:id').put(updateArticle);
articleRoute.route('/delete/article/:id').delete(deleteArticle);


module.exports = articleRoute;