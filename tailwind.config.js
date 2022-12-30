module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                blue: '#1fb6ff',
                purple: '#7e5bef',
                pink: '#ff49db',
                orange: '#ff7849',
                green: '#13ce66',
                yellow: '#ffc82c',
                'gray-dark': '#273444',
                gray: '#8492a6',
                'gray-light': '#d3dce6',
                offwhite: '#FAF9F6',
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
