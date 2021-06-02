var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
const { successPrint, errorPrint } = require('../helpers/debug/debugPrinters');
var bcrypt = require('bcrypt');

router.post('/register', (req, res, next) => {

  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.password;


  UserModel.usernameExists(username)
      .then((userDoesNameExist) => {
        if(userDoesNameExist){
          throw new UserError(
              "Username already exist",
              "/registration",
              200
          );
        }else{
          return UserModel.emailExist(email)
        }
      })
      .then((emailExist) => {
        if(emailExist){
          throw new UserError(
              "Email already exist",
              "/registration",
              200
          );
        }else{
          return UserModel.create(username, password, email);
        }
      })
      .then((createdUserId) => {
        if(createdUserId < 0){
          throw new UserError(
              "User cannot be created",
              "/registration",
              500
          );
        }else{
          req.flash('Success', 'User account created.');
          successPrint("User.js --> User was created!");
          res.redirect("/login");
        }
      })
      .catch((err) => {
        errorPrint("User could not be made", err);
        if(err instanceof UserError){
          errorPrint(err.getMessage());
          req.flash('error',err.getMessage());
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        }else{
          next(err);
        }
      });
});


router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  //validate
  let baseSQL = "SELECT id, username, password FROM users WHERE username=?";
  let userId;
  db.execute(baseSQL, [username])
      .then(([results, fields]) => {
        if(results && results.length == 1){
          let hashedPassword = results[0].password;
          userId = results[0].id;
          return bcrypt.compare(password, hashedPassword);
        }else{
          throw new UserError("Invalid username and/or password!", "/login", 200);
        }
      })
      .then((passwordMatched) =>{
        if(passwordMatched){
          // res.locals.logged = true;
          successPrint(`${username} is logged in`);
          req.session.username = username;
          req.session.userId = userId;
          req.flash('success', 'You have been logged in!');
          res.redirect("/");

        }else{
          throw new UserError("Invalid username and/or password!", "/login", 200);
        }
      })
      .catch((err) => {
        errorPrint("User login failed");
        if(err instanceof UserError){
          errorPrint(err.getMessage());
          req.flash('error',err.getMessage());
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        }else{
          next(err)
        }
      })
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err)=> {
    if(err){
      errorPrint('Session could not be destroyed');
      next(err);
    }else{
      successPrint('Session was destroyed');
      res.clearCookie('csid');
      res.json({status:"OK", message:"user is logged out"});
    }
  })
});

module.exports = router;

