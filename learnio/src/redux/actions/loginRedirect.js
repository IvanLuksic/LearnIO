export  const loginRedirect=(u)=>{
    return{
        type:'REDIRECT_CHANGED',
        uri: u,
    };
};

