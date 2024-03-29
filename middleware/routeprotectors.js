const { successPrint, errorPrint } = require('../helpers/debug/debugPrinters');

const routeProtectors = {};

routeProtectors.userIsLoggedIn = function(req, res, next){
    if(req.session.username){
        successPrint('User is logged in');
        next();
    }else{
        errorPrint('User is not logged in!');
        req.flash('error', 'You musted be logged in to create a post!');
        res.redirect('/login');
    }
}

module.exports = routeProtectors;