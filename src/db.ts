import mysql from "mysql"
 
// let pool = mysql.createPool({ //数据库一
//     host:"5rg9702841.goho.co",    //主机名
//     port:45019,
//     user:"NMuser",           //账户
//     password:"zjitc",   //密码
//     database:"music",    //使用的数据表
//     multipleStatements: true
// })
// let pool = mysql.createPool({ //云服务器,云数据库
//     host:"13.231.138.251",    //主机名
//     port:3306,
//     user:"root",           //账户
//     password:"123456",   //密码
//     database:"music",    //使用的数据表
//     multipleStatements: true
// })

let pool = mysql.createPool({ //云服务器
    host:"127.0.0.1",    //主机名
    port:3306,
    user:"root",           //账户
    password:"m123042012",   //密码
    database:"music",    //使用的数据表
    multipleStatements: true
})


//不用修改
function query(sql: string | mysql.QueryOptions,callback: { (err: any, data: any[]): void; (err: any, data: any): void; (err: any, data: any): void; (err: any, data: any): void; (err: any, data: any): void; (err: any, data: any): void; (arg0: mysql.MysqlError | null, arg1: any): void }){
    pool.getConnection(function(err,coonection){
        coonection.query(sql,function(err,rows){
            callback(err,rows)
            coonection.release()
        })
    })
}
 console
export default query