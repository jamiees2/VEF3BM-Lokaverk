/*=============================================
=                   Routes                    =
=============================================*/

module.exports = function(app, passport) {
  var Resume = require('./models/resume.js').ResumeModel;
  app.get('/api/resumes', function(req,res){
    if(!req.user){
      res.json({error: 'Not logged in!',location: '/login'})
    } else {
      res.json(req.user.resumes);
    }
  });

  app.post('/api/resumes', function(req,res){
    if(!req.user){
      res.json({error: 'Not logged in!',location: '/login'})
    } else {
      console.log(req.body);
      req.user.resumes.push({
        additional: req.body.additional,
        address: req.body.address,
        degrees: req.body.degrees,
        email: req.body.email,
        experience: req.body.experience,
        name: req.body.name,
        phone: req.body.phone,
        references: req.body.references
      });
      req.user.save(function(err){
        res.json(req.user.resumes)
      });
    }
  });
  app.delete('/api/resume/:resume_id',function(req,res){
    req.user.resumes.id(req.params.resume_id).remove();
    req.user.save(function(err){
      res.json(req.user.resumes);
    });
  });
};
