export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    }
}

export const idTransform = value => {
    return (
        value.trim().toLowerCase()
            .replace(/[\s]+/g, '-')
            .replace(/^the/i, '')
    )
}

export const nameTransform = value => {
    return (
        value.trim().toLowerCase()
            .replace(/[\s]+/g, ' ')
    )
}