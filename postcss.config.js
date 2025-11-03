// Force PostCSS to use a local empty config so it doesn't pick up any global Tailwind v3 plugin
// Tailwind v4 is handled by @tailwindcss/vite, so we don't need a Tailwind PostCSS plugin here.
export default {
  plugins: [],
};