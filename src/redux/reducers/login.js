//用户登陆时存储
const initState = {role:"",nickname:""};
export function loginReducer(prevState=initState,action){
    const {type,payload} = action;
    if(type==="add"){
        return payload
    }
    return prevState
}
//根据路由表及权限构建不同页面
const menu = []
export function menuReducer(prevState=menu,action){
    const {type,payload} = action;
    if(type==="generate"){
        return payload
    }
    return prevState
}