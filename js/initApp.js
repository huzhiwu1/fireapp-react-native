import storage from "./storage"
import * as actionCreators from "../js/actions/login"
import store from "./store"
import * as constants  from "../js/actions/constants"
export default function init(){
   
    storage._getData(constants.TOKEN).then(res=>{
        if(res){
            const action = actionCreators.setToken(res)
            store.dispatch(action)
        }
    })
    
}
