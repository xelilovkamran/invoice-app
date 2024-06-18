/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            backgroundImage: {
                "signin-background": "url('/src/assets/signin-background.png')",
                "signup-background": "url('/src/assets/signup-background.png')",
            },
            screens: {
                tablet: "860px",
                mobile: "550px",
            },
        },
    },
};
