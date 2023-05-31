import express from 'express'
import query from '../db';
const router = express.Router()

router.post(`/likelist`,async(req,res)=>{
    try {
        let {uid} = req.body
        let ids:string[] = await new Promise<any>((resolve, reject) => {
            query(`SELECT JSON_ARRAY(likes) AS ids
            FROM liked where userId = ${uid};`,(err,data)=>{
                if(err)reject(err)
                else resolve(eval(data[0].ids))
            })
        })
        const idsNumber = ids[0]==''?[]:ids.map(str=>+str)
        res.json({code:200,ids:idsNumber})
    } catch (error) {
        res.status(500).json({code:500,message:error})
    }
})

export default router
