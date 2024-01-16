const { getAccessToken, getUserDetails, saveOrUpdateUserDetails,  removeUserDetails } = require('../helpers/github/auth');
async function checkGithubLoginCodeMw(req, res, next) {

    try {
       const { auth_code } = req.body;

       if (!auth_code)
           return res.status(406).json({
               success: false,
               errMsgKey: "MISSING_AUTH_CODE"
           });

       const resp = await getAccessToken({ code: auth_code });

       const accessToken = resp?.data?.access_token;

       if (!accessToken)
           return res.status(400).json({
               success: false,
               errMsgKey: "INVALID_AUTH_CODE"
           });

       res.locals = {};
       res.locals.data = {};
       res.locals.data.access_token = accessToken;

       return next();
    }catch (e) {
        console.error('Error MW:checkGithubLoginCodeMw => err: ', e);
        return res.status(501).json({
            success: false,
            errMsgKey: "INTERVAL_SERVER_ERROR"
        });
    }



}
async function getUserInfoFromGitHubAccessTokenMw(req, res, next) {

    try {
        const { access_token } =res.locals.data;


        const resp = await getUserDetails({ token: "token"+ " " + access_token });

        const data = resp?.data;
        if (!data)
            return res.status(400).json({
                success: false,
                errMsgKey: "INVALID_ACCESS_TOKEN"
            });

        res.locals.data.user_info = data;

        return next();
    }catch (e) {
        console.error('Error MW:getUserInfoFromGitHubAccessTokenMw => err: ', e);
        return res.status(501).json({
            success: false,
            errMsgKey: "INTERVAL_SERVER_ERROR"
        });
    }

}
async function saveUserInfoFromGitHubAccessTokenMw(req, res, next) {

    try {
        const { user_info, access_token } =res.locals.data;


        const resp = await saveOrUpdateUserDetails({ user_info });

        if (!resp)
            return res.status(400).json({
                success: false,
                errMsgKey: "ERROR_WHILE_REQUESTING_USER_INFO"
            });

        const { name, email, last_request, login} = resp;
        return res.status(200).json({
            success: true,
            data: {
                access_token,
                user_info: {
                    login,
                    name,
                    email,
                    last_request
                }
            }
        });
    }catch (e) {
        console.error('Error MW:getUserInfoFromGitHubAccessTokenMw => err: ', e);
        return res.status(501).json({
            success: false,
            errMsgKey: "INTERVAL_SERVER_ERROR"
        });
    }

}

function checkFieldsAccessTokenMw(req, res, next) {

    try {
        const { authorization } = req.headers;

        if (!authorization)
            return res.status(401).json({
                success: false,
                errMsgKey: "INVALID_TOKEN"
            });

        res.locals = {};
        res.locals.data = {};
        res.locals.data.access_token = authorization;

        return next();
    }catch (e) {
        console.error('Error MW:checkFieldsAccessTokenMw => err: ', e);
        return res.status(501).json({
            success: false,
            errMsgKey: "INTERVAL_SERVER_ERROR"
        });
    }



}

async function removeUserSessionMw(req, res, next) {

    try {
        const { user_info } =res.locals.data;


        const resp = await removeUserDetails({ user_info });

        if (!resp)
            return res.status(400).json({
                success: false,
                errMsgKey: "ERROR_WHILE_REQUESTING_USER_DELETE"
            });

        return res.status(200).json({
            success: true,
            data: {
                message: 'User has been deleted!'
            }
        });
    }catch (e) {
        console.error('Error MW:removeUserSessionMw => err: ', e);
        return res.status(501).json({
            success: false,
            errMsgKey: "INTERVAL_SERVER_ERROR"
        });
    }

}
module.exports = {
    checkGithubLoginCodeMw,
    getUserInfoFromGitHubAccessTokenMw,
    saveUserInfoFromGitHubAccessTokenMw,
    checkFieldsAccessTokenMw,
    removeUserSessionMw
}