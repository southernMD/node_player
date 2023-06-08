import mysql from "mysql"
 
let pool = mysql.createPool({
    host:"5rg9702841.goho.co",    //主机名
    port:45019,
    user:"NMuser",           //账户
    password:"zjitc",   //密码
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
 
export default query