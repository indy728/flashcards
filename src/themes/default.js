import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
    primary: ['#0d1113', '#263238', '#37474f', '#455a64'],
    secondary: ['#ec9205', '#ec9d24', '#ecad4c', '#ecbf7a', '#ffe2b5', '#fff7eb'],
    danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
    alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
    success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
    white: ['#fff', '#fff', '#eceff1'],
    grayscale: [
        '#546e7a',
        '#607d8b',
        '#78909c',
        '#90a4ae',
        '#b0bec5',
        '#cfd8dc',
        '#eceff1',
    ],
    transparent: ['rgba(13, 19, 19, 0.5)', 'rgba(13, 19, 19, 0.7)', 'rgba(13, 19, 19, 0.9)']
}

theme.reversePalette = reversePalette(theme.palette)

theme.shadow = {
    container: '0 2rem 6rem rgba(0,0,0,.3)'
}

theme.fonts = {
    primary: "'Lora', serif",
    header: "'Montserrat', sans-serif",
    script: "'Swanky and Moo Moo', cursive",
    nameplate: "'Lobster', cursive",
}

theme.sizes = {
    maxWidth: '1100px',
}

export default theme
