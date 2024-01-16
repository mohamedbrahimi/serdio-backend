const { Router } = require('express');
const authController = require('../controllers');
const  { gitHubLoginMWs,  gitHubAccessMWs, gitHubDeleteSessionMWs} = require('../middlewares');

const router = new Router();

//** Auth Integration **/
router.post('/auth/github', gitHubLoginMWs);
router.get('/auth/github/page', authController.authPageGithubController);
router.get('/auth/github/access', gitHubAccessMWs);
router.delete('/auth/github/delete-session', gitHubDeleteSessionMWs);

module.exports = router;