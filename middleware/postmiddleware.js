var db = require("../config/database");
/*const {getNRecentPosts, getPostById} = require('../models/Posts');*/
const postMiddleware = {}

postMiddleware.getRecentPosts = function(req, res, next){
    let baseSQL = 'SELECT id, title, description, thumbnail, created FROM post ORDER BY created DESC LIMIT 8';
    db.execute(baseSQL,[])
        .then(([results, fields]) => {
            res.locals.results = results;
            if(results && results.length == 0){
                req.flash('Error', 'There are no post created');
            }
            next();
        })
        .catch((err) => next(err));
}

module.exports = postMiddleware;