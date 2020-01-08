export const idTransform = str => {
    return (
        str.toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .trim()
            .replace(/[\s]+/g, '-')
            .replace(/^the/i, '')
    )
}

export const nameTransform = str => {
    return (
        str.toLowerCase()
            .replace(/[^a-zA-Z0-9\s()']/g, '')
            .trim()
            .replace(/[\s]+/g, ' ')
    )
}

export const titleCase = str => {
    const preChar = [' ', '(']
    // const preChar = [' ', '(', '\'']
    let newStr = str.toLowerCase()
    for (let char in preChar) {
        let splitStr = newStr.split(preChar[char]);
        for (let i = 0; i < splitStr.length; i++) {
            // cannot transform an immutable array, so replaces the array instead
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        console.log('[stringUtility] splitStr: ', splitStr)
        newStr = splitStr.join(preChar[char])
    }
    return newStr;
}