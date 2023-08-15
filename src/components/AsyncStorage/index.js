import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeIntoAsyncStorage = async (key,value) =>{
    try{
        console.log(value);
        await AsyncStorage.setItem(key, value);
    }
    catch(e){
        console.log("error: ", "storing data in async storage");
    }
};

export const _getFromAsyncStorage = async (key) => {
    try{
        const value = await AsyncStorage.getItem(key);
        if(value){
            return value;
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log("error: getting data from Async Storage",e)
        return null;
    }
}