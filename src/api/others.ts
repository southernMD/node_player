import express from 'express'
import query from '../db';
import { verifyToken, verifyTokenAllPass } from '../../utils/jwtPrase';
import http from 'http'
import Fuse from 'fuse.js';
import multer from 'multer';
import jimp from 'jimp'
import axios from 'axios'
import fs from 'fs'
const router = express.Router()

router.post(`/likelist`,async(req,res)=>{
    try {
        let {uid} = req.body
        const pid = await new Promise<number>((resolve, reject) => {
            query(`SELECT id from playlists where userId = ${uid} order by CAST(createTime AS UNSIGNED) ASC LIMIT 1`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0].id)
            })
        })
        let ids:string = await new Promise<any>((resolve, reject) => {
            query(`SELECT songs AS ids
            FROM playlists_songs where id = ${pid};`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0].ids)
            })
        })
        const idsArr = ids.split(',') as string[]
        const idsNumber = idsArr[0]==''?[]:idsArr.map(str=>+str)
        console.log(idsNumber,'你伽马啊');
        res.json({code:200,ids:idsNumber})
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})

router.post(`/like`,verifyToken,async(req:any,res)=>{
    try {
        const {userId} = req.user
        const {like,id} = req.body
        const pid = await new Promise<number>((resolve, reject) => {
            query(`SELECT id from playlists where userId = ${userId} order by CAST(createTime AS UNSIGNED) ASC LIMIT 1`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0].id)
            })
        })
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
        if(like){
            listIds.unshift(id+'')
            coverMusicId = id
            await new Promise<void>((resolve, reject) => {
                query(`
                    UPDATE playlists_songs
                    SET songs = '${listIds.join(',')}',
                    length = CASE WHEN songs = '' THEN 0 ELSE (LENGTH(songs) - LENGTH(REPLACE(songs, ',', '')) + 1) END
                    WHERE id = ${pid};
                `,(err,data)=>{
                    if(err)reject(err)
                    else resolve()
                })
            })
        }else{
            const ans = listIds.filter((it)=> it != id)
            const insertIds = ans.join(',')
            coverMusicId = +ans[0]
            await new Promise<void>((resolve, reject) => {
                query(`
                UPDATE playlists_songs
                SET songs = '${insertIds}',
                length = CASE WHEN songs = '' THEN 0 ELSE (LENGTH(songs) - LENGTH(REPLACE(songs, ',', '')) + 1) END
                WHERE id = ${pid};
                `,(err,data)=>{
                    if(err)reject(err)
                    else resolve()
                })
            })
        }
        if(coverMusicId){
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
                else res.json({url,code:200})
            })
        }else{
            res.json({url:'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251611198.png',code:200})
        }
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})

