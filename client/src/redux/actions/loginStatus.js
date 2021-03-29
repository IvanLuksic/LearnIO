// SELJAČINO PAZI AKCIJE MORAJU BIT JEDINSTVENOG IMENA JER INAČE DJELUJU NA SVE TOG IMENA
export const adminLogIn=()=>{
    return{
        type:'ADMIN_LOGGED_IN'
    };
};

export const studentLogIn=()=>{
    return{
        type:'STUDENT_LOGGED_IN'
    };
};

export const teacherLogIn=()=>{
    return{
        type:'TEACHER_LOGGED_IN'
    };
};

export const logOut=()=>{
    return{
        type:'LOGGED_OUT'
    };
};
