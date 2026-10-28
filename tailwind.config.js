
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "testImg": "url('./../public/img/metagram-hero-img.jpg')",
        "client1": "url('./../public/img/client1.avif')",
        "client2": "url('./../public/img/client2.avif')",
        "client3": "url('./../public/img/client3.avif')",
        "client4": "url('./../public/img/client4.jpg')",
        "certificate": "url('./../public/img/Alantra.png')",
        "applePay": "url('./../public/icons/apple-pay.avif')",
        "rampPay": "url('./../public/icons/ramp-pay.avif')",
        "moonPay": "url('./../public/icons/moon-pay.avif')",
        "googlePay": "url('./../public/icons/google-pay.avif')",
        "sepaPay": "url('./../public/icons/sepa-pay.avif')",
        "simplexPay": "url('./../public/icons/simplex-pay.avif')",
        "mercuryoPay": "url('./../public/icons/mercuryo-pay.avif')",
        "companyVid1": "url('./../public/videos/mobile-application.mp4')",
        "homepageSlideBanner1": "url('./../public/img/Predictions_Desktop_41d8859b98.svg')",
        "homepageSlideBanner2": "url('./../public/img/perps_dynamic_banner_desktop_5b51a0336d.svg')",
        "homepageSlideBanner3": "url('./../public/img/premium_Banner_Desktop_562d93a234.svg')",
        "nftSlideBanner1": "url('./../public/img/original-021af03014fd4372437a288d518e25e2.jpg')",
        "nftSlideBanner2": "url('./../public/img/IMG-20250803-WA0015.jpg')",
      },
      colors: {
        "isoColor1": "#0500ff",
        "isoColor2": "#48ff91",
        "isoDark": "#1b1b1c",
        "isoDark2": "#242426",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(500px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.4s ease-out forwards',
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};
