const httpResponse = require('.././responses');

const validateRequest = (joiSchema, reqProperty) => {
    return (req, res, next) => {
        const { error } = joiSchema.validate(req[reqProperty]);

        if (!error) {
            return next();
        }

        const { details } = error;

        return httpResponse.errorResponse(res, 403, 'Inavlid Request', details)
    };

};

module.exports = validateRequest;
