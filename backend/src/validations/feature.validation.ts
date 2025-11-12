import Joi from 'joi';

const createFeature = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        icon: Joi.string().required(),
        color: Joi.string().required()
    })
};

const getFeatures = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getFeature = {
    params: Joi.object().keys({
        featureId: Joi.number().integer()
    })
};

const updateFeature = {
    params: Joi.object().keys({
        featureId: Joi.number().integer()
    }),
    body: Joi.object()
        .keys({
            title: Joi.string(),
            description: Joi.string(),
            icon: Joi.string(),
            color: Joi.string()
        })
        .min(1)
};

const deleteFeature = {
    params: Joi.object().keys({
        featureId: Joi.number().integer()
    })
};

export default {
    createFeature,
    getFeatures,
    getFeature,
    updateFeature,
    deleteFeature
};