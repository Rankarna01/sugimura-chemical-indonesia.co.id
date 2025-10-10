import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },

        // TAMBAHKAN BLOK INI
            colors: {
                    brand: {
                        DEFAULT: '#006A4E', // Warna utama dari logo
                        600: '#007A5A',     // Sedikit lebih terang untuk hover
                        200: '#005A42',     // Sedikit lebih gelap untuk active/focus
                    },
                },

            animation: {
                    'marquee-x': 'marquee-x 25s linear infinite',
                    'shimmer': 'shimmer 2.4s infinite', 
                },
                keyframes: {
                    'marquee-x': {
                        '0%': { transform: 'translateX(0%)' },
                        '100%': { transform: 'translateX(-50%)' }, // Bergerak sejauh setengah lebar
                    },
                    shimmer: { // <-- Tambahkan blok ini
                        '0%': { transform: 'translateX(-10%)' },
                        '50%': { transform: 'translateX(10%)' },
                        '100%': { transform: 'translateX(-10%)' },
                    }
                }
    },

    plugins: [forms],
};
