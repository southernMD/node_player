import express from 'express'
import query from '../db';
import http from 'http'
import { validationPlaylist, validationArtistSub, validationFollow, validationFollows, validationUpdate, validationAvatar } from '../handles/userHandles';
import { handleValidationErrors } from '../../utils/validationError';
import { check } from 'express-validator';
import { verifyToken, verifyTokenAllPass } from '../../utils/jwtPrase';
import multer from 'multer';
import jimp from 'jimp'
import axios from 'axios'
const router = express.Router()

router.post('/playlist', validationPlaylist, handleValidationErrors, async (req: any, res) => {
    try {
        const { userId } = req.user
        let { uid } = req.body;
        console.log(userId, uid);
        let moresql = ''
        if (uid != userId) moresql = ` WHERE privacy = '0'`
        let sql = `
        SELECT result.id, privacy, result.playCount, result.trackCount, name, createTime, description, last_tag as tags, coverImgUrl,pd.bookedCount as subscribedCount,creator
        FROM (
            SELECT p.id, p.privacy, p.playCount, p.trackCount, p.name, p.createTime, p.description, CONCAT('["', REPLACE(REPLACE(p.tags, ';', '","'), ',', ','), '"]') AS last_tag, p.coverImgUrl,(
                SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
                FROM user_message pm
                WHERE pm.userId = p.creatorId
            ) AS creator,FIND_IN_SET(p.id, (SELECT playList_ids FROM user_playlists WHERE userId = ${uid})) AS playList_position, FIND_IN_SET(p.id, (SELECT start_playList_ids FROM user_starts_playlists WHERE userId = ${uid})) AS start_position
            FROM playlists p
            JOIN user_message um ON p.creatorId = um.userId
            WHERE FIND_IN_SET(p.id, (SELECT playList_ids FROM user_playlists WHERE userId = ${uid})) > 0
                OR FIND_IN_SET(p.id, (SELECT start_playList_ids FROM user_starts_playlists WHERE userId = ${uid})) > 0
        ) AS result
        JOIN playlists_dynamic pd on result.id = pd.id
        ${moresql}
        ORDER BY CASE WHEN playList_position > 0 THEN playList_position ELSE 9999999999 END, CASE WHEN start_position > 0 THEN start_position ELSE 9999999999 END;
        `
        let playlist = await new Promise<any[]>((resolve, reject) => {
            query(sql, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
        playlist = playlist.map((item) => {
            item['creator'] = JSON.parse(item['creator'])
            item['tags'] = eval(item['tags']) == null ? [] : eval(item['tags'])
            return item
        })
        res.json({ code: 200, playlist })
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: error })

    }
})

router.post('/subcount', async (req: any, res) => {
    try {
        const { userId } = req.user
        const data = await new Promise<void>((resolve, reject) => {
            query(`SELECT subPlaylistCount, artistCount, createdPlaylistCount, albumCount FROM  user_subcount WHERE userId = ${userId}`, (err, data) => {
                if (err) reject(err)
                else resolve(data[0])
            })
        })
        res.json(Object.assign({ code: 200 }, data))
    } catch (error) {
        res.status(500).json({ code: 500, message: error })

    }
})

//收藏取消收藏歌手
router.post('/artist/sub', verifyToken, validationArtistSub, handleValidationErrors, async (req: any, res) => {
    try {
        const { userId } = req.user
        const { id, t } = req.body
        //收藏
        if (t == 1) {
            let result: any[] = await new Promise<any>((resolve, reject) => {
                query(`select * from artlist_info where id = ${id}`, (err, data) => {
                    if (err) reject(err)
                    else resolve(data)
                })
            })
            if (result.length == 0) {
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
                            const { id, name, alias, cover: picUrl, avatar: img1v1Url, albumSize, musicSize } = parsedData;

                            const modifiedData = { id, name, alias, picUrl, img1v1Url, albumSize, musicSize };

                            resolve(modifiedData);
                        });
                    });

                    req.on('error', (error) => {
                        reject(error);
                    });

                    req.end();
                })
                await new Promise<any>((resolve, reject) => {
                    const { id, name, alias, picUrl, img1v1Url, albumSize, musicSize } = ms
                    query(`INSERT INTO artlist_info (id, name, alias, picUrl, img1v1Url,albumSize,musicSize) VALUES (${id}, '${name}','${JSON.stringify(alias)}', '${picUrl}','${img1v1Url}',${albumSize},${musicSize});
                    `, (err, data) => {
                        if (err) reject(err)
                        else resolve(data)
                    })
                })
            }
            const strIds: string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_artist_sublist where userId = ${userId}`, (err, data) => {
                    console.log(data);
                    if (err) reject(err)
                    else resolve(data[0].artist_ids)
                })
            })
            const listIds = strIds == '' ? [] : strIds.split(',')
            if (listIds.includes(id + '')) {
                res.json({ code: 501 })
            } else {
                listIds.unshift(id + '')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_artist_sublist set artist_ids = '${newStrIds}',length = ${listIds.length} where userId = ${userId}`, (err, data) => {
                        if (err) reject(err)
                        else resolve()
                    })
                })
                res.json({ code: 200 })
            }
        } else {
            //取消收藏
            const strIds: string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_artist_sublist where userId = ${userId}`, (err, data) => {
                    console.log(data);
                    if (err) reject(err)
                    else resolve(data[0].artist_ids)
                })
            })
            let listIds = strIds == '' ? [] : strIds.split(',')
            console.log(listIds);
            if (!listIds.includes(id + '')) {
                res.json({ code: 501 })
            } else {
                listIds = listIds.filter(it => it != id + '')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_artist_sublist set artist_ids = '${newStrIds}',length = ${listIds.length} where userId = ${userId}`, (err, data) => {
                        if (err) reject(err)
                        else resolve(data)
                    })
                })
                res.json({ code: 200 })
            }
        }
    } catch (error) {
        res.status(500).json({ code: 500, message: error })

    }
})
//收藏的歌手列表
router.post('/artist/sublist', async (req: any, res) => {
    try {
        const { userId } = req.user
        let ans = await new Promise<any>((resolve, reject) => {
            query(`SELECT * FROM artlist_info
            WHERE (FIND_IN_SET(artlist_info.id, (SELECT artist_ids FROM user_artist_sublist WHERE userId = ${userId})) > 0)`, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
        res.json({ code: 200, data: ans, count: ans.length })
    } catch (error) {
        res.status(500).json({ code: 500, message: error })

    }
})
//收藏取消收藏专辑
router.post('/album/sub', verifyToken, validationArtistSub, handleValidationErrors, async (req: any, res) => {
    try {
        const { userId } = req.user
        const { id, t } = req.body
        //收藏
        if (t == 1) {
            let result: any[] = await new Promise<any>((resolve, reject) => {
                query(`select * from album_info where id = ${id}`, (err, data) => {
                    if (err) reject(err)
                    else resolve(data)
                })
            })
            if (result.length == 0) {
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
                            const { id, name, picUrl, size, artists } = parsedData;

                            const modifiedData = { id, name, picUrl, artists, size };

                            resolve(modifiedData);
                        });
                    });

                    req.on('error', (error) => {
                        reject(error);
                    });

                    req.end();
                })
                await new Promise<any>((resolve, reject) => {
                    const { id, name, picUrl, artists, size } = ms
                    query(`INSERT INTO album_info (id, name, picUrl, size, artists) VALUES (${id}, '${name}','${picUrl}', '${size}','${JSON.stringify(artists)}');
                    `, (err, data) => {
                        if (err) reject(err)
                        else resolve(data)
                    })
                })
            }
            const strIds: string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_album_sublist where userId = ${userId}`, (err, data) => {
                    console.log(data);
                    if (err) reject(err)
                    else resolve(data[0].album_ids)
                })
            })
            const listIds = strIds == '' ? [] : strIds.split(',')
            if (listIds.includes(id + '')) {
                res.json({ code: 501 })
            } else {
                listIds.unshift(id + '')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_album_sublist set album_ids = '${newStrIds}',length=${listIds.length} where userId = ${userId}`, (err, data) => {
                        if (err) reject(err)
                        else resolve()
                    })
                })
                res.json({ code: 200 })
            }
        } else {
            //取消收藏
            const strIds: string = await new Promise<string>((resolve, reject) => {
                query(`select * from user_album_sublist where userId = ${userId}`, (err, data) => {
                    console.log(data);
                    if (err) reject(err)
                    else resolve(data[0].album_ids)
                })
            })
            let listIds = strIds == '' ? [] : strIds.split(',')
            console.log(listIds);
            if (!listIds.includes(id + '')) {
                res.json({ code: 501 })
            } else {
                listIds = listIds.filter(it => it != id + '')
                const newStrIds = listIds.join(',')
                await new Promise<void>((resolve, reject) => {
                    query(`update user_album_sublist set album_ids = '${newStrIds}',length=${listIds.length} where userId = ${userId}`, (err, data) => {
                        if (err) reject(err)
                        else resolve(data)
                    })
                })
                res.json({ code: 200 })
            }
        }
    } catch (error) {
        res.status(500).json({ code: 500, message: error })
    }
})
//收藏的专辑列表
router.post('/album/sublist', async (req: any, res) => {
    try {
        const { userId } = req.user
        let { limit, offset } = req.body
        limit = limit ?? 25
        offset = offset ?? 0
        let ans = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT('id', album_info.id, 'name', album_info.name,'picUrl',album_info.picUrl,'size',album_info.size ,'artist', album_info.artists) AS data
            FROM album_info
            WHERE FIND_IN_SET(album_info.id, (SELECT album_ids FROM user_album_sublist WHERE userId = ${userId})) > 0
            LIMIT ${offset},${limit};`, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
        const count = await new Promise<any>((resolve, reject) => {
            query(`SELECT length FROM  user_album_sublist WHERE userId = ${userId}`, (err, data) => {
                if (err) reject(err)
                else resolve(data[0].length)
            })
        })
        ans = ans.map((it: any) => { return JSON.parse(it.data) })
        console.log(ans, count);
        res.json({ data: ans, count, more: ans.length < count, code: 200 })
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: error })
    }
})

//关注取消关注用户
router.post('/follow', verifyToken, validationFollow, handleValidationErrors, async (req: any, res) => {
    try {
        const { userId } = req.user
        const { id, t } = req.body
        if (userId == id) {
            res.json({ code: 400, message: '你不能对自己操作' })
        } else {
            if (t == 1) {
                let result = await new Promise<any>((resolve, reject) => {
                    query(`select * from user_follow where userId = ${userId} and followId = ${id};`, (err, data) => {
                        if (err) reject(err)
                        else resolve(data)
                    })
                })
                if (result.length != 0) {
                    throw new Error('已经关注');
                } else {
                    await new Promise<any>((resolve, reject) => {
                        query(`insert into user_follow values (${userId},${id})`, (err, data) => {
                            if (err) reject(err)
                            else resolve(data)
                        })
                    })
                    res.json({ code: 200 })
                }
            } else {
                let result = await new Promise<any>((resolve, reject) => {
                    query(`select * from user_follow where userId = ${userId} and followId = ${id};`, (err, data) => {
                        if (err) reject(err)
                        else resolve(data)
                    })
                })
                if (result.length == 0) {
                    throw new Error('对象不存在');
                } else {
                    await new Promise<any>((resolve, reject) => {
                        query(`DELETE FROM user_follow
                        WHERE userId = ${userId} and followId = ${id};`, (err, data) => {
                            if (err) reject(err)
                            else resolve(data)
                        })
                    })
                    res.json({ code: 200 })
                }
            }
        }

    } catch (error) {
        res.status(500).json({ code: 500, message: error })
    }
})

//用户粉丝
router.post('/follows', validationFollows, handleValidationErrors, async (req: any, res) => {
    try {
        const { userId } = req.user
        let { uid, limit, offset } = req.body
        limit = limit ?? 30
        offset = offset ?? 0
        let count = await new Promise<any>((resolve, reject) => {
            query(`SELECT count(userId) AS count FROM user_follow WHERE userId = ${uid}`, (err, data) => {
                if (err) reject(err)
                else resolve(data[0].count)
            })
        })
        let jsonResult = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_ARRAYAGG(jsonObj) AS jsonResult
            FROM (
                SELECT JSON_OBJECT(
                    'userId', uf.followId,
                    'nickname', um.nickname,
                    'playlistCount', us.createdPlaylistCount,
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
            ) AS subquery;`, (err, data) => {
                if (err) reject(err)
                else resolve(JSON.parse(data[0].jsonResult))
            })
        })
        let arr = jsonResult == null ? [] : jsonResult
        console.log(arr.map((it) => {
            it.followed = true
            return it
        }));
        res.json({ code: 200, follow: arr, more: offset + arr.length < count })
    } catch (error) {
        res.status(500).json({ code: 500, message: error })
    }

})

