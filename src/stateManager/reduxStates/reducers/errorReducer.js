import { userMethods } from "../../../constants/reducers";

const errorFunc = (e)=>{console.log(e)};
const reset = ()=>{}
const initialErrorState = {
    errorFunc:errorFunc,
    reset:reset
}

const setError = (state,payload) =>{
    const newstate = {...state};
    
    newstate.errorFunc = payload.errorFunc;
    newstate.reset = payload.reset;
    return newstate;
}

const errorReducer = (state = initialErrorState, action) => {
    switch(action.type){
        case userMethods.error:
            return setError(state,action.payload);
        default:
            return state;
    }
}

export default errorReducer;