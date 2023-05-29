
import { check, oneOf} from 'express-validator';

export const validationLogin = [
    oneOf([
        check('nickname')
          .exists()
          .notEmpty()
          .withMessage('昵称是必须的'),
        check('nickname')
          .exists()
          .notEmpty()
          .withMessage('邮箱是必须的')
          .isEmail()
          .withMessage('请输入正确的邮箱'),
    ]),
    check('password')
        .exists()
        .notEmpty()
        .withMessage('密码是必须的')
];

export const validationRegister = 
[
    check("email","email 是必须的").notEmpty().exists(),
    check("password","password 是必须的").notEmpty().exists(),
    check("code","code 是必须的").notEmpty().exists(),
]

export const validationEmail = check("email", "请输入正确的邮件地址").exists().notEmpty().isEmail()