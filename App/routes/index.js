const express = require('express');
const getNews = require('../utils/nytapi')

const router = express.Router();

router.get('/', (req,res) => {

    getNews.getNewsWithCB( (error,result) => {
        if (error) {
            throw error
        }
        
        res.render('index', {title: result[0], desc: result[1], url: result[2]})
    })
});

module.exports.getNews = getNews;
module.exports = router;