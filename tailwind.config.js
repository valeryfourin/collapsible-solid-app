/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				'custom-gradient': 'linear-gradient( 109.6deg, rgba(245,226,226,1) 11.2%, rgba(177,173,219,1) 91.1% )',
			},
			animation: {
				wiggle: 'wiggle 0.5s ease-in-out',
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: '' },
					'25%': { transform: 'rotate(3deg)' },
					'50%': { transform: 'rotate(-3deg)' },
				}
			},
		},
		plugins: [],
	}
}