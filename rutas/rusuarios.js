const express = require("express");
const {
  body
} = require("express-validator/check");

const Usuario = require("../modelos/mUsuario");
const cUsuarios = require("../controladores/cUsuarios");
const Auto = require("../middleware/Autorizacion");

const usuariosRouter = express.Router();





usuariosRouter.post("/login", cUsuarios.login);






usuariosRouter.get("/logout", function (req, res) {

});


router.get('/login', cUsuarios.getLogin);

router.get('/signup', cUsuarios.getSignup);

router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  cUsuarios.postLogin
);



router.post( '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This email address if forbidden.');
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  cUsuarios.postSignup
);



router.post('/logout', cUsuarios.postLogout);

router.get('/reset', cUsuarios.getReset);

router.post('/reset', cUsuarios.postReset);

router.get('/reset/:token', cUsuarios.getNewPassword);

router.post('/new-password', cUsuarios.postNewPassword);



module.exports = usuariosRouter;
