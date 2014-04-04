/*=============================================
=                   Routes                    =
=============================================*/

module.exports = function(app, passport) {

  /**
   * Log in Page
   */
  app.get('/login', function(req, res) {
    if (!req.user) {
      res.render('users/login', { message: req.flash('loginMessage')});
    } else{
      res.redirect('/')
    };
  });

  /* Log in POST */
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  /* Signup Page */
  app.get('/signup', function(req, res) {
    if (!req.user) {
      res.render('users/signup', { message: req.flash('signupMessage')});
    } else{
      res.redirect('/')
    };
  });

  /* Signup POST */
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  /**
   * Logout
   */
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  /**
   * Home Page
   */
  app.get('*', function(req, res) {
    res.render('index', {user: req.user});
  });
};

/**
 * Check if a user is online
 */
function isLoggedIn(req, res, next) {

  // Check if user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
