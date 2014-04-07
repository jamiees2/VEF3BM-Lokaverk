/*=============================================
=                   Routes                    =
=============================================*/

module.exports = function(app, passport) {

  app.get('/api/v1/user', function(req,res) {
    if(req.isAuthenticated()) res.send(req.user);
    else res.send(null);
  });
  /* Log in POST */
  app.post('/api/v1/user/login', passport.authenticate('local-login'), function(req,res) {
    res.send(req.user);
  });

  /* Signup POST */
  app.post('/api/v1/user/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  /**
   * Logout
   */
  app.get('/api/v1/user/logout', auth, function(req, res) {
    req.logout();
    res.send(200);
  });

  app.get('/api/v1/user/resume', auth, function(req,res){
    res.json(req.user.resume);
  });

  app.post('/api/v1/user/resume', auth, function(req,res){
    req.user.resume = {
      title: req.body.title,
      additional: req.body.additional,
      address: req.body.address,
      degrees: req.body.degrees,
      email: req.body.email,
      experience: req.body.experience,
      name: req.body.name,
      phone: req.body.phone,
      references: req.body.references
    };
    req.user.save(function(err){
      res.json(req.user.resume)
    });
  });


  /**
   * Home Page
   */
  app.get('*', function(req, res) {
    res.sendfile('index.html', { root: __dirname + "/../public" });
  });
};

/**
 * Check if a user is online
 */
var auth = function(req, res, next){ 
  if (!req.isAuthenticated()) res.send(401); 
  else next(); 
};
