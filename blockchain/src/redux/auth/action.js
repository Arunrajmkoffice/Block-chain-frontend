import axios from "axios"


export const SIGIN_AUTH_REQUEST = "SIGIN_AUTH_REQUEST"
export const SIGIN_AUTH_SUCCESS = "SIGIN_AUTH_SUCCESS"
export const SIGIN_AUTH_FAILURE = "SIGIN_AUTH_FAILURE"




const siginAuthRequest = ()=>{
    return({
        type:SIGIN_AUTH_REQUEST
    })
}

const siginAuthSuccess = (data)=>{
    return({
        type:SIGIN_AUTH_SUCCESS,
        payload:data
    })
}


const siginAuthFailure = ()=>{
    return({
        type:SIGIN_AUTH_FAILURE
    })
}





export const siginAuth = (data)=>(dispatch)=>{
dispatch(siginAuthRequest())
    return axios({
        method:"POST",
        url:"https://wide-eyed-pear-meerkat.cyclic.app/signin",
        data
    })
    .then((res)=>{
        dispatch(siginAuthSuccess(res.data))
        if(res.data.token!==undefined){
            localStorage.setItem('bcToken', res.data.token);
            let data = {
                role:res.data.role,
                userId:res.data.userId,
            }
            localStorage.setItem('bcUserData', JSON.stringify(data));
        }
       
    })
    .catch((err)=>{
        dispatch(siginAuthFailure(err))
    })

}