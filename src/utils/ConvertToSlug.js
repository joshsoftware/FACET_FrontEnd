const ConvertToSlug = (text) => {
    return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}

export default ConvertToSlug;