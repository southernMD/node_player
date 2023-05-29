import express,{Request,Response} from 'express';
import {validationCreate,validationTracks,validationSubscribe} from '../handles/playListHandles'
import {verifyToken} from '../../utils/jwtPrase'
import {handleValidationErrors} from '../../utils/validationError'
const router = express.Router()
import query from '../db';

//创建歌单
router.post('/create',verifyToken,validationCreate,handleValidationErrors,async(req:any,res:Response)=>{
    try {
        const { userId } = req.user;
        const { name, privacy } = req.body;
    
        const insertId = await new Promise<number>((resolve, reject) => {
            query(`INSERT INTO playlists (userId, privacy, name, createTime,creatorId) VALUES (${userId}, '${privacy ? privacy : 0}', '${name}', '${Date.now()}',${userId})`, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data.insertId);
                }
            });
        });
    
        res.json({ code: 200 });
    } catch (error) {
        console.log(error);
        res.json({ code: 500 });
    }
    
})
//对歌单添加歌曲
router.post('/tracks',verifyToken,validationTracks,handleValidationErrors,async(req:any,res:Response)=>{
    try {
        const { userId } = req.user;
        const {op,pid,tracks} = req.body;
        const willId = await new Promise<any>((resolve, reject) => {
            query(`select creatorId from playlists where id = ${pid}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0].creatorId)
            })
        })
        console.log(willId);
        if(willId != userId){
            res.json({code:502})
        }else{
            const ids:string = await new Promise<any>((resolve, reject) => {
                query(`
                    select songs from playlists_songs where id = ${pid}
                `,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data[0].songs)
                })
            })
            const listIds:string[] = ids.split(',')
            if(op == 'add'){
                const listTracks:string[] = tracks.split(',')
                if(listTracks.length == 1 && listIds.includes(tracks)){
                    res.json({body:{code:502,message:'歌单内歌曲重复'}})
                }else{
                    const listIds:string[] = ids.split(',')
                    const ans = listTracks.filter((id)=> !listIds.includes(id))
                    const insertIds = [...listIds,...ans].join(',')
                    query(`
                        UPDATE playlists_songs
                        SET songs = '${insertIds}',
                        length = (LENGTH(COALESCE(songs, '')) - LENGTH(REPLACE(COALESCE(songs, ''), ',', '')) + 1)
                        WHERE id = ${pid};
                    `,(err,data)=>{
                        res.json({body:{code:200}})
                    })
                }
            }else{
                const listTracks:string[] = tracks.split(',')
                const ans = listIds.filter((id)=> !listTracks.includes(id))
                const insertIds = ans.join(',')
                await new Promise<any>((resolve, reject) => {
                    query(`
                    UPDATE playlists_songs
                    SET songs = '${insertIds}',
                    length = (LENGTH(COALESCE(songs, '')) - LENGTH(REPLACE(COALESCE(songs, ''), ',', '')) + 1)
                    WHERE id = ${pid};
                    `,(err,data)=>{
                        if(err)reject(err)
                        else res.json({body:{code:200}})
                    })
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.json({code:500,message:error})
    }
})
//收藏歌单
router.post('/subscribe',verifyToken,validationSubscribe,handleValidationErrors,async(req:any,res:Response)=>{
    try {
        const { userId } = req.user;
        const {id,t} = req.body
        if(t == 1){
            //收藏
            const strIds:string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_starts_playlists where userid = ${userId}`,(err,data)=>{
                    console.log(data);
                    if(err)reject(err)
                    else resolve(data[0].start_playList_ids)
                })
            })
            const listIds = strIds==''?[]:strIds.split(',')
            if(listIds.includes(id+'')){
                res.json({code:501})
            }else{
                listIds.unshift(id+'')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_starts_playlists set start_playList_ids = '${newStrIds}' where userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve()
                    })
                })
                res.json({code:200})
            }
        }else{
            //取消收藏
            const strIds:string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_starts_playlists where userid = ${userId}`,(err,data)=>{
                    console.log(data);
                    if(err)reject(err)
                    else resolve(data[0].start_playList_ids)
                })
            })
            let listIds = strIds==''?[]:strIds.split(',')
            if(!listIds.includes(id+'')){
                res.json({code:501})
            }else{
                listIds = listIds.filter(it=>it != id+'')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_starts_playlists set start_playList_ids = '${newStrIds}' where userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve()
                    })
                })
                res.json({code:200})
            }
        }
    } catch (error) {
        console.log(error);
        res.json({code:500,message:error})
    }
})
export default router
