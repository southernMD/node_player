 '$.event.json.playlist.creator',IF(JSON_EXTRACT(`json`, '$.event.type') = 13,(
                                        SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname, 'avatarUrl', pm.avatarUrl, 'signature', pm.signature, 'createTime', pm.createTime, 'birthday', pm.birthday, 'gender', pm.gender, 'province', pm.province, 'city', pm.city)
                                        FROM user_message pm
                                        WHERE pm.userId = CAST(JSON_EXTRACT(`json`,'$.playlist.creator.userId') AS UNSIGNED)
                                    ),JSON_EXTRACT(`json`, '$.event.json.playlist.creator')),
                '$.event.json.resource.user',IF(JSON_EXTRACT(`json`, '$.event.type') = 31,(
                                        SELECT JSON_OBJECT('userId', pm.userId, 'nickname', pm.nickname,'avatarUrl',pm.avatarUrl)
                                        FROM user_message pm
                                        WHERE pm.userId = CAST(JSON_EXTRACT(`json`,'$.event.json.resource.user.userId') AS UNSIGNED)),
                    JSON_EXTRACT(`json`, '$.event.json.resource.user')),
                '$.event.json.resource.beReplied',IF(JSON_EXTRACT(`json`, '$.event.type') = 31,
                    (IF(JSON_LENGTH(`json`,'$.event.json.resource.beReplied') > 0,
                                    JSON_ARRAY(JSON_OBJECT(
                                            'user',
                                            JSON_OBJECT(
                                                'userId',
                                                JSON_EXTRACT(`json`,'$.event.json.resource.beReplied[0].user.userId'),
                                                'nickname',
                                                (SELECT nickname FROM user_message WHERE userId = JSON_EXTRACT(`json`,'$.event.json.resource.beReplied[0].user.userId')),
                                                'avatarUrl',
                                                (SELECT avatarUrl FROM user_message WHERE userId = JSON_EXTRACT(`json`, '$.event.json.resource.beReplied[0].user.userId'))
                                            ),
                                            'content',
                                            JSON_EXTRACT(`json`,'$.event.json.resource.beReplied[0].content'),
                                            'beRepliedCommentId',
                                            JSON_EXTRACT(`json`,'$.event.json.resource.beReplied[0].beRepliedCommentId')
                                        )
                                    ),JSON_ARRAY())
                    ),JSON_EXTRACT(`json`, '$.event.json.resource.beReplied'))


                    	
	IF NEW.type = 22 THEN
		UPDATE events_info SET shareCount = shareCount + 1 WHERE
		events_info.id = CAST(JSON_EXTRACT(NEW.json, '$.event.id') AS UNSIGNED );
	END IF;