import express from 'express';
import bodyParser from 'body-parser';
import RegisterAndLogin from './src/api/RegisterAndLogin'
import playList from './src/api/playList'
import cors from 'cors'
const app = express();
// your beautiful code...
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded   针对普通页面提交功能
app.use(bodyParser.json());  // parse application/json    针对异步提交ajax
app.use(cors())
//router
app.use('/regAndLog',RegisterAndLogin)
app.use('/playList',playList)

export const viteNodeApp = app;


