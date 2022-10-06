function hasWhiteSpace(s) {
    const whitespaceChars = [' ', '\t', '\n'];
    return whitespaceChars.some(char => s.includes(char));
}

export default hasWhiteSpace