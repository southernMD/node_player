import express from 'express';
import bodyParser from 'body-parser';
import RegisterAndLogin from './src/api/RegisterAndLogin'
import playList from './src/api/playList'
import user from './src/api/user'
import others from './src/api/others'
import cors from 'cors'
import {verifyToken,verifyTokenAllPass} from './utils/jwtPrase'
const app = express();
// your beautiful code...
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded   针对普通页面提交功能
app.use(bodyParser.json());  // parse application/json    针对异步提交ajax
app.use(cors())
//router
app.use('/regAndLog',RegisterAndLogin)
app.use('/playList',playList)
app.use('/user',verifyTokenAllPass,user)
app.use(others)

export const viteNodeApp = app;


