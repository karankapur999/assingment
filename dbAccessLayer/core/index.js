'use strict';


var dataBaseCentral = require("../../domains");

const Records = dataBaseCentral.records;

var coreDBA = {
    getRecords: function(whereQuery, skip, limit) {
        return Records.aggregate([
            {
                $group: {
                    "_id": "$_id",
                    "data": {
                        "$first": "$$ROOT",
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "key": "$data.key",
                    "createdAt": "$data.createdAt",
                    "totalCount": {
                        "$reduce": {
                            "input": "$data.counts",
                            "initialValue": 0 ,
                            "in": {
                                  $add : ["$$value", "$$this"] ,
                            }
                        }
                    },
                }
            },
            { 
                $match: whereQuery
            
            },
            { $skip :  skip  },
            { $limit : limit },
            { $sort : {"totalCount":-1} }
        ])
    }
}

function getOptions(whereQuery, selectArray, sortBy, skip, limit, group) {
    var options = {};
    if (whereQuery) options['where'] = whereQuery;
    if (selectArray) options['attributes'] = selectArray;
    if (sortBy) options['order'] = sortBy;
    if (skip) options['offset'] = skip;
    if (limit) options['limit'] = limit;
    if (group) options['group'] = group;
    return options;
  }

module.exports = coreDBA;
