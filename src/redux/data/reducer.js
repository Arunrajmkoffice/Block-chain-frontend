import{ADDPRODUCT_DATA_FAILURE, ADDPRODUCT_DATA_SUCCESS, ADDPRODUCT_DATA_REQUEST} from "./action";
import { GET_PRODUCT_DATA_FAILURE,GET_PRODUCT_DATA_SUCCESS, GET_PRODUCT_DATA_REQUEST } from "./action";

const initState={
    isLoading :false,
    isError:false,
    error:[],
    addproductData:[],
    getproduct:[]
};

export const dataReducer = (state = initState, action)=>{
    switch(action.type){
        case ADDPRODUCT_DATA_REQUEST:
            return{
                ...state,
                isLoading:true,
                isError:false,
            };

        case ADDPRODUCT_DATA_SUCCESS:
            return{
                ...state,
                isLoading:false,
                isError:false,
                addproductData:action.payload,
            };
        case ADDPRODUCT_DATA_FAILURE:
            return{
                ...state,
                isLoading:false,
                isError:true,
            };
            case GET_PRODUCT_DATA_REQUEST:
            return{
                ...state,
                isLoading:true,
                isError:false,
            };
        case GET_PRODUCT_DATA_SUCCESS:
                return{
                    ...state,
                    isLoading:false,
                    isError:false,
                    getproduct: action. payload
                };
        case GET_PRODUCT_DATA_FAILURE:
            return{
                ...state,
                isLoading:false,
                isError:true,
            };
            default:
                return{
                    ...state,
                }

    }
};