router.post(`/song/order/update`,verifyToken,async(req:any,res)=>{
    const {userId} = req.user
    let {pid,ids} = req.query
    console.log(pid,ids);
    ids = eval(ids)
    try {
        const creatorId = await new Promise<any>((resolve, reject) => {
            query(`select creatorId from playlists where id = ${pid}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0].creatorId)
            })
        })
        if(creatorId != userId){
            res.json({code:401,msg:'无操作权限'})
        }else{
            let data = await new Promise<void>((resolve, reject) => {
                query(`update playlists_songs set 
                songs = '${ids.toString()}',
                length = CASE WHEN songs = '' THEN 0 ELSE (LENGTH(songs) - LENGTH(REPLACE(songs, ',', '')) + 1) END
                where id = ${pid}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            console.log(data);
            res.json({code:200})
        }
    }catch(err){
        res.status(500).json({code:500,message:err})

    }
})

router.post(`/search`,verifyTokenAllPass,async(req:any,res)=>{
    try {
        let {userId} = req.user
        let {type,limit,offset,keywords} = req.body
        limit = limit == undefined ? 30: +limit
        offset = offset == undefined ? 0: +offset
        userId = userId ?? 0
        if(type == '1000'){
            //歌单
            let playlists = await new Promise<any>((resolve, reject) => {
                query(`SELECT id, userId, privacy, playCount, trackCount, name, createTime, description, CONCAT('["', REPLACE(REPLACE(p.tags, ';', '","'), ',', ','), '"]') AS tags, coverImgUrl, (
                    SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
                    FROM user_message pm
                    WHERE pm.userId = p.creatorId
                ) AS creator
                FROM playlists p
                WHERE (userId, createTime) NOT IN (
                    SELECT userId, MIN(CAST(createTime AS UNSIGNED))
                    FROM playlists
                    GROUP BY userId
                ) AND (privacy = '0' OR (privacy = '10' AND userId = ${userId}))`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            playlists = playlists.map((it:any)=>{
                it['creator'] = JSON.parse(it.creator) 
                return it
            })
            const options = {
                keys: ['name', 'creator.nickname'],
                threshold: 0.3,
            };
            const fuse = new Fuse(playlists, options);
            const result = fuse.search(keywords).map(it=>it.item);
            res.json({result:{playlists:result.slice(offset,offset + limit),playlistCount:result.length},code:200})
            console.log(playlists);
        }else if(type == '1002'){
            //用户
            const userprofiles = await new Promise<any>((resolve, reject) => {
                query(`select * from user_message`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            const options = {
                keys:[
                    {
                        name:'nickname',
                        weight:0.9
                    },
                    {
                        name:'signature',
                        weight:0.1
                    }
                ]
            }
            const fuse = new Fuse(userprofiles, options);
            const result = fuse.search(keywords).map(it=>it.item);
            res.json({result:{userprofiles:result.slice(offset,offset + limit),userprofileCount:result.length},code:200})
        }
    } catch (error) {
        res.status(500).json({code:500,message:error})
        
    }

})

router.post('/recommend/resource',verifyTokenAllPass,async(req:any,res)=>{
    try {
        let {userId} = req.user
        userId = userId ?? 0
        const sql = `SELECT id, userId, privacy, playCount, trackCount, name, createTime, description, CONCAT('["', REPLACE(REPLACE(p.tags, ';', '","'), ',', ','), '"]') AS tags, coverImgUrl as picUrl, (
            SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
            FROM user_message pm
            WHERE pm.userId = p.creatorId
        ) AS creator
        FROM playlists p
        WHERE (userId, createTime) NOT IN (
            SELECT userId, MIN(CAST(createTime AS UNSIGNED))
            FROM playlists
            GROUP BY userId
        ) AND (privacy = '0' AND userId <> ${userId})
        LIMIT 10
        `
        let recommend = await new Promise<void>((resolve, reject) => {
            query(sql,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        res.json({code:200,recommend})
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }

})

router.post('/comment',verifyToken,async(req:any,res)=>{
    try {
        const {userId} = req.user
        const {t,type,id,content,commentId,threadId} = req.body
        if(t == 1){
            let insertid = await new Promise<any>((resolve, reject) => {
                query(`INSERT INTO comment (userId, beReplied, content, ${`time`}, likedCount, type, resourceId)
                VALUES (${userId},JSON_ARRAY(),'${content}','${new Date().getTime()}',0,${type},${id}) `,(err,data)=>{
                    console.log(data);
                    if(err)reject(err)
                    else resolve(data.insertId)
                })
            })
            let comment = await new Promise<any>((resolve, reject) => {
                query(`SELECT CAST(${`time`} AS UNSIGNED) AS time,content,commentId,JSON_OBJECT(
                    'avatarUrl',avatarUrl,
                    'nickname',nickname,
                    'userId',user_message.userId
                    ) AS user
                     FROM comment
                    JOIN user_message ON comment.userId = user_message.userId
                    WHERE commentId = ${insertid}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data[0])
                })
            })
            comment.user =JSON.parse(comment.user)
            res.json({code:200,comment})
        }else if(t == 2){
            const getCommentDataSql = `SELECT
            content,
            userId
            FROM comment WHERE commentId = ${commentId}`;
            const commentData = await new Promise<any>((resolve, reject) => {
                query(getCommentDataSql,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            const rcontent =  commentData[0].content
            const Uid = commentData[0].userId;
            let insertid = await new Promise<void>((resolve, reject) => {
                query(`INSERT INTO comment (userId, beReplied, content, ${`time`}, likedCount, type, resourceId)
                VALUES (${userId},JSON_ARRAY(
                       JSON_OBJECT(
                           'content', '${rcontent}',
                           'beRepliedCommentId', ${commentId},
                           'user', JSON_OBJECT(
                               'userId', ${Uid}
                           )
                       )
                   )
               ,'${content}','${new Date().getTime()}',0,${type},${id})`,(err,data)=>{
                if(err)reject(err)
                else resolve(data.insertId)
               })
            })
            let comment = await new Promise<any>((resolve, reject) => {
                query(`SELECT CAST(${`time`} AS UNSIGNED) AS time,content,commentId,JSON_OBJECT(
                    'avatarUrl',avatarUrl,
                    'nickname',nickname,
                    'userId',user_message.userId
                    ) AS user
                    FROM comment
                    JOIN user_message ON comment.userId = user_message.userId
                    WHERE commentId = ${insertid}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data[0])
                })
            })
            comment.user = JSON.parse(comment.user)
            res.json({code:200,comment})
        }else{
            await new Promise<any>((resolve, reject) => {
                query(`DELETE FROM comment WHERE type = ${type} AND resourceId = ${id} AND commentId = ${commentId}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            await new Promise<any>((resolve, reject) => {
                query(`UPDATE comment
                SET beReplied = JSON_SET(beReplied, '$[0].content', NULL)
                WHERE JSON_EXTRACT(beReplied, '$[*].beRepliedCommentId') = JSON_ARRAY(${commentId});`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })

            res.send({code:200})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:error})
    }

    // 0: 歌曲
    // 2: 歌单
    // 3: 专辑
    // 6: 动态
    //hotComments comments total moreHot
})

router.post('/comment/playlist',verifyTokenAllPass,async(req:any,res)=>{
    try {
        let {userId} = req.user
        userId = userId == undefined?0:userId
        let {id,limit,offset} = req.body
        limit = limit == undefined?20:+limit
        offset = offset == undefined?0:+offset
        let hotComments = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT(
                'userId',um.userId,
                'nickname',nickname,
                'avatarUrl',avatarUrl
                ) AS user,IF(JSON_LENGTH(beReplied)>0,
                JSON_ARRAY(JSON_OBJECT(
                    'user',(
                    SELECT JSON_OBJECT(
                            'userId',
                            JSON_EXTRACT(comment.beReplied, '$[0].user.userId'),
                            'nickname',
                            (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId')),
                            'avatarUrl',
                            (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId'))
                    )),
                    'content',
                    JSON_EXTRACT(comment.beReplied, '$[0].content'),
                    'beRepliedCommentId',
                    JSON_EXTRACT(comment.beReplied, '$[0].beRepliedCommentId')
                )
            )
            ,beReplied) AS beReplied,content,CAST(\`time\` AS UNSIGNED) AS time,likedCount,commentId,type,
                (SELECT COUNT(*) FROM user_comment_like ucl WHERE ucl.commentId = comment.commentId AND ucl.userId = ${userId}) as liked
            FROM comment
            JOIN user_message um on comment.userId = um.userId
            WHERE resourceId = ${id} AND type = 2 AND likedCount >= 10
            ORDER BY CAST(\`time\` AS UNSIGNED) DESC;
            `,(err,data)=>{
                if(err)reject(err)
                resolve(data)
            })
        })
        let comments = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT(
                'userId',um.userId,
                'nickname',nickname,
                'avatarUrl',avatarUrl
                ) AS user,IF(JSON_LENGTH(beReplied)>0,
                JSON_ARRAY(JSON_OBJECT(
                        'user',(
                        SELECT JSON_OBJECT(
                                'userId',
                                JSON_EXTRACT(comment.beReplied, '$[0].user.userId'),
                                'nickname',
                                (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId')),
                                'avatarUrl',
                                (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId'))
                        )),
                        'content',
                        JSON_EXTRACT(comment.beReplied, '$[0].content'),
                        'beRepliedCommentId',
                        JSON_EXTRACT(comment.beReplied, '$[0].beRepliedCommentId')
                    )
                )
            ,beReplied) AS beReplied,content,CAST(\`time\` AS UNSIGNED) AS time,likedCount,commentId,type,
                (SELECT COUNT(*) FROM user_comment_like ucl WHERE ucl.commentId = comment.commentId AND ucl.userId = ${userId}) as liked
            FROM comment
            JOIN user_message um on comment.userId = um.userId
            WHERE resourceId = ${id} AND type = 2
            ORDER BY CAST(\`time\` AS UNSIGNED) DESC;
            `,(err,data)=>{
                if(err)reject(err)
                resolve(data)
            })
        })
        hotComments = hotComments.map((it:any)=>{
            it.user = JSON.parse(it.user)
            it.beReplied = JSON.parse(it.beReplied)
            it.liked = it.liked!=0?true:false
            return it
        })
        comments = comments.map((it:any)=>{
            it.user = JSON.parse(it.user)
            it.beReplied = JSON.parse(it.beReplied)
            it.liked = it.liked!=0?true:false
            return it
        })
        res.json({code:200,
            moreHot:hotComments.length>15?true:false,
            total:comments.length,
            comments:comments.slice(offset,limit+offset),
            hotComments:hotComments.slice(0,15),
            more:offset + limit < comments.length
        })
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})

router.post('/comment/music',verifyTokenAllPass,async(req:any,res)=>{
    try {
        let {userId} = req.user
        userId = userId == undefined?0:userId
        let {id,limit,offset} = req.body
        limit = limit == undefined?20:+limit
        offset = offset == undefined?0:+offset
        let hotComments = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT(
                'userId',um.userId,
                'nickname',nickname,
                'avatarUrl',avatarUrl
                ) AS user,IF(JSON_LENGTH(beReplied)>0,
                    JSON_ARRAY(JSON_OBJECT(
                        'user',(
                        SELECT JSON_OBJECT(
                                'userId',
                                JSON_EXTRACT(comment.beReplied, '$[0].user.userId'),
                                'nickname',
                                (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId')),
                                'avatarUrl',
                                (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId'))
                        )),
                        'content',
                        JSON_EXTRACT(comment.beReplied, '$[0].content'),
                        'beRepliedCommentId',
                        JSON_EXTRACT(comment.beReplied, '$[0].beRepliedCommentId')
                    )
                )
            ,beReplied) AS beReplied,content,CAST(\`time\` AS UNSIGNED) AS time,likedCount,commentId,type,
            (SELECT COUNT(*) FROM user_comment_like ucl WHERE ucl.commentId = comment.commentId AND ucl.userId = ${userId}) as liked
            FROM comment
            JOIN user_message um on comment.userId = um.userId
            WHERE resourceId = ${id} AND type = 0 AND likedCount >= 10
            ORDER BY CAST(\`time\` AS UNSIGNED) DESC;
            `,(err,data)=>{
                if(err)reject(err)
                resolve(data)
            })
        })
        let comments = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT(
                'userId',um.userId,
                'nickname',nickname,
                'avatarUrl',avatarUrl
                ) AS user,IF(JSON_LENGTH(beReplied)>0,
                        JSON_ARRAY(JSON_OBJECT(
                            'user',(
                            SELECT JSON_OBJECT(
                                    'userId',
                                    JSON_EXTRACT(comment.beReplied, '$[0].user.userId'),
                                    'nickname',
                                    (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId')),
                                    'avatarUrl',
                                    (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId'))
                            )),
                            'content',
                            JSON_EXTRACT(comment.beReplied, '$[0].content'),
                            'beRepliedCommentId',
                            JSON_EXTRACT(comment.beReplied, '$[0].beRepliedCommentId')
                        )
                    )
                ,beReplied) AS beReplied,content,CAST(\`time\` AS UNSIGNED) AS time,likedCount,commentId,type,
                (SELECT COUNT(*) FROM user_comment_like ucl WHERE ucl.commentId = comment.commentId AND ucl.userId = ${userId}) as liked
            FROM comment
            JOIN user_message um on comment.userId = um.userId
            WHERE resourceId = ${id} AND type = 0 
            ORDER BY CAST(\`time\` AS UNSIGNED) DESC;
            `,(err,data)=>{
                if(err)reject(err)
                resolve(data)
            })
        })
        hotComments = hotComments.map((it:any)=>{
            it.user = JSON.parse(it.user)
            it.beReplied = JSON.parse(it.beReplied)
            it.liked = it.liked!=0?true:false
            return it
        })
        comments = comments.map((it:any)=>{
            it.user = JSON.parse(it.user)
            it.beReplied = JSON.parse(it.beReplied)
            it.liked = it.liked!=0?true:false
            return it
        })
        res.json({code:200,
            moreHot:hotComments.length>15?true:false,
            total:comments.length,
            comments:comments.slice(offset,limit+offset),
            hotComments:hotComments.slice(0,15),
            more:offset + limit < comments.length
        })
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})

router.post('/comment/like',verifyToken,async(req:any,res)=>{
    try {
        let {userId} = req.user
        let {id,cid,t,type} = req.body
        if(t == 1){
            let Arr =  await new Promise<any>((resolve, reject) => {
             query(`SELECT COUNT(*) as size FROM user_comment_like WHERE userId = ${userId} AND commentId = ${cid};`,(err,data)=>{
                console.log(data);
                if(err)reject(err)
                else resolve(data[0].size)
             })
            })
            if(Arr != 0){
                res.send({code:400})
            }else{
                await new Promise<void>((resolve, reject) => {
                    query(`INSERT INTO user_comment_like (userId,commentId)  VALUES (${userId},${cid})`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                res.json({code:200})
            }
        }else{
            let Arr =  await new Promise<any>((resolve, reject) => {
                query(`SELECT COUNT(*) as size FROM user_comment_like WHERE userId = ${userId} AND commentId = ${cid};`,(err,data)=>{
                   if(err)reject(err)
                   else resolve(data[0].size)
                })
            })
            if(Arr == 0){
                res.send({code:400})
            }else{
                await new Promise<void>((resolve, reject) => {
                    query(`DELETE FROM user_comment_like WHERE userId = ${userId} AND commentId = ${cid};`,(err,data)=>{
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

router.post('/comment/floor',verifyTokenAllPass,async(req:any,res)=>{
    try {
        let {userId} = req.user
        userId = userId == undefined?0:userId
        let {parentCommentId,id,type} = req.body
        let ownerComment = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT(
                'userId',um.userId,
                'nickname',nickname,
                'avatarUrl',avatarUrl
                ) AS user,IF(JSON_LENGTH(beReplied)>0,
                    JSON_ARRAY(JSON_OBJECT(
                        'user',(
                        SELECT JSON_OBJECT(
                                'userId',
                                JSON_EXTRACT(comment.beReplied, '$[0].user.userId'),
                                'nickname',
                                (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId')),
                                'avatarUrl',
                                (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId'))
                        )),
                        'content',
                        JSON_EXTRACT(comment.beReplied, '$[0].content'),
                        'beRepliedCommentId',
                        JSON_EXTRACT(comment.beReplied, '$[0].beRepliedCommentId')
                    )
                )
            ,beReplied) AS beReplied,content,CAST(\`time\` AS UNSIGNED) AS time,likedCount,commentId,type,
                (SELECT COUNT(*) FROM user_comment_like ucl WHERE ucl.commentId = comment.commentId AND ucl.userId = ${userId}) as liked
            FROM comment
            JOIN user_message um on comment.userId = um.userId
            WHERE resourceId = ${id} AND type = ${type} AND commentId = ${parentCommentId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        ownerComment = Object.assign(ownerComment,{
            user: JSON.parse(ownerComment.user),
            beReplied: JSON.parse(ownerComment.beReplied),
            liked:ownerComment.liked!=0?true:false
        })
        res.json({code:200,data:{ownerComment}})
    } catch (error) {
        res.status(500).json({code:500,message:error})
        
    }
})
const upload = multer();
router.post('/share/resource',verifyToken,upload.array('files'),async(req:any,res)=>{
    try {
        const files = req.files;
        console.log(files);
        const mp = new Map([
            ['noresource',35],
            ['song',18],
            ['artist',36],
            ['album',19],
            ['playlist',13],
            ['comment',31]
        ])
        let {userId} = req.user
        let {id,type,msg} = req.body
        console.log(req.body);
        let typeNumber = mp.get(type)
        let hws:{height:number,width:number}[] = [] as any
        let response = await Promise.all(files.map((item:any,index:number)=>{
            return new Promise<any>(async(resolve, reject) => {
                const origin = await jimp.read(item.buffer);
                const square = await jimp.read(item.buffer)
                const imageWidth = origin.bitmap.width;
                const imageHeight = origin.bitmap.height;
                const size = Math.min(imageWidth,imageHeight);
                let imgX = 0;
                let imgY = 0;
                if(imageWidth >= imageHeight){
                    imgX = (imageWidth - imageHeight) / 2
                }else{
                    imgY = (imageHeight - imageWidth) / 2
                }
                hws.push({height:imageHeight,width:imageWidth})
                square.crop(+imgX, +imgY, size, size);
                const imageBufferSquare = await square.getBufferAsync(jimp.MIME_JPEG); // 获取图像的缓冲区数据
                const base64ImageSquare = imageBufferSquare.toString('base64'); 
                const imageBufferOrigin = await origin.getBufferAsync(jimp.MIME_JPEG); // 获取图像的缓冲区数据
                const base64ImageOrigin = imageBufferOrigin.toString('base64'); 
                let key = await (await axios.get('https://app-update-address.glitch.me/github_token')).data
                let q1 = await new Promise<any>(async(resolve, reject) => {
                    const options = {
                        hostname: 'api.github.com',
                        path: `/repos/southernMD/images/contents/img/${'sq'+item.originalname}`,
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': 'Node.js',
                            Authorization: 'token ' + key,
                        },
                    };
                    const requestData = {
                        message: 'Upload image',
                        content: base64ImageSquare,
                        branch: 'main'
                    };
                    let response = (await axios.put(`https://${options.hostname}${options.path}`, requestData, options)).data
                    resolve(response.content.name)
                })
                let q2 = await new Promise<any>(async(resolve, reject) => {
                    const options = {
                        hostname: 'api.github.com',
                        path: `/repos/southernMD/images/contents/img/${'or'+item.originalname}`,
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': 'Node.js',
                            Authorization: 'token ' + key,
                        },
                    };
                    const requestData = {
                        message: 'Upload image',
                        content: base64ImageOrigin,
                        branch: 'main'
                    };
                    let response = (await axios.put(`https://${options.hostname}${options.path}`, requestData, options)).data
                    resolve(response.content.name)
                })
                resolve([q1,q2])
            })
        }))
        let pics = response.map((item,index)=>{
            return {squareUrl:`https://cdn.jsdelivr.net/gh/southernMD/images@main/img/${item[0]}` ,originUrl:`https://cdn.jsdelivr.net/gh/southernMD/images@main/img/${item[1]}`,height:hws[index].height,width:hws[index].width}
        })
        let json:any
        if(typeNumber == 18){ //单曲
            let response = await new Promise<any>((resolve, reject) => {
                query(`SELECT * FROM song_info WHERE id = ${id}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            if(response.length == 0){
                let songDetail = (await axios.get(`http://cloud-music.pl-fe.cn/song/detail?ids=${id}`)).data.songs[0]
                await new Promise<any>((resolve, reject) => {
                    query(`INSERT INTO song_info (${`name`},id,artists,album,alias) 
                    VALUES ('${songDetail.name}',${id},'${JSON.stringify(songDetail.ar)}','${JSON.stringify(songDetail.al)}','${JSON.stringify(songDetail.alia)}')`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                json = JSON.stringify({
                    msg:msg,
                    song:{
                        id:id,
                        name:songDetail.name,
                        artists:songDetail.ar,
                        album:songDetail.al,
                        alias:songDetail.alia
                    }})
            }else{
                const t = Object.assign(response[0],{album:JSON.parse(response[0].album),artists:JSON.parse(response[0].artists),alias:JSON.parse(response[0].alias)}) 
                json = JSON.stringify({
                    msg,
                    song:t
                })
            }
            console.log(json);
            console.log(pics);
        }else if(typeNumber == 35){
            json = JSON.stringify({
                msg,
                "title":null,"soundeffectsInfo":null
            })
        }else if(typeNumber == 19){
            let response = await new Promise<any>((resolve, reject) => {
                query(`SELECT * FROM album_info WHERE id = ${id}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            if(response.length == 0){
                let albumDetail:any = (await axios.get(`http://cloud-music.pl-fe.cn/album?id=${id}`)).data.album
                const {name, picUrl, artists,size} = albumDetail
                await new Promise<any>((resolve, reject) => {
                    query(`INSERT INTO album_info (id, name, picUrl, size, artists) VALUES (${id}, '${name}','${picUrl}', '${size}','${JSON.stringify(artists)}');
                    `,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                json = JSON.stringify({msg,album:{
                    id,name,picUrl,artists
                }})
            }else{
                json = JSON.stringify({msg,album:{
                    id,
                    name:response[0].name,
                    picUrl:response[0].picUrl,
                    artists:JSON.parse(response[0].artists)
                }})
            }
        }else if(typeNumber == 13){
            let response = await new Promise<any>((resolve, reject) => {
                query(`SELECT id, userId, privacy, playCount, trackCount, name, createTime, description, tags, coverImgUrl, \`set\`,(
                    SELECT JSON_OBJECT('userId',pm.userId)
                    FROM user_message pm
                    WHERE pm.userId = p.creatorId
                    ) AS creator
                    FROM playlists p
                    WHERE id = ${id};`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            json = JSON.stringify({
                msg,
                playlist:{
                    id,
                    name:response[0].name,
                    coverImgUrl:response[0].coverImgUrl,
                    creator:JSON.parse(response[0].creator)
                }
            })
        }else if(typeNumber == 31){
            let comment = await new Promise<any>((resolve, reject) => {
                query(`select (SELECT JSON_OBJECT('userId', pm.userId)
                FROM user_message pm
                WHERE pm.userId = comment.userId
                ) AS user,
                       beReplied,
                       content,
                       commentId,
                       resourceId
                from comment where commentId = ${id}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data[0])
                })
            })
            let resourceId = comment.resourceId
            let resource = await new Promise<any>((resolve, reject) => {
                query(`select * from song_info where id = ${resourceId}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            if(resource.length == 0){
                let songDetail = (await axios.get(`http://cloud-music.pl-fe.cn/song/detail?ids=${resourceId}`)).data.songs[0]
                await new Promise<any>((resolve, reject) => {
                    query(`INSERT INTO song_info (${`name`},id,artists,album,alias) 
                    VALUES ('${songDetail.name}',${resourceId},'${JSON.stringify(songDetail.ar)}','${JSON.stringify(songDetail.al)}','${JSON.stringify(songDetail.alia)}')`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                console.log(songDetail.ar);
                console.log(songDetail);
                json = JSON.stringify({
                    msg,
                    resource:{
                        beReplied:JSON.parse(comment.beReplied),
                        commentId:comment.commentId,
                        content:comment.content,
                        user:JSON.parse(comment.user),
                        resourceJson:{id:songDetail.id},
                        resourceName:`来自单曲 ${songDetail.name} - ${songDetail.ar.map(it=>it.name).join('/')}`
                    }
                })
            }else{
                json = JSON.stringify({
                    msg,
                    resource:{
                        beReplied:JSON.parse(comment.beReplied),
                        commentId:comment.commentId,
                        content:comment.content,
                        user:JSON.parse(comment.user),
                        resourceJson:{id:resource[0].id},
                        resourceName:`来自单曲 ${resource[0].name} - ${JSON.parse(resource[0].artists).map(it=>it.name).join('/')}`
                    }
                })
            }
        }else if(typeNumber == 36){
            let response = await new Promise<any>((resolve, reject) => {
                query(`SELECT * FROM artlist_info WHERE id = ${id}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            if(response.length == 0){
                let artistDetail = (await axios.get(`http://cloud-music.pl-fe.cn/artist/detail?id=${id}`)).data.data.artist
                console.log(artistDetail);
                const { name, alias, cover: picUrl, avatar: img1v1Url,albumSize,musicSize } = artistDetail
                await new Promise<any>((resolve, reject) => {
                    query(`INSERT INTO artlist_info (id, name, alias, picUrl, img1v1Url,albumSize,musicSize) 
                    VALUES 
                    (${id}, '${name}','${JSON.stringify(alias)}', '${picUrl}','${img1v1Url}',${albumSize},${musicSize});
                    `,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                json = JSON.stringify({msg,resource:{
                    id, name, alias:JSON.parse(alias), picUrl, img1v1Url,albumSize,musicSize
                }})
            }else{
                json = JSON.stringify({msg,resource:{
                    id,
                    name:response[0].name, 
                    alias:JSON.parse(response[0].alias), 
                    picUrl:response[0].picUrl,
                    img1v1Url:response[0].img1v1Url,
                    albumSize:response[0].albumSize,
                    musicSize:response[0].musicSize,
                }})
            }
        }
        console.log(json);
        let insertId = await new Promise<void>((resolve, reject) => {
            query(`INSERT INTO user_events (userId, pics, type, \`time\`, \`json\`) 
            VALUES 
            (${userId},'${JSON.stringify(pics)}',${typeNumber},'${new Date().getTime()}','${json}') `,(err,data)=>{
                if(err)reject(err)
                else resolve(data.insertId)
            })
        })
        console.log(pics,'sss');
        // console.log(mp.get(type));
        // fs.writeFileSync('./x.txt',JSON.stringify(response))
        // console.log(req.body,576);
        let event = await new Promise<any>((resolve, reject) => {
            query(`SELECT ue.id,ue.id as threadId,pics,type,CAST(time AS UNSIGNED ) showTime,
            \`json\`,JSON_OBJECT(
                'userId',um.userId,
                'nickname',nickname,
                'avatarUrl',avatarUrl
            ) AS user,
            JSON_OBJECT(
            'liked',(SELECT COUNT(*) FROM events_like
            WHERE ue.id = events_like.id
            AND ${userId} = events_like.userId
            ),
            'commentCount',ei.commentCount,
            'shareCount',ei.shareCount,
            'likedCount',ei.likedCount
            ) AS info
            FROM user_events ue
            JOIN user_message um on ue.userId = um.userId
            JOIN events_info ei on ue.id = ei.id
            WHERE ue.id = ${insertId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        event = Object.assign(event,{user:JSON.parse(event.user),pics:JSON.parse(event.pics),info:JSON.parse(event.info)})
        res.json({code:200,event})
    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:error})
    }
})

router.post('/event',verifyToken,async(req:any,res:any)=>{
    try {
        let {userId} = req.user
        let {pagesize,lasttime} = req.body
        pagesize = pagesize == undefined?20:+pagesize
        lasttime = lasttime == undefined || lasttime == -1?new Date().getTime():+lasttime
        let events = await new Promise<any[]>((resolve, reject) => {
            query(`SELECT
            ue.id,ue.id as threadId,pics,type,CAST(time AS UNSIGNED ) showTime,
             (CASE
                 WHEN ue.type = 22 THEN
                     JSON_SET((CASE WHEN (JSON_EXTRACT(\`json\`, '$.event.type') = 13) THEN
                          JSON_SET(\`json\`,'$.event.json.playlist.creator',(
                             SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
                             FROM user_message pm
                             WHERE pm.userId = JSON_EXTRACT(\`json\`,'$.event.json.playlist.creator.userId')
                         ))
                         WHEN JSON_EXTRACT(\`json\`, '$.event.type') = 31 THEN
                             JSON_SET(\`json\`,'$.event.json.resource.user',(
                             SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname,'avatarUrl',pm.avatarUrl)
                             FROM user_message pm
                             WHERE pm.userId = CAST(JSON_EXTRACT(\`json\`,'$.event.json.resource.user.userId') AS UNSIGNED)),
                                 '$.event.json.resource.beReplied',
                                 IF(JSON_LENGTH(\`json\`,'$.event.json.resource.beReplied') > 0,
                                         JSON_ARRAY(JSON_OBJECT(
                                         'user',
                                         JSON_OBJECT(
                                             'userId',
                                             JSON_EXTRACT(\`json\`,'$.event.json.resource.beReplied[0].user.userId'),
                                             'nickname',
                                             (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(\`json\`,'$.event.json.resource.beReplied[0].user.userId')),
                                             'avatarUrl',
                                             (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(\`json\`, '$.event.json.resource.beReplied[0].user.userId'))
                                         ),
                                         'content',
                                         JSON_EXTRACT(\`json\`,'$.event.json.resource.beReplied[0].content'),
                                         'beRepliedCommentId',
                                         JSON_EXTRACT(\`json\`,'$.event.json.resource.beReplied[0].beRepliedCommentId')
                                     )
                                 ),JSON_ARRAY()))
                            ELSE \`json\`
                     END), '$.event.info', (
                                SELECT JSON_OBJECT(
                                  'liked',(SELECT COUNT(*) FROM events_like
                                      WHERE CAST(JSON_EXTRACT(\`json\`, '$.event.id') AS UNSIGNED ) = events_like.id
                                      AND ${userId}= events_like.userId
                                  ),
                                   'commentCount', commentCount,
                                   'shareCount', shareCount,
                                   'likedCount', likedCount
                                  )
                                FROM events_info
                                WHERE id = CAST(JSON_EXTRACT(\`json\`, '$.event.id') AS UNSIGNED )
                     ),'$.event.user',(
                              SELECT JSON_OBJECT(
                                  'userId',userId,
                                  'nickname',nickname,
                                  'avatarUrl',avatarUrl
                              )
                              FROM user_message
                              WHERE user_message.userId = CAST(JSON_EXTRACT(\`json\`,'$.event.user.userId') AS UNSIGNED)
                          )
                    )
                 WHEN ue.type = 13 THEN
                     JSON_SET(\`json\`,'$.playlist.creator',(
                         SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
                         FROM user_message pm
                         WHERE pm.userId = CAST(JSON_EXTRACT(\`json\`,'$.playlist.creator.userId') AS UNSIGNED)
                         ))
                 WHEN ue.type = 31 THEN
                     JSON_SET(\`json\`,'$.resource.user',(
                         SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname,'avatarUrl',pm.avatarUrl)
                         FROM user_message pm
                         WHERE pm.userId = CAST(JSON_EXTRACT(\`json\`,'$.resource.user.userId') AS UNSIGNED)),
                         '$.resource.beReplied',IF(JSON_LENGTH(\`json\`,'$.resource.beReplied') > 0,
                                         JSON_ARRAY(
                         JSON_OBJECT(
                             'user',
                             JSON_OBJECT(
                                 'userId',
                                 JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].user.userId'),
                                 'nickname',
                                 (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].user.userId')),
                                 'avatarUrl',
                                 (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(\`json\`, '$.resource.beReplied[0].user.userId'))
                             ),
                             'content',
                             JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].content'),
                             'beRepliedCommentId',
                             JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].beRepliedCommentId')
                         )
                     ),JSON_ARRAY()))
                 ELSE \`json\`
             END) AS \`json\`,
             JSON_OBJECT(
              'userId',um.userId,
              'nickname',nickname,
              'avatarUrl',avatarUrl
             )      AS user,
             JSON_OBJECT(
             'liked',(SELECT COUNT(*) FROM events_like
             WHERE ue.id = events_like.id
             AND ${userId} = events_like.userId
             ),
             'commentCount',ei.commentCount,
             'shareCount',ei.shareCount,
             'likedCount',ei.likedCount
             ) AS info
             FROM user_events ue
             JOIN user_message um on ue.userId = um.userId
             JOIN events_info ei on ue.id = ei.id
             WHERE ue.userId IN(
             SELECT followId
             FROM user_follow uf
             WHERE uf.userId = ${userId}
             UNION
             SELECT ${userId} as followId)
             AND CAST(time AS UNSIGNED) < ${lasttime}
             ORDER BY CAST(time AS UNSIGNED) DESC
             LIMIT ${pagesize}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        events = events.map((it)=>{
            it.pics = JSON.parse(it.pics)
            it.user = JSON.parse(it.user)
            it.info = JSON.parse(it.info)
            it.info.liked = it.info.liked== 0?false:true
            return it
        })
        res.json({code:200,lasttime:events[events.length - 1]?.showTime ?? 0,event:events})
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})

router.post('/event/del',verifyToken,async(req:any,res:any)=>{
    try {
        let {userId} = req.user
        let {evId} = req.body
        await new Promise<void>((resolve, reject) => {
            query(`DELETE FROM user_events WHERE id = ${evId} and userId = ${userId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        await new Promise<void>((resolve, reject) => {
            query(`UPDATE user_events SET \`json\` = JSON_SET(\`json\`,'$.event',NULL)
            WHERE type = 22 AND CAST(JSON_EXTRACT(\`json\`,'$.event.id') AS UNSIGNED ) = ${evId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        res.json({code:200})
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})
router.post('/resource/like',verifyToken,async(req:any,res)=>{
    try {
        let {userId} = req.user
        let {id,t} = req.body
        const order = await new Promise<any[]>((resolve, reject) => {
            query(`SELECT * FROM events_like WHERE userId = ${userId} AND id = ${id}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data)
            })
        })
        console.log(order);
        if(t == 1){
            if(order.length != 0){
                res.json({code:401})
            }else{
                await new Promise<any>((resolve, reject) => {
                    query(`INSERT INTO events_like (id,userId) VALUES (${id},${userId})`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                res.json({code:200})
            }
        }else{
            if(order.length == 0){
                res.json({code:401})
            }else{
                await new Promise<any>((resolve, reject) => {
                    query(`DELETE FROM events_like WHERE userId = ${userId} AND id = ${id}`,(err,data)=>{
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


router.post('/event/forward',verifyToken,async(req:any,res)=>{
    try {
        let {userId} = req.user
        let {uid ,evId,forwards} = req.body
        let event = await new Promise<any>((resolve, reject) => {
            query(`SELECT ue.id,ue.id as threadId,pics,type,CAST(time AS UNSIGNED ) showTime,
            \`json\`,JSON_OBJECT(
                'userId',ue.userId
            ) AS user
            FROM user_events ue
            WHERE ue.userId = ${uid} AND ue.id = ${evId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        await new Promise<any>((resolve, reject) => {
            query(`
                UPDATE events_info SET shareCount = shareCount + 1 WHERE
                events_info.id = ${evId};
            `,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        while(event.type == 22){
            let oldId = +JSON.parse(event.json).event.id
            event = await new Promise<any>((resolve, reject) => {
                query(`SELECT ue.id,ue.id as threadId,pics,type,CAST(time AS UNSIGNED ) showTime,
                \`json\`,JSON_OBJECT(
                    'userId',ue.userId
                ) AS user
                FROM user_events ue
                WHERE ue.id = ${oldId}`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data[0])
                })
            })
        }
        event = Object.assign(event,{
            pics:JSON.parse(event.pics),
            json:JSON.parse(event.json),
            user:JSON.parse(event.user)
        })
        event = JSON.stringify({msg:forwards,event})
        let insertId = await new Promise<void>((resolve, reject) => {
            query(`INSERT INTO user_events (userId, pics, type, \`time\`, \`json\`) 
            VALUES 
            (${userId},'[]',22,'${new Date().getTime()}','${event}') `,(err,data)=>{
                if(err)reject(err)
                else resolve(data.insertId)
            })
        })
        let ev = await new Promise<any>((resolve, reject) => {
            query(`SELECT ue.id,ue.id as threadId,pics,type,CAST(time AS UNSIGNED ) showTime,
             (CASE
                 WHEN ue.type = 13 THEN
                     JSON_SET(\`json\`,'$.playlist.creator',(
                         SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
                         FROM user_message pm
                         WHERE pm.userId = CAST(JSON_EXTRACT(\`json\`,'$.playlist.creator.userId') AS UNSIGNED)
                         ))
                 WHEN ue.type = 31 THEN
                     JSON_SET(\`json\`,'$.resource.user',(
                         SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname,'avatarUrl',pm.avatarUrl)
                         FROM user_message pm
                         WHERE pm.userId = CAST(JSON_EXTRACT(\`json\`,'$.resource.user.userId') AS UNSIGNED)),
                         '$.resource.beReplied',IF(JSON_LENGTH(\`json\`,'$.resource.beReplied') > 0,
                                         JSON_ARRAY(
                         JSON_OBJECT(
                             'user',
                             JSON_OBJECT(
                                 'userId',
                                 JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].user.userId'),
                                 'nickname',
                                 (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].user.userId')),
                                 'avatarUrl',
                                 (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(\`json\`, '$.resource.beReplied[0].user.userId'))
                             ),
                             'content',
                             JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].content'),
                             'beRepliedCommentId',
                             JSON_EXTRACT(\`json\`,'$.resource.beReplied[0].beRepliedCommentId')
                         )
                     ),JSON_ARRAY()))
                 ELSE \`json\`
             END) AS \`json\`,
             JSON_OBJECT(
              'userId',um.userId,
              'nickname',nickname,
              'avatarUrl',avatarUrl
             )      AS user,
             JSON_OBJECT(
             'liked',(SELECT COUNT(*) FROM events_like
             WHERE ue.id = events_like.id
             AND ${userId} = events_like.userId
             ),
             'commentCount',ei.commentCount,
             'shareCount',ei.shareCount,
             'likedCount',ei.likedCount
             ) AS info
            FROM user_events ue
            JOIN user_message um on ue.userId = um.userId
            JOIN events_info ei on ue.id = ei.id
            WHERE ue.id = ${insertId}`,(err,data)=>{
                if(err)reject(err)
                else resolve(data[0])
            })
        })
        ev = Object.assign(ev,{
            pics:JSON.parse(ev.pics),
            user:JSON.parse(ev.user),
            info:JSON.parse(ev.info)
        })
        res.json({code:200,event:ev})
    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:error})
    }

})

//动态评论
router.post('/comment/event',verifyTokenAllPass,async(req:any,res)=>{
    let {userId} = req.user
    userId = userId == undefined?0:userId
    let {threadId,limit,offset} = req.body
    limit = limit == undefined?20:+limit
    offset = offset == undefined?0:+offset
    let hotComments = await new Promise<any>((resolve, reject) => {
        query(`SELECT JSON_OBJECT(
            'userId',um.userId,
            'nickname',nickname,
            'avatarUrl',avatarUrl
            ) AS user,IF(JSON_LENGTH(beReplied)>0,
                JSON_ARRAY(JSON_OBJECT(
                    'user',(
                    SELECT JSON_OBJECT(
                            'userId',
                            JSON_EXTRACT(comment.beReplied, '$[0].user.userId'),
                            'nickname',
                            (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId')),
                            'avatarUrl',
                            (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId'))
                    )),
                    'content',
                    JSON_EXTRACT(comment.beReplied, '$[0].content'),
                    'beRepliedCommentId',
                    JSON_EXTRACT(comment.beReplied, '$[0].beRepliedCommentId')
                )
            )
        ,beReplied) AS beReplied,content,CAST(\`time\` AS UNSIGNED) AS time,likedCount,commentId,type,
        (SELECT COUNT(*) FROM user_comment_like ucl WHERE ucl.commentId = comment.commentId AND ucl.userId = ${userId}) as liked
        FROM comment
        JOIN user_message um on comment.userId = um.userId
        WHERE resourceId = ${threadId} AND type = 6 AND likedCount >= 10
        ORDER BY CAST(\`time\` AS UNSIGNED) DESC;
        `,(err,data)=>{
            if(err)reject(err)
            resolve(data)
        })
    })
    let comments = await new Promise<any>((resolve, reject) => {
        query(`SELECT JSON_OBJECT(
            'userId',um.userId,
            'nickname',nickname,
            'avatarUrl',avatarUrl
            ) AS user,IF(JSON_LENGTH(beReplied)>0,
                    JSON_ARRAY(JSON_OBJECT(
                        'user',(
                        SELECT JSON_OBJECT(
                                'userId',
                                JSON_EXTRACT(comment.beReplied, '$[0].user.userId'),
                                'nickname',
                                (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId')),
                                'avatarUrl',
                                (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(comment.beReplied, '$[0].user.userId'))
                        )),
                        'content',
                        JSON_EXTRACT(comment.beReplied, '$[0].content'),
                        'beRepliedCommentId',
                        JSON_EXTRACT(comment.beReplied, '$[0].beRepliedCommentId')
                    )
                )
            ,beReplied) AS beReplied,content,CAST(\`time\` AS UNSIGNED) AS time,likedCount,commentId,type,
            (SELECT COUNT(*) FROM user_comment_like ucl WHERE ucl.commentId = comment.commentId AND ucl.userId = ${userId}) as liked
        FROM comment
        JOIN user_message um on comment.userId = um.userId
        WHERE resourceId = ${threadId} AND type = 6 
        ORDER BY CAST(\`time\` AS UNSIGNED) DESC;
        `,(err,data)=>{
            if(err)reject(err)
            resolve(data)
        })
    })
    hotComments = hotComments.map((it:any)=>{
        it.user = JSON.parse(it.user)
        it.beReplied = JSON.parse(it.beReplied)
        it.liked = it.liked!=0?true:false
        return it
    })
    comments = comments.map((it:any)=>{
        it.user = JSON.parse(it.user)
        it.beReplied = JSON.parse(it.beReplied)
        it.liked = it.liked!=0?true:false
        return it
    })
    res.json({code:200,
        moreHot:hotComments.length>15?true:false,
        total:comments.length,
        comments:comments.slice(offset,limit+offset),
        hotComments:hotComments.slice(0,15),
        more:offset + limit < comments.length
    })
})

//听歌打卡
const userPlaybackMap:Map<any,Map<any,{insertTime:number,count:number}>> = new Map()
function playSong(userId:any, songId:any):boolean {
    const currentTime = Date.now(); // 获取当前时间
  
    // 检查用户的播放记录是否存在
    if (userPlaybackMap.has(userId)) {
      const userSongsMap = userPlaybackMap.get(userId);
  
      // 检查用户对于当前 songId 的记录是否存在
      if (userSongsMap!.has(songId)) {
        const playbackData = userSongsMap!.get(songId);
  
        // 检查是否在第一次插入的 5 分钟内，并且判定次数没有超过限制
        if (currentTime - playbackData!.insertTime <= 5 * 60 * 1000 && playbackData!.count < 3) {
          // 进行判定操作
          console.log(`Perform judgment for user ${userId} and song ${songId}`);
  
          // 更新判定次数
          playbackData!.count++;
          userSongsMap!.set(songId, playbackData!);
          return true
        } else if(currentTime - playbackData!.insertTime > 5 * 60 * 1000){
          // 超过限制或超过 5 分钟，重置判定次数
          playbackData!.insertTime = currentTime;
          playbackData!.count = 1;
          userSongsMap!.set(songId, playbackData!);
          console.log(`Perform initial judgment after 5 minutes for user ${userId} and song ${songId}`);
          return true
        }
        return false
      } else {
        // 用户对于当前 songId 的记录不存在，添加一次判定
        const playbackData = {
          insertTime: currentTime,
          count: 1
        };
  
        userSongsMap!.set(songId, playbackData);
        console.log(`Perform initial judgment for user ${userId} and song ${songId}`);
        return true
      }
    } else {
      // 用户的播放记录不存在，创建用户的播放记录 Map
      const userSongsMap = new Map();
  
      // 添加用户对于当前 songId 的判定记录
      const playbackData = {
        insertTime: currentTime,
        count: 1
      };
  
      userSongsMap.set(songId, playbackData);
      userPlaybackMap.set(userId, userSongsMap);
      console.log(`Perform initial judgment for user ${userId} and song ${songId}`);
      return true
    }
}
router.post('/scrobble',verifyTokenAllPass,async(req:any,res)=>{
    try {
        let {userId} = req.user
        let {id,sourceid,time} = req.body 
        console.log(id,sourceid,time);
        userId = userId ?? 0
        if(isFinite(time) && !isNaN(time) && time * 100 >= 60 && userId != 0){
            if(playSong(userId,id)){
                let r1 = await new Promise<any>((resolve, reject) => {
                    query(`select * from scrobble_week where songId = ${id} AND userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                if(r1.length == 0){
                    await new Promise<any>((resolve, reject) => {
                        query(`INSERT INTO scrobble_week (userId, songId, num,updateTime) VALUES (${userId},${id},1,${Date.now()})`,(err,data)=>{
                            if(err)reject(err)
                            else resolve(data)
                        })
                    })
                }else{
                    await new Promise<any>((resolve, reject) => {
                        query(`UPDATE scrobble_week SET num = num + 1
                        WHERE  userId = ${userId} AND songId = ${id}`,(err,data)=>{
                            if(err)reject(err)
                            else resolve(data)
                        })
                    })
                }
                let r2 = await new Promise<any>((resolve, reject) => {
                    query(`select * from scrobble_total where songId = ${id} AND userId = ${userId}`,(err,data)=>{
                        if(err)reject(err)
                        else resolve(data)
                    })
                })
                if(r2.length == 0){
                    await new Promise<any>((resolve, reject) => {
                        query(`INSERT INTO scrobble_total (userId, songId, num,updateTime) VALUES (${userId},${id},1,${Date.now()})`,(err,data)=>{
                            if(err)reject(err)
                            else resolve(data)
                        })
                    })
                }else{
                    await new Promise<any>((resolve, reject) => {
                        query(`UPDATE scrobble_total SET num = num + 1
                        WHERE  userId = ${userId} AND songId = ${id}`,(err,data)=>{
                            if(err)reject(err)
                            else resolve(data)
                        })
                    })
                }
                query(`UPDATE playlists_dynamic SET playCount = playCount + 1 WHERE id = ${sourceid}`,(err,data)=>{})
            }
        }
        res.json({code:200})
    } catch (error) {
        console.log(error);
        res.json({code:200})
    }
})
export default router

//noresource 35 
//song 18 
//album 19
//playlist 13  creator
//comment 31 user
// 36