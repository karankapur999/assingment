const DBA = require('../../dbAccessLayer');
const coreDBA = DBA.core;
const moment = require('moment');
const httpResponse = require('../../responses');

let controller = {};

controller.healthCheck = async function (req, res) {
    res.status(200).send("OK");
}

controller.fetchRecords = async function (req, res) {
    try{
        let whereQuery = {};
        let size = 10;
        let skip = 0;
        if(req.query.size)  size =  req.query.size;
        if(req.query.page)  skip =  req.query.page * size;

        if( req.query.startDate  ){
            req.query.startDate = new Date(req.query.startDate);
            whereQuery['createdAt'] = { $gte: req.query.startDate }
        }
        if( req.query.endDate  ){
            req.query.endDate = new Date(req.query.endDate);
            whereQuery['createdAt'] = { $gte: req.query.endDate }
        }
        if( req.query.startDate && req.query.endDate   ){
            whereQuery['createdAt'] = { $gte: req.query.startDate, $lte:req.query.endDate  }
        }

        if( req.query.minCount  ){
            whereQuery['totalCount'] = { $gte: parseFloat(req.query.minCount) }
        }
        if( req.query.maxCount  ){
            whereQuery['totalCount'] = { $gte:  parseFloat(req.query.maxCount) }
        }
        if( req.query.minCount && req.query.maxCount   ){
            whereQuery['totalCount'] = { $gte:  parseFloat(req.query.minCount), $lte:  parseFloat(req.query.maxCount)  }
        }
        let data = await coreDBA.getRecords(whereQuery, skip, size);
        return httpResponse.successResponse(res, data, null, 200, { 'current_page':  req.query.page? req.query.page: 0 });
    }
    catch(e){
        return httpResponse.errorResponse(res, 500, null, e);
    }
    
}


module.exports = controller;
