/*=============================================
=                   Routes                    =
=============================================*/
var Job = require('./models/job'),
  User = require('./models/user'),
  _ = require('lodash');


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

  app.get('/api/v1/user/:id', function(req,res){
    User.find({_id: req.params['id']}).populate('profile, resume').exec(function(err,user){
      if(err) return res.json("No")
      res.json(user);
    });
  })
  app.get('/api/v1/user/:id/resume', function(req,res){
    User.findOne({_id: req.params['id']},function(err,user){
      // console.log(user)
      if(err) return res.json("No")
      res.json(user.resume);
    });
  })

  var listJobs = function(req,res){
    Job.find(function(err,jobs){
      _.each(jobs,function(job){
        if (req.user._id.toString() !== job.user.toString()) {
          job.applications = []; // Hide job applications from anyone that didn't create them
        }
      })
      res.json(jobs);
    });
  }

  app.get('/api/v1/jobs',auth,function(req,res){
    listJobs(req,res);
  });

  app.post('/api/v1/jobs',auth,function(req,res){
    var job = new Job({
      title: req.body.title,
      company: {
        name: req.body.company.name
      },
      description: {
        short: req.body.description.short,
        long: req.body.description.long
      },
      user: req.user
    });
    job.save(function(err){
        listJobs(req,res);
    });

  });

  app.get('/api/v1/me/jobs',auth,function(req,res){
    Job.find({user:req.user},function(err,jobs){
      res.json(jobs);
    })
  });
  app.get('/api/v1/job/:id',auth,function(req,res){
    // console.log(req.params)
    Job.findOne({_id: req.params['id']}).exec(function(err,job){

      if(err) return res.json("No");
      if (req.user._id.toString() !== job.user.toString()) {
        job.applications = [];
        return res.json(job);
      }
      User.populate(job.applications,{path:'user'}, function(err,user){
        if(err) return res.json("No");
        return res.json(job);
      });
    })
  });


  app.put('/api/v1/job/:id',auth,function(req,res){
    // console.log(req.params)
    Job.findOne({_id: req.params['id'], user: req.user},function(err,job){
      if(err) return res.json("No")
      job.title = req.body.title;
      job.company = req.body.company
      job.description = req.body.description
      job.save(function(err){
        listJobs(req,res);
      });
    })
  });

  app.delete('/api/v1/job/:id',auth,function(req,res){
    // console.log(req.params)
    Job.findOne({_id: req.params['id'], user: req.user},function(err,job){

      if(err) return res.json("No")
      job.remove(function(err){
        listJobs(req,res);
      });
    })
  });

  app.get('/api/v1/job/:id/applications',auth,function(req,res){
    Job.findOne({_id: req.params['id'], user: req.user},function(err,job){
      if(err) return res.json("No");
      res.json(job.applications);
    });
  });

  app.post('/api/v1/job/:id/applications',auth,function(req,res){
    Job.findOne({_id: req.params['id']},function(err,job){
      if(err) return res.json("No");
      //TODO: Create a job
      job.applications.push({
        cover_letter: req.body.cover_letter,
        user: req.user
      });
      job.save(function(err){
        // debugger;
        console.log(err);
        if(err) return res.json("No");
        res.json(job);
      })
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
