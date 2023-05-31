import express,{Request,Response} from 'express';
import {validationCreate,validationTracks,validationSubscribe, validationDynamic, validationPlaylistTrackAll} from '../handles/playListHandles'
import {verifyToken,verifyTokenAllPass} from '../../utils/jwtPrase'
import {handleValidationErrors} from '../../utils/validationError'
import WebSocket from 'ws'
const router = express.Router()
import query from '../db';
import http from 'http'
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
    
        res.json({ code: 200,id:insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500 });
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
            const listIds:string[] = ids==''?[]:ids.split(',')
            let coverMusicId:number
            if(op == 'add'){
                const listTracks:string[] = tracks.split(',')
                if(listTracks.length == 1 && listIds.includes(tracks)){
                    res.json({body:{code:502,message:'歌单内歌曲重复'}})
                    return
                }else{
                    const ans = listTracks.filter((id)=> !listIds.includes(id))
                    console.log(listIds,ans);
                    const insertIds = [...ans,...listIds].join(',')
                    coverMusicId = +[...ans,...listIds][0]
                    await new Promise<void>((resolve, reject) => {
                        query(`
                            UPDATE playlists_songs
                            SET songs = '${insertIds}',
                            length = (LENGTH(COALESCE(songs, '')) - LENGTH(REPLACE(COALESCE(songs, ''), ',', '')) + 1)
                            WHERE id = ${pid};
                        `,(err,data)=>{
                            if(err)reject(err)
                            else resolve()
                        })
                    })

                }
            }else{
                const listTracks:string[] = tracks.split(',')
                const ans = listIds.filter((id)=> !listTracks.includes(id))
                const insertIds = ans.join(',')
                coverMusicId = +ans[0]
                await new Promise<void>((resolve, reject) => {
                    query(`
                    UPDATE playlists_songs
                    SET songs = '${insertIds}',
                    length = (LENGTH(COALESCE(songs, '')) - LENGTH(REPLACE(COALESCE(songs, ''), ',', '')) + 1)
                    WHERE id = ${pid};
                    `,(err,data)=>{
                        if(err)reject(err)
                        else resolve()
                    })
                })
            }
            const set = await new Promise<number>((resolve, reject) => {
                query("select `set` from playlists where id = "+pid,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data[0].set)
                })
            })
            console.log(set);
            if(set == 1){
                res.json({body:{code:200}})
            }
            if(set == 0){
                // coverMusicId
                console.log(coverMusicId,'(*YFTYDRTR^&*()');
                const ms = await new Promise<any>((resolve, reject) => {
                    const options = {
                      hostname: 'cloud-music.pl-fe.cn',
                      path: `/song/detail?ids=${coverMusicId}`,
                      method: 'GET',
                    };
              
                    const req = http.request(options, (res) => {
                      let data = '';
              
                      res.on('data', (chunk) => {
                        data += chunk;
                      });
              
                      res.on('end', () => {
                        resolve(JSON.parse(data));
                      });
                    });
              
                    req.on('error', (error) => {
                      reject(error);
                    });
              
                    req.end();
                })
                const url = ms.songs[0]?.al?.picUrl ?? 'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251611198.png'
                query(`update playlists set coverImgUrl = '${url}' where id = ${pid}`,(err,data)=>{
                    if(err) throw(err)
                    else res.json({url,body:{code:200}})
                })
            }
        }
    } catch (error) {
        res.status(500).json({code:500,message:error})
        console.log(error);
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
        res.status(500).json({code:500,message:error})
    }
})
//歌单详情动态
router.post('/detail/dynamic',verifyTokenAllPass,validationDynamic,handleValidationErrors,async(req:any,res:Response)=>{
//subscribed
    try {
        let { userId } = req.user;
        const {id} = req.body
        userId = userId ?? 0
        let json = await new Promise<any>((resolve, reject) => {
            query(`SELECT commentCount,shareCount,playCount,bookedCount,FIND_IN_SET(id,(SELECT start_playList_ids FROM user_starts_playlists WHERE userId = ${userId})) > 0 as subscribed
            FROM playlists_dynamic
            WHERE id = ${id}`,(err,data)=>{
                if(err) reject(err)
                else resolve(data[0])
            })
        })
        res.json(Object.assign(json,{subscribed:json.subscribed?true:false,code:200}))
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})
//歌单详情
router.post('/detail',verifyTokenAllPass,validationDynamic,handleValidationErrors,async(req:any,res:Response)=>{
    try {
        let { userId } = req.user;
        userId = userId ?? 0
        const {id} = req.body
        const sql = `SELECT id, userId, privacy, playCount, trackCount, name, createTime, description, CONCAT('["', REPLACE(REPLACE(p.tags, ';', '","'), ',', ','), '"]') AS tags, coverImgUrl,(
            SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
            FROM user_message pm
            WHERE pm.userId = p.creatorId
        ) AS creator FROM  playlists p WHERE id = ${id}`
        let result = await new Promise<any>((resolve, reject) => {
            query(sql,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        // console.log(Object.assign(result,{tags:eval(result['tags']),creator:JSON.parse(result['creator'])}));
        if(!result){
            res.json({code:404,msg:'no resource'})
        }else{
            if(result.privacy == 0 || result.privacy == 10 && userId == result.creator.id){
                res.json({code:200,playlist:Object.assign(result,{tags:eval(result['tags']) == null?[]:eval(result['tags']),creator:JSON.parse(result['creator'])})})
            }else{
                res.json({code:401,msg:'无权限访问'})
            }
        }
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})
//歌单歌曲
router.post('/track/all',verifyTokenAllPass,validationPlaylistTrackAll,handleValidationErrors,async(req:any,res:Response)=>{
    try {
        let { userId } = req.user;
        userId = userId ?? 0
        let {id,limit,offset} = req.body
        if(limit) limit = +limit
        if(offset) offset = +offset
        const sql = `SELECT p.id,p.userId,p.privacy,ps.songs from  playlists p ,playlists_songs ps where p.id = ${id} and p.id = ps.id`
        let result = await new Promise<any>((resolve, reject) => {
            query(sql,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        if(!result){
            res.json({code:404,msg:'no resource'})
        }else{
            const songArr = result.songs.split(',')[0] == ''?[]:result.songs.split(',')
            offset = offset ?? 0
            limit = limit ?? songArr.length
            if(result.privacy == 0 || result.privacy == 10 && userId == result.userId){
                if(offset > songArr.length){
                    res.json({code:200,songs:[],privileges:[]})
                }else{
                    const songs = songArr.slice(offset,limit + offset).join(',')
                    if(songs.length == 0){
                        res.json({code:200,songs:[],privileges:[]})
                    }else{
                        const ms = await new Promise<any>((resolve, reject) => {
                            const options = {
                              hostname: 'cloud-music.pl-fe.cn',
                              path: `/song/detail?ids=${songs}`,
                              method: 'GET',
                            };
                      
                            const req = http.request(options, (res) => {
                              let data = '';
                      
                              res.on('data', (chunk) => {
                                data += chunk;
                              });
                      
                              res.on('end', () => {
                                resolve(JSON.parse(data));
                              });
                            });
                      
                            req.on('error', (error) => {
                              reject(error);
                            });
                      
                            req.end();
                        })
                        res.json(ms)
                    }
                }
            }else{
                res.json({code:401,msg:'无权限访问'})
            }
        }
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})
export default router
