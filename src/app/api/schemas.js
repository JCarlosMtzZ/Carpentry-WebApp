import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().required()
});

export const colorSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string()
});

export const furnitureItemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    categoryId: Joi.string().uuid().required(),
    colorId: Joi.string().uuid().required()
});

export const imageSchema = Joi.object({
    url: Joi.string().required(),
    furnitureItemId: Joi.string().uuid().required()
});