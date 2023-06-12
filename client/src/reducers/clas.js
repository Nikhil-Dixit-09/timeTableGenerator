const clasReducer=(clas=[],action)=>{
    switch(action.type){
        case 'ADD':
            return [...clas,action.payload];
        default:
            return clas;    
    }
}
export default clasReducer;