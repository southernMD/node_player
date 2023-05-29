import {Request,Response} from 'express';
import { validationResult} from 'express-validator';

export function handleValidationErrors(req:Request,res:Response, next: () => void) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(202).json({ status:202,errors: errors.array() ,message:'校验失败'});
    }
    next();
  };