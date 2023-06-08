import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { verifyToken, verifyTokenAllPass } from './utils/jwtPrase';
import { executeCronJob } from './utils/task';
import portfinder from 'portfinder';
import cron from 'node-cron';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Import api modules
import RegisterAndLogin from './src/api/RegisterAndLogin';
import playList from './src/api/playList';
import user from './src/api/user';
import others from './src/api/others';


// router
app.use('/regAndLog', RegisterAndLogin);
app.use('/playList', playList);
app.use('/user', verifyTokenAllPass, user);
app.use(others);

app.get('/',(req,res)=>{
  res.send('Hello world!')
})
executeCronJob()

if (import.meta.env.PROD) {
  (async () => {
    const port = await portfinder.getPortPromise({
      port: 3000,
    });
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })();
}

export const viteNodeApp = app;
