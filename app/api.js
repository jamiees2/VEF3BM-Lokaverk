/*=============================================
=                   Routes                    =
=============================================*/

module.exports = function(app, passport) {

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
      var resume = req.user.resumes.create({content: req.params.content})
      res.json(resume );
    }
  });
};
