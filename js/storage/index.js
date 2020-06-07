import {AsyncStorage} from  "react-native"
export default class storage{
    static _saveData(key,value,callback){
        if(!key||!value) return;
        AsyncStorage.setItem(key,JSON.stringify(this._wrapData(value)),callback)
    }
    static _wrapData(data){
        return {data:data,timestamp:new Date().getTime()}
    }
    static _updateData(key,data,callback){
        if(!key||!data) return;
        AsyncStorage.mergeItem(key,JSON.stringify(this._wrapData(data)),callback)
    }
    static _clearAll(callback){
        AsyncStorage.clear(callback)
    }
    static _removeData(key,callback){
        AsyncStorage.removeItem(key,callback)
    }
    static _getData(key){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(key,(error,data)=>{
                if(!error&&data){
                    const Data = JSON.parse(data)
                    const newTimeStamp = new Date().getTime()
                    if((newTimeStamp-Data.timestamp)<(1000*60*60*24*7)){
                        // this._updateData(key,Data.data)
                        resolve(Data.data)
                    }else{
                        this._removeData(key)
                        resolve()
                    }
                    
                }else{
                    reject(error)
                }
            })
        })
    }
}