const https = require('https');
const api = require('./api.json');

function getNewsWithCB(callback) {

    https.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api.key}`, res => {
        let body = '';

        res.on('data', chunk => {
            body += chunk;
        });

        res.on('end', () => {
            const news = JSON.parse(body);
            if (news.results) {
                var title = news.results[0].title;
                var desc = news.results[0].abstract;
                var url = news.results[0].url;
                var items = [title, desc, url]
                callback( null, items )
            } else {
                callback( new Error('Undefined') )
            }
        });
    });
};


function getNewsWithPromise(callback) {
    return new Promise( function(resolve, reject) {
        https.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api.key}`, res => {
            let body = '';
    
            res.on('data', chunk => {
                body += chunk;
            });
    
            res.on('end', () => {
                const news = JSON.parse(body);
                if (news.results) {
                    var title = news.results[0].title;
                    var desc = news.results[0].abstract;
                    var url = news.results[0].url;
                    var items = [title, desc, url]
                    return resolve(items)
                } else {
                    return reject(new Error('Undefined'))
                }
            });
        });
    
    })
}


exports.getNewsWithCB = getNewsWithCB
exports.getNewsWithPromise = getNewsWithPromise

// getNewsWithCB( function(error, result) {
//     if (error) {
//         throw error
//     }

//     console.log( result )
// })


// getNewsWithPromise()
// .then( result => { 
//     console.log(result)
// })
// .catch( error => {
//     console.log(error)
// })