import Joi from 'joi';

const createContactForm = {
    body: Joi.object().keys({
        name: Joi.string().required().trim().min(1).max(100),
        email: Joi.string().required().email(),
        subject: Joi.string().required().trim().min(1).max(200),
        message: Joi.string().required().trim().min(1).max(2000)
    })
};

const getContactForms = {
    query: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        subject: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1)
    })
};

const getContactForm = {
    params: Joi.object().keys({
        contactFormId: Joi.number().integer().required()
    })
};

const deleteContactForm = {
    params: Joi.object().keys({
        contactFormId: Joi.number().integer().required()
    })
};

export default {
    createContactForm,
    getContactForms,
    getContactForm,
    deleteContactForm
};