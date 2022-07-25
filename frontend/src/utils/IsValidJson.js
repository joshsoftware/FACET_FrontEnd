const IsValidJson = (json) => {
    try {
        JSON.parse(json);
    } catch (error) {
        return false;
    }
    return true;
}

export default IsValidJson;