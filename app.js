var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('express-session');
var mySqlSession = require('express-mysql-session')(sessions);
var flash = require('express-flash');

var handlebars = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');

var errorPrint = require('./helpers/debug/debugPrinters').errorPrint;
var successPrint = require('./helpers/debug/debugPrinters').successPrint;
var requestPrint = require('./helpers/debug/debugPrinters').requestPrint;

var app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            emptyObject: (obj) => {
                return !(obj.constructor === Object && Object.keys(obj).length ==0)
            }
            /**
             * if you need more helpers you can
             * register them here
             */
        },
    })
);


var mySqlSessionStore = new mySqlSession(
    {
        /* using default options */
    },
    require('./config/database')
);
app.use(sessions({
    key: "csid",
    secret: "secret from csc317",
    store: mySqlSessionStore,
    resave: false,
    saveUninitialized: false
}))


app.use(flash());

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    requestPrint(req.url);
    next();
});

app.use((req, res, next) => {
    console.log(req.session);
    if(req.session.username){
        res.locals.logged = true;
    }
    next();
})

//localhost:3000
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.render('error', {err_message: err});

});

module.exports = app;
