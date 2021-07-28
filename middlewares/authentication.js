const httpResponse = require('.././responses');

const authenticated = () => {
    return (req, res, next) => {
        if(req.headers['token'] == process.env.token)  next();      
        else return httpResponse.errorResponse(res, 401, 'Incorrect/Missing Auth Token', {})
    }
}

module.exports = authenticated;
