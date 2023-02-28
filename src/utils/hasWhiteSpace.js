// helps to check if there are any whitespace presents in the string
const hasWhiteSpace = (s = "") => {
  const whitespaceChars = [" ", "\t", "\n"];
  return whitespaceChars.some((char) => s.includes(char));
};

export default hasWhiteSpace;
