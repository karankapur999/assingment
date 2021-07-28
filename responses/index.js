'use-strict';

var response;

response = {

  successResponse: function successResponse(res, data, message, statusCode, metadata) {
    return res.status(statusCode || 200).json({
      "code": 0,
      "msg": message || 'success',
      "metadata": metadata || {},
      "records": data,
    });
  },

  errorResponse: function errorResponse(res, statusCode, message, errors) {
    return res.status(statusCode || 403).json({
      "code": -1,
      "msg": message || 'failure',
      "errors": errors || [],
    });
  }
}

module.exports = response;
