const reducer=(state=[],action)=>{
    switch(action.type){
        case 'SET_USER':
            // console.log(action.payload);
            return action.payload;
        case 'LOG_OUT':
            return state;    
        default:
            return state;     
    }
}
export default reducer