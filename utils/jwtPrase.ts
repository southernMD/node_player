import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction,RequestHandler} from 'express';

export const verifyToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      // 令牌不存在
      return res.status(401).json({ code:401,message: '请登录' });
    }
  
    jwt.verify(token.split('Bearer ')[1], 'daniuma1145141919810', (err, decoded) => {
      if (err) {
        // 令牌验证失败
        return res.status(401).json({ code:401,message: '请登录' });
      }
      console.log(decoded);
      // 令牌验证成功
      //@ts-ignore
      req['user'] = decoded; // 将解码后的用户信息存储在请求对象中，以便后续处理使用
      next();
    });
  };

export const verifyTokenAllPass: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization ?? '';
  jwt.verify(token.split('Bearer ')[1], 'daniuma1145141919810', (err, decoded) => {
    //@ts-ignore
    req['user'] = decoded; // 将解码后的用户信息存储在请求对象中，以便后续处理使用
    next();
  });
}