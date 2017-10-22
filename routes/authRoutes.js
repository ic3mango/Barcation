const passport = require('passport');

module.exports = (app) => {

  // Twitter authentication
  app.get('/auth/twitter', passport.authenticate('twitter', {
    display: 'popup'
  }));

  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}
