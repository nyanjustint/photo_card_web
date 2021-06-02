var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var getRecentPost = require('../middleware/postmiddleware').getRecentPosts;
var db = require("../config/database");


router.get('/', getRecentPost, function(req, res, next) {
    res.render('index', {title:"Home"});
});

router.get('/error', function(req, res, next) {
    res.render('error', {title:"Error"});
});

router.get('/login', function(req, res, next) {
    res.render('login', {title:"Login"});
});

router.get('/registration', function(req, res, next) {
    res.render('registration', {title:"Registration"});
});

router.get('/imagepost', function(req, res, next) {
    res.render('imagepost', {title:"Browse Post"});
});

router.use('/postimage', isLoggedIn);
router.get('/postimage', function(req, res, next) {
    res.render('postimage', {title:"Create Post"});
});

router.get('/post/:id(\\d+)', (req, res, next) => {
    let baseSQL = "SELECT u.username, p.title, p.description, p.photpath, p.created FROM users u JOIN post p ON u.id=fk_userid WHERE p.id=?;";

    let postId = req.params.id;

    db.execute(baseSQL,[postId])
        .then(([results, fields]) => {
            if(results && results.length){
                let post = results[0];
                res.render('imagepost', {currentPost: post});
            }else{
                req.flash('Error', 'Not the post you are looking for!');
                res.redirect('/');
            }
        })

})

module.exports = router;
