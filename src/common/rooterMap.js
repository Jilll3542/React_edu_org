export const asyncRouterMap = [
    {
        path: '/home',
        name: 'Home',
        meta: {title:"首页", role: ['admin',"teacher"],icon:"team"},
    },
    {
        path: '/personal',
        name: 'Personal',
        meta: {title:"个人中心", role: ['admin',"teacher"],icon:"team"},
    },
    {
        path: '/teacher',
        name: 'Teacher',
        meta: {title:"教师管理", role: ['admin',"teacher"],icon:"team"},
    },
    {
        path: '/admissions',
        name: 'Admissions',
        meta: {title:"招生管理",role: ['admin','manager',"teacher"],icon:"customer-service" },
        children:[
            {
                path: '/admissions/intentional',
                name: 'Intentional',
                meta: {title:"意向学员管理",role: ['admin','manager',"teacher"], icon:"smile",bread:['招生管理','意向学员管理'],keepAlive:true},              
            },
            {
                path: '/admissions/solicitation',
                name: 'Solicitation',
                meta: {title:"邀约查询",role: ['admin',"teacher"],icon:"profile",bread:['招生管理','邀约查询'] },
                
            }
        ]
    },
    {
        path: '/student',
        name: 'Student',
        meta: {title:"学生管理", role: ['admin','teacher','manager'],icon:"solution"  },
        children:[
            {
                path: '/student/info',
                name: 'Info',
                meta: {title:"学生信息",role: ['admin','teacher','manager'],icon:"file-text",bread:['学生管理','学生信息']},
            },
            {
                path: '/student/exam',
                name: 'Exam',
                meta: {title:"考试管理",role: ['admin','teacher'],icon:"form",bread:['学生管理','考试管理']},
            },
            // {
            //     path: '/student/lesson',
            //     name: 'Lesson',
            //     meta: {title:"课时管理",role: ['admin','manager'] ,icon:"hourglass",bread:['学生管理','课时管理']},
            // }
        ]
    },
    {
        path: '/class',
        name: 'Class',
        meta: {title:"排课管理",role: ['admin',"teacher"],icon:"unordered-list" },
    },
    {
        path: '/administrative',
        name: 'Administrative',
        meta: {title:"行政管理",role: ['admin',"teacher"],icon:"car" },
    },
    {
        path: '/finance',
        name: 'Finance',
        meta: {title:"财务管理", role: ['admin',"teacher"],icon:"account-book"},
    },
];