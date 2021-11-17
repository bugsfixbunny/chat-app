import AsyncStorage from '@react-native-async-storage/async-storage';


export const promise = async (response) => {
    return new Promise((resolve, reject) => {
        response.status === 200 ? resolve(response.json) : reject(new Error(response.json.message));
    });
}

export const postFetch = async (url, body) => {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'no-cors'
            },
        body: JSON.stringify(body)
    });
    let json = await response.json();
    let status = await response.status;
    let item = {json, status};
    return item;
}


export const getFetch = async (url) => {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'no-cors'
        }
    })
    let json = await response.json();
    let status = await response.status;
    let item = {json, status};
    return item;
}


export const saveToStorage = async (keyOfValueToStore ,valueToBeStoraged) => {
    try {
        await AsyncStorage.setItem(keyOfValueToStore, JSON.stringify(valueToBeStoraged));
    } catch (error) {
        alert(error);
    } finally {
        return true
    }
}


export const loadFromStorage = async (itemToBeGettedFromStorage) => {
    try {
        let item = await AsyncStorage.getItem(itemToBeGettedFromStorage);
        if (item !== null) {
            return JSON.parse(item)
        } else {
            return false;
        }
    } catch (error) {
        alert(error);
    }
}


export const removeFromStorage = async (keyOfValueToRemove) => {
    try {
        await AsyncStorage.removeItem(keyOfValueToRemove);
    } catch (error) {
        alert(error);
    } finally {
        return true;
    }
}


export const prettifyData = (dateTime) => {
    const date = new Date(dateTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let time = compareTime(date);
    if (time === 1) {
        minutes = minutes < 10 ? '0'+minutes : minutes
        return(hours+':'+minutes);
    } else if (time === 2) {
        return('yesterday');
    } else if (time === 3) {
        month = month < 10 ? '0'+month : month
        days = days < 10 ? '0'+days : days
        return(days+'/'+month+'/'+year);
    }
}


const compareTime = (date) => {
    const currentDate = new Date();
    let timeInMilliseconds = currentDate-date;
    let oneDayInMilliseconds = 86400000;
    if (timeInMilliseconds >= oneDayInMilliseconds) {
        //1 day has passed
        if (timeInMilliseconds >= oneDayInMilliseconds*2) {
            //more than 1 day has passed
            return 3;
        }
        return 2;
    }
    //not even 1 day has passed
    return 1;
}


export const ip = 'http://192.168.0.10:5000';