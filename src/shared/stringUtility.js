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
            .replace(/[^a-zA-Z0-9\s']/g, '')
            .trim()
            .replace(/[\s]+/g, ' ')
    )
}

export const titleCase = str => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // cannot transform an immutable array, so replaces the array instead
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' ');
}