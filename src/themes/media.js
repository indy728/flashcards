const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const device = (m = 'min') => ({
    mobileS: `(${m}-width: ${size.mobileS})`,
    mobileM: `(${m}-width: ${size.mobileM})`,
    mobileL: `(${m}-width: ${size.mobileL})`,
    tablet: `(${m}-width: ${size.tablet})`,
    laptop: `(${m}-width: ${size.laptop})`,
    laptopL: `(${m}-width: ${size.laptopL})`,
    desktop: `(${m}-width: ${size.desktop})`,
    desktopL: `(${m}-width: ${size.desktop})`
});

export default size