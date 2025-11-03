import { Link } from "react-router";

export default function Navbar() {
  return (
    <header className="w-full flex justify-center pt-4 pb-2 bg-gray-900">
      <nav className="w-[95%] max-w-3xl flex items-center justify-between px-6 py-2 bg-white rounded-full">
        <span className="font-extrabold tracking-tight text-xl sm:text-2xl ml-1 text-black">
          Rezoomed
        </span>
        <Link
          to="/"
          aria-label="Upload Resume"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full
                     bg-gradient-to-r from-violet-500 via-blue-400 to-blue-300
                     px-5 py-1.5 text-sm font-semibold text-white transition
                     hover:brightness-110 hover:shadow-md active:scale-[0.98] motion-reduce:active:scale-100
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300
                     focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Upload Resume
        </Link>
      </nav>
    </header>
  );
}
