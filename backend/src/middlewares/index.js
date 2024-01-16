const { getUserInfoFromGitHubAccessTokenMw, checkGithubLoginCodeMw, saveUserInfoFromGitHubAccessTokenMw, checkFieldsAccessTokenMw, removeUserSessionMw } = require('./auth.github.mw');


const gitHubLoginMWs = [
    checkGithubLoginCodeMw,
    getUserInfoFromGitHubAccessTokenMw,
    saveUserInfoFromGitHubAccessTokenMw,
]

const gitHubAccessMWs = [
    checkFieldsAccessTokenMw,
    getUserInfoFromGitHubAccessTokenMw,
    saveUserInfoFromGitHubAccessTokenMw,
]

const gitHubDeleteSessionMWs = [
    checkFieldsAccessTokenMw,
    getUserInfoFromGitHubAccessTokenMw,
    removeUserSessionMw,
]

module.exports = {
    gitHubLoginMWs,
    gitHubAccessMWs,
    gitHubDeleteSessionMWs
}