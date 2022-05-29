import { userMethods } from "../../../constants/reducers";

export const resetError = () => async (dispatch,getState) =>{
    const errorState = getState().errorReducer;
    errorState.reset();
}
export const showError = (error) => async (dispatch,getState) =>{

    console.log("CALLING ERROR FUNCT");
    const errorState = getState().errorReducer;
    errorState.reset();
    errorState.errorFunc(error);
}

export const setError = (errorFunc,resetError) => async (dispatch,getState) =>{
    dispatch({
        type: userMethods.error,
        payload: {errorFunc:errorFunc,reset:resetError}
    })
}