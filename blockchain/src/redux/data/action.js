import axios from "axios";


export const ADDPRODUCT_DATA_REQUEST = "ADDPRODUCT_DATA_REQUEST"
export const ADDPRODUCT_DATA_SUCCESS = "ADDPRODUCT_DATA_SUCCESS"
export const ADDPRODUCT_DATA_FAILURE = "ADDPRODUCT_DATA_FAILURE"
export const GET_PRODUCT_DATA_REQUEST= "GET_PRODUCT_DATA_REQUEST"
export const GET_PRODUCT_DATA_SUCCESS= "GET_PRODUCT_DATA_SUCCESS"
export const GET_PRODUCT_DATA_FAILURE = "GET_PRODUCT_DATA_FAILURE"

const addproductDataRequest=()=>{
    return({
        type:ADDPRODUCT_DATA_REQUEST
    })
}

const addproductDataSuccess=(data)=>{
    return({
        type:ADDPRODUCT_DATA_SUCCESS,
        payload:data
    })
}

const addproductDataFailure=()=>{
    return({
        type:ADDPRODUCT_DATA_FAILURE
    })
}

const getproductdataSuccess=(data)=>{
    return({
        type:GET_PRODUCT_DATA_SUCCESS,
        payload:data
    })
}

const getproductdatafailure=()=>{
    return({
        type:GET_PRODUCT_DATA_FAILURE
    })
}

const getproductdatarequest=()=>{
    return({
        type:GET_PRODUCT_DATA_REQUEST
    })
}


export const addproductData=(data)=>(dispatch)=>{
    dispatch(addproductDataRequest())
    return axios({
        method:"POST",
        url:"http://localhost:9096/product",
        data

    })
    .then((res)=>{
        dispatch(addproductDataSuccess(res.data))
    })
    .catch((err)=>{
        dispatch(addproductDataFailure(err))
    })
}

export const getproductdata =(data,token)=>(dispatch)=>{
    dispatch(getproductdatarequest)
    return axios({
        method:"GET",
        url:"http://localhost:9096/product",
       params:data,
        headers: {
            Authorization:`Bearer ${token}` 
        }
    })
    .then((res)=>{
        dispatch(getproductdataSuccess(res.data))
    })
    .catch((err)=>{
        dispatch(getproductdatafailure(err))
    })
}