import cron from 'node-cron';
import query from '../src/db';

export const executeCronJob = () => {
  const task = cron.schedule('0 0 * * 1', async() => {
    try {
        await new Promise<boolean>((resolve, reject) => {
            query(`DELETE FROM scrobble_week`,(err,data)=>{
                if(err)reject(err)
                else resolve(true)
            })
        })
        console.log('clear finish!');
    } catch (error) {
        console.log(error);
    }
  });
  task.start();
}
