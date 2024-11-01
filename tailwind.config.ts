import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient-dark-blue":
          "linear-gradient(to top right, #000424, #00094c)",
      },
      colors: {
        // Custom colors
        "light-blue": "#8FE5FF",
        "opaque-light-blue": "rgba(143, 229, 255, 0.281)",
        "backdrop": "rgba(0, 0, 0, 0.248)",
        "dark-blue": "#2EBBE5",
        "darkest-blue": "#00094c",
        "green-yellow": "#D7F561",
        "opaque-green-yellow": "rgba(215, 245, 97, 0.515)",
        "dark-green-yellow": "#9EB540",
      },
      screens: {
        xs:  { max: "400px" },
        s: { max: "760px" },
        m: { max: "1000px" },
        l: {max: "1200px" },
      },
    },
  },
  plugins: [],
};
export default config;


// --mobile-width: 760px;
// --medium-width: 1000px;
// --desktop-width: 1200px;