//用户信息
router.post('/detail', verifyTokenAllPass, async (req: any, res) => {
    try {
        const { userId } = req.user
        let { uid } = req.body
        let profile = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_OBJECT('userId',user_message.userId,
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
           'eventCount',eventCount,
            'playlistCount',(SELECT COUNT(*) FROM playlists WHERE playlists.userId = ${uid} AND (IF(${uid} <> ${userId}, privacy = '0', true)))
            ) as profile
            FROM user_message
            JOIN user_subcount ON user_message.userId = user_subcount.userId
            WHERE user_message.userId = ${uid};`, (err, data) => {
                if (err) reject(err)
                else resolve(data[0])
            })
        })
        console.log(profile);
        res.json({ code: 200, profile: JSON.parse(profile.profile) })
    } catch (error) {
        res.status(500).json({ code: 500, message: error })
    }
})
router.post('/update', verifyToken, validationUpdate, handleValidationErrors, async (req: any, res) => {
    try {
        const { userId } = req.user
        const { gender, birthday, nickname, province, city, signature } = req.body
        await new Promise<void>((resolve, reject) => {
            query(`update user_message set 
            gender = '${gender}',
            birthday = '${birthday}',
            nickname = '${nickname}',
            province = ${province},
            city = ${city},
            signature = '${signature}'
            where userId = ${userId}`, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
        res.json({ code: 200 })
    } catch (error) {
        res.status(500).json({ code: 500, message: error })
    }

})
const upload = multer();
router.post('/avatar/upload', verifyToken, validationAvatar, handleValidationErrors, upload.single('imgFile'), async (req: any, res: any) => {
    const imageFile = req.file;
    const { userId } = req.user
    let { imgSize, imgX, imgY } = req.query
    try {
        // 使用 jimp 进行图像处理
        const image = await jimp.read(imageFile.buffer);
        const imageWidth = image.bitmap.width;
        const imageHeight = image.bitmap.height;
        if (imgSize > Math.min(imageHeight, imageWidth)) imgSize = Math.min(imageHeight, imageWidth)
        // 将处理后的图像转换为 Base64 编码
        image.crop(+imgX, +imgY, +imgSize, +imgSize);
        const imageBuffer = await image.getBufferAsync(jimp.MIME_JPEG); // 获取图像的缓冲区数据
        const base64Image = imageBuffer.toString('base64');
        // console.log(validBase64Image);
        const requestData = {
            message: 'Upload image',
            content: base64Image,
            branch: 'main'
        };
        let key = await (await axios.get('https://app-update-address.glitch.me/github_token')).data
        // await image.writeAsync('./s.jpg')
        // const base64Image = await image.getBase64Async(jimp.MIME_JPEG);
        // 在控制台打印 Base64 编码
        // console.log(base64Image);
        // res.json({ success: true });
        const imgName = `${new Date().getTime()}.${imageFile.originalname.split('.')[1]}`
        const options = {
            hostname: 'api.github.com',
            path: `/repos/southernMD/images/contents/img/${imgName}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Node.js',
                Authorization: 'token ' + key,
            },
        };
        console.log(options);

        let response = await axios.put(`https://${options.hostname}${options.path}`, requestData, options)
        //   console.log(response.data.content.download_url);
        //   .then((response) => {
        //     console.log('Image uploaded to GitHub');
        //     console.log(response.data);
        //     // 返回 GitHub 图床的 URL
        const imageUrl = `https://cdn.jsdelivr.net/gh/southernMD/images@main/img/${imgName}`;
        await new Promise<any>((resolve, reject) => {
            query(`update user_message set avatarUrl = '${imageUrl}' where userId = ${userId}`, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
        res.json({ code: 200, data: { code: 200, url: imageUrl } })
    } catch (error) {
        console.error('图片处理失败:', error);
        res.status(500).json({ code: 500, error: 'Image processing failed', msg: 'error' });
    }
})
//用户粉丝
router.post('/followeds', async (req: any, res) => {
    try {
        const { userId } = req.body
        let { uid, limit, offset } = req.body
        limit = limit == undefined ? 30 : +limit
        offset = offset == undefined ? 0 : +offset
        let count = await new Promise<any>((resolve, reject) => {
            query(`SELECT count(followId) AS count FROM user_follow WHERE followId = ${uid}`, (err, data) => {
                if (err) reject(err)
                else resolve(data[0].count)
            })
        })
        let result = await new Promise<any>((resolve, reject) => {
            query(`SELECT um.userId,
                um.nickname,
                us.createdPlaylistCount as playlistCount,
                um.avatarUrl,
                um.follows,
                um.gender,
                um.followeds,
                um.signature,
                um.eventCount,
                    IF(uf.userId IS NOT NULL, true, false) AS followed
                FROM user_message um
                LEFT JOIN user_follow uf ON uf.followId = um.userId AND uf.userId = ${uid}
                JOIN user_subcount us ON um.userId = us.userId
                WHERE um.userId IN (
                    SELECT userId FROM user_follow WHERE followId = ${uid}
                )
                LIMIT ${offset},${limit}
            ;`, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
        console.log(result.map((it) => {
            it.followed = it.followed == 1 ? true : false
            return it
        }));
        res.json({ code: 200, followeds: result, more: offset + result.length < count, size: count })
    } catch (error) {

    }
})

router.post('/event',verifyTokenAllPass, async (req: any, res) => {
    try {
        let {userId} = req.user
        let { pagesize, lasttime, uid } = req.body
        pagesize = pagesize == undefined ? 20 : +pagesize
        lasttime = lasttime == undefined || lasttime == -1 ? new Date().getTime() : +lasttime
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
                                      AND ${userId} = events_like.userId
                                  ),
                                   'commentCount', commentCount,
                                   'shareCount', shareCount,
                                   'likedCount', likedCount
                                  )
                                FROM events_info
                                WHERE id =  CAST(JSON_EXTRACT(\`json\`, '$.event.id') AS UNSIGNED )
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
            WHERE ue.userId = ${uid}
            ORDER BY CAST(time AS UNSIGNED) DESC
            `, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
        // AND CAST(time AS UNSIGNED) < ${lasttime}
        //LIMIT ${pagesize}
        const len = events.length
        let flen = 0
        events = events.filter((it) => {
            if (it.showTime >= lasttime) flen++
            return it.showTime < lasttime
        })
        events = events.slice(0, pagesize).map((it) => {
            it.pics = JSON.parse(it.pics)
            it.user = JSON.parse(it.user)
            it.info = JSON.parse(it.info)
            it.info.liked = it.info.liked == 0 ? false : true
            return it
        })
        res.json({
            code: 200,
            lasttime: events[events.length - 1]?.showTime ?? 0,
            events: events,
            size: len,
            more: flen + pagesize < len ? true : false
        })
    } catch (error) {
        res.status(500).json({ code: 500, message: error })
    }
})

router.post('/record',async(req:any,res)=>{
    try {
        let {uid,type} = req.body
        if(type == 1){ //week
            const songs = await new Promise<any[]>((resolve, reject) => {
                query(`SELECT songId,num FROM scrobble_week WHERE userId = ${uid}
                ORDER BY num DESC ,CAST(updateTime AS  UNSIGNED ) ASC`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            const ids = songs.map(it=>it.songId)
            const songsDetail = (await axios.get(`http://cloud-music.pl-fe.cn/song/detail?ids=${ids.join(',')}`)).data?.songs
            let result = [] 
            for(let index = 0;index<songs.length;index++){
                result.push({
                    playCount:songs[index].num,
                    score:+(songs[index].num/songs[0].num*100).toFixed(0),
                    song:songsDetail[index]
                })
            }
            console.log(songsDetail);
            res.json({code:200,weekData:result})
        }else{
            const songs = await new Promise<any[]>((resolve, reject) => {
                query(`SELECT songId,num FROM scrobble_total WHERE userId = ${uid}
                ORDER BY num DESC ,CAST(updateTime AS  UNSIGNED ) ASC`,(err,data)=>{
                    if(err)reject(err)
                    else resolve(data)
                })
            })
            const ids = songs.map(it=>it.songId)
            const songsDetail = (await axios.get(`http://cloud-music.pl-fe.cn/song/detail?ids=${ids.join(',')}`)).data?.songs
            let result = [] 
            for(let index = 0;index<songs.length;index++){
                result.push({
                    playCount:songs[index].num,
                    score:+(songs[index].num/songs[0].num*100).toFixed(0),
                    song:songsDetail[index]
                })
            }
            console.log(songsDetail);
            res.json({code:200,allData:result})
        }
    } catch (error) {
        res.json({code:500,allData:[]})
    }
})


export default router
