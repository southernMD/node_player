import express from 'express'
import query from '../db';
import http from 'http'
import { validationPlaylist,validationArtistSub,validationFollow, validationFollows } from '../handles/userHandles';
import { handleValidationErrors } from '../../utils/validationError';
import { check } from 'express-validator';
const router = express.Router()

router.post('/playlist',validationPlaylist,handleValidationErrors,async(req:any,res)=>{
    try {
        const {userId} = req.user
        const { uid } = req.body;
        console.log(userId,uid);
        let sql = `
        SELECT p.id, p.privacy, p.playCount, p.trackCount, p.name, p.createTime, p.description, CONCAT('["', REPLACE(REPLACE(p.tags, ';', '","'), ',', ','), '"]') AS last_tag, p.coverImgUrl, (
            SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
            FROM user_message pm
            WHERE pm.userId = p.creatorId
        ) AS creator
        FROM playlists p
        JOIN user_message um ON p.creatorId = um.userId
        WHERE FIND_IN_SET(p.id, (SELECT playList_ids FROM user_playlists WHERE userId = ${userId})) > 0
        UNION
        SELECT p.id, p.privacy, p.playCount, p.trackCount, p.name, p.createTime, p.description, CONCAT('["', REPLACE(REPLACE(p.tags, ';', '","'), ',', ','), '"]') AS last_tag, p.coverImgUrl, (
            SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
            FROM user_message pm
            WHERE pm.userId = p.creatorId
        ) AS creator
        FROM playlists p
        JOIN user_message um ON p.creatorId = um.userId
        WHERE FIND_IN_SET(p.id, (SELECT start_playList_ids FROM user_starts_playlists WHERE userId = ${userId})) > 0;
        `
        if(uid != userId)sql+=` AND privacy = '0'`
        let playlist =  await new Promise<any[]>((resolve, reject) => {
            query(sql,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        playlist = playlist.map((item)=>{
            item['creator'] = JSON.parse(item['creator'])
            item['tags' ]= eval(item['tags']) == null?[]:eval(item['tags']) 
            return item
        })
        res.json({code:200,playlist})
    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:error})

    }
})

router.post('/subcount',async(req:any,res)=>{
    try {
        const {userId} = req.user
        const data =  await new Promise<void>((resolve, reject) => {
            query(`SELECT subPlaylistCount, artistCount, createdPlaylistCount, albumCount FROM  user_subcount WHERE userId = ${userId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        res.json(Object.assign({code:200},data) )
    } catch (error) {
        res.status(500).json({code:500,message:error})

    }
})

//收藏取消收藏歌手
router.post('/artist/sub',validationArtistSub,handleValidationErrors,async(req:any,res)=>{
    try {
        const {userId} = req.user
        const {id,t} = req.body
        //收藏
        if(t == 1){
            let result:any[] = await new Promise<any>((resolve, reject) => {
                query(`select * from artlist_info where id = ${id}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            if(result.length == 0){
                const ms = await new Promise<any>((resolve, reject) => {
                    const options = {
                      hostname: 'cloud-music.pl-fe.cn',
                      path: `/artist/detail?id=${id}`,
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    };
              
                    const req = http.request(options, (res) => {
                      let data = '';
              
                      res.on('data', (chunk) => {
                        data += chunk;
                      });
              
                      res.on('end', () => {
                        const parsedData = JSON.parse(data).data.artist
                        const { id, name, alias, cover: picUrl, avatar: img1v1Url } = parsedData;

                        const modifiedData = { id, name, alias, picUrl, img1v1Url };
              
                        resolve(modifiedData);
                      });
                    });
              
                    req.on('error', (error) => {
                      reject(error);
                    });
              
                    req.end();
                })
                await new Promise<any>((resolve, reject) => {
                    const {id, name, alias, picUrl, img1v1Url} = ms
                    query(`INSERT INTO artlist_info (id, name, alias, picUrl, img1v1Url) VALUES (${id}, '${name}','${JSON.stringify(alias)}', '${picUrl}','${img1v1Url}');
                    `,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
            }
            const strIds:string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_artist_sublist where userId = ${userId}`,(err,data)=>{
                    console.log(data);
                    if(err)reject(err)
                    else resolve(data[0].artist_ids)
                })
            })
            const listIds = strIds==''?[]:strIds.split(',')
            if(listIds.includes(id+'')){
                res.json({code:501})
            }else{
                listIds.unshift(id+'')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_artist_sublist set artist_ids = '${newStrIds}',length = ${listIds.length} where userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve()
                    })
                })
                res.json({code:200})
            }
        }else{
            //取消收藏
            const strIds:string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_artist_sublist where userId = ${userId}`,(err,data)=>{
                    console.log(data);
                    if(err)reject(err)
                    else resolve(data[0].artist_ids)
                })
            })
            let listIds = strIds==''?[]:strIds.split(',')
            console.log(listIds);
            if(!listIds.includes(id+'')){
                res.json({code:501})
            }else{
                listIds = listIds.filter(it=>it != id+'')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_artist_sublist set artist_ids = '${newStrIds}',length = ${listIds.length} where userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                res.json({code:200})
            }
        }
    } catch (error) {
        res.status(500).json({code:500,message:error})

    }
})
//收藏的歌手列表
router.post('/artist/sublist',async(req:any,res)=>{
    try {
        const {userId} = req.user
        let ans = await new Promise<any>((resolve, reject) => {
            query(`SELECT * FROM artlist_info
            WHERE (FIND_IN_SET(artlist_info.id, (SELECT artist_ids FROM user_artist_sublist WHERE userId = ${userId})) > 0)`,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        res.json({code:200,data:ans,count:ans.length})
    } catch (error) {
        res.status(500).json({code:500,message:error})

    }
})
//收藏取消收藏专辑
router.post('/album/sub',validationArtistSub,handleValidationErrors,async(req:any,res)=>{
    try {
        const {userId} = req.user
        const {id,t} = req.body
        //收藏
        if(t == 1){
            let result:any[] = await new Promise<any>((resolve, reject) => {
                query(`select * from album_info where id = ${id}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            if(result.length == 0){
                const ms = await new Promise<any>((resolve, reject) => {
                    const options = {
                      hostname: 'cloud-music.pl-fe.cn',
                      path: `/album?id=${id}`,
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    };
              
                    const req = http.request(options, (res) => {
                      let data = '';
              
                      res.on('data', (chunk) => {
                        data += chunk;
                      });
              
                      res.on('end', () => {
                        const parsedData = JSON.parse(data).album
                        const { id, name, picUrl, size,artists } = parsedData;

                        const modifiedData = { id, name, picUrl, artists,size };
              
                        resolve(modifiedData);
                      });
                    });
              
                    req.on('error', (error) => {
                      reject(error);
                    });
              
                    req.end();
                })
                await new Promise<any>((resolve, reject) => {
                    const {id, name, picUrl, artists,size} = ms
                    query(`INSERT INTO album_info (id, name, picUrl, size, artists) VALUES (${id}, '${name}','${picUrl}', '${size}','${JSON.stringify(artists)}');
                    `,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
            }
            const strIds:string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_album_sublist where userId = ${userId}`,(err,data)=>{
                    console.log(data);
                    if(err)reject(err)
                    else resolve(data[0].album_ids)
                })
            })
            const listIds = strIds==''?[]:strIds.split(',')
            if(listIds.includes(id+'')){
                res.json({code:501})
            }else{
                listIds.unshift(id+'')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_album_sublist set album_ids = '${newStrIds}',length=${listIds.length} where userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve()
                    })
                })
                res.json({code:200})
            }
        }else{
            //取消收藏
            const strIds:string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_album_sublist where userId = ${userId}`,(err,data)=>{
                    console.log(data);
                    if(err)reject(err)
                    else resolve(data[0].album_ids)
                })
            })
            let listIds = strIds==''?[]:strIds.split(',')
            console.log(listIds);
            if(!listIds.includes(id+'')){
                res.json({code:501})
            }else{
                listIds = listIds.filter(it=>it != id+'')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_album_sublist set album_ids = '${newStrIds}',length=${listIds.length} where userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                res.json({code:200})
            }
        }
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})
//收藏的专辑列表
router.post('/album/sublist',async(req:any,res)=>{
    try {
        const {userId} = req.user
        let {limit,offset} = req.body
        limit = limit ?? 25
        offset = offset ?? 0
        let ans = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT('id', album_info.id, 'name', album_info.name, 'artist', album_info.artists) AS data
            FROM album_info
            WHERE FIND_IN_SET(album_info.id, (SELECT album_ids FROM user_album_sublist WHERE userId = ${userId})) > 0
            LIMIT ${offset},${limit};`,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        const count = await new Promise<any>((resolve, reject) => {
            query(`SELECT length FROM  user_album_sublist WHERE userId = ${userId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0].length)
            })
        })
        ans = ans.map((it:any)=>{return JSON.parse(it.data)})
        console.log(ans,count);
        res.json({data:ans,count,more:ans.length < count})
    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:error})
    }
})

//关注取消关注用户
router.post('/follow',validationFollow,handleValidationErrors,async(req:any,res)=>{
    try {
        const {userId} = req.user
        const {id,t} = req.body
        if(userId == id){
            res.json({code:400,message:'你不能对自己操作'})
        }else{
            if(t == 1){
                let result = await new Promise<any>((resolve, reject) => {
                    query(`select * from user_follow where userId = ${userId} and followId = ${id};`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                if(result.length != 0){
                    throw new Error('已经关注');
                }else{
                    await new Promise<any>((resolve, reject) => {
                        query(`insert into user_follow values (${userId},${id})`,(err,data)=>{
                            if(err)reject(err)
                            else resolve(data)
                        })
                    })
                    res.json({code:200})
                }
            }else{
                let result = await new Promise<any>((resolve, reject) => {
                    query(`select * from user_follow where userId = ${userId} and followId = ${id};`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                if(result.length == 0){
                    throw new Error('对象不存在');
                }else{
                    await new Promise<any>((resolve, reject) => {
                        query(`DELETE FROM user_follow
                        WHERE userId = ${userId} and followId = ${id};`,(err,data)=>{
                            if(err)reject(err)
                            else resolve(data)
                        })
                    })
                    res.json({code:200})
                }
            }
        }

    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})

//我的关注
router.post('/follows',validationFollows,handleValidationErrors,async(req:any,res)=>{
    try {
        const {userId} = req.user
        let {uid ,limit,offset } = req.body
        limit = limit ?? 30
        offset = offset ?? 0
        let count = await new Promise<any>((resolve, reject) => {
            query(`SELECT count(userId) AS count FROM user_follow WHERE userId = ${uid}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0].count)
            })
        })
        let jsonResult = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_ARRAYAGG(jsonObj) AS jsonResult
            FROM (
                SELECT JSON_OBJECT(
                    'userId', uf.followId,
                    'nickname', um.nickname,
                    'createdPlaylistCount', us.createdPlaylistCount,
                    'avatarUrl', um.avatarUrl,
                    'follows', um.follows,
                    'gender', um.gender,
                    'followeds', um.followeds,
                    'signature', um.signature,
                    'eventCount', um.eventCount,
                    'followed', true
                ) AS jsonObj
                FROM user_follow uf
                JOIN user_message um ON uf.followId = um.userId
                JOIN user_subcount us ON uf.followId = us.userId
                WHERE uf.userId = ${uid}
                LIMIT ${offset},${limit}
            ) AS subquery;`,(err,data)=>{
                if(err)reject(err)
                else resolve(JSON.parse(data[0].jsonResult))
            })
        })
        let arr =  jsonResult == null?[]:jsonResult
        console.log(arr.map((it)=>{
            it.followed = true
            return it
        }));
        res.json({code:200,follow:arr,more:offset + arr.length < count})
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }

})

//用户信息
router.post('/detail',async(req:any,res)=>{
    try {
        const {userId} = req.user
        let {uid} = req.body
        let profile = await new Promise<any>((resolve, reject) => {
           query(`SELECT JSON_OBJECT('userId',userId,
           'nickname',nickname,
           'avatarUrl',avatarUrl,
           'signature', signature,
           'createTime', createTime,
           'birthday', birthday,
           'gender', gender,
           'province',province,
           'city',city,
           'followeds',followeds,
           'follows',follows,
           'eventCount',eventCount) as profile
            FROM user_message
            WHERE userId = ${uid};`,(err,data)=>{
            if(err)reject(err)
            else resolve(data[0])
           }) 
        })
        console.log(profile);
        res.json({code:200,profile:JSON.parse(profile.profile)})
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})
export default router
