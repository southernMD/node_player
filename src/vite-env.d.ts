/// <reference types="vite/client" />
interface RequestR<T> extends Request {
    user: {
        userId:number
        email:string
        nickname:string
    }; // 这里的 `any` 可以替换为你存储解码后的用户信息的具体类型
}