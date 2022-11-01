export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.log(
            `An error occurred while storing data in localstorage, key: ${key}, value: ${value}, Error details: ${error}`
        );
    }
};

export const getLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.log(
            `An error occurred while retrieving data for ${key} from localstorage, Error details: ${error}`
        );
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log(
            `An error occurred while removing the ${key} from local storage, Error details: ${error}`
        );
    }
};

export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log(`An error occurred while clearing the local storage, Error details: ${error}`);
    }
};
