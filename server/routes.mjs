import Router from 'koa-router';
import passport from 'passport'
import cel from 'connect-ensure-login'

const router = new Router();

// Define routes.
router.get('/',(req, res) => res.render('home', { user: req.user }));

router.get('/login', (req, res) => res.render('login'));

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/')
);

router.get('/profile',
  cel.ensureLoggedIn(),
  (req, res) => res.render('profile', { user: req.user })
  );
export default router;