 export function authLogin(){
    //函数有收集到token就返回true，没有收集到token返回false
    let token = sessionStorage.getItem("token")
    return token?true:false
 }