const JoiBase = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const fetchRecords = Joi.object({
   "page":      Joi.number().min(0).optional(),
   "size":      Joi.number().default(10).optional(),
   "minCount":  Joi.number().optional(),
   "maxCount":  Joi.number().min(Joi.ref('minCount')).optional(),
   "startDate": Joi.date().format("YYYY-MM-DD").optional(), // set desired date format here.raw().optional(),
   "endDate":   Joi.date().format("YYYY-MM-DD").min(Joi.ref('startDate')).optional(),
});

module.exports = {
    fetchRecords
};
