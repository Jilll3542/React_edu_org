import request from "../utils/request"
export function getTeacherList(data){
    /**
     * 参数要求：
     * name:""          姓名    非必填
     * subject:""       学科    非必填
     * tel:""           电话    非必填
     * page:1           页码    必填
     * pageSize:10      条数    必填
     */
    return request({
        url:"/teacher/teacherList",
        method:"post",
        data
    })
}
export function addTeacher(data){
    return request({
        url:"/teacher/addTeacher",
        method:"post",
        data
    })
}
/**
 * 编辑教师接口
 * 参数同新增教师 额外加ID
 */
export function editTeacher(data){
    return request({
        url:"/teacher/editTeacher",
        method:"post",
        data
    })
}
/**
 * 删除单个教师接口
 * ID：ID
 */
export function deletes(data){
    return request({
        url:"/teacher/deletes",
        method:"post",
        data
    })
}
/**
 * 批量删除教师接口
 * id:[id数组]
 */
export function batchDelete(data){
    return request({
        url:"/teacher/batchDelete",
        method:"post",
        data
    })
}