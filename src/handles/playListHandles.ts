import { check, oneOf,body} from 'express-validator';


export const validationCreate = [
    check("name","name 是必须的").exists().notEmpty(),
]

export const validationTracks = [
    // op验证规则
    body('op')
      .notEmpty()
      .isIn(['add', 'del']),
  
    // pid验证规则
    body('pid')
      .notEmpty()
      .isNumeric(),
  
    // tracks验证规则
    body('tracks')
      .notEmpty()
      .matches(/^(\d+,)*\d+$/),
]

export const validationSubscribe = [
  body('t')     
  .notEmpty()
  .isIn([1, 2]),
  body('id')
  .notEmpty()
  .isNumeric(),
]
//401 自己 501重复收藏