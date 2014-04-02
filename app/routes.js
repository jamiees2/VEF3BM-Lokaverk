/*=============================================
=                   Routes                    =
=============================================*/

module.exports = function(app, passport) {

  /**
   * Home Page
   */
  app.get('/', function(req, res) {
    res.render('index', {user: req.user});
  });

  app.get('/resumes', function(req,res){
    if(!req.user){
      res.json({error: 'Not logged in!',location: '/login'})
    } else {
      res.json(req.user.resumes);
    }
  });

  app.post('/resumes', function(req,res){
    if(!req.user){
      res.json({error: 'Not logged in!',location: '/login'})
    } else {
      var resume = req.user.resumes.create({content: req.params.content})
      res.json(resume);
    }
  });

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
    successRedirect: '/profile',
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
   * Profile page
   */
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('users/profile', {
      user: req.user
    });
  });

  /**
   * Logout
   */
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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
