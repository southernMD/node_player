import express,{Request,Response} from 'express';
const router = express.Router()
import { nanoid } from 'nanoid';
import query from '../db';
import nodemailer,{Transporter} from 'nodemailer';
import {validationRegister,validationEmail,validationLogin} from '../handles/RegisterAndLoginHandles'
import {handleValidationErrors} from '../../utils/validationError'
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { verifyToken } from '../../utils/jwtPrase';
const salt:any = 'da(&&&**(($$$$$$%%%%%%%%&*$$$&*'
const transporter: Transporter<unknown> = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: 'bluenomarisa@qq.com',
      pass: 'xvtjkxgmsjefebbi'
    }
});

const replayHTML = (email:string, code:string) => {
    return {
        from: '2483723241@qq.com', // 发件地址
        to: email, // 收件列表
        subject: '大牛马音乐验证', // 标题
        html: `
    <div class="replay" style="display: flex; flex-direction: column;  color:#222 ;">
        <div>
             ${email} 你好：
        </div>
        <div>
            你于此次注册的验证码为:${code} 5分钟之内有效
        </div>
    </div>
    ` // html 内容
    }
}

router.post('/email', 
validationEmail,handleValidationErrors
,(req:Request,res:Response) => {
    const { email } = req.body
    new Promise<any[]>((resolve, reject) => {
        query(`select * from user where email = '${email}'`,(err,data:any[])=>{
            if(err)console.log(err);
            else resolve(data)
        })
    }).then((data)=>{
        if(data.length == 0 || data[0].verify == 0){
            const code = nanoid(6)
            const date = new Date().getTime();
            let sql = ''
            if(data.length == 0)sql = `insert into user (email,code,codeTime)values('${email}','${code}','${date}')`
            else sql = `update user set codeTime = '${date}',code = '${code}' where email = '${email}'`
            new Promise((resolve, reject) => {
                query(sql,(err:any,data:any)=>{
                    if(err)console.log(err);
                    else resolve(data)
                })
            }).then(()=>{
                const mailOptions = replayHTML(email,code)
                transporter.sendMail(mailOptions, function (error, info:any) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
                res.send({status:200})
            })
        }else{
            res.send({
                status:202,
                message:'该用户名已被注册'
            })
        }
    })
})

router.post('/register',
validationRegister,handleValidationErrors,
async(req:Request,res:Response)=>{
    try {
        const { email, password, code } = req.body;
    
        const data = await new Promise<any[]>((resolve, reject) => {
            query(`SELECT * FROM user WHERE email = '${email}'`, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    
        if (data.length === 0 || data[0].verify === 0) {
            const codeData = await new Promise<any[]>((resolve, reject) => {
                query(`SELECT code, codeTime FROM user WHERE email = '${email}'`, (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
    
            if (codeData[0].code.toLowerCase() !== code.toLowerCase() || Date.now() - codeData[0].codeTime > 60 * 1000 * 5) {
                res.send({
                    status: 202,
                    message: '验证码错误或已过期',
                });
            } else {
                const name = `大牛马用户_${nanoid(10)}`;
    
                await new Promise((resolve, reject) => {
                    query(`UPDATE user SET verify = 1, nickname = '${name}', password = '${md5(md5(password, salt), salt)}' WHERE email = '${email}'`, (err, data) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
    
                res.send({
                    status: 200,
                });
            }
        } else {
            res.send({
                status: 202,
                message: '该用户名已被注册',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: '服务器错误',
        });
    }
})

router.post('/login',validationLogin,handleValidationErrors,(req:Request,res:Response)=>{
    let {nickname,password} = req.body
    new Promise<any[]>((resolve, reject) => {
        query(`select * from user where (email = '${nickname}' or nickname = '${nickname}') and password = '${md5(md5(password,salt),salt)}'`,(err,data)=>{
            if(err)console.log(err);
            else resolve(data)
        })
    }).then((data)=>{
        console.log(data);
        if(data.length != 0){
            const token = jwt.sign({email:data[0].email,nickname:data[0].nickname,userId:data[0].id},'daniuma1145141919810',{
                expiresIn:'15d'
            })
            res.send({
                status:200,
                data:{
                    token: 'Bearer ' + token
                }
            })
        }else{
            res.send({
                status:201,
                message:'用户不存在或密码错误'
            })  
        }
    })

})

router.post('/login/status',verifyToken,async(req:any,res)=>{
    try {
        const {userId} = req.user
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
            WHERE userId = ${userId};`,(err,data)=>{
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
