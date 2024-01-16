const { authPageUrl } = require('../helpers/github/auth');
async function authPageGithubController(req, res, next) {

    res.send({
       success: true,
        data: {
           url: authPageUrl()
        }
    });

}

module.exports = {
    authPageGithubController
}