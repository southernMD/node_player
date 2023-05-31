import { check, oneOf,body} from 'express-validator';

export const validationPlaylist = [
    check('uid')
        .exists()
        .notEmpty()
        .withMessage('uid是必须的')
]


export const validationArtistSub = [
    check('id')
        .exists()
        .notEmpty()
        .withMessage('uid是必须的'),
    check('t')
    .exists()
    .notEmpty()
    .withMessage('t是必须的')
]

export const validationFollow = [
    check('t')
        .exists()
        .notEmpty()
        .withMessage('t是必须的'),
    check('id')
    .exists()
    .notEmpty()
    .withMessage('id是必须的'),
]

export const validationFollows=[
    check('uid')
    .exists()
    .notEmpty()
    .withMessage('uid是必须的'),

    body('limit')
    .optional().isNumeric().notEmpty(),

    body('offset')
    .optional().isNumeric().notEmpty()
]