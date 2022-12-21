const TIME = 20000
export const RESET_REQUEST = (dispatch,filter,action)=>{
    dispatch(action(filter))
    setInterval(()=>{
        dispatch(action(filter))
    },TIME)
}