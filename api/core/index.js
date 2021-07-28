const express = require('express');
const router = express.Router();
const validateRequest           = require('../../middlewares/validate-request');
const {  fetchRecords } = require('../../request-schemas');
const authenticated           = require('../../middlewares/authentication');

var controller = require('./controller');

/**
 * @apiGroup Core
 * @api {get} /api/v1/core/records records
 * @apiDescription records Get the records from database based on query parameters
 * @apiHeader {String} token security token
 * @apiHeader {String} Content-Type  application/json
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "token": khgtf.33434.Xo6UeM1c7bYVx_PTQ4LbRrknjbhbhYR8-7n1Ow1JlDNGz9SXg,
 *       "Content-Type": application/json
 *     }
 * @apiParam    {Number} minCount   		         Non-Mandatory minCount 
 * @apiParam    {Number} maxCount                    Non-Mandatory maxCount   
 * @apiParam    {Date}   startDate                   Non-Mandatory startDate
 * @apiParam    {Date}   endDate                     Non-Mandatory endDate .
 * @apiParam    {Number} page                        Non-Mandatory page   
 * @apiParam    {Number} size                        Non-Mandatory size   


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK 
 

 * @apiName /records
 * 
 *
 */
router.get('/records', [authenticated(),  validateRequest(fetchRecords, 'query')], controller.fetchRecords);


router.get('/healthcheck', controller.healthCheck);


module.exports = router;