const axiosRequest = require('../../axios');
const GitHubIntegration = require('../../../models/github-integration');
const {
    REDIRECT_URI,
    CLIENT_SECRET,
    CLIENT_ID
} = require("../../../config");
function authPageUrl() {
    return `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user&allow_signup=true`
}

async function getAccessToken(data) {
    const { code } = data;
    const url = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`
    return await axiosRequest.post(url, {}, { headers: {'Accept':'application/json' } });
}

async function getUserDetails(data) {
    const { token } = data;
    const url = `https://api.github.com/user`
    return await axiosRequest.get(url, { headers:{ 'Authorization': token, 'Accept':'application/json' } });
}

async function saveOrUpdateUserDetails(data) {
    const { user_info } = data;

    const { id: github_id } = user_info;
    // check if user alreadyExists
    const updateExistingUser = await GitHubIntegration.findOneAndUpdate({
        github_id,
        archived: 0
    }, { last_request: new Date() }, { new: true });

    if (updateExistingUser) return updateExistingUser;

    const handelUserInfo = {
        ...user_info,
        github_id,
        github_created_at: user_info.created_at,
        github_updated_at: user_info.updated_at,
    }
    const createdUser = await GitHubIntegration.create(handelUserInfo);

    return createdUser;
}

async function removeUserDetails(data) {
    const { user_info } = data;

    const { id: github_id } = user_info;
    const updateExistingUser = await GitHubIntegration.findOneAndUpdate({
        github_id,
        archived: 0
    }, { archived: -1 * new Date().getTime() }, { new: true });


    return updateExistingUser;
}

module.exports = {
    authPageUrl,
    getAccessToken,
    getUserDetails,
    saveOrUpdateUserDetails,
    removeUserDetails
}