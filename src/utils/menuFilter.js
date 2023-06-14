
//用户角色权限筛选,挨个遍历，如果不在数组中就可以判断出来是否存在
export function filterMenu(data,role){
    //查看当前输入role是否在role数组中
    return data.filter(item=>{
        return item.meta.role.indexOf(role) !== -1
    }).map(item=>{
        if(item.children){
            item.children=filterMenu(item.children,role)
        }
        return item
    })  
}